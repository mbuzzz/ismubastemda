import React from 'react';
export const getDplForBab = (fase, bab, mapel = 'pai') => {
  const dplNames = {
    keimanan: "Keimanan dan Ketakwaan kepada Tuhan YME",
    kewargaan: "Kewargaan (Citizenship)",
    penalaran: "Penalaran Kritis",
    kreativitas: "Kreativitas",
    kolaborasi: "Kolaborasi",
    kemandirian: "Kemandirian",
    kesehatan: "Kesehatan",
    komunikasi: "Komunikasi"
  };

  if (mapel === 'arab') {
    return [
      { nama: dplNames.komunikasi, deskripsi: "Lulusan mampu berkomunikasi dalam Bahasa Arab sederhana secara lisan dan tulisan untuk keperluan sehari-hari dan keagamaan." },
      { nama: dplNames.kemandirian, deskripsi: "Lulusan memiliki inisiatif mandiri dalam memperkaya kosakata dan praktik berbahasa Arab di luar kelas." },
      { nama: dplNames.penalaran, deskripsi: "Lulusan mampu menganalisis struktur tata bahasa Arab (nahwu dan sharaf) secara logis dan sistematis." },
    ];
  }

  if (mapel === 'kemuh') {
    return [
      { nama: dplNames.keimanan, deskripsi: "Lulusan memiliki komitmen spiritual yang kuat sebagai pelajar Muhammadiyah yang religius dan berakhlak mulia." },
      { nama: dplNames.kemandirian, deskripsi: "Lulusan memiliki integritas moral, etos belajar, dan kemandirian sebagai kader persyarikatan Muhammadiyah." },
      { nama: dplNames.kewargaan, deskripsi: "Lulusan aktif berpartisipasi dalam dakwah kemasyarakatan dan organisasi otonom Muhammadiyah demi kemaslahatan bangsa." },
      { nama: dplNames.penalaran, deskripsi: "Lulusan mampu menganalisis secara kritis ideologi, sejarah, dan pemikiran kemasyarakatan dalam Muhammadiyah." }
    ];
  }

  if (fase === 'E') {
    switch (bab) {
      case 1: // Fastabiqul Khairat
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan membuktikan ketakwaan dengan senantiasa bersemangat melaksanakan amal saleh dan beribadah secara ikhlas." },
          { nama: dplNames.kewargaan, deskripsi: "Lulusan menunjukkan kepedulian sosial yang tinggi dengan berkontribusi aktif berbuat kebaikan (fastabiqul khairat) di tengah masyarakat." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu menganalisis pentingnya etos kerja dalam Islam dan merefleksikannya dalam kehidupan sehari-hari." },
          { nama: dplNames.kolaborasi, deskripsi: "Lulusan mampu bekerja sama dan saling tolong-menolong dalam menyebarkan nilai-nilai kebaikan di lingkungan sekolah." }
        ];
      case 2: // Syu'abul Iman
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan memperkokoh pilar keyakinan spiritual melalui pemahaman dan pengamalan 77 cabang iman (syu'abul iman) secara menyeluruh." },
          { nama: dplNames.kemandirian, deskripsi: "Lulusan menunjukkan integritas diri yang kuat dan bertanggung jawab menjaga kualitas keimanan pribadinya." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu menelaah korelasi antara iman, Islam, dan ihsan secara logis dan reflektif." }
        ];
      case 3: // Penyakit Hati
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan membiasakan perilaku etis dan ikhlas dalam beramal tanpa mengharapkan pujian manusia (riya' dan sum'ah)." },
          { nama: dplNames.kesehatan, deskripsi: "Lulusan mampu mengelola emosi dan membersihkan hati dari penyakit batin untuk mewujudkan kesehatan mental (well-being) yang tenang." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu membedakan perilaku hidup sederhana dari gaya hidup berfoya-foya secara analitis." }
        ];
      case 4: // Sumber Hukum Islam
        return [
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu menelaah validitas dan kedudukan Al-Qur'an, Hadis, dan Ijtihad sebagai sumber hukum Islam secara logis." },
          { nama: dplNames.kemandirian, deskripsi: "Lulusan memiliki inisiatif tinggi untuk mendalami hukum-hukum syariat yang relevan dengan kehidupan modern secara mandiri." },
          { nama: dplNames.komunikasi, deskripsi: "Lulusan mampu mempresentasikan argumentasi fikih dan hasil ijtihad secara lisan maupun tulisan secara terstruktur dan santun." }
        ];
      case 5: // Sejarah Islam
        return [
          { nama: dplNames.kewargaan, deskripsi: "Lulusan mencintai warisan peradaban Islam dan mengambil ibrah (pelajaran) sejarah untuk berkontribusi bagi kemajuan bangsa." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu menilai secara kritis faktor kejayaan dan kemunduran sejarah dakwah Islam di masa lampau." },
          { nama: dplNames.kreativitas, deskripsi: "Lulusan terinspirasi mengembangkan strategi dakwah yang kreatif, fleksibel, dan inovatif di era digital." }
        ];
      case 6: // Pergaulan Bebas & Zina
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan menjaga kesucian diri dan moralitas etis sesuai syariat Islam demi menjaga martabat kemanusiaan." },
          { nama: dplNames.kewargaan, deskripsi: "Lulusan menaati aturan agama dan sosial serta aktif mencegah terjadinya dekadensi moral di kalangan remaja." },
          { nama: dplNames.kolaborasi, deskripsi: "Lulusan bekerja sama secara aktif dengan teman sebaya untuk membangun jejaring pertemanan sehat dan produktif." }
        ];
      case 7: // Syu'abul Iman Genap
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan mempraktikkan cabang-cabang iman dalam aktivitas sehari-hari seperti memenuhi janji dan mensyukuri nikmat." },
          { nama: dplNames.kemandirian, deskripsi: "Lulusan disiplin mengelola prioritas diri dan bertindak berdasarkan inisiatif moral yang bertanggung jawab." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan merefleksikan hikmat dan manfaat dari penerapan syu'abul iman secara mendalam bagi kehidupan pribadi." }
        ];
      case 8: // Penyakit Hati Genap
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan mempraktikkan kejujuran, kerendahan hati, dan berperilaku etis sesuai tuntunan Nabi Muhammad SAW." },
          { nama: dplNames.kesehatan, deskripsi: "Lulusan terampil mengelola stres dan meredam kemarahan (ghadhab) untuk memelihara kesehatan mental yang seimbang." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan menganalisis dampak psikologis dan sosial dari sikap hasad dan sombong secara objektif." }
        ];
      case 9: // Al-Kulliyatu Al-Khamsah
        return [
          { nama: dplNames.penalaran, deskripsi: "Lulusan menganalisis urgensi menjaga lima prinsip dasar hukum Islam (jiwa, keyakinan, akal, keturunan, harta) secara logis." },
          { nama: dplNames.kemandirian, deskripsi: "Lulusan mengambil tanggung jawab pribadi untuk memelihara kesehatan akal dan fisiknya secara mandiri." },
          { nama: dplNames.komunikasi, deskripsi: "Lulusan mampu mendialogkan hak asasi manusia dalam perspektif Islam secara efektif." }
        ];
      case 10: // Tokoh Ulama Nusantara
        return [
          { nama: dplNames.kewargaan, deskripsi: "Lulusan mencintai tanah air dan meneladani toleransi serta kearifan lokal para ulama Nusantara dalam berdakwah." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan menelaah karya tulis klasik dan sejarah dakwah Wali Songo secara analitis and reflektif." },
          { nama: dplNames.kreativitas, deskripsi: "Lulusan terinspirasi menciptakan ide orisinal untuk menyebarkan Islam yang ramah (rahmatan lil alamin) melalui media modern." }
        ];
      default:
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan memiliki integritas spiritual dan moralitas kokoh." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu bernalar kritis dalam mendalami ajaran Islam." }
        ];
    }
  } else {
    // Fase F (Kelas XI)
    switch (bab) {
      case 1: // Berpikir Kritis
        return [
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu berpikir secara logis, analitis, dan reflektif dalam menganalisis kandungan QS. Ali 'Imran/3: 190-191 mengenai pentingnya berpikir kritis dalam memahami fenomena alam." },
          { nama: dplNames.keimanan, deskripsi: "Lulusan memiliki keyakinan spiritual yang kokoh dengan mentadabburi kebesaran Allah SWT melalui ciptaan-Nya di alam semesta." },
          { nama: dplNames.komunikasi, deskripsi: "Lulusan mampu menyampaikan ide dan argumen secara efektif dan santun tentang pentingnya berpikir kritis dalam menyikapi berbagai informasi." }
        ];
      case 2: // Akhlak Terpuji
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan membuktikan keimanan dengan berperilaku etis, senantiasa memenuhi janji, mensyukuri nikmat, menjaga lisan, dan menutupi aib orang lain." },
          { nama: dplNames.kemandirian, deskripsi: "Lulusan memiliki komitmen pribadi yang teguh untuk mengelola perilaku dan bertindak berdasarkan inisiatif moral yang luhur." },
          { nama: dplNames.komunikasi, deskripsi: "Lulusan mampu berkomunikasi dengan tutur kata yang santun dan menjaga lisan dari ghibah atau kata-kata yang menyakitkan." }
        ];
      case 3: // Penyakit Sosial
        return [
          { nama: dplNames.kewargaan, deskripsi: "Lulusan memiliki kepedulian sosial yang tinggi dengan berkontribusi aktif dalam mencegah dan menolak perundungan (bullying) serta perkelahian pelajar di lingkungan sekolah." },
          { nama: dplNames.kesehatan, deskripsi: "Lulusan mampu mengelola stres dan emosi negatif secara baik untuk menjaga keseimbangan kesehatan mental (well-being) dan menghindari perilaku menyimpang seperti perjudian." },
          { nama: dplNames.kolaborasi, deskripsi: "Lulusan memiliki keterampilan bekerja sama dalam membangun kampanye sekolah damai dan menyelesaikan konflik antarteman secara konstruktif." }
        ];
      case 4: // Khutbah, Tablig, Dakwah
        return [
          { nama: dplNames.komunikasi, deskripsi: "Lulusan terampil menyusun teks dan menyampaikan pesan-pesan keagamaan dalam khutbah, tablig, dan dakwah secara efektif, santun, serta adaptif terhadap audiens remaja." },
          { nama: dplNames.kreativitas, deskripsi: "Lulusan mampu mengolah ide-ide inovatif untuk merancang media dakwah kreatif yang relevan dengan perkembangan zaman." },
          { nama: dplNames.kolaborasi, deskripsi: "Lulusan bekerja sama secara harmonis dalam menyebarkan ajaran Islam yang damai dan menyejukkan." }
        ];
      case 5: // Ulama Indonesia
        return [
          { nama: dplNames.kewargaan, deskripsi: "Lulusan menumbuhkan rasa cinta tanah air dan meneladani dedikasi ulama Nusantara dalam memajukan peradaban keilmuan global." },
          { nama: dplNames.kemandirian, deskripsi: "Lulusan memiliki ketangguhan belajar yang tinggi, disiplin mengatur prioritas, dan bertanggung jawab penuh atas masa depannya." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu menelaah biografi, karya ilmiah, dan kegigihan ulama sejarah sebagai sumber inspirasi intelektual." }
        ];
      case 6: // Mencintai IPTEK (Q.S. al-Alaq & ar-Rahman) — Versi PP
        return [
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu menelaah perintah Iqra' (Q.S. al-Alaq/96: 1-5) dan isyarat iptek (Q.S. ar-Rahman/55: 33) secara analitis untuk mengembangkan wawasan keilmuan." },
          { nama: dplNames.keimanan, deskripsi: "Lulusan memperkuat iman melalui tadabbur ciptaan Allah dan semangat menuntut ilmu sebagai ibadah." },
          { nama: dplNames.kreativitas, deskripsi: "Lulusan termotivasi mengembangkan inovasi iptek yang maslahat sebagai Pelajar Muhammadiyah yang mencintai ilmu." },
          { nama: dplNames.kemandirian, deskripsi: "Lulusan disiplin belajar mandiri dan proaktif memanfaatkan teknologi untuk kebaikan." }
        ];
      case 7: // Muru'ah, Ikhlas, Malu, Zuhud — Versi PP
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan mempraktikkan keimanan yang ikhlas, memiliki rasa malu (haya') dalam berbuat maksiat, serta senantiasa menjaga kehormatan diri (muru'ah)." },
          { nama: dplNames.kemandirian, deskripsi: "Lulusan tangguh dalam mengendalikan nafsu duniawi (zuhud) dan bertanggung jawab penuh atas keputusan moral pribadinya." },
          { nama: dplNames.kesehatan, deskripsi: "Lulusan mengelola stres duniawi dan mencapai kesejahteraan mental melalui ketulusan hati, rasa malu, dan sikap qana'ah." }
        ];
      case 8: // Anti Khamr & Narkoba — Versi PP
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan menjauhi khamr dan narkoba sebagai bentuk ketaatan syariat demi menjaga agama, akal, dan jiwa." },
          { nama: dplNames.kesehatan, deskripsi: "Lulusan memahami bahaya minuman keras dan narkoba bagi kesehatan akal, jiwa, dan raga serta memilih gaya hidup sehat." },
          { nama: dplNames.kewargaan, deskripsi: "Lulusan berkomitmen sebagai generasi muda anti narkoba yang taat hukum agama dan hukum positif negara." },
          { nama: dplNames.kolaborasi, deskripsi: "Lulusan aktif mengampanyekan gerakan anti minuman keras dan narkoba di lingkungan sekolah." }
        ];
      case 9: // Ekonomi Islam (Asuransi, Bank, Koperasi Syariah) — Versi PP
        return [
          { nama: dplNames.penalaran, deskripsi: "Lulusan menganalisis prinsip dan operasional asuransi syariah, bank syariah, serta koperasi syariah secara logis." },
          { nama: dplNames.kemandirian, deskripsi: "Lulusan memiliki kesadaran finansial yang berintegritas dengan memilih produk ekonomi syariah." },
          { nama: dplNames.kewargaan, deskripsi: "Lulusan menumbuhkan kebanggaan terhadap sistem ekonomi Islam yang berkeadilan dan bermaslahat bagi masyarakat." }
        ];
      case 10: // Kebangkitan Islam Modern — Versi PP
        return [
          { nama: dplNames.penalaran, deskripsi: "Lulusan menelaah pemikiran dan gerakan pembaruan tokoh Islam modern (al-Afghani, Abduh, Rasyid Ridha, K.H. Ahmad Dahlan) secara kritis." },
          { nama: dplNames.kewargaan, deskripsi: "Lulusan meneladani semangat kebangkitan Islam untuk berkontribusi memajukan bangsa dan umat." },
          { nama: dplNames.kreativitas, deskripsi: "Lulusan terinspirasi mengembangkan inovasi dakwah dan pendidikan berlandaskan semangat tajdid para pembaru." }
        ];
      default:
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan memiliki integritas spiritual dan moralitas kokoh." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu bernalar kritis dalam mendalami ajaran Islam." }
        ];
    }
  }

  // Fallback default for Fase F or other unhandled cases
  return [
    { nama: dplNames.keimanan, deskripsi: "Lulusan memiliki integritas spiritual dan moralitas kokoh." },
    { nama: dplNames.penalaran, deskripsi: "Lulusan mampu bernalar kritis dalam mendalami ajaran Islam." }
  ];
};

const defaultLangkahPendahuluan = [
  "Guru mengucapkan salam Islami (Assalamu'alaikum Wr. Wb.), menunjuk ketua kelas memimpin doa, dan mengecek kehadiran murid.",
  "Melakukan ice breaking spiritual singkat (misal: tadabbur ayat atau kutipan mutiara Islam) untuk membangun suasana kelas yang kondusif.",
  "Guru menyampaikan apersepsi dengan mengaitkan materi sebelumnya dengan tema yang akan dipelajari.",
  "Menyampaikan tujuan pembelajaran, kompetensi yang akan dicapai, dan manfaat materi bagi kehidupan sehari-hari.",
  "Memberikan pretest lisan singkat (3-5 pertanyaan) untuk mengukur pemahaman awal murid."
];

const defaultLangkahInti = [
  "Murid dibagi dalam kelompok heterogen (4-5 orang) dan menerima LKPD yang relevan.",
  "Guru menayangkan video/powerpoint singkat yang memantik rasa ingin tahu tentang topik bahasan.",
  "Setiap kelompok mendiskusikan pertanyaan inti dalam LKPD dengan mengacu pada sumber belajar (buku teks, Al-Qur'an, artikel).",
  "Guru berkeliling memfasilitasi diskusi kelompok, memberikan scaffolding bagi kelompok yang mengalami kesulitan.",
  "Perwakilan kelompok mempresentasikan hasil diskusi di depan kelas secara bergantian.",
  "Kelompok lain menanggapi dengan pertanyaan atau tambahan informasi; guru meluruskan miskonsepsi."
];

const defaultLangkahPenutup = [
  "Guru bersama murid merangkum poin-poin esensial pembelajaran hari ini.",
  "Murid menuliskan refleksi singkat (jurnal belajar) tentang pemahaman baru yang diperoleh.",
  "Guru memberikan umpan balik terhadap proses dan hasil belajar murid.",
  "Guru menyampaikan rencana pertemuan berikutnya dan memberikan tugas pengayaan mandiri.",
  "Menutup pembelajaran dengan doa kafaratul majelis dan salam."
];

/**
 * Bangun daftar tugas LKPD lengkap yang selaras dengan TP (inti pembelajaran).
 * customLkpd dari bank per-bab digabung tanpa duplikasi.
 */
