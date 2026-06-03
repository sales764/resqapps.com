const fs = require('fs');

function processTranslations(path) {
    let content = fs.readFileSync(path, 'utf8');

    // 1. ENGLISH
    content = content.replace(
        /(feature2_title:\s*"AI Emergency Nurse",[\s\n]*feature2_desc:\s*")[^"]+("\,[\s\n]*feature2_item1:\s*"[^"]+",[\s\n]*feature2_item2:\s*"[^"]+",[\s\n]*feature2_item3:\s*")[^"]+("\,[\s\n]*feature2_item4:\s*")[^"]+(")/g,
        `$1AI medical guidance customized to your family's medical profiles and specific first aid kit inventory. Voice/image input with ABC+D triage.$2✓ Family medical profiles$3✓ Exact kit inventory match$4`
    );

    // 2. FRENCH (IA Infirmière d'Urgence / Infirmière d'Urgence IA)
    content = content.replace(
        /(feature2_title:\s*"(?:IA Infirmière d'Urgence|Infirmière d'Urgence IA)",[\s\n]*feature2_desc:\s*")[^"]+("\,[\s\n]*feature2_item1:\s*"[^"]+",[\s\n]*feature2_item2:\s*"[^"]+",[\s\n]*feature2_item3:\s*")[^"]+("\,[\s\n]*feature2_item4:\s*")[^"]+(")/g,
        `$1Assistance médicale par IA personnalisée selon les profils médicaux familiaux et le contenu exact de votre trousse de secours. Saisie vocale/image avec triage ABC+D.$2✓ Profils médicaux familiaux$3✓ Inventaire exact de la trousse$4`
    );

    // 3. THAI
    content = content.replace(
        /(feature2_title:\s*"พยาบาลฉุกเฉิน AI",[\s\n]*feature2_desc:\s*")[^"]+("\,[\s\n]*feature2_item1:\s*"[^"]+",[\s\n]*feature2_item2:\s*"[^"]+",[\s\n]*feature2_item3:\s*")[^"]+("\,[\s\n]*feature2_item4:\s*")[^"]+(")/g,
        `$1คำแนะนำทางการแพทย์จาก AI ที่ปรับแต่งตามโปรไฟล์ทางการแพทย์ของครอบครัวและชุดปฐมพยาบาลของคุณโดยเฉพาะ พร้อมประเมินการคัดกรอง ABC+D$2✓ โปรไฟล์ทางการแพทย์ของครอบครัว$3✓ วิเคราะห์ตามชุดปฐมพยาบาลของคุณ$4`
    );

    // 4. SPANISH
    content = content.replace(
        /(feature2_title:\s*"IA Enfermera de Emergencia",[\s\n]*feature2_desc:\s*")[^"]+("\,[\s\n]*feature2_item1:\s*"[^"]+",[\s\n]*feature2_item2:\s*"[^"]+",[\s\n]*feature2_item3:\s*")[^"]+("\,[\s\n]*feature2_item4:\s*")[^"]+(")/g,
        `$1Guía médica de IA adaptada a los perfiles médicos de su familia y al inventario exacto de su botiquín de primeros auxilios. Entrada de voz/imagen con triaje ABC+D.$2✓ Perfiles médicos familiares$3✓ Inventario exacto del botiquín$4`
    );

    // 5. ITALIAN
    content = content.replace(
        /(feature2_title:\s*"Infermiere AI di Emergenza",[\s\n]*feature2_desc:\s*")[^"]+("\,[\s\n]*feature2_item1:\s*"[^"]+",[\s\n]*feature2_item2:\s*"[^"]+",[\s\n]*feature2_item3:\s*")[^"]+("\,[\s\n]*feature2_item4:\s*")[^"]+(")/g,
        `$1Guida medica IA personalizzata per i profili medici familiari e l'inventario esatto del tuo kit di pronto soccorso. Input vocale/immagine con triage ABC+D.$2✓ Profili medici familiari$3✓ Inventario esatto del kit$4`
    );

    // 6. FILIPINO
    // Need to handle Filipino which also has "AI Emergency Nurse" as title.
    // Differentiate by the original Filipino description or item1 which is "Voice at image support"
    content = content.replace(
        /(feature2_title:\s*"AI Emergency Nurse",[\s\n]*feature2_desc:\s*")[^"]+("\,[\s\n]*feature2_item1:\s*"✓ Voice at image support",[\s\n]*feature2_item2:\s*"[^"]+",[\s\n]*feature2_item3:\s*")[^"]+("\,[\s\n]*feature2_item4:\s*")[^"]+(")/g,
        `$1AI medikal na gabay na naka-customize para sa mga medikal na profile ng pamilya at sa iyong eksaktong first aid kit inventory. Voice/image input na may ABC+D triage.$2✓ Family medical profiles$3✓ Eksaktong kit inventory$4`
    );
    
    // Fallback for Thai block that has different keys or no checkmarks (like in translations-complete.js line 484)
    content = content.replace(
        /(feature2_title:\s*"พยาบาลฉุกเฉิน AI",[\s\n]*feature2_desc:\s*")[^"]+("\,[\s\n]*feature2_item1:\s*"รองรับเสียงและภาพ",[\s\n]*feature2_item2:\s*"โปรโตคอลคัดกรอง ABC-D",[\s\n]*feature2_item3:\s*")[^"]+("\,[\s\n]*feature2_item4:\s*")[^"]+(")/g,
        `$1คำแนะนำทางการแพทย์จาก AI ที่ปรับแต่งตามโปรไฟล์ทางการแพทย์ของครอบครัวและชุดปฐมพยาบาลของคุณโดยเฉพาะ พร้อมประเมินการคัดกรอง ABC+D$2โปรไฟล์ทางการแพทย์ของครอบครัว$3วิเคราะห์ตามชุดปฐมพยาบาลของคุณ$4`
    );

    fs.writeFileSync(path, content, 'utf8');
}

processTranslations('website/translations-complete.js');
processTranslations('website/translations.js');
console.log('Translations updated successfully');
