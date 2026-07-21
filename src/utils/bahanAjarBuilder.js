/**
 * Merakit bahan ajar lengkap & rinci dari curriculum + detailedMateri.
 * Menjamin setiap bab punya konten usable (tidak kosong) meski data mentah tipis.
 */
import { detailedMateri } from '../data/materiContent';
import {
  faseE, faseF11, faseF12,
  faseEArab, faseF11Arab, faseF12Arab,
  faseE_kemuh, faseF11_kemuh, faseF12_kemuh,
} from '../data/curriculum';

const MAPEL_LABEL = {
  pai: 'Pendidikan Agama Islam dan Budi Pekerti',
  arab: 'Bahasa Arab',
  kemuh: 'Kemuhammadiyahan',
};

function getFaseData(mapel, kelas) {
  if (mapel === 'arab') return kelas === 'X' ? faseEArab : kelas === 'XI' ? faseF11Arab : faseF12Arab;
  if (mapel === 'kemuh') return kelas === 'X' ? faseE_kemuh : kelas === 'XI' ? faseF11_kemuh : faseF12_kemuh;
  return kelas === 'X' ? faseE : kelas === 'XI' ? faseF11 : faseF12;
}

function p(html) {
  return `<p style="margin-bottom:14px; text-align:justify; line-height:1.75;">${html}</p>`;
}

