/**
 * Stempel nomor halaman di SETIAP lembar cetak (bukan hanya per seksi).
 * Bekerja di Chrome/Firefox saat Save as PDF / Print.
 *
 * - Sampul (.a4-cover) & Judul (.judul-page / .no-page-num) dilewati
 * - Nomor dimulai dari 1 pada dokumen pertama yang dinomori
 */

const STAMP_CLASS = 'print-page-num-stamp';

function mmToPx(mm) {
  return (mm * 96) / 25.4;
}

/** Tinggi area cetak A4 portrait (297mm − margin atas/bawah @page) */
function getPrintablePageHeightPx() {
  // selaras @page margin ~12mm atas + 18mm bawah
  return mmToPx(297 - 12 - 18);
}

function shouldSkipNumbering(el) {
  if (!el || !el.classList) return true;
  return (
    el.classList.contains('a4-cover') ||
    el.classList.contains('judul-page') ||
    el.classList.contains('no-page-num') ||
    el.classList.contains('no-print')
  );
}

function clearStamps(root = document) {
  root.querySelectorAll(`.${STAMP_CLASS}`).forEach((n) => n.remove());
}

/**
 * @param {ParentNode} [root]
 * @returns {number} total halaman bernomor
 */
export function stampPrintPageNumbers(root = document) {
  clearStamps(root);

  const pageH = getPrintablePageHeightPx();
  const pages = Array.from(root.querySelectorAll('.a4-page'));
  // Fallback: halaman materi tunggal tanpa .a4-page
  const targets = pages.length
    ? pages
    : Array.from(root.querySelectorAll('.materi-print-root, .materi-view-container')).slice(0, 1);

  let pageNo = 0;

  targets.forEach((el) => {
    if (shouldSkipNumbering(el)) return;

    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return;

    const height = Math.max(el.scrollHeight, el.offsetHeight, 1);
    // Minimal 1 lembar per seksi; selebihnya dihitung dari tinggi konten
    const sheets = Math.max(1, Math.ceil(height / pageH));

    const prevPos = el.style.position;
    if (!prevPos || prevPos === 'static') {
      el.style.position = 'relative';
      el.dataset.printPosPatched = '1';
    }

    for (let i = 0; i < sheets; i += 1) {
      pageNo += 1;
      const stamp = document.createElement('div');
      stamp.className = STAMP_CLASS;
      stamp.setAttribute('aria-hidden', 'true');
      stamp.textContent = String(pageNo);
      // taruh di dekat bawah tiap "lembar" virtual di dalam seksi
      const top = Math.min(height - 20, (i + 1) * pageH - 22);
      stamp.style.cssText = [
        'position:absolute',
        `top:${Math.max(8, top)}px`,
        'left:0',
        'right:0',
        'text-align:center',
        'font-size:10pt',
        'font-weight:600',
        'color:#334155',
        'line-height:1',
        'pointer-events:none',
        'z-index:50',
      ].join(';');
      el.appendChild(stamp);
    }
  });

  return pageNo;
}

export function clearPrintPageNumbers(root = document) {
  clearStamps(root);
  root.querySelectorAll('[data-print-pos-patched="1"]').forEach((el) => {
    el.style.position = '';
    delete el.dataset.printPosPatched;
  });
}

/** Pasang listener once */
let hooked = false;
export function enablePrintPageNumbers() {
  if (hooked || typeof window === 'undefined') return;
  hooked = true;

  const onBefore = () => {
    // biarkan layout settle
    requestAnimationFrame(() => {
      stampPrintPageNumbers(document);
    });
  };
  const onAfter = () => {
    clearPrintPageNumbers(document);
  };

  window.addEventListener('beforeprint', onBefore);
  window.addEventListener('afterprint', onAfter);

  // matchMedia fallback (beberapa browser)
  try {
    const mql = window.matchMedia('print');
    const onChange = (e) => {
      if (e.matches) onBefore();
      else onAfter();
    };
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else if (mql.addListener) mql.addListener(onChange);
  } catch {
    /* ignore */
  }
}

export default enablePrintPageNumbers;
