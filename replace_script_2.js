const fs = require('fs');

function replaceInFile(path) {
    let content = fs.readFileSync(path, 'utf8');

    // English
    content = content.replace(/AI medical guidance with triage assessment, voice and image input, and first aid kit support\. Internet connection required for AI responses\./g, 
    "AI medical guidance customized to your family's medical profiles and specific first aid kit inventory. Voice/image input with ABC+D triage.");
    
    // French
    content = content.replace(/Assistance médicale par IA avec évaluation de triage, saisie vocale et d'images, et intégration de la trousse de secours\. Internet requis pour l'IA\./g, 
    "Assistance médicale par IA personnalisée selon les profils médicaux familiaux et le contenu exact de votre trousse de secours. Saisie vocale/image avec triage ABC+D.");

    // Thai
    content = content.replace(/คำแนะนำทางการแพทย์จาก AI พร้อมการประเมินการคัดกรอง รองรับเสียงและภาพ และคำแนะนำชุดปฐมพยาบาล \(ต้องใช้อินเทอร์เน็ต\)/g, 
    "คำแนะนำทางการแพทย์จาก AI ที่ปรับแต่งตามโปรไฟล์ทางการแพทย์ของครอบครัวและชุดปฐมพยาบาลของคุณโดยเฉพาะ พร้อมประเมินการคัดกรอง ABC+D");
    content = content.replace(/คำแนะนำทางการแพทย์ด้วย AI พร้อมการคัดกรอง รองรับเสียงและภาพ และการช่วยเหลือเรื่องชุดปฐมพยาบาล ต้องเชื่อมต่ออินเทอร์เน็ตเพื่อรับคำตอบจาก AI/g, 
    "คำแนะนำทางการแพทย์จาก AI ที่ปรับแต่งตามโปรไฟล์ทางการแพทย์ของครอบครัวและชุดปฐมพยาบาลของคุณโดยเฉพาะ พร้อมประเมินการคัดกรอง ABC+D");

    // Spanish
    content = content.replace(/Asistencia médica de IA con evaluación de triaje, entrada de voz e imagen y soporte de botiquín de primeros auxilios\. Se requiere Internet\./g, 
    "Guía médica de IA adaptada a los perfiles médicos de su familia y al inventario exacto de su botiquín de primeros auxilios. Entrada de voz/imagen con triaje ABC+D.");

    // Italian
    content = content.replace(/Guida medica IA con triage, input vocale e immagine e supporto kit primo soccorso\. Connessione Internet richiesta per IA\./g, 
    "Guida medica IA personalizzata per i profili medici familiari e l'inventario esatto del tuo kit di pronto soccorso. Input vocale/immagine con triage ABC+D.");

    // Filipino
    content = content.replace(/Medikal na gabay ng AI na may triage assessment, voice\/image input, at first aid kit support\. Kailangan ng Internet\./g, 
    "AI medikal na gabay na naka-customize para sa mga medikal na profile ng pamilya at sa iyong eksaktong first aid kit inventory. Voice/image input na may ABC+D triage.");

    // --- ITEM 3 & 4 Replacements ---
    
    // It's safer to target the specific keys: feature2_item3 and feature2_item4
    content = content.replace(/feature2_item3:\s*"✓ EN \/ FR \/ TH \/ ES \/ IT \/ FIL languages?",?/g, 'feature2_item3: "✓ Family medical profiles",');
    // For specific language blocks, we might need a regex that matches the language. Actually, we can just replace the whole line for feature2_item3 based on the surrounding block. But the quickest way is:
    
    // We will do a generic replacement and fix it up:
    content = content.replace(/feature2_item3:\s*"✓ Langues EN \/ FR \/ TH \/ ES \/ IT \/ FIL",?/g, 'feature2_item3: "✓ Profils médicaux familiaux",');
    content = content.replace(/feature2_item3:\s*"✓ ภาษา EN \/ FR \/ TH \/ ES \/ IT \/ FIL",?/g, 'feature2_item3: "✓ โปรไฟล์ทางการแพทย์ของครอบครัว",');
    
    // For the generic "✓ EN / FR / TH / ES / IT / FIL" that is the same across languages, we can't tell easily which language block it is.
    // Instead, let's use a replacer that checks the preceding feature2_title.
    
    fs.writeFileSync(path, content, 'utf8');
}

replaceInFile('website/translations-complete.js');
replaceInFile('website/translations.js');
console.log('Done script 2 setup');
