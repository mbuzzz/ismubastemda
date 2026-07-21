import React from 'react';
import { ArabicText } from '../utils/perangkatUtils';
import { getLkpdListPerPertemuan } from '../utils/lkpdPerPertemuan';

import {
  ClassicDivider, ClassicFrame, ClassicWatermark, BismillahHeader,
  ClassicPageTitle, ClassicSubtitle, ClassicSectionHead, ClassicPanel, ClassicSignature,
} from './classicOrnaments';

/* ============================================================
   CLASSIC ISLAMIC THEME RENDERER
   Setiap halaman memiliki layout manuskrip klasik yang
   sepenuhnya berbeda dengan tema modern.
   ============================================================ */

export const renderClassicPage = (
  tabName, index, specificBab, semesterOverride,
  /** @type {import('./PerangkatContext').RenderContext} */ ctx
) => {
  const sem = (semesterOverride === 'genap' || semesterOverride === 'ganjil')
    ? semesterOverride
    : ctx.safeSemester;
  const semData = ctx.activeFaseData.semester[sem] || ctx.activeFaseData.semester.ganjil;
  const localMateriList = semData?.materi || [];
  const babTarget = Number(specificBab ?? ctx.selectedPpmBab);
  const activeMateri = localMateriList.find(m => m.bab === babTarget) || localMateriList[0] || null;
  const S = ctx.schoolInfoData;

  // Kolom identitas baris (digunakan di identitas & modul)
  const idRow = (label, value, opts = {}) => (
    <tr style={{ borderBottom: '1px solid rgba(201,169,97,0.35)' }}>
      <td style={{ padding: '5px 10px', fontWeight: 700, fontFamily: "'Playfair Display', serif", fontSize: 11, width: '35%', ...opts.labelStyle }}>{label}</td>
      <td style={{ padding: '5px 4px', width: '3%', fontSize: 11 }}>:</td>
      <td style={{ padding: '5px 10px', fontFamily: "'Lora', serif", fontSize: 11, fontWeight: opts.accent ? 700 : 500 }}>{value}</td>
    </tr>
  );
  const idSub = (letter, value) => (
    <tr style={{ borderBottom: '1px solid rgba(201,169,97,0.15)' }}>
      <td style={{ padding: '3px 10px 3px 28px', fontSize: 10.5, fontFamily: "'Lora', serif", width: '35%' }}>{letter}.</td>
      <td style={{ padding: '3px 4px', width: '3%', fontSize: 10 }}>:</td>
      <td style={{ padding: '3px 10px', fontFamily: "'Lora', serif", fontSize: 11 }}>{value}</td>
    </tr>
  );

  switch (tabName) {

    /* ============================================================
       COVER — Manuskrip klasik dengan bingkai tiga lapis
    ============================================================ */
    case 'cover':
      return (
        <div key="cover-classic" className="a4-page a4-cover" style={{
          position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '16mm 12mm',
        }}>
          <ClassicWatermark opacity={0.07} />
          <ClassicFrame style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '28px 24px' }}>
            {/* TOP: Bismillah + Subtitle */}
            <div style={{ textAlign: 'center' }}>
              <BismillahHeader />
              <ClassicDivider width="45%" />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 13, color: '#000', letterSpacing: 2, textTransform: 'uppercase', marginTop: 6 }}>
                Administrasi & Perencanaan Ajar
              </p>
            </div>

            {/* CENTER: Title medallion */}
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 32, color: '#000', letterSpacing: 1.5, margin: '10px 0', textTransform: 'uppercase' }}>
                Buku Kerja Guru
              </h1>
              <ClassicDivider width="55%" />
              <div style={{ display: 'inline-block', border: '2px double #C9A961', borderRadius: 2, padding: '16px 32px', margin: '14px auto', background: 'rgba(201,169,97,0.06)' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 18, color: '#000', letterSpacing: 1.2, textTransform: 'uppercase', margin: 0 }}>
                  {S.mapel}
                </h2>
                <ClassicDivider width="100%" />
                <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 13, color: '#000', letterSpacing: 2, textTransform: 'uppercase', marginTop: 6 }}>
                  Fase {ctx.fase} — Kelas {ctx.selectedClass} · Semester {sem.toUpperCase()}
                </p>
              </div>
            </div>

            {/* BOTTOM: Logo + School + Identity */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', border: '3px double #C9A961', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF' }}>
                <img src="/logosmk.png" alt="Logo" style={{ width: 70, height: 70, objectFit: 'contain' }}
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/70/0D47A1/FBF7EE?text=SMK'; }} />
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 14, color: '#000', letterSpacing: 1, textAlign: 'center', textTransform: 'uppercase' }}>
                SMKS Muhammadiyah 2 Genteng
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 12, color: '#000' }}>
                Terakreditasi A — Pusat Keunggulan (PK)
              </p>
              {/* Mini identity table */}
              <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: 6, fontSize: 10.5 }}>
                <tbody>
                  {[
                    ['Nama Guru', S.namaGuru],
                    ['NBM / NIP', S.nbmGuru || '-'],
                    ['Instansi', S.name],
                    ['Tahun Pelajaran', S.tahunAjaran],
                  ].map(([l, v], i) => (
                    <tr key={i} style={{ borderBottom: '1px dotted rgba(201,169,97,0.5)' }}>
                      <td style={{ padding: '4px 8px', fontFamily: "'Playfair Display', serif", fontWeight: 600, color: '#000', width: '35%', letterSpacing: 0.5 }}>{l}</td>
                      <td style={{ padding: '4px 8px', fontFamily: "'Lora', serif", fontWeight: 700, color: '#000' }}>: {v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div style={{ textAlign: 'center', borderTop: '2px double #C9A961', paddingTop: 10, marginTop: 10 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 11, color: '#000', letterSpacing: 1, textTransform: 'uppercase' }}>
                Majelis Pendidikan Dasar Menengah dan Pendidikan Nonformal
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 11, color: '#000' }}>
                Pimpinan Daerah Muhammadiyah Banyuwangi — Jawa Timur
              </p>
            </div>
          </ClassicFrame>
        </div>
      );

    /* ============================================================
       JUDUL — Halaman judul manuskrip
    ============================================================ */
    case 'judul':
      return (
        <div key="judul-classic" className="a4-page" style={{ position: 'relative' }}>
          <ClassicWatermark opacity={0.05} />
          <ClassicFrame style={{ padding: '30px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '220mm' }}>
            <BismillahHeader />
            <ClassicDivider width="50%" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 18, color: '#000', letterSpacing: 3, marginTop: 16, textTransform: 'uppercase' }}>
              Halaman Judul
            </h2>
            <div style={{ width: 80, height: 2, background: '#C9A961', margin: '14px auto' }} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 24, color: '#000', textAlign: 'center', lineHeight: 1.3, margin: '14px 0', textTransform: 'uppercase', letterSpacing: 0.8 }}>
              Perangkat Pembelajaran Lengkap
            </h1>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 15, color: '#000', fontStyle: 'italic', marginBottom: 16 }}>
              {S.mapel}
            </p>
            <ClassicDivider width="40%" />
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12.5, color: '#000', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.7 }}>
              <p>Diajukan Sebagai Dokumen Pelaksanaan Kegiatan Pembelajaran</p>
              <p>Kurikulum Merdeka</p>
              <p>Tahun Pelajaran {S.tahunAjaran}</p>
            </div>
            <table style={{ width: '75%', borderCollapse: 'collapse', marginTop: 20 }}>
              <tbody>
                {[
                  ['Mata Pelajaran', S.mapel],
                  ['Fase / Kelas', `${ctx.fase} / ${ctx.selectedClass}`],
                  ['Semester', sem.toUpperCase()],
                  ['Guru Pengampu', S.namaGuru],
                  ['Instansi', 'SMKS Muhammadiyah 2 Genteng'],
                ].map(([l, v], i) => (
                  <tr key={i} style={{ borderBottom: '1px dotted rgba(201,169,97,0.5)' }}>
                    <td style={{ padding: '5px 10px', fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 11, color: '#000', width: '40%' }}>{l}</td>
                    <td style={{ padding: '5px 10px', fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 11.5, color: '#000' }}>: {v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ClassicDivider width="50%" />
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 11, color: '#000', letterSpacing: 1.5, marginTop: 14, textTransform: 'uppercase' }}>
              SMKS Muhammadiyah 2 Genteng
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 11, color: '#000' }}>
              Kabupaten Banyuwangi — Jawa Timur
            </p>
          </ClassicFrame>
        </div>
      );

    /* ============================================================
       IDENTITAS — 35 baris lengkap sesuai referensi docx
    ============================================================ */
    case 'identitas':
      const alamatSubs = [
        ['a', 'Jalan', 'Jl. Hasanudin'],
        ['b', 'Desa/Kelurahan', 'Genteng Wetan'],
        ['c', 'Kecamatan', 'Genteng'],
        ['d', 'Kabupaten/Kota', 'Banyuwangi'],
        ['e', 'Provinsi', 'Jawa Timur'],
        ['f', 'Kode Pos', '68465'],
        ['g', 'No. Telepon/HP', '0333 846292'],
        ['h', 'NPSN', '20525622'],
        ['i', 'Jenjang Pendidikan', 'SMK'],
        ['j', 'Status Sekolah', 'Swasta'],
        ['k', 'Nomor Telepon', '0333 846292'],
        ['l', 'Nomor Fax', '0333 846292'],
        ['m', 'Email', 'smkmudagenteng@gmail.com'],
        ['n', 'Website', 'www.smkmuh2genteng.sch.id'],
        ['p', 'SK Pendirian Sekolah', '0109/III.A/1.D/2000'],
        ['q', 'Tanggal SK Pendirian', '30 September 2002'],
        ['r', 'Status Kepemilikan', 'Yayasan'],
        ['s', 'SK Izin Operasional', 'P2T/1027/19.08/02/VIII/2019'],
        ['t', 'Tgl SK Izin Operasional', '01 Agustus 2019'],
        ['u', 'NPWP', '93.297.505.5-627.00'],
        ['v', 'Sumber Listrik', 'PLN & Diesel'],
        ['w', 'Daya Listrik', '175.000 VA'],
      ];
      return (
        <div key="identitas-classic" className="a4-page" style={{ position: 'relative' }}>
          <ClassicWatermark opacity={0.04} />
          <ClassicPageTitle>Identitas Satuan Pendidikan & Guru</ClassicPageTitle>
          <ClassicSubtitle>Profil Resmi Satuan Pendidikan dan Administrasi Pelaksana Kurikulum</ClassicSubtitle>

          <ClassicSectionHead>A. Profil Satuan Pendidikan</ClassicSectionHead>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10.5, border: '1px solid #C9A961' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(201,169,97,0.35)' }}>
                <td style={{ padding: '5px 8px', width: '8%', verticalAlign: 'top' }}>1.</td>
                <td style={{ padding: '5px 8px', width: '28%' }}>Nama Sekolah</td>
                <td style={{ padding: '5px 4px', width: '3%' }}>:</td>
                <td style={{ padding: '5px 8px', fontWeight: 700 }}>SMKS MUHAMMADIYAH 2 GENTENG</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(201,169,97,0.35)' }}>
                <td style={{ padding: '5px 8px', verticalAlign: 'top' }}>2.</td>
                <td style={{ padding: '5px 8px', verticalAlign: 'top' }}>Alamat</td>
                <td style={{ padding: '5px 4px', verticalAlign: 'top' }}>:</td>
                <td style={{ padding: '5px 8px' }}>
                  Jl. Hasanudin 103 Genteng
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, marginTop: 4 }}>
                    <tbody>
                      {alamatSubs.map(([ltr, label, val], i) => (
                        <tr key={i}>
                          <td style={{ padding: '2px 4px 2px 0', width: '24px', color: '#666' }}>{ltr}.</td>
                          <td style={{ padding: '2px 4px', width: '100px', color: '#666' }}>{label}</td>
                          <td style={{ padding: '2px 4px', width: '8px', color: '#666' }}>:</td>
                          <td style={{ padding: '2px 0' }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              {[
                ['3.', 'Mulai Operasional', '1976'],
                ['4.', 'Luas Tanah', '20.200'],
                ['5.', 'Status Tanah', 'Milik Yayasan'],
                ['6.', 'Status Bangunan', 'Milik Yayasan'],
                ['7.', 'Terakreditasi', 'A'],
                ['8.', 'Nama Kepala Sekolah', 'Tamyis Rosidi, S.Pd., M.Pd.'],
              ].map(([no, label, value]) => (
                <tr key={no} style={{ borderBottom: '1px solid rgba(201,169,97,0.35)' }}>
                  <td style={{ padding: '5px 8px' }}>{no}</td>
                  <td style={{ padding: '5px 8px' }}>{label}</td>
                  <td style={{ padding: '5px 4px' }}>:</td>
                  <td style={{ padding: '5px 8px', fontWeight: 700 }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ClassicSectionHead>B. Administrasi Pelaksana Kurikulum & Guru</ClassicSectionHead>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10.5, border: '1px solid #C9A961' }}>
            <tbody>
              {idRow('Mata Pelajaran', ctx.selectedMapel === 'arab' ? 'Bahasa Arab' : ctx.selectedMapel === 'kemuh' ? 'Kemuhammadiyahan' : 'PAI & Budi Pekerti')}
              {idRow('Fase / Kelas', `${ctx.fase} / ${ctx.selectedClass}`)}
              {idRow('Tahun Pelajaran', ctx.academicYear)}
              {idRow('Guru Pengampu', `${ctx.teacherName || '........................................'} (NBM. ${ctx.teacherNbm || '......................'})`)}
              {idRow('Waka Kurikulum', `${S.wakaKurikulum} (NBM. ${S.nbmWaka})`)}
              {idRow('Alokasi JP & Waktu', `${S.mingguEfektif} Minggu Efektif (${S.mingguEfektif * S.jpPerMinggu} JP/Sem) — ${S.jpPerMinggu} JP/Pekan`)}
            </tbody>
          </table>
        </div>
      );

    /* ============================================================
       DAFTAR ISI
    ============================================================ */
    case 'daftar-isi': {
      const gm = ctx.activeFaseData.semester.ganjil.materi;
      const gpm = ctx.activeFaseData.semester.genap.materi;
      const gbs = gm[0]?.bab || 1, gbe = gm[gm.length - 1]?.bab || 5;
      const gnbs = gpm[0]?.bab || 6, gnbe = gpm[gpm.length - 1]?.bab || 10;
      const entry = (text, page, isBold) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px dotted rgba(201,169,97,0.4)', fontFamily: "'Lora', serif", fontSize: 10.5, color: '#1A1A2E', fontWeight: isBold ? 700 : 400 }}>
          <span>{text}</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#000' }}>{page}</span>
        </div>
      );
      return (
        <div key="daftar-isi-classic" className="a4-page daftar-isi-page" style={{ position: 'relative' }}>
          <ClassicWatermark opacity={0.04} />
          <ClassicPageTitle>Daftar Isi Perangkat</ClassicPageTitle>
          <ClassicSubtitle>Sistematika Berkas Perangkat Pembelajaran Tahunan ({S.mapel})</ClassicSubtitle>
          <div style={{ marginTop: 14 }}>
            {entry('SAMPUL DEPAN BUKU', 'Halaman i', false)}
            {entry('HALAMAN JUDUL DOKUMEN', 'Halaman ii', false)}
            {entry('IDENTITAS SATUAN PENDIDIKAN & GURU', 'Halaman iii', false)}
            {entry('DAFTAR ISI PERANGKAT', 'Halaman iv', true)}

            <div style={{ margin: '12px 0 6px', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 11, color: '#000', borderBottom: '1.5px solid #C9A961', paddingBottom: 4, letterSpacing: 1, textTransform: 'uppercase' }}>
              <span style={{ color: '#C9A961', marginRight: 6 }}>I.</span> Administrasi Semester Ganjil
            </div>
            {entry('1. RINCIAN PEKAN EFEKTIF (RPE)', 'Seksi 1', false)}
            {entry('2. PROGRAM TAHUNAN (PROTA)', 'Seksi 2', false)}
            {entry('3. PROGRAM SEMESTER (PROMES)', 'Seksi 3', false)}
            {entry('4. ANALISA CAPAIAN PEMBELAJARAN (CP)', 'Seksi 4', false)}
            {entry('5. ALUR TUJUAN PEMBELAJARAN (ATP)', 'Seksi 5', false)}
            {entry('6. KRITERIA KETERCAPAIAN TP (KKTP)', 'Seksi 6', false)}
            {entry('7. MODUL AJAR / PPM (BAB ' + gbs + ' S.D ' + gbe + ')', 'Seksi 7', true)}
            {entry('8. KISI-KISI SOAL ASESMEN', 'Seksi 8', false)}
            {entry('9. KARTU SOAL & KUNCI JAWABAN', 'Seksi 9', false)}
            {entry('LAMPIRAN: QR CODE BAHAN AJAR', 'Seksi 7', false)}
            {entry('LAMPIRAN: LEMBAR KERJA PESERTA DIDIK (LKPD)', 'Seksi 7', false)}
            {entry('LAMPIRAN: RUBRIK PENILAIAN LKPD', 'Seksi 7', false)}

            <div style={{ margin: '12px 0 6px', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 11, color: '#000', borderBottom: '1.5px solid #C9A961', paddingBottom: 4, letterSpacing: 1, textTransform: 'uppercase' }}>
              <span style={{ color: '#C9A961', marginRight: 6 }}>II.</span> Administrasi Semester Genap
            </div>
            {entry('10. RINCIAN PEKAN EFEKTIF (RPE)', 'Seksi 10', false)}
            {entry('11. PROGRAM SEMESTER (PROMES)', 'Seksi 11', false)}
            {entry('12. ANALISA CAPAIAN PEMBELAJARAN (CP)', 'Seksi 12', false)}
            {entry('13. ALUR TUJUAN PEMBELAJARAN (ATP)', 'Seksi 13', false)}
            {entry('14. KRITERIA KETERCAPAIAN TP (KKTP)', 'Seksi 14', false)}
            {entry('15. MODUL AJAR / PPM (BAB ' + gnbs + ' S.D ' + gnbe + ')', 'Seksi 15', true)}
            {entry('16. KISI-KISI SOAL ASESMEN', 'Seksi 16', false)}
            {entry('17. KARTU SOAL & KUNCI JAWABAN', 'Seksi 17', false)}
            {entry('LAMPIRAN: QR CODE BAHAN AJAR', 'Seksi 15', false)}
            {entry('LAMPIRAN: LEMBAR KERJA PESERTA DIDIK (LKPD)', 'Seksi 15', false)}
            {entry('LAMPIRAN: RUBRIK PENILAIAN LKPD', 'Seksi 15', false)}
          </div>
        </div>
      );
    }

    /* ============================================================
       PEKAN EFEKTIF
    ============================================================ */
    case 'pekan-efektif': {
      const weeksForRpe = ctx.getWeeksArrayFor(sem, ctx.selectedClass);
      const mingguEfektifRpe = ctx.getMingguEfektifFor(sem, ctx.selectedClass);
      const isXiiPkl = ctx.selectedClass === 'XII' && sem === 'ganjil';
      const totalJpMateri = localMateriList.reduce((acc, m) => acc + (m.alokasi || 0), 0);
      const monthNamesGanjil = ['Juli 2026', 'Agustus 2026', 'September 2026', 'Oktober 2026', 'November 2026', 'Desember 2026'];
      const monthNamesGenap = ['Januari 2027', 'Februari 2027', 'Maret 2027', 'April 2027', 'Mei 2027', 'Juni 2027'];
      const monthNames = sem === 'ganjil' ? monthNamesGanjil : monthNamesGenap;
      const monthRows = monthNames.map((name, mi) => {
        const slice = weeksForRpe.slice(mi * 4, mi * 4 + 4);
        return { name, terjadi: slice.filter(w => w.status !== 'empty').length, efektif: slice.filter(w => w.status === 'efektif').length };
      });
      const sumEfektif = monthRows.reduce((a, r) => a + r.efektif, 0);

      return (
        <div key="pekan-efektif-classic" className="a4-page" style={{ position: 'relative' }}>
          <ClassicWatermark opacity={0.04} />
          <ClassicPageTitle>Rincian Pekan Efektif</ClassicPageTitle>
          <ClassicSubtitle>Analisa Distribusi Alokasi Pekan Efektif — Kelas {ctx.selectedClass} · Semester {sem.toUpperCase()}</ClassicSubtitle>
          <ClassicPanel style={{ fontSize: 10.5, lineHeight: 1.6 }}>
            <p><strong>Minggu Efektif KBM:</strong> {mingguEfektifRpe} Pekan ({mingguEfektifRpe * S.jpPerMinggu} JP/Semester)</p>
            {ctx.selectedClass === 'X' && sem === 'ganjil' && <p>Kelas X: MPLS Juli minggu ke-3, KBM mulai minggu ke-4.</p>}
            {ctx.selectedClass === 'XI' && sem === 'ganjil' && <p>Kelas XI: Tanpa MPLS, KBM mulai Juli minggu ke-2.</p>}
            {isXiiPkl && <p>Kelas XII Semester Ganjil: PKL (Praktik Kerja Lapangan).</p>}
          </ClassicPanel>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, border: '1px solid #C9A961', marginTop: 12 }}>
            <thead>
              <tr style={{ background: '#C9A961', color: '#1A1A2E', fontFamily: "'Playfair Display', serif", fontSize: 10.5 }}>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961' }}>Bulan</th>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961' }}>Terjadi</th>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961' }}>Efektif</th>
              </tr>
            </thead>
            <tbody>
              {monthRows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(201,169,97,0.3)' }}>
                  <td style={{ padding: '5px 8px', fontFamily: "'Playfair Display', serif", fontWeight: 600, color: '#000' }}>{r.name}</td>
                  <td style={{ padding: '5px 8px', textAlign: 'center', fontFamily: "'Lora', serif" }}>{r.terjadi}</td>
                  <td style={{ padding: '5px 8px', textAlign: 'center', fontFamily: "'Lora', serif", fontWeight: 700, color: '#000' }}>{r.efektif}</td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(201,169,97,0.12)', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                <td style={{ padding: '6px 8px', borderTop: '2px solid #C9A961', color: '#000' }}>TOTAL</td>
                <td style={{ padding: '6px 8px', textAlign: 'center', borderTop: '2px solid #C9A961' }}>{monthRows.reduce((a, r) => a + r.terjadi, 0)}</td>
                <td style={{ padding: '6px 8px', textAlign: 'center', borderTop: '2px solid #C9A961', color: '#000' }}>{sumEfektif}</td>
              </tr>
            </tbody>
          </table>
          <ClassicSignature schoolInfoData={S} sem={sem} />
        </div>
      );
    }

    /* ============================================================
       PROTA — landscape, rapi, muat 1 halaman
    ============================================================ */
    case 'prota': {
      const showAll = ctx.viewMode === 'booklet';
      const wProta = ctx.getWeeksArrayFor(sem, ctx.selectedClass);
      const bln = showAll
        ? ['Jul','Agu','Sep','Okt','Nov','Des','Jan','Feb','Mar','Apr','Mei','Jun']
        : sem === 'ganjil'
          ? ['Jul','Agu','Sep','Okt','Nov','Des']
          : ['Jan','Feb','Mar','Apr','Mei','Jun'];
      const colMonthWidth = Math.floor(52 / bln.length);
      const totalJpProta = localMateriList.reduce((a,m) => a + (m.alokasi || 0), 0);
      const baris = (sd, genap, rk) => {
        if (ctx.selectedClass === 'XII' && !genap) return [];
        const wa = genap ? ctx.genapWeeksList : ctx.ganjilWeeksList;
        return ctx.getTeachingSchedule(sd.materi, wa).map((sm, i) => {
          const jp = Array(6).fill(0);
          sm.schedule.forEach(w => { const m = Math.floor(w/4); if (m>=0&&m<6) jp[m] += S.jpPerMinggu; });
          return (
            <tr key={`${rk}-${i}`}>
              {i===0 && showAll &&
                <td rowSpan={sd.materi.length} style={{textAlign:'center', fontWeight:700, verticalAlign:'middle', background:'rgba(201,169,97,0.08)', padding:'6px 4px', fontSize:9}}>
                  {genap ? 'Genap' : 'Ganjil'}
                </td>}
              <td style={{textAlign:'center', fontWeight:700, padding:'5px 4px', fontSize:10}}>{sm.bab}</td>
              <td style={{padding:'5px 6px', fontSize:9, lineHeight:1.4}}>{sm.tp?.join('; ')}</td>
              <td style={{textAlign:'center', fontWeight:700, padding:'5px 4px', fontSize:9}}>{sm.alokasi}</td>
              {bln.map((_,mc)=>{
                let v = 0;
                if (showAll) {
                  if (genap && mc >= 6) v = jp[mc - 6];
                  else if (!genap && mc < 6) v = jp[mc];
                } else {
                  v = jp[mc];
                }
                return (
                  <td key={mc} style={{textAlign:'center', padding:'5px 2px', fontSize:9,
                    background: v > 0 ? 'rgba(201,169,97,0.12)' : '',
                    fontWeight: v > 0 ? 700 : 400}}>
                    {v > 0 ? v : ''}
                  </td>
                );
              })}
            </tr>
          );
        });
      };
      return (
        <div key="prota-classic" className="a4-page landscape-mode" style={{padding:'8mm 10mm',position:'relative'}}>
          <ClassicWatermark opacity={0.04} />
          <ClassicPageTitle>Program Tahunan (Prota)</ClassicPageTitle>
          <ClassicSubtitle>Distribusi JP Bulanan — {S.mapel} · Kelas {ctx.selectedClass} · Fase {ctx.fase}</ClassicSubtitle>
          <table style={{width:'100%', tableLayout:'fixed', borderCollapse:'collapse', fontSize:9, border:'1px solid #C9A961', marginTop:2}}>
            <thead>
              <tr style={{background:'#C9A961', fontWeight:700, fontSize:9}}>
                {showAll && <th style={{padding:'5px 4px', border:'1px solid #C9A961', width:'8%'}}>Sem</th>}
                <th style={{padding:'5px 4px', border:'1px solid #C9A961', width:'6%'}}>Bab</th>
                <th style={{padding:'5px 6px', border:'1px solid #C9A961', width:'28%'}}>Tujuan Pembelajaran</th>
                <th style={{padding:'5px 4px', border:'1px solid #C9A961', width:'6%'}}>JP</th>
                {bln.map((m,i)=>
                  <th key={i} style={{padding:'5px 1px', border:'1px solid #C9A961', fontSize:8.5, width: colMonthWidth + '%'}}>{m}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {(showAll
                ? [{d:ctx.activeFaseData.semester.ganjil,g:false,k:'g'},{d:ctx.activeFaseData.semester.genap,g:true,k:'gn'}]
                : [{d:ctx.activeFaseData.semester[sem],g:sem==='genap',k:sem}]
              ).flatMap(b => baris(b.d, b.g, b.k))}
              <tr style={{background:'rgba(201,169,97,0.12)', fontWeight:700, borderTop:'2px solid #C9A961'}}>
                <td colSpan={showAll ? 3 : 2} style={{textAlign:'right', padding:'6px 8px', fontSize:9}}>TOTAL</td>
                <td style={{textAlign:'center', padding:'6px 4px', fontSize:9}}>{totalJpProta}</td>
                {bln.map((_,mc)=>{
                  let cs = 0;
                  if (showAll) {
                    if (mc < 6 && ctx.selectedClass !== 'XII') {
                      const sl = ctx.getTeachingSchedule(ctx.activeFaseData.semester.ganjil.materi, ctx.ganjilWeeksList);
                      sl.forEach(s => {
                        const a = Array(6).fill(0);
                        s.schedule.forEach(w => { const m = Math.floor(w/4); if (m>=0&&m<6) a[m] += S.jpPerMinggu; });
                        cs += a[mc];
                      });
                    } else if (mc >= 6) {
                      const sl = ctx.getTeachingSchedule(ctx.activeFaseData.semester.genap.materi, ctx.genapWeeksList);
                      sl.forEach(s => {
                        const a = Array(6).fill(0);
                        s.schedule.forEach(w => { const m = Math.floor(w/4); if (m>=0&&m<6) a[m] += S.jpPerMinggu; });
                        cs += a[mc-6];
                      });
                    }
                  } else {
                    const sl = ctx.getTeachingSchedule(localMateriList, wProta);
                    sl.forEach(s => {
                      const a = Array(6).fill(0);
                      s.schedule.forEach(w => { const m = Math.floor(w/4); if (m>=0&&m<6) a[m] += S.jpPerMinggu; });
                      cs += a[mc];
                    });
                  }
                  return <td key={mc} style={{textAlign:'center', padding:'6px 2px', fontSize:9, fontWeight:700}}>{cs > 0 ? cs : ''}</td>;
                })}
              </tr>
            </tbody>
          </table>
          <div style={{fontSize:8, textAlign:'right', marginTop:2, color:'#666'}}>
            Total: {totalJpProta} JP · {localMateriList.reduce((a,m)=>a+(m.minggu||0),0)} TM
          </div>
          <ClassicSignature schoolInfoData={S} sem={sem} />
        </div>
      );
    }

    /* ============================================================
       PROMES — landscape,rapi
    ============================================================ */
    case 'promes': {
      const wa = ctx.getWeeksArrayFor(sem, ctx.selectedClass);
      const sm = ctx.getTeachingSchedule(localMateriList, wa);
      const pkl = ctx.selectedClass === 'XII' && sem === 'ganjil';
      const bln = sem === 'ganjil'
        ? ['Jul','Agu','Sep','Okt','Nov','Des']
        : ['Jan','Feb','Mar','Apr','Mei','Jun'];
      return (
        <div key="promes-classic" className="a4-page landscape-mode" style={{padding:'8mm 10mm',position:'relative'}}>
          <ClassicWatermark opacity={0.04} />
          <ClassicPageTitle>Program Semester (Promes)</ClassicPageTitle>
          <ClassicSubtitle>Distribusi KBM Pekanan — {S.mapel} · Kelas {ctx.selectedClass} · Semester {sem.toUpperCase()}</ClassicSubtitle>
          <table style={{width:'100%',tableLayout:'fixed',borderCollapse:'collapse',fontSize:8.5,border:'1px solid #C9A961',marginTop:2}}>
            <thead>
              <tr style={{background:'#C9A961',fontWeight:700,fontSize:8.5}}>
                <th rowSpan={2} style={{padding:'5px 4px',border:'1px solid #C9A961',width:'5%'}}>Bab</th>
                <th rowSpan={2} style={{padding:'5px 6px',border:'1px solid #C9A961',width:'30%'}}>Tujuan Pembelajaran</th>
                <th rowSpan={2} style={{padding:'5px 4px',border:'1px solid #C9A961',width:'5%'}}>JP</th>
                {bln.map(m=><th key={m} colSpan={4} style={{padding:'4px 2px',border:'1px solid #C9A961',fontSize:8}}>{m}</th>)}
              </tr>
              <tr style={{background:'#C9A961',fontWeight:700,fontSize:7.5}}>
                {Array.from({length:24}).map((_,i)=><th key={i} style={{padding:'2px 0',border:'1px solid #C9A961'}}>{i%4+1}</th>)}
              </tr>
            </thead>
            <tbody>
              {pkl ? (
                <tr><td colSpan={3} style={{textAlign:'center',fontWeight:700,padding:'6px',fontSize:9}}>PKL</td>{wa.map((w,i)=><td key={i} style={{textAlign:'center',fontSize:7,padding:'3px 0',background:w.status==='pkl'?'rgba(201,169,97,0.15)':''}}>{w.status==='pkl'?'PKL':w.label==='BEKAL'?'B':''}</td>)}</tr>
              ) : sm.map((s,i)=>(
                <tr key={i}>
                  <td style={{textAlign:'center',fontWeight:700,padding:'4px 4px',fontSize:9.5}}>{s.bab}</td>
                  <td style={{padding:'4px 6px',fontSize:8.5,lineHeight:1.35}}>{s.tp?.join('; ')}</td>
                  <td style={{textAlign:'center',fontWeight:700,padding:'4px 4px',fontSize:9}}>{s.alokasi}</td>
                  {wa.map((w,j)=>{
                    const ada = s.schedule.includes(j);
                    let txt='',bg='';
                    if(ada){txt=S.jpPerMinggu;bg='rgba(201,169,97,0.14)';}
                    else if(w.status==='non-efektif'){txt=w.label;bg='rgba(201,169,97,0.05)';}
                    else if(w.status==='empty'&&w.label){txt=w.label;bg='rgba(255,224,130,0.2)';}
                    return <td key={j} style={{textAlign:'center',fontSize:7.5,padding:'4px 0',fontWeight:ada?700:400,background:bg}}>{txt}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <ClassicSignature schoolInfoData={S} sem={sem} />
        </div>
      );
    }

    /* ============================================================
       ANALISIS CP
    ============================================================ */
    case 'analisis-cp':
      return (
        <div key="analisis-cp-classic" className="a4-page" style={{ position: 'relative' }}>
          <ClassicWatermark opacity={0.04} />
          <ClassicPageTitle>Analisa Capaian Pembelajaran</ClassicPageTitle>
          <ClassicSubtitle>Uraian Kompetensi dan Lingkup Materi Capaian Pembelajaran</ClassicSubtitle>
          {localMateriList.map((m, mIdx) => (
            <div key={mIdx} style={{ border: '1.5px solid #C9A961', padding: 0, marginBottom: 14, background: 'rgba(255,252,244,0.7)' }}>
              <div style={{ background: '#C9A961', color: '#1A1A2E', padding: '6px 12px', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 11.5, letterSpacing: 0.8, borderBottom: '2px double #C9A961' }}>
                ELEMEN: {(m.elemen || '-').toUpperCase()} (BAB {m.bab})
              </div>
              <div style={{ padding: 10 }}>
                <div style={{ background: 'rgba(201,169,97,0.08)', borderLeft: '4px double #C9A961', padding: '8px 12px', marginBottom: 8, fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 11, lineHeight: 1.5 }}>
                  <strong style={{ fontStyle: 'normal' }}>Teks CP:</strong> "{m.capaian}"
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10.5, border: '1px solid rgba(201,169,97,0.4)' }}>
                  <tbody>
                    <tr><td style={{ padding: '6px 8px', fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#000', width: '25%', borderRight: '1px solid rgba(201,169,97,0.4)', background: 'rgba(201,169,97,0.06)' }}>Kompetensi Utama</td><td style={{ padding: '6px 8px', fontFamily: "'Lora', serif" }}>Menganalisis, Memahami, Mempresentasikan, Menyajikan, Membiasakan, Berperilaku terpuji.</td></tr>
                    <tr><td style={{ padding: '6px 8px', fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#000', borderRight: '1px solid rgba(201,169,97,0.4)', background: 'rgba(201,169,97,0.06)' }}>Lingkup Materi Esensial</td><td style={{ padding: '6px 8px', fontFamily: "'Amiri', serif", fontSize: 14 }}><ArabicText text={m.judul} /></td></tr>
                    <tr><td style={{ padding: '6px 8px', fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#000', borderRight: '1px solid rgba(201,169,97,0.4)', background: 'rgba(201,169,97,0.06)', verticalAlign: 'top' }}>Tujuan Pembelajaran</td><td style={{ padding: '6px 8px', fontFamily: "'Lora', serif" }}><ul style={{ margin: 0, paddingLeft: 16 }}>{(m.tp || []).map((t, ti) => <li key={ti} style={{ marginBottom: 3 }}>{t}</li>)}</ul></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <ClassicSignature schoolInfoData={S} sem={sem} />
        </div>
      );

    /* ============================================================
       CP-TP-PP
    ============================================================ */
    case 'cp-tp-pp': {
      const isPaiXi = ctx.selectedMapel === 'pai' && ctx.selectedClass === 'XI';
      const sourceSemKey = isPaiXi ? 'genap' : sem;
      const sourceSem = ctx.activeFaseData.semester[sourceSemKey] || semData;
      const sourceMateri = sourceSem.materi || [];
      const totalJpCP = sourceMateri.reduce((a, m) => a + (m.alokasi || 0), 0);
      const totalTm = sourceMateri.reduce((a, m) => a + (m.minggu || 0), 0);
      return (
        <div key="cp-tp-pp-classic" className="a4-page" style={{ padding: '12mm 12mm', position: 'relative' }}>
          <ClassicWatermark opacity={0.04} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
            <div>
              <ClassicPageTitle>Analisis CP & TP</ClassicPageTitle>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 12, color: '#000', marginTop: 4 }}>{S.mapel} · Kelas {ctx.selectedClass} · Semester {(sourceSem.nama || sourceSemKey).toUpperCase()}</p>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 10, background: '#C9A961', color: '#1A1A2E', padding: '4px 10px', border: '1px solid #8B6914', letterSpacing: 0.5 }}>VERSI PP</span>
          </div>
          <ClassicDivider width="50%" />
          <p style={{ fontFamily: "'Lora', serif", fontSize: 11, lineHeight: 1.55, margin: '8px 0 12px', textAlign: 'justify', color: '#1A1A2E' }}>
            Dokumen ini berisi pemetaan <strong>Capaian Pembelajaran (CP)</strong> dan <strong>Tujuan Pembelajaran (TP)</strong> untuk {S.mapel}. Durasi acuan: <strong>{totalTm} Pertemuan × {S.jpPerMinggu} JP = {totalJpCP} JP</strong>.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 9.5, border: '1px solid #C9A961' }}>
              <thead>
                <tr style={{ background: '#C9A961', color: '#1A1A2E', fontFamily: "'Playfair Display', serif" }}>
                  <th style={{ padding: '5px 6px', border: '1px solid #C9A961', width: '7%' }}>Bab</th>
                  <th style={{ padding: '5px 6px', border: '1px solid #C9A961', width: '22%' }}>Topik / Judul</th>
                  <th style={{ padding: '5px 6px', border: '1px solid #C9A961', width: '14%' }}>Elemen</th>
                  <th style={{ padding: '5px 6px', border: '1px solid #C9A961', width: '42%' }}>Tujuan Pembelajaran</th>
                  <th style={{ padding: '5px 6px', border: '1px solid #C9A961', width: '15%' }}>Alokasi</th>
                </tr>
              </thead>
              <tbody>
                {sourceMateri.map(m => (
                  <tr key={m.bab} style={{ borderBottom: '1px solid rgba(201,169,97,0.3)' }}>
                    <td style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 12, color: '#000' }}>{m.bab}</td>
                    <td style={{ fontFamily: "'Amiri', serif", fontSize: 13, fontWeight: 700 }}><ArabicText text={m.judul} /></td>
                    <td style={{ textAlign: 'center', fontSize: 9 }}>{m.elemen}</td>
                    <td style={{ lineHeight: 1.45 }}><ol style={{ margin: 0, paddingLeft: 14 }}>{(m.tp || []).map((t, i) => <li key={i} style={{ marginBottom: 3 }}>{t}</li>)}</ol></td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{m.minggu} TM<br />({m.alokasi} JP)</td>
                  </tr>
                ))}
                <tr style={{ background: 'rgba(201,169,97,0.12)', fontWeight: 800, borderTop: '2px solid #C9A961' }}>
                  <td colSpan={4} style={{ textAlign: 'right', paddingRight: 12, fontFamily: "'Playfair Display', serif", color: '#000' }}>TOTAL ALOKASI</td>
                  <td style={{ textAlign: 'center' }}>{totalTm} TM ({totalJpCP} JP)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ClassicSignature schoolInfoData={S} sem={sourceSemKey} />
        </div>
      );
    }

    /* ============================================================
       ATP
    ============================================================ */
    case 'atp':
      return (
        <div key="atp-classic" className="a4-page" style={{ padding: '15mm 15mm', position: 'relative' }}>
          <ClassicWatermark opacity={0.04} />
          <ClassicPageTitle>Alur Tujuan Pembelajaran (ATP)</ClassicPageTitle>
          <ClassicSubtitle>Sistematika Uraian Langkah Tujuan Pembelajaran — Fase {ctx.fase}</ClassicSubtitle>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 9.5, border: '1px solid #C9A961', marginTop: 12 }}>
            <thead>
              <tr style={{ background: '#C9A961', color: '#1A1A2E', fontFamily: "'Playfair Display', serif" }}>
                <th style={{ padding: '6px', border: '1px solid #C9A961', width: '15%' }}>Elemen</th>
                <th style={{ padding: '6px', border: '1px solid #C9A961', width: '35%' }}>Tujuan Pembelajaran</th>
                <th style={{ padding: '6px', border: '1px solid #C9A961', width: '10%' }}>JP</th>
                <th style={{ padding: '6px', border: '1px solid #C9A961', width: '20%' }}>Asesmen</th>
                <th style={{ padding: '6px', border: '1px solid #C9A961', width: '20%' }}>Glosarium</th>
              </tr>
            </thead>
            <tbody>
              {localMateriList.map((m, mIdx) => (
                <React.Fragment key={mIdx}>
                  {(m.tp || []).map((t, tIdx) => (
                    <tr key={tIdx} style={{ borderBottom: '1px solid rgba(201,169,97,0.2)' }}>
                      {tIdx === 0 && <td rowSpan={m.tp.length} style={{ fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#000', background: 'rgba(201,169,97,0.06)', padding: '6px 8px' }}>{m.elemen}<br />(Bab {m.bab})</td>}
                      <td style={{ padding: '5px 8px' }}>{t}</td>
                      <td style={{ textAlign: 'center', padding: '5px 8px' }}>{tIdx === 0 ? m.alokasi : ''} JP</td>
                      <td style={{ padding: '5px 8px', fontSize: 9 }}>Formatif: Tes Tulis, Penilaian Diri, LKPD</td>
                      <td style={{ padding: '5px 8px', fontSize: 9 }}>{tIdx === 0 ? 'Tartil, Tajwid, Etos Kerja' : 'Syu\'ab al-iman'}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <ClassicSignature schoolInfoData={S} sem={sem} />
        </div>
      );

    /* ============================================================
       KKTP
    ============================================================ */
    case 'kktp':
      return (
        <div key="kktp-classic" className="a4-page" style={{ position: 'relative' }}>
          <ClassicWatermark opacity={0.04} />
          <ClassicPageTitle>Kriteria Ketercapaian Tujuan Pembelajaran</ClassicPageTitle>
          <ClassicSubtitle>KKTP dengan Metode Interval Nilai Kriteria Kelulusan</ClassicSubtitle>
          <ClassicPanel style={{ fontSize: 10.5, lineHeight: 1.6 }}>
            Interval Kriteria digunakan untuk menentukan tingkat ketuntasan murid dalam memahami materi esensial Pendidikan Agama Islam & Budi Pekerti.
          </ClassicPanel>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, border: '1px solid #C9A961', marginTop: 10 }}>
            <thead>
              <tr style={{ background: '#C9A961', color: '#1A1A2E', fontFamily: "'Playfair Display', serif" }}>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961' }}>Interval Nilai</th>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961' }}>Kriteria</th>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961' }}>Tindak Lanjut</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['0% - 40%', 'Belum Mencapai Ketuntasan', 'Remedial seluruh bagian dengan bimbingan khusus / peer tutoring.'],
                ['41% - 74%', 'Belum Mencapai Ketuntasan', 'Remedial pada indikator TP yang belum dikuasai.'],
                ['75% - 88%', 'Sudah Mencapai Ketuntasan', 'KBM tuntas, melanjutkan ke materi berikutnya.'],
                ['89% - 100%', 'Sangat Tuntas (Istimewa)', 'Pengayaan, tugas mandiri, tutor sebaya.'],
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(201,169,97,0.3)', background: i === 0 ? 'rgba(255,205,210,0.2)' : i === 3 ? 'rgba(200,230,201,0.2)' : 'transparent' }}>
                  <td style={{ textAlign: 'center', padding: '6px 8px', fontWeight: 700 }}>{r[0]}</td>
                  <td style={{ padding: '6px 8px' }}>{r[1]}</td>
                  <td style={{ padding: '6px 8px', fontSize: 9.5 }}>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ClassicSectionHead>Penerapan pada Bab Aktif</ClassicSectionHead>
          <ClassicPanel title={`Bab ${activeMateri?.bab || '-'}: ${activeMateri?.judul || '-'}`}>
            <ul style={{ margin: '6px 0 0 16px', padding: 0, fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6 }}>
              {(activeMateri?.tp || []).map((tp, tpIdx) => (
                <li key={tpIdx} style={{ marginBottom: 4 }}><strong>TP {tpIdx + 1}:</strong> {tp}</li>
              ))}
            </ul>
          </ClassicPanel>
          <ClassicSignature schoolInfoData={S} sem={sem} />
        </div>
      );

    /* ============================================================
       MODUL AJAR (PPM) — dengan LKPD per pertemuan
    ============================================================ */
    case 'modul': {
      if (!activeMateri || !activeMateri.bab) {
        return (
          <div key="modul-empty-classic" className="a4-page" style={{ padding: '20mm' }}>
            <ClassicPageTitle>Modul Ajar (PPM)</ClassicPageTitle>
            <ClassicSubtitle>Materi belum tersedia untuk semester ini.</ClassicSubtitle>
          </div>
        );
      }
      const materiTp = Array.isArray(activeMateri.tp) ? activeMateri.tp : [];
      const totalPertemuan = Math.max(1, Number(activeMateri.minggu) || 1);
      const ppmDetails = ctx.getPpmDetails(ctx.fase, activeMateri.bab, ctx.selectedMapel, ctx.selectedClass, activeMateri);
      const lkpdList = getLkpdListPerPertemuan(ctx.fase, activeMateri.bab, ctx.selectedMapel, ctx.selectedClass, activeMateri);
      const dpl = ctx.getDplForBab(ctx.fase, activeMateri.bab, ctx.selectedMapel) || [];

      const renderLkpdSection = (lkpdItem) => {
        if (!lkpdItem) return null;
        const { lkpd } = lkpdItem;
        return (
          <div style={{ border: '2px double #C9A961', marginTop: 14, padding: 0, background: 'rgba(255,252,244,0.8)' }}>
            <div style={{ background: '#C9A961', color: '#1A1A2E', padding: '8px 12px', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.8, textAlign: 'center', borderBottom: '2px double #C9A961' }}>
              {lkpd.judulLkpd}
            </div>
            <div style={{ padding: '12px' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 12, color: '#000', textAlign: 'center', marginBottom: 10 }}>{lkpd.subJudul}</p>
              {/* Identitas LKPD */}
              <div style={{ border: '1px solid rgba(201,169,97,0.4)', padding: 10, marginBottom: 10, background: 'rgba(255,255,255,0.5)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10.5 }}>
                  <tbody>
                    <tr><td style={{ padding: '3px 8px', fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#000', width: '30%' }}>Mata Pelajaran</td><td style={{ padding: '3px 8px' }}>: {lkpd.identitas.mapel}</td></tr>
                    <tr><td style={{ padding: '3px 8px', fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#000' }}>Fase / Kelas</td><td>: {lkpd.identitas.faseKelas}</td></tr>
                    <tr><td style={{ padding: '3px 8px', fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#000' }}>Materi Pokok</td><td style={{ fontFamily: "'Amiri', serif", fontSize: 14 }}>: <ArabicText text={lkpd.identitas.materi} /></td></tr>
                    <tr><td style={{ padding: '3px 8px', fontWeight: 700, fontFamily: "'Playfair Display', serif", color: '#000' }}>Tahap Discovery</td><td>: {lkpd.identitas.fokusTahap}</td></tr>
                  </tbody>
                </table>
              </div>
              {/* Tujuan */}
              <div style={{ marginBottom: 8 }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 11.5, color: '#000', borderBottom: '1px solid #C9A961', paddingBottom: 4, marginBottom: 6 }}>Tujuan Pembelajaran</h4>
                <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6 }}>
                  {lkpd.tujuan.map((t, ti) => <li key={ti} style={{ marginBottom: 2 }}>{t}</li>)}
                </ul>
              </div>
              {/* Petunjuk */}
              <div style={{ marginBottom: 8 }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 11.5, color: '#000', borderBottom: '1px solid #C9A961', paddingBottom: 4, marginBottom: 6 }}>Petunjuk Kerja</h4>
                <ol style={{ margin: 0, paddingLeft: 16, fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6 }}>
                  {lkpd.petunjuk.map((p, pi) => <li key={pi} style={{ marginBottom: 2 }}>{p}</li>)}
                </ol>
              </div>
              {/* Stimulation */}
              <ClassicPanel title="Langkah 1: Stimulation">
                <p style={{ fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6, marginBottom: 6, textAlign: 'justify' }}>{lkpd.langkahKerja.stimulation.narasi}</p>
                <strong style={{ fontFamily: "'Playfair Display', serif", fontSize: 10.5, color: '#000' }}>Pertanyaan Pemantik:</strong>
                <ul style={{ margin: '4px 0 0 16px', fontFamily: "'Lora', serif", fontSize: 10.5 }}>
                  {lkpd.langkahKerja.stimulation.pertanyaanPemantik.map((q, qi) => <li key={qi} style={{ marginBottom: 2 }}>{q}</li>)}
                </ul>
              </ClassicPanel>
              {/* Problem Statement */}
              <ClassicPanel title="Langkah 2: Problem Statement" style={{ borderLeftColor: '#0284C7' }}>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6 }}>{lkpd.langkahKerja.problemStatement}</p>
              </ClassicPanel>
              {/* Data Collection */}
              <ClassicPanel title="Langkah 3: Data Collection" style={{ borderLeftColor: '#059669' }}>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6 }}>{lkpd.langkahKerja.dataCollection}</p>
              </ClassicPanel>
              {/* Post-Test */}
              <ClassicPanel title="Penilaian Pengetahuan (Post-Test)" style={{ borderLeftColor: '#7C3AED' }}>
                {Array.isArray(lkpd.postTest?.soal) && lkpd.postTest.soal.map((sObj, sIdx) => (
                  <div key={sIdx} style={{ border: '1px solid rgba(201,169,97,0.3)', padding: 8, marginBottom: 6, background: 'rgba(255,255,255,0.5)' }}>
                    <p style={{ margin: 0, fontFamily: "'Lora', serif", fontSize: 10.5, fontWeight: 600 }}>{sObj.no}. {sObj.soal}</p>
                    <div style={{ minHeight: 32, border: '1px dashed rgba(201,169,97,0.3)', borderRadius: 2, marginTop: 4, padding: 4, fontSize: 9.5, color: '#94A3B8' }}>Lembar jawaban murid...</div>
                  </div>
                ))}
              </ClassicPanel>

            </div>
          </div>
        );
      };

      return (
        <React.Fragment key={`modul-classic-${activeMateri.bab}`}>
          {/* Halaman 1–N: Modul Ajar utama */}
          <div className="a4-page" style={{ padding: '15mm 15mm', position: 'relative' }}>
            <ClassicWatermark opacity={0.04} />
            <ClassicPageTitle>Modul Ajar (PPM)</ClassicPageTitle>
            <ClassicSubtitle>Perencanaan Pembelajaran Mendalam ({S.mapel})</ClassicSubtitle>

            {/* I. Identitas Modul */}
            <ClassicSectionHead roman="I">Identitas Modul Ajar</ClassicSectionHead>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10.5, border: '1px solid #C9A961' }}>
              <tbody>
                {idRow('Nama Penyusun', S.namaGuru)}
                {idRow('Satuan Pendidikan', S.name)}
                {idRow('Kelas / Fase', `${ctx.selectedClass} / ${ctx.fase}`)}
                {idRow('Prediksi Waktu', `${activeMateri.alokasi} JP (${activeMateri.minggu} Pekan)`)}
                {idRow('Materi', '', { accent: true }).props.children}
                <tr><td colSpan={2} /><td style={{ fontFamily: "'Amiri', serif", fontSize: 16, color: '#000', padding: '5px 10px' }}><ArabicText text={activeMateri.judul} /></td></tr>
              </tbody>
            </table>

            {/* II. CP, TP, DPL */}
            <ClassicSectionHead roman="II">Capaian Pembelajaran & Tujuan</ClassicSectionHead>
            <ClassicPanel>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 11, lineHeight: 1.5, marginBottom: 10 }}>"{activeMateri.capaian}"</p>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 11, color: '#000', borderBottom: '1px solid #C9A961', paddingBottom: 4, marginBottom: 6 }}>Tujuan Pembelajaran</h4>
              <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6 }}>
                {materiTp.map((tp, idx) => <li key={idx} style={{ marginBottom: 3 }}>Murid mampu <strong>{tp}</strong></li>)}
              </ul>
            </ClassicPanel>
            <ClassicPanel title="Dimensi Profil Lulusan">
              <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6 }}>
                {dpl.map((d, dIdx) => <li key={dIdx} style={{ marginBottom: 3 }}><strong>{d.nama}:</strong> {d.deskripsi}</li>)}
              </ul>
            </ClassicPanel>
            <ClassicPanel title="Pertanyaan Pemantik">
              <ol style={{ margin: 0, paddingLeft: 16, fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6 }}>
                {(ppmDetails.pertanyaanPemantik || []).map((q, qIdx) => <li key={qIdx} style={{ marginBottom: 2 }}>{q}</li>)}
              </ol>
            </ClassicPanel>

            {/* III - Langkah Pembelajaran Per Pertemuan */}
            <div style={{ pageBreakAfter: 'always' }} />
            <ClassicSectionHead roman="III">Langkah Pembelajaran</ClassicSectionHead>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 11, color: '#000', textAlign: 'center', marginBottom: 12 }}>
              Total {totalPertemuan} Pertemuan — Pendekatan TPACK & Diferensiasi
            </p>

            {Array.from({ length: totalPertemuan }).map((_, pertIdx) => {
              const targetTp = materiTp[pertIdx] || materiTp[materiTp.length - 1] || activeMateri.judul;
              const isFirst = pertIdx === 0;
              const isLast = pertIdx === totalPertemuan - 1;

              return (
                <div key={pertIdx}>
                  <ClassicPanel title={`Pertemuan ${pertIdx + 1} (${S.jpPerMinggu} JP × 45 Menit)`}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 10.5, color: '#000', marginBottom: 6, fontStyle: 'italic' }}>
                      Fokus TP: {targetTp}
                    </p>

                    <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 10, background: '#C9A961', color: '#1A1A2E', padding: '4px 10px', border: '1px solid #C9A961', whiteSpace: 'nowrap' }}>AWAL (15')</span>
                      <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'Lora', serif", fontSize: 10, lineHeight: 1.5 }}>
                        {isFirst ? (
                          <>
                            <li>{ppmDetails.langkahPendahuluan?.[0] || 'Membuka salam, doa, dan apersepsi.'}</li>
                            <li>Menyampaikan pertanyaan pemantik dan diagnostik awal.</li>
                          </>
                        ) : (
                          <>
                            <li>Membuka dengan salam, doa, apersepsi materi sebelumnya.</li>
                            <li>Menjelaskan tujuan spesifik pertemuan ini.</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 10, background: '#C9A961', color: '#1A1A2E', padding: '4px 10px', border: '1px solid #C9A961', whiteSpace: 'nowrap' }}>
                        INTI ({S.jpPerMinggu * 45 - 30}') — {isFirst ? 'Eksplorasi' : isLast ? 'Presentasi & Evaluasi' : 'Pendalaman'}
                      </span>
                      <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'Lora', serif", fontSize: 10, lineHeight: 1.6 }}>
                        {ctx.generateDynamicLangkahInti(targetTp, pertIdx).map((langkah, lIdx) => (
                          <li key={lIdx} style={{ marginBottom: lIdx === 2 ? 0 : 6 }}>{langkah}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', gap: 12 }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 10, background: '#C9A961', color: '#1A1A2E', padding: '4px 10px', border: '1px solid #C9A961', whiteSpace: 'nowrap' }}>AKHIR (15')</span>
                      <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'Lora', serif", fontSize: 10, lineHeight: 1.5 }}>
                        {isLast ? (
                          <>
                            <li>{ppmDetails.langkahPenutup?.[0] || 'Guru memandu simpulan akhir.'}</li>
                            <li>Penguatan nilai Profil Pelajar Pancasila dan pesan moral.</li>
                            <li>Doa dan salam penutup.</li>
                          </>
                        ) : (
                          <>
                            <li>Murid dipandu membuat simpulan sementara.</li>
                            <li>Asesmen formatif lisan cepat.</li>
                            <li>Menyampaikan tugas persiapan untuk pertemuan selanjutnya.</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </ClassicPanel>

                  <ClassicDivider width="40%" />
                </div>
              );
            })}

            {/* IV. Asesmen Pembelajaran */}
            <div style={{ marginTop: 20 }}>
              <ClassicSectionHead roman="IV">Asesmen Pembelajaran</ClassicSectionHead>

              <ClassicPanel title="Asesmen Awal (Diagnostik)">
                <p style={{ fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6, marginBottom: 8 }}>{ppmDetails.asesmenDiagnostik}</p>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6, fontStyle: 'italic', color: '#000' }}>
                  <strong>Fokus Elemen CP:</strong> Pengetahuan awal tentang konsep {activeMateri.judul}.
                </p>
              </ClassicPanel>

              <ClassicPanel title="Asesmen Proses (Formatif)">
                <p style={{ fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6, marginBottom: 8 }}>{ppmDetails.asesmenFormatif}</p>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6, fontStyle: 'italic', color: '#000' }}>
                  <strong>Fokus Elemen CP yang dinilai selama proses:</strong> Observasi, diskusi, dan hasil kerja LKPD.
                </p>
              </ClassicPanel>

              <ClassicPanel title="Asesmen Akhir (Sumatif)">
                <p style={{ fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6, marginBottom: 8 }}>{ppmDetails.asesmenSumatif}</p>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6, fontStyle: 'italic', color: '#000' }}>
                  <strong>Fokus Elemen CP yang dinilai:</strong> Pemahaman, analisis, dan penerapan nilai {activeMateri.judul}.
                </p>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6, marginTop: 6 }}>
                  <strong>Instrumen:</strong> Rubrik per Elemen CP (terlampir).
                </p>
              </ClassicPanel>

              <ClassicPanel title="Sarana Prasarana & Media">
                <ul style={{ margin: 0, paddingLeft: 16, fontFamily: "'Lora', serif", fontSize: 10.5, lineHeight: 1.6 }}>
                  {(ppmDetails.saranaPrasarana || []).map((s, sIdx) => <li key={sIdx}>{s}</li>)}
                </ul>
              </ClassicPanel>
            </div>

            <ClassicSignature schoolInfoData={S} sem={sem} />
          </div>

          {/* Lembar sendiri: QR Code Bahan Ajar */}
          <div className="a4-page" style={{ padding: '15mm 15mm', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ClassicWatermark opacity={0.04} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-block', border: '2px double #C9A961', padding: '20px 30px', background: 'rgba(255,252,244,0.8)' }}>
                <div style={{ background: '#C9A961', color: '#1A1A2E', padding: '8px 12px', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.8, textAlign: 'center', borderBottom: '2px double #C9A961', margin: '-20px -30px 16px' }}>
                  LAMPIRAN: QR CODE BAHAN AJAR
                </div>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`https://ismubastemda.web.id/materi/${ctx.selectedMapel}/${ctx.selectedClass}/bab-${activeMateri.bab}`)}`}
                  alt="QR Code Bahan Ajar"
                  style={{ width: 180, height: 180, display: 'block', margin: '0 auto 12px' }}
                />
                <p style={{ fontFamily: "'Lora', serif", fontSize: 11, color: '#000', margin: 0 }}>
                  Scan untuk mengakses Bahan Ajar — <ArabicText text={activeMateri.judul} />
                </p>
                <p style={{ fontFamily: "'Lora', serif", fontSize: 9, color: '#64748B', margin: '4px 0 0', wordBreak: 'break-all' }}>
                  ismubastemda.web.id/materi/{ctx.selectedMapel}/{ctx.selectedClass}/bab-{activeMateri.bab}
                </p>
              </div>
            </div>
          </div>

          {/* Lembar sendiri: LKPD */}
          <div className="a4-page" style={{ padding: '15mm 15mm', position: 'relative' }}>
            <ClassicWatermark opacity={0.04} />
            <div>
              <div style={{ background: '#C9A961', color: '#1A1A2E', padding: '8px 12px', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.8, textAlign: 'center', border: '2px double #C9A961', borderBottom: '2px double #C9A961', marginBottom: 0 }}>
                LAMPIRAN: LEMBAR KERJA PESERTA DIDIK (LKPD)
              </div>
              {lkpdList.map((lkpdItem, li) => (
                <div key={li}>
                  {renderLkpdSection(lkpdItem)}
                  {li < lkpdList.length - 1 && <div style={{ pageBreakBefore: 'always' }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Lembar sendiri: Rubrik Penilaian */}
          {lkpdList[0]?.lkpd && (
            <div className="a4-page" style={{ padding: '15mm 15mm', position: 'relative' }}>
              <ClassicWatermark opacity={0.04} />
              <div style={{ border: '2px double #C9A961', padding: 0, background: 'rgba(255,252,244,0.8)' }}>
                <div style={{ background: '#C9A961', color: '#1A1A2E', padding: '8px 12px', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.8, textAlign: 'center', borderBottom: '2px double #C9A961' }}>
                  LAMPIRAN: RUBRIK PENILAIAN LKPD
                </div>
                <div style={{ padding: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, border: '1px solid #C9A961' }}>
                    <thead>
                      <tr style={{ background: '#C9A961', color: '#1A1A2E', fontFamily: "'Playfair Display', serif" }}>
                        <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '5%' }}>No</th>
                        <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '35%' }}>Komponen</th>
                        <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '15%' }}>Tidak (&lt;75)</th>
                        <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '15%' }}>CK (75-83)</th>
                        <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '15%' }}>K (84-92)</th>
                        <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '15%' }}>SK (93-100)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(lkpdList[0].lkpd.rubrikPenilaian) && lkpdList[0].lkpd.rubrikPenilaian.map((rub, rIdx) => (
                        <React.Fragment key={rIdx}>
                          <tr style={{ background: 'rgba(201,169,97,0.08)', fontWeight: 700, borderBottom: '1px solid rgba(201,169,97,0.3)' }}>
                            <td style={{ textAlign: 'center', padding: '5px 8px' }}>{rub.no}</td>
                            <td style={{ padding: '5px 8px', color: '#000' }} colSpan={5}>{rub.komponen}</td>
                          </tr>
                          {rub.sub.map((sText, sIdx) => (
                            <tr key={sIdx} style={{ borderBottom: '1px dotted rgba(201,169,97,0.2)' }}>
                              <td></td>
                              <td style={{ padding: '3px 8px', fontSize: 9.5 }}>{sText}</td>
                              <td style={{ padding: '3px 8px', textAlign: 'center' }}></td>
                              <td style={{ padding: '3px 8px', textAlign: 'center' }}></td>
                              <td style={{ padding: '3px 8px', textAlign: 'center' }}></td>
                              <td style={{ padding: '3px 8px', textAlign: 'center' }}></td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>

                  {lkpdList[0].lkpd.bobotPenilaian && (
                    <div style={{ marginTop: 10 }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 11, color: '#000', borderBottom: '1px solid #C9A961', paddingBottom: 4, marginBottom: 6 }}>Persentase Bobot Komponen Penilaian:</h4>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, border: '1px solid #C9A961' }}>
                        <thead>
                          <tr style={{ background: '#C9A961', color: '#1A1A2E', fontFamily: "'Playfair Display', serif" }}>
                            <th style={{ padding: '5px 8px', border: '1px solid #C9A961' }}>Persiapan</th>
                            <th style={{ padding: '5px 8px', border: '1px solid #C9A961' }}>Proses</th>
                            <th style={{ padding: '5px 8px', border: '1px solid #C9A961' }}>Hasil</th>
                            <th style={{ padding: '5px 8px', border: '1px solid #C9A961' }}>Sikap</th>
                            <th style={{ padding: '5px 8px', border: '1px solid #C9A961' }}>Waktu</th>
                            <th style={{ padding: '5px 8px', border: '1px solid #C9A961' }}>Nilai Akhir (NP)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: 'center', padding: '5px 8px' }}>{lkpdList[0].lkpd.bobotPenilaian.persiapan}%</td>
                            <td style={{ textAlign: 'center', padding: '5px 8px' }}>{lkpdList[0].lkpd.bobotPenilaian.proses}%</td>
                            <td style={{ textAlign: 'center', padding: '5px 8px' }}>{lkpdList[0].lkpd.bobotPenilaian.hasil}%</td>
                            <td style={{ textAlign: 'center', padding: '5px 8px' }}>{lkpdList[0].lkpd.bobotPenilaian.sikap}%</td>
                            <td style={{ textAlign: 'center', padding: '5px 8px' }}>{lkpdList[0].lkpd.bobotPenilaian.waktu}%</td>
                            <td style={{ textAlign: 'center', padding: '5px 8px', fontWeight: 700, color: '#000' }}>Σ(Skor × Bobot)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      );
    }

    /* ============================================================
       KISI-KISI
    ============================================================ */
    case 'kisi-kisi':
      return (
        <div key="kisi-kisi-classic" className="a4-page" style={{ position: 'relative' }}>
          <ClassicWatermark opacity={0.04} />
          <ClassicPageTitle>Kisi-Kisi Soal Asesmen</ClassicPageTitle>
          <ClassicSubtitle>Kisi-Kisi Ujian Tengah & Akhir Semester</ClassicSubtitle>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, border: '1px solid #C9A961', marginTop: 12 }}>
            <thead>
              <tr style={{ background: '#C9A961', color: '#1A1A2E', fontFamily: "'Playfair Display', serif" }}>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '6%' }}>No</th>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '24%' }}>TP</th>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '35%' }}>Indikator Soal</th>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '10%' }}>Level</th>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '15%' }}>Bentuk</th>
                <th style={{ padding: '6px 8px', border: '1px solid #C9A961', width: '10%' }}>No. Soal</th>
              </tr>
            </thead>
            <tbody>
              {localMateriList.map((m, mIdx) => (
                <React.Fragment key={mIdx}>
                  <tr style={{ borderBottom: '1px solid rgba(201,169,97,0.2)' }}>
                    <td style={{ textAlign: 'center', padding: '5px 8px' }}>{mIdx * 2 + 1}</td>
                    <td style={{ padding: '5px 8px', fontSize: 9.5 }}>{m.tp?.[0] || <ArabicText text={m.judul} />}</td>
                    <td style={{ padding: '5px 8px', fontSize: 9.5 }}>Disajikan potongan Q.S. al-Maidah/5: 48, murid mampu mengidentifikasi hukum bacaan tajwid.</td>
                    <td style={{ textAlign: 'center', padding: '5px 8px' }}>L2 (C3)</td>
                    <td style={{ textAlign: 'center', padding: '5px 8px', fontFamily: "'Playfair Display', serif", fontWeight: 600, color: '#000' }}>PG</td>
                    <td style={{ textAlign: 'center', padding: '5px 8px' }}>1, 2, 3</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(201,169,97,0.2)' }}>
                    <td style={{ textAlign: 'center', padding: '5px 8px' }}>{mIdx * 2 + 2}</td>
                    <td style={{ padding: '5px 8px', fontSize: 9.5 }}>{m.tp?.[1] || <ArabicText text={m.judul} />}</td>
                    <td style={{ padding: '5px 8px', fontSize: 9.5 }}>Murid dapat menganalisis implementasi akhlak terpuji dalam kehidupan sekolah.</td>
                    <td style={{ textAlign: 'center', padding: '5px 8px' }}>L3 (C4)</td>
                    <td style={{ textAlign: 'center', padding: '5px 8px', fontFamily: "'Playfair Display', serif", fontWeight: 600, color: '#000' }}>Esai</td>
                    <td style={{ textAlign: 'center', padding: '5px 8px' }}>41, 42</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <ClassicSignature schoolInfoData={S} sem={sem} />
        </div>
      );

    /* ============================================================
       KARTU SOAL
    ============================================================ */
    case 'kartu-soal': {
      const localActiveMateri = localMateriList.find(m => m.bab === Number(ctx.selectedPpmBab)) || localMateriList[0] || {};
      return (
        <div key="kartu-soal-classic" className="a4-page" style={{ position: 'relative' }}>
          <ClassicWatermark opacity={0.04} />
          <ClassicPageTitle>Kartu Soal Asesmen</ClassicPageTitle>
          <ClassicSubtitle>Butir Pertanyaan Ujian & Kunci Jawaban Pembahasan</ClassicSubtitle>
          <div style={{ marginTop: 12 }}>
            <div style={{ border: '2px double #C9A961', padding: 0, marginBottom: 16, background: 'rgba(255,252,244,0.8)' }}>
              <div style={{ background: '#C9A961', color: '#1A1A2E', fontFamily: "'Playfair Display', serif", fontWeight: 700, padding: '8px 14px', display: 'flex', justifyContent: 'space-between', fontSize: 11, borderBottom: '2px double #C9A961' }}>
                <span>KARTU SOAL NOMOR: 01 (PILIHAN GANDA)</span>
                <span>MATA PELAJARAN: {S.mapel}</span>
              </div>
              <div style={{ padding: 12, fontFamily: "'Lora', serif", fontSize: 10.5 }}>
                <p><strong>Kompetensi Dasar / TP:</strong> {localActiveMateri.tp?.[0] || <ArabicText text={localActiveMateri.judul} />}</p>
                <p style={{ margin: '6px 0' }}><strong>Butir Pertanyaan:</strong></p>
                <div style={{ background: 'rgba(201,169,97,0.06)', borderLeft: '3px double #C9A961', padding: '8px 12px', marginBottom: 6 }}>
                  Di bawah ini yang merupakan cerminan nyata dari kompetensi dalam kebaikan (fastabiqul khairat) berdasarkan perintah Allah Swt. dalam Q.S. al-Maidah/5: 48 adalah...
                </div>
                <ol style={{ listStyle: 'upper-alpha', paddingLeft: 20, lineHeight: 1.7 }}>
                  <li>Berupaya keras mencari keuntungan finansial pribadi dengan segala cara.</li>
                  <li style={{ fontWeight: 700, color: '#000' }}>Bersegera membantu teman yang sedang kesusahan belajar demi ketaatan kepada Allah.</li>
                  <li>Mengikuti turnamen olahraga demi meraih piala penghargaan.</li>
                  <li>Memamerkan amal ibadah sedekah di media sosial agar dilihat orang lain.</li>
                  <li>Bekerja keras sepanjang hari tanpa menghiraukan waktu ibadah shalat wajib.</li>
                </ol>
                <p style={{ borderTop: '1px solid #C9A961', paddingTop: 6, marginTop: 6, fontSize: 10, color: '#000' }}>
                  <strong>Pembahasan:</strong> Fastabiqul Khairat adalah amalan baik yang dilakukan secara ikhlas semata-mata mengharapkan ridha Allah Swt.
                </p>
              </div>
            </div>

            <div style={{ border: '2px double #C9A961', padding: 0, background: 'rgba(255,252,244,0.8)' }}>
              <div style={{ background: '#C9A961', color: '#1A1A2E', fontFamily: "'Playfair Display', serif", fontWeight: 700, padding: '8px 14px', display: 'flex', justifyContent: 'space-between', fontSize: 11, borderBottom: '2px double #C9A961' }}>
                <span>KARTU SOAL NOMOR: 02 (ESAI / URAIAN)</span>
                <span>MATA PELAJARAN: {S.mapel}</span>
              </div>
              <div style={{ padding: 12, fontFamily: "'Lora', serif", fontSize: 10.5 }}>
                <p><strong>Kompetensi Dasar / TP:</strong> {localActiveMateri.tp?.[1] || <ArabicText text={localActiveMateri.judul} />}</p>
                <p style={{ margin: '6px 0' }}><strong>Butir Pertanyaan:</strong></p>
                <div style={{ background: 'rgba(201,169,97,0.06)', borderLeft: '3px double #C9A961', padding: '8px 12px', marginBottom: 6 }}>
                  Jelaskan bagaimana konsep syu'abul iman memberikan landasan akhlak bagi seorang muslim dalam menggunakan media sosial di era digital saat ini!
                </div>
                <p style={{ fontWeight: 700, color: '#000' }}>Kunci Jawaban & Rubrik Penilaian:</p>
                <p style={{ paddingLeft: 10, lineHeight: 1.6 }}>
                  Syu'ab al-iman mengajarkan bahwa lisan dan perbuatan adalah cerminan keimanan. Dalam media sosial, cabang iman memelihara lisan terwujud dalam bentuk menyebarkan informasi bermanfaat, menghindari fitnah/hoaks, berkata sopan, dan menjaga kehormatan aib orang lain.
                </p>
                <p style={{ borderTop: '1px solid #C9A961', paddingTop: 6, marginTop: 6, fontSize: 10, color: '#000' }}>
                  <strong>Skor Maksimal:</strong> 20 Poin (jika analisis lengkap & mengaitkan dalil Al-Qur'an secara sempurna).
                </p>
              </div>
            </div>
          </div>
          <ClassicSignature schoolInfoData={S} sem={sem} />
        </div>
      );
    }

    default:
      return (
        <div key="default-classic" className="a4-page" style={{ padding: 24 }}>
          <ClassicPageTitle>Halaman Tidak Tersedia</ClassicPageTitle>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 12, color: '#64748B', textAlign: 'center', marginTop: 16 }}>
            Tab <strong>{tabName}</strong> tidak dapat ditampilkan dalam tema klasik.
          </p>
        </div>
      );
  }
};

export default renderClassicPage;
