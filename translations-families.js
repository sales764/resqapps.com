// Page Familles (families.html), écrite le 28/10/2026 pour l'étape 1.1 du plan de
// monétisation : les étrangers qui vivent ou voyagent en Thaïlande, et leur famille
// restée au pays. L'anglais vit dans families.html ; ce fichier ne porte que FR et TH,
// sous des clés fam_* neuves (même principe que translations-home.js). Le reste de la
// page reprend des clés déjà traduites (h2_cmp_prem_*, h2_price_*, h2_dl_*, ptnr_footer_*).
// Thaï : À VALIDER par Aksornsawan (docs/THAI_A_VALIDER_SITE_1_1.md) avant publication.
// Chargé après translations-business.js et avant i18n.js (defer garde l'ordre).
(function () {
    'use strict';
    const FAMILIES = {
        fr: {
            fam_badge: "🌏 Pour les expatriés, les voyageurs et leur famille",
            fam_title_1: "Vous vivez ou voyagez en Thaïlande ?",
            fam_title_2: "Un seul SOS prévient votre famille, où qu'elle vive.",
            fam_desc: "RESQ+ est une application d'urgence conçue en Thaïlande. Un seul appui prévient en même temps vos contacts d'urgence et votre cercle familial, avec votre position et une page en direct qu'ils ouvrent dans n'importe quel navigateur, sans rien installer.",
            fam_btn_pay: "Qui peut payer pour la famille",
            fam_sos_badge: "🆘 Gratuit, pour tous",
            fam_sos_title: "Quand vous appuyez sur SOS",
            fam_sos1_title: "Tout le monde est prévenu en même temps",
            fam_sos1_desc: "Vos contacts d'urgence reçoivent un SMS et un e-mail avec votre position (sur iPhone, vous appuyez sur Envoyer dans Messages). Votre cercle familial reçoit une notification dans l'app.",
            fam_sos2_title: "Ils vous suivent en direct",
            fam_sos2_desc: "L'alerte ouvre une page en direct avec votre position et la vidéo que filme votre SOS. Elle marche dans n'importe quel navigateur, sans rien installer.",
            fam_sos3_title: "De l'aide près de vous",
            fam_sos3_desc: "Les numéros d'urgence thaïs sont prêts à composer, avec les coordonnées des ambassades. Chacun utilise RESQ+ en anglais, en français ou en thaï.",
            fam_sos4_title: "Même si vous ne pouvez pas appuyer",
            fam_sos4_desc: "Indiquez l'heure à laquelle vous pensez arriver. Si vous ne confirmez pas que tout va bien, RESQ+ lance un compte à rebours, puis envoie un SOS silencieux à votre famille.",
            fam_num_ambulance: "Ambulance",
            fam_num_police: "Police",
            fam_num_tourist: "Police touristique",
            fam_num_fire: "Pompiers",
            fam_plan_badge: "⭐ Premium Famille",
            fam_plan_title: "Pour veiller les uns sur les autres, chaque jour",
            fam_plan_desc: "Le SOS reste gratuit pour tous. Premium Famille ajoute, pour 6 personnes au plus :",
            fam_pay_title: "Un proche resté au pays peut payer",
            fam_pay_1: "Vous installez RESQ+ gratuitement et vous créez votre cercle familial.",
            fam_pay_2: "Vous invitez vos enfants, votre conjoint ou vos parents, où qu'ils vivent. Ils installent RESQ+ et rejoignent votre cercle.",
            fam_pay_3: "L'un d'eux s'abonne à Premium Famille sur son propre téléphone, dans Google Play ou l'App Store. Premium couvre alors jusqu'à 6 personnes du cercle, l'abonné compris.",
            fam_pay_note: "N'importe quel membre du cercle peut être celui qui paie. Le SOS reste gratuit pour tous."
        },
        th: {
            fam_badge: "🌏 สำหรับชาวต่างชาติที่อาศัยหรือเที่ยวในไทย และครอบครัวของพวกเขา",
            fam_title_1: "อาศัยอยู่หรือเที่ยวในประเทศไทย?",
            fam_title_2: "กด SOS ครั้งเดียว ครอบครัวได้รับแจ้งไม่ว่าจะอยู่ที่ไหน",
            fam_desc: "RESQ+ คือแอปเหตุฉุกเฉินที่สร้างในประเทศไทย กดครั้งเดียวก็แจ้งผู้ติดต่อฉุกเฉินและสมาชิกในวงครอบครัวพร้อมกัน พร้อมตำแหน่งของคุณ และหน้าติดตามสดที่เปิดได้ในเบราว์เซอร์ใดก็ได้ โดยไม่ต้องติดตั้งอะไร",
            fam_btn_pay: "ใครจ่ายค่าแพ็กเกจครอบครัวได้บ้าง",
            fam_sos_badge: "🆘 ฟรี สำหรับทุกคน",
            fam_sos_title: "เมื่อคุณกด SOS",
            fam_sos1_title: "ทุกคนได้รับแจ้งพร้อมกัน",
            fam_sos1_desc: "ผู้ติดต่อฉุกเฉินของคุณได้รับ SMS และอีเมลพร้อมตำแหน่งของคุณ (บน iPhone คุณกดส่งในแอปข้อความเอง) สมาชิกในวงครอบครัวได้รับการแจ้งเตือนในแอป",
            fam_sos2_title: "ติดตามคุณได้แบบสด",
            fam_sos2_desc: "การแจ้งเตือนจะเปิดหน้าติดตามสดที่แสดงตำแหน่งของคุณ และวิดีโอที่ SOS บันทึกไว้ เปิดได้ในเบราว์เซอร์ใดก็ได้ โดยไม่ต้องติดตั้งอะไร",
            fam_sos3_title: "ความช่วยเหลือใกล้ตัวคุณ",
            fam_sos3_desc: "เบอร์ฉุกเฉินของไทยพร้อมให้โทรได้ทันที พร้อมข้อมูลติดต่อสถานทูต ทุกคนใช้ RESQ+ ได้เป็นภาษาอังกฤษ ฝรั่งเศส หรือไทย",
            fam_sos4_title: "แม้คุณจะกดไม่ได้",
            fam_sos4_desc: "ตั้งเวลาที่คุณคาดว่าจะถึง หากคุณไม่ยืนยันว่าปลอดภัย RESQ+ จะนับถอยหลัง แล้วส่ง SOS แบบเงียบถึงครอบครัวของคุณ",
            fam_num_ambulance: "การแพทย์ฉุกเฉิน",
            fam_num_police: "ตำรวจ",
            fam_num_tourist: "ตำรวจท่องเที่ยว",
            fam_num_fire: "ดับเพลิง",
            fam_plan_badge: "⭐ Premium ครอบครัว",
            fam_plan_title: "ดูแลกันและกันได้ทุกวัน",
            fam_plan_desc: "SOS ยังฟรีสำหรับทุกคน Premium ครอบครัวเพิ่มสิ่งเหล่านี้ให้สูงสุด 6 คน:",
            fam_pay_title: "คนในครอบครัวที่อยู่ต่างประเทศจ่ายแทนได้",
            fam_pay_1: "คุณติดตั้ง RESQ+ ฟรี แล้วสร้างวงครอบครัวของคุณ",
            fam_pay_2: "คุณเชิญลูก คู่ชีวิต หรือพ่อแม่ ไม่ว่าจะอยู่ที่ไหน พวกเขาติดตั้ง RESQ+ แล้วเข้าร่วมวงของคุณ",
            fam_pay_3: "หนึ่งในนั้นสมัคร Premium ครอบครัวบนโทรศัพท์ของตัวเอง ผ่าน Google Play หรือ App Store แล้ว Premium จะครอบคลุมสมาชิกในวงได้สูงสุด 6 คน รวมผู้สมัครด้วย",
            fam_pay_note: "สมาชิกคนไหนในวงก็เป็นคนจ่ายได้ SOS ยังฟรีสำหรับทุกคน"
        }
    };
    if (typeof i18nComplete === 'undefined') return;
    Object.keys(FAMILIES).forEach(function (lang) {
        i18nComplete[lang] = Object.assign(i18nComplete[lang] || {}, FAMILIES[lang]);
    });
})();
