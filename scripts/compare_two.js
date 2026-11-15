const { execSync } = require('child_process');
const t1 = execSync('powershell -ExecutionPolicy Bypass -File scripts/read_docx.ps1 "Arbco Service Pages Changes/annandale service page.docx"', { encoding: 'utf8' });
const t2 = execSync('powershell -ExecutionPolicy Bypass -File scripts/read_docx.ps1 "Arbco Service Pages Changes/Belgian Gardens Service Page.docx"', { encoding: 'utf8' });
console.log('T1 length:', t1.length);
console.log('T2 length:', t2.length);
console.log('Strict equal?', t1 === t2);
