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
    
    // Replace "Murid" -> "Murid"
    content = content.replace(/Murid/g, 'Murid');
    // Replace "murid" -> "murid"
    content = content.replace(/murid/g, 'murid');
    // Replace "Murid" -> "Murid"
    content = content.replace(/Murid/g, 'Murid');
    
    // Replace "Siswa" -> "Murid"
    content = content.replace(/\bSiswa\b/g, 'Murid');
    // Replace "siswa" -> "murid"
    content = content.replace(/\bsiswa\b/g, 'murid');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Processed: ${filePath}`);
  }
});
