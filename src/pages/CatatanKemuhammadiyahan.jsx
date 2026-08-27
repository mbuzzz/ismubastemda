import React, { useEffect } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, Home, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

const PHOTO_URL = 'https://www.jakartamu.com/wp-content/uploads/2025/03/IMG-20250324-WA0062.jpg';

const pillars = [
  ['Penegakan Keadilan Sosial', 'Melawan hegemoni dan ketimpangan ekonomi-politik.'],
  ['Advokasi Kaum Mustadh’afin', 'Membela dan memberdayakan kaum yang tertindas, miskin, dan termarjinalkan.'],
  ['Kritik Sosial yang Konstruktif', 'Berani menyuarakan kebenaran (amar ma’ruf nahi munkar) terhadap kebijakan yang merugikan rakyat.'],
  ['Praksis Amal Nyata', 'Diwujudkan melalui institusi pendidikan, kesehatan, panti asuhan, dan lembaga filantropi (Lazismu).'],
];

const comparison = [
  ['Orientasi & Tujuan', 'Moralitas, keadilan, dan kemaslahatan umum', 'Perebutan kekuasaan, kursi jabatan, dan hegemoni partai'],
  ['Sifat Gerakan', 'Kultural, independen, dan berjangka panjang', 'Partisan, pragmatis, dan transaksional'],
  ['Aktor Utama', 'Gerakan moral / Civil Society (Muhammadiyah)', 'Partai politik dan politisi elektoral'],
  ['Fokus Isu', 'Penegakan hukum, HAM, dan pemberantasan korupsi', 'Kemenangan pemilu dan pembagian kekuasaan'],
];

