import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
  PageBreak,
  ShadingType,
} from 'docx';
import { saveAs } from 'file-saver';
import { schoolInfo } from '../data/curriculum';
import { generateDynamicLangkahInti } from './perangkatUtils';
import { detailedMateri } from '../data/materiContent';

const FONT = 'Plus Jakarta Sans';

function createTextRun(text, options = {}) {
  return new TextRun({
    text,
    font: FONT,
    size: options.size || 22,
    bold: options.bold || false,
    italics: options.italic || false,
    ...options,
  });
}

function createParagraph(text, options = {}) {
  return new Paragraph({
    children: [createTextRun(text, options)],
    alignment: options.alignment || AlignmentType.LEFT,
    spacing: { after: options.after || 120 },
    ...options.paragraphOptions,
  });
}

function createTableCell(text, options = {}) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [createTextRun(text, { size: 20, bold: options.bold, ...options })],
        alignment: options.alignment || AlignmentType.LEFT,
      }),
    ],
    width: options.width ? { size: options.width, type: WidthType.PERCENTAGE } : undefined,
    shading: options.shading ? { type: ShadingType.SOLID, color: options.shading } : undefined,
    verticalAlign: options.verticalAlign || 'center',
  });
}

function createListTableCell(items, options = {}) {
  return new TableCell({
    children: items.map(item => new Paragraph({
      children: [createTextRun(`• ${item}`, { size: 20, ...options })],
      alignment: options.alignment || AlignmentType.LEFT,
    })),
    width: options.width ? { size: options.width, type: WidthType.PERCENTAGE } : undefined,
    shading: options.shading ? { type: ShadingType.SOLID, color: options.shading } : undefined,
    verticalAlign: options.verticalAlign || 'center',
  });
}

