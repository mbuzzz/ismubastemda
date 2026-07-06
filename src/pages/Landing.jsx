import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// 3D Tilt Card Component
const BentoTiltCard = ({ children, className, to, delay = '0s' }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    
    // Set custom properties for spotlight effect
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);

    // Calculate rotation angle (max 12 degrees)
    const rotX = -((y - card.height / 2) / (card.height / 2)) * 12;
    const rotY = ((x - card.width / 2) / (card.width / 2)) * 12;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const transformStyle = {
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
    transition: tilt.x === 0 && tilt.y === 0 ? 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
    animationDelay: delay
  };

  const Component = to ? Link : 'div';
  return (
    <Component
      ref={cardRef}
      to={to}
      className={`${className} bento-card glass-card`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
    >
      {/* Light Reflection overlay */}
      <div className="card-shine-overlay" />
      <div className="card-content-wrapper">{children}</div>
    </Component>
  );
};

const Landing = () => {
  return (
    <div className="landing-page-wrapper">
      {/* Dynamic Background Glowing Blobs */}
      <div className="glow-container">
        <div className="glow-blob glow-1"></div>
        <div className="glow-blob glow-2"></div>
        <div className="glow-blob glow-3"></div>
      </div>

      {/* Rotating Islamic Star Pattern Overlay */}
      <div className="islamic-pattern-bg">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="islamic-star-network" width="160" height="160" patternUnits="userSpaceOnUse">
              {/* Traditional 8-Point Star Mandala */}
              <path d="M 80,0 L 104,56 L 160,80 L 104,104 L 80,160 L 56,104 L 0,80 L 56,56 Z" fill="none" stroke="rgba(212, 175, 55, 0.12)" strokeWidth="1.2" />
              <path d="M 80,24 L 96,64 L 136,80 L 96,96 L 80,136 L 64,96 L 24,80 L 64,64 Z" fill="none" stroke="rgba(0, 229, 255, 0.08)" strokeWidth="0.8" />
              
              {/* Intersecting Rotated Squares forming Rub el Hizb */}
              <rect x="48" y="48" width="64" height="64" fill="none" stroke="rgba(212, 175, 55, 0.06)" strokeWidth="0.8" transform="rotate(0, 80, 80)" />
              <rect x="48" y="48" width="64" height="64" fill="none" stroke="rgba(212, 175, 55, 0.06)" strokeWidth="0.8" transform="rotate(45, 80, 80)" />
              <rect x="48" y="48" width="64" height="64" fill="none" stroke="rgba(212, 175, 55, 0.06)" strokeWidth="0.8" transform="rotate(22.5, 80, 80)" />
              <rect x="48" y="48" width="64" height="64" fill="none" stroke="rgba(212, 175, 55, 0.06)" strokeWidth="0.8" transform="rotate(67.5, 80, 80)" />
              
              <circle cx="80" cy="80" r="10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-star-network)" />
        </svg>
      </div>

      <div className="bento-grid">
        {/* Card 1: Hero Welcome (Spans 3 columns) */}
        <BentoTiltCard className="hero-card span-3 fade-in-up" delay="0.1s">
          {/* Mosque Dome Vector Silhouette Accent */}
          <div className="mosque-accent-vector">
            <svg viewBox="0 0 200 120" width="100%" height="100%">
              <path 
                d="M10,110 L190,110 L190,105 L175,105 L175,65 C175,50 165,38 150,38 C135,38 125,50 125,65 L125,105 L115,105 L115,45 C115,25 105,12 100,12 C95,12 85,25 85,45 L85,105 L75,105 L75,65 C75,50 65,38 50,38 C35,38 25,50 25,65 L25,105 L10,105 Z" 
                fill="none" 
                stroke="rgba(212, 175, 55, 0.15)" 
                strokeWidth="1.2" 
              />
              <path 
                d="M18,110 L22,110 L22,40 L20,20 L18,40 Z M182,110 L186,110 L186,40 L184,20 L182,40 Z" 
                fill="none" 
                stroke="rgba(0, 229, 255, 0.1)" 
                strokeWidth="1" 
              />
              <circle cx="100" cy="6" r="3" fill="#D4AF37" opacity="0.6" />
            </svg>
          </div>

          <div className="hero-badge">
            <span className="star-sparkle">✦</span> ISMUBA STEMDA <span className="star-sparkle">✦</span>
          </div>
          <h1 className="bento-hero-title">Pusat Administrasi & Pembelajaran Digital</h1>
          <p className="bento-hero-subtitle">
            SMKS Muhammadiyah 2 Genteng · TA 2026/2027
          </p>
          <div className="hero-divider"></div>
          <p className="hero-description">
            Mengintegrasikan perencanaan perangkat ajar dan media pembelajaran interaktif untuk guru dan murid dalam rumpun Pendidikan Agama Islam, Kemuhammadiyahan, serta Bahasa Arab.
          </p>
        </BentoTiltCard>

        {/* Card 2: Perangkat Pembelajaran (Spans 2 columns) */}
        <BentoTiltCard to="/perangkat" className="interactive-card span-2 fade-in-up" delay="0.2s">
          <div className="card-top-header">
            <span className="card-emoji">📄</span>
            <span className="card-status-badge active-blue">Guru & Kurikulum</span>
          </div>
          <h2 className="bento-card-title">Perangkat Pembelajaran</h2>
          <p className="bento-card-desc">
            Sistem penyusunan RPE, Prota, Promes, ATP, KKTP, hingga Modul Ajar otomatis yang disesuaikan presisi dengan kalender akademik sekolah.
          </p>
          <div className="doc-tags-list">
            <span className="doc-tag">RPE</span>
            <span className="doc-tag">Prota</span>
            <span className="doc-tag">Promes</span>
            <span className="doc-tag">Analisis CP</span>
            <span className="doc-tag">ATP</span>
            <span className="doc-tag">Modul Ajar</span>
            <span className="doc-tag">Kisi-Kisi Soal</span>
          </div>
          <div className="card-arrow-action">Buka Administrasi Ajar →</div>
        </BentoTiltCard>

        {/* Card 3: Quick Stats (Spans 1 column) */}
        <BentoTiltCard className="stats-card fade-in-up" delay="0.3s">
          <h3 className="bento-section-title">Program Studi</h3>
          <div className="mapel-list-container">
            <div className="mapel-item">
              <span className="mapel-bullet bullet-pai"></span>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#FFF' }}>PAI & Budi Pekerti</strong>
                <span style={{ fontSize: '11px', opacity: 0.75, color: '#E2E8F0' }}>3 JP / Minggu · Kelas X - XII</span>
              </div>
            </div>
            <div className="mapel-item">
              <span className="mapel-bullet bullet-arab"></span>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#FFF' }}>Bahasa Arab</strong>
                <span style={{ fontSize: '11px', opacity: 0.75, color: '#E2E8F0' }}>2 JP / Minggu · Kelas X - XII</span>
              </div>
            </div>
            <div className="mapel-item">
              <span className="mapel-bullet bullet-kemuh"></span>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#FFF' }}>Kemuhammadiyahan</strong>
                <span style={{ fontSize: '11px', opacity: 0.75, color: '#E2E8F0' }}>2 JP / Minggu · Kelas X - XII</span>
              </div>
            </div>
          </div>
        </BentoTiltCard>

        {/* Card 4: Materi Pembelajaran (Spans 1 column) */}
        <BentoTiltCard to="/materi" className="interactive-card tall-card fade-in-up" delay="0.4s">
          <div className="card-top-header">
            <span className="card-emoji">📖</span>
            <span className="card-status-badge active-gold">Bahan Ajar</span>
          </div>
          <h2 className="bento-card-title">Materi Pembelajaran</h2>
          <p className="bento-card-desc">
            Akses rangkuman bab, LKPD interaktif, dalil naqli terintegrasi, serta latihan mandiri murid secara mobile-first.
          </p>
          <ul className="materi-bullet-list">
            <li>Teks & Gambar Responsif</li>
            <li>Ringkasan esensial per bab</li>
            <li>Fokus keaktifan murid (LKPD)</li>
            <li>Optimasi akses mobile cepat</li>
          </ul>
          <div className="card-arrow-action">Eksplorasi Materi →</div>
        </BentoTiltCard>

        {/* Card 5: Visi & Informasi Kurikulum (Spans 2 columns) */}
        <BentoTiltCard to="/tentang" className="interactive-card span-2 fade-in-up" delay="0.5s">
          <div className="card-top-header">
            <span className="card-emoji">🏫</span>
            <span className="card-status-badge active-green">STEMDA</span>
          </div>
          <h2 className="bento-card-title">Sinergi Karakter & Teknologi</h2>
          <p className="bento-card-desc" style={{ marginBottom: '15px' }}>
            Mengintegrasikan nilai-nilai luhur keislaman dan etos kemajuan persyarikatan Muhammadiyah dengan pemanfaatan teknologi informasi untuk kelancaran KBM.
          </p>
          <div className="school-features">
            <div className="feature-pill">
              <span className="pill-dot green"></span>
              <span>18 Pekan KBM Terkalibrasi</span>
            </div>
            <div className="feature-pill">
              <span className="pill-dot gold"></span>
              <span>Evaluasi & Tindak Lanjut</span>
            </div>
            <div className="feature-pill">
              <span className="pill-dot blue"></span>
              <span>Vector Print-Ready PDF</span>
            </div>
          </div>
          <div className="card-arrow-action" style={{ marginTop: '15px' }}>Tentang STEMDA Center →</div>
        </BentoTiltCard>
      </div>
    </div>
  );
};

export default Landing;
