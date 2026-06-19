import React, { useEffect } from 'react';
import { BookOpen, Target, FileText, Bookmark, ExternalLink } from 'lucide-react';
import { detailedMateri } from '../../data/materiContent';

const ArabicText = ({ text }) => {
  if (typeof text === 'string' && /[\u0600-\u06FF]/.test(text)) {
    const parts = text.split(/([\u0600-\u06FF]+(?:[\s]+[\u0600-\u06FF]+)*)/g);
    return (
      <span style={{ display: 'inline' }}>
        {parts.map((part, i) =>
          /[\u0600-\u06FF]/.test(part)
            ? <bdi key={i} dir="rtl" style={{ fontFamily: "'Traditional Arabic', 'Amiri', serif", fontSize: '20px', fontWeight: 'bold' }}>{part}</bdi>
            : <span key={i}>{part}</span>
        )}
      </span>
    );
  }
  return text;
};

const MateriContent = ({ mapel, kelas, bab, materiData }) => {
  
  useEffect(() => {
    // Scroll to top when chapter changes
    const contentArea = document.querySelector('.materi-view-container');
    if (contentArea) {
      contentArea.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mapel, kelas, bab]);

  const currentDetails = detailedMateri[mapel]?.[kelas]?.[bab];

  const renderImage = (src, alt) => {
    const imagePath = src.startsWith('http') ? src : `/images/materi/${mapel}/${kelas}/bab${bab}-${src}`;
    return (
      <figure style={{ margin: '28px 0', textAlign: 'center' }}>
        <img 
          src={imagePath} 
          alt={alt} 
          loading="lazy"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML += `
              <div style="background: #F8FAFC; padding: 40px 20px; border-radius: 16px; color: #94A3B8; border: 2px dashed #E2E8F0; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
                <span style="font-size: 28px;">🖼️</span>
                <span style="font-size: 12px; font-weight: 700; color: #64748B;">ILUSTRASI MEDIA: ${alt}</span>
              </div>
            `;
          }}
        />
        <figcaption style={{ fontSize: '11.5px', color: '#64748B', marginTop: '10px', fontStyle: 'italic', fontWeight: 500 }}>{alt}</figcaption>
      </figure>
    );
  };

  return (
    <div className="materi-view-container" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Subject Badge & Title */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ 
            background: 'linear-gradient(135deg, #0D47A1, #1976D2)', 
            color: '#FFFFFF', 
            padding: '6px 14px', 
            borderRadius: '30px', 
            fontSize: '10px', 
            fontWeight: '800', 
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 10px rgba(13, 71, 161, 0.15)'
          }}>
            <BookOpen size={12} />
            Bab {materiData.bab} · {materiData.elemen}
          </span>
        </div>
        <h1 style={{ margin: '0', color: 'var(--primary-dark)', fontSize: '28px', fontWeight: '850', lineHeight: '1.25', letterSpacing: '-0.8px' }}>
          <ArabicText text={materiData.judul} />
        </h1>
      </div>

      {/* Tujuan Pembelajaran Box */}
      <div style={{ 
        background: 'linear-gradient(135deg, #F8FAFC, #F1F5F9)', 
        padding: '24px', 
        borderRadius: '18px', 
        borderLeft: '5px solid var(--primary)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        border: '1px solid #E2E8F0',
        borderLeftWidth: '5px'
      }}>
        <h3 style={{ margin: '0 0 14px 0', color: 'var(--primary-dark)', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={16} color="var(--primary)" />
          Tujuan Pembelajaran (TP)
        </h3>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#334155', fontSize: '14px', lineHeight: '1.75', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {materiData.tp.map((tpItem, idx) => (
            <li key={idx} style={{ paddingLeft: '4px' }}>{tpItem}</li>
          ))}
        </ul>
      </div>

      {/* Main Material Content */}
      <div style={{ fontSize: '15.5px', lineHeight: '1.85', color: '#334155', display: 'flex', flexDirection: 'column', gap: '24px', letterSpacing: '0.2px' }}>
        {currentDetails ? (
          /* Render Detailed Content */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <p style={{ 
              fontSize: '16px', 
              fontWeight: '550', 
              color: 'var(--primary-dark)', 
              margin: '0', 
              fontStyle: 'italic', 
              borderLeft: '4px solid var(--secondary)', 
              paddingLeft: '18px',
              lineHeight: '1.8',
              background: '#F8FAFC',
              padding: '16px 20px'
            }}>
              {currentDetails.ringkasan}
            </p>

            {currentDetails.sections.map((section, sIdx) => (
              <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ 
                  color: 'var(--primary-dark)', 
                  fontSize: '20px', 
                  fontWeight: '800', 
                  margin: '10px 0 0 0', 
                  borderBottom: '2px solid #E2E8F0', 
                  paddingBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <FileText size={20} color="var(--primary)" />
                  {section.title}
                </h3>
                
                <div 
                  style={{ textAlign: 'justify', whiteSpace: 'pre-line', margin: '0', fontSize: '15px', color: '#1E293B', display: 'flex', flexDirection: 'column', gap: '14px' }}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
                
                {/* Arabic Dalil Block if present */}
                {section.dalil && (
                  <div style={{ 
                    background: 'linear-gradient(135deg, #F0F4F8, #E6EFFE)', 
                    borderRadius: '16px', 
                    padding: '24px', 
                    margin: '16px 0', 
                    borderRight: '6px solid var(--primary)', 
                    textAlign: 'right',
                    boxShadow: '0 4px 15px rgba(13, 71, 161, 0.04)'
                  }}>
                    <p style={{ 
                      fontFamily: "'Traditional Arabic', 'Amiri', serif", 
                      fontSize: '28px', 
                      margin: '0 0 16px 0', 
                      lineHeight: '2.2', 
                      color: 'var(--primary-dark)',
                      direction: 'rtl',
                      fontWeight: 'bold'
                    }}>
                      {section.dalil}
                    </p>
                    <p style={{ 
                      textAlign: 'left', 
                      margin: '0', 
                      fontSize: '13.5px', 
                      fontStyle: 'italic', 
                      color: '#475569',
                      borderTop: '1px dashed #CBD5E1',
                      paddingTop: '12px',
                      fontWeight: 500,
                      lineHeight: '1.6'
                    }}>
                      <strong>Artinya:</strong> "{section.arti}"
                    </p>
                  </div>
                )}

                {/* Section Image if present */}
                {section.image && renderImage(section.image, section.caption || section.title)}
              </div>
            ))}

            {/* Rujukan / Referensi Section */}
            {currentDetails.rujukan && (
              <div style={{ 
                marginTop: '24px',
                background: '#FAFBFD',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <h4 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '13px', 
                  fontWeight: '800', 
                  color: 'var(--text-light)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Bookmark size={16} />
                  Sumber & Rujukan Materi
                </h4>
                <ul style={{ margin: '0', paddingLeft: '18px', fontSize: '13.5px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.6' }}>
                  {currentDetails.rujukan.map((ref, rIdx) => (
                    <li key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <ExternalLink size={14} style={{ marginTop: '5px', flexShrink: 0, color: 'var(--primary-light)' }} />
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ margin: '0', fontSize: '15px' }}>
              Pembelajaran pada bab <strong>{materiData.judul}</strong> membahas secara terperinci rincian materi esensial sesuai kurikulum ISMUBA berkemajuan.
            </p>

            <div style={{ background: '#FAFBFD', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ color: 'var(--primary-dark)', fontSize: '15px', fontWeight: '800', margin: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={16} />
                Capaian Pembelajaran (CP)
              </h3>
              <p style={{ margin: '0', fontSize: '13px', fontStyle: 'italic', color: '#475569', lineHeight: '1.7' }}>
                "{materiData.capaian}"
              </p>
            </div>

            <h3 style={{ color: 'var(--primary-dark)', fontSize: '16px', fontWeight: '800', margin: '10px 0 0 0' }}>
              Rincian Poin Utama Kajian
            </h3>
            <p style={{ margin: '0' }}>Untuk menguasai bab ini, Anda akan mempelajari submateri pokok berikut:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {materiData.materiPokok.map((mp, i) => (
                <div key={i} style={{ 
                  background: '#FFFFFF', 
                  border: '1px solid #E2E8F0', 
                  borderRadius: '12px', 
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <strong style={{ fontSize: '14px', color: 'var(--primary-dark)' }}>{i + 1}. {mp}</strong>
                  <span style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
                    Mengkaji aspek teoritis, dalil naqli/sejarah persyarikatan, serta aktualisasi dalam akhlak/adab berkeadaban.
                  </span>
                </div>
              ))}
            </div>

            {renderImage('default-banner.png', `Ilustrasi Kajian ${materiData.judul}`)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MateriContent;
