import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Home, Printer } from 'lucide-react';
import MateriContent from '../components/materi/MateriContent';
import { getBahanAjarLengkap, listBahanAjarBab } from '../utils/bahanAjarBuilder';
import { buildMateriPath } from '../utils/materiUrls';
import { stampPrintPageNumbers, clearPrintPageNumbers } from '../utils/printPageNumbers';

/**
 * Halaman BAHAN AJAR untuk QR yang sudah dicetak.
 * URL (JANGAN diubah): /materi/{mapel}/{kelas}/bab-{n}
 * Contoh: /materi/pai/X/bab-1
 *         /materi/kemuh/XI/bab-3
 *         /materi/arab/X/bab-2
 */
const normalizeMapel = (v) => {
  const m = String(v || 'pai').toLowerCase().trim();
  if (m === 'pai' || m === 'arab' || m === 'kemuh') return m;
  // toleransi alias
  if (m === 'bahasa-arab' || m === 'bhsarab') return 'arab';
  if (m === 'kemuhammadiyahan') return 'kemuh';
  return 'pai';
};

const normalizeKelas = (v) => {
  const k = String(v || 'X').toUpperCase().replace(/[^IVX]/g, '');
  if (k === 'X' || k === 'XI' || k === 'XII') return k;
  if (k === '10') return 'X';
  if (k === '11') return 'XI';
  if (k === '12') return 'XII';
  return 'X';
};

const normalizeBab = (v) => {
  // Dari route /materi/:mapel/:kelas/:babSlug → babSlug = "bab-1"
  const raw = String(v ?? '1');
  const match = raw.match(/(\d+)/);
  const n = match ? parseInt(match[1], 10) : 1;
  return Number.isFinite(n) && n > 0 ? n : 1;
};

const MAPEL_LABEL = {
  pai: 'PAI & Budi Pekerti',
  arab: 'Bahasa Arab',
  kemuh: 'Kemuhammadiyahan',
};

export default function BahanAjar() {
  const params = useParams();

  const mapel = normalizeMapel(params.mapel);
  const kelas = normalizeKelas(params.kelas);
  // QR path: /materi/pai/XI/bab-1 → babSlug = "bab-1"
  const bab = normalizeBab(params.babSlug || params.bab);

  const book = useMemo(() => getBahanAjarLengkap(mapel, kelas, bab), [mapel, kelas, bab]);
  const daftarBab = useMemo(() => listBahanAjarBab(mapel, kelas), [mapel, kelas]);

  const materiData = useMemo(() => ({
    bab: book.bab,
    judul: book.meta?.judul,
    elemen: book.meta?.elemen,
    tp: book.meta?.tp || [],
    capaian: book.meta?.capaian || '',
    alokasi: book.meta?.alokasi,
    minggu: book.meta?.minggu,
  }), [book]);

  // Body class untuk cetak bersih + title tab
  useEffect(() => {
    document.body.classList.add('materi-standalone-print');
    const prev = document.title;
    document.title = `Bahan Ajar · Bab ${bab} · ${MAPEL_LABEL[mapel] || mapel} · Kelas ${kelas}`;
    return () => {
      document.body.classList.remove('materi-standalone-print');
      document.title = prev;
    };
  }, [mapel, kelas, bab]);

  const handlePrint = () => {
    stampPrintPageNumbers(document);
    setTimeout(() => {
      window.print();
      setTimeout(() => clearPrintPageNumbers(document), 500);
    }, 150);
  };

  const validBab = daftarBab.some((m) => Number(m.bab) === Number(book.bab));

  return (
    <div className="materi-print-root" style={{ minHeight: '100vh', background: '#F1F5F9' }}>
      {/* Toolbar — disembunyikan saat print lewat .no-print */}
      <header
        className="no-print"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#0D47A1',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            <Home size={16} /> Beranda
          </Link>
          <span style={{ color: '#CBD5E1' }}>|</span>
          <Link
            to="/materi"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#475569',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            <ArrowLeft size={16} /> Semua Materi
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: '#0D47A1',
              background: '#E3F2FD',
              border: '1px solid #BBDEFB',
              borderRadius: 999,
              padding: '6px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <BookOpen size={14} />
            {MAPEL_LABEL[mapel]} · Kelas {kelas} · Bab {bab}
          </span>
          <button
            type="button"
            onClick={handlePrint}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid #BBDEFB',
              background: '#0D47A1',
              color: '#FFF',
              fontWeight: 700,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            <Printer size={14} /> Cetak
          </button>
        </div>
      </header>

      {/* Konten bahan ajar — 1 bab = 1 halaman QR */}
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '20px 16px 48px' }}>
        {!validBab && (
          <div
            className="no-print"
            style={{
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              color: '#9A3412',
              borderRadius: 12,
              padding: '12px 16px',
              marginBottom: 16,
              fontSize: 13,
            }}
          >
            Bab {bab} tidak ditemukan pada {MAPEL_LABEL[mapel]} kelas {kelas}. Menampilkan bab terdekat yang tersedia.
          </div>
        )}

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 30px rgba(15,23,42,0.06)',
            padding: '28px 28px 36px',
          }}
        >
          <MateriContent mapel={mapel} kelas={kelas} bab={book.bab} materiData={materiData} />
        </div>

        {/* Navigasi bab lain (bukan ubah format QR) */}
        {daftarBab.length > 1 && (
          <nav
            className="no-print"
            style={{
              marginTop: 20,
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 14,
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', letterSpacing: 0.6, marginBottom: 10, textTransform: 'uppercase' }}>
              Bab lain · {MAPEL_LABEL[mapel]} Kelas {kelas}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {daftarBab.map((m) => {
                const active = Number(m.bab) === Number(book.bab);
                const to = buildMateriPath(mapel, kelas, m.bab);
                return (
                  <Link
                    key={m.bab}
                    to={to}
                    style={{
                      textDecoration: 'none',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '7px 12px',
                      borderRadius: 999,
                      border: active ? '1px solid #0D47A1' : '1px solid #E2E8F0',
                      background: active ? '#0D47A1' : '#F8FAFC',
                      color: active ? '#FFF' : '#334155',
                    }}
                    title={m.judul}
                  >
                    Bab {m.bab}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

        <p
          className="no-print"
          style={{
            marginTop: 16,
            textAlign: 'center',
            fontSize: 11,
            color: '#94A3B8',
            wordBreak: 'break-all',
          }}
        >
          URL QR: ismubastemda.web.id{buildMateriPath(mapel, kelas, bab)}
        </p>
      </main>
    </div>
  );
}