export const buildLkpdFromMateri = (materi = {}, mapel = 'pai', customLkpd = []) => {
  const judul = (materi.judul || 'materi pembelajaran').trim();
  const elemen = (materi.elemen || '').trim();
  const tps = Array.isArray(materi.tp) ? materi.tp.filter(Boolean) : [];
  const tasks = [];

  const labelMapel =
    mapel === 'arab' ? 'Bahasa Arab' : mapel === 'kemuh' ? 'Kemuhammadiyahan' : 'PAI dan Budi Pekerti';

  tasks.push(
    `Orientasi Materi: Tuliskan 3 konsep kunci dari materi "${judul}"${elemen ? ` (Elemen: ${elemen})` : ''} yang paling esensial bagi pelajar SMK, lalu jelaskan mengapa ketiganya penting!`
  );

  tps.forEach((tp, i) => {
    const n = i + 1;
    const cleanTp = String(tp).trim().replace(/\.$/, '');
    if (i === 0) {
      tasks.push(
        `Kegiatan ${n} — Memahami (TP ${n}): ${cleanTp}. Uraikan pemahaman kelompok dengan bahasa sendiri, lengkapi minimal 1 dalil/contoh pendukung yang relevan dengan ${labelMapel}!`
      );
    } else if (i === tps.length - 1) {
      tasks.push(
        `Kegiatan ${n} — Menerapkan & Merefleksi (TP ${n}): ${cleanTp}. Susun rencana aksi nyata minimal 3 langkah agar TP ini terwujud di sekolah/rumah dalam 1 pekan, lengkap dengan indikator keberhasilan!`
      );
    } else {
      tasks.push(
        `Kegiatan ${n} — Menganalisis (TP ${n}): ${cleanTp}. Analisis satu studi kasus kontekstual (sekolah/masyarakat/digital). Tuliskan: (a) inti masalah, (b) sebab-akibat, (c) solusi sesuai nilai materi!`
      );
    }
  });

  (customLkpd || []).forEach((q) => {
    if (!q || typeof q !== 'string') return;
    const snippet = q.slice(0, 48).toLowerCase();
    const already = tasks.some((t) => t.toLowerCase().includes(snippet));
    if (!already) tasks.push(q);
  });

  tasks.push(
    `Sintesis Kelompok: Susun kesimpulan utuh (5–7 kalimat) yang menghubungkan seluruh Tujuan Pembelajaran bab "${judul}" dengan perilaku sehari-hari murid SMK!`
  );
  tasks.push(
    `Produk Presentasi: Buat ringkasan visual (mind map / poster / 3–5 slide) berisi alur: konsep inti → dalil/landasan → contoh nyata → aksi tindak lanjut dari materi "${judul}"!`
  );
  tasks.push(
    `Refleksi Individu: Apa 1 kebiasaan baru yang akan Anda ubah setelah mempelajari materi ini? Tuliskan alasan teologis/moralnya dan cara mengukurnya selama seminggu!`
  );

  return tasks;
};

export const generateDynamicLangkahInti = (targetTp, meetingIndex = 0) => {
  if (!targetTp || typeof targetTp !== 'string') {
    return [
      'Murid mengamati pemaparan materi inti dan mencatat poin-poin penting secara mandiri.',
      'Murid berdiskusi kelompok menyelesaikan LKPD terkait materi pertemuan hari ini.',
      'Murid mempresentasikan hasil diskusi, saling memberi umpan balik, dan merumuskan kesimpulan bersama.',
    ];
  }

  // Lowercase to check keywords
  const tpLower = targetTp.toLowerCase();
  const isPraktik = /membaca|menghafal|melafalkan|tajwid|menerjemahkan|hiwar|percakapan|menulis|menyalin/i.test(tpLower);

  // Extract a meaningful snippet if TP is too long (optional, but requested to keep TP flow nice)
  // We'll use the full TP but lowercase the first letter to fit naturally mid-sentence, 
  // unless it starts with a proper noun or abbreviation (QS., KH., dll).
  let tpText = targetTp.trim();
  if (!/^(QS\.|KH\.|Muhammadiyah|Islam|Allah|Rasulullah)/i.test(tpText)) {
    tpText = tpText.charAt(0).toLowerCase() + tpText.slice(1);
  }

  // Remove trailing period if exists
  if (tpText.endsWith('.')) tpText = tpText.slice(0, -1);

  let tahapan = [];

  // Bank Variasi Teks
  if (isPraktik) {
    // Variasi Membaca/Menghafal/Praktik (C1-C6)
    const varMemahami = [
      `Murid menyimak demonstrasi bacaan atau pelafalan terkait ${tpText} untuk mengingat kembali makharijul huruf dan tajwid dasar, kemudian mempraktikkan ulang secara mandiri agar memahami kaidah bacaannya.`,
      `Guru memberikan contoh pelafalan teks terkait ${tpText}. Murid mengidentifikasi pola bacaannya dan mencoba melafalkannya kembali dengan gaya mereka sendiri untuk memastikan pemahaman struktur teks.`,
      `Murid melakukan pengamatan pada pedoman tajwid/makhraj dari ${tpText} untuk mengingat kembali aturan dasar, lalu secara mandiri menjabarkan ulang kaidah tersebut sebelum memulai praktik.`
    ];
    
    const varMengaplikasi = [
      `Murid berlatih secara berpasangan/berkelompok untuk mengaplikasikan kaidah bacaan pada ${tpText} secara tartil/lancar, lalu saling mengoreksi dan membedah letak kesalahan makhraj temannya.`,
      `Dengan bimbingan guru, murid menggunakan pedoman tajwid/nahwu untuk membedah struktur kata/ayat pada ${tpText}, menguraikan hukum bacaan yang terkandung pada bagian-bagian kalimat tersebut.`,
      `Kelompok murid menerapkan teori bacaan pada ${tpText} di situasi simulasi yang baru, memecah susunan ayat atau kalimat kompleks menjadi bagian-bagian yang mudah dianalisis kesesuaiannya.`
    ];

    const varMerefleksi = [
      `Sesi diakhiri dengan unjuk kerja perwakilan murid membacakan ${tpText}. Kelompok lain mengevaluasi kelancaran bacaan, dilanjutkan dengan guru memberikan panduan akhir untuk perbaikan secara keseluruhan.`,
      `Murid menyetorkan hafalan/bacaan terkait ${tpText} untuk dikritisi ketepatannya oleh forum. Melalui refleksi ini, mereka mampu merangkai catatan perbaikan (karya/resume bacaan) yang aplikatif.`,
      `Melalui forum evaluasi bersama, murid menilai validitas makhraj dan intonasi antarkelompok. Setelah itu, mereka menyusun ringkasan utuh sebagai pembuktian penguasaan praktik ${tpText}.`
    ];

    tahapan = [
      varMemahami[meetingIndex % varMemahami.length],
      varMengaplikasi[meetingIndex % varMengaplikasi.length],
      varMerefleksi[meetingIndex % varMerefleksi.length]
    ];

  } else {
    // Variasi Teori/Analisis Konsep (C1-C6)
    const varMemahami = [
      `Murid mengamati pemaparan awal mengenai ${tpText} guna menggali informasi dasar, dilanjutkan dengan diskusi kelas agar mereka dapat mendeskripsikan ulang konsep tersebut dengan kata-kata sendiri.`,
      `Guru menyajikan stimulus terkait ${tpText}. Murid kemudian mengidentifikasi informasi esensial dan menjabarkan pemahaman mereka secara lisan dengan penalaran mandiri.`,
      `Berbekal literatur mengenai ${tpText}, murid melakukan pengamatan untuk mengingat kembali poin kunci materi dan merekonstruksi makna utamanya di bawah bimbingan guru.`
    ];

    const varMengaplikasi = [
      `Pada tahap ini, murid bekerja dalam kelompok untuk menerapkan konsep ${tpText} ke dalam studi kasus LKPD, lalu membedah struktur masalah tersebut menjadi komponen yang lebih rinci.`,
      `Murid menggunakan prinsip ${tpText} untuk menyelesaikan penugasan kolaboratif, serta menguraikan keterkaitan antar variabel dalam permasalahan kontekstual yang disajikan.`,
      `Dengan scaffolding dari guru, kelompok murid mengaplikasikan teori ${tpText} pada situasi masalah yang baru, memecah informasi kompleks menjadi bagian-bagian yang lebih analitis.`
    ];

    const varMerefleksi = [
      `Kegiatan ditutup dengan presentasi kelompok, di mana murid saling mengevaluasi temuan terkait ${tpText}, meluruskan miskonsepsi bersama guru, dan merumuskan kesimpulan akhir yang padu.`,
      `Murid memaparkan hasil analisis ${tpText} untuk dikritisi secara logis oleh kelompok lain. Guru dan murid kemudian bersama-sama merangkai gagasan aplikatif sebagai bentuk refleksi.`,
      `Melalui forum tanya jawab, murid menilai keakuratan argumen antarkelompok. Setelah itu, mereka menyusun draf karya atau ringkasan utuh sebagai pembuktian komprehensif atas penguasaan ${tpText}.`
    ];

    tahapan = [
      varMemahami[meetingIndex % varMemahami.length],
      varMengaplikasi[meetingIndex % varMengaplikasi.length],
      varMerefleksi[meetingIndex % varMerefleksi.length]
    ];
  }

  return tahapan;
};

