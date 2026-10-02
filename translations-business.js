// Page Partenaires (partner.html), réécrite le 02/10/2026 : le programme
// partenaire GoMarketMe (33 % de chaque abonnement apporté, renouvellements
// compris), sans « revenu passif ». L'anglais vit dans partner.html ; ce
// fichier ne porte que FR et TH, sous des clés ptnr_* neuves (même principe
// que translations-home.js). Thaï : à faire relire par la propriétaire.
// Chargé après translations-complete.js et avant i18n.js (defer garde l'ordre).
(function () {
    'use strict';
    const PARTNER = {
        fr: {
            ptnr_nav: "Partenaires",
            ptnr_badge: "🤝 Programme partenaire RESQ+",
            ptnr_title_1: "Partagez RESQ+ avec ceux qui comptent pour vous.",
            ptnr_title_2: "Recevez 33 % de chaque abonnement que vous apportez.",
            ptnr_desc: "Auberges, loueurs de scooters, écoles de plongée, guides, créateurs de contenu voyage, groupes d'expatriés : recommandez RESQ+ avec votre lien, votre QR code ou votre code partenaire. Quand quelqu'un s'abonne grâce à vous, vous recevez 33 % de ce qu'il paie, et à nouveau à chaque renouvellement.",
            ptnr_btn_join: "Devenir partenaire",
            ptnr_btn_how: "Comment ça marche",
            ptnr_steps_badge: "📋 Comment ça marche",
            ptnr_steps_title: "Trois étapes, inscription gratuite",
            ptnr_step1_title: "Inscrivez-vous",
            ptnr_step1_desc: "Remplissez le court formulaire. Nous ouvrons votre compte partenaire sur GoMarketMe, la plateforme qui suit et paie les partenaires.",
            ptnr_step2_title: "Partagez votre lien, QR code ou code",
            ptnr_step2_desc: "Votre lien ouvre RESQ+ sur Google Play. Votre QR code tient sur une affiche à votre comptoir. Votre code partenaire se saisit dans l'appli, dans les Réglages.",
            ptnr_step3_title: "Soyez payé chaque mois",
            ptnr_step3_desc: "Votre tableau de bord montre les installations et les abonnements. Un relevé est établi le 1er de chaque mois et payé via GoMarketMe.",
            ptnr_earn_badge: "💰 Ce que vous gagnez",
            ptnr_earn_title: "33 % du prix, à chaque paiement",
            ptnr_earn_desc: "Votre part est calculée sur le prix payé par l'abonné, avant la commission de Google. Exemples avec les prix thaïlandais :",
            ptnr_ex1_title: "Forfait Famille, annuel",
            ptnr_ex1_desc: "pour vous, sur un forfait à 1 590 ฿ (vous + 5 personnes), et à nouveau chaque année où il se renouvelle",
            ptnr_ex2_title: "Individuel, annuel",
            ptnr_ex2_desc: "pour vous, sur un forfait à 790 ฿, et à nouveau chaque année où il se renouvelle",
            ptnr_ex3_title: "Forfait Famille, mensuel",
            ptnr_ex3_desc: "pour vous, chaque mois où le forfait à 199 ฿ continue",
            ptnr_why_badge: "✅ Facile à recommander",
            ptnr_why_title: "Pourquoi les gens disent oui",
            ptnr_why1_title: "Gratuit pour commencer",
            ptnr_why1_desc: "Le SOS aux proches, la position en direct pour la famille, les fiches de premiers secours et les numéros d'urgence locaux sont gratuits. On essaie RESQ+ avant de payer quoi que ce soit.",
            ptnr_why2_title: "Un premier pas facile",
            ptnr_why2_desc: "Les nouveaux abonnés au forfait mensuel ont 7 jours gratuits, puis le premier mois à moitié prix.",
            ptnr_why3_title: "Pensé pour les familles et les voyageurs",
            ptnr_why3_desc: "Un forfait Famille couvre vous et 5 personnes : voir où chacun se trouve, recevoir les alertes d'arrivée et leurs SOS, où que vous soyez.",
            ptnr_rules_badge: "📌 Bon à savoir",
            ptnr_rules_title: "Des règles simples et justes",
            ptnr_rules_desc: "L'inscription est gratuite ; vous gagnez seulement quand une personne recommandée paie. RESQ+ est sur Android (Google Play) pour l'instant. Recommandez-le honnêtement : pas de spam, pas d'avis payés ou faux, et ne présentez jamais RESQ+ comme un remplacement des services d'urgence ni comme un dispositif médical.",
            ptnr_btn_question: "Une question ? Écrivez-nous sur WhatsApp",
            ptnr_footer_desc: "Application d'urgence, de premiers secours et de sécurité familiale\nSOS • Position en direct • Assistant premiers secours",
            ptnr_footer_copyright: "© 2026 Sornsawan Ltd. RESQ+ est un produit de Sornsawan Ltd.",
            ptnr_footer_disclaimer: "⚠️ RESQ+ n'est pas un dispositif médical et ne remplace pas les services d'urgence. En cas de danger de mort, appelez toujours votre numéro d'urgence local."
        },
        th: {
            ptnr_nav: "พาร์ทเนอร์",
            ptnr_badge: "🤝 โปรแกรมพาร์ทเนอร์ RESQ+",
            ptnr_title_1: "แชร์ RESQ+ ให้คนที่คุณห่วงใย",
            ptnr_title_2: "รับ 33% จากทุกการสมัครสมาชิกที่คุณแนะนำ",
            ptnr_desc: "โฮสเทล ร้านเช่ามอเตอร์ไซค์ โรงเรียนสอนดำน้ำ ไกด์ ครีเอเตอร์สายท่องเที่ยว กลุ่มชาวต่างชาติ: แนะนำ RESQ+ ด้วยลิงก์ QR code หรือโค้ดพาร์ทเนอร์ของคุณเอง เมื่อมีคนสมัครสมาชิกผ่านคุณ คุณจะได้รับ 33% ของยอดที่เขาจ่าย และได้อีกทุกครั้งที่ต่ออายุ",
            ptnr_btn_join: "สมัครเป็นพาร์ทเนอร์",
            ptnr_btn_how: "วิธีการทำงาน",
            ptnr_steps_badge: "📋 วิธีการทำงาน",
            ptnr_steps_title: "3 ขั้นตอน สมัครฟรี",
            ptnr_step1_title: "สมัคร",
            ptnr_step1_desc: "กรอกแบบฟอร์มสั้นๆ เราจะเปิดบัญชีพาร์ทเนอร์ให้คุณบน GoMarketMe แพลตฟอร์มที่ติดตามผลและจ่ายเงินให้พาร์ทเนอร์",
            ptnr_step2_title: "แชร์ลิงก์ QR code หรือโค้ดของคุณ",
            ptnr_step2_desc: "ลิงก์ของคุณจะเปิด RESQ+ บน Google Play QR code ติดเป็นโปสเตอร์ที่เคาน์เตอร์ได้ ส่วนโค้ดพาร์ทเนอร์พิมพ์ใส่ในแอปได้ที่หน้าการตั้งค่า",
            ptnr_step3_title: "รับเงินทุกเดือน",
            ptnr_step3_desc: "แดชบอร์ดของคุณแสดงจำนวนการติดตั้งและการสมัครสมาชิก สรุปยอดทุกวันที่ 1 ของเดือน และจ่ายผ่าน GoMarketMe",
            ptnr_earn_badge: "💰 รายได้ของคุณ",
            ptnr_earn_title: "33% ของราคา ทุกครั้งที่มีการชำระเงิน",
            ptnr_earn_desc: "ส่วนแบ่งของคุณคิดจากราคาที่สมาชิกจ่าย ก่อนหักส่วนของ Google ตัวอย่างตามราคาในประเทศไทย:",
            ptnr_ex1_title: "แบบครอบครัว รายปี",
            ptnr_ex1_desc: "สำหรับคุณ จากแพ็กเกจ 1,590 ฿ (คุณและอีก 5 คน) และได้อีกทุกปีที่ต่ออายุ",
            ptnr_ex2_title: "แบบรายบุคคล รายปี",
            ptnr_ex2_desc: "สำหรับคุณ จากแพ็กเกจ 790 ฿ และได้อีกทุกปีที่ต่ออายุ",
            ptnr_ex3_title: "แบบครอบครัว รายเดือน",
            ptnr_ex3_desc: "สำหรับคุณ ทุกเดือนที่แพ็กเกจ 199 ฿ ยังใช้งานอยู่",
            ptnr_why_badge: "✅ แนะนำได้ง่าย",
            ptnr_why_title: "ทำไมคนถึงตอบตกลง",
            ptnr_why1_title: "เริ่มใช้ได้ฟรี",
            ptnr_why1_desc: "ส่ง SOS ถึงคนใกล้ชิด แชร์ตำแหน่งแบบเรียลไทม์ให้ครอบครัว คู่มือปฐมพยาบาล และเบอร์ฉุกเฉินในพื้นที่ ใช้ได้ฟรี ลองใช้ RESQ+ ได้ก่อนจ่ายเงิน",
            ptnr_why2_title: "เริ่มต้นง่าย",
            ptnr_why2_desc: "สมาชิกใหม่แบบรายเดือน ใช้ฟรี 7 วัน แล้วเดือนแรกจ่ายครึ่งราคา",
            ptnr_why3_title: "ออกแบบมาเพื่อครอบครัวและนักเดินทาง",
            ptnr_why3_desc: "แพ็กเกจครอบครัวเดียวครอบคลุมคุณและอีก 5 คน ดูได้ว่าทุกคนอยู่ที่ไหน รับการแจ้งเตือนเมื่อถึงที่หมาย และรับ SOS ของพวกเขาได้ทุกที่",
            ptnr_rules_badge: "📌 ควรรู้",
            ptnr_rules_title: "กติกาง่ายและยุติธรรม",
            ptnr_rules_desc: "สมัครฟรี คุณจะได้รายได้เมื่อคนที่คุณแนะนำชำระเงินเท่านั้น ตอนนี้ RESQ+ มีบน Android (Google Play) โปรดแนะนำอย่างตรงไปตรงมา: ห้ามสแปม ห้ามรีวิวปลอมหรือรีวิวที่จ้างมา และห้ามบอกว่า RESQ+ ใช้แทนบริการฉุกเฉินหรือเป็นอุปกรณ์การแพทย์",
            ptnr_btn_question: "มีคำถาม? ทักเราทาง WhatsApp",
            ptnr_footer_desc: "แอปเหตุฉุกเฉิน ปฐมพยาบาล และความปลอดภัยของครอบครัว\nSOS • ตำแหน่งแบบเรียลไทม์ • ผู้ช่วยปฐมพยาบาล",
            ptnr_footer_copyright: "© 2026 Sornsawan Ltd. RESQ+ เป็นผลิตภัณฑ์ของ Sornsawan Ltd.",
            ptnr_footer_disclaimer: "⚠️ RESQ+ ไม่ใช่อุปกรณ์การแพทย์ และไม่ได้ทดแทนบริการฉุกเฉิน หากมีอันตรายถึงชีวิต ให้โทรเบอร์ฉุกเฉินในพื้นที่ทุกครั้ง"
        }
    };
    if (typeof i18nComplete === 'undefined') return;
    Object.keys(PARTNER).forEach(function (lang) {
        i18nComplete[lang] = Object.assign(i18nComplete[lang] || {}, PARTNER[lang]);
    });
})();
