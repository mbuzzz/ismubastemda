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

    // J. Lampiran LKPD
    if (ppm.lkpd && ppm.lkpd.length > 0) {
      sections.push(createParagraph('J. Lampiran: Lembar Kerja Murid (LKPD)', { bold: true, size: 22, after: 100 }));
      ppm.lkpd.forEach((q, idx) => {
        sections.push(createParagraph(`${idx + 1}. ${q}`, { size: 20, after: 60 }));
      });
      sections.push(new Paragraph({ spacing: { before: 200 } }));
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