export async function exportToDocx(faseData, semester = 'ganjil', filename = 'perangkat-pembelajaran.docx', ppmDetailsMap = {}) {
  const semesterData = faseData.semester[semester];
  const materiList = semesterData.materi;

  const sections = [];

  // Cover Page
  sections.push(
    new Paragraph({ spacing: { before: 2000 } }),
    createParagraph('PERANGKAT PEMBELAJARAN', { bold: true, size: 32, alignment: AlignmentType.CENTER, after: 200 }),
    createParagraph('MENDALAM (PPM)', { bold: true, size: 32, alignment: AlignmentType.CENTER, after: 400 }),
    new Paragraph({ spacing: { before: 400 } }),
    createParagraph('Mata Pelajaran:', { alignment: AlignmentType.CENTER, size: 24, after: 100 }),
    createParagraph(schoolInfo.mapel, { bold: true, size: 28, alignment: AlignmentType.CENTER, after: 400 }),
    new Paragraph({ spacing: { before: 400 } }),
    createParagraph(`Fase ${faseData.fase} / Kelas ${faseData.kelas}`, { alignment: AlignmentType.CENTER, size: 24, after: 200 }),
    createParagraph(`Semester ${semesterData.nama}`, { alignment: AlignmentType.CENTER, size: 24, after: 600 }),
    new Paragraph({ spacing: { before: 800 } }),
    createParagraph(schoolInfo.name, { bold: true, size: 26, alignment: AlignmentType.CENTER, after: 200 }),
    createParagraph(`Tahun Ajaran ${schoolInfo.tahunAjaran}`, { alignment: AlignmentType.CENTER, size: 22 }),
    new Paragraph({ children: [new PageBreak()] }),
  );

  // Identitas Sekolah
  sections.push(
    createParagraph('IDENTITAS SEKOLAH', { bold: true, size: 26, alignment: AlignmentType.CENTER, after: 300 }),
    new Paragraph({ spacing: { before: 200 } }),
  );

  const identityData = [
    ['Satuan Pendidikan', schoolInfo.name],
    ['Mata Pelajaran', schoolInfo.mapel],
    ['Kelas / Fase', `${faseData.tingkat} / ${faseData.fase}`],
    ['Semester', semesterData.nama],
    ['Tahun Ajaran', schoolInfo.tahunAjaran],
    ['Guru Pengampu', schoolInfo.namaGuru],
    ['Kepala Sekolah', schoolInfo.kepalaSekolah],
    ['Waka Kurikulum', schoolInfo.wakaKurikulum],
    ['JP per Minggu', `${schoolInfo.jpPerMinggu} JP`],
    ['Minggu Efektif', `${schoolInfo.mingguEfektif} Minggu`],
  ];

  identityData.forEach(([label, value]) => {
    sections.push(
      new Paragraph({
        children: [
          createTextRun(`${label}`, { bold: true, size: 22 }),
          createTextRun(` : ${value}`, { size: 22 }),
        ],
        spacing: { after: 80 },
      })
    );
  });

  sections.push(new Paragraph({ children: [new PageBreak()] }));

  // Program Tahunan
  sections.push(
    createParagraph('PROGRAM TAHUNAN', { bold: true, size: 26, alignment: AlignmentType.CENTER, after: 300 }),
    new Paragraph({ spacing: { before: 100 } }),
  );

  const protaRows = [
    new TableRow({
      children: [
        createTableCell('No', { bold: true, alignment: AlignmentType.CENTER, shading: '1976D2', color: 'FFFFFF', width: 5 }),
        createTableCell('Bab', { bold: true, alignment: AlignmentType.CENTER, shading: '1976D2', color: 'FFFFFF', width: 10 }),
        createTableCell('Tujuan Pembelajaran (TP)', { bold: true, alignment: AlignmentType.CENTER, shading: '1976D2', color: 'FFFFFF', width: 55 }),
        createTableCell('Alokasi Waktu', { bold: true, alignment: AlignmentType.CENTER, shading: '1976D2', color: 'FFFFFF', width: 15 }),
        createTableCell('Minggu', { bold: true, alignment: AlignmentType.CENTER, shading: '1976D2', color: 'FFFFFF', width: 15 }),
      ],
    }),
  ];

  let totalJP = 0;
  materiList.forEach((m, idx) => {
    totalJP += m.alokasi;
    protaRows.push(
      new TableRow({
        children: [
          createTableCell(`${idx + 1}`, { alignment: AlignmentType.CENTER }),
          createTableCell(`Bab ${m.bab}`, { alignment: AlignmentType.CENTER }),
          createListTableCell(m.tp),
          createTableCell(`${m.alokasi} JP`, { alignment: AlignmentType.CENTER }),
          createTableCell(`${m.minggu} Minggu`, { alignment: AlignmentType.CENTER }),
        ],
      })
    );
  });

  protaRows.push(
    new TableRow({
      children: [
        createTableCell('', { width: 5 }),
        createTableCell('', { width: 10 }),
        createTableCell('JUMLAH', { bold: true, alignment: AlignmentType.RIGHT }),
        createTableCell(`${totalJP} JP`, { bold: true, alignment: AlignmentType.CENTER }),
        createTableCell(`${schoolInfo.mingguEfektif} Minggu`, { bold: true, alignment: AlignmentType.CENTER }),
      ],
    })
  );

  sections.push(
    new Table({
      rows: protaRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
    })
  );

  sections.push(new Paragraph({ children: [new PageBreak()] }));

  // Modul Ajar / PPM for each bab
  materiList.forEach((materi) => {
    const ppm = ppmDetailsMap[materi.bab] || {};

    sections.push(
      createParagraph(`PERENCANAAN PEMBELAJARAN MENDALAM (PPM)`, { bold: true, size: 24, alignment: AlignmentType.CENTER, after: 200 }),
      createParagraph(`BAB ${materi.bab}: ${materi.judul}`, { bold: true, size: 22, alignment: AlignmentType.CENTER, after: 300 }),
      new Paragraph({ spacing: { before: 100 } }),
    );

    // Identity
    const ppmIdentity = [
      ['Satuan Pendidikan', schoolInfo.name],
      ['Mata Pelajaran', schoolInfo.mapel],
      ['Kelas / Fase', `${faseData.tingkat} / ${faseData.fase}`],
      ['Elemen', materi.elemen],
      ['Alokasi Waktu', `${materi.alokasi} JP (${materi.minggu} Minggu × ${schoolInfo.jpPerMinggu} JP)`],
      ['Guru Pengampu', schoolInfo.namaGuru],
    ];

    ppmIdentity.forEach(([label, value]) => {
      sections.push(
        new Paragraph({
          children: [
            createTextRun(`${label}`, { bold: true, size: 20 }),
            createTextRun(` : ${value}`, { size: 20 }),
          ],
          spacing: { after: 60 },
        })
      );
    });

    sections.push(new Paragraph({ spacing: { before: 200 } }));

    // A. Capaian Pembelajaran
    sections.push(
      createParagraph('A. Capaian Pembelajaran', { bold: true, size: 22, after: 100 }),
      createParagraph(materi.capaian, { size: 20, after: 200 }),
    );

    // B. Tujuan Pembelajaran
    sections.push(createParagraph('B. Tujuan Pembelajaran', { bold: true, size: 22, after: 100 }));
    materi.tp.forEach((tp, idx) => {
      sections.push(
        new Paragraph({ children: [createTextRun(`${idx + 1}. ${tp}`, { size: 20 })], spacing: { after: 60 } })
      );
    });
    sections.push(new Paragraph({ spacing: { before: 200 } }));

    // C. Pemahaman Bermakna
    if (ppm.pemahamanBermakna) {
      sections.push(
        createParagraph('C. Pemahaman Bermakna', { bold: true, size: 22, after: 100 }),
        createParagraph(`"${ppm.pemahamanBermakna}"`, { size: 20, italic: true, after: 200 }),
      );
    }

    // D. Pertanyaan Pemantik
    if (ppm.pertanyaanPemantik && ppm.pertanyaanPemantik.length > 0) {
      sections.push(createParagraph('D. Pertanyaan Pemantik', { bold: true, size: 22, after: 100 }));
      ppm.pertanyaanPemantik.forEach((q, idx) => {
        sections.push(createParagraph(`${idx + 1}. ${q}`, { size: 20, after: 60 }));
      });
      sections.push(new Paragraph({ spacing: { before: 200 } }));
    }

    // E. Langkah Pembelajaran
    sections.push(createParagraph('E. Langkah-langkah Pembelajaran (Per Pertemuan)', { bold: true, size: 22, after: 100 }));
    
    Array.from({ length: materi.minggu }).forEach((_, pertIdx) => {
      const targetTp = materi.tp[pertIdx] || materi.tp[materi.tp.length - 1];
      const isFirst = pertIdx === 0;
      const isLast = pertIdx === materi.minggu - 1;
      const jpPerMinggu = schoolInfo.jpPerMinggu || 3;
      
      sections.push(createParagraph(`PERTEMUAN ${pertIdx + 1} (${jpPerMinggu} JP × 45 Menit)`, { bold: true, size: 20, after: 60 }));
      sections.push(createParagraph(`Fokus TP: ${targetTp}`, { size: 20, italic: true, after: 100 }));
      
      // Awal
      sections.push(createParagraph('1. PENDAHULUAN (15 Menit)', { bold: true, size: 20, after: 60 }));
      if (isFirst) {
        sections.push(createParagraph(`• ${ppm.langkahPendahuluan?.[0] || 'Guru mengucapkan salam dan memimpin doa.'}`, { size: 20, after: 40 }));
        sections.push(createParagraph(`• ${ppm.langkahPendahuluan?.[1] || 'Guru memeriksa kehadiran.'}`, { size: 20, after: 40 }));
        sections.push(createParagraph(`• Menyampaikan pertanyaan pemantik: ${ppm.pertanyaanPemantik?.[0] || '...'}`, { size: 20, after: 40 }));
        sections.push(createParagraph(`• Melakukan asesmen diagnostik awal terkait materi.`, { size: 20, after: 80 }));
      } else {
        sections.push(createParagraph(`• Membuka dengan salam, doa, dan apersepsi mengaitkan materi sebelumnya.`, { size: 20, after: 40 }));
        sections.push(createParagraph(`• Guru memberikan pertanyaan kilat untuk menguji pemahaman.`, { size: 20, after: 40 }));
        sections.push(createParagraph(`• Menjelaskan tujuan spesifik kegiatan hari ini.`, { size: 20, after: 80 }));
      }

      // Inti
      sections.push(createParagraph(`2. KEGIATAN INTI (${jpPerMinggu * 45 - 30} Menit)`, { bold: true, size: 20, after: 60 }));
      
      const dinamisInti = generateDynamicLangkahInti(targetTp, pertIdx);
      dinamisInti.forEach((langkah, lIdx) => {
        const title = lIdx === 0 ? 'Memahami' : lIdx === 1 ? 'Mengaplikasi' : 'Merefleksi';
        const isLastStep = lIdx === 2;
        sections.push(createParagraph(`• Tahap ${lIdx + 1} (${title}): ${langkah}`, { size: 20, after: isLastStep ? 80 : 40 }));
      });

      // Penutup
      sections.push(createParagraph('3. PENUTUP (15 Menit)', { bold: true, size: 20, after: 60 }));
      if (isLast) {
        sections.push(createParagraph(`• ${ppm.langkahPenutup?.[0] || 'Menyimpulkan pembelajaran.'}`, { size: 20, after: 40 }));
        sections.push(createParagraph(`• ${ppm.langkahPenutup?.[1] || 'Refleksi.'}`, { size: 20, after: 40 }));
        sections.push(createParagraph(`• Guru memberikan penguatan nilai Profil Pelajar Pancasila.`, { size: 20, after: 40 }));
        sections.push(createParagraph(`• ${ppm.langkahPenutup?.[4] || 'Menutup dengan doa.'}`, { size: 20, after: 120 }));
      } else {
        sections.push(createParagraph(`• Murid membuat simpulan sementara dari kegiatan hari ini.`, { size: 20, after: 40 }));
        sections.push(createParagraph(`• Guru melakukan asesmen formatif lisan cepat.`, { size: 20, after: 40 }));
        sections.push(createParagraph(`• Menyampaikan tugas mandiri untuk pertemuan selanjutnya.`, { size: 20, after: 40 }));
        sections.push(createParagraph(`• Menutup dengan doa dan salam.`, { size: 20, after: 120 }));
      }
    });

    sections.push(new Paragraph({ spacing: { before: 100 } }));

    // F. Bahan Bacaan Guru & Murid
    sections.push(createParagraph('F. Bahan Bacaan Guru & Murid (Ringkasan Materi)', { bold: true, size: 22, after: 100 }));
    sections.push(createParagraph(`Materi esensial pada bab ini difokuskan pada pemahaman komprehensif terkait ${materi.judul}.`, { size: 20, after: 60 }));
    materi.tp.forEach((tp) => {
      sections.push(createParagraph(`• Konseptualisasi dan implementasi tentang: ${tp.split(' ').slice(2).join(' ')}`, { size: 20, after: 40 }));
    });
    sections.push(new Paragraph({ spacing: { before: 200 } }));

    // G. Dimensi Profil Lulusan (DPL)
    sections.push(createParagraph('G. Dimensi Profil Lulusan (DPL)', { bold: true, size: 22, after: 100 }));
    if (ppm.dpl && ppm.dpl.length > 0) {
      ppm.dpl.forEach((d) => {
        sections.push(createParagraph(`• ${d.nama}: ${d.deskripsi}`, { size: 20, after: 60 }));
      });
    } else {
      sections.push(createParagraph('• Dimensi Profil Lulusan menyesuaikan dengan capaian pembelajaran.', { size: 20, after: 60 }));
    }
    sections.push(new Paragraph({ spacing: { before: 200 } }));

    // H. Asesmen
    sections.push(createParagraph('H. Rencana Asesmen', { bold: true, size: 22, after: 100 }));
    sections.push(createParagraph(`Asesmen Diagnostik: ${ppm.asesmenDiagnostik || 'Tanya jawab awal untuk mengetahui pemahaman awal murid'}`, { size: 20, after: 60 }));
    sections.push(createParagraph(`Asesmen Formatif: ${ppm.asesmenFormatif || 'Observasi, LKPD, dan diskusi kelompok'}`, { size: 20, after: 60 }));
    sections.push(createParagraph(`Asesmen Sumatif: ${ppm.asesmenSumatif || 'Tes tertulis akhir bab, presentasi, dan proyek'}`, { size: 20, after: 200 }));

    // I. Remedial & Pengayaan
    sections.push(createParagraph('I. Remedial & Pengayaan', { bold: true, size: 22, after: 100 }));
    sections.push(createParagraph(`Pengayaan: ${ppm.pengayaan || 'Bagi murid yang telah tuntas diberikan tugas mandiri analisis studi kasus atau menulis artikel reflektif.'}`, { size: 20, after: 60 }));
    sections.push(createParagraph(`Remedial: ${ppm.remedial || 'Bagi murid yang belum tuntas diberikan bimbingan perorangan, tutor sebaya, atau penugasan terstruktur.'}`, { size: 20, after: 200 }));

    // J. Lampiran 1: LEMBAR KERJA PESERTA DIDIK (LKPD) UTUH & PROFESIONAL
    const dLkpd = ppm.detailedLkpd;
    if (dLkpd) {
      sections.push(new Paragraph({ children: [new PageBreak()] }));
      sections.push(createParagraph('LAMPIRAN 1: LEMBAR KERJA PESERTA DIDIK (LKPD)', { bold: true, size: 24, alignment: AlignmentType.CENTER, after: 60 }));
      sections.push(createParagraph(dLkpd.judulLkpd, { bold: true, size: 20, alignment: AlignmentType.CENTER, after: 40 }));
      sections.push(createParagraph(dLkpd.subJudul, { italic: true, size: 18, alignment: AlignmentType.CENTER, after: 160 }));

      // Identitas Table
      const identitasTable = new Table({
        rows: [
          new TableRow({
            children: [
              createTableCell(`Mata Pelajaran: ${dLkpd.identitas.mapel}`, { width: 50 }),
              createTableCell(`Fase / Kelas: ${dLkpd.identitas.faseKelas}`, { width: 50 }),
            ]
          }),
          new TableRow({
            children: [
              createTableCell(`Materi Pokok: ${dLkpd.identitas.materi}`, { width: 50 }),
              createTableCell(`Model: ${dLkpd.identitas.model}`, { width: 50 }),
            ]
          }),
          new TableRow({
            children: [
              createTableCell(`Target Profil Lulusan (DPL): ${dLkpd.identitas.targetDpl}`, { width: 100 }),
            ]
          }),
          new TableRow({
            children: [
              createTableCell(`Nama Kelompok: ...........................................  |  Tanggal: ....................`, { width: 100 }),
            ]
          }),
          new TableRow({
            children: [
              createTableCell(`Anggota Kelompok: 1. .................... 2. .................... 3. .................... 4. ....................`, { width: 100 }),
            ]
          }),
        ],
        width: { size: 100, type: WidthType.PERCENTAGE },
      });
      sections.push(identitasTable);
      sections.push(new Paragraph({ spacing: { before: 140 } }));

      // I. Tujuan Pembelajaran
      sections.push(createParagraph('I. TUJUAN PEMBELAJARAN', { bold: true, size: 20, after: 60 }));
      dLkpd.tujuan.forEach(t => sections.push(createParagraph(`• ${t}`, { size: 18, after: 40 })));
      sections.push(new Paragraph({ spacing: { before: 100 } }));

      // II. Petunjuk Kerja
      sections.push(createParagraph('II. PETUNJUK KERJA', { bold: true, size: 20, after: 60 }));
      dLkpd.petunjuk.forEach(p => sections.push(createParagraph(`• ${p}`, { size: 18, after: 40 })));
      sections.push(new Paragraph({ spacing: { before: 140 } }));

      // III. Rubrik Penilaian Table
      sections.push(createParagraph('III. RUBRIK & BOBOT PENILAIAN KINERJA (LKPD)', { bold: true, size: 20, after: 80 }));
      
      const rubrikRows = [
        new TableRow({
          children: [
            createTableCell('No', { bold: true, width: 6, alignment: AlignmentType.CENTER, shading: 'E2E8F0' }),
            createTableCell('Komponen / Sub Komponen Assessment', { bold: true, width: 44, shading: 'E2E8F0' }),
            createTableCell('Tidak (<75)', { bold: true, width: 125, alignment: AlignmentType.CENTER, shading: 'E2E8F0' }),
            createTableCell('CK (75-83)', { bold: true, width: 125, alignment: AlignmentType.CENTER, shading: 'E2E8F0' }),
            createTableCell('K (84-92)', { bold: true, width: 125, alignment: AlignmentType.CENTER, shading: 'E2E8F0' }),
            createTableCell('SK (93-100)', { bold: true, width: 125, alignment: AlignmentType.CENTER, shading: 'E2E8F0' }),
          ]
        })
      ];

      dLkpd.rubrikPenilaian.forEach(rub => {
        rubrikRows.push(
          new TableRow({
            children: [
              createTableCell(String(rub.no), { bold: true, width: 6, alignment: AlignmentType.CENTER, shading: 'F1F5F9' }),
              createTableCell(rub.komponen, { bold: true, width: 94, shading: 'F1F5F9' }),
            ]
          })
        );
        rub.sub.forEach(sText => {
          rubrikRows.push(
            new TableRow({
              children: [
                createTableCell('', { width: 6 }),
                createTableCell(sText, { width: 44 }),
                createTableCell('', { width: 125 }),
                createTableCell('', { width: 125 }),
                createTableCell('', { width: 125 }),
                createTableCell('', { width: 125 }),
              ]
            })
          );
        });
      });

      sections.push(new Table({ rows: rubrikRows, width: { size: 100, type: WidthType.PERCENTAGE } }));
      sections.push(new Paragraph({ spacing: { before: 100 } }));

      // Persentase Bobot Table
      sections.push(createParagraph('Persentase Bobot Komponen Penilaian:', { bold: true, size: 18, after: 60 }));
      const bobotTable = new Table({
        rows: [
          new TableRow({
            children: [
              createTableCell('Persiapan', { bold: true, alignment: AlignmentType.CENTER, shading: 'E2E8F0', width: 16 }),
              createTableCell('Proses', { bold: true, alignment: AlignmentType.CENTER, shading: 'E2E8F0', width: 16 }),
              createTableCell('Hasil', { bold: true, alignment: AlignmentType.CENTER, shading: 'E2E8F0', width: 16 }),
              createTableCell('Sikap', { bold: true, alignment: AlignmentType.CENTER, shading: 'E2E8F0', width: 16 }),
              createTableCell('Waktu', { bold: true, alignment: AlignmentType.CENTER, shading: 'E2E8F0', width: 16 }),
              createTableCell('Nilai Akhir (NP)', { bold: true, alignment: AlignmentType.CENTER, shading: 'CBD5E1', width: 20 }),
            ]
          }),
          new TableRow({
            children: [
              createTableCell('10%', { alignment: AlignmentType.CENTER, width: 16 }),
              createTableCell('30%', { alignment: AlignmentType.CENTER, width: 16 }),
              createTableCell('40%', { alignment: AlignmentType.CENTER, width: 16 }),
              createTableCell('10%', { alignment: AlignmentType.CENTER, width: 16 }),
              createTableCell('10%', { alignment: AlignmentType.CENTER, width: 16 }),
              createTableCell('Σ(Skor × Bobot)', { alignment: AlignmentType.CENTER, width: 20 }),
            ]
          })
        ],
        width: { size: 100, type: WidthType.PERCENTAGE }
      });
      sections.push(bobotTable);
      sections.push(new Paragraph({ spacing: { before: 140 } }));

      // IV. Langkah Discovery Learning
      sections.push(createParagraph('IV. KEGIATAN PEMBELAJARAN (DISCOVERY LEARNING)', { bold: true, size: 20, after: 80 }));
      
      sections.push(createParagraph('Langkah 1: Stimulation (Pemberian Rangsangan)', { bold: true, size: 18, after: 40 }));
      sections.push(createParagraph(dLkpd.langkahKerja.stimulation.narasi, { size: 18, after: 60 }));
      sections.push(createParagraph('Pertanyaan Pemantik:', { italic: true, size: 18, after: 40 }));
      dLkpd.langkahKerja.stimulation.pertanyaanPemantik.forEach(pem => {
        sections.push(createParagraph(`- ${pem}`, { size: 18, after: 40 }));
      });
      sections.push(new Paragraph({ spacing: { before: 80 } }));

      sections.push(createParagraph('Langkah 2: Problem Statement (Identifikasi Masalah)', { bold: true, size: 18, after: 40 }));
      sections.push(createParagraph(dLkpd.langkahKerja.problemStatement, { size: 18, after: 80 }));

      sections.push(createParagraph('Langkah 3: Data Collection (Pengumpulan Data)', { bold: true, size: 18, after: 40 }));
      sections.push(createParagraph(dLkpd.langkahKerja.dataCollection, { size: 18, after: 80 }));

      sections.push(createParagraph('Langkah 4: Data Processing (Pengolahan Data & Analisis Konsep Topik)', { bold: true, size: 18, after: 60 }));
      
      const dpRows = [
        new TableRow({
          children: [
            createTableCell(dLkpd.langkahKerja.dataProcessing.headers[0], { bold: true, width: 35, shading: 'E2E8F0' }),
            createTableCell(dLkpd.langkahKerja.dataProcessing.headers[1], { bold: true, width: 65, shading: 'E2E8F0' }),
          ]
        })
      ];

      dLkpd.langkahKerja.dataProcessing.rows.forEach(rw => {
        dpRows.push(
          new TableRow({
            children: [
              createTableCell(`${rw.konsep}\n(${rw.pemicu})`, { bold: true, width: 35 }),
              createTableCell('[Ruang Analisis & Catatan Hasil Diskusi Kelompok]\n\n\n', { width: 65 }),
            ]
          })
        );
      });

      sections.push(new Table({ rows: dpRows, width: { size: 100, type: WidthType.PERCENTAGE } }));
      sections.push(new Paragraph({ spacing: { before: 80 } }));
      sections.push(createParagraph(`Kesimpulan Kelompok: ${dLkpd.kesimpulanPlaceholder}`, { italic: true, size: 18, after: 140 }));

      // V. Penilaian Pengetahuan (Post-Test HOTS)
      sections.push(createParagraph('V. PENILAIAN PENGETAHUAN (POST-TEST HOTS)', { bold: true, size: 20, after: 80 }));
      sections.push(createParagraph(`Tautan Akses Digital (Quizizz): ${dLkpd.postTest.quizizzLink}`, { italic: true, size: 18, after: 60 }));
      sections.push(createParagraph('Kerjakan soal-soal di bawah ini secara mandiri dan komprehensif:', { size: 18, after: 60 }));

      dLkpd.postTest.soal.forEach(sObj => {
        const qTable = new Table({
          rows: [
            new TableRow({
              children: [
                createTableCell(`Soal Nomor ${sObj.no}: ${sObj.soal}`, { bold: true, shading: 'F1F5F9', width: 100 }),
              ]
            }),
            new TableRow({
              children: [
                createTableCell('Lembar Jawaban Peserta Didik:\n\n\n\n', { width: 100 }),
              ]
            })
          ],
          width: { size: 100, type: WidthType.PERCENTAGE }
        });
        sections.push(qTable);
        sections.push(new Paragraph({ spacing: { before: 60 } }));
      });
    }

    // K. Lampiran 2: BAHAN AJAR MENDALAM
    const materiData = materi;
    const kelasKey = dataToExport.kelas || 'X';
    const matDetail = detailedMateri?.[selectedMapel || 'pai']?.[kelasKey]?.[materiData.bab];

    sections.push(new Paragraph({ children: [new PageBreak()] }));
    sections.push(createParagraph('LAMPIRAN 2: BAHAN AJAR MENDALAM (BAHAN BACAAN)', { bold: true, size: 24, alignment: AlignmentType.CENTER, after: 60 }));
    sections.push(createParagraph(`Mata Pelajaran: ${schoolInfo.mapel || 'PAI'} | Kelas ${kelasKey} | Bab ${materiData.bab}: ${materiData.judul}`, { italic: true, size: 18, alignment: AlignmentType.CENTER, after: 160 }));

    if (matDetail && matDetail.sections && matDetail.sections.length > 0) {
      sections.push(createParagraph(`Ringkasan Eksekutif Materi: ${matDetail.ringkasan}`, { italic: true, size: 18, after: 120 }));
      matDetail.sections.forEach(sec => {
        sections.push(createParagraph(sec.title, { bold: true, size: 20, after: 60 }));
        if (sec.dalil) {
          sections.push(createParagraph(sec.dalil, { bold: true, alignment: AlignmentType.RIGHT, size: 22, after: 40 }));
          if (sec.arti) sections.push(createParagraph(`Artinya: "${sec.arti}"`, { italic: true, size: 18, after: 60 }));
        }
        const cleanContent = (sec.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        sections.push(createParagraph(cleanContent, { size: 18, after: 100 }));
      });
      if (matDetail.rujukan && matDetail.rujukan.length > 0) {
        sections.push(createParagraph('Daftar Rujukan & Referensi:', { bold: true, size: 20, after: 60 }));
        matDetail.rujukan.forEach(r => sections.push(createParagraph(`• ${r}`, { size: 18, after: 40 })));
      }
    } else {
      sections.push(createParagraph(`Bahan ajar pada bab ini mencakup pendalaman konseptual ${materiData.judul} secara terstruktur.`, { size: 18, after: 80 }));
    }

    sections.push(new Paragraph({ children: [new PageBreak()] }));
  });

  // Signature
  sections.push(
    new Paragraph({ spacing: { before: 400 } }),
    createParagraph(`Genteng, ........................ 20....`, { alignment: AlignmentType.RIGHT, size: 20, after: 200 }),
    new Paragraph({ spacing: { before: 200 } }),
  );

  const getSignatureTable = () => new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              createParagraph('Kepala Sekolah', { alignment: AlignmentType.CENTER, size: 20, after: 60 }),
              new Paragraph({ spacing: { before: 800 } }),
              createParagraph(schoolInfo.kepalaSekolah, { bold: true, alignment: AlignmentType.CENTER, size: 20, after: 40 }),
              createParagraph(`NBM: ${schoolInfo.nbmKepala}`, { alignment: AlignmentType.CENTER, size: 18 }),
            ],
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
            width: { size: 50, type: WidthType.PERCENTAGE },
          }),
          new TableCell({
            children: [
              createParagraph('Guru Mata Pelajaran', { alignment: AlignmentType.CENTER, size: 20, after: 60 }),
              new Paragraph({ spacing: { before: 800 } }),
              createParagraph(schoolInfo.namaGuru, { bold: true, alignment: AlignmentType.CENTER, size: 20, after: 40 }),
              createParagraph('NBM: ......................', { alignment: AlignmentType.CENTER, size: 18 }),
            ],
            borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
            width: { size: 50, type: WidthType.PERCENTAGE },
          }),
        ],
      }),
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
  });

  sections.push(getSignatureTable());

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4
            margin: { top: 1134, bottom: 1134, left: 1418, right: 1134 },
          },
        },
        children: sections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
