import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, GraduationCap, ChevronRight, Library, ListChecks } from 'lucide-react';
import { faseE, faseF11, faseF12, faseEArab, faseF11Arab, faseF12Arab, faseE_kemuh, faseF11_kemuh, faseF12_kemuh } from '../data/curriculum';
import MateriContent from '../components/materi/MateriContent';

const Materi = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [mapel, setMapel] = useState(searchParams.get('mapel') || 'pai');
  const [kelas, setKelas] = useState(searchParams.get('kelas') || 'X');
  const [bab, setBab] = useState(parseInt(searchParams.get('bab') || '1'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Update URL
  React.useEffect(() => {
    setSearchParams({ mapel, kelas, bab: bab.toString() }, { replace: true });
  }, [mapel, kelas, bab, setSearchParams]);

  // Get active data
  const getFaseData = () => {
    if (mapel === 'pai') return kelas === 'X' ? faseE : kelas === 'XI' ? faseF11 : faseF12;
    if (mapel === 'arab') return kelas === 'X' ? faseEArab : kelas === 'XI' ? faseF11Arab : faseF12Arab;
    if (mapel === 'kemuh') return kelas === 'X' ? faseE_kemuh : kelas === 'XI' ? faseF11_kemuh : faseF12_kemuh;
    return faseE;
  };

  const activeFaseData = getFaseData();
  const allMateri = [...activeFaseData.semester.ganjil.materi, ...activeFaseData.semester.genap.materi];
  const activeMateri = allMateri.find(m => m.bab === bab) || allMateri[0];

  return (
    <div className="perangkat-wrapper">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="settings-overlay" 
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
        />
      )}

      {/* Left Sidebar - Materi Navigator */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ 
        zIndex: 1050, 
        background: '#FFFFFF', 
        color: 'var(--text)', 
        borderRight: '1px solid #E2E8F0', 
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #E2E8F0' }}>
          <h2 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '15px', 
            fontWeight: '800', 
            color: 'var(--primary-dark)',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Library size={18} color="var(--primary)" />
            Pilih Materi
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <BookOpen size={14} color="#64748B" style={{ position: 'absolute', left: '10px', pointerEvents: 'none' }} />
              <select 
                value={mapel} 
                onChange={e => { setMapel(e.target.value); setBab(1); }}
                style={{ 
                  width: '100%', 
                  padding: '9px 12px 9px 34px', 
                  borderRadius: '10px', 
                  border: '1px solid #CBD5E1', 
                  background: '#F8FAFC',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#1E293B',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  transition: 'all 0.15s'
                }}
                onFocus={e => e.target.style.borderColor = '#1976D2'}
                onBlur={e => e.target.style.borderColor = '#CBD5E1'}
              >
                <option value="pai">PAI & Budi Pekerti</option>
                <option value="arab">Bahasa Arab</option>
                <option value="kemuh">Kemuhammadiyahan</option>
              </select>
              <ChevronRight size={14} color="#64748B" style={{ position: 'absolute', right: '10px', transform: 'rotate(90deg)', pointerEvents: 'none' }} />
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <GraduationCap size={14} color="#64748B" style={{ position: 'absolute', left: '10px', pointerEvents: 'none' }} />
              <select 
                value={kelas} 
                onChange={e => { setKelas(e.target.value); setBab(1); }}
                style={{ 
                  width: '100%', 
                  padding: '9px 12px 9px 34px', 
                  borderRadius: '10px', 
                  border: '1px solid #CBD5E1', 
                  background: '#F8FAFC',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  color: '#1E293B',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  transition: 'all 0.15s'
                }}
                onFocus={e => e.target.style.borderColor = '#1976D2'}
                onBlur={e => e.target.style.borderColor = '#CBD5E1'}
              >
                <option value="X">Kelas X (Fase E)</option>
                <option value="XI">Kelas XI (Fase F)</option>
                <option value="XII">Kelas XII (Fase F)</option>
              </select>
              <ChevronRight size={14} color="#64748B" style={{ position: 'absolute', right: '10px', transform: 'rotate(90deg)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '12px 0' }}>
          {/* Ganjil */}
          <div style={{ 
            padding: '10px 20px', 
            fontSize: '10.5px', 
            fontWeight: '800', 
            color: '#64748B', 
            letterSpacing: '0.8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--secondary)' }}></span>
            SEMESTER GANJIL
          </div>
          {activeFaseData.semester.ganjil.materi.map(m => {
            const isActive = bab === m.bab;
            return (
              <div 
                key={`ganjil-${m.bab}`}
                onClick={() => { setBab(m.bab); setIsSidebarOpen(false); }}
                style={{ 
                  padding: '11px 20px 11px 24px', 
                  cursor: 'pointer', 
                  borderLeft: isActive ? '4px solid #1976D2' : '4px solid transparent',
                  background: isActive ? '#E3F2FD' : 'transparent',
                  color: isActive ? 'var(--primary-dark)' : '#475569',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '12.5px',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#F8FAFC';
                    e.currentTarget.style.color = 'var(--primary-dark)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#475569';
                  }
                }}
              >
                <span style={{ 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  maxWidth: '190px' 
                }}>
                  Bab {m.bab}: {m.judul}
                </span>
                {isActive && <ChevronRight size={12} color="var(--primary)" />}
              </div>
            );
          })}

          <div style={{ height: '12px' }}></div>

          {/* Genap */}
          <div style={{ 
            padding: '10px 20px', 
            fontSize: '10.5px', 
            fontWeight: '800', 
            color: '#64748B', 
            letterSpacing: '0.8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderTop: '1px solid #F1F5F9',
            paddingTop: '18px'
          }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--secondary)' }}></span>
            SEMESTER GENAP
          </div>
          {activeFaseData.semester.genap.materi.map(m => {
            const isActive = bab === m.bab;
            return (
              <div 
                key={`genap-${m.bab}`}
                onClick={() => { setBab(m.bab); setIsSidebarOpen(false); }}
                style={{ 
                  padding: '11px 20px 11px 24px', 
                  cursor: 'pointer', 
                  borderLeft: isActive ? '4px solid #1976D2' : '4px solid transparent',
                  background: isActive ? '#E3F2FD' : 'transparent',
                  color: isActive ? 'var(--primary-dark)' : '#475569',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '12.5px',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#F8FAFC';
                    e.currentTarget.style.color = 'var(--primary-dark)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#475569';
                  }
                }}
              >
                <span style={{ 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  maxWidth: '190px' 
                }}>
                  Bab {m.bab}: {m.judul}
                </span>
                {isActive && <ChevronRight size={12} color="var(--primary)" />}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#F8FAFC' }}>
        
        {/* Mobile Toolbar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '10px 20px', 
          background: 'white', 
          borderBottom: '1px solid var(--border)',
          gap: '15px'
        }}>
          <button 
            className="md-hidden"
            onClick={() => setIsSidebarOpen(true)}
            style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--primary)' }}
          >
            ☰
          </button>
          <div>
            <h2 style={{ margin: 0, fontSize: '16px', color: 'var(--primary-dark)' }}>Materi Pembelajaran</h2>
            <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>
              {mapel.toUpperCase()} • Kelas {kelas} • Bab {bab}
            </div>
          </div>
        </div>

        {/* Content Render */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '30px', boxShadow: 'var(--shadow)' }}>
            <MateriContent mapel={mapel} kelas={kelas} bab={bab} materiData={activeMateri} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Materi;
