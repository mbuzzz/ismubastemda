import React from 'react';

/* ============================================================
   Komponen ornamen Islami klasik (dipakai oleh ClassicPages)
   Palet: navy #0D47A1, biru #1976D2, emas #C9A961 / #FFB300
   ============================================================ */

/** Pembatas horizontal berk Ornamen Islami (8 titik bintang + garis emas) */
export const ClassicDivider = ({ width = '60%' }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '14px auto', width }}>
    <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #C9A961)' }} />
    <svg width="26" height="26" viewBox="0 0 32 32" style={{ margin: '0 8px' }}>
      <g fill="none" stroke="#C9A961" strokeWidth="1.2">
        <path d="M16 1 L20 12 L31 16 L20 20 L16 31 L12 20 L1 16 L12 12 Z" />
        <path d="M16 7 L18.5 14 L25 16 L18.5 18 L16 25 L13.5 18 L7 16 L13.5 14 Z" fill="#C9A961" fillOpacity="0.25" />
        <circle cx="16" cy="16" r="2.2" fill="#0D47A1" stroke="#C9A961" />
      </g>
    </svg>
    <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #C9A961, transparent)' }} />
  </div>
);

/** Bingkai manuskrip ganda (gold double + dashed) untuk halaman klasik */
export const ClassicFrame = ({ children, style }) => (
  <div style={{
    border: '3px double #C9A961',
    borderRadius: 2,
    position: 'relative',
    background: 'radial-gradient(circle at top right, rgba(201,169,97,0.05), transparent 60%), radial-gradient(circle at bottom left, rgba(201,169,97,0.03), transparent 60%), #FFFFFF',
    ...style,
  }}>
    <div style={{ position: 'absolute', inset: 6, border: '1px solid rgba(201,169,97,0.55)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', inset: 11, border: '1px dashed rgba(201,169,97,0.45)', pointerEvents: 'none' }} />
    <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
  </div>
);

/** Bintang 8 (khatim Sulaymani) — watermark halus */
export const ClassicWatermark = ({ opacity = 0.06 }) => (
  <div style={{ position: 'absolute', inset: 0, opacity, pointerEvents: 'none', zIndex: 0 }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="cl-islamic" width="70" height="70" patternUnits="userSpaceOnUse">
          <path d="M35 2 L43 27 L68 35 L43 43 L35 68 L27 43 L2 35 L27 27 Z" fill="none" stroke="#0D47A1" strokeWidth="0.8" />
          <circle cx="35" cy="35" r="3" fill="none" stroke="#C9A961" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cl-islamic)" />
    </svg>
  </div>
);

/** Header Bismillah kaligrafi (Amiri) — dipakai di cover klasik */
export const BismillahHeader = () => (
  <div style={{ textAlign: 'center', margin: '4px 0 10px' }}>
    <span style={{ fontFamily: "'Amiri', serif", fontSize: '22px', color: '#000', direction: 'rtl' }}>
      بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
    </span>
  </div>
);

/** Judul halaman klasik (Playfair, garis emas berhias) */
export const ClassicPageTitle = ({ children }) => (
  <>
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontWeight: 800,
      fontSize: 20,
      color: '#000',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 2.5,
      margin: 0,
      paddingBottom: 6,
    }}>{children}</h2>
    <ClassicDivider width="70%" />
  </>
);

/** Subjudul klasik (Cormorant italic, diapit ✦) */
export const ClassicSubtitle = ({ children }) => (
  <p style={{
    fontFamily: "'Cormorant Garamond', 'Lora', serif",
    fontStyle: 'italic',
    fontSize: 13,
    color: '#8B6914',
    textAlign: 'center',
    letterSpacing: 0.5,
    margin: '0 0 22px',
  }}>
    <span style={{ color: '#C9A961', margin: '0 10px' }}>✦</span>
    {children}
    <span style={{ color: '#C9A961', margin: '0 10px' }}>✦</span>
  </p>
);

/** Header seksi klasik (Playfair, prefix ❖, garis bawah emas) */
export const ClassicSectionHead = ({ children, roman }) => (
  <h3 style={{
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: 13.5,
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1.5px solid #C9A961',
    paddingBottom: 6,
    margin: '12px 0 8px',
  }}>
    {roman && <span style={{ color: '#C9A961', marginRight: 8 }}>{roman}.</span>}
    <span style={{ color: '#C9A961', marginRight: 6 }}>❖</span>{children}
  </h3>
);

/** Kartu panel perkamen klasik (border emas ganda, kiri tebal) */
export const ClassicPanel = ({ children, style, title }) => (
  <div style={{
    background: '#FAFAFA',
    border: '1px solid rgba(201,169,97,0.45)',
    borderLeft: '4px double #C9A961',
    borderRadius: 2,
    padding: '12px 16px',
    margin: '8px 0',
    boxShadow: '0 2px 6px rgba(139,105,20,0.08)',
    fontFamily: "'Lora', serif",
    pageBreakInside: 'auto',
    ...style,
  }}>
    {title && (
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        fontSize: 12,
        color: '#000',
        textTransform: 'uppercase',
        letterSpacing: 1,
        borderBottom: '1px solid #C9A961',
        paddingBottom: 6,
        marginBottom: 8,
      }}><span style={{ color: '#C9A961', marginRight: 6 }}>❖</span>{title}</div>
    )}
    {children}
  </div>
);

/** Tanda tangan klasik (3 kolom, garis emas ganda di atas) */
export const ClassicSignature = ({ schoolInfoData, sem }) => {
  const yearStr = schoolInfoData.tahunAjaran.split('/')[sem === 'ganjil' ? 0 : 1];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', gap: 10,
      marginTop: 30, paddingTop: 14,
      borderTop: '3px double #C9A961',
    }}>
      {[
        { label: 'Mengesahkan,', role: 'Kepala Sekolah', name: schoolInfoData.kepalaSekolah, nbm: schoolInfoData.nbmKepala },
        { label: 'Mengetahui,', role: 'Waka. Kurikulum', name: schoolInfoData.wakaKurikulum, nbm: schoolInfoData.nbmWaka },
        { label: `Genteng, Banyuwangi, ${sem === 'ganjil' ? 'Juli ' : 'Januari '}${yearStr}`, role: 'Guru Mata Pelajaran', name: schoolInfoData.namaGuru, nbm: schoolInfoData.nbmGuru || '......................' },
      ].map((s, i) => (
        <div key={i} style={{ textAlign: 'center', flex: 1, fontFamily: "'Lora', serif" }}>
          <p style={{ fontSize: 10, color: '#6B5B2E', fontStyle: 'italic' }}>{s.label}</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 11.5, color: '#000', letterSpacing: 0.5 }}>{s.role}</p>
          <div style={{ height: 48 }} />
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, borderBottom: '1px solid #C9A961', display: 'inline-block', color: '#000', fontSize: 11.5, padding: '0 8px 2px' }}>{s.name}</p>
          <p style={{ fontSize: 9, color: '#8B6914', fontVariant: 'small-caps', letterSpacing: 0.8, marginTop: 3 }}>NBM. {s.nbm}</p>
        </div>
      ))}
    </div>
  );
};

export default { ClassicDivider, ClassicFrame, ClassicWatermark, BismillahHeader, ClassicPageTitle, ClassicSubtitle, ClassicSectionHead, ClassicPanel, ClassicSignature };