function ul(items = []) {
  if (!items.length) return '';
  return `<ul style="padding-left:22px; margin:0 0 14px 0;">${items.map((i) => `<li style="margin-bottom:8px;">${i}</li>`).join('')}</ul>`;
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function defaultDalil(mapel) {
  if (mapel === 'kemuh') {
    return {
      dalil: 'وَلْتَكُنْ مِنْكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنْكَرِ ۚ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
      arti: 'Dan hendaklah ada di antara kamu segolongan umat yang menyeru kepada kebajikan, menyuruh kepada yang ma\'ruf dan mencegah dari yang munkar; merekalah orang-orang yang beruntung. (QS. Ali \'Imran: 104)',
    };
  }
  if (mapel === 'arab') {
    return {
      dalil: 'إِنَّا أَنْزَلْنَاهُ قُرْآنًا عَرَبِيًّا لَعَلَّكُمْ تَعْقِلُونَ',
      arti: 'Sesungguhnya Kami menurunkannya berupa Al-Qur\'an berbahasa Arab, agar kamu mengerti. (QS. Yusuf: 2)',
    };
  }
  return {
    dalil: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ وَلَا تَمُوتُنَّ إِلَّا وَأَنْتُمْ مُسْلِمُونَ',
    arti: 'Hai orang-orang yang beriman, bertakwalah kepada Allah sebenar-benar takwa kepada-Nya; dan janganlah sekali-kali kamu mati melainkan dalam keadaan beragama Islam. (QS. Ali \'Imran: 102)',
  };
}

function buildPerTemuan(materi, mapel) {
  const tps = Array.isArray(materi.tp) ? materi.tp : [];
  const total = Math.max(1, Number(materi.minggu) || tps.length || 1);
  const jp = Number(materi.alokasi) || total * (mapel === 'pai' ? 3 : 2);
  const jpPer = Math.max(1, Math.round(jp / total));

  return Array.from({ length: total }).map((_, i) => {
    const tp = tps[i] || tps[tps.length - 1] || `Memahami dan mengamalkan materi ${materi.judul}`;
    const fase =
      i === 0 ? 'Eksplorasi konsep' :
      i === total - 1 ? 'Penguatan, presentasi & evaluasi' :
      'Pendalaman & praktik';

    return {
      pertemuan: i + 1,
      fokus: tp,
      alokasi: `${jpPer} JP`,
      fase,
      kegiatan: [
        `Pendahuluan: apersepsi dan tujuan terkait "${tp}".`,
        `Inti: mengkaji konsep, dalil/landasan, dan contoh kontekstual ${materi.judul}.`,
        `Penutup: rangkuman, asesmen formatif singkat, dan tugas mandiri.`,
      ],
      indikator: [
        `Murid mampu menjelaskan poin esensial: ${tp}`,
        `Murid memberi minimal 1 contoh nyata terkait pertemuan ${i + 1}.`,
      ],
    };
  });
}

function synthesizeSections(mapel, materi, existing = []) {
  const judul = materi.judul || 'Materi';
  const elemen = materi.elemen || MAPEL_LABEL[mapel] || 'ISMUBA';
  const tps = Array.isArray(materi.tp) ? materi.tp : [];
  const capaian = materi.capaian || '';
  const dalilPack = defaultDalil(mapel);

  // Jika sudah ada sections rinci dari data, pertahankan dan lengkapi bagian yang kurang
  const have = Array.isArray(existing) ? existing.filter((s) => s && s.title && s.content) : [];

  const generated = [
    {
      title: `A. Pengantar: ${judul}`,
      content:
        p(`Bab ini membahas <strong>${escapeHtml(judul)}</strong> pada elemen <em>${escapeHtml(elemen)}</em> untuk membentuk pemahaman, sikap, dan keterampilan pelajar SMK Muhammadiyah.`) +
        p(`Capaian pembelajaran yang dituju: <em>"${escapeHtml(capaian)}"</em>`) +
        p(`Materi disusun agar murid tidak hanya menghafal konsep, tetapi mampu menalar, mengamalkan, dan merefleksikan nilai dalam kehidupan sekolah, keluarga, dan masyarakat.`),
      dalil: dalilPack.dalil,
      arti: dalilPack.arti,
    },
    {
      title: 'B. Konsep Inti & Kerangka Teori',
      content:
        p(`Kerangka konsep <strong>${escapeHtml(judul)}</strong> dibangun dari definisi, ruang lingkup, dan relevansi dengan kehidupan pelajar.`) +
        p(`Poin-poin esensial yang harus dikuasai:`) +
        ul(
          tps.length
            ? tps.map((tp, i) => `<strong>TP ${i + 1}:</strong> ${escapeHtml(tp)}`)
            : [
                `Pengertian dan ruang lingkup ${escapeHtml(judul)}`,
                `Landasan teologis/historis yang relevan`,
                `Penerapan praktis di lingkungan SMK`,
              ]
        ) +
        p(`Pemahaman konsep ini menjadi dasar asesmen formatif, LKPD/kuis per pertemuan, dan asesmen sumatif bab.`),
    },
    {
      title: 'C. Pembahasan Mendalam per Tujuan Pembelajaran',
      content:
        p(`Setiap Tujuan Pembelajaran (TP) dielaborasi sebagai unit kajian mandiri yang saling terkait.`) +
        tps.map((tp, i) =>
          p(`<strong>Pembahasan TP ${i + 1}.</strong> ${escapeHtml(tp)} — Murid diminta menelaah definisi operasional, mencari dalil/contoh pendukung, lalu menuliskan implikasi sikap. Latihan: buat mind-map 4–6 cabang yang menjelaskan TP ini dengan bahasa sendiri.`)
        ).join('') +
        (tps.length === 0
          ? p(`Fokuskan pembahasan pada pemahaman, analisis, dan penerapan nilai ${escapeHtml(judul)} secara bertahap.`)
          : ''),
    },
    {
      title: 'D. Aplikasi Kontekstual di SMK & Kehidupan Sehari-hari',
      content:
        p(`Aplikasi materi <strong>${escapeHtml(judul)}</strong> diarahkan ke konteks pelajar SMK: kelas, bengkel/praktik, organisasi (IPM/HW/Tapak Suci), keluarga, dan ruang digital.`) +
        ul([
          '<strong>Di sekolah:</strong> adab belajar, kejujuran, kerjasama, dan etos kerja.',
          '<strong>Di rumah:</strong> hormat orang tua, ibadah tertib, dan tanggung jawab pribadi.',
          '<strong>Di masyarakat/digital:</strong> komunikasi santun, menolak hoaks, dan berkontribusi positif.',
        ]) +
        p(`Proyek mini (opsional): susun 1 rencana aksi 7 hari terkait materi ini, lengkap indikator keberhasilan dan refleksi akhir pekan.`),
    },
    {
      title: 'E. Rangkuman, Refleksi & Asesmen Mandiri',
      content:
        p(`<strong>Rangkuman:</strong> ${escapeHtml(judul)} membentuk kompetensi pengetahuan, sikap, dan keterampilan yang selaras dengan profil pelajar berkemajuan.`) +
        p(`<strong>Refleksi:</strong> Apa 1 kebiasaan yang akan kamu ubah setelah mempelajari bab ini? Mengapa penting?`) +
        p(`<strong>Asesmen mandiri (jawablah di buku catatan):</strong>`) +
        ul([
          `Jelaskan pengertian ${escapeHtml(judul)} dalam 3–5 kalimat.`,
          'Sebutkan 2 dalil/landasan atau tokoh/konsep kunci yang relevan.',
          'Berikan 2 contoh nyata pengamalan di sekolah.',
          'Tuliskan 1 komitmen pribadi terukur untuk 1 minggu ke depan.',
        ]),
    },
  ];

  if (have.length >= 3) {
    // sisipkan bagian aplikasi & rangkuman jika belum ada
    const titles = have.map((s) => String(s.title || '').toLowerCase());
    const extra = [];
    if (!titles.some((t) => t.includes('aplikasi') || t.includes('aktualisasi') || t.includes('praktik'))) {
      extra.push(generated[3]);
    }
    if (!titles.some((t) => t.includes('rangkuman') || t.includes('refleksi') || t.includes('asesmen'))) {
      extra.push(generated[4]);
    }
    return [...have, ...extra];
  }

  // Gabungkan existing + generated tanpa duplikasi judul kasar
  const merged = [...have];
  generated.forEach((g) => {
    const key = g.title.slice(0, 12).toLowerCase();
    if (!merged.some((s) => String(s.title || '').toLowerCase().includes(key.slice(0, 8)))) {
      merged.push(g);
    }
  });
  return merged.length ? merged : generated;
}

function defaultRujukan(mapel) {
  if (mapel === 'kemuh') {
    return [
      'Buku Kemuhammadiyahan Majelis Dikdasmen PP Muhammadiyah (sesuai kelas).',
      'Haedar Nashir, Muhammadiyah Gerakan Pembaruan.',
      'Sistem Perkaderan Muhammadiyah (SPM) — Majelis Pendidikan Kader PP Muhammadiyah.',
      'Tafsir At-Tanwir, Majelis Tarjih dan Tajdid PP Muhammadiyah.',
    ];
  }
  if (mapel === 'arab') {
    return [
      'Buku Teks Bahasa Arab Kurikulum Merdeka (sesuai fase/kelas).',
      'Kamus Al-Munawwir Arab–Indonesia.',
      'Materi nahwu–sharaf dasar untuk madrasah/SMK.',
      'Al-Qur\'an dan Terjemahannya, Kemenag RI.',
    ];
  }
  return [
    'Buku Pendidikan Agama Islam dan Budi Pekerti Kurikulum Merdeka (sesuai kelas).',
    'Al-Qur\'an dan Terjemahannya, Kemenag RI.',
    'Tafsir At-Tanwir, Majelis Tarjih dan Tajdid PP Muhammadiyah.',
    'Tafsir Al-Azhar, Buya HAMKA (sebagai pengayaan).',
  ];
}

/**
 * @returns {{
 *  mapel, kelas, bab, meta, ringkasan, sections, pertemuan, glosarium, rujukan, evaluasi
 * }}
 */
export function getBahanAjarLengkap(mapel = 'pai', kelas = 'X', bab = 1) {
  const m = String(mapel || 'pai').toLowerCase();
  const k = String(kelas || 'X').toUpperCase();
  const b = Number(bab) || 1;

  const faseData = getFaseData(m, k);
  const allMateri = [
    ...(faseData?.semester?.ganjil?.materi || []),
    ...(faseData?.semester?.genap?.materi || []),
  ];
  const materi = allMateri.find((x) => Number(x.bab) === b) || allMateri[0] || {
    bab: b,
    judul: `Bab ${b}`,
    elemen: MAPEL_LABEL[m] || 'ISMUBA',
    tp: [],
    capaian: '',
    minggu: 1,
    alokasi: 2,
  };

  const raw = detailedMateri?.[m]?.[k]?.[b] || detailedMateri?.[m]?.[k]?.[String(b)] || null;

  const sections = synthesizeSections(m, materi, raw?.sections || []);
  const ringkasan =
    raw?.ringkasan ||
    `Kajian rinci tentang ${materi.judul} (elemen ${materi.elemen || MAPEL_LABEL[m]}) yang memadukan konsep, dalil/landasan, aplikasi kontekstual, dan refleksi karakter pelajar SMK Muhammadiyah.`;

  const pertemuan = buildPerTemuan(materi, m);

  const glosarium = [
    { istilah: materi.elemen || 'Elemen CP', arti: `Ruang lingkup capaian pembelajaran yang menaungi bab ${materi.judul}.` },
    { istilah: 'TP', arti: 'Tujuan Pembelajaran — indikator capaian yang diukur pada proses dan asesmen.' },
    { istilah: 'Refleksi', arti: 'Kegiatan menimbang ulang pemahaman dan merencanakan perubahan sikap.' },
  ];

  const evaluasi = [
    `Uraikan pengertian ${materi.judul} secara ringkas dan tepat.`,
    ...(Array.isArray(materi.tp) ? materi.tp.slice(0, 2).map((tp) => `Jelaskan dan berikan contoh terkait: ${tp}`) : []),
    `Buat satu rencana aksi 7 hari yang mencerminkan pengamalan ${materi.judul}.`,
  ];

  return {
    mapel: m,
    kelas: k,
    bab: Number(materi.bab) || b,
    meta: {
      judul: materi.judul,
      elemen: materi.elemen || MAPEL_LABEL[m],
      mapelLabel: MAPEL_LABEL[m] || m,
      fase: faseData?.fase || (k === 'X' ? 'E' : 'F'),
      alokasi: materi.alokasi,
      minggu: materi.minggu,
      capaian: materi.capaian || '',
      tp: Array.isArray(materi.tp) ? materi.tp : [],
      semester: (faseData?.semester?.ganjil?.materi || []).some((x) => Number(x.bab) === b) ? 'Ganjil' : 'Genap',
    },
    ringkasan,
    sections,
    pertemuan,
    glosarium,
    rujukan: (raw?.rujukan && raw.rujukan.length ? raw.rujukan : defaultRujukan(m)),
    evaluasi,
    source: raw ? 'dataset' : 'synthesized',
  };
}

export function listBahanAjarBab(mapel = 'pai', kelas = 'X') {
  const faseData = getFaseData(String(mapel).toLowerCase(), String(kelas).toUpperCase());
  return [
    ...(faseData?.semester?.ganjil?.materi || []).map((m) => ({ ...m, semester: 'ganjil' })),
    ...(faseData?.semester?.genap?.materi || []).map((m) => ({ ...m, semester: 'genap' })),
  ];
}

export default getBahanAjarLengkap;