export const getPpmDetails = (fase, bab, mapel = 'pai', kelas = 'X', materi = null) => {
  const defaultSaranaPAI = [
    "LCD Projector, Laptop, dan Jaringan Internet (Wifi)",
    "Buku Ajar PAI & Budi Pekerti Kurikulum Merdeka Kelas " + (fase === 'E' ? 'X' : fase === 'F' ? 'XI/XII' : ''),
    "Mushaf Al-Qur'an dan Terjemahannya",
    "PowerPoint Presentasi interaktif & Video Pembelajaran Islami"
  ];
  const defaultSaranaArab = [
    "LCD Projector, Laptop, dan Jaringan Internet (Wifi)",
    "Buku Ajar Bahasa Arab Kurikulum Merdeka",
    "Kamus Arab-Indonesia dan Indonesia-Arab",
    "Audio/Video Percakapan Bahasa Arab dan Kartu Mufradat"
  ];
  const defaultSaranaKemuh = [
    "LCD Projector, Laptop, dan Jaringan Internet (Wifi)",
    "Buku Ajar Kemuhammadiyahan Kurikulum Merdeka",
    "Dokumen AD/ART Muhammadiyah dan Buku Pedoman Hidup Islami Warga Muhammadiyah (PHIWM)",
    "PowerPoint Presentasi interaktif & Video Profil Amal Usaha Muhammadiyah"
  ];

  const defaultPp = [
    "Bagaimana kaitan materi ini dengan akhlak keseharian Anda?",
    "Apa tantangan terbesar dalam mempraktikkan materi ini?",
    "Sebutkan hikmah penting dari mempelajari bab ini!"
  ];

  const defaultLkpd = [
    "Tuliskan 3 poin penting yang Anda pahami dari materi ini!",
    "Berikan contoh nyata penerapan materi ini di lingkungan sekolah!",
    "Buatlah kesimpulan kelompok tentang hikmah mempelajari bab ini!"
  ];

  const details = {
    pemahamanBermakna: mapel === 'arab' ? "Bahasa Arab adalah kunci memahami sumber utama ajaran Islam (Al-Qur'an dan Hadis) serta jendela peradaban ilmu pengetahuan Islam." : mapel === 'kemuh' ? "Memahami persyarikatan Muhammadiyah membekali murid dengan identitas moral, etos kemajuan, dan jiwa kepemimpinan kemasyarakatan." : "Ajaran Islam memberikan pedoman hidup komprehensif bagi pembentukan kepribadian muslim yang berakhlak mulia, tangguh, dan maslahat bagi sesama.",
    pertanyaanPemantik: defaultPp,
    saranaPrasarana: mapel === 'arab' ? defaultSaranaArab : mapel === 'kemuh' ? defaultSaranaKemuh : defaultSaranaPAI,
    pengayaan: mapel === 'arab' ? "Bagi murid yang telah mencapai KKTP diberikan tugas membaca teks Arab sederhana dan menerjemahkannya ke dalam Bahasa Indonesia." : mapel === 'kemuh' ? "Bagi murid yang telah mencapai KKTP diberikan tugas membaca dokumen khittah perjuangan atau AD/ART Muhammadiyah secara mendalam." : "Bagi murid yang telah mencapai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) diberikan tugas mandiri menganalisis studi kasus atau menulis artikel reflektif keagamaan tingkat lanjut.",
    remedial: mapel === 'arab' ? "Bagi murid yang belum memenuhi KKTP diberikan bimbingan perorangan, pengulangan mufradat, atau penugasan menulis ulang kosakata/kalimat yang belum dikuasai." : mapel === 'kemuh' ? "Bagi murid yang belum memenuhi KKTP diberikan bimbingan khusus, pendampingan memahami bagan struktur organisasi, atau merangkum konsep dasar Ortom." : "Bagi murid yang belum memenuhi KKTP diberikan bimbingan perorangan, tutor sebaya, atau penugasan terstruktur untuk mengulang konsep esensial yang belum dipahami.",
    langkahPendahuluan: [...defaultLangkahPendahuluan],
    langkahInti: [...defaultLangkahInti],
    langkahPenutup: [...defaultLangkahPenutup],
    lkpd: [...defaultLkpd],
    asesmenDiagnostik: mapel === 'arab' ? "Mengajukan 3-5 pertanyaan lisan tentang kosakata/ungkapan Arab yang sudah dikenal murid." : mapel === 'kemuh' ? "Tanya jawab pemantik lisan tentang pemahaman awal murid mengenai kepemimpinan dan amal usaha Muhammadiyah." : "Tanya jawab pemantik lisan untuk menguji pemahaman dalil atau konsep awal keagamaan secara acak.",
    asesmenFormatif: mapel === 'arab' ? "Observasi partisipasi murid dalam percakapan, pengisian LKPD, dan ketepatan pelafalan mufradat." : mapel === 'kemuh' ? "Pengerjaan lembar kerja kelompok (LKPD), pengamatan adab dan akhlak kader, serta keaktifan simulasi berorganisasi." : "Pengerjaan lembar kerja kelompok (LKPD), pengamatan sikap berakhlak murid, dan keaktifan berkolaborasi.",
    asesmenSumatif: mapel === 'arab' ? "Tes tulis kosakata/pola kalimat, unjuk kerja percakapan/dialog berpasangan, dan proyek membuat karangan sederhana." : mapel === 'kemuh' ? "Ujian tulis pilihan ganda/esai tentang sejarah dan ideologi Muhammadiyah, penilaian laporan tugas proyek Ortom." : "Ujian tulis esai/pilihan ganda di akhir bab, penilaian produk presentasi hasil diskusi kelompok."
  };

  if (mapel === 'pai') {
    if (fase === 'E') {
      switch (bab) {
        case 1: // Fastabiqul Khairat
          details.pemahamanBermakna = "Hidup adalah kompetisi positif dalam mengumpulkan bekal akhirat lewat amal saleh nyata dan etos kerja yang tinggi.";
          details.pertanyaanPemantik = [
            "Mengapa manusia harus saling berlomba dalam berbuat baik daripada menunda-nunda?",
            "Bagaimana etos kerja seorang muslim dapat mencerminkan tingkat keimanannya?",
            "Sebutkan dampak nyata yang Anda rasakan ketika menolong teman yang sedang kesulitan!"
          ];
          details.langkahInti = [
            "Murid membaca QS. Al-Maidah (5): 48, Al-Baqarah (2): 195, dan Al-A'raf (7): 56 secara bergantian dengan tartil, guru membimbing tajwid.",
            "Guru menayangkan video inspiratif tentang tokoh yang sukses karena etos kerja dan kompetisi kebaikan.",
            "Kelompok berdiskusi: 'Apa bentuk fastabiqul khairat yang bisa dilakukan pelajar SMK?' dan menuliskan hasilnya di LKPD.",
            "Masing-masing kelompok mempresentasikan 3 aksi nyata kompetisi kebaikan yang akan mereka lakukan selama sepekan.",
            "Murid menulis target pribadi amal saleh harian (self-commitment sheet) untuk diamalkan di rumah dan sekolah."
          ];
          details.lkpd = [
            "Bacalah QS. Al-Maidah (5): 48 dan terjemahkan ayat tersebut!",
            "Sebutkan 3 contoh perilaku fastabiqul khairat di lingkungan sekolah!",
            "Buatlah rencana aksi nyata: satu amal kebaikan yang akan kamu lakukan setiap hari selama sepekan!",
            "Refleksikan: Bagaimana perasaanmu setelah membantu teman tanpa pamrih?"
          ];
          break;
        case 2: // Syu'abul Iman
          details.pemahamanBermakna = "Iman bukanlah sekadar ucapan lisan, melainkan kesatuan utuh yang meliputi keyakinan hati, ikrar lisan, dan pembuktian lewat 77 cabang amal.";
          details.pertanyaanPemantik = [
            "Apakah seseorang sudah bisa dikatakan beriman sempurna jika ia rajin beribadah tetapi sering menyakiti tetangganya?",
            "Bagaimana keterkaitan antara cabang iman dengan pembentukan karakter pribadi?",
            "Mengapa menyingkirkan duri di jalan dikategorikan sebagai salah satu cabang iman?"
          ];
          details.langkahInti = [
            "Murid membaca teks tentang klasifikasi 77 cabang iman (niat, lisan, perbuatan) dari buku teks.",
            "Guru menyajikan diagram pohon iman, murid mencocokkan setiap cabang dengan contoh nyata.",
            "Diskusi kelompok: mengidentifikasi cabang iman mana yang sudah dan belum mereka praktikkan.",
            "Setiap kelompok membuat poster digital/visual tentang 'Pohon Iman' lengkap dengan cabang-cabangnya.",
            "Presentasi poster dan saling memberi apresiasi antarkelompok."
          ];
          details.lkpd = [
            "Sebutkan masing-masing 2 contoh cabang iman dalam dimensi niat, lisan, dan perbuatan!",
            "Evaluasi diri: cabang iman mana yang masih lemah dalam dirimu? Tuliskan rencana perbaikannya!",
            "Buatlah peta konsep (mind map) keterkaitan antara iman, Islam, dan ihsan!"
          ];
          break;
        case 3: // Penyakit Hati
          details.pemahamanBermakna = "Kebersihan hati adalah kunci ketenangan jiwa. Menjauhi sifat riya, sum'ah, dan prasangka buruk akan menyelamatkan amal kebaikan kita.";
          details.pertanyaanPemantik = [
            "Mengapa kita sering tergoda untuk memamerkan amal kebaikan kita di media sosial?",
            "Bagaimana perasaan Anda ketika bersyukur dibandingkan dengan ketika merasa iri pada pencapaian orang lain?",
            "Apa bahaya su'udzan (prasangka buruk) terhadap kerukunan pertemanan di kelas?"
          ];
          details.langkahInti = [
            "Murid menyimak kisah nyata tentang dampak riya dan hasad terhadap kehidupan seseorang (studi kasus).",
            "Guru membimbing murid mengidentifikasi ciri-ciri penyakit hati dalam diri sendiri melalui lembar introspeksi.",
            "Kelompok berdiskusi menyusun strategi menghindari foya-foya, riya', dan su'udzan di era digital.",
            "Bermain peran (role play): situasi di mana seseorang tergoda riya' dan cara menolaknya.",
            "Refleksi individu: menulis surat untuk diri sendiri tentang komitmen membersihkan hati."
          ];
          details.lkpd = [
            "Jelaskan perbedaan antara riya' dan sum'ah beserta contoh masing-masing!",
            "Apa dampak negatif su'udzan terhadap hubungan pertemanan? Berikan 3 contoh konkret!",
            "Buatlah poster berisi 5 langkah praktis menjaga kebersihan hati di kehidupan sehari-hari!"
          ];
          break;
        case 4: // Sumber Hukum Islam
          details.pemahamanBermakna = "Hukum Islam bersifat dinamis, elastis, dan relevan sepanjang zaman berkat adanya ijtihad para ulama berdasarkan Al-Qur'an dan Hadis.";
          details.pertanyaanPemantik = [
            "Bagaimana cara kita mengambil keputusan hukum jika suatu masalah baru belum tertulis secara eksplisit di dalam Al-Qur'an?",
            "Mengapa ijtihad dikategorikan sebagai rahmat dan bukti keluwesan syariat Islam?",
            "Apa peran Hadis dalam memperjelas perintah ibadah yang bersifat global di Al-Qur'an?"
          ];
          details.langkahInti = [
            "Murid membaca dan mencermati dalil-dalil tentang kedudukan Al-Qur'an, Hadis, Ijma', dan Qiyas.",
            "Guru memberikan studi kasus kontemporer (misal: hukum bitcoin, bayi tabung) untuk dianalisis.",
            "Diskusi kelompok: menentukan sumber hukum yang relevan untuk memecahkan kasus tersebut.",
            "Setiap kelompok mempresentasikan hasil ijtihad sederhana mereka terhadap kasus yang diberikan.",
            "Guru memberikan penguatan tentang hierarki dan metode penetapan hukum Islam."
          ];
          details.lkpd = [
            "Sebutkan 4 sumber hukum Islam beserta dalil naqli masing-masing!",
            "Mengapa ijtihad diperlukan dalam merespons perkembangan zaman? Berikan contoh!",
            "Analisislah hukum jual beli online menggunakan kerangka Al-Qur'an, Hadis, Ijma', dan Qiyas!"
          ];
          break;
        case 5: // Sejarah Islam
          details.pemahamanBermakna = "Dakwah Islam menyebar dengan damai melalui pendekatan budaya, kesantunan, dan keteladanan akhlak mulia para tokoh sejarah.";
          details.pertanyaanPemantik = [
            "Apa rahasia kesuksesan para penyebar Islam terdahulu sehingga ajarannya mudah diterima oleh berbagai suku bangsa?",
            "Bagaimana kita bisa meneladani kearifan lokal yang digunakan para ulama zaman dahulu dalam berdakwah?",
            "Mengapa pemahaman sejarah penting dalam membangun masa depan peradaban umat?"
          ];
          details.langkahInti = [
            "Murid mencermati peta jalur masuk dan perkembangan Islam di Nusantara.",
            "Setiap kelompok mendapat tugas menelusuri biografi satu tokoh penyebar Islam (Wali Songo, ulama, dll).",
            "Kelompok menyusun laporan infografis tentang strategi dakwah dan faktor keberhasilan tokoh tersebut.",
            "Presentasi infografis dan tanya jawab antar kelompok.",
            "Refleksi: nilai-nilai apa yang bisa diteladani dari para tokoh untuk diterapkan sebagai pelajar SMK?"
          ];
          details.lkpd = [
            "Jelaskan 3 strategi dakwah yang digunakan oleh Wali Songo dalam menyebarkan Islam di tanah Jawa!",
            "Bandingkan metode dakwah zaman dahulu dengan dakwah digital di era modern!",
            "Tokoh ulama mana yang paling menginspirasimu? Jelaskan alasan dan keteladanan yang bisa kamu ambil!"
          ];
          break;
        case 6: // Pergaulan Bebas & Zina
          details.pemahamanBermakna = "Menjaga martabat diri dengan menjauhi pergaulan bebas dan zina adalah bentuk perlindungan terhadap moralitas dan nasab manusia.";
          details.pertanyaanPemantik = [
            "Bagaimana pengaruh lingkungan pertemanan terhadap potensi terjadinya pergaulan bebas?",
            "Mengapa Islam memberikan batasan yang tegas dalam interaksi antara laki-laki dan perempuan?",
            "Apa langkah nyata yang bisa kita lakukan untuk melindungi diri dari paparan konten negatif di dunia digital?"
          ];
          details.langkahInti = [
            "Murid membaca QS. Al-Isra' (17): 32 dan QS. An-Nur (24): 2-3 beserta tafsirnya.",
            "Guru menayangkan data statistik dampak pergaulan bebas di kalangan remaja (narasi edukatif).",
            "Diskusi kelompok: menyusun strategi proteksi diri agar terhindar dari pergaulan bebas dan zina.",
            "Bermain peran: menolak ajakan teman untuk melakukan perilaku menyimpang dengan tegas dan santun.",
            "Murid membuat komitmen pribadi tertulis (safety commitment) untuk menjaga kehormatan diri."
          ];
          details.lkpd = [
            "Tuliskan QS. Al-Isra' (17): 32 beserta artinya dan jelaskan pesan utama ayat tersebut!",
            "Sebutkan 3 dampak negatif pergaulan bebas dan zina bagi masa depan remaja!",
            "Buatlah 5 langkah konkret yang akan kamu lakukan untuk menjaga diri dari pergaulan bebas!"
          ];
          break;
        case 7: // Syu'abul Iman Genap
          details.pemahamanBermakna = "Penerapan cabang-cabang iman dalam kehidupan sehari-hari membentuk kesalehan individu sekaligus kesalehan sosial.";
          details.pertanyaanPemantik = [
            "Mengapa jujur dalam bertransaksi dikategorikan sebagai wujud konkret keimanan?",
            "Bagaimana cara membiasakan diri bersyukur di tengah keterbatasan atau kesulitan hidup?",
            "Apa hikmah terbesar dari sikap disiplin memenuhi janji dalam dunia kerja?"
          ];
          details.langkahInti = [
            "Murid membaca hadis-hadis tentang kejujuran, syukur, dan memenuhi janji dari kitab hadis.",
            "Guru memberikan skenario kasus: situasi di mana kejujuran diuji, murid merespons dengan tindakan.",
            "Diskusi kelompok: menyusun '10 Kebiasaan Muslim Kaffah' yang mencerminkan cabang iman.",
            "Setiap kelompok mempresentasikan hasil dan menempelkan poster di mading kelas.",
            "Refleksi diri: mengisi lembar evaluasi praktik ibadah harian selama sepekan."
          ];
          details.lkpd = [
            "Mengapa jujur dalam bertransaksi dikategorikan sebagai cabang iman? Jelaskan dengan dalil!",
            "Tuliskan 3 cara menumbuhkan sikap syukur dalam kehidupan sehari-hari!",
            "Buatlah daftar 5 janji (komitmen) yang akan kamu tepati selama sebulan ke depan!"
          ];
          break;
        case 8: // Penyakit Hati Genap
          details.pemahamanBermakna = "Keikhlasan dan kelapangan dada menjauhkan diri dari hasad (iri dengki) dan kesombongan yang merusak amal ibadah.";
          details.pertanyaanPemantik = [
            "Mengapa hasad dikatakan dapat memakan amal kebaikan bagaikan api memakan kayu bakar?",
            "Bagaimana cara terbaik melatih diri agar terhindar dari sifat sombong atas kelebihan yang dimiliki?",
            "Apa dampak buruk dari kebiasaan berbohong terhadap kepercayaan orang lain kepada kita?"
          ];
          details.langkahInti = [
            "Murid membaca hadis riwayat Abu Dawud tentang larangan hasad dan dengki.",
            "Guru menampilkan video kisah tentang akibat buruk kesombongan dan kebohongan.",
            "Kelompok berdiskusi: membedakan antara percaya diri (tawadhu') dan sombong (takabbur).",
            "Bermain peran: melatih respons rendah hati ketika mendapat pujian atau prestasi.",
            "Menulis surat permohonan maaf kepada teman yang pernah disakiti hati sebagai bentuk introspeksi."
          ];
          details.lkpd = [
            "Jelaskan perbedaan antara ghadhab (marah) dan tegas dalam Islam!",
            "Apa saja tanda-tanda orang yang memiliki sifat sombong? Berikan 3 ciri!",
            "Buatlah rencana aksi: langkah-langkah mengendalikan amarah menurut tuntunan Rasulullah SAW!"
          ];
          break;
        case 9: // Al-Kulliyatu Al-Khamsah
          details.pemahamanBermakna = "Lima prinsip dasar hukum Islam (menjaga jiwa, keyakinan, akal, keturunan, harta) merupakan fondasi utama perlindungan Hak Asasi Manusia.";
          details.pertanyaanPemantik = [
            "Mengapa Islam sangat menghargai dan melindungi eksistensi jiwa manusia tanpa memandang perbedaan?",
            "Bagaimana keterkaitan antara larangan meminum khamr dengan prinsip perlindungan akal?",
            "Apa konsekuensi sosial jika kepemilikan harta tidak dilindungi oleh hukum syariat?"
          ];
          details.langkahInti = [
            "Murid membaca dan memahami konsep Al-Kulliyatu Al-Khamsah dari buku teks.",
            "Guru memberikan 5 kartu kasus yang masing-masing melanggar salah satu prinsip dasar.",
            "Setiap kelompok menganalisis kartu kasus dan menentukan prinsip mana yang dilanggar.",
            "Presentasi hasil analisis dan diskusi kelas tentang relevansi prinsip ini di era modern.",
            "Refleksi: bagaimana cara kita melindungi 5 prinsip ini dalam kehidupan sebagai pelajar SMK?"
          ];
          details.lkpd = [
            "Sebutkan 5 prinsip Al-Kulliyatu Al-Khamsah beserta masing-masing 1 dalil naqli!",
            "Bagaimana Islam melindungi hak hidup non-muslim? Jelaskan dengan dalil!",
            "Analisislah sebuah berita/artikel terkait pelanggaran salah satu prinsip Al-Kulliyatu Al-Khamsah!"
          ];
          break;
        case 10: // Tokoh Ulama Nusantara
          details.pemahamanBermakna = "Keteladanan dakwah ulama Nusantara mengajarkan pentingnya menyebarkan Islam secara ramah, damai, dan akomodatif terhadap budaya lokal.";
          details.pertanyaanPemantik = [
            "Bagaimana strategi Wali Songo memadukan kesenian daerah dengan materi dakwah Islam?",
            "Mengapa kita harus bangga terhadap warisan keilmuan dan perjuangan para ulama Nusantara?",
            "Apa keteladanan terbaik dari perjuangan para ulama dalam menjaga keutuhan NKRI?"
          ];
          details.langkahInti = [
            "Murid membaca biografi singkat 5 ulama Nusantara (Syekh Nawawi al-Bantani, KH. Hasyim Asy'ari, KH. Ahmad Dahlan, dll).",
            "Setiap kelompok memilih satu tokoh untuk diteliti lebih dalam tentang karya dan perjuangannya.",
            "Kelompok menyusun video pendek/infografis tentang kontribusi tokoh tersebut bagi bangsa.",
            "Pameran karya digital: hasil penelitian dipresentasikan dan dipajang di media sosial kelas.",
            "Refleksi: semangat apa dari para ulama yang ingin kamu terapkan dalam menuntut ilmu di SMK?"
          ];
          details.lkpd = [
            "Jelaskan strategi dakwah Wali Songo dalam menyebarkan Islam di Nusantara!",
            "Bandingkan perjuangan KH. Ahmad Dahlan dan KH. Hasyim Asy'ari dalam memajukan pendidikan Islam!",
            "Menurutmu, apa tantangan terbesar dakwah Islam di era milenial dan bagaimana solusinya?"
          ];
          break;
      }
    } else if (kelas === 'XII') {
      // Fase F — Kelas XII (materi berbeda dari XI)
      switch (bab) {
        case 1: // Sabar dan Tabah
          details.pemahamanBermakna = "Sabar dan tabah adalah kekuatan batin yang menuntun muslim tetap istiqamah saat menghadapi ujian, musibah, dan tekanan kehidupan modern.";
          details.pertanyaanPemantik = [
            "Apa perbedaan sabar dalam ketaatan, sabar dalam musibah, dan sabar menahan maksiat?",
            "Bagaimana QS. Al-Baqarah/2: 155-157 membingkai cara muslim menyikapi ujian?",
            "Mengapa husnudzan kepada Allah menjadi kunci ketabahan?"
          ];
          details.langkahInti = [
            "Murid membaca dan menghafal QS. Al-Baqarah/2: 155-157 beserta artinya dengan tartil.",
            "Guru memandu tadabbur ayat: bentuk ujian, respons ideal, dan balasan bagi orang sabar.",
            "Kelompok menganalisis studi kasus ujian pelajar SMK (gagal ujian, ekonomi, tekanan sosial).",
            "Setiap kelompok merumuskan strategi sabar-tawakal yang aplikatif di sekolah dan rumah.",
            "Refleksi individu: menulis komitmen menyikapi ujian tanpa mengeluh destruktif."
          ];
          details.lkpd = [
            "Tuliskan QS. Al-Baqarah/2: 155-157 beserta arti dan pesan utamanya!",
            "Jelaskan 3 macam sabar beserta contoh nyata di lingkungan pelajar SMK!",
            "Buatlah rencana pribadi menghadapi 1 ujian yang sedang/pernah Anda alami dengan langkah sabar, tawakal, dan husnudzan!"
          ];
          break;
        case 2: // Iman, Islam, Ihsan
          details.pemahamanBermakna = "Iman, Islam, dan ihsan adalah satu kesatuan berjenjang yang membentuk muslim berintegritas: yakin di hati, taat dalam amal, dan beribadah seolah melihat Allah.";
          details.pertanyaanPemantik = [
            "Bagaimana hubungan integratif antara iman, Islam, dan ihsan?",
            "Mengapa ihsan disebut tingkatan tertinggi dalam beragama?",
            "Bagaimana membiasakan muraqabah (merasa diawasi Allah) di era digital?"
          ];
          details.langkahInti = [
            "Murid mengkaji hadis Jibril tentang iman, Islam, dan ihsan.",
            "Guru memandu pemetaan: rukun iman, rukun Islam, dan makna ihsan.",
            "Diskusi kelompok: indikator ihsan dalam ibadah, belajar, dan bermedsos.",
            "Presentasi diagram hubungan iman–Islam–ihsan beserta contoh perilaku.",
            "Refleksi: satu amalan harian untuk menumbuhkan ihsan."
          ];
          details.lkpd = [
            "Jelaskan definisi iman, Islam, dan ihsan beserta dalil ringkasnya!",
            "Buat peta konsep keterkaitan ketiga konsep tersebut dengan contoh perilaku pelajar!",
            "Rancang 5 indikator ihsan yang dapat dipraktikkan di bengkel/kelas SMK Anda!"
          ];
          break;
        case 3: // Munafik, Keras Hati, Keras Kepala
          details.pemahamanBermakna = "Munafik, keras hati, dan keras kepala merusak integritas moral; jujur, terbuka, dan rendah hati adalah penawarnya.";
          details.pertanyaanPemantik = [
            "Apa tanda-tanda nifaq menurut Al-Qur'an dan Hadis?",
            "Bagaimana membedakan keteguhan prinsip dengan sikap keras kepala?",
            "Mengapa kejujuran menjadi obat utama sifat munafik?"
          ];
          details.langkahInti = [
            "Murid mengidentifikasi tanda munafik, keras hati, dan keras kepala dari teks dalil.",
            "Analisis kasus: perilaku munafik di sekolah (bohong, khianat janji, riya).",
            "Role play menolak ajakan bohong/manipulasi secara tegas dan santun.",
            "Kelompok menyusun strategi pembiasaan jujur dan terbuka terhadap kebenaran.",
            "Komitmen anti-nifaq tertulis per individu."
          ];
          details.lkpd = [
            "Sebutkan minimal 3 tanda orang munafik beserta dalilnya!",
            "Analisis satu kasus keras kepala di kelas: dampak dan solusinya!",
            "Buat 5 janji perilaku jujur yang akan Anda jaga selama sebulan!"
          ];
          break;
        case 4: // Ijtihad
          details.pemahamanBermakna = "Ijtihad adalah instrumen dinamis syariat agar hukum Islam tetap relevan menjawab persoalan kontemporer tanpa meninggalkan dalil.";
          details.pertanyaanPemantik = [
            "Apa syarat seseorang melakukan ijtihad?",
            "Bagaimana ijtihad berbeda dari opini bebas tanpa dalil?",
            "Berikan contoh masalah modern yang memerlukan ijtihad!"
          ];
          details.langkahInti = [
            "Murid mengkaji pengertian, kedudukan, dan metode ijtihad.",
            "Guru menyajikan kasus kontemporer (teknologi, biotek, ekonomi digital).",
            "Kelompok menganalisis kasus dengan kerangka Al-Qur'an–Hadis–kaidah fikih sederhana.",
            "Presentasi hasil penalaran dan apresiasi adab berbeda pendapat.",
            "Penguatan: adab menghargai ulama dan keragaman pendapat syar'i."
          ];
          details.lkpd = [
            "Jelaskan pengertian, syarat, dan metode ijtihad!",
            "Analisis 1 masalah kontemporer menggunakan kerangka sumber hukum Islam!",
            "Mengapa perbedaan hasil ijtihad harus disikapi dengan adab ilmiah?"
          ];
          break;
        case 5: // Cinta Tanah Air & Moderasi
          details.pemahamanBermakna = "Cinta tanah air dan moderasi beragama (wasathiyah) adalah wujud keimanan yang menjaga keutuhan bangsa tanpa mengorbankan prinsip syariat.";
          details.pertanyaanPemantik = [
            "Bagaimana dalil keagamaan mendukung semangat kebangsaan?",
            "Apa ciri sikap wasathiyah dalam kehidupan sehari-hari?",
            "Bagaimana menolak ekstremisme tanpa memusuhi perbedaan?"
          ];
          details.langkahInti = [
            "Murid membaca dalil terkait menjaga kehidupan dan kerukunan.",
            "Diskusi: praktik moderasi di sekolah multikultural.",
            "Proyek mini: kampanye digital cinta tanah air berlandaskan nilai Islam.",
            "Presentasi kampanye dan umpan balik kelas.",
            "Refleksi: kontribusi pelajar SMK bagi keutuhan NKRI."
          ];
          details.lkpd = [
            "Jelaskan hubungan cinta tanah air dengan ajaran Islam!",
            "Sebutkan 5 indikator moderasi beragama yang dapat dipraktikkan pelajar!",
            "Rancang 1 aksi kelas untuk memperkuat toleransi dan semangat kebangsaan!"
          ];
          break;
        case 6: // Mawaris
          details.pemahamanBermakna = "Hukum waris Islam menjamin keadilan distribusi harta, melindungi hak ahli waris, dan mencegah konflik keluarga.";
          details.pertanyaanPemantik = [
            "Siapa saja yang termasuk ahli waris?",
            "Mengapa pembagian waris diatur secara rinci dalam syariat?",
            "Bagaimana sikap adil diterapkan saat terjadi sengketa waris?"
          ];
          details.langkahInti = [
            "Murid mengkaji rukun, syarat, dan golongan ahli waris.",
            "Latihan soal pembagian waris sederhana (kasus keluarga).",
            "Analisis etika: wasiat, hibah, dan adab menyelesaikan sengketa.",
            "Simulasi musyawarah keluarga tentang pembagian waris yang adil.",
            "Refleksi: nilai kejujuran dan tanggung jawab dalam harta."
          ];
          details.lkpd = [
            "Jelaskan rukun, syarat, dan macam ahli waris dalam Islam!",
            "Hitung pembagian waris pada 1 kasus sederhana yang diberikan guru!",
            "Tuliskan 3 adab muslim saat menghadapi urusan warisan!"
          ];
          break;
        case 7: // Ormas Islam
          details.pemahamanBermakna = "Ormas Islam berperan membangun peradaban, pendidikan, dan kemerdekaan bangsa; partisipasi aktif pelajar adalah investasi masa depan umat.";
          details.pertanyaanPemantik = [
            "Apa peran ormas Islam dalam sejarah kemerdekaan Indonesia?",
            "Bagaimana Muhammadiyah dan NU berkontribusi di bidang pendidikan?",
            "Mengapa pelajar perlu mengenal ormas Islam?"
          ];
          details.langkahInti = [
            "Murid menelaah sejarah berdirinya ormas Islam utama di Indonesia.",
            "Kelompok membandingkan fokus gerakan 2–3 ormas (pendidikan, sosial, dakwah).",
            "Proyek: infografis kontribusi ormas bagi bangsa.",
            "Presentasi dan diskusi peluang kaderisasi pelajar.",
            "Refleksi: bentuk partisipasi sosial keagamaan yang realistis bagi murid SMK."
          ];
          details.lkpd = [
            "Jelaskan sejarah singkat dan peran 2 ormas Islam di Indonesia!",
            "Analisis kontribusi ormas Islam dalam pendidikan dan kemerdekaan!",
            "Rancang 1 kegiatan kepedulian sosial yang terinspirasi dari semangat ormas Islam!"
          ];
          break;
      }
    } else {
      // Fase F (Kelas XI)
      switch (bab) {
        case 1: // Berpikir Kritis
          details.pemahamanBermakna = "Akal pikiran adalah anugerah terbesar Allah SWT yang wajib digunakan untuk merenungkan fenomena alam semesta guna memperkuat keimanan dan membedakan kebenaran dari kebatilan.";
          details.pertanyaanPemantik = [
            "Mengapa Allah SWT menantang manusia untuk memikirkan proses penciptaan langit dan bumi dalam QS. Ali 'Imran: 190-191?",
            "Bagaimana cara kita membedakan informasi yang valid (fakta) dengan berita bohong (hoaks) menggunakan akal kritis?",
            "Apakah berpikir kritis dapat meningkatkan kualitas keimanan seseorang? Mengapa?"
          ];
          details.langkahInti = [
            "Murid membaca dan mentadabburi QS. Ali 'Imran (3): 190-191 secara tartil.",
            "Guru menampilkan 5 berita kontroversial; murid diminta memilah mana fakta dan mana hoaks.",
            "Diskusi kelompok: merumuskan langkah-langkah berpikir kritis menurut Islam.",
            "Debat santun: pro-kontra tentang isu aktual yang memerlukan analisis keagamaan.",
            "Refleksi: bagaimana berpikir kritis meningkatkan kualitas iman dan produktivitas belajar?"
          ];
          details.lkpd = [
            "Tuliskan arti QS. Ali 'Imran (3): 190-191 dan jelaskan pesan utama yang terkandung di dalamnya!",
            "Sebutkan 5 langkah berpikir kritis yang diajarkan dalam Islam!",
            "Ambil satu berita hoaks yang pernah beredar, lalu analisislah mengapa berita tersebut dapat dipercaya banyak orang!"
          ];
          break;
        case 2: // Akhlak Terpuji
          details.pemahamanBermakna = "Kualitas keimanan seorang muslim diukur dari kemampuannya memegang janji, mensyukuri nikmat, menjaga lisannya dari ghibah, serta menutupi aib sesama.";
          details.pertanyaanPemantik = [
            "Mengapa mengingkari janji dikategorikan sebagai salah satu ciri kemunafikan dalam Islam?",
            "Bagaimana cara terbaik mengekspresikan rasa syukur atas nikmat yang kita terima sehari-hari?",
            "Apa dampak sosial dari kebiasaan membicarakan aib orang lain di lingkungan sekolah?"
          ];
          details.langkahInti = [
            "Murid membaca hadis tentang tanda-tanda munafik dari Rasulullah SAW.",
            "Guru memberikan studi kasus: seseorang yang pandai bicara tapi suka ingkar janji.",
            "Diskusi kelompok: menyusun 'Kode Etik Pelajar Muslim' yang mencakup jujur, syukur, dan menjaga lisan.",
            "Bermain peran: situasi menutupi aib teman vs menyebarkan aib, murid mendemonstrasikan keduanya.",
            "Refleksi: menulis jurnal harian selama sepekan tentang upaya menjaga lisan dari ghibah."
          ];
          details.lkpd = [
            "Sebutkan 3 tanda munafik menurut hadis Rasulullah SAW dan jelaskan masing-masing!",
            "Berikan 3 contoh nyata cara bersyukur kepada Allah dalam kehidupan sehari-hari!",
            "Apa yang akan kamu lakukan jika mendengar temanmu membicarakan aib orang lain?"
          ];
          break;
        case 3: // Penyakit Sosial
          details.pemahamanBermakna = "Menjaga keharmonisan sosial dengan menjauhi bullying, perkelahian, dan judi adalah manifestasi nyata dari ketakwaan dan kepedulian terhadap kemanusiaan.";
          details.pertanyaanPemantik = [
            "Mengapa perundungan (bullying) dapat merusak masa depan mental korban dan dicela keras dalam Islam?",
            "Bagaimana cara kita mengontrol emosi di saat terjadi perselisihan antarteman agar tidak berujung tawuran?",
            "Apa dampak judi bagi kehancuran ekonomi keluarga dan kesehatan mental pelakunya?"
          ];
          details.langkahInti = [
            "Murid menyimak tayangan video dampak bullying dan tawuran dari perspektif korban.",
            "Guru memandu diskusi tentang akar masalah penyakit sosial di kalangan remaja.",
            "Kelompok membuat poster/komik anti-bullying dan anti-tawuran untuk kampanye sekolah.",
            "Setiap kelompok membacakan deklarasi 'Sekolah Damai' yang berisi komitmen bersama.",
            "Refleksi: menulis surat permintaan maaf kepada teman yang pernah menjadi korban kekerasan."
          ];
          details.lkpd = [
            "Jelaskan perbedaan antara bullying fisik, verbal, dan sosial! Berikan contoh masing-masing!",
            "Apa saja faktor penyebab perkelahian pelajar? Tawarkan solusi preventifnya!",
            "Mengapa judi diharamkan dalam Islam? Jelaskan dampaknya dari segi ekonomi dan psikologis!"
          ];
          break;
        case 4: // Khutbah, Tablig, Dakwah
          details.pemahamanBermakna = "Menyampaikan ajaran Islam wajib dilakukan dengan cara yang hikmah, santun, menyejukkan, dan beradab sesuai etika komunikasi dakwah Rasulullah SAW.";
          details.pertanyaanPemantik = [
            "Mengapa dakwah yang disampaikan dengan kekerasan atau caci maki justru menjauhkan masyarakat dari Islam?",
            "Apa perbedaan mendasar dari segi rukun dan ketentuan antara Khutbah, Tablig, dan Dakwah?",
            "Bagaimana rancangan dakwah kreatif yang cocok untuk merangkul generasi muda zaman sekarang?"
          ];
          details.langkahInti = [
            "Murid membaca ketentuan syarat dan rukun khutbah, tablig, dan dakwah dari buku teks.",
            "Guru mendemonstrasikan contoh khutbah Jumat yang baik dan memenuhi rukun.",
            "Latihan praktik: setiap kelompok menyusun teks dakwah singkat (3 menit) tentang tema kekinian.",
            "Simulasi: perwakilan kelompok menyampaikan dakwah di depan kelas dengan mikrofon.",
            "Peer evaluation: murid saling memberi masukan konstruktif terhadap penampilan dakwah teman."
          ];
          details.lkpd = [
            "Sebutkan perbedaan antara khutbah, tablig, dan dakwah dari segi rukun dan ketentuannya!",
            "Buatlah teks dakwah singkat (3 menit) dengan tema 'Bahaya Hoaks di Media Sosial'!",
            "Apa saja etika berdakwah yang dicontohkan Rasulullah SAW? Sebutkan minimal 5!"
          ];
          break;
        case 5: // Ulama Indonesia
          details.pemahamanBermakna = "Ketangguhan belajar, produktivitas menulis karya ilmiah, dan kegigihan dakwah para ulama Nusantara terbukti diakui dunia dan menjadi warisan kebanggaan nasional.";
          details.pertanyaanPemantik = [
            "Apa yang memotivasi ulama Nusantara masa lalu (seperti Syekh Nawawi al-Bantani) untuk menuntut ilmu hingga ke Haramain dan dihormati dunia?",
            "Bagaimana cara kita menumbuhkan semangat literasi dan membaca seperti keteladanan para ulama?",
            "Apa pelajaran berharga dari ketangguhan mental para ulama Nusantara dalam menghadapi keterbatasan?"
          ];
          details.langkahInti = [
            "Murid membaca biografi Syekh Nawawi al-Bantani, KH. Bisri Mustofa, dan ulama Nusantara lainnya.",
            "Setiap kelompok meneliti karya tulis seorang ulama Nusantara dan relevansinya saat ini.",
            "Kelompok membuat resensi buku/karya ulama tersebut dalam bentuk infografis.",
            "Pameran infografis digital: dipresentasikan dan diunggah ke media sosial kelas.",
            "Refleksi: menulis target literasi pribadi (jumlah buku yang akan dibaca per bulan)."
          ];
          details.lkpd = [
            "Jelaskan kontribusi Syekh Nawawi al-Bantani terhadap perkembangan ilmu pengetahuan di dunia!",
            "Apa faktor kunci yang membuat ulama Nusantara mampu bersaing di tingkat global?",
            "Buatlah resensi singkat salah satu kitab karya ulama Nusantara yang kamu ketahui!"
          ];
          break;
        case 6: // Mencintai IPTEK — Versi PP
          details.pemahamanBermakna = "Perintah Iqra' dan isyarat menjelajah langit-bumi dalam Al-Qur'an menuntut muslim mencintai ilmu pengetahuan dan teknologi sebagai ibadah serta jalan kemajuan umat.";
          details.pertanyaanPemantik = [
            "Mengapa wahyu pertama yang turun adalah perintah membaca (Iqra'), bukan perintah ibadah ritual lain?",
            "Bagaimana Q.S. ar-Rahman/55: 33 memberi isyarat pengembangan iptek bagi umat manusia?",
            "Sebagai Pelajar Muhammadiyah, bagaimana cara mencintai iptek tanpa meninggalkan adab dan akhlak?"
          ];
          details.langkahInti = [
            "Murid membaca, menerjemahkan, dan mentadabburi Q.S. al-Alaq/96: 1-5 serta Q.S. ar-Rahman/55: 33 dengan tartil.",
            "Guru memandu analisis makna Iqra' sebagai landasan etos keilmuan dan inovasi teknologi.",
            "Kelompok menelaah H.R. Abu Syaikh tentang berpikir mendalam terhadap ciptaan Allah dan kaitannya dengan iptek.",
            "Diskusi: rancang aksi nyata pelajar SMK yang mencintai iptek secara Islami (proyek mini/riset sederhana).",
            "Presentasi hasil dan komitmen pribadi menjadi Pelajar Muhammadiyah pencinta ilmu."
          ];
          details.lkpd = [
            "Tuliskan terjemah dan pesan utama Q.S. al-Alaq/96: 1-5 tentang perintah Iqra'!",
            "Analisis isyarat iptek dalam Q.S. ar-Rahman/55: 33 dan relevansinya bagi pelajar SMK!",
            "Jelaskan kaitan H.R. Abu Syaikh tentang merenungi ciptaan Allah dengan semangat menuntut ilmu!",
            "Buatlah rencana aksi 1 pekan: 3 kebiasaan belajar/iptek yang mencerminkan Pelajar Muhammadiyah!"
          ];
          break;
        case 7: // Muru'ah, Ikhlas, Malu, Zuhud — Versi PP
          details.pemahamanBermakna = "Menjaga harga diri (muru'ah), keikhlasan, rasa malu dari maksiat, dan menyikapi dunia secara proporsional (zuhud) memperkuat keimanan serta membentuk karakter pelajar berakhlak mulia.";
          details.pertanyaanPemantik = [
            "Bagaimana konsep zuhud yang benar di era modern yang penuh budaya konsumerisme?",
            "Mengapa rasa malu (haya') disebut mahkota akhlak seorang muslim?",
            "Bagaimana menjaga kehormatan diri (muru'ah) dalam pergaulan dan media digital?"
          ];
          details.langkahInti = [
            "Murid mengkaji definisi, dalil, dan urgensi muru'ah, ikhlas, haya', serta zuhud.",
            "Guru menyajikan dilema moral: popularitas di medsos vs menjaga muru'ah dan keikhlasan.",
            "Diskusi kelompok: ciri-ciri dan strategi menerapkan keempat sifat dalam kehidupan pelajar.",
            "Role play: menolak tawaran yang merendahkan harga diri dengan tetap santun.",
            "Refleksi: lembar evaluasi pengendalian diri dan komitmen berakhlak mulia selama sepekan."
          ];
          details.lkpd = [
            "Jelaskan definisi muru'ah beserta dalil dan pentingnya menjaga kehormatan diri!",
            "Identifikasi ciri-ciri ikhlas, haya' (malu), dan zuhud; berikan contoh nyata di sekolah!",
            "Susun 5 komitmen perilaku yang mencerminkan pengendalian diri dan ketulusan hati pelajar beriman!"
          ];
          break;
        case 8: // Anti Khamr & Narkoba — Versi PP
          details.pemahamanBermakna = "Menjauhi minuman keras dan narkoba adalah perlindungan terhadap agama, akal, jiwa, dan masa depan bangsa; generasi muda wajib menjadi garda anti narkoba.";
          details.pertanyaanPemantik = [
            "Apa pengertian khamr dan narkoba, serta mengapa keduanya diharamkan?",
            "Bagaimana dalil Al-Qur'an/Hadis sejalan dengan hukum positif negara terkait narkoba?",
            "Sebagai Pelajar Muhammadiyah, aksi nyata apa yang bisa dilakukan untuk lingkungan bebas narkoba?"
          ];
          details.langkahInti = [
            "Murid mengkaji pengertian khamr dan narkoba serta klasifikasi zat adiktif secara ringkas.",
            "Analisis dalil larangan dari Al-Qur'an dan Hadis serta keterkaitannya dengan UU/hukum positif.",
            "Menelaah bahaya nyata bagi kesehatan akal, jiwa, dan raga (data/studi kasus edukatif).",
            "Kelompok merancang kampanye anti minuman keras dan narkoba di sekolah (poster/sumpah pelajar).",
            "Komitmen aksi nyata: deklarasi Pelajar Muhammadiyah anti narkoba."
          ];
          details.lkpd = [
            "Jelaskan pengertian minuman keras (khamr) dan narkoba beserta contohnya!",
            "Analisis 2 dalil larangan khamr/narkoba dan kaitannya dengan hukum positif di Indonesia!",
            "Uraikan bahaya minuman keras dan narkoba bagi akal, jiwa, dan raga!",
            "Buatlah komitmen dan 3 aksi nyata sebagai Pelajar Muhammadiyah anti minuman keras dan narkoba!"
          ];
          break;
        case 9: // Ekonomi Islam — Versi PP
          details.pemahamanBermakna = "Ekonomi Islam (asuransi, bank, dan koperasi syariah) menghadirkan keberkahan dan kemaslahatan melalui prinsip keadilan, tolong-menolong, dan bebas riba.";
          details.pertanyaanPemantik = [
            "Apa perbedaan mendasar asuransi syariah dengan asuransi konvensional?",
            "Bagaimana bank syariah menjalankan fungsi intermediasi tanpa riba?",
            "Mengapa koperasi syariah menekankan asas gotong royong?"
          ];
          details.langkahInti = [
            "Murid mengkaji pengertian, prinsip, dan implementasi asuransi syariah.",
            "Analisis ketentuan, fungsi, dan operasional bank syariah dalam perekonomian.",
            "Memahami konsep, pengelolaan, dan asas gotong royong koperasi syariah.",
            "Studi kasus: membandingkan produk syariah vs konvensional secara sederhana.",
            "Refleksi: komitmen mencintai dan menggunakan produk ekonomi syariah."
          ];
          details.lkpd = [
            "Jelaskan pengertian, prinsip, dan contoh implementasi asuransi syariah!",
            "Analisis ketentuan, fungsi, dan operasional bank syariah dalam perekonomian!",
            "Uraikan konsep, pengelolaan, dan asas gotong royong dalam koperasi syariah!",
            "Tuliskan alasan dan rencana pribadi untuk lebih memilih produk ekonomi syariah!"
          ];
          break;
        case 10: // Kebangkitan Islam Modern — Versi PP
          details.pemahamanBermakna = "Kebangkitan Islam modern melalui pemikiran dan gerakan para pembaru menumbuhkan semangat tajdid, pendidikan, dan inovasi untuk memajukan peradaban umat.";
          details.pertanyaanPemantik = [
            "Apa sumbangsih pemikiran Jamaludin al-Afghani, Muhammad Abduh, dan Rasyid Ridha bagi kebangkitan umat?",
            "Bagaimana K.H. Ahmad Dahlan menerjemahkan semangat pembaruan ke dalam amal usaha pendidikan?",
            "Faktor apa yang memicu kebangkitan Islam di masa modern?"
          ];
          details.langkahInti = [
            "Murid menelaah biografi dan pemikiran Jamaludin al-Afghani, Muhammad Abduh, Rasyid Ridha, dan K.H. Ahmad Dahlan.",
            "Kelompok menganalisis faktor pemicu kebangkitan dan pembaruan peradaban Islam modern.",
            "Membandingkan strategi pembaruan masing-masing tokoh dan relevansinya hari ini.",
            "Proyek: infografis keteladanan tokoh pembaru untuk pelajar SMK.",
            "Refleksi: meneladani kegigihan, semangat juang, dan inovasi para ulama pembaru."
          ];
          details.lkpd = [
            "Telaah singkat riwayat, pemikiran, dan gerakan 4 tokoh: al-Afghani, Abduh, Rasyid Ridha, dan K.H. Ahmad Dahlan!",
            "Analisis faktor-faktor pemicu kebangkitan dan pembaruan peradaban Islam modern!",
            "Tuliskan 3 keteladanan praktis dari para pembaru yang dapat Anda terapkan sebagai pelajar SMK!"
          ];
          break;
      }
    }
  } else if (mapel === 'arab') {
    // === BAHASA ARAB ===
    const f = fase; // E, F11, or F12
    if (f === 'E') {
      switch (bab) {
        case 1: // البيت (Rumah)
          details.pemahamanBermakna = "Menguasai kosakata dan dialog tentang البيت membantu murid mendeskripsikan lingkungan rumah serta menunjuk letak benda dengan kaidah اسم الإشارة dan أحرف الجر secara tepat.";
          details.pertanyaanPemantik = [
            "Apa saja ruangan yang ada di rumahmu dan bagaimana menyebutnya dalam Bahasa Arab?",
            "Bagaimana cara menunjuk benda dekat dan jauh di rumah menggunakan هٰذَا / هٰذِهِ / ذٰلِكَ / تِلْكَ?",
            "Huruf jar apa yang dipakai untuk mengatakan 'di atas meja' atau 'di depan pintu'?"
          ];
          details.langkahInti = [
            "Menyimak: murid mengidentifikasi bunyi kata dan dialog tentang البيت dari audio/bacaan guru (TP 1.1.1–1.1.3).",
            "Melafalkan: guru memodelkan mufradat ruangan dan benda rumah; murid menirukan bersama lalu berpasangan (TP 1.1.2).",
            "Menerapkan kaidah: praktik menunjuk benda di kelas/gambar rumah dengan اسم الإشارة dan أحرف الجر (فِيْ، عَلَى، أَمَامَ، خَلْفَ) (TP 1.1.4).",
            "Berbicara & membaca: role-play dialog فِي الْبَيْتِ dan membaca nyaring teks بَيْتِيْ (TP 1.1.5, 1.1.8).",
            "Menulis: menghubungkan kata menjadi 5–7 kalimat sederhana mendeskripsikan rumah masing-masing (TP 1.1.11)."
          ];
          details.lkpd = [
            "Tuliskan 10 mufradat tentang البيت beserta artinya!",
            "Buat 5 kalimat menggunakan isim isyarah + huruf jar (contoh: الْمِصْبَاحُ عَلَى الْمِنْضَدَةِ)!",
            "Tuliskan dialog singkat (minimal 6 baris) tentang menunjukkan ruangan di rumah!"
          ];
          break;
        case 2: // التعارف (Perkenalan)
          details.pemahamanBermakna = "Kemampuan berkenalan (التعارف) dengan dhamir yang tepat membuka komunikasi santun, mempererat ukhuwah, dan melatih penggunaan الضمير المنفصل والمتصل dalam interaksi nyata.";
          details.pertanyaanPemantik = [
            "Ungkapan apa yang kamu gunakan saat berkenalan dengan teman baru di sekolah?",
            "Apa perbedaan أَنَا، أَنْتَ، هُوَ dengan اِسْمِيْ، اِسْمُكَ، اِسْمُهُ?",
            "Bagaimana cara menyesuaikan dhamir saat lawan bicara laki-laki atau perempuan?"
          ];
          details.langkahInti = [
            "Menyimak & memahami: murid menyimak dialog التَّعَارُفُ dan mengidentifikasi dhamir yang muncul (TP 1.1.3, 1.1.7).",
            "Berbicara: latihan berpasangan memperkenalkan diri (nama, asal, status murid) dengan dhamir yang sesuai gender (TP 1.1.5–1.1.6).",
            "Membangun interaksi: simulasi 'lingkaran ta'aruf' — setiap murid berkenalan dengan 3 teman berbeda (TP 1.1.6).",
            "Membaca: membaca nyaring teks تَعَارُفِيْ dan menjawab pertanyaan pemahaman (TP 1.1.9).",
            "Menulis: memaparkan kalimat perkenalan diri 5–7 baris memakai dhamir munfashil dan muttashil (TP 1.1.12, 1.1.14)."
          ];
          details.lkpd = [
            "Tuliskan tabel dhamir munfashil (minimal 8) dan 4 contoh dhamir muttashil (ـيْ، ـكَ، ـهُ، ـنَا)!",
            "Buat dialog perkenalan minimal 8 baris antara dua murid (perhatikan dhamir lk/pr)!",
            "Tulis monolog perkenalan diri: nama, umur, asal, sekolah, dan satu orang teman!"
          ];
          break;
        case 3: // المكتبة (Perpustakaan)
          details.pemahamanBermakna = "Berbahasa Arab di perpustakaan melatih adab literasi sekaligus ketepatan bentuk المفرد، المثنى، dan الجمع saat menyebut jumlah buku dan koleksi.";
          details.pertanyaanPemantik = [
            "Apa saja yang biasa kamu lakukan di perpustakaan sekolah?",
            "Bagaimana membedakan 'satu buku', 'dua buku', dan 'banyak buku' dalam Bahasa Arab?",
            "Mengapa bentuk kata berubah saat jumlah benda berubah?"
          ];
          details.langkahInti = [
            "Menyimak: mengidentifikasi mufradat dan bunyi kata tentang المكتبة dari dialog guru/audio (TP 1.1.1, 1.1.3).",
            "Kaidah: guru memandu pembentukan mufrad–mutsanna–jamak pada kosakata كِتَاب، مَجَلَّة، طَالِب (TP 1.1.10).",
            "Berbicara: role-play meminjam dan mengembalikan buku di perpustakaan (TP 1.1.5).",
            "Membaca: membaca nyaring teks مَكْتَبَةُ الْمَدْرَسَةِ dan menandai bentuk mufrad/mutsanna/jamak (TP 1.1.8–1.1.9).",
            "Menulis: menyusun urutan kata acak menjadi kalimat benar tentang kunjungan ke perpustakaan (TP 1.1.13)."
          ];
          details.lkpd = [
            "Ubah 8 kata mufrad menjadi mutsanna (rafa' & nashab/jar) dan jamak!",
            "Buat dialog singkat di perpustakaan (minimal 6 baris) yang memuat kata bilangan dua/banyak!",
            "Susun 5 kalimat acak yang diberikan guru menjadi kalimat benar tentang المكتبة!"
          ];
          break;
        case 4: // المدرسة (Sekolah)
          details.pemahamanBermakna = "Topik المدرسة mengintegrasikan seluruh kaidah semester ganjil agar murid mampu berkomunikasi tentang lingkungan sekolah secara lisan dan tulisan dengan struktur gramatikal yang tepat.";
          details.pertanyaanPemantik = [
            "Bagaimana kamu mendeskripsikan sekolahmu dalam beberapa kalimat Bahasa Arab?",
            "Kaidah apa saja (isim isyarah, dhamir, mufrad-mutsanna-jamak, huruf jar) yang sudah kamu kuasai semester ini?",
            "Di mana letak perpustakaan, lapangan, dan kantin di sekolahmu (gunakan huruf jar)?"
          ];
          details.langkahInti = [
            "Menyimak & memahami: menyimak dialog فِي الْمَدْرَسَةِ dan menandai kaidah yang muncul (TP 1.1.3, 1.1.7).",
            "Berbicara: interaksi berpasangan tentang jadwal, kelas, dan fasilitas sekolah (TP 1.1.5–1.1.6).",
            "Membaca nyaring: teks مَدْرَسَتِيْ dengan intonasi dan pemahaman isi (TP 1.1.8).",
            "Review kaidah terpadu: peta konsep اسم الإشارة، الضمائر، المفرد-المثنى-الجمع، أحرف الجر pada konteks sekolah (TP 1.1.7, 1.1.14).",
            "Menulis & unjuk kerja: monolog 8–10 kalimat tentang sekolah + presentasi singkat (TP 1.1.11, 1.1.14)."
          ];
          details.lkpd = [
            "Tuliskan 12 mufradat sekolah beserta 4 kalimat memakai huruf jar berbeda!",
            "Buat dialog di sekolah minimal 8 baris yang memuat isim isyarah dan dhamir!",
            "Tulis monolog 'مَدْرَسَتِيْ' (8–10 kalimat) yang memuat minimal satu contoh tiap kaidah semester ganjil!"
          ];
          break;
        case 5: // المقصف (Kantin)
          details.pemahamanBermakna = "Berbahasa Arab di kantin (المقصف) melatih transaksi sederhana sekaligus ketepatan ظرف المكان saat menyebutkan letak makanan, meja, dan antrian.";
          details.pertanyaanPemantik = [
            "Apa saja yang biasa kamu beli di kantin sekolah?",
            "Bagaimana mengatakan 'di depan kasir' atau 'di atas meja' dalam Bahasa Arab?",
            "Mengapa keterangan tempat penting saat berdialog di kantin?"
          ];
          details.langkahInti = [
            "Menyimak: mengidentifikasi bunyi kata dan dialog tentang المقصف dari audio/bacaan guru (TP 1.2.1–1.2.3).",
            "Melafalkan: menirukan mufradat makanan, minuman, dan ungkapan transaksi berpasangan (TP 1.2.2).",
            "Kaidah ظرف المكان: praktik menunjuk letak di kantin (أَمَامَ، خَلْفَ، عَلَى، فِيْ، بَيْنَ) (TP 1.2.4).",
            "Berbicara & membaca: role-play jual-beli di kantin dan membaca nyaring teks فِي الْمَقْصَفِ (TP 1.2.5, 1.2.8).",
            "Menulis: menghubungkan kata menjadi 5–7 kalimat tentang pengalaman di kantin (TP 1.2.11)."
          ];
          details.lkpd = [
            "Tuliskan 12 mufradat kantin beserta artinya!",
            "Buat 5 kalimat memakai ظرف المكان berbeda dalam konteks kantin!",
            "Tulis dialog transaksi di kantin minimal 8 baris (pembeli–penjual)!"
          ];
          break;
        case 6: // الأسرة (Keluarga)
          details.pemahamanBermakna = "Topik الأسرة melatih murid memperkenalkan anggota keluarga dan menyusun jumlah ismiyah (مبتدأ وخبر) yang rapi, santun, dan bermakna.";
          details.pertanyaanPemantik = [
            "Siapa saja anggota keluargamu dan bagaimana menyebutnya dalam Bahasa Arab?",
            "Apa perbedaan struktur 'أَبِيْ طَبِيْبٌ' dan 'هُنَاكَ أُسْرَةٌ كَبِيْرَةٌ'?",
            "Bagaimana cara memaparkan pekerjaan atau sifat anggota keluarga secara sederhana?"
          ];
          details.langkahInti = [
            "Menyimak & memahami: menyimak dialog/narasi tentang الأسرة dan menandai mubtada'–khabar (TP 1.2.3, 1.2.7).",
            "Berbicara: berpasangan memperkenalkan anggota keluarga (nama, hubungan, sifat/pekerjaan) (TP 1.2.5–1.2.6).",
            "Kaidah مبتدأ وخبر: menyusun kalimat nominal tentang foto keluarga (TP 1.2.7).",
            "Membaca: membaca nyaring teks أُسْرَتِيْ dan menjawab pertanyaan pemahaman (TP 1.2.9).",
            "Menulis: memaparkan gagasan 6–8 kalimat tentang keluargaku (TP 1.2.12, 1.2.14)."
          ];
          details.lkpd = [
            "Tuliskan 10 kosakata anggota keluarga + 5 kalimat mubtada'–khabar!",
            "Buat dialog singkat memperkenalkan keluarga kepada teman baru (minimal 8 baris)!",
            "Tulis monolog 'أُسْرَتِيْ' (6–8 kalimat) dengan struktur jumlah ismiyah yang benar!"
          ];
          break;
        case 7: // الوقت (Waktu)
          details.pemahamanBermakna = "Menguasai ungkapan الوقت dan ظرف الزمان membantu murid menceritakan jadwal harian, jam pelajaran, dan aktivitas tepat waktu dalam Bahasa Arab.";
          details.pertanyaanPemantik = [
            "Jam berapa kamu biasanya bangun, belajar, dan tidur?",
            "Apa saja contoh ظرف الزمان yang sudah kamu ketahui (اليوم، غدا، صباحا)?",
            "Bagaimana menyusun kalimat tentang jadwal harian secara runtut?"
          ];
          details.langkahInti = [
            "Menyimak: mengidentifikasi bunyi kata jam, hari, dan keterangan waktu dari dialog (TP 1.2.1, 1.2.3).",
            "Kaidah ظرف الزمان: memetakan السَّاعَةُ، الْيَوْمَ، غَدًا، صَبَاحًا، مَسَاءً, dll. (TP 1.2.4, 1.2.10).",
            "Berbicara: menceritakan jadwal harian berpasangan dengan keterangan waktu (TP 1.2.5).",
            "Membaca nyaring: teks يَوْمِيْ dan menandai zharf az-zaman (TP 1.2.8).",
            "Menulis: menyusun urutan kata acak menjadi kalimat sempurna tentang waktu/jadwal (TP 1.2.13)."
          ];
          details.lkpd = [
            "Tuliskan jam 1–12 dalam Bahasa Arab dan 8 contoh ظرف الزمان!",
            "Buat dialog tanya-jawab tentang jadwal harian minimal 6 baris!",
            "Susun 5 kalimat acak menjadi kalimat benar tentang aktivitas dan waktunya!"
          ];
          break;
        case 8: // أحمد دحلان (Ahmad Dahlan)
          details.pemahamanBermakna = "Menceritakan keteladanan أحمد دحلان dalam Bahasa Arab memadukan maharat berbahasa dengan nilai ISMUBA; kaidah خبر مقدم memperkuat penekanan makna dalam narasi.";
          details.pertanyaanPemantik = [
            "Siapa K.H. Ahmad Dahlan dan mengapa beliau penting bagi pelajar Muhammadiyah?",
            "Bagaimana menyusun kalimat yang menekankan tempat/sifat terlebih dahulu (khabar muqaddam)?",
            "Nilai keteladanan apa dari Ahmad Dahlan yang ingin kamu praktikkan di sekolah?"
          ];
          details.langkahInti = [
            "Menyimak & memahami: menyimak biografi singkat أحمد دحلان berbahasa Arab sederhana (TP 1.2.3).",
            "Kaidah terpadu: review ظرف الزمان/المكان dan praktik مبتدأ وخبر مقدم pada kalimat tentang tokoh (TP 1.2.7, 1.2.10).",
            "Berbicara: diskusi/interaksi tentang keteladanan dan kontribusi pendidikan (TP 1.2.5–1.2.6).",
            "Membaca nyaring: teks أَحْمَدُ دَحْلَانُ dengan pemahaman isi (TP 1.2.8).",
            "Menulis & unjuk kerja: monolog 8–10 kalimat + presentasi singkat keteladanan (TP 1.2.11, 1.2.14)."
          ];
          details.lkpd = [
            "Tuliskan 10 mufradat terkait biografi/keteladanan + 4 kalimat خبر مقدم!",
            "Buat dialog singkat tentang keteladanan Ahmad Dahlan (minimal 6 baris)!",
            "Tulis monolog 'أَحْمَدُ دَحْلَانُ' (8–10 kalimat) memuat zharf dan mubtada'–khabar/khabar muqaddam!"
          ];
          break;
      }
    } else if (kelas === 'XI') {
      // Fase F Kelas XI — 4 maharat, 2 materi/semester
      switch (bab) {
        case 1: // المهنة (Profesi)
          details.pemahamanBermakna = "Menguasai kosakata dan dialog tentang المهنة membekali murid untuk menjelaskan cita-cita, pekerjaan keluarga, dan peran sosial dalam Bahasa Arab.";
          details.pertanyaanPemantik = [
            "Profesi apa yang ingin kamu tekuni setelah lulus SMK?",
            "Bagaimana menyebutkan pekerjaan ayah/ibu dalam Bahasa Arab?",
            "Mengapa penting mampu memperkenalkan profesi dalam komunikasi global?"
          ];
          details.langkahInti = [
            "Menyimak: mengidentifikasi bunyi kata dan dialog tentang profesi (TP 2.1.1–2.1.3).",
            "Melafalkan: menirukan mufradat profesi dan ungkapan 'أُرِيْدُ أَنْ أَكُوْنَ...' berpasangan (TP 2.1.2).",
            "Berbicara: wawancara mini tentang cita-cita dan alasan memilih profesi (TP 2.1.5–2.1.6).",
            "Membaca nyaring: teks tentang profesi dan menjawab pertanyaan pemahaman (TP 2.1.8).",
            "Menulis: menyusun 6–8 kalimat tentang profesi impian dengan struktur gramatikal tepat (TP 2.1.11, 2.1.14)."
          ];
          details.lkpd = [
            "Tuliskan 12 nama profesi dalam Bahasa Arab beserta artinya!",
            "Buat dialog singkat tentang cita-cita profesi (minimal 8 baris)!",
            "Tulis monolog 'مِهْنَتِي الْمُسْتَقْبَلِيَّةُ' (6–8 kalimat)!"
          ];
          break;
        case 2: // أدوات المواصلات (Alat Transportasi)
          details.pemahamanBermakna = "Topik أدوات المواصلات melatih murid mendeskripsikan cara bepergian, membandingkan moda transportasi, dan berinteraksi dalam konteks perjalanan.";
          details.pertanyaanPemantik = [
            "Dengan apa kamu biasanya pergi ke sekolah?",
            "Apa kelebihan dan kekurangan transportasi umum di daerahmu?",
            "Bagaimana menanyakan arah atau jenis kendaraan dalam Bahasa Arab?"
          ];
          details.langkahInti = [
            "Menyimak: mengidentifikasi kosakata transportasi dari dialog/audio (TP 2.1.1, 2.1.3).",
            "Berbicara: role-play bertanya-jawab tentang moda transportasi ke suatu tempat (TP 2.1.5–2.1.6).",
            "Kaidah komunikatif: menyusun kalimat lokasi/cara pergi dengan gramatikal tepat (TP 2.1.7).",
            "Membaca: membaca nyaring teks tentang perjalanan dan memahami isi (TP 2.1.8–2.1.9).",
            "Menulis: memaparkan dan menyusun urutan kata menjadi kalimat tentang transportasi (TP 2.1.12–2.1.13)."
          ];
          details.lkpd = [
            "Tuliskan 12 kosakata alat transportasi + 5 kalimat 'أَذْهَبُ بِ...'!",
            "Buat dialog di terminal/halte minimal 8 baris!",
            "Susun 5 kalimat acak menjadi kalimat benar tentang perjalanan!"
          ];
          break;
        case 3: // يوم العيد (Hari Raya)
          details.pemahamanBermakna = "Materi يوم العيد menghubungkan keterampilan berbahasa Arab dengan pengalaman keagamaan dan budaya: ucapan, silaturahmi, dan aktivitas hari raya.";
          details.pertanyaanPemantik = [
            "Apa saja yang biasanya kamu lakukan pada hari raya?",
            "Bagaimana mengucapkan selamat hari raya dalam Bahasa Arab?",
            "Nilai apa yang ingin kamu jaga saat merayakan hari raya bersama keluarga?"
          ];
          details.langkahInti = [
            "Menyimak: mengidentifikasi bunyi kata dan dialog hari raya (TP 2.2.1–2.2.3).",
            "Melafalkan: praktik ungkapan selamat dan balasannya (TP 2.2.2).",
            "Berbicara: role-play silaturahmi dan bercerita pengalaman Idulfitri/Iduladha (TP 2.2.5–2.2.6).",
            "Membaca nyaring: teks narasi hari raya dan memahami isi (TP 2.2.8).",
            "Menulis: 6–8 kalimat tentang pengalaman hari raya di keluarga (TP 2.2.11, 2.2.14)."
          ];
          details.lkpd = [
            "Tuliskan 10 mufradat hari raya + 4 ungkapan ucapan selamat!",
            "Buat dialog silaturahmi minimal 8 baris!",
            "Tulis monolog 'يَوْمُ الْعِيْدِ فِي أُسْرَتِيْ' (6–8 kalimat)!"
          ];
          break;
        case 4: // في السوق (Di Pasar)
          details.pemahamanBermakna = "Dialog في السوق melatih komunikasi fungsional: menawar, menyebutkan harga, dan memaparkan barang dagangan secara santun dan efektif.";
          details.pertanyaanPemantik = [
            "Apa yang biasa kamu beli di pasar atau toko?",
            "Bagaimana cara menawar harga dengan sopan dalam Bahasa Arab?",
            "Mengapa keterampilan berdialog di pasar berguna di dunia kerja?"
          ];
          details.langkahInti = [
            "Menyimak: mengidentifikasi kosakata pasar dan dialog jual-beli (TP 2.2.1, 2.2.3).",
            "Berbicara: simulasi penjual–pembeli (menanya harga, menawar, membayar) (TP 2.2.5–2.2.6).",
            "Kaidah: menilai dan memakai struktur kalimat transaksi yang tepat (TP 2.2.7, 2.2.10).",
            "Membaca: teks di pasar dan menjawab pertanyaan pemahaman (TP 2.2.8–2.2.9).",
            "Menulis: memaparkan gagasan dan menyusun urutan kata tentang belanja (TP 2.2.12–2.2.13)."
          ];
          details.lkpd = [
            "Tuliskan 12 mufradat pasar/barang + 5 kalimat harga!",
            "Buat dialog jual-beli minimal 10 baris (ada tawar-menawar)!",
            "Susun 5 kalimat acak menjadi dialog singkat di pasar!"
          ];
          break;
      }
    } else if (kelas === 'XII') {
      // Fase F Kelas XII Bahasa Arab
      switch (bab) {
        case 1: // العطلة (Liburan)
          details.pemahamanBermakna = "Topik العطلة melatih murid menceritakan rencana dan pengalaman liburan, destinasinya, serta kesan perjalanan dalam Bahasa Arab.";
          details.pertanyaanPemantik = [
            "Ke mana kamu ingin berlibur dan mengapa?",
            "Apa perbedaan menceritakan rencana liburan dan pengalaman liburan yang sudah lewat?",
            "Kegiatan apa yang paling berkesan saat liburan sekolah?"
          ];
          details.langkahInti = [
            "Menyimak: mengidentifikasi kosakata dan dialog liburan (TP 3.1.1–3.1.3).",
            "Melafalkan: menirukan ungkapan rencana dan kesan liburan (TP 3.1.2).",
            "Berbicara: berpasangan berbagi rencana/pengalaman liburan (TP 3.1.5–3.1.6).",
            "Membaca nyaring: teks narasi liburan dan pemahaman isi (TP 3.1.8).",
            "Menulis: monolog 8–10 kalimat tentang liburan impian/pengalaman (TP 3.1.11, 3.1.14)."
          ];
          details.lkpd = [
            "Tuliskan 12 mufradat liburan/tempat wisata beserta artinya!",
            "Buat dialog rencana liburan minimal 8 baris!",
            "Tulis monolog 'عُطْلَتِيْ' (8–10 kalimat)!"
          ];
          break;
        case 2: // في المطار (Di Bandara)
          details.pemahamanBermakna = "Komunikasi في المطار membekali murid dengan bahasa fungsional perjalanan: check-in, boarding, menanyakan gerbang, dan bagasi.";
          details.pertanyaanPemantik = [
            "Pernahkah kamu ke bandara? Apa saja yang kamu lihat di sana?",
            "Informasi apa yang penting saat berada di bandara?",
            "Bagaimana menanyakan jadwal penerbangan atau gerbang dalam Bahasa Arab?"
          ];
          details.langkahInti = [
            "Menyimak: dialog petugas–penumpang di bandara (TP 3.1.1, 3.1.3).",
            "Berbicara: role-play check-in dan menanyakan informasi penerbangan (TP 3.1.5–3.1.6).",
            "Kaidah komunikatif: menyusun kalimat permintaan informasi dengan tepat (TP 3.1.7, 3.1.10).",
            "Membaca: teks/pengumuman sederhana di bandara (TP 3.1.8–3.1.9).",
            "Menulis: memaparkan dan menyusun kalimat tentang perjalanan udara (TP 3.1.12–3.1.13)."
          ];
          details.lkpd = [
            "Tuliskan 12 mufradat bandara + 5 kalimat tanya-jawab di bandara!",
            "Buat dialog check-in minimal 10 baris!",
            "Susun 5 kalimat acak menjadi prosedur singkat di bandara!"
          ];
          break;
        case 3: // في محطة القطار (Di Stasiun Kereta Api)
          details.pemahamanBermakna = "Dialog di stasiun kereta api melatih literasi perjalanan darat: tiket, jalur, jadwal, dan interaksi dengan petugas/penumpang.";
          details.pertanyaanPemantik = [
            "Apa perbedaan pengalaman di stasiun kereta dengan di bandara?",
            "Informasi apa yang perlu dicek sebelum naik kereta?",
            "Bagaimana membeli tiket atau menanyakan jalur dalam Bahasa Arab?"
          ];
          details.langkahInti = [
            "Menyimak: dialog di loket tiket dan di peron (TP 3.2.1–3.2.3).",
            "Melafalkan: mufradat stasiun dan ungkapan permintaan tiket (TP 3.2.2).",
            "Berbicara: role-play membeli tiket dan menanyakan jadwal (TP 3.2.5–3.2.6).",
            "Membaca nyaring: teks/narasi di stasiun (TP 3.2.8).",
            "Menulis: 6–8 kalimat tentang perjalanan dengan kereta (TP 3.2.11, 3.2.14)."
          ];
          details.lkpd = [
            "Tuliskan 12 mufradat stasiun kereta + 5 kalimat jadwal/tiket!",
            "Buat dialog di loket tiket minimal 8 baris!",
            "Tulis monolog singkat 'رِحْلَةٌ بِالْقِطَارِ' (6–8 kalimat)!"
          ];
          break;
        case 4: // رؤساء إندونيسيا (Para Presiden Indonesia)
          details.pemahamanBermakna = "Membahas رؤساء إندونيسيا dalam Bahasa Arab mengintegrasikan literasi kebangsaan, sejarah singkat tokoh, dan keterampilan memaparkan biografi sederhana.";
          details.pertanyaanPemantik = [
            "Siapa presiden Indonesia yang paling kamu kenal dan mengapa?",
            "Apa yang dapat diteladani dari kepemimpinan para presiden?",
            "Bagaimana menyusun biografi singkat tokoh dalam Bahasa Arab?"
          ];
          details.langkahInti = [
            "Menyimak: teks/audio biografi singkat para presiden (TP 3.2.1, 3.2.3).",
            "Berbicara: presentasi mini 1 tokoh + tanya jawab kelas (TP 3.2.5–3.2.6).",
            "Kaidah: menyusun kalimat biografi (lahir, menjabat, jasa) dengan gramatikal tepat (TP 3.2.7, 3.2.10).",
            "Membaca: teks tentang tokoh bangsa dan pemahaman mendalam (TP 3.2.8–3.2.9).",
            "Menulis: memaparkan gagasan dan menyusun kalimat runtut tentang 1–2 presiden (TP 3.2.12–3.2.13)."
          ];
          details.lkpd = [
            "Tuliskan 10 mufradat biografi/kepemimpinan + 4 kalimat tentang 1 presiden!",
            "Buat dialog singkat tentang keteladanan tokoh bangsa (minimal 6 baris)!",
            "Tulis monolog biografi singkat 1 presiden Indonesia (8–10 kalimat)!"
          ];
          break;
      }
    }
  } else if (mapel === 'kemuh') {
    if (fase === 'E') {
      switch (bab) {
        case 1:
          details.pemahamanBermakna = "Mengenal identitas, sejarah, dan karakteristik Perguruan Muhammadiyah sebagai amal usaha pendidikan guna membentuk pribadi berilmu dan berakhlak.";
          details.pertanyaanPemantik = [
            "Apa yang melatarbelakangi berdirinya Perguruan Muhammadiyah?",
            "Mengapa Perguruan Muhammadiyah disebut wadah perkaderan umat?",
            "Apa karakteristik utama Perguruan Muhammadiyah dibandingkan sekolah lain?"
          ];
          details.langkahInti = [
            "Murid menyimak paparan guru mengenai sejarah berdirinya Perguruan Muhammadiyah.",
            "Murid berdiskusi kelompok mengidentifikasi ciri khas perguruan Muhammadiyah.",
            "Latihan: menuliskan peran Perguruan Muhammadiyah bagi kemajuan umat.",
            "Presentasi hasil kerja kelompok di depan kelas.",
            "Refleksi: bagaimana menjadi pelajar Muhammadiyah yang baik."
          ];
          details.lkpd = [
            "Sebutkan 3 tujuan utama didirikannya Perguruan Muhammadiyah!",
            "Tuliskan analisis Anda mengenai peran sekolah Muhammadiyah sebagai wadah kaderisasi!",
            "Buatlah mindmap tentang struktur amal usaha bidang pendidikan di Muhammadiyah!"
          ];
          break;
        case 2:
          details.pemahamanBermakna = "Mengamalkan Janji Pelajar Muhammadiyah dalam membentuk integritas moral dan kedisiplinan diri sehari-hari.";
          details.pertanyaanPemantik = [
            "Sebutkan butir pertama Janji Pelajar Muhammadiyah!",
            "Mengapa janji ini penting diikrarkan oleh setiap pelajar Muhammadiyah?",
            "Bagaimana cara mengamalkan butir janji tersebut di sekolah?"
          ];
          details.langkahInti = [
            "Murid melafalkan teks Janji Pelajar Muhammadiyah secara bersama-sama dipimpin oleh guru.",
            "Murid mengkaji makna filosofis dari setiap butir janji.",
            "Murid menulis studi kasus tentang pelanggaran janji dan cara mengatasinya.",
            "Diskusi kelompok: merumuskan langkah konkret pengamalan janji di lingkungan sekolah.",
            "Komitmen bersama: menandatangani lembar janji pelajar Muhammadiyah."
          ];
          details.lkpd = [
            "Tuliskan kembali secara lengkap teks Janji Pelajar Muhammadiyah!",
            "Uraikan maksud dari butir 'menjaga nama baik ikatan dan sekolah'!",
            "Berikan 3 contoh perilaku nyata di kelas yang sesuai dengan janji pelajar!"
          ];
          break;
        case 3:
          details.pemahamanBermakna = "Meneladani kegigihan K.H. Ahmad Dahlan dalam merintis Muhammadiyah sebagai gerakan dakwah dan tajdid.";
          details.pertanyaanPemantik = [
            "Siapakah pendiri organisasi Muhammadiyah?",
            "Mengapa KH Ahmad Dahlan mendirikan Muhammadiyah pada tahun 1912?",
            "Apa saja tantangan awal dakwah Muhammadiyah?"
          ];
          details.langkahInti = [
            "Murid menonton cuplikan film 'Sang Pencerah' atau membaca teks biografi KH Ahmad Dahlan.",
            "Murid mendiskusikan latar belakang sosial keagamaan berdirinya Muhammadiyah.",
            "Murid membuat lini masa (timeline) sejarah perkembangan Muhammadiyah.",
            "Analisis kelompok: pengaruh teologi Surah Al-Ma'un terhadap berdirinya Muhammadiyah.",
            "Guru memberikan penguatan materi mengenai dakwah amar ma'ruf nahi munkar."
          ];
          details.lkpd = [
            "Jelaskan latar belakang sosiologis berdirinya Muhammadiyah di Yogyakarta!",
            "Tuliskan biografi singkat KH Ahmad Dahlan dan nilai keteladanan yang dapat diambil!",
            "Jelaskan hubungan Surah Al-Ma'un dengan gerakan sosial Muhammadiyah!"
          ];
          break;
        case 4:
          details.pemahamanBermakna = "Memahami ciri-ciri Muhammadiyah sebagai gerakan Islam, dakwah amar ma'ruf nahi munkar, dan gerakan tajdid.";
          details.pertanyaanPemantik = [
            "Apa arti dari istilah tajdid (pembaruan) dalam Muhammadiyah?",
            "Bagaimana Muhammadiyah menerapkan dakwah amar ma'ruf nahi munkar di era modern?",
            "Mengapa Muhammadiyah disebut gerakan Islam?"
          ];
          details.langkahInti = [
            "Guru menerangkan tiga pilar gerakan Muhammadiyah: Islam, Dakwah, Tajdid.",
            "Murid menganalisis konsep purifikasi (pemurnian) dan dinamisasi (pembaruan) ajaran Islam.",
            "Kelompok berdiskusi mengenai contoh gerakan tajdid Muhammadiyah di bidang sosial-pendidikan.",
            "Murid merumuskan relevansi amar ma'ruf nahi munkar bagi kehidupan remaja.",
            "Murid mempresentasikan hasil diskusi kelompok."
          ];
          details.lkpd = [
            "Uraikan pengertian tajdid dalam bidang akidah dan bidang kemasyarakatan!",
            "Berikan contoh nyata gerakan dakwah kultural Muhammadiyah di masyarakat!",
            "Mengapa Muhammadiyah menolak perbuatan TBC (Tahayul, Bid'ah, Churafat)?"
          ];
          break;
        case 5:
          details.pemahamanBermakna = "Memahami tata kelola organisasi Muhammadiyah yang modern, profesional, dan demokratis.";
          details.pertanyaanPemantik = [
            "Bagaimana hierarki kepemimpinan di Muhammadiyah?",
            "Apa nama pimpinan Muhammadiyah tingkat kecamatan?",
            "Bagaimana pengambilan keputusan dilakukan di Muhammadiyah?"
          ];
          details.langkahInti = [
            "Murid mengamati diagram struktur pimpinan Muhammadiyah (Pusat, Wilayah, Daerah, Cabang, Ranting).",
            "Guru menjelaskan fungsi pimpinan di masing-masing tingkat.",
            "Murid bermain peran (roleplay) pelaksanaan musyawarah ranting/cabang.",
            "Murid mendiskusikan pentingnya tertib organisasi dalam persyarikatan.",
            "Murid membuat bagan struktur pimpinan Muhammadiyah."
          ];
          details.lkpd = [
            "Gambarkan bagan struktur organisasi kepemimpinan Muhammadiyah dari Ranting hingga Pusat!",
            "Jelaskan pengertian dan tugas Pimpinan Cabang Muhammadiyah (PCM)!",
            "Apa yang dimaksud dengan musyawarah mufakat dalam pengambilan keputusan Muhammadiyah?"
          ];
          break;
        case 6:
          details.pemahamanBermakna = "Mengenal peran Majelis, Lembaga, dan Organisasi Otonom Muhammadiyah sebagai ujung tombak gerakan dakwah.";
          details.pertanyaanPemantik = [
            "Apa perbedaan antara Majelis dan Lembaga di Muhammadiyah?",
            "Sebutkan 3 Organisasi Otonom Muhammadiyah yang Anda ketahui!",
            "Apa nama Ortom Muhammadiyah khusus untuk pelajar?"
          ];
          details.langkahInti = [
            "Guru memaparkan macam-macam Majelis (Dikdasmen, Tabligh, dll) dan Lembaga.",
            "Murid mendalami profil dan sejarah berdirinya Ortom Muhammadiyah (IPM, HW, Tapak Suci, dll).",
            "Kerja kelompok: membuat poster profil salah satu Ortom Muhammadiyah.",
            "Murid mempresentasikan lambang, motto, dan tujuan Ortom pilihan mereka.",
            "Refleksi: kontribusi Ortom terhadap pembentukan karakter kepemudaan."
          ];
          details.lkpd = [
            "Sebutkan 3 Majelis di Muhammadiyah beserta bidang garapannya!",
            "Tuliskan lambang, semboyan, dan sejarah singkat dari Ikatan Pelajar Muhammadiyah (IPM)!",
            "Jelaskan peran Gerakan Kepanduan Hizbul Wathan (HW) dalam membina karakter pemuda!"
          ];
          break;
      }
    } else if (fase === 'F') {
      if (kelas === 'XI') {
        switch (bab) {
          case 1:
            details.pemahamanBermakna = "Menganalisis sejarah periodisasi kepemimpinan Muhammadiyah untuk melestarikan nilai perjuangan dari para tokoh.";
            details.pertanyaanPemantik = [
              "Siapakah pengganti KH Ahmad Dahlan sebagai ketua pimpinan pusat?",
              "Bagaimana perjuangan Muhammadiyah di masa penjajahan Jepang?",
              "Siapa tokoh Muhammadiyah yang berperan dalam perumusan Pancasila?"
            ];
            details.langkahInti = [
              "Murid membaca teks periodisasi perjuangan Muhammadiyah.",
              "Diskusi kelompok: ketokohan KH Mas Mansur atau Ki Bagus Hadikusumo.",
              "Murid menganalisis perubahan fokus gerakan Muhammadiyah dari masa ke masa.",
              "Murid menyajikan peta konsep kepemimpinan Muhammadiyah pasca kemerdekaan.",
              "Guru memberikan kesimpulan teologis perjuangan tokoh Muhammadiyah."
            ];
            details.lkpd = [
              "Buatlah tabel periodisasi kepemimpinan Muhammadiyah beserta program kerja unggulannya!",
              "Jelaskan peran Ki Bagus Hadikusumo dalam penyusunan sila pertama Pancasila!",
              "Apa ibrah terbesar dari perjuangan tokoh Muhammadiyah masa kemerdekaan?"
            ];
            break;
          case 2:
            details.pemahamanBermakna = "Menghayati pokok pikiran Muqaddimah Anggaran Dasar Muhammadiyah (MADM) sebagai fondasi ideologi gerakan.";
            details.pertanyaanPemantik = [
              "Siapa perumus utama MADM?",
              "Mengapa Muhammadiyah membutuhkan Anggaran Dasar?",
              "Sebutkan pokok pikiran pertama dalam MADM!"
            ];
            details.langkahInti = [
              "Guru menceritakan sejarah perumusan MADM oleh Ki Bagus Hadikusumo dkk.",
              "Murid membaca 7 pokok pikiran MADM dengan saksama.",
              "Murid mendiskusikan esensi tauhid sebagai asas utama gerakan Muhammadiyah.",
              "Murid mempresentasikan hubungan MADM dengan cita-cita masyarakat Islam yang sebenar-benarnya.",
              "Murid menulis resume pokok pikiran MADM."
            ];
            details.lkpd = [
              "Tuliskan latar belakang sejarah disusunnya Muqaddimah Anggaran Dasar Muhammadiyah (MADM)!",
              "Jelaskan 3 pokok pikiran utama dalam MADM!",
              "Mengapa hidup bermasyarakat merupakan kewajiban bagi seorang muslim menurut MADM?"
            ];
            break;
          case 3:
            details.pemahamanBermakna = "Mengamalkan 10 sifat Kepribadian Muhammadiyah untuk memelihara ketertiban masyarakat dan ukhuwah Islamiyah.";
            details.pertanyaanPemantik = [
              "Kapan Kepribadian Muhammadiyah dirumuskan?",
              "Sebutkan sifat kepribadian Muhammadiyah yang berkaitan dengan ukhuwah!",
              "Bagaimana cara kita mengamalkan kepribadian Muhammadiyah di masyarakat?"
            ];
            details.langkahInti = [
              "Guru menjelaskan latar belakang perumusan Kepribadian Muhammadiyah pada Muktamar ke-35.",
              "Murid menelaah 10 sifat Kepribadian Muhammadiyah satu per satu.",
              "Murid berdiskusi tentang bagaimana Muhammadiyah bersikap toleran tanpa mengorbankan prinsip aqidah.",
              "Murid mensimulasikan penyelesaian konflik sosial berdasarkan Kepribadian Muhammadiyah.",
              "Guru menyimpulkan sifat kepribadian sebagai pemandu etis pelajar."
            ];
            details.lkpd = [
              "Sebutkan secara berurutan 10 sifat Kepribadian Muhammadiyah!",
              "Jelaskan makna kalimat 'Muhammadiyah bersifat keagamaan dan kemasyarakatan'!",
              "Bagaimana penerapan sifat 'membantu pemerintah' dalam kehidupan bernegara?"
            ];
            break;
          case 4:
            details.pemahamanBermakna = "Memahami Matan Keyakinan dan Cita-cita Hidup Muhammadiyah (MKCHM) sebagai pedoman berakidah dan bernegara.";
            details.pertanyaanPemantik = [
              "Apa perbedaan MKCHM dengan MADM?",
              "Bagaimana paham agama menurut Muhammadiyah?",
              "Sebutkan isi rumusan ideologi dalam MKCHM!"
            ];
            details.langkahInti = [
              "Guru memaparkan sejarah penyusunan MKCHM pada Tanwir Ponorogo.",
              "Murid menganalisis rumusan akidah, ibadah, dan akhlak menurut MKCHM.",
              "Murid berdiskusi kelompok membedakan kelompok ajaran agama (ideologis, paham agama, bidang kemasyarakatan).",
              "Murid mempresentasikan konsep fungsi NKRI menurut MKCHM.",
              "Murid menulis laporan hasil diskusi."
            ];
            details.lkpd = [
              "Tuliskan pembagian kelompok rumusan isi MKCHM!",
              "Bagaimana Muhammadiyah memandang fungsi akal dan wahyu dalam memahami agama?",
              "Jelaskan cita-cita nasional bangsa Indonesia menurut pandangan MKCHM!"
            ];
            break;
          case 5:
            details.pemahamanBermakna = "Menerapkan Pedoman Hidup Islami Warga Muhammadiyah (PHIWM) dalam kehidupan pribadi, keluarga, dan bermasyarakat.";
            details.pertanyaanPemantik = [
              "Mengapa Muhammadiyah menyusun PHIWM?",
              "Bagaimana adab bertetangga menurut PHIWM?",
              "Apa pentingnya menjaga keutuhan keluarga islami menurut pedoman ini?"
            ];
            details.langkahInti = [
              "Guru menerangkan pengertian dan tujuan PHIWM.",
              "Murid mendiskusikan bab-bab dalam PHIWM: kehidupan pribadi, keluarga, bermasyarakat.",
              "Murid membuat naskah drama pendek tentang etika bertetangga islami.",
              "Murid menampilkan drama pendek di depan kelas.",
              "Guru memberikan evaluasi akhlak dan adab sesuai PHIWM."
            ];
            details.lkpd = [
              "Jelaskan latar belakang dirumuskannya Pedoman Hidup Islami Warga Muhammadiyah!",
              "Uraikan bagaimana tuntunan kehidupan dalam mengelola lingkungan hidup menurut PHIWM!",
              "Tuliskan 3 adab berorganisasi yang baik menurut tuntunan PHIWM!"
            ];
            break;
        }
      } else if (kelas === 'XII') {
        switch (bab) {
          case 1:
            details.pemahamanBermakna = "Menganalisis Khittah Perjuangan Muhammadiyah sebagai kompas strategi pergerakan dakwah kemasyarakatan.";
            details.pertanyaanPemantik = [
              "Apa yang dimaksud dengan Khittah Muhammadiyah?",
              "Sebutkan nama Khittah yang dirumuskan di Denpasar!",
              "Mengapa Khittah Muhammadiyah berubah sesuai tantangan zaman?"
            ];
            details.langkahInti = [
              "Guru menjelaskan pengertian Khittah Perjuangan Muhammadiyah.",
              "Murid membandingkan Khittah Palembang (1956) dengan Khittah Denpasar (2002).",
              "Diskusi kelompok: hubungan Muhammadiyah dengan politik praktis menurut Khittah Ujung Pandang.",
              "Murid mempresentasikan hasil analisis komparatif Khittah.",
              "Refleksi: pentingnya menjaga netralitas aktif persyarikatan."
            ];
            details.lkpd = [
              "Jelaskan perbedaan antara Khittah Palembang dan Khittah Ponorogo!",
              "Bagaimana sikap Muhammadiyah terhadap politik kekuasaan menurut Khittah Denpasar 2002?",
              "Mengapa menjaga khittah persyarikatan penting bagi keutuhan gerakan dakwah?"
            ];
            break;
          case 2:
            details.pemahamanBermakna = "Memahami esensi dan sistem kaderisasi Muhammadiyah untuk kelangsungan estafet kepemimpinan umat.";
            details.pertanyaanPemantik = [
              "Siapa yang disebut sebagai kader Muhammadiyah?",
              "Mengapa kaderisasi merupakan jantung persyarikatan?",
              "Sebutkan jalur perkaderan formal di Muhammadiyah!"
            ];
            details.langkahInti = [
              "Guru menjelaskan hakikat kader dan tujuan perkaderan Muhammadiyah.",
              "Murid mengidentifikasi empat jalur perkaderan: keluarga, sekolah, Ortom, dan pengkajian.",
              "Murid merancang program kegiatan kaderisasi kreatif untuk tingkat ranting.",
              "Presentasi program kaderisasi oleh perwakilan kelompok.",
              "Murid menulis refleksi: 'Peranku sebagai kader masa depan Muhammadiyah'."
            ];
            details.lkpd = [
              "Jelaskan profil kader ideal Muhammadiyah yang memiliki kompetensi spiritual dan intelektual!",
              "Tuliskan perbedaan antara jalur perkaderan formal (Baitul Arqam/Darul Arqam) dan informal!",
              "Bagaimana peran keluarga Muhammadiyah dalam menjaga kontinuitas kader?"
            ];
            break;
          case 3:
            details.pemahamanBermakna = "Menganalisis sistem pengkaderan Organisasi Otonom Muhammadiyah dalam melahirkan generasi pelopor.";
            details.pertanyaanPemantik = [
              "Apa nama pengkaderan formal tingkat dasar di IPM?",
              "Apa itu Latihan Kader Utama (LAKUT) di IPM?",
              "Bagaimana Ortom Tapak Suci melakukan pembinaan kader pesilatnya?"
            ];
            details.langkahInti = [
              "Murid mempelajari panduan pengkaderan Ortom Muhammadiyah (IPM, HW, TS).",
              "Murid mendiskusikan pelaksanaan Taruna Melati (TM) IPM and Darul Arqam (DA) IMM.",
              "Murid menganalisis kurikulum perkaderan Hizbul Wathan di sekolah.",
              "Simulasi pelaksanaan salah satu sesi materi perkaderan Ortom.",
              "Guru menyimpulkan karakteristik khusus perkaderan masing-masing Ortom."
            ];
            details.lkpd = [
              "Sebutkan jenjang perkaderan Taruna Melati di Ikatan Pelajar Muhammadiyah!",
              "Jelaskan sistem pembinaan kader kepemimpinan dalam Gerakan Kepanduan Hizbul Wathan!",
              "Mengapa Ortom Tapak Suci Putra Muhammadiyah mengintegrasikan seni bela diri dengan pemurnian aqidah?"
            ];
            break;
          case 4:
            details.pemahamanBermakna = "Menganalisis sikap kritis, toleran, dan moderat (wasathiyah) Muhammadiyah terhadap gerakan Islam transnasional.";
            details.pertanyaanPemantik = [
              "Apa yang dimaksud dengan gerakan Islam transnasional?",
              "Mengapa paham radikal dapat mengancam persatuan NKRI?",
              "Bagaimana sikap moderasi (wasathiyah) Muhammadiyah?"
            ];
            details.langkahInti = [
              "Guru memaparkan peta pemikiran gerakan Islam kontemporer dan transnasional.",
              "Murid menganalisis artikel tentang pandangan moderasi beragama Muhammadiyah.",
              "Diskusi kelompok: cara membentengi remaja dari pengaruh pemikiran ekstrem/radikal.",
              "Presentasi kelompok: 'Wasathiyah Islam cermin kepribadian Muhammadiyah'.",
              "Refleksi bersama mengenai pentingnya toleransi aktif."
            ];
            details.lkpd = [
              "Jelaskan karakteristik utama gerakan Islam transnasional!",
              "Mengapa Muhammadiyah menolak gerakan yang bersifat khilafah politik internasional?",
              "Bagaimana strategi kepemimpinan Muhammadiyah dalam merespons radikalisme agama di Indonesia?"
            ];
            break;
          case 5:
            details.pemahamanBermakna = "Menginternalisasi spirit Islam Berkemajuan untuk memajukan ilmu pengetahuan, teknologi, dan peradaban dunia.";
            details.pertanyaanPemantik = [
              "Apa pilar utama pemikiran Islam Berkemajuan?",
              "Bagaimana Muhammadiyah memandang kemajuan teknologi di era digital?",
              "Apa peran nyata pelajar Muhammadiyah dalam memajukan peradaban?"
            ];
            details.langkahInti = [
              "Guru menerangkan pemikiran Islam Berkemajuan hasil Muktamar ke-48.",
              "Murid mendiskusikan implementasi etos kemajuan dalam pendidikan dan sosial.",
              "Kelompok berdiskusi membuat program pemanfaatan AI/teknologi digital untuk dakwah sosial.",
              "Presentasi ide dakwah berkemajuan berbasis teknologi digital.",
              "Murid merumuskan komitmen belajar setinggi-tingginya demi peradaban Islam."
            ];
            details.lkpd = [
              "Jelaskan makna 'Islam Berkemajuan' menurut rumusan resmi persyarikatan Muhammadiyah!",
              "Sebutkan 3 pilar aksi nyata Muhammadiyah dalam mewujudkan Islam Berkemajuan di bidang IPTEK!",
              "Buatlah rencana aksi pribadi Anda sebagai pelajar berkemajuan untuk berinovasi di bidang pendidikan!"
            ];
            break;
        }
      }
    }
  }

  // Selalu lengkapi LKPD agar selaras TP / inti pembelajaran materi aktif
  details.lkpd = buildLkpdFromMateri(
    materi || { bab, judul: '', elemen: '', tp: [] },
    mapel,
    Array.isArray(details.lkpd) ? details.lkpd : []
  );

  // Generasi LKPD Utuh Kontekstual (Tidak Templateble)
  details.detailedLkpd = getDetailedLkpdForBab(fase, bab, mapel, kelas, materi);

  // Petunjuk pengerjaan LKPD (dipakai di UI modul)
  details.lkpdPetunjuk = [
    'Kerjakan secara berkelompok (3–4 murid) kecuali bagian Refleksi Individu.',
    'Baca seluruh Tujuan Pembelajaran (TP) bab ini sebelum menjawab.',
    'Setiap jawaban harus memuat: argumen, dalil/landasan (jika relevan), dan contoh nyata.',
    'Gunakan bahasa santun, jujur, dan dapat dipertanggungjawabkan.',
    'Siapkan produk visual ringkas untuk presentasi kelas (maks. 5 menit).',
  ];

  return details;
};

