import React from 'react';

const Tentang = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--primary-dark)', marginBottom: '20px' }}>Tentang ISMUBA STEMDA</h1>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
        <p style={{ lineHeight: '1.6', color: '#444' }}>
          <strong>ISMUBA STEMDA</strong> adalah aplikasi manajemen pembelajaran terpadu yang dirancang khusus untuk mendukung 
          pengajaran mata pelajaran Al-Islam, Kemuhammadiyahan, dan Bahasa Arab (ISMUBA) di SMKS Muhammadiyah 2 Genteng.
        </p>
        
        <h3 style={{ marginTop: '24px', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>Visi & Misi</h3>
        <p style={{ lineHeight: '1.6', color: '#444' }}>
          Mempermudah pendidik dalam merencanakan administrasi pembelajaran (Perangkat) sekaligus menyediakan bahan ajar interaktif (Materi) 
          yang mudah diakses oleh peserta didik, selaras dengan Kurikulum Merdeka.
        </p>

        <h3 style={{ marginTop: '24px', color: 'var(--primary)', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>Fitur Utama</h3>
        <ul style={{ lineHeight: '1.8', color: '#444', paddingLeft: '20px' }}>
          <li><strong>Otomatisasi Perangkat:</strong> Prota, Promes, ATP, Modul Ajar terintegrasi dengan kalender pendidikan otomatis.</li>
          <li><strong>Eksport Dokumen:</strong> Cetak langsung ke PDF dengan format rapi dan standar sekolah.</li>
          <li><strong>Materi Digital:</strong> Akses bahan bacaan, LKPD, dan media pembelajaran dari berbagai perangkat.</li>
        </ul>

        <div style={{ marginTop: '40px', padding: '15px', background: '#F8FAFC', borderRadius: '8px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
          © 2026 SMKS Muhammadiyah 2 Genteng. Hak Cipta Dilindungi.
        </div>
      </div>
    </div>
  );
};

export default Tentang;
