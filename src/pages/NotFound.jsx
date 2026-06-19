import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '72px', color: 'var(--primary-dark)', margin: '0' }}>404</h1>
      <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Halaman Tidak Ditemukan</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <Link to="/" style={{ background: 'var(--primary)', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