function Section({ number, title, children }) {
  return (
    <section className="catatan-section">
      <div className="catatan-section-heading">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function CatatanKemuhammadiyahan() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Catatan Kemuhammadiyahan Kelas X · ISMUBA STEMDA';
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="catatan-page">
      <header className="catatan-toolbar no-print">
        <Link to="/" className="catatan-back"><Home size={16} /> Beranda</Link>
        <div className="catatan-toolbar-actions">
          <span className="catatan-badge"><BookOpen size={14} /> Kemuhammadiyahan · Kelas X</span>
          <button type="button" className="catatan-print-button" onClick={() => window.print()}>
            <Printer size={15} /> Cetak
          </button>
        </div>
      </header>

      <main className="catatan-shell">
        <article className="catatan-paper">
          <div className="catatan-hero">
            <div>
              <p className="catatan-kicker">CATATAN PEMBELAJARAN · ISMUBA</p>
              <h1>Catatan Kemuhammadiyahan Kelas X</h1>
              <p className="catatan-subtitle">Gagasan Pemikiran Amien Rais: Tauhid Sosial &amp; High Politics</p>
              <div className="catatan-meta">
                <span>Mata Pelajaran: Kemuhammadiyahan</span>
                <span>Kelas/Fase: X (Sepuluh) / Fase E</span>
              </div>
            </div>
            <figure className="catatan-portrait">
              <img src={PHOTO_URL} alt="Prof. Dr. H. Muhammad Amien Rais, M.A." />
              <figcaption>Prof. Dr. H. Muhammad Amien Rais, M.A.</figcaption>
            </figure>
          </div>

          <div className="catatan-intro">
            <strong>Pokok bahasan:</strong> memahami bagaimana keimanan diterjemahkan menjadi kepedulian sosial, keberpihakan kepada kemanusiaan, dan perjuangan politik yang berlandaskan nilai moral.
          </div>

          <Section number="A" title="Profil Singkat Tokoh">
            <dl className="catatan-facts">
              <div><dt>Nama</dt><dd>Prof. Dr. H. Muhammad Amien Rais, M.A.</dd></div>
              <div><dt>Peran</dt><dd>Ketua Umum Pimpinan Pusat (PP) Muhammadiyah periode 1995–1998.</dd></div>
              <div><dt>Gagasan Utama</dt><dd>Memperkenalkan konsep pemikiran transformatif Tauhid Sosial dan etika kebangsaan High Politics dalam dakwah Muhammadiyah modern.</dd></div>
            </dl>
          </Section>

          <Section number="B" title="Konsep Tauhid Sosial">
            <h3>1. Pengertian</h3>
            <p>Tauhid Sosial adalah integrasi keimanan kepada Allah Swt. (<em>hablun minallah</em>) yang diwujudkan secara nyata dalam bentuk kepedulian sosial, pembelaan kemanusiaan, dan penegakan keadilan antarmanusia (<em>hablun minannas</em>).</p>
            <h3>2. Prinsip Dasar</h3>
            <ul>
              <li>Tauhid tidak boleh berhenti sebatas dogma teologis atau kesalehan ritual individual.</li>
              <li>Iman yang benar harus melahirkan kesalehan sosial serta tindakan konkret untuk memberantas kemiskinan, kebodohan, dan penindasan.</li>
              <li>Merupakan kontekstualisasi modern dari Teologi Al-Ma’un yang dirintis oleh K.H. Ahmad Dahlan.</li>
            </ul>
            <h3>3. Empat Pilar Tauhid Sosial</h3>
            <div className="pillar-grid">
              {pillars.map(([title, text], index) => <div className="pillar-card" key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div></div>)}
            </div>
          </Section>

          <Section number="C" title="Konsep High Politics (Politik Nilai / Moral)">
            <h3>1. Pengertian</h3>
            <p><em>High Politics</em> (politik tingkat tinggi/politik adiluhung) adalah garis perjuangan politik yang berorientasi pada etika, nilai moral, penegakan konstitusi, dan kemaslahatan publik tanpa terjebak dalam politik praktis elektoral (<em>low politics</em>).</p>
            <h3>2. Tabel Perbandingan Politik</h3>
            <div className="table-wrap"><table><thead><tr><th>Aspek Pembeda</th><th>High Politics (Politik Nilai)</th><th>Low Politics (Politik Praktis)</th></tr></thead><tbody>{comparison.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
            <h3>3. Sikap Khittah Muhammadiyah</h3>
            <ul>
              <li>Berperan aktif sebagai kekuatan moral (<em>moral force</em>) bangsa.</li>
              <li>Menjaga jarak yang sama (<em>equal distance</em>) dan independen terhadap seluruh kekuatan politik praktis.</li>
              <li>Melakukan kontrol dan advokasi kebijakan publik (misal: <em>judicial review</em> undang-undang demi kepentingan rakyat).</li>
            </ul>
          </Section>

          <Section number="D" title="Implementasi bagi Pelajar Muhammadiyah">
            <div className="implementation-list">
              <div><CheckCircle2 size={20} /><p><strong>Solidaritas Sosial:</strong> Membantu teman dan masyarakat yang membutuhkan baik moral maupun material.</p></div>
              <div><CheckCircle2 size={20} /><p><strong>Integritas Diri:</strong> Menolak kecurangan akademik (mencontek/plagiasi) sebagai latihan antikorupsi sejak dini.</p></div>
              <div><CheckCircle2 size={20} /><p><strong>Kritis &amp; Beretika:</strong> Aktif menyuarakan kebenaran serta bijak dan beradab dalam bermedia sosial.</p></div>
            </div>
          </Section>

          <Section number="E" title="Pertanyaan Evaluasi Singkat">
            <ol className="evaluation-list">
              <li>Jelaskan keterkaitan antara konsep Tauhid Sosial Amien Rais dengan Teologi Al-Ma’un K.H. Ahmad Dahlan!</li>
              <li>Mengapa Muhammadiyah memilih menjalankan <em>High Politics</em> daripada <em>Low Politics</em>?</li>
              <li>Berikan 2 contoh penerapan Tauhid Sosial di lingkungan sekolah!</li>
            </ol>
          </Section>

          <footer className="catatan-footer">Bahan ajar digital · Kemuhammadiyahan Kelas X · Fase E</footer>
        </article>
      </main>
    </div>
  );
}
