const fs = require('fs');

function replaceInFile(path) {
    let content = fs.readFileSync(path, 'utf8');

    // English
    content = content.replace(/AI medical guidance with triage assessment, voice and image input, and first aid kit support\. Internet connection required for AI responses\./g, 
    AI medical guidance customized to your family's medical profiles and specific first aid kit inventory. Voice/image input with ABC+D triage.);
    
    // French
    content = content.replace(/Assistance médicale par IA avec évaluation de triage, saisie vocale et d'images, et intégration de la trousse de secours\. Internet requis pour l'IA\./g, 
    Assistance médicale par IA personnalisée selon les profils médicaux familiaux et le contenu exact de votre trousse de secours. Saisie vocale/image avec triage ABC+D.);

    // Thai
    content = content.replace(/คำแนะนำทางการแพทย์จาก AI พร้อมการประเมินการคัดกรอง รองรับเสียงและภาพ และคำแนะนำชุดปฐมพยาบาล \(ต้องใช้อินเทอร์เน็ต\)/g, 
    คำแนะนำทางการแพทย์จาก AI ที่ปรับแต่งตามโปรไฟล์ทางการแพทย์ของครอบครัวและชุดปฐมพยาบาลของคุณโดยเฉพาะ พร้อมประเมินการคัดกรอง ABC+D);

    // Spanish
    content = content.replace(/Asistencia médica de IA con evaluación de triaje, entrada de voz e imagen y soporte de botiquín de primeros auxilios\. Se requiere Internet\./g, 
    Guía médica de IA adaptada a los perfiles médicos de su familia y al inventario exacto de su botiquín de primeros auxilios. Entrada de voz/imagen con triaje ABC+D.);

    // Italian
    content = content.replace(/Guida medica IA con triage, input vocale e immagine e supporto kit primo soccorso\. Connessione Internet richiesta per IA\./g, 
    Guida medica IA personalizzata per i profili medici familiari e l'inventario esatto del tuo kit di pronto soccorso. Input vocale/immagine con triage ABC+D.);

    // Filipino
    content = content.replace(/Medikal na gabay ng AI na may triage assessment, voice\/image input, at first aid kit support\. Kailangan ng Internet\./g, 
    AI medikal na gabay na naka-customize para sa mga medikal na profile ng pamilya at sa iyong eksaktong first aid kit inventory. Voice/image input na may ABC+D triage.);

    // Replacements for item3 (Languages -> Profiles)
    content = content.replace(/✓ EN \/ FR \/ TH \/ ES \/ IT \/ FIL/g, "✓ Family medical profiles");
    content = content.replace(/✓ EN \/ FR \/ TH \/ ES \/ IT \/ FIL languages/g, "✓ Family medical profiles");
    
    // Specifically translate item3 correctly if needed, but in translations.js we can just overwrite them directly if we know where they are.
    // Wait, the item3 text is EXACTLY "✓ EN / FR / TH / ES / IT / FIL" across all languages in translations-complete.js? Let's check.
    
    fs.writeFileSync(path, content, 'utf8');
}

replaceInFile('website/translations-complete.js');
replaceInFile('website/translations.js');
console.log('Done');
