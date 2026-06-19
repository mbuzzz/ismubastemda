import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Landing from './pages/Landing';
import Perangkat from './pages/Perangkat';
import Materi from './pages/Materi';
import Tentang from './pages/Tentang';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<MainLayout />}>
          <Route path="/perangkat" element={<Perangkat />} />
          <Route path="/materi" element={<Materi />} />
          <Route path="/tentang" element={<Tentang />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
