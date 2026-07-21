/**
 * URL publik halaman Bahan Ajar.
 * Format path (cocok QR / share): /materi/{mapel}/{kelas}/bab-{n}
 * Format query (internal): /materi?mapel=&kelas=&bab=
 */

export const MATERI_PUBLIC_ORIGIN = 'https://ismubastemda.web.id';

export function buildMateriPath(mapel = 'pai', kelas = 'X', bab = 1) {
  const m = String(mapel || 'pai').toLowerCase();
  const k = String(kelas || 'X').toUpperCase();
  const b = Number(bab) || 1;
  return `/materi/${m}/${k}/bab-${b}`;
}

export function buildMateriQuery(mapel = 'pai', kelas = 'X', bab = 1) {
  const params = new URLSearchParams({
    mapel: String(mapel || 'pai').toLowerCase(),
    kelas: String(kelas || 'X').toUpperCase(),
    bab: String(Number(bab) || 1),
  });
  return `/materi?${params.toString()}`;
}

/** URL absolut untuk QR / cetak — pakai origin saat di browser, fallback domain produksi */
export function getMateriPublicUrl(mapel, kelas, bab) {
  const path = buildMateriPath(mapel, kelas, bab);
  if (typeof window !== 'undefined' && window.location?.origin) {
    // Saat dev (localhost) tetap pakai origin lokal agar QR bisa diuji
    return `${window.location.origin}${path}`;
  }
  return `${MATERI_PUBLIC_ORIGIN}${path}`;
}

export function parseMateriPathParams({ mapel, kelas, bab, babSlug } = {}) {
  const m = String(mapel || 'pai').toLowerCase();
  const k = String(kelas || 'X').toUpperCase();
  let b = Number(bab);
  if (!b && babSlug) {
    const match = String(babSlug).match(/(\d+)/);
    b = match ? Number(match[1]) : 1;
  }
  if (!b) b = 1;
  return { mapel: m, kelas: k, bab: b };
}
