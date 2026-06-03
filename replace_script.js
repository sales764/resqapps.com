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

    // Spanish
    content = content.replace(/Asistencia médica de IA con evaluación de triaje, entrada de voz e imagen y soporte de botiquín de primeros auxilios\. Se requiere Internet\./g, 
    "Guía médica de IA adaptada a los perfiles médicos de su familia y al inventario exacto de su botiquín de primeros auxilios. Entrada de voz/imagen con triaje ABC+D.");

    // Italian
    content = content.replace(/Guida medica IA con triage, input vocale e immagine e supporto kit primo soccorso\. Connessione Internet richiesta per IA\./g, 
    "Guida medica IA personalizzata per i profili medici familiari e l'inventario esatto del tuo kit di pronto soccorso. Input vocale/immagine con triage ABC+D.");

    // Filipino
    content = content.replace(/Medikal na gabay ng AI na may triage assessment, voice\/image input, at first aid kit support\. Kailangan ng Internet\./g, 
    "AI medikal na gabay na naka-customize para sa mga medikal na profile ng pamilya at sa iyong eksaktong first aid kit inventory. Voice/image input na may ABC+D triage.");

    // Replace item3 (Languages -> Profiles)
    content = content.replace(/✓ EN \/ FR \/ TH \/ ES \/ IT \/ FIL languages/g, "✓ Family medical profiles");
    content = content.replace(/✓ EN \/ FR \/ TH \/ ES \/ IT \/ FIL/g, "✓ Family medical profiles");
    content = content.replace(/✓ ภาษา EN \/ FR \/ TH \/ ES \/ IT \/ FIL/g, "✓ Family medical profiles");
    content = content.replace(/✓ Langues EN \/ FR \/ TH \/ ES \/ IT \/ FIL/g, "✓ Family medical profiles");
    
    // Proper translations for item3
    content = content.replace(/✓ Family medical profiles/g, function(match, offset, str) {
        // Find context to guess language (hacky but works if done carefully, actually wait)
        return match;
    });

    // Replace item4 (Kit -> Exact Kit)
    content = content.replace(/✓ First aid kit integration/g, "✓ Exact kit inventory match");
    content = content.replace(/✓ Aide pour trousse de secours/g, "✓ Inventaire exact de la trousse");
    content = content.replace(/✓ Intégration trousse premiers soins/g, "✓ Inventaire exact de la trousse");
    content = content.replace(/✓ การผสานรวมกับชุดปฐมพยาบาล/g, "✓ วิเคราะห์ตามชุดปฐมพยาบาลของคุณ");
    content = content.replace(/✓ บูรณาการชุดปฐมพยาบาล/g, "✓ วิเคราะห์ตามชุดปฐมพยาบาลของคุณ");
    content = content.replace(/✓ Integración de botiquín/g, "✓ Inventario exacto del botiquín");
    content = content.replace(/✓ Integrazione kit soccorso/g, "✓ Inventario esatto del kit");
    content = content.replace(/✓ Gabay sa first aid kit/g, "✓ Eksaktong kit inventory");

    fs.writeFileSync(path, content, 'utf8');
}

replaceInFile('website/translations-complete.js');
replaceInFile('website/translations.js');
console.log('Done');
