const fs = require('fs');
let content = fs.readFileSync('website/translations-complete-recovered.js', 'utf8');

const spanishBlock = `    feature2_title: "IA Enfermera de Emergencia",
    feature2_desc: "Asistencia médica de IA con evaluación de triaje, entrada de voz e imagen y soporte de botiquín de primeros auxilios. Se requiere Internet.",
    feature2_item1: "✓ Soporte de voz e imagen",
    feature2_item2: "✓ Protocolo de triaje ABC+D",
    feature2_item3: "✓ EN / FR / TH / ES / IT / FIL",
    feature2_item4: "✓ Integración de botiquín",`;

content = content.replace(/    feature2_title: "IA Enfermera de Emergencia",[\s\S]*?feature2_item4: "[^"]*",/g, spanishBlock);

fs.writeFileSync('website/translations-complete.js', content, 'utf8');
console.log('Done');
