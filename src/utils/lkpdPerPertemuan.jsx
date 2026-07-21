import { getDetailedLkpdForBab, getPpmDetails } from './perangkatUtils';

/**
 * Soal kuis PAI yang relevan dengan elemen + TP pertemuan.
 */
function buildPaiQuizSoal({ judulMateri, elemen = '', tpFokus, pertIdx, bankSoal }) {
  const el = String(elemen || '').toLowerCase();
  const tp = String(tpFokus || '').toLowerCase();
  const judul = String(judulMateri || '');
  const n = pertIdx + 1;

  // Soal 1: selalu fokus TP pertemuan (relevan)
  const s1 = {
    no: 1,
    soal: `Jelaskan secara singkat (3–5 kalimat) fokus pembelajaran pertemuan ${n}: "${tpFokus}".`,
    kunci: `Memuat pemahaman inti TP pertemuan ${n}.`,
  };

  // Soal 2: dari bank bab jika ada, atau sesuai elemen
  let s2;
  if (bankSoal) {
    s2 = {
      no: 2,
      soal: bankSoal,
      kunci: 'Jawaban relevan dengan materi bab.',
    };
  } else if (el.includes("qur") || el.includes('hadis') || /membaca|menghafal|ayat|qs\.|q\.s\./i.test(tp)) {
    s2 = {
      no: 2,
      soal: `Tuliskan dalil (ayat/hadis) yang relevan dengan materi "${judul}" pada pertemuan ${n}, lalu jelaskan kandungannya secara ringkas!`,
      kunci: 'Dalil + makna singkat yang tepat.',
    };
  } else if (el.includes('akidah') || /iman|ikhlas|zuhud|malu|kehormatan/i.test(tp + judul)) {
    s2 = {
      no: 2,
      soal: `Sebutkan 3 indikator akhlak/keimanan yang berhubungan dengan "${judul}" dan kaitkan dengan TP pertemuan ${n}!`,
      kunci: '3 indikator + kaitan dengan TP.',
    };
  } else if (el.includes('akhlak') || /perundungan|narkoba|khamr|perjudian|penyakit sosial/i.test(tp + judul)) {
    s2 = {
      no: 2,
      soal: `Analisis 2 dampak negatif dari perilaku yang dilarang dalam materi "${judul}", serta 1 cara mencegahnya di sekolah!`,
      kunci: '2 dampak + 1 pencegahan konkret.',
    };
  } else if (el.includes('fikih') || /khutbah|tablig|dakwah|ekonomi|bank|asuransi|koperasi/i.test(tp + judul)) {
    s2 = {
      no: 2,
      soal: `Jelaskan pengertian dan 2 ketentuan/prinsip penting dari materi "${judul}" yang dibahas pada pertemuan ${n}!`,
      kunci: 'Definisi + 2 ketentuan/prinsip.',
    };
  } else if (el.includes('sejarah') || /ulama|tokoh|kebangkitan|modern/i.test(tp + judul)) {
    s2 = {
      no: 2,
      soal: `Sebutkan 1 tokoh/peristiwa penting terkait "${judul}" dan 2 keteladanan yang bisa diambil pelajar SMK!`,
      kunci: 'Tokoh/peristiwa + 2 keteladanan.',
    };
  } else {
    s2 = {
      no: 2,
      soal: `Sebutkan 2 poin penting dari materi "${judul}" yang dibahas pada pertemuan ${n}!`,
      kunci: '2 poin relevan.',
    };
  }

  // Soal 3: aplikasi kontekstual SMK
  let s3;
  if (el.includes('fikih') && /dakwah|khutbah|tablig/i.test(tp + judul)) {
    s3 = {
      no: 3,
      soal: `Susun outline singkat (3 poin) pesan dakwah/khutbah santun untuk teman sekelas terkait problematika remaja SMK!`,
      kunci: 'Outline 3 poin, santun, relevan remaja.',
    };
  } else if (el.includes('fikih') && /ekonomi|bank|asuransi|koperasi/i.test(tp + judul)) {
    s3 = {
      no: 3,
      soal: `Berikan 1 contoh praktik ekonomi Islam di sekitar sekolah/rumah, dan jelaskan mengapa sesuai prinsip syariah!`,
      kunci: 'Contoh nyata + alasan syariah.',
    };
  } else if (el.includes("qur") || el.includes('hadis')) {
    s3 = {
      no: 3,
      soal: `Berikan 1 contoh perilaku di sekolah yang mencerminkan pengamalan ayat/hadis pada pertemuan ${n}!`,
      kunci: 'Contoh konkret di sekolah.',
    };
  } else if (el.includes('akhlak') || el.includes('akidah')) {
    s3 = {
      no: 3,
      soal: `Buat 1 rencana aksi pribadi (7 hari) untuk menerapkan sikap terpuji dari materi "${judul}" di lingkungan SMK!`,
      kunci: 'Rencana aksi terukur 7 hari.',
    };
  } else if (el.includes('sejarah')) {
    s3 = {
      no: 3,
      soal: `Bagaimana semangat para tokoh pada materi "${judul}" bisa diterapkan dalam belajar/praktik kejuruan di SMK? Beri 2 contoh!`,
      kunci: '2 contoh aplikasi di SMK.',
    };
  } else {
    s3 = {
      no: 3,
      soal: `Berikan 1 contoh nyata di sekolah atau rumah yang sesuai dengan fokus pertemuan ini ("${tpFokus}")!`,
      kunci: 'Contoh konkret, realistis.',
    };
  }

  // Soal 4: refleksi
  const s4 = {
    no: 4,
    soal: `Refleksi: Apa 1 sikap/kebiasaan yang akan kamu perbaiki setelah pertemuan ${n} tentang "${judul}"? Tuliskan alasan singkatnya!`,
    kunci: 'Komitmen sikap + alasan.',
  };

  return [s1, s2, s3, s4];
}

