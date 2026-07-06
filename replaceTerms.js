import fs from 'fs';
import path from 'path';

const filesToProcess = [
  'src/pages/Perangkat.jsx',
  'src/utils/perangkatUtils.jsx',
  'src/utils/exportDocx.js',
  'generateMateri.js',
  'src/components/materi/MateriContent.jsx',
  'src/pages/Landing.jsx',
  'src/pages/Tentang.jsx'
];

filesToProcess.forEach(filePath => {
  const fullPath = path.resolve(filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace "Peserta didik" -> "Murid"
    content = content.replace(/Peserta didik/g, 'Murid');
    // Replace "peserta didik" -> "murid"
    content = content.replace(/peserta didik/g, 'murid');
    // Replace "Peserta Didik" -> "Murid"
    content = content.replace(/Peserta Didik/g, 'Murid');
    
    // Replace "Siswa" -> "Murid"
    content = content.replace(/\bSiswa\b/g, 'Murid');
    // Replace "siswa" -> "murid"
    content = content.replace(/\bsiswa\b/g, 'murid');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Processed: ${filePath}`);
  }
});
