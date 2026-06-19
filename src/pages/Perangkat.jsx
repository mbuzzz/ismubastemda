import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { schoolInfo, schoolInfoPAI, schoolInfoArab, schoolInfoKemuh, faseE, faseF11, faseF12, faseEArab, faseF11Arab, faseF12Arab, faseE_kemuh, faseF11_kemuh, faseF12_kemuh } from '../data/curriculum';
import { exportToPdf } from '../utils/exportPdf';
import { exportToDocx } from '../utils/exportDocx';
import { getDplForBab, getPpmDetails, indonesianMonthsGanjil, indonesianMonthsGenap, ArabicText } from '../utils/perangkatUtils';

export default function Perangkat() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Application State
  const [selectedMapel, setSelectedMapel] = useState(searchParams.get('mapel') || 'pai'); // pai or arab
  const [fase, setFase] = useState(searchParams.get('fase') || 'E'); // E or F
  const [selectedClass, setSelectedClass] = useState(searchParams.get('kelas') || 'X'); // X for E, XI or XII for F
  const [semester, setSemester] = useState(searchParams.get('semester') || 'ganjil'); // ganjil or genap
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'cover'); // side nav active item
  const [viewMode, setViewMode] = useState(searchParams.get('view') || 'single'); // single page or booklet
  const [teacherName, setTeacherName] = useState('');
  const [teacherNbm, setTeacherNbm] = useState('......................');
  const [academicYear, setAcademicYear] = useState('2026/2027');
  const [selectedPpmBab, setSelectedPpmBab] = useState(parseInt(searchParams.get('bab') || '1'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    setSearchParams({
      mapel: selectedMapel,
      fase,
      kelas: selectedClass,
      semester,
      tab: activeTab,
      view: viewMode,
      bab: selectedPpmBab.toString()
    }, { replace: true });
  }, [selectedMapel, fase, selectedClass, semester, activeTab, viewMode, selectedPpmBab, setSearchParams]);

  // Load correct fase data based on selected Class
  const getActiveFaseData = () => {
    if (selectedMapel === 'arab') {
      if (selectedClass === 'X') return faseEArab;
      if (selectedClass === 'XI') return faseF11Arab;
      return faseF12Arab;
    } else if (selectedMapel === 'kemuh') {
      if (selectedClass === 'X') return faseE_kemuh;
      if (selectedClass === 'XI') return faseF11_kemuh;
      return faseF12_kemuh;
    } else {
      if (selectedClass === 'X') return faseE;
      if (selectedClass === 'XI') return faseF11;
      return faseF12;
    }
  };

  const activeFaseData = getActiveFaseData();
  const currentSemesterData = activeFaseData.semester[semester];
  const materiList = currentSemesterData.materi;

  // Sync Class options based on Fase
  const handleFaseChange = (newFase) => {
    setFase(newFase);
    let targetClass = 'X';
    if (newFase === 'E') {
      setSelectedClass('X');
    } else {
      setSelectedClass('XI');
      targetClass = 'XI';
    }
    // Reset active chapter for PPM
    const data = selectedMapel === 'arab' 
      ? (targetClass === 'X' ? faseEArab : (targetClass === 'XI' ? faseF11Arab : faseF12Arab)) 
      : selectedMapel === 'kemuh'
        ? (targetClass === 'X' ? faseE_kemuh : (targetClass === 'XI' ? faseF11_kemuh : faseF12_kemuh))
        : (targetClass === 'X' ? faseE : (targetClass === 'XI' ? faseF11 : faseF12));
    const initialBab = data.semester[semester].materi[0]?.bab || 1;
    setSelectedPpmBab(initialBab);
  };

  const handleSemesterChange = (newSem) => {
    setSemester(newSem);
    const initialBab = activeFaseData.semester[newSem].materi[0]?.bab || 1;
    setSelectedPpmBab(initialBab);
  };

  // Compile Teacher info
  const schoolInfoData = {
    ...(selectedMapel === 'arab' ? schoolInfoArab : selectedMapel === 'kemuh' ? schoolInfoKemuh : schoolInfoPAI),
    
    namaGuru: teacherName.trim() || '........................................',
    nbmGuru: teacherNbm.trim() || '......................',
    tahunAjaran: academicYear,
    kelas: selectedClass,
  };

  const getActiveMateri = () => {
    return materiList.find(m => m.bab === selectedPpmBab) || materiList[0] || {};
  };

  const activeMateri = getActiveMateri();

  const handlePdfExport = async () => {
    setIsExporting(true);
    try {
      // Wait for React to render and allow user to read the print tips
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Trigger native browser high-quality printing
      window.print();
    } catch (err) {
      console.error(err);
      alert('Gagal mengekspor PDF.');
    } finally {
      setIsExporting(false);
    }
  };


  const handleDocxExport = async (specificBab = null) => {
    setIsExporting(true);
    try {
      let dataToExport = {
        ...activeFaseData,
        kelas: selectedClass,
      };
      
      let fileName = `perangkat-${selectedMapel}-fase${fase}-${semester}-${academicYear.replace('/', '-')}.docx`;
      
      // If a specific bab is provided (exporting single PPM), filter the materi
      if (specificBab !== null) {
         dataToExport = {
           ...dataToExport,
           semester: {
             ...dataToExport.semester,
             [semester]: {
               ...dataToExport.semester[semester],
               materi: dataToExport.semester[semester].materi.filter(m => m.bab === specificBab)
             }
           }
         };
         fileName = `modul-ajar-${selectedMapel}-bab${specificBab}-fase${fase}-${semester}.docx`;
      }

      // Overwrite teacher name in export config dynamically
      const originalInfo = { ...schoolInfo };
      schoolInfo.namaGuru = schoolInfoData.namaGuru;
      schoolInfo.nbmGuru = schoolInfoData.nbmGuru;
      schoolInfo.tahunAjaran = schoolInfoData.tahunAjaran;
      schoolInfo.kepalaSekolah = schoolInfoData.kepalaSekolah;
      schoolInfo.wakaKurikulum = schoolInfoData.wakaKurikulum;
      schoolInfo.name = schoolInfoData.name;
      schoolInfo.mapel = schoolInfoData.mapel;
      schoolInfo.jpPerMinggu = schoolInfoData.jpPerMinggu;
      schoolInfo.mingguEfektif = schoolInfoData.mingguEfektif;

      // Build per-bab PPM details map
      const ppmMap = {};
      const allMateri = dataToExport.semester[semester].materi;
      allMateri.forEach(m => {
        const details = getPpmDetails(fase, m.bab, selectedMapel, selectedClass);
        details.dpl = getDplForBab(fase, m.bab, selectedMapel);
        ppmMap[m.bab] = details;
      });

      await exportToDocx(dataToExport, semester, fileName, ppmMap);

      // Restore
      Object.assign(schoolInfo, originalInfo);
    } catch (err) {
      console.error(err);
      alert('Gagal mengekspor DOCX.');
    } finally {
      setIsExporting(false);
    }
  };

  // Menu Definition
  const menuItems = [
    { id: 'cover', label: '1. Sampul Depan' },
    { id: 'judul', label: 'HALAMAN JUDUL' },
    { id: 'identitas', label: 'IDENTITAS SEKOLAH' },
    { id: 'daftar-isi', label: 'DAFTAR ISI' },
    { id: 'pekan-efektif', label: 'RINCIAN PEKAN EFEKTIF' },
    { id: 'prota', label: 'PROGRAM TAHUNAN' },
    { id: 'promes', label: 'PROGRAM SEMESTER' },
    { id: 'analisis-cp', label: 'ANALISA CAPAIAN PEMBELAJARAN' },
    { id: 'atp', label: 'ALUR TUJUAN PEMBELAJARAN' },
    { id: 'kktp', label: 'KRITERIA KETERCAPAIAN TP' },
    { id: 'modul', label: 'MODUL AJAR (PPM)' },
    { id: 'kisi-kisi', label: 'KISI-KISI SOAL' },
    { id: 'kartu-soal', label: 'KARTU SOAL' },
  ];



  const ganjilWeeksList = [
    { status: 'empty', label: '' },
    { status: 'non-efektif', label: 'MPLS' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'non-efektif', label: 'HUT' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'non-efektif', label: 'STS' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'non-efektif', label: 'PAS' },
    { status: 'empty', label: 'L' }
  ];

  const genapWeeksList = [
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'non-efektif', label: 'LPP' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'empty', label: '' },
    { status: 'non-efektif', label: 'LHR' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'empty', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'efektif', label: '' },
    { status: 'non-efektif', label: 'PAT' },
    { status: 'empty', label: 'L' }
  ];

  const getTeachingSchedule = (materiList, weeksArray) => {
    let currentEfektifIndex = 0;
    return materiList.map((m) => {
      const taughtWeeks = m.minggu;
      const schedule = [];
      for (let i = 0; i < taughtWeeks; i++) {
        while (currentEfektifIndex < weeksArray.length && weeksArray[currentEfektifIndex].status !== 'efektif') {
          currentEfektifIndex++;
        }
        if (currentEfektifIndex < weeksArray.length) {
          schedule.push(currentEfektifIndex);
          currentEfektifIndex++;
        }
      }
      return {
        ...m,
        schedule
      };
    });
  };

  // Signature Block Component
  const SignatureBlock = ({ semOverride = null }) => {
    const sem = semOverride || semester;
    const yearStr = schoolInfoData.tahunAjaran.split('/')[sem === 'ganjil' ? 0 : 1];
    return (
      <div className="signature-section" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '30px', borderTop: '1px solid #1976D2', paddingTop: '15px', pageBreakInside: 'avoid' }}>
        <div className="signature-block" style={{ textAlign: 'center', flex: 1 }}>
          <p style={{ fontSize: '10px', color: '#666' }}>Mengesahkan,</p>
          <p style={{ fontWeight: '700', fontSize: '11px', color: '#1976D2' }}>Kepala Sekolah</p>
          <div className="signature-space" style={{ height: '50px' }}></div>
          <p className="signature-name" style={{ fontWeight: '700', borderBottom: '1px solid #1976D2', color: '#0D47A1', fontSize: '11px' }}>{schoolInfoData.kepalaSekolah}</p>
          <p className="signature-title" style={{ fontSize: '9px', color: '#555' }}>NBM. {schoolInfoData.nbmKepala}</p>
        </div>
        <div className="signature-block" style={{ textAlign: 'center', flex: 1 }}>
          <p style={{ fontSize: '10px', color: '#666' }}>Mengetahui,</p>
          <p style={{ fontWeight: '700', fontSize: '11px', color: '#1976D2' }}>Waka. Kurikulum</p>
          <div className="signature-space" style={{ height: '50px' }}></div>
          <p className="signature-name" style={{ fontWeight: '700', borderBottom: '1px solid #1976D2', color: '#0D47A1', fontSize: '11px' }}>{schoolInfoData.wakaKurikulum}</p>
          <p className="signature-title" style={{ fontSize: '9px', color: '#555' }}>NBM. {schoolInfoData.nbmWaka}</p>
        </div>
        <div className="signature-block" style={{ textAlign: 'center', flex: 1 }}>
          <p style={{ fontSize: '10px', color: '#666' }}>Genteng, Banyuwangi, {sem === 'ganjil' ? 'Juli ' : 'Januari '}{yearStr}</p>
          <p style={{ fontWeight: '700', fontSize: '11px', color: '#1976D2' }}>Guru Mata Pelajaran</p>
          <div className="signature-space" style={{ height: '50px' }}></div>
          <p className="signature-name" style={{ fontWeight: '700', borderBottom: '1px solid #1976D2', color: '#0D47A1', fontSize: '11px' }}>{schoolInfoData.namaGuru}</p>
          <p className="signature-title" style={{ fontSize: '9px', color: '#555' }}>NBM. {schoolInfoData.nbmGuru || '......................'}</p>
        </div>
      </div>
    );
  };

  // Render individual page components based on selected tab or all for booklet
  const renderPage = (tabName, index, specificBab = null, semesterOverride = null) => {
    const sem = semesterOverride || semester;
    const semData = activeFaseData.semester[sem];
    const localMateriList = semData.materi;
    const activeMateri = specificBab 
      ? (localMateriList.find(m => m.bab === specificBab) || localMateriList[0])
      : (localMateriList.find(m => m.bab === selectedPpmBab) || localMateriList[0]);

    switch (tabName) {
      case 'cover':
        return (
          <div key="cover" className="a4-page" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20mm 15mm', border: '1px solid #E2E8F0' }}>
            {/* Elegant Islamic Star Geometric Watermark Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.04, pointerEvents: 'none', zIndex: 0 }}>
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="islamic-star-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 39 21 L 60 30 L 39 39 L 30 60 L 21 39 L 0 30 L 21 21 Z" fill="none" stroke="#1976D2" strokeWidth="1" />
                    <path d="M 30 10 L 35 25 L 50 30 L 35 35 L 30 50 L 25 35 L 10 30 L 25 25 Z" fill="none" stroke="#FFB300" strokeWidth="0.5" />
                    <circle cx="30" cy="30" r="4" fill="none" stroke="#1976D2" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#islamic-star-pattern)" />
              </svg>
            </div>

            {/* Left and Right Subtle Accent Borders (Corporate Design) */}
            <div style={{ position: 'absolute', left: '15px', top: '15px', bottom: '15px', width: '3px', background: 'linear-gradient(to bottom, #FFB300, #1976D2)', opacity: 0.8, zIndex: 1 }}></div>
            <div style={{ position: 'absolute', right: '15px', top: '15px', bottom: '15px', width: '3px', background: 'linear-gradient(to top, #FFB300, #1976D2)', opacity: 0.8, zIndex: 1 }}></div>

            {/* Header Content */}
            <div style={{ zIndex: 2, textAlign: 'center', marginTop: '10px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '3px',
                color: '#FFB300',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '8px'
              }}>
                Administrasi & Perencanaan Ajar
              </span>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '900',
                color: '#0D47A1',
                lineHeight: '1.2',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                margin: '5px 0 15px'
              }}>
                Buku Kerja Guru
              </h1>
              
              {/* Dual Accent Divider */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', margin: '15px auto' }}>
                <div style={{ width: '50px', height: '3px', background: '#1976D2', borderRadius: '2px' }}></div>
                <div style={{ width: '8px', height: '8px', transform: 'rotate(45deg)', background: '#FFB300' }}></div>
                <div style={{ width: '50px', height: '3px', background: '#1976D2', borderRadius: '2px' }}></div>
              </div>
            </div>

            {/* Subject Banner (Premium Corporate Card) */}
            <div style={{ zIndex: 2, textAlign: 'center', width: '90%', margin: '0 auto' }}>
              <div style={{
                background: 'linear-gradient(135deg, #0D47A1 0%, #1A237E 100%)',
                border: '2px solid #FFB300',
                borderRadius: '16px',
                padding: '24px 20px',
                boxShadow: '0 10px 25px rgba(13, 71, 161, 0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Subtle light arc overlay */}
                <div style={{
                  position: 'absolute',
                  top: '-100px',
                  right: '-100px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  pointerEvents: 'none'
                }}></div>
                
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  letterSpacing: '0.8px',
                  lineHeight: '1.4',
                  margin: 0,
                  textTransform: 'uppercase'
                }}>
                  {schoolInfoData.mapel}
                </h2>
                
                <div style={{
                  display: 'inline-block',
                  marginTop: '15px',
                  background: 'rgba(255, 179, 0, 0.15)',
                  border: '1px solid #FFB300',
                  borderRadius: '30px',
                  padding: '6px 18px',
                  fontSize: '11px',
                  fontWeight: '800',
                  color: '#FFB300',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Fase {fase} — Kelas {selectedClass} ({fase === 'E' ? 'X' : selectedClass === 'XI' ? 'XI' : 'XII'})
                </div>
              </div>

              <div style={{
                fontSize: '13px',
                fontWeight: '800',
                color: '#1E293B',
                marginTop: '15px',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Semester {sem.toUpperCase()}
              </div>
            </div>

            {/* School Logo Section (Elegant circular frame) */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, margin: '20px 0' }}>
              <div style={{
                width: '115px',
                height: '115px',
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(13, 71, 161, 0.12)',
                border: '3px solid #1976D2',
                position: 'relative'
              }}>
                <img
                  src="/logosmk.png"
                  alt="Logo SMK Muhammadiyah 2 Genteng"
                  style={{ width: '75px', height: '75px', objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/80/1976D2/FFFFFF?text=SMK+MUH2';
                  }}
                />
                {/* Decorative outer dash ring */}
                <div style={{
                  position: 'absolute',
                  top: '-6px', left: '-6px', right: '-6px', bottom: '-6px',
                  borderRadius: '50%',
                  border: '1px dashed #FFB300',
                  pointerEvents: 'none'
                }}></div>
              </div>
              
              <div style={{
                marginTop: '12px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '0.8px',
                color: '#0D47A1',
                textTransform: 'uppercase'
              }}>
                SMKS Muhammadiyah 2 Genteng
              </div>
              <div style={{
                fontSize: '10px',
                fontWeight: '600',
                color: '#64748B',
                marginTop: '2px'
              }}>
                Terakreditasi A — Pusat Keunggulan (PK)
              </div>
            </div>

            {/* Identity Box (Glassmorphic Profile Card) */}
            <div style={{
              width: '85%',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #E2E8F0',
              borderLeft: '5px solid #FFB300',
              borderRadius: '12px',
              padding: '20px 24px',
              boxShadow: '0 8px 20px rgba(13, 71, 161, 0.04)',
              margin: '0 auto',
              zIndex: 2,
              position: 'relative'
            }}>
              <h4 style={{
                fontSize: '10px',
                fontWeight: '800',
                color: '#1976D2',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '12px',
                borderBottom: '1px dashed #E2E8F0',
                paddingBottom: '6px'
              }}>
                Data Penyusun & Administrasi
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                  <span style={{ width: '130px', fontSize: '11px', fontWeight: '700', color: '#64748B' }}>Nama Lengkap</span>
                  <span style={{ flex: 1, fontSize: '11px', fontWeight: '800', color: '#0D47A1' }}>: {schoolInfoData.namaGuru}</span>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                  <span style={{ width: '130px', fontSize: '11px', fontWeight: '700', color: '#64748B' }}>NBM / NIP</span>
                  <span style={{ flex: 1, fontSize: '11px', fontWeight: '700', color: '#0D47A1' }}>: {schoolInfoData.nbmGuru || '-'}</span>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                  <span style={{ width: '130px', fontSize: '11px', fontWeight: '700', color: '#64748B' }}>Instansi</span>
                  <span style={{ flex: 1, fontSize: '11px', fontWeight: '700', color: '#0D47A1' }}>: {schoolInfoData.name}</span>
                </div>
                <div style={{ display: 'flex', paddingBottom: '2px' }}>
                  <span style={{ width: '130px', fontSize: '11px', fontWeight: '700', color: '#64748B' }}>Tahun Pelajaran</span>
                  <span style={{ flex: 1, fontSize: '11px', fontWeight: '700', color: '#0D47A1' }}>: {schoolInfoData.tahunAjaran}</span>
                </div>
              </div>
            </div>

            {/* Elegant Corporate Footer */}
            <div style={{ zIndex: 2, position: 'relative', width: '100%', borderTop: '2px solid #E2E8F0', paddingTop: '15px', textAlign: 'center' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '800',
                color: '#0D47A1',
                letterSpacing: '0.8px',
                textTransform: 'uppercase'
              }}>
                Majelis Pendidikan Dasar Menengah dan Pendidikan Nonformal
              </div>
              <div style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#64748B',
                marginTop: '3px',
                textTransform: 'uppercase'
              }}>
                Pimpinan Cabang Muhammadiyah Genteng
              </div>
              <div style={{
                fontSize: '9px',
                color: '#94A3B8',
                marginTop: '4px',
                fontWeight: '500'
              }}>
                Banyuwangi — Jawa Timur — Indonesia
              </div>
            </div>
          </div>
        );


      case 'judul':
        return (
          <div key="judul" className="a4-page">
            <div className="cover-border" style={{ borderColor: '#666', borderStyle: 'double' }}>
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>HALAMAN JUDUL</h2>
                <hr style={{ width: '100px', margin: '20px auto', borderColor: '#333' }} />
              </div>

              <div style={{ textAlign: 'center', margin: '40px 0' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.5' }}>
                  PERANGKAT PEMBELAJARAN LENGKAP
                </h1>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginTop: '10px' }}>{schoolInfoData.mapel}</h3>
              </div>

              <div style={{ margin: '50px 0', textAlign: 'center' }}>
                <p>Diajukan Sebagai Dokumen Pelaksanaan Kegiatan Pembelajaran</p>
                <p>Kurikulum Merdeka</p>
                <p>Tahun Pelajaran {schoolInfoData.tahunAjaran}</p>
              </div>

              <div className="identity-box" style={{ width: '90%', margin: '0 auto' }}>
                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '150px', padding: '6px 0', fontWeight: 'bold' }}>Mata Pelajaran</td>
                      <td style={{ padding: '6px 0' }}>: {schoolInfoData.mapel}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold', padding: '6px 0' }}>Fase / Kelas</td>
                      <td style={{ padding: '6px 0' }}>: {fase} / {selectedClass}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold', padding: '6px 0' }}>Semester</td>
                      <td style={{ padding: '6px 0' }}>: {sem.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold', padding: '6px 0' }}>Guru Pengampu</td>
                      <td style={{ padding: '6px 0' }}>: {schoolInfoData.namaGuru}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold', padding: '6px 0' }}>Instansi</td>
                      <td style={{ padding: '6px 0' }}>: SMKS Muhammadiyah 2 Genteng</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '40px', fontSize: '11px', color: '#555' }}>
                <p>SMKS MUHAMMADIYAH 2 GENTENG</p>
                <p>Kabupaten Banyuwangi - Jawa Timur</p>
              </div>
            </div>
          </div>
        );

      case 'identitas':
        return (
          <div key="identitas" className="a4-page">
            <h2 className="page-title">IDENTITAS SATUAN PENDIDIKAN & GURU</h2>
            <div className="page-subtitle">Profil Resmi Satuan Pendidikan dan Administrasi Pelaksana Kurikulum</div>

            <div style={{ marginTop: '20px' }}>
              <h3 style={{ borderBottom: '2px solid #1976D2', color: '#1976D2', paddingBottom: '4px', marginBottom: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                A. PROFIL SATUAN PENDIDIKAN
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', marginBottom: '20px' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold', width: '32%' }}>Nama Sekolah</td><td style={{ padding: '5px 0', width: '3%' }}>:</td><td style={{ padding: '5px 0', fontWeight: 'bold', color: '#0D47A1' }}>SMKS MUHAMMADIYAH 2 GENTENG</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Alamat Lengkap</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>Jl. Hasanudin 103 Genteng</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold', paddingLeft: '15px' }}>- Jalan</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>Jl. Hasanudin</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold', paddingLeft: '15px' }}>- Desa / Kelurahan</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>Genteng Wetan</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold', paddingLeft: '15px' }}>- Kecamatan</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>Genteng</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold', paddingLeft: '15px' }}>- Kabupaten / Kota</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>Banyuwangi</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold', paddingLeft: '15px' }}>- Provinsi</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>Jawa Timur</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold', paddingLeft: '15px' }}>- Kode Pos</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>68465</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>No. Telepon / HP / Fax</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>0333 846292</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>NPSN / Jenjang / Status</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>20525622 / SMK / Swasta</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Email Resmi</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0', color: '#1565C0' }}>smk_stm2_gtg@yahoo.co.id</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Website Resmi</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0', color: '#1565C0' }}>www.smkmuh2genteng.sch.id</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>SK & Tanggal Pendirian</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>0109/III.A/1.D/2000 (30 September 2002)</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>SK & Tgl Izin Operasional</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>P2T/1027/19.08/02/VIII/2019 (01 Agustus 2019)</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Status Kepemilikan & Tanah</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>Yayasan / Milik Yayasan</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Luas Tanah / Status Bangunan</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>20.200 m² / Milik Yayasan</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Sumber & Daya Listrik</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>PLN & Diesel (175.000 VA)</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Mulai Operasional</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>1976</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Akreditasi Sekolah</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0', fontWeight: 'bold' }}>A</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Nama Kepala Sekolah</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>Tamyis Rosidi, S.Pd., M.Pd. (NBM. 1067597)</td></tr>
                </tbody>
              </table>

              <h3 style={{ borderBottom: '2px solid #1976D2', color: '#1976D2', paddingBottom: '4px', marginBottom: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                B. ADMINISTRASI PELAKSANA KURIKULUM & GURU
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold', width: '32%' }}>Mata Pelajaran</td><td style={{ padding: '5px 0', width: '3%' }}>:</td><td style={{ padding: '5px 0', fontWeight: 'bold', color: '#0D47A1' }}>Pendidikan Agama Islam & Budi Pekerti</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Fase / Kelas</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>{fase} / {selectedClass}</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Tahun Pelajaran</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>{academicYear}</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Guru Pengampu</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>{teacherName || '........................................'} (NBM. {teacherNbm || '......................'})</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Waka Kurikulum</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>{schoolInfoData.wakaKurikulum} (NBM. {schoolInfoData.nbmWaka})</td></tr>
                  <tr style={{ borderBottom: '1px solid #E0E0E0' }}><td style={{ padding: '5px 0', fontWeight: 'bold' }}>Alokasi JP Akat</td><td style={{ padding: '5px 0' }}>:</td><td style={{ padding: '5px 0' }}>{schoolInfoData.mingguEfektif} Minggu Efektif ({schoolInfoData.mingguEfektif * schoolInfoData.jpPerMinggu} JP per Semester) / {schoolInfoData.jpPerMinggu} JP per Pekan</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'daftar-isi': {
        const ganjilMateri = activeFaseData.semester.ganjil.materi;
        const genapMateri = activeFaseData.semester.genap.materi;
        
        const ganjilBabStart = ganjilMateri[0]?.bab || 1;
        const ganjilBabEnd = ganjilMateri[ganjilMateri.length - 1]?.bab || 5;
        
        const genapBabStart = genapMateri[0]?.bab || 6;
        const genapBabEnd = genapMateri[genapMateri.length - 1]?.bab || 10;

        return (
          <div key="daftar-isi" className="a4-page">
            <h2 className="page-title">DAFTAR ISI PERANGKAT</h2>
            <div className="page-subtitle">Sistematika Berkas Perangkat Pembelajaran Tahunan ({schoolInfoData.mapel})</div>

            <div style={{ marginTop: '20px', fontSize: '10.5px' }}>
              <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                <span>SAMPUL DEPAN BUKU</span>
                <span>Halaman i</span>
              </div>
              <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                <span>HALAMAN JUDUL DOKUMEN</span>
                <span>Halaman ii</span>
              </div>
              <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                <span>IDENTITAS SATUAN PENDIDIKAN & GURU</span>
                <span>Halaman iii</span>
              </div>
              <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc', fontWeight: 'bold' }}>
                <span>DAFTAR ISI PERANGKAT</span>
                <span>Halaman iv</span>
              </div>

              {viewMode === 'single' && sem === 'genap' ? null : (
                <>
                  <div style={{ margin: '10px 0 4px 0', fontWeight: '800', color: '#0D47A1', fontSize: '11px', borderBottom: '1px solid #0D47A1', paddingBottom: '2px' }}>
                    BAGIAN I: ADMINISTRASI SEKOLAH & SEMESTER GANJIL
                  </div>

                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>1. RINCIAN PEKAN EFEKTIF (RPE) SEMESTER GANJIL</span>
                    <span>Seksi 1</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>2. PROGRAM TAHUNAN (PROTA)</span>
                    <span>Seksi 2</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>3. PROGRAM SEMESTER (PROMES) GANJIL</span>
                    <span>Seksi 3</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>4. ANALISA CAPAIAN PEMBELAJARAN (CP) GANJIL</span>
                    <span>Seksi 4</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>5. ALUR TUJUAN PEMBELAJARAN (ATP) GANJIL</span>
                    <span>Seksi 5</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>6. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP) GANJIL</span>
                    <span>Seksi 6</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc', fontWeight: 'bold', color: '#1976D2' }}>
                    <span>7. MODUL AJAR / PPM GANJIL (BAB {ganjilBabStart} S.D BAB {ganjilBabEnd})</span>
                    <span>Seksi 7</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>8. KISI-KISI SOAL ASESMEN GANJIL</span>
                    <span>Seksi 8</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>9. KARTU SOAL & KUNCI JAWABAN GANJIL</span>
                    <span>Seksi 9</span>
                  </div>
                </>
              )}

              {viewMode === 'single' && sem === 'ganjil' ? null : (
                <>
                  <div style={{ margin: '12px 0 4px 0', fontWeight: '800', color: '#0D47A1', fontSize: '11px', borderBottom: '1px solid #0D47A1', paddingBottom: '2px' }}>
                    BAGIAN II: ADMINISTRASI SEMESTER GENAP
                  </div>

                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>10. RINCIAN PEKAN EFEKTIF (RPE) SEMESTER GENAP</span>
                    <span>Seksi 10</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>11. PROGRAM SEMESTER (PROMES) GENAP</span>
                    <span>Seksi 11</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>12. ANALISA CAPAIAN PEMBELAJARAN (CP) GENAP</span>
                    <span>Seksi 12</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>13. ALUR TUJUAN PEMBELAJARAN (ATP) GENAP</span>
                    <span>Seksi 13</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>14. KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP) GENAP</span>
                    <span>Seksi 14</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc', fontWeight: 'bold', color: '#1976D2' }}>
                    <span>15. MODUL AJAR / PPM GENAP (BAB {genapBabStart} S.D BAB {genapBabEnd})</span>
                    <span>Seksi 15</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>16. KISI-KISI SOAL ASESMEN GENAP</span>
                    <span>Seksi 16</span>
                  </div>
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc' }}>
                    <span>17. KARTU SOAL & KUNCI JAWABAN GENAP</span>
                    <span>Seksi 17</span>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      }

      case 'pekan-efektif':
        return (
          <div key="pekan-efektif" className="a4-page">
            <h2 className="page-title">RINCIAN PEKAN EFEKTIF</h2>
            <div className="page-subtitle">Analisa Distribusi Alokasi Pekan Efektif - Semester {sem.toUpperCase()} TA 2026/2027</div>

            <div style={{ marginTop: '20px', fontSize: '12px' }}>
              <h3 style={{ borderBottom: '2px solid #1976D2', color: '#1976D2', paddingBottom: '4px', marginBottom: '10px' }}>
                I. Perhitungan Pekan (Semester {sem === 'ganjil' ? 'Ganjil' : 'Genap'})
              </h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Bulan</th>
                    <th>Jumlah Pekan Terjadi</th>
                    <th>Jumlah Pekan Tidak Efektif</th>
                    <th>Jumlah Pekan Efektif</th>
                  </tr>
                </thead>
                <tbody>
                  {sem === 'ganjil' ? (
                    <>
                      <tr><td className="center">1</td><td>Juli 2026</td><td className="center">3</td><td className="center">1</td><td className="center">2</td></tr>
                      <tr><td className="center">2</td><td>Agustus 2026</td><td className="center">4</td><td className="center">1</td><td className="center">3</td></tr>
                      <tr><td className="center">3</td><td>September 2026</td><td className="center">4</td><td className="center">1</td><td className="center">3</td></tr>
                      <tr><td className="center">4</td><td>Oktober 2026</td><td className="center">4</td><td className="center">0</td><td className="center">4</td></tr>
                      <tr><td className="center">5</td><td>November 2026</td><td className="center">4</td><td className="center">0</td><td className="center">4</td></tr>
                      <tr><td className="center">6</td><td>Desember 2026</td><td className="center">3</td><td className="center">1</td><td className="center">2</td></tr>
                      <tr style={{ fontWeight: 'bold', background: '#E3F2FD' }}>
                        <td colSpan="2" className="center">JUMLAH</td>
                        <td className="center">22</td>
                        <td className="center">4</td>
                        <td className="center">18</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr><td className="center">1</td><td>Januari 2027</td><td className="center">4</td><td className="center">0</td><td className="center">4</td></tr>
                      <tr><td className="center">2</td><td>Februari 2027</td><td className="center">3</td><td className="center">1</td><td className="center">2</td></tr>
                      <tr><td className="center">3</td><td>Maret 2027</td><td className="center">3</td><td className="center">1</td><td className="center">2</td></tr>
                      <tr><td className="center">4</td><td>April 2027</td><td className="center">4</td><td className="center">0</td><td className="center">4</td></tr>
                      <tr><td className="center">5</td><td>Mei 2027</td><td className="center">4</td><td className="center">0</td><td className="center">4</td></tr>
                      <tr><td className="center">6</td><td>Juni 2027</td><td className="center">3</td><td className="center">1</td><td className="center">2</td></tr>
                      <tr style={{ fontWeight: 'bold', background: '#E3F2FD' }}>
                        <td colSpan="2" className="center">JUMLAH</td>
                        <td className="center">21</td>
                        <td className="center">3</td>
                        <td className="center">18</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>

              <h3 style={{ borderBottom: '2px solid #1976D2', color: '#1976D2', paddingBottom: '4px', margin: '20px 0 10px 0' }}>
                II. Analisa Pekan Tidak Efektif
              </h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Kegiatan Sekolah / Libur</th>
                    <th>Alokasi Waktu (Pekan)</th>
                  </tr>
                </thead>
                <tbody>
                  {sem === 'ganjil' ? (
                    <>
                      <tr><td className="center">1</td><td>Masa Pengenalan Lingkungan Sekolah (MPLS)</td><td className="center">1 Pekan</td></tr>
                      <tr><td className="center">2</td><td>Peringatan Hari Kemerdekaan RI & Maulid Nabi</td><td className="center">1 Pekan</td></tr>
                      <tr><td className="center">3</td><td>Penilaian Sumatif Tengah Semester (STS)</td><td className="center">1 Pekan</td></tr>
                      <tr><td className="center">4</td><td>Penilaian Sumatif Akhir Semester (PAS/SAS) & Rapor</td><td className="center">1 Pekan</td></tr>
                      <tr style={{ fontWeight: 'bold', background: '#FFEBEE' }}>
                        <td colSpan="2" className="center">TOTAL HARI / PEKAN TIDAK EFEKTIF</td>
                        <td className="center">4 Pekan</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr><td className="center">1</td><td>Kegiatan Permulaan Puasa / Penguatan Karakter</td><td className="center">1 Pekan</td></tr>
                      <tr><td className="center">2</td><td>Penilaian Sumatif Tengah Semester (STS) & Libur Idul Fitri</td><td className="center">1 Pekan</td></tr>
                      <tr><td className="center">3</td><td>Penilaian Sumatif Akhir Semester (PAT/SAS) & Rapor</td><td className="center">1 Pekan</td></tr>
                      <tr style={{ fontWeight: 'bold', background: '#FFEBEE' }}>
                        <td colSpan="2" className="center">TOTAL HARI / PEKAN TIDAK EFEKTIF</td>
                        <td className="center">3 Pekan</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>

              <h3 style={{ borderBottom: '2px solid #1976D2', color: '#1976D2', paddingBottom: '4px', margin: '20px 0 10px 0' }}>
                III. Kesimpulan Perhitungan Jam Pelajaran (JP)
              </h3>
              <div style={{ background: '#E3F2FD', padding: '12px', border: '1px solid #1976D2', borderRadius: '4px', lineHeight: '1.8' }}>
                <p>1. Pekan Efektif Riil = Total Pekan - Pekan Tidak Efektif = {sem === 'ganjil' ? '22 - 4' : '21 - 3'} = <strong>{schoolInfoData.mingguEfektif} Pekan</strong></p>
                <p>2. Jam Pelajaran Efektif = {schoolInfoData.mingguEfektif} Pekan × {schoolInfoData.jpPerMinggu} JP / Pekan = <strong>{schoolInfoData.mingguEfektif * schoolInfoData.jpPerMinggu} Jam Pelajaran (JP)</strong></p>
                <p>3. Penggunaan JP = {localMateriList.reduce((acc, m) => acc + m.alokasi, 0)} JP untuk Tatap Muka KBM + {schoolInfoData.mingguEfektif * schoolInfoData.jpPerMinggu - localMateriList.reduce((acc, m) => acc + m.alokasi, 0)} JP untuk STS/SAS & Cadangan Pembelajaran</p>
              </div>
            </div>
          </div>
        );

      case 'prota': {
        const showAll = viewMode === 'booklet';
        const monthsList = showAll 
          ? ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni']
          : (sem === 'ganjil'
            ? ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
            : ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni']);
            
        const jpPerMinggu = schoolInfoData.jpPerMinggu;
        
        const getMonthlyJP = (sm, isGenap) => {
          const jpPerMonth = Array(6).fill(0);
          sm.schedule.forEach(wIdx => {
            const mIdx = Math.floor(wIdx / 4); // 4 weeks per month
            if (mIdx >= 0 && mIdx < 6) {
              jpPerMonth[mIdx] += jpPerMinggu;
            }
          });
          return jpPerMonth;
        };

        return (
          <div key="prota" className="a4-page" style={{ padding: '15mm 15mm' }}>
            <h2 className="page-title">PROGRAM TAHUNAN (PROTA)</h2>
            <div className="page-subtitle">Distribusi Alokasi JP Bulanan - Fase {fase} TA {schoolInfoData.tahunAjaran}</div>

            <div style={{ marginTop: '20px', overflowX: 'auto' }}>
              <table className="data-table" style={{ fontSize: '9px', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ width: '4%' }}>Sem</th>
                    <th style={{ width: '4%' }}>Bab</th>
                    <th style={{ width: '40%' }}>Tujuan Pembelajaran (TP)</th>
                    <th style={{ width: '8%' }}>Alokasi (JP)</th>
                    {monthsList.map((m, idx) => (
                      <th key={idx} style={{ minWidth: '35px' }}>{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(viewMode === 'single' ? [activeFaseData.semester[sem]] : [activeFaseData.semester.ganjil, activeFaseData.semester.genap]).map((semData, semIdx) => {
                    const isGenap = viewMode === 'single' ? sem === 'genap' : semIdx === 1;
                    const weeksArray = isGenap ? genapWeeksList : ganjilWeeksList;
                    const scheduledMateri = getTeachingSchedule(semData.materi, weeksArray);
                    
                    return scheduledMateri.map((sm, idx) => {
                      const monthlyJp = getMonthlyJP(sm, isGenap);
                      return (
                        <tr key={`${semData.nama}-${idx}`}>
                          {idx === 0 && (
                            <td rowSpan={semData.materi.length} className="center" style={{ fontWeight: 'bold', verticalAlign: 'middle', background: '#F5F5F5' }}>
                              {semData.nama}
                            </td>
                          )}
                          <td className="center">{sm.bab}</td>
                          <td>
                            <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '8.5px' }}>
                              {sm.tp.map((t, tIdx) => (
                                <li key={tIdx} style={{ marginBottom: '2px' }}>{t}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="center" style={{ fontWeight: 'bold' }}>{sm.alokasi} JP</td>
                          {monthsList.map((m, mColIdx) => {
                            let jpVal = 0;
                            if (showAll) {
                              if (isGenap) {
                                if (mColIdx >= 6) jpVal = monthlyJp[mColIdx - 6];
                              } else {
                                if (mColIdx < 6) jpVal = monthlyJp[mColIdx];
                              }
                            } else {
                              jpVal = monthlyJp[mColIdx];
                            }
                            return (
                              <td key={mColIdx} className="center" style={{ background: jpVal > 0 ? '#BBDEFB' : '', fontWeight: jpVal > 0 ? 'bold' : '' }}>
                                {jpVal > 0 ? `${jpVal} JP` : ''}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    });
                  })}
                  {/* Total Row */}
                  <tr style={{ background: '#E3F2FD', fontWeight: 'bold' }}>
                    <td colSpan="4" style={{ textAlign: 'right', paddingRight: '15px' }}>
                      TOTAL JAM PELAJARAN {viewMode === 'single' ? `SEMESTER ${sem.toUpperCase()}` : 'KBM EFEKTIF PER TAHUN'}
                    </td>
                    <td className="center">
                      {(viewMode === 'single'
                        ? activeFaseData.semester[sem].materi.reduce((acc, m) => acc + m.alokasi, 0)
                        : activeFaseData.semester.ganjil.materi.reduce((acc, m) => acc + m.alokasi, 0) +
                          activeFaseData.semester.genap.materi.reduce((acc, m) => acc + m.alokasi, 0))} JP
                    </td>
                    {monthsList.map((m, mColIdx) => {
                      let colSum = 0;
                      if (viewMode === 'single') {
                        const weeksArray = sem === 'genap' ? genapWeeksList : ganjilWeeksList;
                        const scheduled = getTeachingSchedule(activeFaseData.semester[sem].materi, weeksArray);
                        scheduled.forEach(sm => {
                          const monthlyJp = getMonthlyJP(sm, sem === 'genap');
                          colSum += monthlyJp[mColIdx];
                        });
                      } else {
                        const scheduledGanjil = getTeachingSchedule(activeFaseData.semester.ganjil.materi, ganjilWeeksList);
                        scheduledGanjil.forEach(sm => {
                          const monthlyJp = getMonthlyJP(sm, false);
                          if (mColIdx < 6) colSum += monthlyJp[mColIdx];
                        });
                        const scheduledGenap = getTeachingSchedule(activeFaseData.semester.genap.materi, genapWeeksList);
                        scheduledGenap.forEach(sm => {
                          const monthlyJp = getMonthlyJP(sm, true);
                          if (mColIdx >= 6) colSum += monthlyJp[mColIdx - 6];
                        });
                      }
                      return (
                        <td key={mColIdx} className="center" style={{ background: '#E3F2FD', fontWeight: 'bold' }}>
                          {colSum > 0 ? `${colSum} JP` : ''}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '50px' }}>
              <SignatureBlock semOverride={sem} />
            </div>
          </div>
        );
      }

      case 'promes': {
        const weeksArray = sem === 'ganjil' ? ganjilWeeksList : genapWeeksList;
        const scheduledMateri = getTeachingSchedule(localMateriList, weeksArray);
        return (
          <div key="promes" className="a4-page" style={{ padding: '15mm 15mm' }}>
            <h2 className="page-title">PROGRAM SEMESTER (PROMES)</h2>
            <div className="page-subtitle">Distribusi KBM Pekanan - Semester {sem.toUpperCase()} TA {schoolInfoData.tahunAjaran}</div>

            <div style={{ marginTop: '15px', overflowX: 'auto' }}>
              <table className="data-table" style={{ fontSize: '9px', width: '100%' }}>
                <thead>
                  <tr>
                    <th rowSpan="2" style={{ width: '4%' }}>Bab</th>
                    <th rowSpan="2" style={{ width: '40%' }}>Tujuan Pembelajaran (TP)</th>
                    <th rowSpan="2" style={{ width: '8%' }}>Alokasi (JP)</th>
                    {sem === 'ganjil' ? (
                      <>
                        <th colSpan="4">Juli</th>
                        <th colSpan="4">Agustus</th>
                        <th colSpan="4">September</th>
                        <th colSpan="4">Oktober</th>
                        <th colSpan="4">November</th>
                        <th colSpan="4">Desember</th>
                      </>
                    ) : (
                      <>
                        <th colSpan="4">Januari</th>
                        <th colSpan="4">Februari</th>
                        <th colSpan="4">Maret</th>
                        <th colSpan="4">April</th>
                        <th colSpan="4">Mei</th>
                        <th colSpan="4">Juni</th>
                      </>
                    )}
                  </tr>
                  <tr>
                    {Array.from({ length: 24 }).map((_, idx) => (
                      <th key={idx} style={{ padding: '2px', minWidth: '12px' }}>{idx % 4 + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduledMateri.map((sm, mIdx) => {
                    return (
                      <tr key={mIdx}>
                        <td className="center">{sm.bab}</td>
                        <td>
                          <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '8.5px' }}>
                            {sm.tp.map((t, tIdx) => (
                              <li key={tIdx} style={{ marginBottom: '2px' }}>{t}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="center" style={{ fontWeight: 'bold' }}>{sm.alokasi} JP</td>
                        {weeksArray.map((w, wIdx) => {
                          const willTeach = sm.schedule.includes(wIdx);
                          let text = '';
                          let bg = '';
                          if (willTeach) {
                            text = schoolInfoData.jpPerMinggu;
                            bg = '#BBDEFB';
                          } else if (w.status === 'non-efektif') {
                            text = w.label;
                            bg = '#FFCDD2';
                          } else if (w.status === 'empty' && w.label) {
                            text = w.label;
                            bg = '#FFE082';
                          }
                          return (
                            <td key={wIdx} className="center" style={{ background: bg, fontWeight: 'bold' }}>
                              {text}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  {/* Exam weeks */}
                  <tr style={{ background: '#FFCDD2', fontWeight: 'bold' }}>
                    <td className="center">-</td>
                    <td>Penilaian Sumatif Akhir Semester ({sem === 'ganjil' ? 'PAS' : 'PAT'})</td>
                    <td className="center">{schoolInfoData.jpPerMinggu} JP</td>
                    {weeksArray.map((w, wIdx) => (
                      <td key={wIdx} className="center" style={{ background: w.label === 'PAS' || w.label === 'PAT' ? '#FFCDD2' : '' }}>
                        {w.label === 'PAS' || w.label === 'PAT' ? schoolInfoData.jpPerMinggu : ''}
                      </td>
                    ))}
                  </tr>
                  <tr style={{ background: '#FFE082', fontWeight: 'bold' }}>
                    <td className="center">-</td>
                    <td>Pembagian Rapor & Libur Semester</td>
                    <td className="center">-</td>
                    {weeksArray.map((w, wIdx) => (
                      <td key={wIdx} className="center" style={{ background: w.label === 'L' ? '#FFE082' : '' }}>
                        {w.label === 'L' ? 'L' : ''}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '40px' }}>
              <SignatureBlock semOverride={sem} />
            </div>
          </div>
        );
      }

      case 'analisis-cp':
        return (
          <div key="analisis-cp" className="a4-page">
            <h2 className="page-title">ANALISA CAPAIAN PEMBELAJARAN (CP)</h2>
            <div className="page-subtitle">Uraian Kompetensi dan Lingkup Materi Capaian Pembelajaran</div>

            <div style={{ marginTop: '20px', fontSize: '11px' }}>
              {materiList.map((m, mIdx) => (
                <div key={mIdx} style={{ border: '1px solid #333', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>
                  <div style={{ background: '#1976D2', color: 'white', padding: '6px', fontWeight: 'bold', borderRadius: '2px', marginBottom: '8px' }}>
                    ELEMEN: {m.elemen.toUpperCase()} (BAB {m.bab})
                  </div>
                  <p style={{ margin: '6px 0', lineHeight: '1.5', background: '#F5F5F5', padding: '8px', borderLeft: '3px solid #1976D2' }}>
                    <strong>Teks CP:</strong> <em>"{m.capaian}"</em>
                  </p>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px', fontSize: '11px' }}>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #333', padding: '6px', fontWeight: 'bold', width: '25%', background: '#F9FBE7' }}>Kompetensi Utama</td>
                        <td style={{ border: '1px solid #333', padding: '6px' }}>Menganalisis, Memahami, Mempresentasikan, Menyajikan, Membiasakan, Berperilaku terpuji.</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #333', padding: '6px', fontWeight: 'bold', background: '#F9FBE7' }}>Lingkup Materi Esensial</td>
                        <td style={{ border: '1px solid #333', padding: '6px' }}><ArabicText text={m.judul} /></td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #333', padding: '6px', fontWeight: 'bold', background: '#F9FBE7' }}>Tujuan Pembelajaran (TP)</td>
                        <td style={{ border: '1px solid #333', padding: '6px' }}>
                          <ul style={{ margin: '0', paddingLeft: '16px' }}>
                            {m.tp.map((t, tIdx) => <li key={tIdx}>{t}</li>)}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '30px' }}>
              <SignatureBlock semOverride={sem} />
            </div>
          </div>
        );

      case 'atp':
        return (
          <div key="atp" className="a4-page" style={{ padding: '15mm 15mm' }}>
            <h2 className="page-title">ALUR TUJUAN PEMBELAJARAN (ATP)</h2>
            <div className="page-subtitle">Sistematika Uraian Langkah Tujuan Pembelajaran - Fase {fase}</div>

            <div style={{ marginTop: '20px' }}>
              <table className="data-table" style={{ fontSize: '9px' }}>
                <thead>
                  <tr>
                    <th style={{ width: '15%' }}>Elemen</th>
                    <th style={{ width: '35%' }}>Tujuan Pembelajaran (TP)</th>
                    <th style={{ width: '10%' }}>JP</th>
                    <th style={{ width: '20%' }}>Asesmen Rencana</th>
                    <th style={{ width: '20%' }}>Glosarium Pokok</th>
                  </tr>
                </thead>
                <tbody>
                  {materiList.map((m, mIdx) => (
                    <React.Fragment key={mIdx}>
                      {m.tp.map((t, tIdx) => (
                        <tr key={tIdx}>
                          {tIdx === 0 && (
                            <td rowSpan={m.tp.length} style={{ fontWeight: 'bold', background: '#E3F2FD' }}>
                              {m.elemen} <br/>(Bab {m.bab})
                            </td>
                          )}
                          <td>{t}</td>
                          <td className="center">{tIdx === 0 ? m.alokasi : ''} JP</td>
                          <td>Formatif: Tes Tulis, Penilaian Diri, LKPD kelompok</td>
                          <td>
                            {tIdx === 0 ? 'Tartil, Tajwid, Etos Kerja, Akulturasi' : tIdx === 1 ? 'Syu\'ab al-iman, Aqidah' : 'Akhlak Mahmudah'}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '45px' }}>
              <SignatureBlock semOverride={sem} />
            </div>
          </div>
        );

      case 'kktp':
        return (
          <div key="kktp" className="a4-page">
            <h2 className="page-title">KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN</h2>
            <div className="page-subtitle">KKTP dengan Metode Interval Nilai Kriteria Kelulusan</div>

            <div style={{ marginTop: '20px', fontSize: '11px' }}>
              <p style={{ marginBottom: '10px' }}>
                Interval Kriteria digunakan untuk menentukan tingkat ketuntasan peserta didik dalam memahami materi esensial Pendidikan Agama Islam & Budi Pekerti:
              </p>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Interval Nilai</th>
                    <th>Kriteria Ketuntasan</th>
                    <th>Tindak Lanjut / Intervensi Guru</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: '#FFCDD2' }}>
                    <td className="center"><strong>0% - 40%</strong></td>
                    <td>Belum Mencapai Ketuntasan</td>
                    <td>Remedial di seluruh bagian materi dengan bimbingan khusus dari Guru / Peer tutoring.</td>
                  </tr>
                  <tr style={{ background: '#FFE0B2' }}>
                    <td className="center"><strong>41% - 74%</strong></td>
                    <td>Belum Mencapai Ketuntasan</td>
                    <td>Remedial pada indikator tujuan yang belum dikuasai (mengulang sebagian materi).</td>
                  </tr>
                  <tr style={{ background: '#E3F2FD' }}>
                    <td className="center"><strong>75% - 88%</strong></td>
                    <td>Sudah Mencapai Ketuntasan</td>
                    <td>KBM tuntas, siswa melanjutkan ke materi berikutnya tanpa perbaikan.</td>
                  </tr>
                  <tr style={{ background: '#C8E6C9' }}>
                    <td className="center"><strong>89% - 100%</strong></td>
                    <td>Sangat Tuntas (Istimewa)</td>
                    <td>Pengayaan, diberikan tugas mandiri/tambahan pendalaman atau tutor sebaya bagi kelompok kurang.</td>
                  </tr>
                </tbody>
              </table>

              <h4 style={{ color: '#1976D2', marginTop: '20px', marginBottom: '8px' }}>
                Aplikasi Rubrik Asesmen Bab Aktif:
              </h4>
              <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px', background: '#F9FBE7' }}>
                <strong>Bab {activeMateri.bab}: <ArabicText text={activeMateri.judul} /></strong>
                <ul style={{ margin: '8px 0 0 20px', padding: '0' }}>
                  {activeMateri.tp?.map((tp, tpIdx) => (
                    <li key={tpIdx} style={{ marginBottom: '6px' }}>
                      <strong>TP {tpIdx + 1}:</strong> {tp}
                      <br/>
                      <span style={{ fontSize: '10px', color: '#666' }}>
                        * Alat Ukur: Lembar portofolio, tes objektif, rubrik presentasi.
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '40px' }}>
              <SignatureBlock semOverride={sem} />
            </div>
          </div>
        );

      case 'modul': {
        const activeMateri = specificBab 
          ? (localMateriList.find(m => m.bab === specificBab) || localMateriList[0])
          : (localMateriList.find(m => m.bab === selectedPpmBab) || localMateriList[0]);

        const ppmDetails = getPpmDetails(fase, activeMateri.bab, selectedMapel, selectedClass);

        return (
          <div key={`modul-${activeMateri.bab}`} className="a4-page" style={{ padding: '15mm 15mm' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="no-print">
              <h2 className="page-title" style={{ margin: '0' }}>MODUL AJAR (PPM)</h2>
              <div style={{ fontSize: '11px', background: '#E3F2FD', padding: '6px', border: '1px solid #90CAF9', borderRadius: '4px' }}>
                Pilih Bab PPM:
                <select
                  value={selectedPpmBab}
                  onChange={(e) => setSelectedPpmBab(parseInt(e.target.value))}
                  style={{ marginLeft: '6px', padding: '2px', fontWeight: 'bold' }}
                >
                  {materiList.map((m) => (
                    <option key={m.bab} value={m.bab}>Bab {m.bab}: <ArabicText text={m.judul} /></option>
                  ))}
                </select>
              </div>
            </div>
            <div className="page-subtitle no-print">Perencanaan Pembelajaran Mendalam (PPM) {selectedMapel === 'arab' ? 'Bahasa Arab' : selectedMapel === 'kemuh' ? 'Kemuhammadiyahan' : 'PAI'}</div>
            <hr className="no-print" style={{ margin: '15px 0' }} />

            <div style={{ fontSize: '11.5px', lineHeight: '1.6' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary-dark)' }}>PERENCANAAN PEMBELAJARAN MENDALAM (PPM)</h3>
                <h4 style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>{schoolInfoData.name}</h4>
              </div>

              {/* SECTION 1: Identitas PPM - Grid layout, NO Table! */}
              <div className="modern-card" style={{ borderLeftColor: 'var(--primary-dark)' }}>
                <div className="modern-card-header">
                  <span>I. IDENTITAS MODUL AJAR</span>
                  <span className="pill-badge active">Dokumen PPM</span>
                </div>
                <div className="metadata-grid" style={{ margin: '0', gap: '10px' }}>
                  <div className="metadata-card" style={{ padding: '8px 12px' }}>
                    <span className="metadata-label">Nama Penyusun</span>
                    <span className="metadata-value" style={{ fontSize: '12px' }}>{schoolInfoData.namaGuru}</span>
                  </div>
                  <div className="metadata-card" style={{ padding: '8px 12px' }}>
                    <span className="metadata-label">Satuan Pendidikan</span>
                    <span className="metadata-value" style={{ fontSize: '12px' }}>{schoolInfoData.name}</span>
                  </div>
                  <div className="metadata-card" style={{ padding: '8px 12px' }}>
                    <span className="metadata-label">Kelas / Fase</span>
                    <span className="metadata-value" style={{ fontSize: '12px' }}>{selectedClass} / {fase}</span>
                  </div>
                  <div className="metadata-card" style={{ padding: '8px 12px' }}>
                    <span className="metadata-label">Prediksi Alokasi Waktu</span>
                    <span className="metadata-value" style={{ fontSize: '12px' }}>{activeMateri.alokasi} JP ({activeMateri.minggu} Pekan × {schoolInfoData.jpPerMinggu} JP)</span>
                  </div>
                  <div className="metadata-card" style={{ gridColumn: 'span 2', padding: '8px 12px' }}>
                    <span className="metadata-label">Materi Pembelajaran</span>
                    <span className="metadata-value" style={{ fontSize: '12px' }}><ArabicText text={activeMateri.judul} /></span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Desain Pembelajaran, CP, & Sarana Prasarana - Cards, NO Table! */}
              <div className="modern-card">
                <div className="modern-card-header">
                  <span>II. DESAIN PEMBELAJARAN, CP, & SARANA PRASARANA</span>
                  <span className="pill-badge">Kurikulum Merdeka</span>
                </div>
                <div className="modern-card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  <div>
                    <p style={{ marginBottom: '10px', background: '#F8FAFC', padding: '10px', borderRadius: '4px', borderLeft: '3px solid var(--primary-light)' }}>
                      <strong>Capaian Pembelajaran (CP):</strong> <br />
                      <em>"{activeMateri.capaian}"</em>
                    </p>
                    <div style={{ marginBottom: '10px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div><strong>Kompetensi Awal:</strong> Peserta didik memiliki pemahaman dasar tentang materi prasyarat sebelum memasuki topik ini.</div>
                      <div><strong>Pendekatan:</strong> TPACK (Technological Pedagogical Content Knowledge) & Pembelajaran Berdiferensiasi.</div>
                      <div><strong>Model Pembelajaran:</strong> Discovery Learning / Problem-Based Learning.</div>
                      <div><strong>Target Peserta Didik:</strong> Regular (30 Siswa) & Pencapaian Tinggi (Fast Learners).</div>
                    </div>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '6px', fontSize: '11px' }}>Sarana & Prasarana:</strong>
                    <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '11px' }}>
                      {ppmDetails.saranaPrasarana.map((s, sIdx) => (
                        <li key={sIdx} style={{ marginBottom: '3px' }}>{s}</li>
                      ))}
                    </ul>
                    <p style={{ marginTop: '10px', fontSize: '11px' }}>
                      <strong>Media Digital:</strong> Google Drive, Youtube Islami, PPT Presentasi, Quizizz
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Tujuan Pembelajaran (TP), DPL, & Aspek Pemantik */}
              <div className="modern-card" style={{ borderLeftColor: 'var(--secondary)' }}>
                <div className="modern-card-header">
                  <span>III. TARGET BELAJAR, DPL, & PERTANYAAN PEMANTIK</span>
                  <span className="pill-badge active">Target KBM</span>
                </div>
                <div className="modern-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Pemahaman Bermakna */}
                  <div style={{ background: '#FFFDF5', border: '1px solid #FFE082', borderLeft: '4px solid #FFB300', padding: '12px 16px', borderRadius: '8px' }}>
                    <strong style={{ color: '#B78103', display: 'block', marginBottom: '4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>💡 Pemahaman Bermakna (Meaningful Understanding)</strong>
                    <p style={{ fontSize: '11.5px', color: '#5D4037', margin: 0, fontStyle: 'italic', fontWeight: '600', lineHeight: '1.5' }}>
                      "{ppmDetails.pemahamanBermakna}"
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                    <div>
                      <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '6px' }}>Tujuan Pembelajaran (TP):</strong>
                      <ul style={{ margin: '0', paddingLeft: '16px' }}>
                        {activeMateri.tp?.map((tp, idx) => (
                          <li key={idx} style={{ marginBottom: '6px' }}>Siswa mampu <strong>{tp}</strong></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '6px' }}>Dimensi Profil Lulusan (Deep Learning):</strong>
                      <ul style={{ margin: '0', paddingLeft: '16px', listStyleType: 'circle' }}>
                        {getDplForBab(fase, activeMateri.bab, selectedMapel).map((d, dIdx) => (
                          <li key={dIdx} style={{ marginBottom: '6px', fontSize: '11px', lineHeight: '1.4' }}>
                            <strong>{d.nama}:</strong> {d.deskripsi}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pertanyaan Pemantik */}
                  <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '10px' }}>
                    <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '6px', fontSize: '11px' }}>❓ Pertanyaan Pemantik (Arousing Questions):</strong>
                    <ol style={{ margin: '0', paddingLeft: '16px', fontSize: '11px', lineHeight: '1.5' }}>
                      {ppmDetails.pertanyaanPemantik.map((q, qIdx) => (
                        <li key={qIdx} style={{ marginBottom: '3px', fontWeight: '500' }}>{q}</li>
                      ))}
                    </ol>
                  </div>

                </div>
              </div>

              <div style={{ pageBreakAfter: 'always' }} />

              {/* SECTION 4: Langkah-Langkah Pembelajaran (Per Pertemuan) */}
              <div style={{ textAlign: 'center', margin: '15px 0 10px 0' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-dark)' }}>IV. LANGKAH-LANGKAH KEGIATAN PEMBELAJARAN (PER PERTEMUAN)</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-light)' }}>Total {activeMateri.minggu} Pertemuan ({activeMateri.alokasi} JP × 45 Menit) - Pendekatan TPACK & Diferensiasi</p>
              </div>

              {Array.from({ length: activeMateri.minggu }).map((_, pertIdx) => {
                const targetTp = activeMateri.tp[pertIdx] || activeMateri.tp[activeMateri.tp.length - 1];
                const isFirst = pertIdx === 0;
                const isLast = pertIdx === activeMateri.minggu - 1;
                
                return (
                  <div key={pertIdx} className="modern-card" style={{ borderLeftColor: isLast ? 'var(--secondary)' : 'var(--primary)' }}>
                    <div className="modern-card-header">
                      <span>Pertemuan {pertIdx + 1} ({schoolInfoData.jpPerMinggu} JP × 45 Menit)</span>
                      <span className="pill-badge active" style={{ background: isLast ? '#FFE082' : '#E3F2FD', color: isLast ? '#E65100' : '#0D47A1' }}>
                        {isFirst ? 'Eksplorasi Konsep' : isLast ? 'Presentasi & Evaluasi' : 'Pendalaman & Analisis'}
                      </span>
                    </div>
                    <div className="modern-card-body">
                      <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '4px', marginBottom: '12px', border: '1px dashed #CBD5E1', fontSize: '10.5px' }}>
                        <strong>Fokus Pembelajaran (TP):</strong> {targetTp}
                      </div>

                      <div className="timeline" style={{ margin: '10px 0' }}>
                        <div className="timeline-item" style={{ gap: '15px' }}>
                          <div className="timeline-badge" style={{ width: '32px', height: '32px', fontSize: '9px' }}>AWAL</div>
                          <div className="timeline-content" style={{ padding: '10px' }}>
                            <div className="timeline-title" style={{ fontSize: '11.5px', marginBottom: '4px' }}>
                              <span>Pendahuluan (15 Menit)</span>
                            </div>
                            <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '10.5px' }}>
                              {isFirst ? (
                                <>
                                  <li>{ppmDetails.langkahPendahuluan[0]}</li>
                                  <li>{ppmDetails.langkahPendahuluan[1]}</li>
                                  <li>Menyampaikan pertanyaan pemantik: <em>{ppmDetails.pertanyaanPemantik[0]}</em></li>
                                  <li>Melakukan asesmen awal (diagnostik kognitif/non-kognitif) terkait materi bab.</li>
                                </>
                              ) : (
                                <>
                                  <li>Membuka dengan salam, doa, dan apersepsi mengaitkan materi pertemuan sebelumnya.</li>
                                  <li>Guru memberikan pertanyaan kilat untuk menguji pemahaman materi lalu.</li>
                                  <li>Menjelaskan tujuan spesifik dan skenario aktivitas untuk pertemuan hari ini.</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="timeline-item" style={{ gap: '15px' }}>
                          <div className="timeline-badge blue-accent" style={{ width: '32px', height: '32px', fontSize: '9px' }}>INTI</div>
                          <div className="timeline-content" style={{ borderLeft: '3px solid var(--accent)', padding: '10px' }}>
                            <div className="timeline-title" style={{ fontSize: '11.5px', marginBottom: '4px' }}>
                              <span>Kegiatan Inti ({schoolInfoData.jpPerMinggu * 45 - 30} Menit) - Diferensiasi & TPACK</span>
                            </div>
                            <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '10.5px' }}>
                              {isFirst ? (
                                <>
                                  <li><strong>Literasi & TPACK:</strong> {ppmDetails.langkahInti[0] || 'Siswa menyimak tayangan presentasi interaktif atau video pembelajaran.'}</li>
                                  <li><strong>Identifikasi:</strong> {ppmDetails.langkahInti[1] || 'Siswa membedah konsep dasar bersama guru.'}</li>
                                  <li>Guru memetakan kelompok belajar berdasarkan hasil asesmen diagnostik (Diferensiasi Proses).</li>
                                  <li>Siswa mulai mengeksplorasi sumber belajar (buku teks/internet) untuk merumuskan konsep.</li>
                                </>
                              ) : isLast ? (
                                <>
                                  <li><strong>Verifikasi:</strong> {ppmDetails.langkahInti[ppmDetails.langkahInti.length - 2] || 'Siswa melakukan presentasi kelompok di depan kelas.'}</li>
                                  <li><strong>Generalisasi:</strong> {ppmDetails.langkahInti[ppmDetails.langkahInti.length - 1] || 'Siswa menyimpulkan hasil diskusi kelompok.'}</li>
                                  <li>Tanya jawab interaktif antarkelompok; guru memvalidasi dan meluruskan miskonsepsi.</li>
                                  <li>Pelaksanaan Asesmen Sumatif (tes tertulis/unjuk kerja) untuk mengukur ketercapaian TP secara keseluruhan.</li>
                                </>
                              ) : (
                                <>
                                  <li><strong>Kolaborasi:</strong> {ppmDetails.langkahInti[2] || 'Siswa berdiskusi dalam kelompok secara kolaboratif memecahkan masalah LKPD.'}</li>
                                  <li><strong>Analisis:</strong> {ppmDetails.langkahInti[3] || 'Guru melakukan pendampingan (scaffolding) pada kelompok yang memerlukan bantuan.'}</li>
                                  <li>Siswa mengaitkan konsep yang dipelajari dengan studi kasus aktual di masyarakat.</li>
                                  <li>Menyusun laporan atau bahan presentasi digital (infografis/PPT) secara berkelompok (Diferensiasi Produk).</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="timeline-item" style={{ gap: '15px' }}>
                          <div className="timeline-badge" style={{ width: '32px', height: '32px', fontSize: '9px' }}>AKHIR</div>
                          <div className="timeline-content" style={{ padding: '10px' }}>
                            <div className="timeline-title" style={{ fontSize: '11.5px', marginBottom: '4px' }}>
                              <span>Penutup (15 Menit)</span>
                            </div>
                            <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '10.5px' }}>
                              {isLast ? (
                                <>
                                  <li>{ppmDetails.langkahPenutup[0]}</li>
                                  <li>{ppmDetails.langkahPenutup[1]}</li>
                                  <li>Guru memberikan penguatan nilai-nilai Profil Pelajar Pancasila dan pesan moral.</li>
                                  <li>{ppmDetails.langkahPenutup[4]}</li>
                                </>
                              ) : (
                                <>
                                  <li>Siswa dipandu membuat simpulan sementara dari kegiatan hari ini.</li>
                                  <li>Guru melakukan asesmen formatif lisan cepat untuk mengecek pemahaman.</li>
                                  <li>Menyampaikan tugas persiapan atau bacaan mandiri untuk pertemuan selanjutnya.</li>
                                  <li>Menutup majelis dengan doa dan salam.</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* SECTION 5: Asesmen, Evaluasi, & Tindak Lanjut - Modern cards, NO Table! */}
              <div className="modern-card">
                <div className="modern-card-header">
                  <span>IV. RENCANA ASESMEN, EVALUASI, & TINDAK LANJUT</span>
                  <span className="pill-badge active">Evaluasi KBM</span>
                </div>
                <div className="modern-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '6px', borderLeft: '3px solid var(--primary-light)' }}>
                      <strong style={{ fontSize: '11px', color: 'var(--primary-dark)' }}>Asesmen Awal (Diagnostik):</strong>
                      <p style={{ marginTop: '4px', fontSize: '10.5px', color: '#555' }}>{ppmDetails.asesmenDiagnostik}</p>
                    </div>
                    <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '6px', borderLeft: '3px solid var(--accent)' }}>
                      <strong style={{ fontSize: '11px', color: 'var(--primary-dark)' }}>Asesmen Proses (Formatif):</strong>
                      <p style={{ marginTop: '4px', fontSize: '10.5px', color: '#555' }}>{ppmDetails.asesmenFormatif}</p>
                    </div>
                    <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '6px', borderLeft: '3px solid var(--secondary)' }}>
                      <strong style={{ fontSize: '11px', color: 'var(--primary-dark)' }}>Asesmen Akhir (Sumatif):</strong>
                      <p style={{ marginTop: '4px', fontSize: '10.5px', color: '#555' }}>{ppmDetails.asesmenSumatif}</p>
                    </div>
                  </div>
                  
                  {/* Remedial & Pengayaan */}
                  <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                    <div style={{ background: '#F9FBE7', border: '1px solid #D4E157', borderLeft: '4px solid #82B1FF', padding: '10px 14px', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '11px', color: '#33691E' }}>🚀 Rencana Pengayaan (Enrichment):</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '10.5px', color: '#1B5E20', lineHeight: '1.4' }}>
                        {ppmDetails.pengayaan}
                      </p>
                    </div>
                    <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderLeft: '4px solid #E53E3E', padding: '10px 14px', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '11px', color: '#B71C1C' }}>🔄 Rencana Remedial:</strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '10.5px', color: '#7f1d1d', lineHeight: '1.4' }}>
                        {ppmDetails.remedial}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ pageBreakAfter: 'always' }} />

              {/* SECTION 6: Bahan Bacaan */}
              <div className="modern-card">
                <div className="modern-card-header">
                  <span>V. BAHAN BACAAN GURU & PESERTA DIDIK</span>
                  <span className="pill-badge active">Ringkasan Materi</span>
                </div>
                <div className="modern-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ margin: 0, fontSize: '11px', textAlign: 'justify', lineHeight: '1.6' }}>
                    Materi esensial pada bab ini dikembangkan dari Buku Teks Utama yang diterbitkan oleh Kementerian Pendidikan dan Kebudayaan serta referensi pendamping lainnya. Materi ajar berfokus pada pemahaman komprehensif terkait <strong><ArabicText text={activeMateri.judul} /></strong>. 
                  </p>
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', border: '1px dashed #CBD5E1', fontSize: '11px' }}>
                    <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '6px' }}>Poin-poin Utama Materi:</strong>
                    <ul style={{ margin: 0, paddingLeft: '16px' }}>
                      {activeMateri.tp?.map((tp, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>Konseptualisasi dan implementasi tentang: {tp.split(' ').slice(2).join(' ')}</li>
                      ))}
                    </ul>
                  </div>
                  <p style={{ margin: 0, fontSize: '11px', textAlign: 'justify', lineHeight: '1.6' }}>
                    Bahan bacaan tambahan untuk pengayaan dapat diakses melalui e-book perpustakaan digital sekolah, jurnal artikel relevan, maupun materi presentasi interaktif yang telah diunggah guru di Google Classroom/LMS sekolah.
                  </p>
                </div>
              </div>

              {/* SECTION 7: Lampiran LKPD - Premium, Tableless Layout! */}
              <div style={{ textAlign: 'center', margin: '15px 0 10px 0' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary-dark)', textTransform: 'uppercase' }}>LAMPIRAN 1: LEMBAR KERJA PESERTA DIDIK (LKPD)</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-light)' }}>"Membedah Hikmah Teologis & Implementasi Nyata Syariat"</p>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #F8FAFC, #EDF2F7)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '11px' }}>
                  <div><strong>Nama Kelompok:</strong> ................................................................</div>
                  <div><strong>Fase / Kelas:</strong> {fase} / {selectedClass}</div>
                  <div><strong>Anggota Kelompok:</strong> 1. .................... 2. .................... 3. ....................</div>
                  <div><strong>Bab / Elemen:</strong> Bab {activeMateri.bab}: <ArabicText text={activeMateri.judul} /> ({activeMateri.elemen})</div>
                </div>
              </div>

              <div className="modern-card">
                <div className="modern-card-header">
                  <span>SOAL / TUGAS LKPD</span>
                  <span className="pill-badge">Petunjuk KBM</span>
                </div>
                <div className="modern-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <ol style={{ fontSize: '11px', paddingLeft: '18px', lineHeight: '1.8' }}>
                    {ppmDetails.lkpd.map((q, i) => (
                      <li key={i} style={{ marginBottom: '8px' }}><strong>{q}</strong></li>
                    ))}
                  </ol>
                  <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border)', paddingTop: '12px' }}>
                    <strong style={{ color: 'var(--primary)', fontSize: '11px' }}>Kesimpulan Analisis Kelompok:</strong>
                    <div style={{ border: '1px dashed var(--border)', height: '40px', background: '#FAFAFA', borderRadius: '4px', marginTop: '4px', padding: '6px', color: '#888' }}>
                      Tuliskan poin kesimpulan kelompok di sini...
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 8: Rubrik Penilaian & Refleksi - Beautiful Badge/Pills Grid, NO Table! */}
              <div className="modern-card" style={{ borderLeftColor: 'var(--primary)' }}>
                <div className="modern-card-header">
                  <span>VI. BOBOT, RUBRIK PENILAIAN PRAKTIK, & REFLEKSI</span>
                  <span className="pill-badge active">Rincian Bobot</span>
                </div>
                <div className="modern-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <p style={{ marginBottom: '4px' }}>Bobot nilai dihitung berdasarkan 5 komponen penilaian utama untuk menjamin objektivitas:</p>
                  
                  <div className="rubrik-grid" style={{ margin: '0' }}>
                    <div className="rubrik-item" style={{ borderTop: '3px solid var(--primary-light)' }}>
                      <span className="rubrik-percentage">10%</span>
                      <span className="rubrik-label">Persiapan (Kesiapan Bahan)</span>
                    </div>
                    <div className="rubrik-item" style={{ borderTop: '3px solid var(--primary)' }}>
                      <span className="rubrik-percentage">30%</span>
                      <span className="rubrik-label">Proses (Keaktifan Diskusi)</span>
                    </div>
                    <div className="rubrik-item" style={{ borderTop: '3px solid var(--primary-dark)' }}>
                      <span className="rubrik-percentage">40%</span>
                      <span className="rubrik-label">Hasil (LKPD & Presentasi)</span>
                    </div>
                    <div className="rubrik-item" style={{ borderTop: '3px solid var(--secondary)' }}>
                      <span className="rubrik-percentage">10%</span>
                      <span className="rubrik-label">Sikap (Adab & Karakter)</span>
                    </div>
                    <div className="rubrik-item" style={{ borderTop: '3px solid var(--accent)' }}>
                      <span className="rubrik-percentage">10%</span>
                      <span className="rubrik-label">Waktu (Ketepatan KBM)</span>
                    </div>
                  </div>

                  {/* Refleksi KBM */}
                  <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '10px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', fontSize: '11px' }}>
                    <div style={{ background: '#F8FAFC', border: '1px solid var(--border)', padding: '10px', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '4px' }}>📝 Refleksi Peserta Didik:</strong>
                      <ul style={{ margin: '0', paddingLeft: '14px', color: '#555' }}>
                        <li>Apakah materi hari ini mendekatkan Anda secara moral kepada Sang Pencipta?</li>
                        <li>Tantangan apa yang paling membekas saat berdiskusi memecahkan masalah tadi?</li>
                      </ul>
                    </div>
                    <div style={{ background: '#F8FAFC', border: '1px solid var(--border)', padding: '10px', borderRadius: '6px' }}>
                      <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '4px' }}>👨‍🏫 Refleksi Pendidik (Guru):</strong>
                      <ul style={{ margin: '0', paddingLeft: '14px', color: '#555' }}>
                        <li>Apakah seluruh siswa aktif berkolaborasi dan memahami makna teologis materi?</li>
                        <li>Apa perbaikan taktis yang perlu diterapkan pada pertemuan KBM berikutnya?</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{ border: '1px solid var(--border)', padding: '10px', fontSize: '10px', background: '#F8FAFC', borderRadius: '6px', marginTop: '5px' }}>
                    <strong>Tautan Post-Test Mandiri (Quizizz):</strong> 
                    <span style={{ marginLeft: '6px', fontWeight: 'bold', color: '#64748B' }}>.........................................................................</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <SignatureBlock semOverride={sem} />
            </div>
          </div>
        );
      }

      case 'kisi-kisi':
        return (
          <div key="kisi-kisi" className="a4-page">
            <h2 className="page-title">KISI-KISI SOAL ASESMEN</h2>
            <div className="page-subtitle">Kisi-Kisi Ujian Tengah & Akhir Semester PAI & Budi Pekerti</div>

            <div style={{ marginTop: '20px' }}>
              <table className="data-table" style={{ fontSize: '10px' }}>
                <thead>
                  <tr>
                    <th style={{ width: '6%' }}>No</th>
                    <th style={{ width: '24%' }}>Tujuan Pembelajaran (TP)</th>
                    <th style={{ width: '35%' }}>Indikator Soal</th>
                    <th style={{ width: '10%' }}>Level Kognitif</th>
                    <th style={{ width: '15%' }}>Bentuk Soal</th>
                    <th style={{ width: '10%' }}>No. Soal</th>
                  </tr>
                </thead>
                <tbody>
                  {localMateriList.map((m, mIdx) => (
                    <React.Fragment key={mIdx}>
                      <tr>
                        <td className="center">{mIdx * 2 + 1}</td>
                        <td>{m.tp[0] || <ArabicText text={m.judul} />}</td>
                        <td>Disajikan potongan Q.S. al-Maidah/5: 48, peserta didik mampu mengidentifikasi hukum bacaan tajwid secara tepat.</td>
                        <td className="center">L2 (C3)</td>
                        <td className="center">Pilihan Ganda</td>
                        <td className="center">1, 2, 3</td>
                      </tr>
                      <tr>
                        <td className="center">{mIdx * 2 + 2}</td>
                        <td>{m.tp[1] || <ArabicText text={m.judul} />}</td>
                        <td>Peserta didik dapat menganalisis implementasi riil akhlak terpuji dalam bergotong royong di sekolah.</td>
                        <td className="center">L3 (C4)</td>
                        <td className="center">Uraian / Esai</td>
                        <td className="center">41, 42</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '40px' }}>
              <SignatureBlock semOverride={sem} />
            </div>
          </div>
        );

      case 'kartu-soal': {
        const localActiveMateri = localMateriList.find(m => m.bab === selectedPpmBab) || localMateriList[0] || {};
        return (
          <div key="kartu-soal" className="a4-page">
            <h2 className="page-title">KARTU SOAL ASESMEN</h2>
            <div className="page-subtitle">Butir Pertanyaan Ujian & Kunci Jawaban Pembahasan</div>

            <div style={{ marginTop: '20px', fontSize: '11px' }}>
              <div style={{ border: '2px solid #333', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
                <div style={{ borderBottom: '1px solid #333', paddingBottom: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>KARTU SOAL NOMOR: 01 (PILIHAN GANDA)</span>
                  <span>MATA PELAJARAN: PAI</span>
                </div>
                <p><strong>Kompetensi Dasar / TP:</strong> {localActiveMateri.tp?.[0] || <ArabicText text={localActiveMateri.judul} />}</p>
                <p style={{ margin: '8px 0' }}><strong>Butir Pertanyaan:</strong></p>
                <div style={{ background: '#F5F5F5', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                  Di bawah ini yang merupakan cerminan nyata dari kompetensi dalam kebaikan (fastabiqul khairat) berdasarkan perintah Allah Swt. dalam Q.S. al-Maidah/5: 48 adalah...
                </div>
                <div style={{ paddingLeft: '10px' }}>
                  <p>A. Berupaya keras mencari keuntungan finansial pribadi dengan segala cara.</p>
                  <p style={{ fontWeight: 'bold', color: 'green' }}>B. Bersegera membantu teman yang sedang kesusahan belajar demi ketaatan kepada Allah. (Kunci Jawaban)</p>
                  <p>C. Mengikuti turnamen olahraga demi meraih piala penghargaan tingkat kabupaten.</p>
                  <p>D. Memamerkan amal ibadah sedekah di media sosial agar dilihat orang lain.</p>
                  <p>E. Bekerja keras sepanjang hari tanpa menghiraukan waktu ibadah shalat wajib.</p>
                </div>
                <div style={{ marginTop: '10px', paddingTop: '6px', borderTop: '1px solid #ccc', fontSize: '10px', color: '#555' }}>
                  <strong>Pembahasan:</strong> Fastabiqul Khairat adalah amalan baik yang dilakukan secara ikhlas semata-mata mengharapkan ridha Allah Swt., bukan untuk riya atau mengejar keuntungan duniawi semata.
                </div>
              </div>

              <div style={{ border: '2px solid #333', padding: '15px', borderRadius: '6px' }}>
                <div style={{ borderBottom: '1px solid #333', paddingBottom: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>KARTU SOAL NOMOR: 02 (ESAI / URAIAN)</span>
                  <span>MATA PELAJARAN: PAI</span>
                </div>
                <p><strong>Kompetensi Dasar / TP:</strong> {localActiveMateri.tp?.[1] || <ArabicText text={localActiveMateri.judul} />}</p>
                <p style={{ margin: '8px 0' }}><strong>Butir Pertanyaan:</strong></p>
                <div style={{ background: '#F5F5F5', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                  Jelaskan bagaimana konsep syu‘ab al-īmān (cabang-cabang iman) memberikan landasan akhlak bagi seorang muslim dalam menggunakan media sosial di era digital saat ini!
                </div>
                <p style={{ fontWeight: 'bold', color: 'green' }}>Kunci Jawaban & Rubrik Penilaian:</p>
                <p style={{ paddingLeft: '10px' }}>
                  Syu'ab al-iman mengajarkan bahwa lisan dan perbuatan adalah cerminan keimanan. Dalam media sosial, cabang iman memelihara lisan terwujud dalam bentuk menyebarkan informasi bermanfaat, menghindari fitnah/hoaks, berkata sopan, dan menjaga kehormatan aib orang lain.
                </p>
                <div style={{ marginTop: '10px', paddingTop: '6px', borderTop: '1px solid #ccc', fontSize: '10px', color: '#555' }}>
                  <strong>Skor Maksimal:</strong> 20 Poin (Skor 20 jika analisis lengkap & mengaitkan dalil Al-Qur'an secara sempurna).
                </div>
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <SignatureBlock semOverride={sem} />
            </div>
          </div>
        );
      }

      default:
        return <div className="a4-page">Page Not Found</div>;
    }
  };

  return (
    <div className="perangkat-wrapper" style={{ display: 'flex', width: '100%' }}>
      
      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2>Perangkat Pembelajaran ISMUBA</h2>
            <p>{schoolInfoData.mapel} - Kurikulum Merdeka</p>
          </div>
          <button
            className="no-print sidebar-close"
            onClick={() => setSidebarOpen(false)}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', padding: '2px 6px', borderRadius: '4px', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {/* Global Selectors */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <label style={{ fontSize: '10px', color: '#90CAF9', display: 'block', marginBottom: '6px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Fase</label>
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', padding: '3px' }}>
            <button
              onClick={() => handleFaseChange('E')}
              style={{
                flex: 1, padding: '6px 0', borderRadius: '4px', fontWeight: '700', fontSize: '12px', cursor: 'pointer',
                border: fase === 'E' ? '1px solid rgba(255,255,255,0.15)' : 'none',
                background: fase === 'E' ? '#1565C0' : 'transparent',
                color: fase === 'E' ? '#fff' : 'rgba(255,255,255,0.7)',
                transition: 'all 0.15s'
              }}
            >Fase E (X)</button>
            <button
              onClick={() => handleFaseChange('F')}
              style={{
                flex: 1, padding: '6px 0', borderRadius: '4px', fontWeight: '700', fontSize: '12px', cursor: 'pointer',
                border: fase === 'F' ? '1px solid rgba(255,255,255,0.15)' : 'none',
                background: fase === 'F' ? '#1565C0' : 'transparent',
                color: fase === 'F' ? '#fff' : 'rgba(255,255,255,0.7)',
                transition: 'all 0.15s'
              }}
            >Fase F (XI-XII)</button>
          </div>

          {fase === 'F' && (
            <div style={{ marginTop: '8px' }}>
              <label style={{ fontSize: '10px', color: '#90CAF9', display: 'block', marginBottom: '4px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Kelas</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', background: '#1a237e', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', fontSize: '12px', fontWeight: '600' }}
              >
                <option value="XI">XI (Sebelas)</option>
                <option value="XII">XII (Dua Belas)</option>
              </select>
            </div>
          )}

          <div style={{ marginTop: '10px' }}>
            <label style={{ fontSize: '10px', color: '#90CAF9', display: 'block', marginBottom: '4px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Semester</label>
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', padding: '3px' }}>
              <button
                onClick={() => handleSemesterChange('ganjil')}
                style={{
                  flex: 1, padding: '6px 0', borderRadius: '4px', fontWeight: '700', fontSize: '12px', cursor: 'pointer',
                  border: semester === 'ganjil' ? '1px solid rgba(255,255,255,0.15)' : 'none',
                  background: semester === 'ganjil' ? '#1565C0' : 'transparent',
                  color: semester === 'ganjil' ? '#fff' : 'rgba(255,255,255,0.7)',
                  transition: 'all 0.15s'
                }}
              >Ganjil</button>
              <button
                onClick={() => handleSemesterChange('genap')}
                style={{
                  flex: 1, padding: '6px 0', borderRadius: '4px', fontWeight: '700', fontSize: '12px', cursor: 'pointer',
                  border: semester === 'genap' ? '1px solid rgba(255,255,255,0.15)' : 'none',
                  background: semester === 'genap' ? '#1565C0' : 'transparent',
                  color: semester === 'genap' ? '#fff' : 'rgba(255,255,255,0.7)',
                  transition: 'all 0.15s'
                }}
              >Genap</button>
            </div>
          </div>
        </div>

        {/* List of Documents */}
        <div className="nav-section" style={{ padding: '8px 0' }}>
          <div className="nav-section-title" style={{ fontSize: '10px', color: '#90CAF9', padding: '8px 20px', fontWeight: '700', letterSpacing: '1px' }}>Dokumen Perangkat</div>
          {menuItems.map((item, idx) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', fontSize: '12px', padding: '8px 20px 8px 28px', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '20px', height: '20px', borderRadius: '50%',
                background: activeTab === item.id ? '#1976D2' : 'rgba(255,255,255,0.1)',
                color: '#fff', fontSize: '10px', fontWeight: '700', flexShrink: 0
              }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Sidebar overlay for mobile */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Main Workspace */}
      <main className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Toolbar */}
        <header className="toolbar" style={{ padding: '10px 20px', gap: '10px' }}>
          <div className="toolbar-left" style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <button
              className="no-print"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                border: 'none', background: '#f0f4f8', fontSize: '18px', cursor: 'pointer',
                width: '34px', height: '34px', borderRadius: '8px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: '#2C3E50',
                transition: 'all 0.15s', flexShrink: 0
              }}
            >
              ☰
            </button>
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#0D47A1', margin: 0, lineHeight: 1.3 }}>
                {menuItems.find(i => i.id === activeTab)?.label || activeTab}
              </h3>
              <p style={{ fontSize: '10px', color: '#7F8C8D', margin: '2px 0 0 0', fontWeight: 500 }}>
                {selectedMapel === 'arab' ? 'Bahasa Arab' : selectedMapel === 'kemuh' ? 'Kemuhammadiyahan' : 'PAI & Budi Pekerti'} · {fase === 'E' ? 'Fase E (X)' : 'Fase F (XI-XII)'} · Semester {semester.toUpperCase()} · TA {academicYear}
              </p>
            </div>
          </div>

          <div className="toolbar-right" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Mode Toggle */}
            <button
              onClick={() => setViewMode(viewMode === 'single' ? 'booklet' : 'single')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 12px 6px 6px', borderRadius: '20px',
                border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer',
                fontSize: '11px', fontWeight: '600', color: '#475569',
                transition: 'all 0.15s'
              }}
            >
              <span style={{
                width: '28px', height: '16px', borderRadius: '10px',
                background: viewMode === 'booklet' ? '#1976D2' : '#94A3B8',
                position: 'relative', transition: 'all 0.2s', flexShrink: 0
              }}>
                <span style={{
                  position: 'absolute', top: '2px', width: '12px', height: '12px',
                  borderRadius: '50%', background: '#fff',
                  left: viewMode === 'booklet' ? '14px' : '2px',
                  transition: 'all 0.2s'
                }} />
              </span>
              {viewMode === 'single' ? 'Satu Halaman' : 'Seluruh Dokumen'}
            </button>
            
            <button
              onClick={handlePdfExport}
              disabled={isExporting}
              style={{
                padding: '8px 14px', borderRadius: '8px', border: 'none',
                background: 'linear-gradient(135deg, #E53E3E, #C53030)', color: '#fff',
                fontSize: '11px', fontWeight: '700', cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {isExporting ? 'Proses...' : 'PDF'}
            </button>
            <button
              onClick={() => handleDocxExport(null)}
              disabled={isExporting}
              style={{
                padding: '8px 14px', borderRadius: '8px', border: 'none',
                background: 'linear-gradient(135deg, #2B6CB0, #1A365D)', color: '#fff',
                fontSize: '11px', fontWeight: '700', cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {isExporting ? 'Proses...' : 'Word'}
            </button>
          </div>
        </header>

        {/* Document Render Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', padding: '0 20px 20px' }}>
          
          {/* Settings & Input Section */}
          <section className="no-print" style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', margin: '20px 0', overflow: 'hidden', width: '100%', maxWidth: '850px', flexShrink: 0 }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #F8FAFC, #EDF2F7)', padding: '12px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#64748B' }}>⚙</span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#0D47A1' }}>Pengaturan Identitas & Administrasi</span>
            </div>

            <div style={{ padding: '16px 20px' }}>
              {/* Mapel Selector */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: '#64748B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Mata Pelajaran</label>
                <div style={{ display: 'flex', background: '#F1F5F9', padding: '4px', borderRadius: '8px' }}>
                  {[
                    { id: 'pai', label: 'PAI & Budi Pekerti' },
                    { id: 'arab', label: 'Bahasa Arab' },
                    { id: 'kemuh', label: 'Kemuhammadiyahan' }
                  ].map(mp => (
                    <button key={mp.id}
                      onClick={() => { setSelectedMapel(mp.id); setSelectedPpmBab(1); }}
                      style={{
                        flex: 1, padding: '8px 0', border: 'none', borderRadius: '6px',
                        fontSize: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                        background: selectedMapel === mp.id ? '#FFFFFF' : 'transparent',
                        color: selectedMapel === mp.id ? '#1976D2' : '#64748B',
                        boxShadow: selectedMapel === mp.id ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >{mp.label}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nama Guru</label>
                  <input
                    type="text"
                    placeholder="Contoh: Ahmad Subardjo, S.Pd.I."
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    style={{
                      width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1',
                      fontSize: '12px', outline: 'none', transition: 'all 0.15s',
                      background: '#F8FAFC', color: '#1E293B'
                    }}
                    onFocus={e => { e.target.style.borderColor = '#1976D2'; e.target.style.background = '#fff'; }}
                    onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#F8FAFC'; }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>NBM / NIP</label>
                  <input
                    type="text"
                    placeholder="Contoh: 1234567"
                    value={teacherNbm}
                    onChange={(e) => setTeacherNbm(e.target.value)}
                    style={{
                      width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1',
                      fontSize: '12px', outline: 'none', transition: 'all 0.15s',
                      background: '#F8FAFC', color: '#1E293B'
                    }}
                    onFocus={e => { e.target.style.borderColor = '#1976D2'; e.target.style.background = '#fff'; }}
                    onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#F8FAFC'; }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '10px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tahun Pelajaran</label>
                  <input
                    type="text"
                    placeholder="Contoh: 2025/2026"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    style={{
                      width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1',
                      fontSize: '12px', outline: 'none', transition: 'all 0.15s',
                      background: '#F8FAFC', color: '#1E293B'
                    }}
                    onFocus={e => { e.target.style.borderColor = '#1976D2'; e.target.style.background = '#fff'; }}
                    onBlur={e => { e.target.style.borderColor = '#CBD5E1'; e.target.style.background = '#F8FAFC'; }}
                  />
                </div>
              </div>
            </div>
          </section>
          {viewMode === 'single' ? (
            <div id="single-container">
              {renderPage(activeTab, 0)}
            </div>
          ) : (
            <div id="booklet-container" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Cover, Judul, Identitas, Daftar Isi */}
              {renderPage('cover', 'cover')}
              {renderPage('judul', 'judul')}
              {renderPage('identitas', 'identitas')}
              {renderPage('daftar-isi', 'daftar-isi')}

              {/* Semester 1 (Ganjil) */}
              <div className="semester-divider no-print" style={{ textAlign: 'center', background: '#0D47A1', color: '#fff', padding: '10px', fontWeight: 'bold', borderRadius: '4px', margin: '20px 0' }}>
                BAGIAN 1: ADMINISTRASI SEMESTER GANJIL
              </div>
              {renderPage('pekan-efektif', 'pekan-efektif-ganjil', null, 'ganjil')}
              {renderPage('prota', 'prota')}
              {renderPage('promes', 'promes-ganjil', null, 'ganjil')}
              {renderPage('analisis-cp', 'analisis-cp-ganjil', null, 'ganjil')}
              {renderPage('atp', 'atp-ganjil', null, 'ganjil')}
              {renderPage('kktp', 'kktp-ganjil', null, 'ganjil')}
              {activeFaseData.semester.ganjil.materi.map((m, mIdx) => 
                renderPage('modul', `modul-ganjil-${m.bab}`, m.bab, 'ganjil')
              )}
              {renderPage('kisi-kisi', 'kisi-kisi-ganjil', null, 'ganjil')}
              {renderPage('kartu-soal', 'kartu-soal-ganjil', null, 'ganjil')}

              {/* Semester 2 (Genap) */}
              <div className="semester-divider no-print" style={{ textAlign: 'center', background: '#0D47A1', color: '#fff', padding: '10px', fontWeight: 'bold', borderRadius: '4px', margin: '20px 0' }}>
                BAGIAN 2: ADMINISTRASI SEMESTER GENAP
              </div>
              {renderPage('pekan-efektif', 'pekan-efektif-genap', null, 'genap')}
              {renderPage('promes', 'promes-genap', null, 'genap')}
              {renderPage('analisis-cp', 'analisis-cp-genap', null, 'genap')}
              {renderPage('atp', 'atp-genap', null, 'genap')}
              {renderPage('kktp', 'kktp-genap', null, 'genap')}
              {activeFaseData.semester.genap.materi.map((m, mIdx) => 
                renderPage('modul', `modul-genap-${m.bab}`, m.bab, 'genap')
              )}
              {renderPage('kisi-kisi', 'kisi-kisi-genap', null, 'genap')}
              {renderPage('kartu-soal', 'kartu-soal-genap', null, 'genap')}
            </div>
          )}
        </div>
      </main>

      {/* Loading Overlay with Vector Print Tips */}
      {isExporting && (
        <div className="loading-overlay" style={{ background: 'rgba(13, 71, 161, 0.65)' }}>
          <div className="loading-box" style={{ maxWidth: '450px', padding: '30px 25px', borderRadius: '16px', boxShadow: '0 12px 36px rgba(0,0,0,0.25)' }}>
            <div className="loading-spinner" style={{ borderTopColor: '#FFB300' }}></div>
            <h4 style={{ color: '#0D47A1', fontSize: '15px', fontWeight: '800', marginBottom: '8px' }}>MEMPERSIAPKAN DOKUMEN PDF</h4>
            <p style={{ fontSize: '11px', color: '#64748B', lineHeight: '1.4', marginBottom: '15px' }}>
              Mempersiapkan dokumen A4 (Plus Jakarta Sans). Anda sedang mencetak dalam mode <strong>{viewMode === 'single' ? 'Satu Halaman Terbuka' : 'Seluruh Dokumen (Booklet)'}</strong>.
            </p>
            
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderLeft: '4px solid #FFB300',
              borderRadius: '8px',
              padding: '12px 15px',
              textAlign: 'left'
            }}>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#FFB300', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ⚠️ PENTING UNTUK HASIL SEMPURNA:
              </span>
              <ul style={{ fontSize: '10.5px', color: '#1E293B', paddingLeft: '18px', marginTop: '6px', lineHeight: '1.5' }}>
                <li style={{ marginBottom: '4px' }}>
                  <strong>Cakupan Cetak</strong>: {viewMode === 'single' ? 'Hanya mencetak halaman aktif yang sedang dibuka. Untuk mencetak seluruhnya, ubah Mode ke "Seluruh Dokumen".' : 'Mencetak seluruh 13 dokumen berurutan, termasuk 5 Bab Modul Ajar (Semester 1/2) sekaligus.'}
                </li>
                <li style={{ marginBottom: '4px' }}>
                  Pilih Tujuan / Destination: <strong>"Simpan sebagai PDF" (Save as PDF)</strong>.
                </li>
                <li style={{ marginBottom: '4px' }}>
                  Wajib **centang/aktifkan "Grafik latar belakang" (Background graphics)** agar warna premium, logo, dan background SVG tampil.
                </li>
                <li>
                  Atur Ukuran Kertas ke **A4** dan hilangkan centang "Header & Footer".
                </li>
              </ul>
            </div>
            <p style={{ fontSize: '9px', color: '#94A3B8', marginTop: '12px', fontStyle: 'italic' }}>
              Dokumen yang dihasilkan adalah vector PDF asli (teks rapi, tajam, & bisa diseleksi/dicopy).
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