/**
 * Generasi LKPD Utuh dan Spesifik Topik (Non-Templateble)
 * Mengikuti format referensi MODUL PPM DESCRIPTIVE TEXT KELAS X / contohperangkatajarterbaru.md
 */
export const getDetailedLkpdForBab = (fase, bab, mapel = 'pai', kelas = 'X', materi = null) => {
  const judulMateri = (materi?.judul || `Bab ${bab}`).trim();
  const elemen = materi?.elemen || '';
  const labelMapel = mapel === 'arab' ? 'Bahasa Arab' : mapel === 'kemuh' ? 'Kemuhammadiyahan' : 'Pendidikan Agama Islam dan Budi Pekerti';
  const tps = Array.isArray(materi?.tp) && materi.tp.length > 0 ? materi.tp : [
    `Memahami konsep ${judulMateri} secara komprehensif.`,
    `Mengaplikasikan nilai-nilai ${judulMateri} dalam kehidupan sehari-hari.`,
    `Merefleksikan hikmah dan dampak sosial-spiritual dari ${judulMateri}.`
  ];

  // Bank Narasi Stimulation & Soal HOTS Spesifik per Mapel/Topik
  let narasiStimulation = `Dalam konteks kehidupan modern bagi pelajar SMK, materi "${judulMateri}" memiliki peranan esensial. Setiap prinsip dan pembelajaran intinya bukan sekadar wacana teoritis, melainkan pedoman praktis yang membentuk karakter, pola pikir, dan tindakan nyata di lingkungan sekolah maupun masyarakat.`;
  let pemantik1 = `Bagaimana fenomena ${judulMateri} dapat dirasakan pengaruhnya dalam aktivitas kita sehari-hari?`;
  let pemantik2 = `Perubahan positif apa yang seharusnya terjadi pada diri seorang murid setelah menguasai konsep ${judulMateri}?`;
  
  let soalHots = [
    {
      no: 1,
      soal: `Jelaskan pengertian dan konsep utama dari ${judulMateri} beserta kaitannya dengan pembentukan karakter murid SMK!`,
      kunci: `Penjelasan mencakup definisi konseptual ${judulMateri}, indikator utama, dan relevansi langsungnya terhadap kedisiplinan serta integritas murid.`
    },
    {
      no: 2,
      soal: `Mengapa materi ${judulMateri} dijadikan salah satu fokus pembelajaran utama dalam Kurikulum Merdeka di sekolah? Jelaskan alasan akademis dan spiritualnya!`,
      kunci: `Alasan akademis meliputi pengembangan daya nalar kritis (C4-C6), sedangkan alasan spiritual meliputi penguatan akidah dan etos moral.`
    },
    {
      no: 3,
      soal: `Analisislah sebuah contoh studi kasus kontemporer mengenai penerapan atau pelanggaran prinsip ${judulMateri} di lingkungan digital/sosial!`,
      kunci: `Murid mampu menguraikan latar belakang kasus, menganalisis faktor penyebab, serta merumuskan konsekuensi sosial maupun moral.`
    },
    {
      no: 4,
      soal: `Bagaimana langkah-langkah konkret (minimal 4 langkah runtut) untuk mengimplementasikan nilai-nilai ${judulMateri} dalam kehidupan sehari-hari?`,
      kunci: `Tahapan aksi nyata: (1) Kesadaran niat, (2) Perencanaan tindakan harian, (3) Pembiasaan konsisten, (4) Evaluasi/refleksi berkala.`
    },
    {
      no: 5,
      soal: `Jelaskan hasil analisis kelompokmu mengenai materi ${judulMateri}, serta nilai budaya atau akhlak luhur apa yang dapat diteladani dari pembelajaran ini!`,
      kunci: `Sintesis menyeluruh dari analisis kelompok yang menghubungkan teori dengan komitmen perubahan sikap pribadi.`
    }
  ];

  // Kustomisasi Spesifik Topik PAI / Arab / Kemuh
  if (mapel === 'pai') {
    if (judulMateri.toLowerCase().includes('fastabiqul khairat')) {
      narasiStimulation = `Dalam kehidupan modern, persaingan sering diartikan sebagai upaya saling menjatuhkan. Namun, Rasulullah SAW dan Al-Qur'an mengajarkan konsep "Fastabiqul Khairat"—berlomba-lomba dalam kebaikan. Seseorang yang menerapkan etos ini tidak iri atas keberhasilan orang lain, melainkan terpacu untuk meningkatkan kualitas ibadah, belajar, dan kepedulian sosialnya.`;
      pemantik1 = `Apakah kompetisi dalam kebaikan sama dengan kompetisi mengejar popularitas di media sosial? Mengapa?`;
      pemantik2 = `Jika sejarah mencatat para sahabat Nabi berlomba infak dan amal, bagaimana pelajar SMK berlomba dalam kebaikan di sekolah?`;
      soalHots[0].soal = `Tuliskan dan jelaskan QS. Al-Maidah (5): 48 tentang perintah Fastabiqul Khairat beserta kandungan hukumnya!`;
      soalHots[1].soal = `Mengapa etos kerja seorang muslim dikategorikan sebagai bagian dari bentuk Fastabiqul Khairat? Jelaskan keterkaitannya!`;
    } else if (judulMateri.toLowerCase().includes('syu\'abul iman')) {
      narasiStimulation = `Iman bukanlah sekadar pengakuan lisan yang pasif. Rasulullah SAW menjelaskan bahwa iman memiliki 77 cabang (Syu'abul Iman), dari yang paling utama yaitu kalimat Laa ilaaha illallah, hingga yang paling sederhana yaitu menyingkirkan rintangan dari jalan. Hal ini membuktikan bahwa iman mencakup seluruh aspek pikiran, ucapan, dan tindakan fisik manusia.`;
      pemantik1 = `Mengapa tindakan menyingkirkan duri atau sampah di jalan dikategorikan sebagai cabang keimanan?`;
      pemantik2 = `Bagaimana korelasi antara integritas seorang murid di saat tidak ada orang yang melihat dengan kualitas Syu'abul Iman dalam dirinya?`;
    } else if (judulMateri.toLowerCase().includes('hukum islam') || judulMateri.toLowerCase().includes('ijtihad')) {
      narasiStimulation = `Perkembangan teknologi modern melahirkan berbagai persoalan hukum baru yang tidak ditemukan secara eksplisit pada masa lampau, seperti transaksi digital, kecerdasan buatan (AI), dan donor organ. Melalui metodologi Ijtihad, Ijma', dan Qiyas yang berlandaskan Al-Qur'an dan Hadis, syariat Islam mampu memberikan ketetapan hukum yang adil dan maslahat sepanjang zaman.`;
      pemantik1 = `Apakah hukum Islam bersifat kaku atau elastis dalam merespons kemajuan jaman? Berikan alasannya!`;
      pemantik2 = `Bagaimana hierarki penentuan hukum jika suatu permasalahan baru muncul di masyarakat?`;
    }
  } else if (mapel === 'arab') {
    narasiStimulation = `Bahasa Arab (اللغة العربية) bukan sekadar alat komunikasi nasional di timur tengah, melainkan bahasa Al-Qur'an dan khazanah keilmuan Islam global. Menguasai struktur Nahwu, Sharaf, serta Maharat Al-Kalam (keterampilan berbicara) dan Hiwar (percakapan) membuka pintu pemahaman terhadap teks-teks klasik serta interaksi internasional.`;
    pemantik1 = `Mengapa ketepatan harakat (i'rab) dan makharijul huruf sangat mempengaruhi arti sebuah kata dalam Bahasa Arab?`;
    pemantik2 = `Bagaimana cara melatih kelancaran berdialog Bahasa Arab (Hiwar) secara mandiri di lingkungan SMK?`;
    soalHots[0].soal = `Uraikan perbedaan antara Jumlah Ismiyyah dan Jumlah Fi'liyyah beserta contohnya dari materi ${judulMateri}!`;
    soalHots[1].soal = `Terjemahkan dan analisislah pola kalimat (wazan) yang terkandung dalam bacaan/dialog materi ${judulMateri}!`;
  } else if (mapel === 'kemuh') {
    narasiStimulation = `Sejak didirikan oleh K.H. Ahmad Dahlan pada tahun 1912 di Yogyakarta, Muhammadiyah senantiasa mengusung gerak Tajdid (pembaruan) dan Teologi Al-Ma'un. Melalui jaringan Amal Usaha Muhammadiyah (AUM) di bidang pendidikan, kesehatan, dan sosial, persyarikatan membuktikan bahwa dakwah Islam harus menghadirkan kemajuan nyata bagi bangsa dan kemanusiaan.`;
    pemantik1 = `Mengapa K.H. Ahmad Dahlan memilih mendirikan sekolah modern daripada sekadar pesantren tradisional pada masa kolonial?`;
    pemantik2 = `Bagaimana peran Organisasi Otonom (Ortom) seperti IPM, HW, dan Tapak Suci dalam membina karakter kader muda Muhammadiyah?`;
    soalHots[0].soal = `Jelaskan latar belakang historis dan sosiologis didirikannya persyarikatan Muhammadiyah oleh KH. Ahmad Dahlan!`;
    soalHots[1].soal = `Analisislah makna 'Islam Berkemajuan' dan bagaimana pelaksanaannya di sekolah SMKS Muhammadiyah 2 Genteng!`;
  }

  return {
    judulLkpd: `LEMBAR KERJA PESERTA DIDIK (LKPD) ${labelMapel.toUpperCase()}`,
    subJudul: `"Lintasan Waktu & Pembelajaran Inti: Membedah Konsep ${judulMateri}"`,
    identitas: {
      mapel: labelMapel,
      faseKelas: `${fase} / ${kelas}`,
      materi: judulMateri,
      elemen: elemen,
      model: 'Discovery Learning',
      targetDpl: 'Kolaborasi, Komunikasi, Kemandirian, Kewargaan, Penalaran Kritis'
    },
    tujuan: [
      `1. Memahami konsep dasar ${judulMateri} melalui analisis kritis dan contoh konkret kehidupan sehari-hari.`,
      `2. Mengaplikasikan konsep ${judulMateri} (dimensi subjek/manusia, waktu, ruang, dan sebab-akibat) dalam menyelesaikan masalah kontekstual.`,
      `3. Merefleksikan nilai luhur dan hikmah ${judulMateri} dalam sikap berakhlak, tanggung jawab, dan tindakan nyata.`
    ],
    petunjuk: [
      '1. Bekerjalah dalam kelompok (4-5 orang) untuk melatih Kolaborasi dan Komunikasi.',
      '2. Gunakan gawai/buku perpustakaan/Al-Qur\'an untuk mencari data secara Mandiri.',
      '3. Ikuti tahapan Discovery Learning di bawah ini secara kritis, jujur, dan bertanggung jawab.'
    ],
    rubrikPenilaian: [
      {
        no: 1,
        komponen: 'Pemahaman Konsep',
        sub: [
          `1.1 Menjelaskan pengertian dan hakikat ${judulMateri} dengan benar`,
          `1.2 Mengidentifikasi pilar/komponen utama ${judulMateri}`,
          `1.3 Mengaitkan konsep dengan realitas kehidupan murid`
        ]
      },
      {
        no: 2,
        komponen: 'Analisis Topik & Kasus',
        sub: [
          `2.1 Mengidentifikasi unsur manusia/subjek pelaksana`,
          `2.2 Menentukan unsur waktu dan ruang/lingkungan penerapan`,
          `2.3 Menjelaskan hubungan sebab–akibat munculnya masalah/fenomena`,
          `2.4 Menyajikan analisis secara logis, kritis, dan runtut`
        ]
      },
      {
        no: 3,
        komponen: 'Refleksi Nilai & Sikap',
        sub: [
          `3.1 Mengidentifikasi nilai hikmah dan moral dari materi`,
          `3.2 Menunjukkan sikap menghargai dan berakhlak mulia`,
          `3.3 Mengusulkan rencana aksi nyata pelestarian/penerapan`
        ]
      },
      {
        no: 4,
        komponen: 'Sikap & Kerjasama',
        sub: [
          `4.1 Menunjukkan sikap menghargai pendapat kawan`,
          `4.2 Menunjukkan tanggung jawab dan kolaborasi dalam kelompok`,
          `4.3 Menunjukkan kedisiplinan dan kejujuran dalam analisis`
        ]
      },
      {
        no: 5,
        komponen: 'Waktu',
        sub: [
          `5.1 Ketepatan waktu penyelesaian LKPD dan keaktifan presentasi`
        ]
      }
    ],
    bobotPenilaian: {
      persiapan: 10,
      proses: 30,
      hasil: 40,
      sikap: 10,
      waktu: 10
    },
    langkahKerja: {
      stimulation: {
        narasi: narasiStimulation,
        pertanyaanPemantik: [pemantik1, pemantik2]
      },
      problemStatement: `Berdasarkan pemaparan di atas, diskusikan dengan kelompokmu: Bagaimana unsur subjek (manusia), waktu, lingkungan (ruang), dan hubungan sebab-akibat membentuk pemahaman utuh mengenai "${judulMateri}" hingga dapat kita amalkan secara nyata hari ini?`,
      dataCollection: `Pilihlah satu studi kasus / contoh konkret pelaksanaan "${judulMateri}" di lingkungan sekitar atau sekolah. Carilah data pendukung melalui diskusi, buku teks, mushaf Al-Qur'an/hadis, atau penelusuran digital mencakup: (1) Latar belakang & subjek pelaksana, (2) Waktu & tempat kejadian/penerapan, (3) Faktor pendorong & dampaknya.`,
      dataProcessing: {
        instruksi: `Isilah tabel analisis di bawah ini berdasarkan hasil riset dan diskusi kelompokmu!`,
        headers: ['Dimensi / Konsep', `Analisis pada Topik: ${judulMateri}`],
        rows: [
          {
            konsep: 'Subjek / Manusia (Aktor)',
            pemicu: `Siapa saja pihak/masyarakat/tokoh/murid yang terlibat dan berperan utama dalam pelaksanaan atau penerapan materi ini?`
          },
          {
            konsep: 'Waktu (Kapan)',
            pemicu: `Kapan materi/peristiwa ini mulai berlaku atau momen apa yang paling tepat untuk mengimplementasikannya dalam kehidupan harian?`
          },
          {
            konsep: 'Ruang / Lingkungan (Di mana)',
            pemicu: `Di lingkungan mana (sekolah, rumah, dunia digital, masyarakat) konsep ini paling krusial diterapkan? Mengapa?`
          },
          {
            konsep: 'Sebab & Akibat (Kausalitas)',
            pemicu: `Sebab: Mengapa materi/konsep ini diperintahkan atau penting untuk dipelajari?\nAkibat: Apa dampak positif jika dilaksanakan, dan apa akibat buruk jika diabaikan?`
          }
        ]
      }
    },
    kesimpulanPlaceholder: `Tuliskan ringkasan kesimpulan kelompokmu (minimal 5 kalimat utuh) yang menghubungkan seluruh hasil analisis di atas dengan komitmen perubahan perilaku sehari-hari!`,
    postTest: {
      quizizzLink: 'https://quizizz.com/admin/quiz/672aa4e4301644833110c825',
      soal: soalHots
    }
  };
};


