/**
 * Peta nomor halaman booklet (cetak seluruh dokumen).
 * Sampul & Judul: tanpa nomor (daftar isi menandai "—").
 * Nomor Arab mulai dari Identitas = 1, berurutan sesuai urutan render booklet.
 */

export function buildBookletPageMap(faseData) {
  let n = 0;
  const map = Object.create(null);
  const mark = (key) => {
    n += 1;
    map[key] = n;
    return n;
  };

  // cover, judul → tidak dinomori
  map.cover = null;
  map.judul = null;

  mark('identitas');
  mark('visi-misi');
  mark('daftar-isi');

  // Semester ganjil
  mark('pekan-efektif-ganjil');
  mark('prota');
  mark('promes-ganjil');
  mark('analisis-cp-ganjil');
  mark('cp-tp-pp-ganjil');
  mark('atp-ganjil');
  mark('kktp-ganjil');
  const ganjil = faseData?.semester?.ganjil?.materi || [];
  ganjil.forEach((m) => mark(`modul-ganjil-${m.bab}`));
  mark('kisi-kisi-ganjil');
  mark('kartu-soal-ganjil');

  // Semester genap
  mark('pekan-efektif-genap');
  mark('promes-genap');
  mark('analisis-cp-genap');
  mark('cp-tp-pp-genap');
  mark('atp-genap');
  mark('kktp-genap');
  const genap = faseData?.semester?.genap?.materi || [];
  genap.forEach((m) => mark(`modul-genap-${m.bab}`));
  mark('kisi-kisi-genap');
  mark('kartu-soal-genap');

  map.__last = n;
  return map;
}

/** Format tampilan di daftar isi */
export function formatTocPage(num) {
  if (num == null || num === false) return '—';
  return String(num);
}

/**
 * Entri daftar isi standar (booklet lengkap).
 * pageRef = key di buildBookletPageMap
 */
export function buildTocEntries(faseData, pageMap) {
  const ganjil = faseData?.semester?.ganjil?.materi || [];
  const genap = faseData?.semester?.genap?.materi || [];
  const g0 = ganjil[0]?.bab ?? 1;
  const g1 = ganjil[ganjil.length - 1]?.bab ?? g0;
  const n0 = genap[0]?.bab ?? g1 + 1;
  const n1 = genap[genap.length - 1]?.bab ?? n0;
  const p = (key) => formatTocPage(pageMap[key]);

  const front = [
    { title: 'SAMPUL DEPAN BUKU', page: '—', bold: false, group: 'front' },
    { title: 'HALAMAN JUDUL DOKUMEN', page: '—', bold: false, group: 'front' },
    { title: 'IDENTITAS SATUAN PENDIDIKAN & GURU', page: p('identitas'), bold: false, group: 'front' },
    { title: 'VISI & MISI SEKOLAH', page: p('visi-misi'), bold: false, group: 'front' },
    { title: 'DAFTAR ISI PERANGKAT', page: p('daftar-isi'), bold: true, group: 'front' },
  ];

  const bag1 = [
    { title: '1. RINCIAN PEKAN EFEKTIF (RPE) SEMESTER GANJIL', page: p('pekan-efektif-ganjil'), bold: false, group: 'ganjil' },
    { title: '2. PROGRAM TAHUNAN (PROTA)', page: p('prota'), bold: false, group: 'ganjil' },
    { title: '3. PROGRAM SEMESTER (PROMES) GANJIL', page: p('promes-ganjil'), bold: false, group: 'ganjil' },
    { title: '4. ANALISA CAPAIAN PEMBELAJARAN (CP) GANJIL', page: p('analisis-cp-ganjil'), bold: false, group: 'ganjil' },
    { title: '5. ANALISIS CP & TP (VERSI PP) GANJIL', page: p('cp-tp-pp-ganjil'), bold: false, group: 'ganjil' },
    { title: '6. ALUR TUJUAN PEMBELAJARAN (ATP) GANJIL', page: p('atp-ganjil'), bold: false, group: 'ganjil' },
    { title: '7. KRITERIA KETERCAPAIAN TP (KKTP) GANJIL', page: p('kktp-ganjil'), bold: false, group: 'ganjil' },
    { title: `8. MODUL AJAR / PPM GANJIL (BAB ${g0} S.D BAB ${g1})`, page: p(ganjil[0] ? `modul-ganjil-${ganjil[0].bab}` : 'kktp-ganjil'), bold: true, group: 'ganjil' },
    ...ganjil.map((m) => ({
      title: `    · Modul Bab ${m.bab}: ${m.judul}`,
      page: p(`modul-ganjil-${m.bab}`),
      bold: false,
      group: 'ganjil',
      indent: true,
    })),
    { title: '9. KISI-KISI SOAL ASESMEN GANJIL', page: p('kisi-kisi-ganjil'), bold: false, group: 'ganjil' },
    { title: '10. KARTU SOAL & KUNCI JAWABAN GANJIL', page: p('kartu-soal-ganjil'), bold: false, group: 'ganjil' },
  ];

  const bag2 = [
    { title: '11. RINCIAN PEKAN EFEKTIF (RPE) SEMESTER GENAP', page: p('pekan-efektif-genap'), bold: false, group: 'genap' },
    { title: '12. PROGRAM SEMESTER (PROMES) GENAP', page: p('promes-genap'), bold: false, group: 'genap' },
    { title: '13. ANALISA CAPAIAN PEMBELAJARAN (CP) GENAP', page: p('analisis-cp-genap'), bold: false, group: 'genap' },
    { title: '14. ANALISIS CP & TP (VERSI PP) GENAP', page: p('cp-tp-pp-genap'), bold: false, group: 'genap' },
    { title: '15. ALUR TUJUAN PEMBELAJARAN (ATP) GENAP', page: p('atp-genap'), bold: false, group: 'genap' },
    { title: '16. KRITERIA KETERCAPAIAN TP (KKTP) GENAP', page: p('kktp-genap'), bold: false, group: 'genap' },
    { title: `17. MODUL AJAR / PPM GENAP (BAB ${n0} S.D BAB ${n1})`, page: p(genap[0] ? `modul-genap-${genap[0].bab}` : 'kktp-genap'), bold: true, group: 'genap' },
    ...genap.map((m) => ({
      title: `    · Modul Bab ${m.bab}: ${m.judul}`,
      page: p(`modul-genap-${m.bab}`),
      bold: false,
      group: 'genap',
      indent: true,
    })),
    { title: '18. KISI-KISI SOAL ASESMEN GENAP', page: p('kisi-kisi-genap'), bold: false, group: 'genap' },
    { title: '19. KARTU SOAL & KUNCI JAWABAN GENAP', page: p('kartu-soal-genap'), bold: false, group: 'genap' },
  ];

  return { front, bag1, bag2, totalPages: pageMap.__last || 0 };
}
