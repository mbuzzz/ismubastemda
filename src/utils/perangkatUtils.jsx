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
      case 6: // Toleransi & Kerukunan
        return [
          { nama: dplNames.kewargaan, deskripsi: "Lulusan menjunjung tinggi toleransi (tasamuh) antarumat beragama, peduli sosial, dan berperan aktif memelihara kerukunan hidup bermasyarakat." },
          { nama: dplNames.kolaborasi, deskripsi: "Lulusan mampu bekerja sama secara sinergis lintas kelompok, menghargai perbedaan, dan meredam gesekan sosial demi kepentingan bersama." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu mengidentifikasi dan memecahkan potensi konflik keagamaan secara objektif berdasarkan dalil QS. Yunus/10: 40-41." }
        ];
      case 7: // Muru'ah, Ikhlas, Malu, Zuhud
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan mempraktikkan keimanan yang ikhlas, memiliki rasa malu (haya') dalam berbuat maksiat, serta senantiasa menjaga kehormatan diri (muru'ah)." },
          { nama: dplNames.kemandirian, deskripsi: "Lulusan tangguh dalam mengendalikan nafsu dan nafsu duniawi (zuhud), bertanggung jawab penuh atas keputusan moral pribadinya." },
          { nama: dplNames.kesehatan, deskripsi: "Lulusan mengelola stres duniawi dan mencapai kebahagiaan mental (mental well-being) melalui rasa syukur, keikhlasan, dan kepasrahan yang produktif." }
        ];
      case 8: // Adab Bermedsos
        return [
          { nama: dplNames.komunikasi, deskripsi: "Lulusan mampu menyebarkan pesan kebaikan secara efektif di media sosial dengan bahasa yang santun, informatif, dan menyesuaikan dengan audiens." },
          { nama: dplNames.kewargaan, deskripsi: "Lulusan menaati aturan etika dan hukum siber, menolak penyebaran berita bohong (hoax), serta menjaga persatuan bangsa di dunia maya." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan cerdas memilah informasi, membedakan fakta dari opini/fitnah, dan menilai validitas berita yang beredar sebelum membagikannya." }
        ];
      case 9: // Ketentuan Pernikahan
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan menghargai sakralnya ikatan pernikahan dalam Islam sebagai bentuk ketaatan ibadah yang berintegritas tinggi." },
          { nama: dplNames.kewargaan, deskripsi: "Lulusan memahami tanggung jawab hukum, sosial, dan agama dalam membangun keluarga sakinah yang harmonis." },
          { nama: dplNames.kolaborasi, deskripsi: "Lulusan memiliki pemahaman pentingnya komunikasi dua arah, saling melengkapi peran, dan meredam konflik keluarga secara damai." }
        ];
      case 10: // Peradaban Islam
        return [
          { nama: dplNames.penalaran, deskripsi: "Lulusan menganalisis secara logis dan analitis faktor kunci kemajuan peradaban sains umat Islam di masa kejayaan." },
          { nama: dplNames.kreativitas, deskripsi: "Lulusan termotivasi mengembangkan ide orisinal untuk menciptakan riset ilmiah atau karya inovatif demi kemajuan ilmu pengetahuan." },
          { nama: dplNames.kewargaan, deskripsi: "Lulusan berkontribusi positif bagi peradaban dunia dengan semangat kebangsaan dan nilai-nilai kemanusiaan universal." }
        ];
      default:
        return [
          { nama: dplNames.keimanan, deskripsi: "Lulusan memiliki integritas spiritual dan moralitas kokoh." },
          { nama: dplNames.penalaran, deskripsi: "Lulusan mampu bernalar kritis dalam mendalami ajaran Islam." }
        ];
    }
  }
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

