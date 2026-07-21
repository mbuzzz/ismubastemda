import { getDetailedLkpdForBab, getPpmDetails } from './perangkatUtils';

/**
 * Hasilkan daftar LKPD per pertemuan.
 *
 * PAI              : Discovery Learning (utuh).
 * Kemuh + Arab     : KUIS / ULANGAN per pertemuan (hanya soal, tanpa petunjuk/TP).
 *
 * @returns {Array<{pertemuan:number, tpFokus:string, lkpd:object}>}
 */
export const getLkpdListPerPertemuan = (fase, bab, mapel = 'pai', kelas = 'X', materi = {}) => {
  const base = getDetailedLkpdForBab(fase, bab, mapel, kelas, materi);
  const tps = Array.isArray(materi?.tp) && materi.tp.length > 0
    ? materi.tp
    : [
        `Memahami konsep ${materi?.judul || `Bab ${bab}`} secara komprehensif.`,
        `Mengaplikasikan nilai-nilai ${materi?.judul || `Bab ${bab}`} dalam kehidupan sehari-hari.`,
      ];
  const totalPertemuan = Math.max(1, Number(materi?.minggu) || 1);
  const judulMateri = (materi?.judul || `Bab ${bab}`).trim();
  const labelMapel = mapel === 'arab' ? 'Bahasa Arab' : mapel === 'kemuh' ? 'Kemuhammadiyahan' : 'Pendidikan Agama Islam dan Budi Pekerti';

  // ——— Kemuh & Arab: KUIS / ULANGAN per pertemuan ———
  if (mapel === 'kemuh' || mapel === 'arab' || base?.simplified || base?.quizMode) {
    const ppm = getPpmDetails(fase, bab, mapel, kelas, materi);
    const bank = Array.isArray(ppm.lkpd) ? ppm.lkpd.filter(Boolean) : [];

    return Array.from({ length: totalPertemuan }).map((_, pertIdx) => {
      const tpFokus = tps[pertIdx] || tps[tps.length - 1] || judulMateri;
      const bankSoal = bank[pertIdx % Math.max(1, bank.length)] || null;

      const soal = mapel === 'arab'
        ? [
            {
              no: 1,
              soal: `Tuliskan 5 mufradat (kosakata) penting terkait materi "${judulMateri}" pada pertemuan ${pertIdx + 1}, lengkap dengan artinya!`,
              kunci: `5 pasangan kata Arab–Indonesia yang relevan.`,
            },
            {
              no: 2,
              soal: bankSoal
                || `Buat 2 kalimat sederhana (jumlah ismiyyah/fi'liyyah) sesuai fokus pertemuan: "${tpFokus}".`,
              kunci: `Kalimat berbahasa Arab yang benar secara dasar.`,
            },
            {
              no: 3,
              soal: `Terjemahkan ke Bahasa Indonesia atau sebaliknya: susun 1 dialog singkat (4–6 baris) tentang "${judulMateri}"!`,
              kunci: `Dialog kontekstual, mudah dipahami.`,
            },
            {
              no: 4,
              soal: `Refleksi: Apa 1 kesulitan berbahasa Arab yang kamu temui di pertemuan ${pertIdx + 1}, dan bagaimana cara melatihnya minggu ini?`,
              kunci: `Refleksi jujur + rencana latihan singkat.`,
            },
          ]
        : [
            {
              no: 1,
              soal: `Jelaskan dengan singkat (3–5 kalimat) materi yang dipelajari pada pertemuan ini: "${tpFokus}".`,
              kunci: `Memuat pemahaman inti TP pertemuan ${pertIdx + 1}.`,
            },
            {
              no: 2,
              soal: bankSoal
                || `Sebutkan 2 poin penting dari materi "${judulMateri}" yang dibahas pada pertemuan ${pertIdx + 1}!`,
              kunci: `Jawaban relevan dengan materi bab dan TP pertemuan.`,
            },
            {
              no: 3,
              soal: `Berikan 1 contoh nyata di sekolah atau rumah yang sesuai dengan fokus pertemuan ini ("${tpFokus}")!`,
              kunci: `Contoh konkret, realistis, dapat diamati.`,
            },
            {
              no: 4,
              soal: `Refleksi singkat: Apa 1 sikap yang akan kamu perbaiki setelah pertemuan ${pertIdx + 1} tentang "${judulMateri}"?`,
              kunci: `Komitmen sikap personal yang jelas.`,
            },
          ];

      const lkpd = {
        quizMode: true,
        simplified: true,
        judulLkpd: `KUIS / ULANGAN — PERTEMUAN ${pertIdx + 1}`,
        subJudul: `${judulMateri}`,
        identitas: {
          mapel: labelMapel,
          faseKelas: `${fase} / ${kelas}`,
          materi: judulMateri,
          elemen: materi?.elemen || (mapel === 'arab' ? 'Bahasa Arab' : 'Kemuhammadiyahan'),
          pertemuan: pertIdx + 1,
          tpFokus,
          model: 'Kuis / Ulangan',
        },
        tujuan: [],
        petunjuk: [],
        tugas: soal.map((s) => s.soal),
        rubrikPenilaian: [],
        bobotPenilaian: null,
        langkahKerja: null,
        kesimpulanPlaceholder: '',
        postTest: {
          quizizzLink: '#',
          soal,
        },
      };

      return { pertemuan: pertIdx + 1, tpFokus, lkpd };
    });
  }

  // ——— PAI: Discovery Learning per pertemuan ———
  const fokusTahap = [
    { tahap: 'Stimulation (Pemberian Rangsangan)', skill: 'Mengamati & Mempertanyakan' },
    { tahap: 'Problem Statement (Identifikasi Masalah)', skill: 'Merumuskan Pertanyaan' },
    { tahap: 'Data Collection (Pengumpulan Data)', skill: 'Mengumpulkan Informasi' },
    { tahap: 'Data Processing (Pengolahan Data)', skill: 'Menganalisis & Mengelola' },
    { tahap: 'Verification (Verifikasi)', skill: 'Membuktikan & Memastikan' },
    { tahap: 'Generalization (Menarik Kesimpulan)', skill: 'Menyimpulkan & Mengomunikasikan' },
  ];

  return Array.from({ length: totalPertemuan }).map((_, pertIdx) => {
    const tpFokus = tps[pertIdx] || tps[tps.length - 1] || judulMateri;
    const tahap = fokusTahap[pertIdx % fokusTahap.length];
    const lkpd = JSON.parse(JSON.stringify(base));

    lkpd.judulLkpd = `LEMBAR KERJA PESERTA DIDIK (LKPD) — PERTEMUAN ${pertIdx + 1}`;
    lkpd.subJudul = `"Fokus: ${tahap.tahap} · ${judulMateri}"`;
    lkpd.identitas = {
      ...lkpd.identitas,
      model: 'Discovery Learning',
      pertemuan: pertIdx + 1,
      fokusTahap: tahap.tahap,
      skill: tahap.skill,
    };
    lkpd.tujuan = [
      `1. Membedah konsep ${judulMateri} dengan fokus TP: "${tpFokus}".`,
      `2. Melaksanakan tahap ${tahap.tahap} secara kritis, kolaboratif, dan mandiri.`,
      `3. Menyajikan hasil kerja kelompok serta merefleksikan nilai luhur yang diperoleh.`,
    ];
    lkpd.petunjuk = [
      `1. Bekerjalah dalam kelompok (4-5 orang); arahkan diskusi pada TP Pertemuan ${pertIdx + 1}.`,
      `2. Fokuskan aktivitas pada tahap: ${tahap.tahap} (${tahap.skill}).`,
      `3. Catat setiap temuan pada tabel analisis; gunakan dalil Al-Qur'an/Hadis atau sumber tepercaya.`,
      `4. Siapkan presentasi singkat hasil kerja kelompok di akhir pertemuan.`,
    ];
    lkpd.langkahKerja = {
      ...lkpd.langkahKerja,
      stimulation: {
        narasi: `Pada Pertemuan ${pertIdx + 1}, fokus pembelajaran adalah "${tpFokus}". ${lkpd.langkahKerja?.stimulation?.narasi || ''}`,
        pertanyaanPemantik: [
          (lkpd.langkahKerja?.stimulation?.pertanyaanPemantik?.[0]) || `Apa inti dari "${tpFokus}" yang paling relevan dengan kehidupanmu?`,
          (lkpd.langkahKerja?.stimulation?.pertanyaanPemantik?.[1]) || `Bagaimana kamu dapat membuktikan penerapan "${tpFokus}" hari ini?`,
        ],
      },
      problemStatement: `Berdasarkan fokus TP Pertemuan ${pertIdx + 1}, rumuskan masalah utama: "${tpFokus}" dalam kaitannya dengan unsur subjek, waktu, ruang, dan sebab-akibat. Apa yang ingin kalian pecahkan/dalami pada pertemuan ini?`,
      dataCollection: `Kumpulkan data pendukung yang relevan dengan TP Pertemuan ${pertIdx + 1} ("${tpFokus}"). Sumber: mushaf Al-Qur'an/hadis, buku teks ${labelMapel}, observasi lingkungan sekolah, atau rujukan digital tepercaya.`,
    };

    const allSoal = Array.isArray(lkpd.postTest?.soal) ? lkpd.postTest.soal : [];
    const startIdx = (pertIdx * 2) % Math.max(1, allSoal.length);
    const soalPertemuan = [];
    for (let i = 0; i < Math.min(2, allSoal.length); i++) {
      const s = allSoal[(startIdx + i) % allSoal.length];
      soalPertemuan.push({
        no: i + 1,
        soal: `[Pertemuan ${pertIdx + 1}] ${s.soal}`,
        kunci: s.kunci,
      });
    }
    lkpd.postTest = {
      ...lkpd.postTest,
      soal: soalPertemuan,
      quizizzLink: lkpd.postTest?.quizizzLink || '#',
    };

    return { pertemuan: pertIdx + 1, tpFokus, lkpd };
  });
};

export default getLkpdListPerPertemuan;