// List of mock students for grade books

const mockStudents = [
  "Ahmad Fauzi", "Aisyah Humaira", "Ali Syihab", "Anisa Rahmawati", "Bagus Pratama",
  "Budi Santoso", "Citra Kirana", "Dedi Hermawan", "Dewi Lestari", "Eka Saputra",
  "Farhan Al-Ghifari", "Fatimah Azzahra", "Genta Wisesa", "Hana Pertiwi", "Heri Setiawan",
  "Indah Cahyani", "Joko Susilo", "Kartika Sari", "Lutfi Hakim", "Muhammad Yusuf",
  "Nabila Putri", "Naufal Hadi", "Olivia Amanda", "Putra Wijaya", "Rahmat Hidayat",
  "Siti Aminah", "Taufiq Rahman", "Umar Al-Faruq", "Vina Panduwinata", "Zainal Abidin"
];

// Helper to generate calendar days for months
export const generateCalendar = (monthIndex, year) => {
  const date = new Date(year, monthIndex, 1);
  const days = [];
  const startDay = date.getDay(); // 0 is Sunday
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  // Padding for previous month
  for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
    days.push({ day: '', isHoliday: false, isActive: false });
  }

  for (let d = 1; d <= totalDays; d++) {
    const dayOfWeek = (startDay + d - 1) % 7;
    const isSunday = dayOfWeek === 0;
    // Mock holidays (Sundays + some arbitrary dates)
    const isHoliday = isSunday || (d === 17 && monthIndex === 7) || (d === 25 && monthIndex === 11);
    days.push({
      day: d,
      isHoliday,
      isActive: !isHoliday && d % 4 !== 0,
      label: isSunday ? 'L' : d % 12 === 0 ? 'UTS' : d % 28 === 0 ? 'UAS' : ''
    });
  }
  return days;
};

