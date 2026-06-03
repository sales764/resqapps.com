const fs = require('fs');

const fileList = ['index.html', 'translations.js', 'translations-complete.js', 'i18n.js'];

fileList.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Remove Chinese from Schema / index.html
    content = content.replace(/"Chinese"/g, '');
    content = content.replace(/"zh"/g, '');
    content = content.replace(/7 Languages/g, '6 Languages');
    content = content.replace(/<div class="stat-number">7<\/div>/g, '<div class="stat-number">6</div>');
    content = content.replace(/EN • FR • TH • ES • IT • FIL • ZH/g, 'EN • FR • TH • ES • IT • FIL');
    
    // Schema pricing update
    content = content.replace(/"offers":\s*\{\s*"@type":\s*"Offer",\s*"price":\s*"0",\s*"priceCurrency":\s*"USD"\s*\}/g, '"offers": { "@type": "Offer", "price": "Subscription", "priceCurrency": "USD" }');

    // index.html specific replacements
    content = content.replace(/<div class="stat-number">FREE<\/div>/g, '<div class="stat-number">7 Days</div>');
    
    // English replacements
    content = content.replace(/stat_free:\s*"FREE"/g, 'stat_free: "7 DAYS"');
    content = content.replace(/stat_forever:\s*"Current release"/g, 'stat_forever: "Free Trial"');
    content = content.replace(/stats4_label:\s*"Currently Free"/g, 'stats4_label: "7-Day Free Trial"');
    content = content.replace(/stats4_sublabel:\s*"no subscription required today"/g, 'stats4_sublabel: "Monthly or annual plan"');
    content = content.replace(/download_feature1:\s*"Currently Free"/g, 'download_feature1: "7-Day Free Trial"');
    content = content.replace(/download_feature3:\s*"7 App Languages \(EN\/FR\/TH\/ES\/IT\/FIL\/ZH\)"/g, 'download_feature3: "6 App Languages (EN/FR/TH/ES/IT/FIL)"');
    content = content.replace(/coming_feature1:\s*"Currently Free"/g, 'coming_feature1: "7-Day Free Trial"');
    content = content.replace(/exit_footer:\s*"100% Free • No Spam • Unsubscribe Anytime"/g, 'exit_footer: "No Spam • Unsubscribe Anytime"');
    content = content.replace(/faq1_q:\s*"Is RESQ\+ really free\?"/g, 'faq1_q: "How much does RESQ+ cost?"');
    content = content.replace(/faq1_a:\s*"RESQ\+ is currently available on Google Play without a subscription or in-app purchase for its current feature set\."/g, 'faq1_a: "RESQ+ offers a 7-day free trial. After the trial, you can choose between a monthly subscription or an annual subscription (which gives you 2 months free)."');
    content = content.replace(/and marine data require an internet connection/g, 'and weather data require an internet connection');
    content = content.replace(/weather, marine, and utility tools/g, 'weather and utility tools');
    content = content.replace(/marine forecast and navigation tools, /g, '');
    content = content.replace(/Filipino, and Chinese\./g, 'and Filipino.');
    content = content.replace(/used Rush Map to find/g, 'used the Global Emergency Directory to find');
    content = content.replace(/Free, no subscriptions, no ads\./g, 'Start your 7-day free trial, then choose a monthly or annual subscription (save 2 months with annual).');
    
    // French replacements
    content = content.replace(/stat_free:\s*"GRATUIT"/g, 'stat_free: "7 JOURS"');
    content = content.replace(/stat_forever:\s*"Version actuelle"/g, 'stat_forever: "Essai gratuit"');
    content = content.replace(/stats4_label:\s*"Actuellement Gratuit"/g, 'stats4_label: "Essai de 7 jours"');
    content = content.replace(/stats4_sublabel:\s*"aucun abonnement requis aujourd'hui"/g, 'stats4_sublabel: "Forfait mensuel ou annuel"');
    content = content.replace(/download_feature1:\s*"Actuellement Gratuit"/g, 'download_feature1: "Essai gratuit de 7 jours"');
    content = content.replace(/download_feature3:\s*"7 Langues \(EN\/FR\/TH\/ES\/IT\/FIL\/ZH\)"/g, 'download_feature3: "6 Langues (EN/FR/TH/ES/IT/FIL)"');
    content = content.replace(/coming_feature1:\s*"Actuellement Gratuit"/g, 'coming_feature1: "Essai gratuit de 7 jours"');
    content = content.replace(/exit_footer:\s*"100% Gratuit • Pas de Spam • Désabonnement à tout moment"/g, 'exit_footer: "Pas de Spam • Désabonnement à tout moment"');
    content = content.replace(/faq1_q:\s*"RESQ\+ est-il vraiment gratuit \?"/g, 'faq1_q: "Combien coûte RESQ+ ?"');
    content = content.replace(/faq1_a:\s*"RESQ\+ est actuellement disponible sur Google Play sans abonnement ni achat intégré pour ses fonctionnalités actuelles\."/g, 'faq1_a: "RESQ+ propose un essai gratuit de 7 jours. Ensuite, vous pouvez choisir un abonnement mensuel ou annuel (économie de 2 mois)."');
    content = content.replace(/et marins nécessitent une connexion internet/g, 'nécessitent une connexion internet');
    content = content.replace(/filipino et chinois\./g, 'et filipino.');
    content = content.replace(/utilisé Carte Express pour trouver/g, 'utilisé l\'Annuaire d\'Urgence Global pour trouver');
    content = content.replace(/Gratuit, sans abonnement, sans publicité\./g, 'Démarrez votre essai gratuit de 7 jours, puis choisissez un abonnement mensuel ou annuel (économisez 2 mois avec l\'annuel).');

    // Thai replacements
    content = content.replace(/stat_free:\s*"ฟรี"/g, 'stat_free: "7 วัน"');
    content = content.replace(/stat_forever:\s*"เวอร์ชันปัจจุบัน"/g, 'stat_forever: "ทดลองใช้ฟรี"');
    content = content.replace(/stats4_label:\s*"ใช้งานฟรีปัจจุบัน"/g, 'stats4_label: "ทดลองใช้ฟรี 7 วัน"');
    content = content.replace(/stats4_sublabel:\s*"ไม่จำเป็นต้องสมัครสมาชิกวันนี้"/g, 'stats4_sublabel: "รายเดือนหรือรายปี"');
    content = content.replace(/download_feature1:\s*"ใช้งานฟรีปัจจุบัน"/g, 'download_feature1: "ทดลองใช้ฟรี 7 วัน"');
    content = content.replace(/download_feature3:\s*"7 ภาษา \(EN\/FR\/TH\/ES\/IT\/FIL\/ZH\)"/g, 'download_feature3: "6 ภาษา (EN/FR/TH/ES/IT/FIL)"');
    content = content.replace(/coming_feature1:\s*"ใช้งานฟรีปัจจุบัน"/g, 'coming_feature1: "ทดลองใช้ฟรี 7 วัน"');
    content = content.replace(/exit_footer:\s*"ฟรี 100% • ไม่มีสแปม • ยกเลิกได้ตลอดเวลา"/g, 'exit_footer: "ไม่มีสแปม • ยกเลิกได้ตลอดเวลา"');
    content = content.replace(/faq1_q:\s*"RESQ\+ ฟรีจริงๆ หรือ\?"/g, 'faq1_q: "RESQ+ ราคาเท่าไหร่?"');
    content = content.replace(/faq1_a:\s*"ขณะนี้ RESQ\+ เปิดให้ใช้งานบน Google Play โดยไม่ต้องสมัครสมาชิกหรือซื้อภายในแอปสำหรับฟีเจอร์ปัจจุบัน"/g, 'faq1_a: "RESQ+ ให้ทดลองใช้ฟรี 7 วัน หลังจากนั้น คุณสามารถเลือกสมัครสมาชิกรายเดือนหรือรายปี (ประหยัด 2 เดือนเมื่อสมัครรายปี)"');
    content = content.replace(/และข้อมูลทางทะเลจำเป็นต้องใช้การเชื่อมต่ออินเทอร์เน็ต/g, 'และข้อมูลสภาพอากาศจำเป็นต้องใช้การเชื่อมต่ออินเทอร์เน็ต');
    content = content.replace(/ฟิลิปปินส์ และจีน/g, 'และฟิลิปปินส์');
    content = content.replace(/ใช้ Rush Map เพื่อค้นหา/g, 'ใช้ไดเรกทอรีฉุกเฉินทั่วโลกเพื่อค้นหา');
    content = content.replace(/ฟรี ไม่มีค่าสมัคร ไม่มีโฆษณา/g, 'เริ่มทดลองใช้ฟรี 7 วัน จากนั้นเลือกการสมัครสมาชิกรายเดือนหรือรายปี (ประหยัด 2 เดือนเมื่อสมัครรายปี)');

    fs.writeFileSync(file, content);
});

console.log('Successfully updated pricing model and cleaned up marine/Chinese references.');