function buildArabQuizSoal({ judulMateri, tpFokus, pertIdx, bankSoal }) {
  const n = pertIdx + 1;
  return [
    {
      no: 1,
      soal: `Tuliskan 5 mufradat (kosakata) penting terkait materi "${judulMateri}" pada pertemuan ${n}, lengkap dengan artinya!`,
      kunci: '5 pasangan kata Arab–Indonesia yang relevan.',
    },
    {
      no: 2,
      soal: bankSoal || `Buat 2 kalimat sederhana (jumlah ismiyyah/fi'liyyah) sesuai fokus pertemuan: "${tpFokus}".`,
      kunci: 'Kalimat berbahasa Arab yang benar secara dasar.',
    },
    {
      no: 3,
      soal: `Terjemahkan ke Bahasa Indonesia atau sebaliknya: susun 1 dialog singkat (4–6 baris) tentang "${judulMateri}"!`,
      kunci: 'Dialog kontekstual, mudah dipahami.',
    },
    {
      no: 4,
      soal: `Refleksi: Apa 1 kesulitan berbahasa Arab yang kamu temui di pertemuan ${n}, dan bagaimana cara melatihnya minggu ini?`,
      kunci: 'Refleksi jujur + rencana latihan singkat.',
    },
  ];
}

function buildKemuhQuizSoal({ judulMateri, tpFokus, pertIdx, bankSoal }) {
  const n = pertIdx + 1;
  return [
    {
      no: 1,
      soal: `Jelaskan dengan singkat (3–5 kalimat) materi yang dipelajari pada pertemuan ini: "${tpFokus}".`,
      kunci: `Memuat pemahaman inti TP pertemuan ${n}.`,
    },
    {
      no: 2,
      soal: bankSoal || `Sebutkan 2 poin penting dari materi "${judulMateri}" yang dibahas pada pertemuan ${n}!`,
      kunci: 'Jawaban relevan dengan materi bab dan TP pertemuan.',
    },
    {
      no: 3,
      soal: `Berikan 1 contoh nyata di sekolah atau rumah yang sesuai dengan fokus pertemuan ini ("${tpFokus}")!`,
      kunci: 'Contoh konkret, realistis, dapat diamati.',
    },
    {
      no: 4,
      soal: `Refleksi singkat: Apa 1 sikap yang akan kamu perbaiki setelah pertemuan ${n} tentang "${judulMateri}"?`,
      kunci: 'Komitmen sikap personal yang jelas.',
    },
  ];
}

/**
 * Hasilkan daftar LKPD per pertemuan.
 *
 * PAI kelas XI + Kemuh + Arab : KUIS / ULANGAN per pertemuan (hanya soal).
 * PAI kelas X/XII              : Discovery Learning (utuh).
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
  const kelasNorm = String(kelas || 'X').toUpperCase();

  const useQuiz =
    mapel === 'kemuh' ||
    mapel === 'arab' ||
    (mapel === 'pai' && kelasNorm === 'XI') ||
    base?.simplified ||
    base?.quizMode;

  // ——— Format KUIS / ULANGAN per pertemuan ———
  if (useQuiz) {
    const ppm = getPpmDetails(fase, bab, mapel, kelas, materi);
    const bank = Array.isArray(ppm.lkpd) ? ppm.lkpd.filter(Boolean) : [];

    return Array.from({ length: totalPertemuan }).map((_, pertIdx) => {
      const tpFokus = tps[pertIdx] || tps[tps.length - 1] || judulMateri;
      const bankSoal = bank[pertIdx % Math.max(1, bank.length)] || null;

      let soal;
      if (mapel === 'arab') {
        soal = buildArabQuizSoal({ judulMateri, tpFokus, pertIdx, bankSoal });
      } else if (mapel === 'pai') {
        soal = buildPaiQuizSoal({
          judulMateri,
          elemen: materi?.elemen || '',
          tpFokus,
          pertIdx,
          bankSoal,
        });
      } else {
        soal = buildKemuhQuizSoal({ judulMateri, tpFokus, pertIdx, bankSoal });
      }

      const lkpd = {
        quizMode: true,
        simplified: true,
        judulLkpd: `KUIS / ULANGAN — PERTEMUAN ${pertIdx + 1}`,
        subJudul: `${judulMateri}`,
        identitas: {
          mapel: labelMapel,
          faseKelas: `${fase} / ${kelas}`,
          materi: judulMateri,
          elemen: materi?.elemen || labelMapel,
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

  // ——— PAI X/XII: Discovery Learning per pertemuan ———
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
