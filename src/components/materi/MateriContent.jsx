import React, { useEffect, useMemo } from 'react';
import { BookOpen, Target, FileText, Bookmark, ExternalLink, ListOrdered, GraduationCap, PenLine, BookMarked } from 'lucide-react';
import { getBahanAjarLengkap } from '../../utils/bahanAjarBuilder';

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

const SectionCard = ({ icon: Icon, title, children, accent = 'var(--primary)' }) => (
  <section style={{
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '22px 24px',
    boxShadow: '0 2px 10px rgba(15,23,42,0.03)',
  }}>
    <h3 style={{
      margin: '0 0 14px 0',
      fontSize: '15px',
      fontWeight: 800,
      color: 'var(--primary-dark)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      letterSpacing: '0.2px',
    }}>
      {Icon && <Icon size={16} color={accent} />}
      {title}
    </h3>
    {children}
  </section>
);

const MateriContent = ({ mapel, kelas, bab, materiData }) => {
  const book = useMemo(
    () => getBahanAjarLengkap(mapel, kelas, bab || materiData?.bab || 1),
    [mapel, kelas, bab, materiData?.bab]
  );

  useEffect(() => {
    const contentArea = document.querySelector('.materi-view-container');
    if (contentArea) contentArea.scrollIntoView({ behavior: 'smooth' });
  }, [mapel, kelas, bab]);

  const meta = book.meta || {};
  const judul = meta.judul || materiData?.judul || `Bab ${bab}`;
  const elemen = meta.elemen || materiData?.elemen || '';
  const tpList = Array.isArray(meta.tp) && meta.tp.length ? meta.tp : (materiData?.tp || []);

  return (
    <div className="materi-view-container" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Cover / identitas bab seperti buku */}
      <header style={{
        borderRadius: '18px',
        border: '1px solid #E2E8F0',
        background: 'linear-gradient(145deg, #0D47A1 0%, #1565C0 55%, #1976D2 100%)',
        color: '#FFF',
        padding: '28px 28px 24px',
        boxShadow: '0 10px 28px rgba(13,71,161,0.18)',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          <span style={{
            background: 'rgba(255,255,255,0.16)',
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '5px 12px',
            borderRadius: '999px',
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
          }}>
            Bahan Ajar · Bab {book.bab}
          </span>
          <span style={{
            background: 'rgba(255,255,255,0.12)',
            padding: '5px 12px',
            borderRadius: '999px',
            fontSize: '10px',
            fontWeight: 700,
          }}>
            {meta.mapelLabel || mapel?.toUpperCase()} · Kelas {kelas} · Fase {meta.fase}
          </span>
          {meta.semester && (
            <span style={{
              background: 'rgba(255,255,255,0.12)',
              padding: '5px 12px',
              borderRadius: '999px',
              fontSize: '10px',
              fontWeight: 700,
            }}>
              Semester {meta.semester}
            </span>
          )}
        </div>
        <h1 style={{
          margin: '0 0 10px 0',
          fontSize: '26px',
          fontWeight: 850,
          lineHeight: 1.25,
          letterSpacing: '-0.4px',
        }}>
          <ArabicText text={judul} />
        </h1>
        <p style={{ margin: 0, opacity: 0.92, fontSize: '13px', lineHeight: 1.55 }}>
          Elemen: <strong>{elemen}</strong>
          {meta.alokasi ? ` · Alokasi ${meta.alokasi} JP` : ''}
          {meta.minggu ? ` · ${meta.minggu} pertemuan` : ''}
        </p>
      </header>

      {/* Daftar isi mini */}
      <SectionCard icon={ListOrdered} title="Daftar Isi Bahan Ajar">
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '13.5px', lineHeight: 1.8, color: '#334155' }}>
          <li>Identitas & Capaian Pembelajaran</li>
          <li>Tujuan Pembelajaran (TP)</li>
          <li>Ringkasan Materi</li>
          <li>Uraian Materi (seperti bab buku)</li>
          <li>Peta Pertemuan</li>
          <li>Latihan / Evaluasi Mandiri</li>
          <li>Glosarium & Rujukan</li>
        </ol>
      </SectionCard>

      {/* CP */}
      <SectionCard icon={Target} title="Capaian Pembelajaran (CP)">
        <p style={{
          margin: 0,
          fontSize: '14px',
          lineHeight: 1.75,
          color: '#334155',
          fontStyle: 'italic',
          background: '#F8FAFC',
          borderLeft: '4px solid var(--primary)',
          padding: '14px 16px',
          borderRadius: '0 12px 12px 0',
        }}>
          “{meta.capaian || materiData?.capaian || 'Capaian pembelajaran mengikuti kurikulum fase aktif.'}”
        </p>
      </SectionCard>

      {/* TP */}
      <SectionCard icon={GraduationCap} title="Tujuan Pembelajaran (TP)">
        <ul style={{ margin: 0, paddingLeft: '18px', color: '#1E293B', fontSize: '14px', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tpList.map((tpItem, idx) => (
            <li key={idx}><strong>TP {idx + 1}.</strong> {tpItem}</li>
          ))}
        </ul>
      </SectionCard>

      {/* Ringkasan */}
      <SectionCard icon={BookOpen} title="Ringkasan Bab">
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.8, color: '#1E293B', textAlign: 'justify' }}>
          {book.ringkasan}
        </p>
      </SectionCard>

      {/* Uraian materi seperti buku */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 2px',
        }}>
          <FileText size={18} color="var(--primary)" />
          <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 850, color: 'var(--primary-dark)' }}>
            Uraian Materi
          </h2>
        </div>

        {(book.sections || []).map((section, sIdx) => (
          <article key={sIdx} style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '22px 24px',
          }}>
            <h3 style={{
              margin: '0 0 14px 0',
              fontSize: '17px',
              fontWeight: 800,
              color: 'var(--primary-dark)',
              borderBottom: '2px solid #E2E8F0',
              paddingBottom: '10px',
              lineHeight: 1.35,
            }}>
              {section.title}
            </h3>

            {section.dalil && (
              <div style={{
                background: 'linear-gradient(135deg, #F0F4F8, #E6EFFE)',
                borderRadius: '14px',
                padding: '20px',
                margin: '0 0 16px 0',
                borderRight: '5px solid var(--primary)',
                textAlign: 'right',
              }}>
                <p style={{
                  fontFamily: "'Traditional Arabic', 'Amiri', serif",
                  fontSize: '26px',
                  margin: '0 0 12px 0',
                  lineHeight: 2.1,
                  color: 'var(--primary-dark)',
                  direction: 'rtl',
                  fontWeight: 'bold',
                }}>
                  {section.dalil}
                </p>
                {section.arti && (
                  <p style={{
                    textAlign: 'left',
                    margin: 0,
                    fontSize: '13px',
                    fontStyle: 'italic',
                    color: '#475569',
                    borderTop: '1px dashed #CBD5E1',
                    paddingTop: '10px',
                    lineHeight: 1.6,
                  }}>
                    <strong>Artinya:</strong> “{section.arti}”
                  </p>
                )}
              </div>
            )}

            <div
              style={{
                textAlign: 'justify',
                fontSize: '15px',
                lineHeight: 1.85,
                color: '#1E293B',
              }}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </article>
        ))}
      </div>

      {/* Peta pertemuan */}
      {Array.isArray(book.pertemuan) && book.pertemuan.length > 0 && (
        <SectionCard icon={ListOrdered} title={`Peta Pertemuan (${book.pertemuan.length}x)`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {book.pertemuan.map((p) => (
              <div key={p.pertemuan} style={{
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '14px 16px',
                background: '#F8FAFC',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <strong style={{ color: 'var(--primary-dark)', fontSize: '13.5px' }}>
                    Pertemuan {p.pertemuan} · {p.fase}
                  </strong>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 700 }}>{p.alokasi}</span>
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: '13.5px', color: '#1E293B', lineHeight: 1.55 }}>
                  <strong>Fokus:</strong> {p.fokus}
                </p>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#475569', lineHeight: 1.55 }}>
                  {(p.kegiatan || []).map((k, i) => <li key={i}>{k}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Evaluasi */}
      {Array.isArray(book.evaluasi) && book.evaluasi.length > 0 && (
        <SectionCard icon={PenLine} title="Latihan / Evaluasi Mandiri">
          <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: 1.75, color: '#1E293B' }}>
            {book.evaluasi.map((q, i) => (
              <li key={i} style={{ marginBottom: '10px' }}>
                <div>{q}</div>
                <div style={{ marginTop: '6px', borderBottom: '1px dashed #CBD5E1', minHeight: '28px' }} />
              </li>
            ))}
          </ol>
        </SectionCard>
      )}

      {/* Glosarium */}
      {Array.isArray(book.glosarium) && book.glosarium.length > 0 && (
        <SectionCard icon={BookMarked} title="Glosarium">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {book.glosarium.map((g, i) => (
              <div key={i} style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#334155' }}>
                <strong style={{ color: 'var(--primary-dark)' }}>{g.istilah}</strong>
                <span> — {g.arti}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Rujukan */}
      {Array.isArray(book.rujukan) && book.rujukan.length > 0 && (
        <SectionCard icon={Bookmark} title="Sumber & Rujukan">
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.6 }}>
            {book.rujukan.map((ref, rIdx) => (
              <li key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <ExternalLink size={14} style={{ marginTop: '4px', flexShrink: 0, color: 'var(--primary-light)' }} />
                <span>{ref}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      <footer style={{
        textAlign: 'center',
        fontSize: '11.5px',
        color: '#94A3B8',
        padding: '8px 0 4px',
      }}>
        Bahan ajar digital ISMUBA · {meta.mapelLabel} · Kelas {kelas} · Bab {book.bab}
      </footer>
    </div>
  );
};

export default MateriContent;
