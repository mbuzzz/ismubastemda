import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Landing from './pages/Landing';
import Perangkat from './pages/Perangkat';
import Materi from './pages/Materi';
import BahanAjar from './pages/BahanAjar';
import Tentang from './pages/Tentang';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/*
          HALAMAN QR YANG SUDAH DICETAK — path WAJIB tetap:
          /materi/{mapel}/{kelas}/bab-{n}
          Contoh: /materi/pai/X/bab-1
          Dipasang di luar MainLayout agar tidak tertimpa layout/nav yang memicu 404.
        */}
        <Route path="/materi/:mapel/:kelas/bab-:bab" element={<BahanAjar />} />

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

          {/* Katalog materi (bukan path QR) */}
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
