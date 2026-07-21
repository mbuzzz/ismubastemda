import React from 'react';
import { getDetailedLkpdForBab } from './perangkatUtils';

/**
 * Hasilkan daftar LKPD (Lembar Kerja Peserta Didik) yang dipetakan
 * ke setiap pertemuan dalam sebuah Bab/Modul Ajar.
 *
 * Setiap pertemuan mendapat LKPD-nya sendiri dengan fokus TP yang berbeda,
 * sehingga jika sebuah bab memiliki 2 pertemuan yang menggunakan LKPD,
 * akan ada 2 LKPD utuh (bukan 1 LKPD global di akhir modul).
 *
 * @param {string} fase        - 'E' | 'F'
 * @param {number} bab         - nomor bab
 * @param {string} mapel       - 'pai' | 'arab' | 'kemuh'
 * @param {string} kelas       - 'X' | 'XI' | 'XII'
 * @param {object} materi      - objek materi aktif (judul, tp[], elemen, ...)
 * @returns {Array<{pertemuan:number, tpFokus:string, lkpd:object}>}
 */
export const getLkpdListPerPertemuan = (fase, bab, mapel = 'pai', kelas = 'X', materi = {}) => {
  const base = getDetailedLkpdForBab(fase, bab, mapel, kelas, materi);
  const tps = Array.isArray(materi?.tp) && materi.tp.length > 0
    ? materi.tp
    : [
        `Memahami konsep ${materi?.judul || `Bab ${bab}`} secara komprehensif.`,
        `Mengaplikasikan nilai-nilai ${materi?.judul || `Bab ${bab}`} dalam kehidupan sehari-hari.`,
        `Merefleksikan hikmah dan dampak sosial-spiritual dari ${materi?.judul || `Bab ${bab}`}.`,
      ];
  const totalPertemuan = Math.max(1, Number(materi?.minggu) || 1);
  const judulMateri = (materi?.judul || `Bab ${bab}`).trim();

  // Bank fokus tahap Discovery per pertemuan (diselingkan agar tiap LKPD unik)
  const fokusTahap = [
    { tahap: 'Stimulation (Pemberian Rangsangan)', skill: 'Mengamati & Mempertanyakan' },
    { tahap: 'Problem Statement (Identifikasi Masalah)', skill: 'Merumuskan Pertanyaan' },
    { tahap: 'Data Collection (Pengumpulan Data)', skill: 'Mengumpulkan Informasi' },
    { tahap: 'Data Processing (Pengolahan Data)', skill: 'Menganalisis & Mengelola' },
    { tahap: 'Verification (Verifikasi)', skill: 'Membuktikan & Memastikan' },
    { tahap: 'Generalization (Menarik Kesimpulan)', skill: 'Menyimpulkan & Mengomunikasikan' },
  ];

  const labelMapel = mapel === 'arab' ? 'Bahasa Arab' : mapel === 'kemuh' ? 'Kemuhammadiyahan' : 'Pendidikan Agama Islam dan Budi Pekerti';

  return Array.from({ length: totalPertemuan }).map((_, pertIdx) => {
    const tpFokus = tps[pertIdx] || tps[tps.length - 1] || judulMateri;
    const tahap = fokusTahap[pertIdx % fokusTahap.length];

    // Kloning LKPD dasar lalu sesuaikan fokus pertemuan
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

    // Tujuan LKPD disesuaikan ke TP fokus pertemuan ini
    lkpd.tujuan = [
      `1. Membedah konsep ${judulMateri} dengan fokus TP: "${tpFokus}".`,
      `2. Melaksanakan tahap ${tahap.tahap} secara kritis, kolaboratif, dan mandiri.`,
      `3. Menyajikan hasil kerja kelompok serta merefleksikan nilai luhur yang diperoleh.`,
    ];

    // Petunjuk kerja spesifik tahap
    lkpd.petunjuk = [
      `1. Bekerjalah dalam kelompok (4-5 orang); arahkan diskusi pada TP Pertemuan ${pertIdx + 1}.`,
      `2. Fokuskan aktivitas pada tahap: ${tahap.tahap} (${tahap.skill}).`,
      `3. Catat setiap temuan pada tabel analisis; gunakan dalil Al-Qur'an/Hadis atau sumber tepercaya.`,
      `4. Siapkan presentasi singkat hasil kerja kelompok di akhir pertemuan.`,
    ];

    // Narasi stimulation spesifik pertemuan
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

    // Soal HOTS post-test: ambil 2 soal spesifik per pertemuan (melingkar)
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
