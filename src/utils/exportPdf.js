import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPdf(elementId, filename = 'perangkat-pembelajaran.pdf') {
  const element = document.getElementById(elementId);
  if (!element) return;

  const pages = element.querySelectorAll('.a4-page');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    
    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: page.scrollWidth,
      height: page.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    if (i > 0) {
      pdf.addPage();
    }
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  }

  pdf.save(filename);
}