export const getPpmDetails = (fase, bab, mapel = 'pai', kelas = 'X') => {
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
        case 6: // Toleransi & Kerukunan
          details.pemahamanBermakna = "Kerukunan dan toleransi adalah fondasi perdamaian. Memelihara kehidupan manusia merupakan kewajiban luhur setiap muslim.";
          details.pertanyaanPemantik = [
            "Bagaimana sikap kita ketika menghadapi perbedaan keyakinan atau cara ibadah di lingkungan sekitar?",
            "Mengapa Islam melarang keras segala bentuk kekerasan atau penganiayaan terhadap nyawa manusia?",
            "Apa peran moderasi beragama dalam menjaga persatuan NKRI?"
          ];
          details.langkahInti = [
            "Murid membaca QS. Yunus (10): 40-41 dan QS. Al-Maidah (5): 32 beserta tafsirnya.",
            "Guru menampilkan video tentang praktik toleransi di Indonesia (misal: gotong royong lintas agama).",
            "Diskusi kelompok: bagaimana menjadi muslim yang moderat (wasathiyah) di sekolah dan masyarakat.",
            "Bermain peran: simulasi dialog antaragama yang santun dan saling menghargai.",
            "Refleksi: menulis komitmen pribadi untuk menjaga kerukunan di lingkungan tempat tinggal."
          ];
          details.lkpd = [
            "Jelaskan pesan QS. Al-Maidah (5): 32 tentang memelihara kehidupan manusia!",
            "Beri 3 contoh sikap toleransi yang bisa diterapkan di lingkungan sekolah!",
            "Apa yang dimaksud dengan moderasi beragama (wasathiyah) dan bagaimana implementasinya?"
          ];
          break;
        case 7: // Muru'ah, Ikhlas, Malu, Zuhud
          details.pemahamanBermakna = "Menjaga harga diri (muru'ah), keikhlasan, rasa malu dari perbuatan maksiat, dan menyikapi dunia secara proporsional (zuhud) membentuk ketenangan batin sejati.";
          details.pertanyaanPemantik = [
            "Bagaimana konsep zuhud yang benar di era modern yang penuh dengan budaya konsumerisme?",
            "Mengapa rasa malu (haya') dikategorikan sebagai mahkota akhlak seorang muslim?",
            "Bagaimana cara menjaga kehormatan diri (muru'ah) dalam pergaulan sehari-hari?"
          ];
          details.langkahInti = [
            "Murid membaca hadis-hadis tentang malu, ikhlas, dan zuhud dari kitab hadis.",
            "Guru memberikan skenario dilema moral: antara popularitas di medsos vs menjaga muru'ah.",
            "Diskusi kelompok: merumuskan kiat-kiat menjaga keikhlasan dan muru'ah di era digital.",
            "Bermain peran: menolak tawaran materi dengan tetap menjaga harga diri.",
            "Refleksi: mengisi lembar evaluasi tingkat keikhlasan dalam beramal selama sepekan."
          ];
          details.lkpd = [
            "Jelaskan pengertian muru'ah, ikhlas, haya' (malu), dan zuhud beserta dalilnya!",
            "Bagaimana cara menumbuhkan sifat malu dalam pergaulan di era modern?",
            "Buatlah 5 contoh perilaku zuhud yang relevan untuk seorang pelajar SMK!"
          ];
          break;
        case 8: // Adab Bermedsos
          details.pemahamanBermakna = "Media sosial adalah sarana komunikasi yang harus dimanfaatkan dengan adab mulia, menyebarkan kebaikan, menghindari hoaks, serta tabayyun atas segala informasi.";
          details.pertanyaanPemantik = [
            "Mengapa tabayyun (klarifikasi) sangat krusial dilakukan sebelum membagikan suatu berita di media sosial?",
            "Apa bahaya menyebarkan ujaran kebencian (hate speech) menurut timbangan hukum Islam?",
            "Bagaimana cara memanfaatkan media sosial sebagai ladang dakwah kreatif?"
          ];
          details.langkahInti = [
            "Murid membaca artikel tentang etika bermedia sosial dalam perspektif Islam.",
            "Guru menampilkan contoh unggahan medsos yang baik dan buruk; murid membedakannya.",
            "Diskusi kelompok: menyusun '10 Etika Muslim dalam Bermedia Sosial'.",
            "Praktik: setiap murid membuat satu konten dakwah kreatif (poster/video pendek) untuk diunggah.",
            "Refleksi: mengevaluasi jejak digital masing-masing dan merencanakan perbaikan."
          ];
          details.lkpd = [
            "Jelaskan langkah-langkah tabayyun sebelum membagikan berita di media sosial!",
            "Sebutkan 3 dampak negatif ujaran kebencian (hate speech) di dunia maya!",
            "Buatlah satu konten dakwah kreatif (minimal 3 paragraf) tentang adab bermedia sosial!"
          ];
          break;
        case 9: // Ketentuan Pernikahan
          details.pemahamanBermakna = "Pernikahan dalam Islam adalah ikatan suci (mitsaqan ghalizhan) untuk mewujudkan ketenteraman keluarga yang sakinah, mawaddah, wa rahmah.";
          details.pertanyaanPemantik = [
            "Apa saja persiapan mental dan keagamaan yang wajib dilakukan remaja sebelum memutuskan menikah?",
            "Mengapa komunikasi dua arah yang harmonis sangat penting bagi keutuhan rumah tangga?",
            "Bagaimana pembagian hak dan kewajiban suami istri secara adil sesuai syariat Islam?"
          ];
          details.langkahInti = [
            "Murid membaca bab pernikahan dari buku fikih, mencakup rukun, syarat, dan mahar.",
            "Guru menyajikan video dokumenter tentang pernikahan dini dan dampaknya.",
            "Diskusi kelompok: menyusun 'Checklist Kesiapan Menikah' dari segi fisik, mental, finansial, dan agama.",
            "Bermain peran: musyawarah keluarga dalam menyelesaikan konflik rumah tangga.",
            "Refleksi: menulis gambaran keluarga idaman versi masing-masing."
          ];
          details.lkpd = [
            "Sebutkan rukun dan syarat pernikahan dalam Islam beserta dalilnya!",
            "Jelaskan hak dan kewajiban suami istri menurut syariat Islam!",
            "Apa yang dimaksud dengan keluarga sakinah, mawaddah, wa rahmah? Bagaimana mewujudkannya?"
          ];
          break;
        case 10: // Peradaban Islam
          details.pemahamanBermakna = "Mempelajari masa kejayaan Islam membangkitkan motivasi riset ilmiah, inovasi sains, dan etos keilmuan yang tinggi untuk kemaslahatan dunia.";
          details.pertanyaanPemantik = [
            "Apa kontribusi terbesar ilmuwan muslim (seperti Ibnu Sina atau Al-Khawarizmi) bagi perkembangan sains modern?",
            "Faktor apa yang menyebabkan pudarnya kejayaan peradaban sains umat Islam di masa lalu?",
            "Bagaimana cara kita membangkitkan kembali semangat inovasi dan penelitian ilmiah di kalangan murid muslim?"
          ];
          details.langkahInti = [
            "Murid membaca artikel tentang ilmuwan muslim di era keemasan Islam (Ibnu Sina, Al-Khawarizmi, Al-Zahrawi, dll).",
            "Setiap kelompok meneliti satu tokoh ilmuwan muslim dan penemuannya.",
            "Kelompok membuat timeline infografis tentang kontribusi ilmuwan muslim bagi dunia.",
            "Presentasi dan diskusi: faktor kemajuan dan kemunduran peradaban Islam.",
            "Refleksi: bagaimana menjadi muslim yang berkontribusi bagi peradaban melalui keahlian SMK masing-masing."
          ];
          details.lkpd = [
            "Sebutkan 5 ilmuwan muslim beserta bidang dan penemuannya!",
            "Apa faktor utama penyebab kemunduran peradaban Islam menurut para sejarawan?",
            "Jika kamu hidup di era keemasan Islam, bidang ilmu apa yang ingin kamu tekuni? Mengapa?"
          ];
          break;
      }
    }
  } else if (mapel === 'arab') {
    // === BAHASA ARAB ===
    const f = fase; // E, F11, or F12
    if (f === 'E') {
      switch (bab) {
        case 1: // Salam dan Ta'aruf
          details.pemahamanBermakna = "Kemampuan memperkenalkan diri dalam Bahasa Arab membuka peluang komunikasi lintas budaya dan mempererat ukhuwah Islamiyah.";
          details.pertanyaanPemantik = [
            "Mengapa penting belajar Bahasa Arab di era globalisasi?",
            "Ungkapan salam apa saja yang sudah kalian ketahui dalam Bahasa Arab?",
            "Apa perbedaan cara perkenalan formal dan non-formal dalam Bahasa Arab?"
          ];
          details.langkahInti = [
            "Murid menyimak audio percakapan perkenalan (ta'aruf) dalam Bahasa Arab.",
            "Guru mendemonstrasikan pelafalan ungkapan salam dan ta'aruf, murid menirukan bersama-sama.",
            "Latihan berpasangan: setiap murid memperkenalkan diri menggunakan struktur kalimat yang benar.",
            "Murid menulis teks perkenalan diri (5-7 kalimat) dalam Bahasa Arab di buku tugas.",
            "Simulasi: 3-4 murid maju ke depan kelas mempraktikkan dialog perkenalan."
          ];
          details.lkpd = [
            "Tuliskan 3 ungkapan salam dalam Bahasa Arab beserta jawabannya!",
            "Buatlah dialog perkenalan singkat (minimal 4 kalimat) antara dua orang!",
            "Perkenalkan dirimu dalam Bahasa Arab: nama, asal sekolah, hobi, dan cita-cita!"
          ];
          break;
        case 2: // Isim Isyarah
          details.pemahamanBermakna = "Kata tunjuk (isim isyarah) adalah alat penting untuk menunjuk benda atau orang dalam komunikasi Bahasa Arab secara tepat.";
          details.pertanyaanPemantik = [
            "Apa perbedaan penggunaan 'هذا' dan 'ذلك' dalam Bahasa Arab?",
            "Bagaimana cara menunjuk benda yang dekat dan jauh dalam Bahasa Arab?",
            "Mengapa penting menguasai kata tunjuk dalam mempelajari Bahasa Arab?"
          ];
          details.langkahInti = [
            "Guru menjelaskan pembagian isim isyarah: jarak dekat (هذا، هذه، هذان) dan jarak jauh (ذلك، تلك).",
            "Murid mengamati benda-benda di sekitar kelas dan menunjuknya menggunakan isim isyarah.",
            "Latihan berpasangan: murid A menunjuk benda, murid B menyebutkan nama benda dengan isim isyarah.",
            "Membaca teks sederhana yang mengandung isim isyarah dan mengartikannya.",
            "Kuis cepat: guru menunjuk gambar, murid berebut menjawab dengan isim isyarah yang tepat."
          ];
          details.lkpd = [
            "Sebutkan 4 macam isim isyarah beserta artinya dan contoh penggunaannya!",
            "Buatlah 5 kalimat sederhana menggunakan isim isyarah jarak dekat!",
            "Tunjukkan 5 benda di kelasmu menggunakan isim isyarah yang tepat!"
          ];
          break;
        case 3: // Mudzakkar dan Muannats
          details.pemahamanBermakna = "Pemahaman tentang jenis kata mudzakkar (laki-laki) dan muannats (perempuan) adalah fondasi tata bahasa Arab yang krusial.";
          details.pertanyaanPemantik = [
            "Apa ciri khas kata benda perempuan (muannats) dalam Bahasa Arab?",
            "Mengapa Bahasa Arab membedakan jenis kelamin pada kata benda?",
            "Bagaimana cara mengubah kata mudzakkar menjadi muannats?"
          ];
          details.langkahInti = [
            "Guru menjelaskan ciri-ciri isim mudzakkar dan muannats (ta' marbutah, lafaz khusus).",
            "Murid mengelompokkan 30 kosakata ke dalam tabel mudzakkar dan muannats.",
            "Latihan lisan: guru menyebutkan kata, murid menentukan jenisnya dengan cepat.",
            "Menyusun kalimat sederhana dengan memperhatikan kesesuaian jenis kata benda.",
            "Game edukasi: 'Gender Sort' - memilah kata mudzakkar dan muannats secara beregu."
          ];
          details.lkpd = [
            "Sebutkan 5 ciri isim muannats beserta contohnya!",
            "Buatlah 10 pasang kata mudzakkar-muannats (contoh: طالب - طالبة)!",
            "Tulislah 5 kalimat yang mengandung isim mudzakkar dan 5 kalimat mengandung isim muannats!"
          ];
          break;
        case 4: // Istifham
          details.pemahamanBermakna = "Kata tanya (adawatul istifham) memungkinkan kita menggali informasi dan berkomunikasi dua arah secara efektif dalam Bahasa Arab.";
          details.pertanyaanPemantik = [
            "Apa saja kata tanya dalam Bahasa Arab yang sudah kalian ketahui?",
            "Mengapa kata tanya penting dalam komunikasi sehari-hari?",
            "Apa perbedaan penggunaan 'هل' dan 'أ' dalam kalimat tanya?"
          ];
          details.langkahInti = [
            "Guru memperkenalkan 8 adawatul istifham (هل، أ، ما، من، أين، كم، كيف، متى).",
            "Murid menyimak contoh dialog tanya jawab menggunakan berbagai kata tanya.",
            "Latihan berpasangan: membuat 5 pertanyaan dan jawaban menggunakan kata tanya berbeda.",
            "Game: 'Wawancara Kilat' - murid bergantian mewawancarai teman dengan 3 pertanyaan.",
            "Menulis karangan pendek tentang aktivitas sehari-hari yang mengandung kalimat tanya."
          ];
          details.lkpd = [
            "Sebutkan 8 adawatul istifham beserta fungsi dan contohnya!",
            "Buatlah 5 kalimat tanya dalam Bahasa Arab menggunakan kata tanya yang berbeda!",
            "Wawancarai teman sebangkumu (3 pertanyaan) dan tuliskan jawabannya dalam Bahasa Arab!"
          ];
          break;
        case 5: // Dhomir
          details.pemahamanBermakna = "Kata ganti (dhamir) adalah inti dari struktur kalimat Bahasa Arab yang menghubungkan subjek dengan predikat.";
          details.pertanyaanPemantik = [
            "Apa perbedaan antara dhamir munfashil dan dhamir muttashil?",
            "Berapa jumlah kata ganti dalam Bahasa Arab?",
            "Mengapa penggunaan dhamir harus sesuai dengan jenis dan jumlah?"
          ];
          details.langkahInti = [
            "Guru menyajikan tabel lengkap dhamir munfashil dan muttashil beserta contohnya.",
            "Murid menghafalkan dhamir secara berkelompok dengan metode gerakan (kinestetik).",
            "Latihan: mengganti subjek dalam kalimat dengan dhamir yang sesuai.",
            "Membaca teks sederhana dan mengidentifikasi dhamir yang terkandung di dalamnya.",
            "Menyusun paragraf pendek tentang keluarga menggunakan dhamir yang tepat."
          ];
          details.lkpd = [
            "Tuliskan 14 dhamir (kata ganti) dalam Bahasa Arab beserta artinya!",
            "Ubahlah kalimat 'ذهب أحمد إلى المدرسة' dengan mengganti subjeknya dengan berbagai dhamir!",
            "Buatlah 5 kalimat menggunakan dhamir munfashil dan 5 kalimat menggunakan dhamir muttashil!"
          ];
          break;
        case 6: // Fi'il Mudhari'
          details.pemahamanBermakna = "Fi'il mudhari' (kata kerja sekarang/akan datang) adalah bentuk kata kerja paling fleksibel yang dapat diubah sesuai waktu dan subjek.";
          details.pertanyaanPemantik = [
            "Apa perbedaan fi'il madhi dan fi'il mudhari'?",
            "Apa ciri-ciri fi'il mudhari' yang membedakannya dengan kata kerja lain?",
            "Bagaimana cara mengubah fi'il mudhari' sesuai dengan pelakunya (dhamir)?"
          ];
          details.langkahInti = [
            "Guru menjelaskan ciri-ciri fi'il mudhari' (diawali huruf mudhara'ah: أ، ن، ي، ت).",
            "Murid melakukan tasrif fi'il mudhari' untuk kata kerja 'كتب' (menulis) dengan 14 dhamir.",
            "Latihan lisan: guru menyebutkan kata kerja, murid mengubah ke bentuk mudhari'.",
            "Membaca cerita pendek tentang rutinitas harian dan mengidentifikasi fi'il mudhari'.",
            "Menulis jurnal harian sederhana (3-4 aktivitas) menggunakan fi'il mudhari'."
          ];
          details.lkpd = [
            "Apa ciri-ciri fi'il mudhari'? Sebutkan huruf mudhara'ah!",
            "Lakukan tasrif fi'il mudhari' untuk kata 'يكتب' (menulis) lengkap dengan dhamirnya!",
            "Buatlah 5 kalimat tentang aktivitas sehari-hari menggunakan fi'il mudhari'!"
          ];
          break;
        case 7: // Huruf Jar
          details.pemahamanBermakna = "Huruf jar adalah kata depan yang mengubah harakat akhir kata benda (isim) dan memberikan makna spasial/temporal dalam kalimat.";
          details.pertanyaanPemantik = [
            "Apa yang terjadi pada harakat isim setelah huruf jar?",
            "Sebutkan huruf jar apa saja yang kalian ketahui!",
            "Mengapa huruf jar penting dalam memahami struktur kalimat Bahasa Arab?"
          ];
          details.langkahInti = [
            "Guru menyajikan 17 huruf jar beserta makna dan contoh penggunaannya.",
            "Murid mengidentifikasi huruf jar dalam teks bacaan dan menjelaskan maknanya.",
            "Latihan: menyusun frasa (syibhul jumlah) dengan berbagai huruf jar.",
            "Game: 'Preposition Bingo' - mencocokkan huruf jar dengan contoh kalimat.",
            "Menulis 5 kalimat lengkap yang mengandung huruf jar berbeda."
          ];
          details.lkpd = [
            "Sebutkan 10 huruf jar beserta artinya masing-masing!",
            "Buatlah 5 contoh syibhul jumlah (frasa kata depan) menggunakan huruf jar yang berbeda!",
            "Tentukan huruf jar dalam kalimat berikut dan jelaskan artinya: 'ذهبتُ إلى المدرسةِ بالحافلةِ'!"
          ];
          break;
        case 8: // Al-Milk dan Adad 1-10
          details.pemahamanBermakna = "Ungkapan kepemilikan dan bilangan adalah keterampilan komunikatif esensial untuk transaksi dan interaksi sehari-hari dalam Bahasa Arab.";
          details.pertanyaanPemantik = [
            "Bagaimana cara menyatakan kepemilikan benda dalam Bahasa Arab?",
            "Apa perbedaan bilangan 1-2 dengan 3-10 dalam kaidah Bahasa Arab?",
            "Bagaimana cara menghitung benda menggunakan Bahasa Arab?"
          ];
          details.langkahInti = [
            "Guru menjelaskan struktur kepemilikan (idhafah) untuk al-milk.",
            "Murid berlatih menyebutkan kepemilikan benda menggunakan kosakata sekitar.",
            "Guru mengajarkan bilangan 1-10 dengan kaidah mudzakkar dan muannats.",
            "Latihan berpasangan: simulasi transaksi jual-beli di kantin menggunakan Bahasa Arab.",
            "Bermain peran: 'Di Pasar' - murid berperan sebagai penjual dan pembeli."
          ];
          details.lkpd = [
            "Buatlah 5 kalimat yang menyatakan kepemilikan dalam Bahasa Arab!",
            "Tuliskan bilangan 1-10 dalam Bahasa Arab (mudzakkar dan muannats)!",
            "Buatlah dialog transaksi sederhana (jual-beli) menggunakan angka dan ungkapan kepemilikan!"
          ];
          break;
      }
    } else if (f === 'F' && bab <= 4) {
      // Fase F Kelas XI (bab 1-4 = ganjil)
      switch (bab) {
        case 1: // Mufrad dan Mutsanna
          details.pemahamanBermakna = "Perubahan bentuk kata dari tunggal (mufrad) ke ganda (mutsanna) menunjukkan ketelitian struktur morfologi Bahasa Arab.";
          details.pertanyaanPemantik = [
            "Apa perbedaan isim mufrad dan isim mutsanna?",
            "Bagaimana cara mengubah isim mufrad menjadi mutsanna?",
            "Apa tanda i'rab isim mutsanna dalam keadaan rafa', nashab, dan jar?"
          ];
          details.langkahInti = [
            "Guru menjelaskan kaidah pembentukan mutsanna (menambah alif-nun atau ya-nun di akhir kata).",
            "Murid mengubah 15 isim mufrad menjadi bentuk mutsanna.",
            "Latihan membaca teks yang mengandung isim mutsanna dan mengidentifikasinya.",
            "Menyusun kalimat sederhana menggunakan subjek dan objek bentuk mutsanna.",
            "Kuis: mencocokkan bentuk mufrad dengan bentuk mutsanna yang benar."
          ];
          details.lkpd = [
            "Jelaskan kaidah pembentukan isim mutsanna beserta contohnya!",
            "Ubahlah 10 isim mufrad berikut menjadi bentuk mutsanna!",
            "Buatlah 5 kalimat menggunakan isim mutsanna dalam berbagai posisi (fa'il, maf'ul, majrur)!"
          ];
          break;
        case 2: // Jamak Mudzakkar Salim
          details.pemahamanBermakna = "Jamak mudzakkar salim adalah pola jamak beraturan untuk kata benda laki-laki yang menunjukkan jumlah lebih dari dua.";
          details.pertanyaanPemantik = [
            "Apa syarat isim yang bisa dijamakkan dengan jamak mudzakkar salim?",
            "Apa perbedaan jamak mudzakkar salim dengan mutsanna?",
            "Bagaimana perubahan i'rab jamak mudzakkar salim dalam kalimat?"
          ];
          details.langkahInti = [
            "Guru menjelaskan pembentukan jamak mudzakkar salim (menambah waw-nun atau ya-nun).",
            "Murid mengidentifikasi isim-isim yang memenuhi syarat jamak mudzakkar salim.",
            "Latihan mengubah 10 isim mufrad ke jamak mudzakkar salim.",
            "Membaca teks tentang profesi dan mengidentifikasi jamak mudzakkar salim.",
            "Menulis paragraf deskriptif tentang kelompok orang menggunakan jamak mudzakkar salim."
          ];
          details.lkpd = [
            "Sebutkan syarat-syarat isim yang bisa dibentuk menjadi jamak mudzakkar salim!",
            "Ubahlah 10 isim berikut ke bentuk jamak mudzakkar salim (contoh: مسلم - مسلمون)!",
            "Buatlah 5 kalimat dengan subjek jamak mudzakkar salim dalam berbagai keadaan i'rab!"
          ];
          break;
        case 3: // Jamak Muannats Salim
          details.pemahamanBermakna = "Jamak muannats salim adalah pola jamak untuk kata benda perempuan yang ditandai dengan tambahan huruf alif dan ta'.";
          details.pertanyaanPemantik = [
            "Apa ciri-ciri isim muannats yang bisa dijamak muannats salim?",
            "Apa perbedaan jamak muannats salim dengan jamak mudzakkar salim?",
            "Bagaimana i'rab jamak muannats salim?"
          ];
          details.langkahInti = [
            "Guru menjelaskan kaidah jamak muannats salim (membuang ta' marbutah, menambah ات).",
            "Murid mengubah 10 isim muannats menjadi jamak muannats salim.",
            "Membaca teks tentang aktivitas perempuan dan mengidentifikasi jamak muannats salim.",
            "Latihan: membuat kalimat dengan subjek jamak muannats salim.",
            "Game: 'Plural Race' - berlomba mengubah kata ke bentuk jamak muannats salim."
          ];
          details.lkpd = [
            "Bagaimana cara membentuk jamak muannats salim? Berikan 5 contoh!",
            "Ubahlah 10 isim muannats berikut ke jamak muannats salim!",
            "Buatlah 5 kalimat dengan subjek jamak muannats salim lengkap dengan harakat!"
          ];
          break;
        case 4: // Jamak Taksir
          details.pemahamanBermakna = "Jamak taksir adalah pola jamak tidak beraturan yang menunjukkan kekayaan dan fleksibilitas morfologi Bahasa Arab.";
          details.pertanyaanPemantik = [
            "Apa perbedaan jamak taksir dengan jamak salim?",
            "Mengapa jamak taksir disebut 'jamak pecah'?",
            "Ada berapa pola jamak taksir dalam Bahasa Arab?"
          ];
          details.langkahInti = [
            "Guru memperkenalkan 5 pola jamak taksir yang paling umum (أفعال، فعال، فواعل، فعلان، افعلة).",
            "Murid menghafalkan 20 kosakata jamak taksir beserta bentuk mufradnya.",
            "Latihan mencocokkan: mufrad dengan jamak taksir yang tepat.",
            "Membaca teks berisi jamak taksir dan mengubahnya kembali ke bentuk mufrad.",
            "Menyusun kalimat menggunakan berbagai pola jamak taksir."
          ];
          details.lkpd = [
            "Sebutkan 5 pola jamak taksir beserta masing-masing 2 contoh!",
            "Tuliskan 10 pasang kata mufrad dan jamak taksirnya (contoh: كتاب - كتب)!",
            "Buatlah 5 kalimat mengandung jamak taksir dan tentukan pola jamaknya!"
          ];
          break;
      }
    } else if (f === 'F' && bab >= 5 && bab <= 8) {
      // Fase F Kelas XI (bab 5-8 = genap)
      switch (bab) {
        case 5: // Nafi dan Nahi
          details.pemahamanBermakna = "Kalimat negatif (nafi) dan larangan (nahi) adalah struktur penting untuk menyampaikan penolakan, larangan, dan sangkalan santun dalam Bahasa Arab.";
          details.pertanyaanPemantik = [
            "Apa perbedaan antara nafi dan nahi dalam Bahasa Arab?",
            "Huruf apa saja yang digunakan untuk menafikan kalimat?",
            "Bagaimana cara melarang seseorang secara santun dalam Bahasa Arab?"
          ];
          details.langkahInti = [
            "Guru menjelaskan pembagian huruf nafi (لم، لن، لا، ما) dan nahi (لا الناهية).",
            "Murid mengubah kalimat positif menjadi kalimat negatif menggunakan berbagai huruf nafi.",
            "Latihan: membuat kalimat larangan menggunakan لا الناهية dengan fi'il mudhari'.",
            "Menyimak audio percakapan dan mengidentifikasi kalimat nafi dan nahi.",
            "Bermain peran: melarang teman melakukan sesuatu dengan santun menggunakan bahasa Arab."
          ];
          details.lkpd = [
            "Sebutkan 4 huruf nafi beserta fungsinya dalam kalimat!",
            "Ubahlah 5 kalimat positif berikut menjadi kalimat negatif!",
            "Buatlah 3 kalimat larangan (nahi) menggunakan لا الناهية beserta artinya!"
          ];
          break;
        case 6: // Fi'il Madhi
          details.pemahamanBermakna = "Fi'il madhi (kata kerja lampau) digunakan untuk menceritakan peristiwa masa lalu dan menjadi dasar pembentukan kata kerja lainnya.";
          details.pertanyaanPemantik = [
            "Apa ciri-ciri fi'il madhi yang membedakannya dengan fi'il mudhari'?",
            "Bagaimana cara men-tasrif fi'il madhi sesuai dhamir?",
            "Mengapa fi'il madhi selalu dalam bentuk terbuka (fathah)?"
          ];
          details.langkahInti = [
            "Guru menjelaskan ciri fi'il madhi (fathah pada akhir kata) dan pembagiannya.",
            "Murid melakukan tasrif fi'il madhi untuk 5 kata kerja berbeda dengan 14 dhamir.",
            "Latihan lisan: menceritakan kegiatan kemarin menggunakan fi'il madhi.",
            "Membaca cerita pendek tentang pengalaman liburan dan mengidentifikasi fi'il madhi.",
            "Menulis paragraf tentang pengalaman tak terlupakan menggunakan fi'il madhi."
          ];
          details.lkpd = [
            "Apa ciri-ciri fi'il madhi? Lakukan tasrif fi'il 'ذهب' dengan 14 dhamir!",
            "Buatlah 5 kalimat tentang kegiatan yang kamu lakukan kemarin menggunakan fi'il madhi!",
            "Tulislah sebuah paragraf (minimal 5 kalimat) tentang liburanmu menggunakan fi'il madhi!"
          ];
          break;
        case 7: // Adad 11-20
          details.pemahamanBermakna = "Sistem bilangan belasan dalam Bahasa Arab memiliki kaidah tersendiri yang membedakannya dengan bilangan 1-10 maupun puluhan.";
          details.pertanyaanPemantik = [
            "Apa perbedaan kaidah adad 11-20 dengan adad 1-10?",
            "Mengapa ma'dud (benda yang dihitung) untuk 11-20 selalu dalam bentuk mufrad?",
            "Bagaimana cara membaca bilangan 11-20 dalam Bahasa Arab?"
          ];
          details.langkahInti = [
            "Guru memperkenalkan bilangan 11-20 beserta kaidah mudzakkar dan muannats.",
            "Murid berlatih melafalkan bilangan 11-20 dengan intonasi yang benar.",
            "Latihan menghitung benda di sekitar kelas menggunakan bilangan 11-20.",
            "Menyelesaikan soal cerita sederhana yang melibatkan bilangan 11-20.",
            "Game: 'Number Quiz' - murid berebut menyebutkan bilangan Arab dengan cepat."
          ];
          details.lkpd = [
            "Tuliskan bilangan 11-20 dalam Bahasa Arab (mudzakkar dan muannats)!",
            "Buatlah 5 kalimat yang mengandung bilangan 11-20 beserta ma'dud-nya!",
            "Selesaikan soal berikut: ثمن الكتاب ١٥ ريالاً dan ثمن القلم ١٢ ريالاً. Berapa total harga keduanya?"
          ];
          break;
        case 8: // Sifat dan Maushuf
          details.pemahamanBermakna = "Susunan sifat (na'at) dan benda yang disifati (man'ut) harus selaras dalam i'rab, jenis, dan jumlah — inilah keindahan struktur Bahasa Arab.";
          details.pertanyaanPemantik = [
            "Apa prinsip utama dalam menyusun sifat dan maushuf?",
            "Mengapa sifat harus mengikuti maushuf dalam jenis dan jumlah?",
            "Apa perbedaan na'at haqiqi dan na'at sababi?"
          ];
          details.langkahInti = [
            "Guru menjelaskan kaidah na'at man'ut: kesesuaian dalam i'rab, jenis, dan jumlah.",
            "Murid mengidentifikasi pasangan sifat dan maushuf dalam teks bacaan.",
            "Latihan: menambahkan sifat yang tepat pada maushuf yang diberikan.",
            "Menyusun paragraf deskriptif tentang lingkungan sekolah menggunakan sifat dan maushuf.",
            "Game: 'Deskripsi Gambar' - murid mendeskripsikan gambar menggunakan 3-4 sifat."
          ];
          details.lkpd = [
            "Jelaskan prinsip kesesuaian antara na'at (sifat) dan man'ut (maushuf)!",
            "Buatlah 5 pasangan sifat dan maushuf dalam kalimat sempurna!",
            "Deskripsikan ruang kelasmu dalam 5 kalimat menggunakan susunan sifat dan maushuf!"
          ];
          break;
      }
    } else if (f === 'F' && bab === 9) {
      // Tidak ada di Arabic - fallback
    } else if (kelas === 'XII') {
      // Fase F Kelas XII Bahasa Arab
      switch (bab) {
        case 1: // Jumlah Ismiyah/Fi'liyah
          details.pemahamanBermakna = "Pembedaan kalimat nominal (jumlah ismiyah) dan verbal (jumlah fi'liyah) adalah fondasi analisis sintaksis Bahasa Arab.";
          details.pertanyaanPemantik = [
            "Apa perbedaan utama antara jumlah ismiyah dan jumlah fi'liyah?",
            "Dengan kata apa jumlah ismiyah dimulai? Dan jumlah fi'liyah?",
            "Mengapa penting membedakan kedua jenis kalimat ini?"
          ];
          details.langkahInti = [
            "Guru menjelaskan struktur jumlah ismiyah (mubtada' + khabar) dan jumlah fi'liyah (fi'il + fa'il).",
            "Murid mengklasifikasikan 10 kalimat ke dalam jumlah ismiyah atau fi'liyah.",
            "Latihan mengonversi jumlah ismiyah menjadi fi'liyah dan sebaliknya.",
            "Membaca teks naratif dan mengidentifikasi jenis-jenis kalimat.",
            "Menulis paragraf yang mengandung campuran kedua jenis kalimat."
          ];
          details.lkpd = [
            "Jelaskan pengertian jumlah ismiyah dan jumlah fi'liyah beserta contohnya!",
            "Ubahlah 3 jumlah ismiyah berikut menjadi jumlah fi'liyah!",
            "Buatlah 5 jumlah ismiyah dan 5 jumlah fi'liyah tentang tema pendidikan!"
          ];
          break;
        case 2: // Mubtada' dan Khabar
          details.pemahamanBermakna = "Mubtada' (subjek) dan khabar (predikat) adalah dua pilar utama jumlah ismiyah yang harus selaras dalam i'rab dan jenis.";
          details.pertanyaanPemantik = [
            "Apa hukum i'rab mubtada' dan khabar?",
            "Bagaimana kesesuaian mubtada' dan khabar dari segi jenis dan jumlah?",
            "Apa saja jenis-jenis khabar dalam jumlah ismiyah?"
          ];
          details.langkahInti = [
            "Guru menjelaskan posisi i'rab mubtada' (rafa') dan khabar (rafa').",
            "Murid mengidentifikasi mubtada' dan khabar dalam 10 kalimat.",
            "Latihan: melengkapi kalimat dengan khabar yang sesuai dengan mubtada'.",
            "Mengenal jenis khabar: mufrad, jumlah, dan syibhul jumlah.",
            "Menyusun 5 jumlah ismiyah dengan variasi jenis khabar."
          ];
          details.lkpd = [
            "Apa yang dimaksud dengan mubtada' dan khabar? Jelaskan dengan contoh!",
            "Tentukan mubtada' dan khabar dalam 5 kalimat berikut!",
            "Buatlah 3 jumlah ismiyah dengan khabar mufrad, 3 dengan khabar jumlah, dan 3 dengan khabar syibhul jumlah!"
          ];
          break;
        case 3: // Fi'il dan Fa'il
          details.pemahamanBermakna = "Fi'il (kata kerja) dan fa'il (subjek pelaku) adalah inti jumlah fi'liyah yang harus selaras dalam jenis dan jumlah.";
          details.pertanyaanPemantik = [
            "Apa hukum i'rab fa'il dalam jumlah fi'liyah?",
            "Mengapa fi'il harus dalam bentuk mufrad meskipun fa'il-nya mutsanna atau jamak?",
            "Apa perbedaan fa'il dan na'ibul fa'il?"
          ];
          details.langkahInti = [
            "Guru menjelaskan struktur jumlah fi'liyah: fi'il + fa'il + maf'ul (jika ada).",
            "Murid mengidentifikasi fi'il dan fa'il dalam 10 kalimat.",
            "Latihan: menentukan bentuk fi'il yang sesuai dengan fa'il-nya.",
            "Mengonversi jumlah ismiyah menjadi jumlah fi'liyah dengan fi'il yang tepat.",
            "Menulis paragraf tentang cita-cita menggunakan jumlah fi'liyah."
          ];
          details.lkpd = [
            "Jelaskan pengertian fi'il dan fa'il beserta hukum i'rabnya!",
            "Tentukan fi'il dan fa'il dalam 5 kalimat berikut! Lengkapi dengan analisis jenis dan bilangannya!",
            "Buatlah 5 jumlah fi'liyah dengan variasi fa'il (mufrad, mutsanna, jamak)!"
          ];
          break;
        case 4: // Ma'dud 20 ke atas
          details.pemahamanBermakna = "Bilangan puluhan, ratusan, dan ribuan dalam Bahasa Arab memiliki kaidah tersendiri yang mencerminkan logika numerik yang sistematis.";
          details.pertanyaanPemantik = [
            "Bagaimana cara menyebutkan bilangan puluhan dalam Bahasa Arab?",
            "Apa kaidah ma'dud untuk bilangan 20 ke atas?",
            "Apa perbedaan antara bilangan 20-99 dengan 100 ke atas?"
          ];
          details.langkahInti = [
            "Guru menjelaskan kaidah bilangan 20-99, 100, dan 1000 beserta ma'dud-nya.",
            "Murid berlatih membaca dan menulis bilangan besar dalam Bahasa Arab.",
            "Latihan: menyebutkan harga barang menggunakan bilangan puluhan/ratusan.",
            "Membaca teks berisi data statistik dan mengartikan bilangan di dalamnya.",
            "Proyek: menyusun laporan keuangan sederhana dalam Bahasa Arab."
          ];
          details.lkpd = [
            "Jelaskan kaidah bilangan 20-99 dalam Bahasa Arab beserta contoh ma'dud-nya!",
            "Tuliskan bilangan berikut dalam Bahasa Arab: 25, 47, 103, 250, 2025!",
            "Buatlah 5 kalimat yang mengandung bilangan di atas 20 (variasi puluhan, ratusan, ribuan)!"
          ];
          break;
        case 5: // Teks Fungsional
          details.pemahamanBermakna = "Teks fungsional dalam Bahasa Arab (surat, pengumuman, artikel) membekali murid keterampilan literasi nyata yang aplikatif.";
          details.pertanyaanPemantik = [
            "Apa saja jenis teks fungsional dalam Bahasa Arab?",
            "Bagaimana struktur surat resmi dalam Bahasa Arab?",
            "Apa perbedaan bahasa formal dan informal dalam teks Bahasa Arab?"
          ];
          details.langkahInti = [
            "Guru menyajikan contoh-contoh teks fungsional: surat, pengumuman, artikel pendek.",
            "Murid membaca dan memahami isi teks fungsional, mencari makna kosakata baru.",
            "Latihan: menjawab pertanyaan pemahaman berdasarkan teks yang dibaca.",
            "Proyek menulis: membuat surat resmi atau pengumuman dalam Bahasa Arab.",
            "Simulasi wawancara kerja sederhana menggunakan Bahasa Arab."
          ];
          details.lkpd = [
            "Bacalah teks pengumuman berikut dan jawablah 5 pertanyaannya!",
            "Buatlah sebuah surat undangan resmi dalam Bahasa Arab (tema bebas)!",
            "Tulislah karangan pendek (10-15 kalimat) tentang 'Cita-citaku' dalam Bahasa Arab!"
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
  return details;
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