export const indonesianMonthsGanjil = [
  { name: 'Juli', days: generateCalendar(6, 2025) },
  { name: 'Agustus', days: generateCalendar(7, 2025) },
  { name: 'September', days: generateCalendar(8, 2025) },
  { name: 'Oktober', days: generateCalendar(9, 2025) },
  { name: 'November', days: generateCalendar(10, 2025) },
  { name: 'Desember', days: generateCalendar(11, 2025) },
];

export const indonesianMonthsGenap = [
  { name: 'Januari', days: generateCalendar(0, 2026) },
  { name: 'Februari', days: generateCalendar(1, 2026) },
  { name: 'Maret', days: generateCalendar(2, 2026) },
  { name: 'April', days: generateCalendar(3, 2026) },
  { name: 'Mei', days: generateCalendar(4, 2026) },
  { name: 'Juni', days: generateCalendar(5, 2026) },
];

export const ArabicText = ({ text }) => {
  if (typeof text === 'string' && /[\u0600-\u06FF]/.test(text)) {
    // Isolate Arabic words (including spaces between them) so punctuation stays in LTR flow
    const parts = text.split(/([\u0600-\u06FF]+(?:[\s]+[\u0600-\u06FF]+)*)/g);
    return (
      <span style={{ display: 'inline' }}>
        {parts.map((part, i) =>
          /[\u0600-\u06FF]/.test(part)
            ? <bdi key={i} dir="rtl" className="arabic-text">{part}</bdi>
            : <span key={i}>{part}</span>
        )}
      </span>
    );
  }
  return text;
};

