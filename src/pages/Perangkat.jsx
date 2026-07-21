import React, { useState, useEffect, Component } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Maximize, Minimize, BookOpen, Sparkles } from 'lucide-react';
import { schoolInfo, schoolInfoPAI, schoolInfoArab, schoolInfoKemuh, faseE, faseF11, faseF12, faseEArab, faseF11Arab, faseF12Arab, faseE_kemuh, faseF11_kemuh, faseF12_kemuh } from '../data/curriculum';
import { exportToPdf } from '../utils/exportPdf';
import { exportToDocx } from '../utils/exportDocx';
import { getDplForBab, getPpmDetails, indonesianMonthsGanjil, indonesianMonthsGenap, ArabicText, generateDynamicLangkahInti } from '../utils/perangkatUtils';
import { detailedMateri } from '../data/materiContent';
import { renderClassicPage } from '../components/ClassicPages';

/** Tangkap error render agar mode satu halaman tidak blank diam-diam */
class PageErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('PageErrorBoundary:', error, info);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="a4-page" style={{ padding: '24px' }}>
          <h2 className="page-title">Terjadi Kesalahan Tampilan</h2>
          <p style={{ marginTop: '12px', fontSize: '13px', color: '#64748B' }}>
            Halaman gagal ditampilkan. Coba ganti menu lain, lalu kembali ke halaman ini.
            Jika masih error, buka mode <strong>Seluruh Dokumen</strong> lalu kembali ke <strong>Satu Halaman</strong>.
          </p>
          <pre style={{ marginTop: '16px', fontSize: '11px', background: '#FEF2F2', color: '#991B1B', padding: '12px', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            type="button"
            className="no-print"
            onClick={() => this.setState({ error: null })}
            style={{
              marginTop: '16px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              background: '#0D47A1',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Coba Lagi
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Perangkat() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Application State
  const [selectedMapel, setSelectedMapel] = useState(searchParams.get('mapel') || 'pai'); // pai or arab
  const [fase, setFase] = useState(searchParams.get('fase') || 'E'); // E or F
  const [selectedClass, setSelectedClass] = useState(searchParams.get('kelas') || 'X'); // X for E, XI or XII for F
  const [semester, setSemester] = useState((searchParams.get('semester') || 'ganjil').toLowerCase()); // ganjil or genap
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'cover'); // side nav active item
  const [viewMode, setViewMode] = useState(() => {
    const v = searchParams.get('view');
    return v === 'booklet' || v === 'single' ? v : 'single';
  });
  const [teacherName, setTeacherName] = useState('');
  const [teacherNbm, setTeacherNbm] = useState('......................');
  const [academicYear, setAcademicYear] = useState('2026/2027');
  const [selectedPpmBab, setSelectedPpmBab] = useState(() => {
    const n = parseInt(searchParams.get('bab') || '1', 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const fromUrl = searchParams.get('theme');
    if (fromUrl === 'classic' || fromUrl === 'modern') return fromUrl;
    try {
      const saved = window.localStorage.getItem('perangkat-theme');
      return saved === 'modern' ? 'modern' : 'classic';
    } catch {
      return 'classic';
    }
  });

  // Persist theme to localStorage + <html data-theme> for CSS overrides
  useEffect(() => {
    try { window.localStorage.setItem('perangkat-theme', theme); } catch {}
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('theme-classic', theme === 'classic');
    return () => { document.body.classList.remove('theme-classic'); };
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'modern' ? 'classic' : 'modern'));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add('fullscreen-mode');
    } else {
      document.body.classList.remove('fullscreen-mode');
    }
    return () => document.body.classList.remove('fullscreen-mode');
  }, [isFullscreen]);

  // Sinkron URL hanya jika berubah — cegah infinite re-render (Maximum update depth)
  useEffect(() => {
    const next = {
      mapel: selectedMapel,
      fase,
      kelas: selectedClass,
      semester,
      tab: activeTab,
      view: viewMode,
      bab: String(selectedPpmBab),
      theme,
    };
    const cur = {
      mapel: searchParams.get('mapel') || '',
      fase: searchParams.get('fase') || '',
      kelas: searchParams.get('kelas') || '',
      semester: searchParams.get('semester') || '',
      tab: searchParams.get('tab') || '',
      view: searchParams.get('view') || '',
      bab: searchParams.get('bab') || '',
      theme: searchParams.get('theme') || '',
    };
    const changed = Object.keys(next).some((k) => next[k] !== cur[k]);
    if (changed) {
      setSearchParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bandingkan manual agar stabil
  }, [selectedMapel, fase, selectedClass, semester, activeTab, viewMode, selectedPpmBab, theme]);

  // Pastikan bab PPM selalu valid untuk mapel/kelas/semester aktif (hindari blank di mode satu halaman)
  useEffect(() => {
    const list =
      (selectedMapel === 'arab'
        ? (selectedClass === 'X' ? faseEArab : selectedClass === 'XI' ? faseF11Arab : faseF12Arab)
        : selectedMapel === 'kemuh'
          ? (selectedClass === 'X' ? faseE_kemuh : selectedClass === 'XI' ? faseF11_kemuh : faseF12_kemuh)
          : (selectedClass === 'X' ? faseE : selectedClass === 'XI' ? faseF11 : faseF12)
      ).semester[semester]?.materi || [];

    if (!list.length) return;
    const babNum = Number(selectedPpmBab);
    if (!list.some((m) => m.bab === babNum)) {
      setSelectedPpmBab(list[0].bab);
    }
  }, [selectedMapel, selectedClass, semester, fase, selectedPpmBab]);

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
  // Normalisasi agar mode satu halaman tidak crash jika query URL tidak valid
  const safeSemester = semester === 'genap' ? 'genap' : 'ganjil';
  const currentSemesterData = activeFaseData.semester[safeSemester] || activeFaseData.semester.ganjil;
  const materiList = currentSemesterData?.materi || [];

  useEffect(() => {
    if (semester !== 'ganjil' && semester !== 'genap') {
      setSemester('ganjil');
    }
    if (viewMode !== 'single' && viewMode !== 'booklet') {
      setViewMode('single');
    }
  }, [semester, viewMode]);

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

  // Compile Teacher info (mingguEfektif di-override setelah helper kalender di bawah)
  const baseSchoolInfo = selectedMapel === 'arab' ? schoolInfoArab : selectedMapel === 'kemuh' ? schoolInfoKemuh : schoolInfoPAI;
  const schoolInfoData = {
    ...baseSchoolInfo,
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

      if (viewMode === 'booklet' && specificBab === null) {
        // Export BOTH semesters
        for (const s of ['ganjil', 'genap']) {
          let sFileName = `perangkat-${selectedMapel}-fase${fase}-${s}-${academicYear.replace('/', '-')}.docx`;
          const sPpmMap = {};
          dataToExport.semester[s].materi.forEach(m => {
            const details = getPpmDetails(fase, m.bab, selectedMapel, selectedClass, m);
            details.dpl = getDplForBab(fase, m.bab, selectedMapel);
            sPpmMap[m.bab] = details;
          });
          await exportToDocx(dataToExport, s, sFileName, sPpmMap);
        }
      } else {
        // Build per-bab PPM details map for selected semester
        const ppmMap = {};
        const allMateri = dataToExport.semester[semester].materi;
        allMateri.forEach(m => {
          const details = getPpmDetails(fase, m.bab, selectedMapel, selectedClass, m);
          details.dpl = getDplForBab(fase, m.bab, selectedMapel);
          ppmMap[m.bab] = details;
        });
        await exportToDocx(dataToExport, semester, fileName, ppmMap);
      }

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
    { id: 'visi-misi', label: 'VISI & MISI' },
    { id: 'daftar-isi', label: 'DAFTAR ISI' },
    { id: 'pekan-efektif', label: 'RINCIAN PEKAN EFEKTIF' },
    { id: 'prota', label: 'PROGRAM TAHUNAN' },
    { id: 'promes', label: 'PROGRAM SEMESTER' },
    { id: 'analisis-cp', label: 'ANALISA CAPAIAN PEMBELAJARAN' },
    { id: 'cp-tp-pp', label: 'ANALISIS CP & TP (VERSI PP)' },
    { id: 'atp', label: 'ALUR TUJUAN PEMBELAJARAN' },
    { id: 'kktp', label: 'KRITERIA KETERCAPAIAN TP' },
    { id: 'modul', label: 'MODUL AJAR (PPM)' },
    { id: 'kisi-kisi', label: 'KISI-KISI SOAL' },
    { id: 'kartu-soal', label: 'KARTU SOAL' },
  ];



  // Status peekan untuk grid Prota/Promes (6 bulan × 4 peekan = 24 kolom)
  const W_E = { status: 'efektif', label: '' };
  const W_EMPTY = (label = '') => ({ status: 'empty', label });
  const W_NON = (label) => ({ status: 'non-efektif', label });
  const W_PKL = { status: 'pkl', label: 'PKL' };

  /**
   * Semester Ganjil per kelas (Kalender TA 2026/2027):
   * - Kelas X: MPLS Juli minggu ke-3, KBM mulai minggu ke-4
   * - Kelas XI: tidak MPLS, KBM mulai Juli minggu ke-2
   * - Kelas XII: semester ganjil = PKL (bukan KBM mapel di sekolah)
   */
  const getGanjilWeeksList = (kelas = selectedClass) => {
    // Indeks 4–23: Agustus–Desember (berlaku X & XI)
    const afterJuly = [
      W_E, W_E, W_NON('HUT'), W_E,           // Agustus
      W_E, W_E, W_NON('STS'), W_E,           // September
      W_E, W_E, W_E, W_E,                   // Oktober
      W_E, W_E, W_E, W_E,                   // November
      W_E, W_E, W_NON('PAS'), W_EMPTY('L'), // Desember
    ];

    if (kelas === 'XII') {
      // Juli W1 libur; W2 pembekalan/pelepasan PKL; W3–Des: PKL; peekan rapor di akhir
      return [
        W_EMPTY(),
        W_NON('BEKAL'),
        W_PKL, W_PKL,                       // Juli W3–W4
        W_PKL, W_PKL, W_PKL, W_PKL,         // Agustus
        W_PKL, W_PKL, W_PKL, W_PKL,         // September
        W_PKL, W_PKL, W_PKL, W_PKL,         // Oktober
        W_PKL, W_PKL, W_PKL, W_PKL,         // November
        W_PKL, W_PKL, W_NON('PAS'), W_EMPTY('L'), // Desember
      ];
    }

    if (kelas === 'XI') {
      // Tidak MPLS — KBM mulai Juli minggu ke-2
      return [
        W_EMPTY(),                          // Juli W1 (libur kenaikan)
        W_E, W_E, W_E,                      // Juli W2–W4 KBM
        ...afterJuly,
      ];
    }

    // Kelas X — MPLS Juli minggu ke-3, KBM mulai minggu ke-4
    return [
      W_EMPTY(),                            // Juli W1 (libur kenaikan)
      W_EMPTY(),                            // Juli W2 (belum KBM)
      W_NON('MPLS'),                        // Juli W3 MPLS
      W_E,                                  // Juli W4 mulai pembelajaran
      ...afterJuly,
    ];
  };

  const genapWeeksList = [
    W_E, W_E, W_E, W_E,
    W_NON('LPP'),
    W_E, W_E,
    W_EMPTY(),
    W_NON('LHR'),
    W_E, W_E,
    W_EMPTY(),
    W_E, W_E, W_E, W_E,
    W_E, W_E, W_E, W_E,
    W_E, W_E,
    W_NON('PAT'),
    W_EMPTY('L'),
  ];

  const countWeeksByStatus = (weeksArray, status) =>
    weeksArray.filter((w) => w.status === status).length;

  const getWeeksArrayFor = (sem, kelas = selectedClass) =>
    sem === 'genap' ? genapWeeksList : getGanjilWeeksList(kelas);

  const getMingguEfektifFor = (sem, kelas = selectedClass) => {
    if (kelas === 'XII' && sem === 'ganjil') return 0; // PKL, bukan KBM efektif mapel
    return countWeeksByStatus(getWeeksArrayFor(sem, kelas), 'efektif');
  };

  const getTeachingSchedule = (materiList, weeksArray) => {
    let currentEfektifIndex = 0;
    return (materiList || []).map((m) => {
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

  // Alias dinamis (kompatibel pemanggilan lama di render)
  const ganjilWeeksList = getGanjilWeeksList(selectedClass);

  // Override minggu efektif sesuai kelas & semester (X MPLS, XI tanpa MPLS, XII ganjil PKL)
  schoolInfoData.mingguEfektif = getMingguEfektifFor(safeSemester, selectedClass);

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
    const sem = semesterOverride === 'genap' || semesterOverride === 'ganjil'
      ? semesterOverride
      : safeSemester;
    const semData = activeFaseData.semester[sem] || activeFaseData.semester.ganjil;
    const localMateriList = semData?.materi || [];
    const babTarget = Number(specificBab ?? selectedPpmBab);
    const activeMateri = localMateriList.find(m => m.bab === babTarget) || localMateriList[0] || null;

    // Classic theme dispatch — entirely different JSX layouts
    if (theme === 'classic') {
      const ctx = {
        sem, safeSemester, semester,
        selectedMapel, selectedClass, fase,
        activeFaseData, schoolInfoData,
        localMateriList, materiList,
        activeMateri, selectedPpmBab, setSelectedPpmBab, viewMode,
        academicYear, teacherName, teacherNbm,
        getWeeksArrayFor, getMingguEfektifFor,
        getTeachingSchedule, getPpmDetails,
        getDplForBab, generateDynamicLangkahInti,
        countWeeksByStatus,
        ganjilWeeksList, genapWeeksList,
        isFullscreen,
      };
      return renderClassicPage(tabName, index, specificBab, semesterOverride, ctx);
    }

    switch (tabName) {
      case 'cover':
        return (
          <div key="cover" className="a4-page cover-page a4-cover front-matter-page" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '18mm 14mm', border: '1px solid #E2E8F0' }}>
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
          <div
            key="judul"
            className="a4-page cover-page front-matter-page judul-page"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <div
              className="cover-border"
              style={{
                borderColor: '#666',
                borderStyle: 'double',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                boxSizing: 'border-box',
                padding: '28px 24px',
              }}
            >
              <div style={{ textAlign: 'center', width: '100%' }}>
                <h2 style={{ fontSize: '15px', fontWeight: 'bold', letterSpacing: '1.5px', margin: 0 }}>HALAMAN JUDUL</h2>
                <hr style={{ width: '100px', margin: '12px auto', borderColor: '#333' }} />
              </div>

              <div style={{ textAlign: 'center', margin: '22px 0 8px', width: '100%' }}>
                <h1 style={{ fontSize: '20px', fontWeight: '800', lineHeight: '1.35', margin: 0 }}>
                  PERANGKAT PEMBELAJARAN LENGKAP
                </h1>
                <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#333', marginTop: '8px', marginBottom: 0 }}>
                  {schoolInfoData.mapel}
                </h3>
              </div>

              <div style={{ margin: '18px 0', textAlign: 'center', fontSize: '12px', lineHeight: 1.65, width: '100%' }}>
                <p style={{ margin: '2px 0' }}>Diajukan Sebagai Dokumen Pelaksanaan Kegiatan Pembelajaran</p>
                <p style={{ margin: '2px 0' }}>Kurikulum Merdeka</p>
                <p style={{ margin: '2px 0' }}>Tahun Pelajaran {schoolInfoData.tahunAjaran}</p>
              </div>

              <div className="identity-box" style={{ width: 'min(90%, 420px)', margin: '8px auto 0' }}>
                <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <tbody>
                    {[
                      ['Mata Pelajaran', schoolInfoData.mapel],
                      ['Fase / Kelas', `${fase} / ${selectedClass}`],
                      ['Semester', sem.toUpperCase()],
                      ['Guru Pengampu', schoolInfoData.namaGuru],
                      ['Instansi', 'SMKS Muhammadiyah 2 Genteng'],
                    ].map(([label, value], i) => (
                      <tr key={i} style={{ borderBottom: '1px dotted #CCC' }}>
                        <td style={{ width: '38%', padding: '5px 8px 5px 0', fontWeight: 'bold', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{label}</td>
                        <td style={{ width: '4%', padding: '5px 4px', verticalAlign: 'top' }}>:</td>
                        <td style={{ padding: '5px 0 5px 4px', verticalAlign: 'top', lineHeight: 1.4 }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: '#555', width: '100%' }}>
                <p style={{ margin: '2px 0', fontWeight: 700, letterSpacing: '0.5px' }}>SMKS MUHAMMADIYAH 2 GENTENG</p>
                <p style={{ margin: '2px 0' }}>Kabupaten Banyuwangi - Jawa Timur</p>
              </div>
            </div>
          </div>
        );

      case 'identitas': {
        const idRow = (label, value, opts = {}) => (
          <tr style={{ borderBottom: '1px solid #E8EEF5' }}>
            <td className="id-label" style={{ padding: '4px 6px', fontWeight: 700, width: '34%', verticalAlign: 'top', color: '#334155', ...opts.labelStyle }}>{label}</td>
            <td style={{ padding: '4px 2px', width: '3%', verticalAlign: 'top', color: '#94A3B8' }}>:</td>
            <td className="id-value" style={{ padding: '4px 6px', verticalAlign: 'top', color: opts.accent ? '#0D47A1' : '#1E293B', fontWeight: opts.accent ? 700 : 500 }}>{value}</td>
          </tr>
        );
        return (
          <div key="identitas" className="a4-page identitas-page front-matter-page">
            <h2 className="page-title">IDENTITAS SATUAN PENDIDIKAN & GURU</h2>
            <div className="page-subtitle">Profil Resmi Satuan Pendidikan dan Administrasi Pelaksana Kurikulum</div>

            <div className="modern-card" style={{ marginTop: '10px', marginBottom: '10px', padding: '10px 12px' }}>
              <div className="modern-card-header" style={{ marginBottom: '6px', paddingBottom: '6px' }}>
                <h3 style={{ margin: 0, fontSize: '12px' }}>A. PROFIL SATUAN PENDIDIKAN</h3>
              </div>
              <div className="modern-card-body" style={{ padding: 0 }}>
                <table className="identitas-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', lineHeight: 1.35 }}>
                  <tbody>
                    {idRow('Nama Sekolah', 'SMKS MUHAMMADIYAH 2 GENTENG', { accent: true })}
                    {idRow('Alamat Lengkap', 'Jl. Hasanudin 103, Genteng Wetan, Genteng, Banyuwangi, Jawa Timur 68465')}
                    {idRow('Telepon / Fax', '0333 846292')}
                    {idRow('NPSN / Jenjang / Status', '20525622 / SMK / Swasta')}
                    {idRow('Email', 'smk_stm2_gtg@yahoo.co.id', { accent: true })}
                    {idRow('Website', 'www.smkmuh2genteng.sch.id', { accent: true })}
                    {idRow('SK Pendirian', '0109/III.A/1.D/2000 (30 September 2002)')}
                    {idRow('SK Izin Operasional', 'P2T/1027/19.08/02/VIII/2019 (01 Agustus 2019)')}
                    {idRow('Kepemilikan / Tanah', 'Yayasan / Milik Yayasan · Luas 20.200 m²')}
                    {idRow('Listrik', 'PLN & Diesel (175.000 VA)')}
                    {idRow('Mulai Operasional', '1976')}
                    {idRow('Akreditasi', 'A', { accent: true })}
                    {idRow('Kepala Sekolah', 'Tamyis Rosidi, S.Pd., M.Pd. (NBM. 1067597)')}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modern-card" style={{ marginTop: '8px', marginBottom: 0, padding: '10px 12px' }}>
              <div className="modern-card-header" style={{ marginBottom: '6px', paddingBottom: '6px' }}>
                <h3 style={{ margin: 0, fontSize: '12px' }}>B. ADMINISTRASI PELAKSANA KURIKULUM & GURU</h3>
              </div>
              <div className="modern-card-body" style={{ padding: 0 }}>
                <table className="identitas-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', lineHeight: 1.35 }}>
                  <tbody>
                    {idRow('Mata Pelajaran', selectedMapel || 'Mata Pelajaran Belum Dipilih', { accent: true })}
                    {idRow('Fase / Kelas', `${fase} / ${selectedClass}`)}
                    {idRow('Tahun Pelajaran', academicYear)}
                    {idRow('Guru Pengampu', `${teacherName || '........................................'} (NBM. ${teacherNbm || '......................'})`)}
                    {idRow('Waka Kurikulum', `${schoolInfoData.wakaKurikulum} (NBM. ${schoolInfoData.nbmWaka})`)}
                    {idRow('Alokasi JP & Waktu', `${schoolInfoData.mingguEfektif} Minggu Efektif (${schoolInfoData.mingguEfektif * schoolInfoData.jpPerMinggu} JP/Sem) — ${schoolInfoData.jpPerMinggu} JP/Pekan`)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }

      case 'daftar-isi': {
        const ganjilMateri = activeFaseData.semester.ganjil.materi;
        const genapMateri = activeFaseData.semester.genap.materi;
        
        const ganjilBabStart = ganjilMateri[0]?.bab || 1;
        const ganjilBabEnd = ganjilMateri[ganjilMateri.length - 1]?.bab || 5;
        
        const genapBabStart = genapMateri[0]?.bab || 6;
        const genapBabEnd = genapMateri[genapMateri.length - 1]?.bab || 10;

        return (
          <div key="daftar-isi" className="a4-page daftar-isi-page front-matter-page">
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
                  <div className="daftar-isi-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted #ccc', fontWeight: 'bold', color: '#E65100' }}>
                    <span>12b. ANALISIS CP &amp; TP (VERSI PP) — BUKU TEKS TERBARU</span>
                    <span>Seksi 12b</span>
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

      case 'pekan-efektif': {
        const weeksForRpe = getWeeksArrayFor(sem, selectedClass);
        const mingguEfektifRpe = getMingguEfektifFor(sem, selectedClass);
        const isXiiPkl = selectedClass === 'XII' && sem === 'ganjil';
        const totalJpMateri = localMateriList.reduce((acc, m) => acc + (m.alokasi || 0), 0);

        // Rincian per bulan (4 kolom/bulan; peeks empty di ujung tidak dihitung "terjadi")
        const monthNamesGanjil = ['Juli 2026', 'Agustus 2026', 'September 2026', 'Oktober 2026', 'November 2026', 'Desember 2026'];
        const monthNamesGenap = ['Januari 2027', 'Februari 2027', 'Maret 2027', 'April 2027', 'Mei 2027', 'Juni 2027'];
        const monthNames = sem === 'ganjil' ? monthNamesGanjil : monthNamesGenap;
        const monthRows = monthNames.map((name, mi) => {
          const slice = weeksForRpe.slice(mi * 4, mi * 4 + 4);
          const terjadi = slice.filter((w) => w.status !== 'empty').length;
          const efektif = slice.filter((w) => w.status === 'efektif').length;
          const pkl = slice.filter((w) => w.status === 'pkl').length;
          const tidakEfektif = slice.filter((w) => w.status === 'non-efektif' || w.status === 'pkl').length;
          return { name, terjadi, tidakEfektif, efektif, pkl };
        });
        const sumTerjadi = monthRows.reduce((a, r) => a + r.terjadi, 0);
        const sumTidak = monthRows.reduce((a, r) => a + r.tidakEfektif, 0);
        const sumEfektif = monthRows.reduce((a, r) => a + r.efektif, 0);

        const nonEfektifItems = (() => {
          if (sem === 'genap') {
            return [
              { nama: 'Kegiatan Permulaan Puasa / Penguatan Karakter', peKan: 1 },
              { nama: 'Penilaian Sumatif Tengah Semester (STS) & Libur Idul Fitri', peKan: 1 },
              { nama: 'Penilaian Sumatif Akhir Semester (PAT/SAS) & Rapor', peKan: 1 },
            ];
          }
          if (isXiiPkl) {
            return [
              { nama: 'Pembekalan dan Pelepasan Praktik Kerja Lapangan (PKL)', peKan: 1 },
              { nama: 'Praktik Kerja Lapangan (PKL) — Semester Ganjil Kelas XII', peKan: countWeeksByStatus(weeksForRpe, 'pkl') },
              { nama: 'Penilaian Sumatif Akhir Semester (PAS/SAS) & Rapor', peKan: 1 },
            ];
          }
          if (selectedClass === 'X') {
            return [
              { nama: 'Masa Pengenalan Lingkungan Sekolah (MPLS) — Juli minggu ke-3', peKan: 1 },
              { nama: 'Peringatan Hari Kemerdekaan RI & Maulid Nabi', peKan: 1 },
              { nama: 'Penilaian Sumatif Tengah Semester (STS)', peKan: 1 },
              { nama: 'Penilaian Sumatif Akhir Semester (PAS/SAS) & Rapor', peKan: 1 },
            ];
          }
          // Kelas XI: tanpa MPLS
          return [
            { nama: 'Peringatan Hari Kemerdekaan RI & Maulid Nabi', peKan: 1 },
            { nama: 'Penilaian Sumatif Tengah Semester (STS)', peKan: 1 },
            { nama: 'Penilaian Sumatif Akhir Semester (PAS/SAS) & Rapor', peKan: 1 },
          ];
        })();
        const totalNonItems = nonEfektifItems.reduce((a, it) => a + it.peKan, 0);

        return (
          <div key="pekan-efektif" className="a4-page">
            <h2 className="page-title">RINCIAN PEKAN EFEKTIF</h2>
            <div className="page-subtitle">
              Analisa Distribusi Alokasi Pekan Efektif - Kelas {selectedClass} · Semester {sem.toUpperCase()} TA 2026/2027
            </div>

            <div style={{ marginTop: '12px', fontSize: '11px', background: '#FFF8E1', border: '1px solid #FFB300', borderRadius: '4px', padding: '8px 10px', lineHeight: 1.6 }}>
              {selectedClass === 'X' && sem === 'ganjil' && (
                <p><strong>Kelas X:</strong> MPLS pada <strong>Juli minggu ke-3</strong>; pembelajaran (KBM) dimulai <strong>Juli minggu ke-4</strong>.</p>
              )}
              {selectedClass === 'XI' && sem === 'ganjil' && (
                <p><strong>Kelas XI:</strong> tidak mengikuti MPLS; pembelajaran dimulai dari <strong>Juli minggu ke-2</strong>.</p>
              )}
              {isXiiPkl && (
                <p><strong>Kelas XII:</strong> Semester Ganjil dialokasikan untuk <strong>Praktik Kerja Lapangan (PKL)</strong> — tidak ada KBM mapel di sekolah.</p>
              )}
              {sem === 'genap' && (
                <p>Semester Genap: alokasi peeks efektif mengikuti kalender akademik sekolah (berlaku semua kelas).</p>
              )}
            </div>

            <div style={{ marginTop: '16px', fontSize: '12px' }}>
              <h3 style={{ borderBottom: '2px solid #1976D2', color: '#1976D2', paddingBottom: '4px', marginBottom: '10px' }}>
                I. Perhitungan Pekan (Semester {sem === 'ganjil' ? 'Ganjil' : 'Genap'} · Kelas {selectedClass})
              </h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Bulan</th>
                    <th>Jumlah Pekan Terjadi</th>
                    <th>Jumlah Pekan Tidak Efektif{isXiiPkl ? ' / PKL' : ''}</th>
                    <th>Jumlah Pekan Efektif (KBM)</th>
                  </tr>
                </thead>
                <tbody>
                  {monthRows.map((r, idx) => (
                    <tr key={r.name}>
                      <td className="center">{idx + 1}</td>
                      <td>{r.name}</td>
                      <td className="center">{r.terjadi}</td>
                      <td className="center">{r.tidakEfektif}</td>
                      <td className="center">{r.efektif}</td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: 'bold', background: '#E3F2FD' }}>
                    <td colSpan="2" className="center">JUMLAH</td>
                    <td className="center">{sumTerjadi}</td>
                    <td className="center">{sumTidak}</td>
                    <td className="center">{sumEfektif}</td>
                  </tr>
                </tbody>
              </table>

              <h3 style={{ borderBottom: '2px solid #1976D2', color: '#1976D2', paddingBottom: '4px', margin: '20px 0 10px 0' }}>
                II. Analisa Pekan Tidak Efektif{isXiiPkl ? ' & PKL' : ''}
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
                  {nonEfektifItems.map((it, idx) => (
                    <tr key={it.nama}>
                      <td className="center">{idx + 1}</td>
                      <td>{it.nama}</td>
                      <td className="center">{it.peKan} Pekan</td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: 'bold', background: '#FFEBEE' }}>
                    <td colSpan="2" className="center">TOTAL PEKAN TIDAK EFEKTIF{isXiiPkl ? ' / PKL' : ''}</td>
                    <td className="center">{totalNonItems} Pekan</td>
                  </tr>
                </tbody>
              </table>

              <h3 style={{ borderBottom: '2px solid #1976D2', color: '#1976D2', paddingBottom: '4px', margin: '20px 0 10px 0' }}>
                III. Kesimpulan Perhitungan Jam Pelajaran (JP)
              </h3>
              <div style={{ background: '#E3F2FD', padding: '12px', border: '1px solid #1976D2', borderRadius: '4px', lineHeight: '1.8' }}>
                {isXiiPkl ? (
                  <>
                    <p>1. Semester Ganjil Kelas XII difokuskan pada <strong>Praktik Kerja Lapangan (PKL)</strong>.</p>
                    <p>2. Pekan Efektif KBM mapel di sekolah = <strong>0 Pekan</strong> (materi mapel diprogramkan pada Semester Genap setelah PKL).</p>
                    <p>3. Alokasi perangkat mapel pada semester ini bersifat administratif/penguatan (bukan distribusi KBM reguler).</p>
                  </>
                ) : (
                  <>
                    <p>1. Pekan Efektif KBM = <strong>{mingguEfektifRpe} Pekan</strong> (Kelas {selectedClass}, Semester {sem === 'ganjil' ? 'Ganjil' : 'Genap'}).</p>
                    <p>2. Jam Pelajaran Efektif = {mingguEfektifRpe} Pekan × {schoolInfoData.jpPerMinggu} JP / Pekan = <strong>{mingguEfektifRpe * schoolInfoData.jpPerMinggu} Jam Pelajaran (JP)</strong></p>
                    <p>3. Penggunaan JP materi = {totalJpMateri} JP untuk Tatap Muka KBM + {Math.max(0, mingguEfektifRpe * schoolInfoData.jpPerMinggu - totalJpMateri)} JP cadangan / penguatan (STS/SAS di luar peeks efektif KBM).</p>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      }

      case 'prota': {
        const showAll = viewMode === 'booklet';
        const monthsList = showAll 
          ? ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni']
          : (sem === 'ganjil'
            ? ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
            : ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni']);
            
        const jpPerMinggu = schoolInfoData.jpPerMinggu;
        
        const getMonthlyJP = (sm) => {
          const jpPerMonth = Array(6).fill(0);
          sm.schedule.forEach(wIdx => {
            const mIdx = Math.floor(wIdx / 4); // 4 weeks per month
            if (mIdx >= 0 && mIdx < 6) {
              jpPerMonth[mIdx] += jpPerMinggu;
            }
          });
          return jpPerMonth;
        };

        const getPklMonthlyMarks = (weeksArray) => {
          const marks = Array(6).fill(false);
          weeksArray.forEach((w, wIdx) => {
            if (w.status === 'pkl' || w.label === 'BEKAL') {
              const mIdx = Math.floor(wIdx / 4);
              if (mIdx >= 0 && mIdx < 6) marks[mIdx] = true;
            }
          });
          return marks;
        };

        const renderSemesterRows = (semData, isGenap, rowKeyPrefix) => {
          const weeksArray = isGenap ? genapWeeksList : getGanjilWeeksList(selectedClass);
          const isPklSemester = selectedClass === 'XII' && !isGenap;

          if (isPklSemester) {
            const pklMarks = getPklMonthlyMarks(weeksArray);
            return [
              <tr key={`${rowKeyPrefix}-pkl`}>
                <td className="center" style={{ fontWeight: 'bold', verticalAlign: 'middle', background: '#FFF3E0' }}>
                  {semData.nama}
                </td>
                <td className="center">PKL</td>
                <td>
                  <strong>Praktik Kerja Lapangan (PKL)</strong>
                  <ul style={{ margin: '4px 0 0', paddingLeft: '16px', fontSize: '8.5px' }}>
                    <li>Kelas XII Semester Ganjil mengikuti program PKL sesuai kalender sekolah.</li>
                    <li>Juli minggu ke-2: pembekalan & pelepasan PKL; peeks berikutnya hingga PAS: pelaksanaan PKL.</li>
                    <li>KBM mapel di sekolah diprogramkan pada Semester Genap.</li>
                  </ul>
                </td>
                <td className="center" style={{ fontWeight: 'bold' }}>-</td>
                {monthsList.map((m, mColIdx) => {
                  let active = false;
                  if (showAll) {
                    if (mColIdx < 6) active = pklMarks[mColIdx];
                  } else {
                    active = pklMarks[mColIdx];
                  }
                  return (
                    <td key={mColIdx} className="center" style={{ background: active ? '#FFE0B2' : '', fontWeight: active ? 'bold' : '', fontSize: '8px' }}>
                      {active ? 'PKL' : ''}
                    </td>
                  );
                })}
              </tr>,
            ];
          }

          const scheduledMateri = getTeachingSchedule(semData.materi, weeksArray);
          return scheduledMateri.map((sm, idx) => {
            const monthlyJp = getMonthlyJP(sm);
            return (
              <tr key={`${rowKeyPrefix}-${idx}`}>
                {idx === 0 && (
                  <td rowSpan={semData.materi.length} className="center" style={{ fontWeight: 'bold', verticalAlign: 'middle', background: '#F5F5F5' }}>
                    {semData.nama}
                  </td>
                )}
                <td className="center">{sm.bab}</td>
                <td>
                  <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '8.5px' }}>
                    {sm.tp?.map((t, tIdx) => (
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
                    } else if (mColIdx < 6) {
                      jpVal = monthlyJp[mColIdx];
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
        };

        const semesterBlocks = viewMode === 'single'
          ? [{ data: activeFaseData.semester[sem], isGenap: sem === 'genap', key: sem }]
          : [
              { data: activeFaseData.semester.ganjil, isGenap: false, key: 'ganjil' },
              { data: activeFaseData.semester.genap, isGenap: true, key: 'genap' },
            ];

        const totalJpDisplay = (() => {
          if (viewMode === 'single') {
            if (selectedClass === 'XII' && sem === 'ganjil') return 'PKL';
            return `${activeFaseData.semester[sem].materi.reduce((acc, m) => acc + m.alokasi, 0)} JP`;
          }
          const genapJp = activeFaseData.semester.genap.materi.reduce((acc, m) => acc + m.alokasi, 0);
          if (selectedClass === 'XII') return `PKL + ${genapJp} JP`;
          const ganjilJp = activeFaseData.semester.ganjil.materi.reduce((acc, m) => acc + m.alokasi, 0);
          return `${ganjilJp + genapJp} JP`;
        })();

        return (
          <div key="prota" className="a4-page landscape-mode" style={{ padding: '15mm 15mm' }}>
            <h2 className="page-title">PROGRAM TAHUNAN (PROTA)</h2>
            <div className="page-subtitle">
              Distribusi Alokasi JP Bulanan - Kelas {selectedClass} · Fase {fase} TA {schoolInfoData.tahunAjaran}
            </div>
            {selectedClass === 'X' && (
              <p style={{ fontSize: '9px', marginTop: '6px', color: '#555' }}>
                Catatan Kelas X: MPLS Juli minggu ke-3; KBM dimulai Juli minggu ke-4.
              </p>
            )}
            {selectedClass === 'XI' && (
              <p style={{ fontSize: '9px', marginTop: '6px', color: '#555' }}>
                Catatan Kelas XI: tanpa MPLS; KBM dimulai Juli minggu ke-2.
              </p>
            )}
            {selectedClass === 'XII' && (
              <p style={{ fontSize: '9px', marginTop: '6px', color: '#555' }}>
                Catatan Kelas XII: Semester Ganjil = PKL; KBM mapel pada Semester Genap.
              </p>
            )}

            <div className="table-print-wrap" style={{ marginTop: '12px', overflowX: 'auto' }}>
              <table className="data-table" style={{ fontSize: '9px', width: '100%', tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th style={{ width: '5%' }}>Sem</th>
                    <th style={{ width: '5%' }}>Bab</th>
                    <th style={{ width: showAll ? '28%' : '36%' }}>Tujuan Pembelajaran (TP)</th>
                    <th style={{ width: '8%' }}>Alokasi (JP)</th>
                    {monthsList.map((m, idx) => (
                      <th key={idx} style={{ width: showAll ? `${54 / monthsList.length}%` : `${46 / monthsList.length}%`, wordBreak: 'break-word' }}>{m.substring(0, 3)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {semesterBlocks.flatMap((block) => renderSemesterRows(block.data, block.isGenap, block.key))}
                  {/* Total Row */}
                  <tr style={{ background: '#E3F2FD', fontWeight: 'bold' }}>
                    <td colSpan="3" style={{ textAlign: 'right', paddingRight: '15px' }}>
                      TOTAL {viewMode === 'single' ? `SEMESTER ${sem.toUpperCase()}` : 'PROGRAM TAHUNAN'}
                    </td>
                    <td className="center">{totalJpDisplay}</td>
                    {monthsList.map((m, mColIdx) => {
                      let colSum = 0;
                      let colPkl = false;
                      if (viewMode === 'single') {
                        if (selectedClass === 'XII' && sem === 'ganjil') {
                          const marks = getPklMonthlyMarks(getGanjilWeeksList('XII'));
                          colPkl = marks[mColIdx];
                        } else {
                          const weeksArray = getWeeksArrayFor(sem, selectedClass);
                          const scheduled = getTeachingSchedule(activeFaseData.semester[sem].materi, weeksArray);
                          scheduled.forEach((sm) => {
                            colSum += getMonthlyJP(sm)[mColIdx];
                          });
                        }
                      } else {
                        if (selectedClass === 'XII') {
                          const marks = getPklMonthlyMarks(getGanjilWeeksList('XII'));
                          if (mColIdx < 6) colPkl = marks[mColIdx];
                        } else {
                          const scheduledGanjil = getTeachingSchedule(activeFaseData.semester.ganjil.materi, getGanjilWeeksList(selectedClass));
                          scheduledGanjil.forEach((sm) => {
                            if (mColIdx < 6) colSum += getMonthlyJP(sm)[mColIdx];
                          });
                        }
                        const scheduledGenap = getTeachingSchedule(activeFaseData.semester.genap.materi, genapWeeksList);
                        scheduledGenap.forEach((sm) => {
                          if (mColIdx >= 6) colSum += getMonthlyJP(sm)[mColIdx - 6];
                        });
                      }
                      return (
                        <td key={mColIdx} className="center" style={{ background: colPkl ? '#FFE0B2' : '#E3F2FD', fontWeight: 'bold', fontSize: '8px' }}>
                          {colPkl ? 'PKL' : (colSum > 0 ? `${colSum} JP` : '')}
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
        const weeksArray = getWeeksArrayFor(sem, selectedClass);
        const scheduledMateri = getTeachingSchedule(localMateriList, weeksArray);
        const isXiiPklPromes = selectedClass === 'XII' && sem === 'ganjil';

        const cellMeta = (w, opts = {}) => {
          const { willTeach = false, forcePas = false, forceLibur = false } = opts;
          let text = '';
          let bg = '';
          if (forcePas && (w.label === 'PAS' || w.label === 'PAT')) {
            text = schoolInfoData.jpPerMinggu;
            bg = '#FFCDD2';
          } else if (forceLibur && w.label === 'L') {
            text = 'L';
            bg = '#FFE082';
          } else if (willTeach) {
            text = schoolInfoData.jpPerMinggu;
            bg = '#BBDEFB';
          } else if (w.status === 'pkl') {
            text = 'PKL';
            bg = '#FFE0B2';
          } else if (w.status === 'non-efektif') {
            text = w.label;
            bg = w.label === 'MPLS' || w.label === 'BEKAL' ? '#FFCCBC' : '#FFCDD2';
          } else if (w.status === 'empty' && w.label) {
            text = w.label;
            bg = '#FFE082';
          }
          return { text, bg };
        };

        return (
          <div key="promes" className="a4-page landscape-mode" style={{ padding: '15mm 15mm' }}>
            <h2 className="page-title">PROGRAM SEMESTER (PROMES)</h2>
            <div className="page-subtitle">
              Distribusi KBM Pekanan - Kelas {selectedClass} · Semester {sem.toUpperCase()} TA {schoolInfoData.tahunAjaran}
            </div>
            {selectedClass === 'X' && sem === 'ganjil' && (
              <p style={{ fontSize: '9px', marginTop: '6px', color: '#555' }}>
                MPLS di Juli minggu ke-3 (oranye muda); KBM mulai Juli minggu ke-4.
              </p>
            )}
            {selectedClass === 'XI' && sem === 'ganjil' && (
              <p style={{ fontSize: '9px', marginTop: '6px', color: '#555' }}>
                Tanpa MPLS; KBM mulai Juli minggu ke-2.
              </p>
            )}
            {isXiiPklPromes && (
              <p style={{ fontSize: '9px', marginTop: '6px', color: '#555' }}>
                Semester Ganjil Kelas XII = PKL (bukan distribusi KBM mapel).
              </p>
            )}

            <div className="table-print-wrap promes-table-wrap" style={{ marginTop: '12px', overflowX: 'auto' }}>
              <table className="data-table promes-table" style={{ fontSize: '8px', width: '100%', tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th rowSpan="2" style={{ width: '4%' }}>Bab</th>
                    <th rowSpan="2" style={{ width: '28%' }}>Tujuan Pembelajaran (TP)</th>
                    <th rowSpan="2" style={{ width: '6%' }}>JP</th>
                    {sem === 'ganjil' ? (
                      <>
                        <th colSpan="4">Jul</th>
                        <th colSpan="4">Agu</th>
                        <th colSpan="4">Sep</th>
                        <th colSpan="4">Okt</th>
                        <th colSpan="4">Nov</th>
                        <th colSpan="4">Des</th>
                      </>
                    ) : (
                      <>
                        <th colSpan="4">Jan</th>
                        <th colSpan="4">Feb</th>
                        <th colSpan="4">Mar</th>
                        <th colSpan="4">Apr</th>
                        <th colSpan="4">Mei</th>
                        <th colSpan="4">Jun</th>
                      </>
                    )}
                  </tr>
                  <tr>
                    {Array.from({ length: 24 }).map((_, idx) => (
                      <th key={idx} style={{ padding: '1px', fontSize: '7px', width: `${62 / 24}%` }}>{idx % 4 + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isXiiPklPromes ? (
                    <tr>
                      <td className="center">PKL</td>
                      <td>
                        <strong>Praktik Kerja Lapangan (PKL)</strong>
                        <ul style={{ margin: '4px 0 0', paddingLeft: '16px', fontSize: '8.5px' }}>
                          <li>Pembekalan & pelepasan PKL (Juli minggu ke-2).</li>
                          <li>Pelaksanaan PKL di dunia kerja hingga peeks menjelang PAS.</li>
                          <li>KBM mapel dilanjutkan pada Semester Genap.</li>
                        </ul>
                      </td>
                      <td className="center" style={{ fontWeight: 'bold' }}>-</td>
                      {weeksArray.map((w, wIdx) => {
                        const { text, bg } = cellMeta(w);
                        return (
                          <td key={wIdx} className="center" style={{ background: bg, fontWeight: 'bold', fontSize: '7px' }}>
                            {text}
                          </td>
                        );
                      })}
                    </tr>
                  ) : (
                    scheduledMateri.map((sm, mIdx) => (
                      <tr key={mIdx}>
                        <td className="center">{sm.bab}</td>
                        <td>
                          <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '8.5px' }}>
                            {sm.tp?.map((t, tIdx) => (
                              <li key={tIdx} style={{ marginBottom: '2px' }}>{t}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="center" style={{ fontWeight: 'bold' }}>{sm.alokasi} JP</td>
                        {weeksArray.map((w, wIdx) => {
                          const willTeach = sm.schedule.includes(wIdx);
                          const { text, bg } = cellMeta(w, { willTeach });
                          return (
                            <td key={wIdx} className="center" style={{ background: bg, fontWeight: 'bold', fontSize: '7px' }}>
                              {text}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                  {/* Exam weeks */}
                  <tr style={{ background: '#FFCDD2', fontWeight: 'bold' }}>
                    <td className="center">-</td>
                    <td>Penilaian Sumatif Akhir Semester ({sem === 'ganjil' ? 'PAS' : 'PAT'})</td>
                    <td className="center">{isXiiPklPromes ? '-' : `${schoolInfoData.jpPerMinggu} JP`}</td>
                    {weeksArray.map((w, wIdx) => {
                      const { text, bg } = cellMeta(w, { forcePas: true });
                      return (
                        <td key={wIdx} className="center" style={{ background: w.label === 'PAS' || w.label === 'PAT' ? '#FFCDD2' : bg }}>
                          {w.label === 'PAS' || w.label === 'PAT' ? (isXiiPklPromes ? 'PAS' : text) : ''}
                        </td>
                      );
                    })}
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
              {localMateriList.map((m, mIdx) => (
                <div key={mIdx} className="prevent-break" style={{ border: '1px solid #333', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>
                  <div style={{ background: '#1976D2', color: 'white', padding: '6px', fontWeight: 'bold', borderRadius: '2px', marginBottom: '8px' }}>
                    ELEMEN: {(m.elemen || '-').toUpperCase()} (BAB {m.bab})
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
                            {(m.tp || []).map((t, tIdx) => <li key={tIdx}>{t}</li>)}
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

      case 'cp-tp-pp': {
        // Halaman khusus pemetaan CP–TP Versi PP (buku teks terbaru)
        // Default fokusankan data semester aktif; untuk PAI XI gunakan genap Versi PP sebagai rujukan utama
        const isPaiXi = selectedMapel === 'pai' && selectedClass === 'XI';
        const sourceSemKey = isPaiXi ? 'genap' : sem;
        const sourceSem = activeFaseData.semester[sourceSemKey] || semData;
        const sourceMateri = sourceSem.materi || [];
        const totalJp = sourceMateri.reduce((acc, m) => acc + (m.alokasi || 0), 0);
        const totalTm = sourceMateri.reduce((acc, m) => acc + (m.minggu || 0), 0);
        const isVersiPp = sourceSem.versiKurikulum === 'PP' || isPaiXi;

        return (
          <div key="cp-tp-pp" className="a4-page" style={{ padding: '12mm 12mm' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
              <div>
                <h2 className="page-title" style={{ marginBottom: '6px', textAlign: 'left' }}>ANALISIS CP DAN TP</h2>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0D47A1' }}>
                  {selectedMapel === 'pai' ? 'PAI & Budi Pekerti' : schoolInfoData.mapel} · Kelas {selectedClass} · Semester {sourceSem.nama || sourceSemKey.toUpperCase()}
                </div>
              </div>
              {isVersiPp && (
                <span style={{
                  background: 'linear-gradient(135deg, #FF8F00, #FFB300)',
                  color: '#1A237E',
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '6px 12px',
                  borderRadius: '20px',
                  letterSpacing: '0.4px',
                  whiteSpace: 'nowrap'
                }}>
                  VERSI PP · BUKU TEKS TERBARU
                </span>
              )}
            </div>

            <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.55, margin: '10px 0 14px', textAlign: 'justify' }}>
              Dokumen ini berisi pemetaan <strong>Capaian Pembelajaran (CP)</strong> dan <strong>Tujuan Pembelajaran (TP)</strong>
              {isPaiXi
                ? ' yang telah disesuaikan dengan daftar isi buku teks terbaru untuk Kelas XI Semester Genap'
                : ` untuk ${schoolInfoData.mapel} Kelas ${selectedClass} Semester ${sourceSem.nama || sourceSemKey}`}
              . Durasi acuan: <strong>{totalTm} Pertemuan (TM) × {schoolInfoData.jpPerMinggu || 3} JP = {totalJp} JP</strong>.
            </p>

            <div className="table-print-wrap" style={{ overflowX: 'auto' }}>
              <table className="data-table" style={{ fontSize: '9.5px', width: '100%', tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th style={{ width: '7%' }}>Bab</th>
                    <th style={{ width: '22%' }}>Topik / Judul Bab<br /><span style={{ fontWeight: 500, fontSize: '8px' }}>(Buku Terbaru)</span></th>
                    <th style={{ width: '14%' }}>Elemen</th>
                    <th style={{ width: '42%' }}>Tujuan Pembelajaran (TP) Hasil Penyesuaian</th>
                    <th style={{ width: '15%' }}>Alokasi<br />Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {sourceMateri.map((m) => (
                    <tr key={m.bab}>
                      <td className="center" style={{ fontWeight: 800, fontSize: '12px', color: '#0D47A1' }}>{m.bab}</td>
                      <td style={{ fontWeight: 700, color: '#1E293B', lineHeight: 1.4 }}>
                        <ArabicText text={m.judul} />
                      </td>
                      <td className="center" style={{ fontSize: '9px' }}>{m.elemen}</td>
                      <td style={{ lineHeight: 1.45 }}>
                        <ol style={{ margin: 0, paddingLeft: '16px' }}>
                          {(m.tp || []).map((t, i) => (
                            <li key={i} style={{ marginBottom: '4px' }}>{t}</li>
                          ))}
                        </ol>
                        <div style={{ marginTop: '6px', fontSize: '8.5px', color: '#64748B', fontStyle: 'italic', borderTop: '1px dashed #E2E8F0', paddingTop: '4px' }}>
                          <strong>CP:</strong> {m.capaian}
                        </div>
                      </td>
                      <td className="center" style={{ fontWeight: 700 }}>
                        {m.minggu} TM<br />({m.alokasi} JP)
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: '#E3F2FD', fontWeight: 800 }}>
                    <td colSpan={4} style={{ textAlign: 'right', paddingRight: '12px' }}>
                      TOTAL ALOKASI SEMESTER {String(sourceSem.nama || sourceSemKey).toUpperCase()}
                    </td>
                    <td className="center">{totalTm} TM<br />({totalJp} JP)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{
              marginTop: '14px',
              background: '#FFF8E1',
              border: '1px solid #FFE082',
              borderLeft: '4px solid #FFB300',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '10px',
              color: '#5D4037',
              lineHeight: 1.5
            }}>
              <strong>Catatan Versi PP:</strong> Pemetaan ini menjadi acuan penyusunan ATP, KKTP, Modul Ajar (PPM), kisi-kisi, dan kartu soal.
              Modul Ajar pada menu <em>MODUL AJAR (PPM)</em> otomatis mengikuti TP di atas (termasuk LKPD yang selaras inti pembelajaran).
            </div>

            <div style={{ marginTop: '28px' }}>
              <SignatureBlock semOverride={sourceSemKey} />
            </div>
          </div>
        );
      }

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
                  {localMateriList.map((m, mIdx) => (
                    <React.Fragment key={mIdx}>
                      {m.tp?.map((t, tIdx) => (
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
                Interval Kriteria digunakan untuk menentukan tingkat ketuntasan murid dalam memahami materi esensial Pendidikan Agama Islam & Budi Pekerti:
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
                    <td>KBM tuntas, murid melanjutkan ke materi berikutnya tanpa perbaikan.</td>
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
              <div className="prevent-break" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px', background: '#F9FBE7' }}>
                <strong>
                  Bab {activeMateri?.bab || '-'}: <ArabicText text={activeMateri?.judul || 'Materi belum dipilih'} />
                </strong>
                <ul style={{ margin: '8px 0 0 20px', padding: '0' }}>
                  {(activeMateri?.tp || []).map((tp, tpIdx) => (
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
        // gunakan activeMateri dari atas (sudah dinormalisasi)
        if (!activeMateri || !activeMateri.bab) {
          return (
            <div key="modul-empty" className="a4-page" style={{ padding: '20mm' }}>
              <h2 className="page-title">MODUL AJAR (PPM)</h2>
              <p style={{ marginTop: '20px', color: '#64748B' }}>
                Materi untuk semester ini belum tersedia. Silakan ganti semester atau mapel.
              </p>
            </div>
          );
        }

        const materiTp = Array.isArray(activeMateri.tp) ? activeMateri.tp : [];
        const totalPertemuan = Math.max(1, Number(activeMateri.minggu) || 1);
        const ppmDetails = getPpmDetails(fase, activeMateri.bab, selectedMapel, selectedClass, activeMateri);
        const lkpdTasks = Array.isArray(ppmDetails.lkpd) ? ppmDetails.lkpd : [];
        const lkpdPetunjuk = Array.isArray(ppmDetails.lkpdPetunjuk) ? ppmDetails.lkpdPetunjuk : [];

        return (
          <div key={`modul-${activeMateri.bab}`} className="a4-page" style={{ padding: '15mm 15mm' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="no-print">
              <h2 className="page-title" style={{ margin: '0' }}>MODUL AJAR (PPM)</h2>
              <div style={{ fontSize: '11px', background: '#E3F2FD', padding: '6px', border: '1px solid #90CAF9', borderRadius: '4px' }}>
                {viewMode === 'single' ? (
                  <>
                    Pilih Bab PPM:
                    <select
                      value={selectedPpmBab}
                      onChange={(e) => setSelectedPpmBab(parseInt(e.target.value, 10))}
                      style={{ marginLeft: '6px', padding: '2px', fontWeight: 'bold', maxWidth: '280px' }}
                    >
                      {materiList.map((m) => (
                        <option key={m.bab} value={m.bab}>
                          {`Bab ${m.bab}: ${m.judul || ''}`}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <strong>Menampilkan Otomatis: Bab {activeMateri.bab} (Seluruh Dokumen)</strong>
                )}
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
                      <div><strong>Kompetensi Awal:</strong> Murid memiliki pemahaman dasar tentang materi prasyarat sebelum memasuki topik ini.</div>
                      <div><strong>Pendekatan:</strong> TPACK (Technological Pedagogical Content Knowledge) & Pembelajaran Berdiferensiasi.</div>
                      <div><strong>Model Pembelajaran:</strong> Discovery Learning / Problem-Based Learning.</div>
                      <div><strong>Target Murid:</strong> Regular (30 Murid) & Pencapaian Tinggi (Fast Learners).</div>
                    </div>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '6px', fontSize: '11px' }}>Sarana & Prasarana:</strong>
                    <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '11px' }}>
                      {(ppmDetails.saranaPrasarana || []).map((s, sIdx) => (
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
                        {materiTp.map((tp, idx) => (
                          <li key={idx} style={{ marginBottom: '6px' }}>Murid mampu <strong>{tp}</strong></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '6px' }}>Dimensi Profil Lulusan (Deep Learning):</strong>
                      <ul style={{ margin: '0', paddingLeft: '16px', listStyleType: 'circle' }}>
                        {(getDplForBab(fase, activeMateri.bab, selectedMapel) || []).map((d, dIdx) => (
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
                      {(ppmDetails.pertanyaanPemantik || []).map((q, qIdx) => (
                        <li key={qIdx} style={{ marginBottom: '3px', fontWeight: '500' }}>{q}</li>
                      ))}
                    </ol>
                  </div>

                </div>
              </div>

              {/* SECTION 4: Langkah-Langkah Pembelajaran (Per Pertemuan) — aliran natural, tanpa page-break paksa */}
              <div style={{ textAlign: 'center', margin: '15px 0 10px 0' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-dark)' }}>IV. LANGKAH-LANGKAH KEGIATAN PEMBELAJARAN (PER PERTEMUAN)</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-light)' }}>Total {totalPertemuan} Pertemuan ({activeMateri.alokasi} JP × 45 Menit) - Pendekatan TPACK & Diferensiasi</p>
              </div>

              {Array.from({ length: totalPertemuan }).map((_, pertIdx) => {
                const targetTp = materiTp[pertIdx] || materiTp[materiTp.length - 1] || activeMateri.judul || 'materi pembelajaran';
                const isFirst = pertIdx === 0;
                const isLast = pertIdx === totalPertemuan - 1;
                
                return (
                  <div
                    key={pertIdx}
                    className="modern-card"
                    style={{ borderLeftColor: isLast ? 'var(--secondary)' : 'var(--primary)' }}
                  >
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
                                  <li>{ppmDetails.langkahPendahuluan?.[0]}</li>
                                  <li>{ppmDetails.langkahPendahuluan?.[1]}</li>
                                  <li>Menyampaikan pertanyaan pemantik: <em>{ppmDetails.pertanyaanPemantik?.[0]}</em></li>
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
                            <ul style={{ margin: '0', paddingLeft: '16px', fontSize: '10.5px', lineHeight: '1.6' }}>
                              {generateDynamicLangkahInti(targetTp, pertIdx).map((langkah, lIdx) => (
                                <li key={lIdx} style={{ marginBottom: lIdx === 2 ? '0' : '8px' }}>
                                  <strong style={{ color: 'var(--primary-dark)' }}>Tahap {lIdx + 1} ({lIdx === 0 ? 'Memahami' : lIdx === 1 ? 'Mengaplikasi' : 'Merefleksi'}):</strong>{' '}
                                  <span>{langkah}</span>
                                </li>
                              ))}
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
                                  <li>{ppmDetails.langkahPenutup?.[0]}</li>
                                  <li>{ppmDetails.langkahPenutup?.[1]}</li>
                                  <li>Guru memberikan penguatan nilai-nilai Profil Pelajar Pancasila dan pesan moral.</li>
                                  <li>{ppmDetails.langkahPenutup?.[4]}</li>
                                </>
                              ) : (
                                <>
                                  <li>Murid dipandu membuat simpulan sementara dari kegiatan hari ini.</li>
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

              {/* SECTION 6: Bahan Ajar Lengkap & Kontekstual */}
              {(() => {
                const matDetail = detailedMateri?.[selectedMapel]?.[selectedClass]?.[activeMateri.bab];
                return (
                  <div className="modern-card">
                    <div className="modern-card-header">
                      <span>V. BAHAN BACAAN GURU & MURID (BAHAN AJAR MENDALAM)</span>
                      <span className="pill-badge active">Khazanah & Pengayaan</span>
                    </div>
                    <div className="modern-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <p style={{ margin: 0, fontSize: '11px', textAlign: 'justify', lineHeight: '1.6', color: '#334155' }}>
                        {matDetail?.ringkasan || `Materi ajar esensial pada bab ini difokuskan pada penguasaan komprehensif konsep ${activeMateri.judul} untuk membangun daya nalar kritis, integritas moral, dan ketrampilan praktis murid SMK.`}
                      </p>

                      {matDetail?.sections && matDetail.sections.length > 0 ? (
                        matDetail.sections.map((sec, sIdx) => (
                          <div key={sIdx} style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                            <strong style={{ color: 'var(--primary-dark)', fontSize: '11.5px', display: 'block', marginBottom: '8px' }}>
                              {sec.title}
                            </strong>
                            {sec.dalil && (
                              <div style={{ background: '#FFFBEB', borderLeft: '4px solid #F59E0B', padding: '10px', borderRadius: '4px', marginBottom: '8px', textAlign: 'right' }}>
                                <ArabicText text={sec.dalil} />
                                {sec.arti && <p style={{ margin: '6px 0 0 0', fontSize: '10px', color: '#78350F', textAlign: 'left', fontStyle: 'italic' }}>{sec.arti}</p>}
                              </div>
                            )}
                            <div style={{ fontSize: '11px', lineHeight: '1.6', color: '#1E293B' }} dangerouslySetInnerHTML={{ __html: sec.content }} />
                          </div>
                        ))
                      ) : (
                        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', border: '1px dashed #CBD5E1', fontSize: '11px' }}>
                          <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '6px' }}>Target Utama Pembelajaran:</strong>
                          <ul style={{ margin: 0, paddingLeft: '16px' }}>
                            {materiTp.map((tp, idx) => (
                              <li key={idx} style={{ marginBottom: '4px' }}>
                                <strong>TP {idx + 1}:</strong> {tp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div style={{ borderTop: '1px dashed #CBD5E1', paddingTop: '10px', fontSize: '10px', color: '#64748B' }}>
                        <strong>Rujukan & Referensi Utama:</strong>
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px' }}>
                          {(matDetail?.rujukan || [
                            'Buku Teks Utama PAI & Budi Pekerti / Bahasa Arab / Kemuhammadiyahan Kurikulum Merdeka Kemdikbudristek.',
                            'Al-Qur\'an dan Terjemahannya, Kemenag RI.',
                            'Tafsir At-Tanwir, Majelis Tarjih dan Tajdid PP Muhammadiyah.'
                          ]).map((r, rIdx) => (
                            <li key={rIdx}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* SECTION 7: LAMPIRAN LKPD UTUH & KONTEKSTUAL (SESUAI FORMAT DOCX REFERENSI) */}
              {(() => {
                const dLkpd = ppmDetails.detailedLkpd || getDetailedLkpdForBab(fase, activeMateri.bab, selectedMapel, selectedClass, activeMateri);
                return (
                  <div className="lkpd-section" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ textAlign: 'center', borderBottom: '2px solid var(--primary-dark)', paddingBottom: '8px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
                        {dLkpd.judulLkpd}
                      </h3>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#475569', margin: '4px 0 0 0' }}>
                        {dLkpd.subJudul}
                      </p>
                    </div>

                    {/* Identitas LKPD */}
                    <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '12px', borderRadius: '8px', fontSize: '11px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                        <div><strong>Mata Pelajaran:</strong> {dLkpd.identitas.mapel}</div>
                        <div><strong>Fase / Kelas:</strong> {dLkpd.identitas.faseKelas}</div>
                        <div><strong>Materi Pokok:</strong> <ArabicText text={dLkpd.identitas.materi} /></div>
                        <div><strong>Model Pembelajaran:</strong> {dLkpd.identitas.model}</div>
                        <div style={{ gridColumn: 'span 2' }}><strong>Target Profil Lulusan (DPL):</strong> {dLkpd.identitas.targetDpl}</div>
                      </div>
                    </div>

                    {/* Identitas Kelompok / Murid */}
                    <div style={{ border: '1px dashed #94A3B8', padding: '10px', borderRadius: '6px', fontSize: '11px', background: '#FFFFFF' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                        <div><strong>Nama Kelompok:</strong> ...........................................................</div>
                        <div><strong>Tanggal:</strong> ...........................................................</div>
                        <div style={{ gridColumn: 'span 2' }}>
                          <strong>Anggota Kelompok:</strong> 1. ............................. 2. ............................. 3. ............................. 4. .............................
                        </div>
                      </div>
                    </div>

                    {/* I. TUJUAN PEMBELAJARAN */}
                    <div className="modern-card" style={{ borderLeftColor: 'var(--primary)' }}>
                      <div className="modern-card-header">
                        <span>I. TUJUAN PEMBELAJARAN</span>
                        <span className="pill-badge active">Capaian TP</span>
                      </div>
                      <div className="modern-card-body">
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', lineHeight: '1.6' }}>
                          {dLkpd.tujuan.map((t, idx) => (
                            <li key={idx}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* II. PETUNJUK KERJA */}
                    <div className="modern-card">
                      <div className="modern-card-header">
                        <span>II. PETUNJUK KERJA</span>
                        <span className="pill-badge">Panduan Praktis</span>
                      </div>
                      <div className="modern-card-body">
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', lineHeight: '1.6' }}>
                          {dLkpd.petunjuk.map((p, idx) => (
                            <li key={idx}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* III. RUBRIK & BOBOT PENILAIAN */}
                    <div className="modern-card">
                      <div className="modern-card-header">
                        <span>III. RUBRIK & BOBOT PENILAIAN KINERJA (LKPD)</span>
                        <span className="pill-badge active">Standar Asesmen</span>
                      </div>
                      <div className="modern-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <table className="data-table" style={{ fontSize: '10px' }}>
                          <thead>
                            <tr>
                              <th style={{ width: '5%' }}>No</th>
                              <th style={{ width: '35%' }}>Komponen / Sub Komponen</th>
                              <th style={{ width: '15%' }}>Tidak (&lt;75)</th>
                              <th style={{ width: '15%' }}>CK (75-83)</th>
                              <th style={{ width: '15%' }}>K (84-92)</th>
                              <th style={{ width: '15%' }}>SK (93-100)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dLkpd.rubrikPenilaian.map((rub, rIdx) => (
                              <React.Fragment key={rIdx}>
                                <tr style={{ background: '#F1F5F9', fontWeight: 'bold' }}>
                                  <td className="center">{rub.no}</td>
                                  <td colSpan={5}>{rub.komponen}</td>
                                </tr>
                                {rub.sub.map((sText, sIdx) => (
                                  <tr key={sIdx}>
                                    <td></td>
                                    <td>{sText}</td>
                                    <td className="center"></td>
                                    <td className="center"></td>
                                    <td className="center"></td>
                                    <td className="center"></td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>

                        {/* Tabel Bobot Penilaian */}
                        <strong style={{ fontSize: '10.5px', color: 'var(--primary-dark)', marginTop: '4px' }}>Persentase Bobot Komponen Penilaian:</strong>
                        <table className="data-table" style={{ fontSize: '10px' }}>
                          <thead>
                            <tr>
                              <th>Persiapan</th>
                              <th>Proses</th>
                              <th>Hasil</th>
                              <th>Sikap</th>
                              <th>Waktu</th>
                              <th>Nilai Akhir (NP)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="center">10%</td>
                              <td className="center">30%</td>
                              <td className="center">40%</td>
                              <td className="center">10%</td>
                              <td className="center">10%</td>
                              <td className="center">Σ(Skor × Bobot)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* IV. KEGIATAN PEMBELAJARAN (DISCOVERY LEARNING) */}
                    <div className="modern-card" style={{ borderLeftColor: 'var(--accent)' }}>
                      <div className="modern-card-header">
                        <span>IV. KEGIATAN PEMBELAJARAN (DISCOVERY LEARNING)</span>
                        <span className="pill-badge active">Kontekstual Topik</span>
                      </div>
                      <div className="modern-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {/* Langkah 1: Stimulation */}
                        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #0D47A1' }}>
                          <strong style={{ fontSize: '11px', color: '#0D47A1', display: 'block', marginBottom: '6px' }}>
                            Langkah 1: Stimulation (Pemberian Rangsangan)
                          </strong>
                          <p style={{ fontSize: '11px', lineHeight: '1.6', margin: '0 0 10px 0', textAlign: 'justify' }}>
                            {dLkpd.langkahKerja.stimulation.narasi}
                          </p>
                          <strong style={{ fontSize: '10.5px', color: '#334155' }}>Pertanyaan Pemantik:</strong>
                          <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px', fontSize: '11px' }}>
                            {dLkpd.langkahKerja.stimulation.pertanyaanPemantik.map((pem, pIdx) => (
                              <li key={pIdx} style={{ marginBottom: '4px' }}>{pem}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Langkah 2: Problem Statement */}
                        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #0284C7' }}>
                          <strong style={{ fontSize: '11px', color: '#0284C7', display: 'block', marginBottom: '6px' }}>
                            Langkah 2: Problem Statement (Identifikasi Masalah)
                          </strong>
                          <p style={{ fontSize: '11px', lineHeight: '1.6', margin: 0 }}>
                            {dLkpd.langkahKerja.problemStatement}
                          </p>
                        </div>

                        {/* Langkah 3: Data Collection */}
                        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #059669' }}>
                          <strong style={{ fontSize: '11px', color: '#059669', display: 'block', marginBottom: '6px' }}>
                            Langkah 3: Data Collection (Pengumpulan Data)
                          </strong>
                          <p style={{ fontSize: '11px', lineHeight: '1.6', margin: 0 }}>
                            {dLkpd.langkahKerja.dataCollection}
                          </p>
                        </div>

                        {/* Langkah 4: Data Processing */}
                        <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #D97706' }}>
                          <strong style={{ fontSize: '11px', color: '#D97706', display: 'block', marginBottom: '6px' }}>
                            Langkah 4: Data Processing (Pengolahan Data & Analisis Konsep)
                          </strong>
                          <p style={{ fontSize: '11px', margin: '0 0 10px 0' }}>
                            {dLkpd.langkahKerja.dataProcessing.instruksi}
                          </p>

                          <table className="data-table" style={{ fontSize: '10.5px', background: '#FFFFFF' }}>
                            <thead>
                              <tr>
                                <th style={{ width: '30%' }}>{dLkpd.langkahKerja.dataProcessing.headers[0]}</th>
                                <th style={{ width: '70%' }}>{dLkpd.langkahKerja.dataProcessing.headers[1]}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dLkpd.langkahKerja.dataProcessing.rows.map((row, rwIdx) => (
                                <tr key={rwIdx}>
                                  <td>
                                    <strong>{row.konsep}</strong>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '9.5px', color: '#64748B' }}>{row.pemicu}</p>
                                  </td>
                                  <td style={{ verticalAlign: 'top', minHeight: '60px' }}>
                                    <div style={{ color: '#CBD5E1', fontSize: '10px', fontStyle: 'italic' }}>
                                      Hasil analisis & bukti data kelompok...
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          <div style={{ marginTop: '12px' }}>
                            <strong style={{ fontSize: '10.5px', color: '#334155' }}>Kesimpulan Kelompok:</strong>
                            <div style={{ border: '1px dashed #CBD5E1', borderRadius: '6px', minHeight: '60px', background: '#FFFFFF', padding: '8px', marginTop: '4px', fontSize: '10px', color: '#94A3B8' }}>
                              {dLkpd.kesimpulanPlaceholder}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* V. PENILAIAN PENGETAHUAN (POST-TEST) */}
                    <div className="modern-card" style={{ borderLeftColor: '#7C3AED' }}>
                      <div className="modern-card-header">
                        <span>V. PENILAIAN PENGETAHUAN (POST-TEST HOTS)</span>
                        <span className="pill-badge active">5 Soal Esai</span>
                      </div>
                      <div className="modern-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ background: '#F3E8FF', border: '1px solid #D8B4FE', padding: '10px', borderRadius: '6px', fontSize: '10.5px', color: '#6B21A8' }}>
                          <strong>📱 Akses Post-Test Digital (Quizizz):</strong> Kerjakan kuis melalui tautan berikut atau pindai QR Code di kelas:
                          <a href={dLkpd.postTest.quizizzLink} target="_blank" rel="noreferrer" style={{ marginLeft: '6px', fontWeight: 'bold', color: '#7C3AED' }}>
                            {dLkpd.postTest.quizizzLink}
                          </a>
                        </div>

                        <strong style={{ fontSize: '11px', color: '#1E293B' }}>Kerjakan soal-soal HOTS di bawah ini secara mandiri dan jelas!</strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {dLkpd.postTest.soal.map((sObj, sIdx) => (
                            <div key={sIdx} style={{ border: '1px solid #E2E8F0', padding: '10px', borderRadius: '6px', background: '#FFFFFF' }}>
                              <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#1E293B' }}>
                                {sObj.no}. {sObj.soal}
                              </p>
                              <div style={{ marginTop: '8px', border: '1px dashed #CBD5E1', minHeight: '40px', background: '#FAFAFA', borderRadius: '4px', padding: '6px', fontSize: '9.5px', color: '#94A3B8' }}>
                                Lembar jawaban murid...
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div style={{ marginTop: '20px' }}>
                <SignatureBlock semOverride={sem} />
              </div>
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
                        <td>{m.tp?.[0] || <ArabicText text={m.judul} />}</td>
                        <td>Disajikan potongan Q.S. al-Maidah/5: 48, murid mampu mengidentifikasi hukum bacaan tajwid secara tepat.</td>
                        <td className="center">L2 (C3)</td>
                        <td className="center">Pilihan Ganda</td>
                        <td className="center">1, 2, 3</td>
                      </tr>
                      <tr>
                        <td className="center">{mIdx * 2 + 2}</td>
                        <td>{m.tp?.[1] || <ArabicText text={m.judul} />}</td>
                        <td>Murid dapat menganalisis implementasi riil akhlak terpuji dalam bergotong royong di sekolah.</td>
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
        const localActiveMateri = localMateriList.find(m => m.bab === Number(selectedPpmBab)) || localMateriList[0] || {};
        return (
          <div key="kartu-soal" className="a4-page">
            <h2 className="page-title">KARTU SOAL ASESMEN</h2>
            <div className="page-subtitle">Butir Pertanyaan Ujian & Kunci Jawaban Pembahasan</div>

            <div style={{ marginTop: '20px', fontSize: '11px' }}>
              <div className="prevent-break" style={{ border: '2px solid #333', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
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

              <div className="prevent-break" style={{ border: '2px solid #333', padding: '15px', borderRadius: '6px' }}>
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
    <div className="perangkat-wrapper" data-theme={theme} style={{ display: 'flex', width: '100%' }}>
      
      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} style={{ display: isFullscreen ? 'none' : 'block' }}>
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
        <header className="toolbar" style={{ padding: '10px 20px', gap: '10px', display: isFullscreen ? 'none' : 'flex' }}>
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
            {/* Theme Toggle (Modern / Klasik) */}
            <button
              onClick={toggleTheme}
              title={theme === 'modern' ? 'Beralih ke Tema Klasik Islami' : 'Beralih ke Tema Modern'}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 12px', borderRadius: '8px',
                border: theme === 'modern' ? '1px solid #E2E8F0' : '1px solid #C9A961',
                background: theme === 'modern' ? '#F8FAFC' : 'linear-gradient(135deg, #FBF7EE, #F5EFE0)',
                color: theme === 'modern' ? '#0D47A1' : '#8B6914',
                fontSize: '11px', fontWeight: '700', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {theme === 'modern' ? <Sparkles size={14} /> : <BookOpen size={14} />}
              <span className="md-hidden-text" style={{ display: 'inline' }}>
                {theme === 'modern' ? 'Modern' : 'Klasik'}
              </span>
            </button>
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
            <button
              onClick={toggleFullscreen}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 14px', borderRadius: '8px', border: 'none',
                background: '#E3F2FD', color: '#0D47A1',
                fontSize: '11px', fontWeight: '700', cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <Maximize size={14} />
              <span className="md-hidden-text" style={{ display: 'inline' }}>Presentasi</span>
            </button>
          </div>
        </header>

        {/* Document Render Area */}
        <div className="document-scroll-area">
          
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
            <div id="single-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <PageErrorBoundary resetKey={`${activeTab}-${viewMode}-${semester}-${selectedMapel}-${selectedClass}-${selectedPpmBab}`}>
                {renderPage(activeTab, 0) || (
                  <div className="a4-page" style={{ padding: '24px' }}>
                    <h2 className="page-title">Halaman Tidak Tersedia</h2>
                    <p style={{ marginTop: '12px', color: '#64748B' }}>
                      Tab <strong>{activeTab}</strong> tidak dapat ditampilkan. Pilih menu lain di sidebar.
                    </p>
                  </div>
                )}
              </PageErrorBoundary>
            </div>
          ) : (
            <div id="booklet-container" className="booklet-container" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Cover, Judul, Identitas, Daftar Isi */}
              {renderPage('cover', 'cover')}
              {renderPage('judul', 'judul')}
              {renderPage('identitas', 'identitas')}
              {renderPage('visi-misi', 'visi-misi')}
              {renderPage('daftar-isi', 'daftar-isi')}

              {/* Semester 1 (Ganjil) */}
              <div className="semester-divider no-print" style={{ textAlign: 'center', background: '#0D47A1', color: '#fff', padding: '10px', fontWeight: 'bold', borderRadius: '4px', margin: '20px 0' }}>
                BAGIAN 1: ADMINISTRASI SEMESTER GANJIL
              </div>
              {renderPage('pekan-efektif', 'pekan-efektif-ganjil', null, 'ganjil')}
              {renderPage('prota', 'prota')}
              {renderPage('promes', 'promes-ganjil', null, 'ganjil')}
              {renderPage('analisis-cp', 'analisis-cp-ganjil', null, 'ganjil')}
              {renderPage('cp-tp-pp', 'cp-tp-pp-ganjil', null, 'ganjil')}
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
              {renderPage('cp-tp-pp', 'cp-tp-pp-genap', null, 'genap')}
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
              Mempersiapkan dokumen A4 ({theme === 'modern' ? 'Plus Jakarta Sans — Modern' : 'Playfair Display — Klasik Islami'}). Anda sedang mencetak dalam mode <strong>{viewMode === 'single' ? 'Satu Halaman Terbuka' : 'Seluruh Dokumen (Booklet)'}</strong>.
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
                <li style={{ marginBottom: '4px' }}>
                  Atur Ukuran Kertas ke <strong>A4</strong>, margin <strong>Default</strong> atau minimal, dan hilangkan centang "Header & Footer".
                </li>
                <li>
                  Matikan opsi "Fit to page / Sesuaikan" jika ada, agar skala tetap 100% dan konten tidak terpotong.
                </li>
              </ul>
            </div>
            <p style={{ fontSize: '9px', color: '#94A3B8', marginTop: '12px', fontStyle: 'italic' }}>
              Dokumen yang dihasilkan adalah vector PDF asli (teks rapi, tajam, & bisa diseleksi/dicopy).
            </p>
          </div>
        </div>
      )}

      {/* Floating Exit Fullscreen Button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="no-print"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 20px', borderRadius: '30px',
            background: 'var(--primary-dark)', color: '#FFFFFF',
            border: 'none',
            fontSize: '13px', fontWeight: '700',
            cursor: 'pointer', transition: 'all 0.3s',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            zIndex: 9999
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Minimize size={16} />
          Keluar Presentasi
        </button>
      )}

    </div>
  );
}
