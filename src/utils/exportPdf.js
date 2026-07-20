import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Export .a4-page elements to a multi-page A4 PDF.
 * Long pages (e.g. Modul Ajar) are sliced vertically so nothing is cropped.
 */
export async function exportToPdf(elementId, filename = 'perangkat-pembelajaran.pdf') {
  const element = document.getElementById(elementId);
  if (!element) return;

  const pages = element.querySelectorAll('.a4-page');
  if (!pages.length) return;

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = 210;
  const pdfHeight = 297;
  let isFirstSlice = true;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    // Temporarily ensure full content is measurable / visible
    const prevOverflow = page.style.overflow;
    const prevHeight = page.style.height;
    page.style.overflow = 'visible';
    page.style.height = 'auto';

    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: page.scrollWidth,
      windowHeight: page.scrollHeight,
      width: page.scrollWidth,
      height: page.scrollHeight,
    });

    page.style.overflow = prevOverflow;
    page.style.height = prevHeight;

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // px → mm scale based on A4 width
    const pxPerMm = canvas.width / pdfWidth;
    const pageHeightPx = pdfHeight * pxPerMm;
    let yOffsetPx = 0;

    while (yOffsetPx < canvas.height) {
      const sliceHeightPx = Math.min(pageHeightPx, canvas.height - yOffsetPx);

      // Draw the vertical slice onto an offscreen canvas
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.ceil(sliceHeightPx);
      const ctx = sliceCanvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      ctx.drawImage(
        canvas,
        0,
        yOffsetPx,
        canvas.width,
        sliceHeightPx,
        0,
        0,
        canvas.width,
        sliceHeightPx
      );

      const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.95);
      const sliceHeightMm = sliceHeightPx / pxPerMm;

      if (!isFirstSlice) {
        pdf.addPage();
      }
      isFirstSlice = false;

      pdf.addImage(sliceData, 'JPEG', 0, 0, pdfWidth, sliceHeightMm);
      yOffsetPx += sliceHeightPx;
    }
  }

  pdf.save(filename);
}
