import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Landing from './pages/Landing';
import Perangkat from './pages/Perangkat';
import Materi from './pages/Materi';
import BahanAjar from './pages/BahanAjar';
import CatatanKemuhammadiyahan from './pages/CatatanKemuhammadiyahan';
import CatatanKemuhammadiyahanBab2 from './pages/CatatanKemuhammadiyahanBab2';
import Tentang from './pages/Tentang';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/catatan-kemuhammadiyahan-kelas-x" element={<CatatanKemuhammadiyahan />} />
        <Route path="/catatan-kemuhammadiyahan-kelas-xi" element={<CatatanKemuhammadiyahan />} />
        <Route path="/catatan-kemuhammadiyahan-kelas-x-bab-2" element={<CatatanKemuhammadiyahanBab2 />} />

        {/*
          HALAMAN QR YANG SUDAH DICETAK — path WAJIB tetap (jangan diubah):
          /materi/{mapel}/{kelas}/bab-{n}
          Contoh: /materi/pai/XI/bab-1
          Catatan: React Router butuh segmen penuh :babSlug (= "bab-1"),
          bukan "bab-:bab" (pola itu tidak match → 404).
        */}
        <Route path="/materi/:mapel/:kelas/:babSlug" element={<BahanAjar />} />

        <Route element={<MainLayout />}>
          {/* Perangkat Pembelajaran Routes */}
          <Route path="/perangkat" element={<Perangkat />} />
          <Route path="/perangkat/:tab" element={<Perangkat />} />

          {/* Rute langsung 1 per 1 untuk setiap halaman / dokumen */}
          <Route path="/cover" element={<Perangkat overrideTab="cover" />} />
          <Route path="/judul" element={<Perangkat overrideTab="judul" />} />
          <Route path="/identitas" element={<Perangkat overrideTab="identitas" />} />
          <Route path="/visi-misi" element={<Perangkat overrideTab="visi-misi" />} />
          <Route path="/daftar-isi" element={<Perangkat overrideTab="daftar-isi" />} />
          <Route path="/rpe" element={<Perangkat overrideTab="pekan-efektif" />} />
          <Route path="/pekan-efektif" element={<Perangkat overrideTab="pekan-efektif" />} />
          <Route path="/prota" element={<Perangkat overrideTab="prota" />} />
          <Route path="/promes" element={<Perangkat overrideTab="promes" />} />
          <Route path="/analisis-cp" element={<Perangkat overrideTab="analisis-cp" />} />
          <Route path="/cp-tp-pp" element={<Perangkat overrideTab="cp-tp-pp" />} />
          <Route path="/atp" element={<Perangkat overrideTab="atp" />} />
          <Route path="/kktp" element={<Perangkat overrideTab="kktp" />} />
          <Route path="/modul" element={<Perangkat overrideTab="modul" />} />
          <Route path="/modul-ajar" element={<Perangkat overrideTab="modul" />} />
          <Route path="/kisi-kisi" element={<Perangkat overrideTab="kisi-kisi" />} />
          <Route path="/kartu-soal" element={<Perangkat overrideTab="kartu-soal" />} />

          {/* Katalog materi (tanpa bab di path) */}
          <Route path="/materi" element={<Materi />} />
          <Route path="/materi/:mapel" element={<Materi />} />

          <Route path="/tentang" element={<Tentang />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
