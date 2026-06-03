// RESQ+ Multi-Language System - EN•FR•TH - COMPLETE VERSION
const I18N_SUPPORTED_LANGUAGES = ['en', 'fr', 'th', 'es', 'it', 'fil'];

function getInitialLanguage() {
    return 'en';
}

const i18n = {
    currentLang: getInitialLanguage(),
    
    // Merge complete translations from translations-complete.js AND translations.js
    t: (() => {
        const merged = i18nComplete || {};
        
        // Merge TRANSLATIONS sections if available
        if (typeof TRANSLATIONS !== 'undefined') {
            ['en', 'fr', 'th', 'es', 'it', 'fil'].forEach(lang => {
                if (merged[lang]) {
                    // Merge features
                    if (TRANSLATIONS.features && TRANSLATIONS.features[lang]) {
                        merged[lang].features = TRANSLATIONS.features[lang];
                    }
                    // Merge contact
                    if (TRANSLATIONS.contact && TRANSLATIONS.contact[lang]) {
                        merged[lang].contact = TRANSLATIONS.contact[lang];
                    }
                    // Merge homepage
                    if (TRANSLATIONS.homepage && TRANSLATIONS.homepage[lang]) {
                        merged[lang].homepage = TRANSLATIONS.homepage[lang];
                    }
                    // Merge countdown
                    if (TRANSLATIONS.countdown && TRANSLATIONS.countdown[lang]) {
                        merged[lang].countdown = TRANSLATIONS.countdown[lang];
                    }
                }
            });
        }
        
        return merged;
    })() || {
        en: {
            // Navigation
            nav: {features: "Features", screenshots: "Screenshots", notify: "Download", privacy: "Privacy", ambassador: "Ambassador"},
            
            // Hero
            hero_badge: "🚨 Professional Emergency Response",
            hero_partner_badge: "Want to own 33% of our revenue? Become a RESQ+ Partner →",
            hero_title: "AI Emergency Nurse + Team Coordination + SOS Tools",
            hero_subtitle: "The only emergency app you'll ever need",
            hero_desc: "Get instant AI emergency guidance, coordinate with your team in real-time, and access SOS tools, first aid support, and weather and utilities in one app.",
            hero_btn1: "🚀 Get RESQ+ Updates",
            hero_btn2: "📱 See Features",
            
            // Features
            features_badge: "🎯 Core Features",
            features_title: "Everything You Need in One App",
            features_desc: "Professional emergency response tools designed for real-life situations",
            
            // Use Cases
            usecase_badge: "🌟 Real Scenarios",
            usecase_title: "RESQ+ in Action",
            usecase_desc: "See how RESQ+ makes a difference in real emergencies",
            
            // Share Story
            share_badge: "📸 Community Stories",
            share_title: "RESQ+ Saved My Life",
            share_desc: "Share your emergency story and inspire others. Get featured and gain visibility!",
            share_heading: "Your Story Could Be Here!",
            share_text: "Share how RESQ+ helped you in an emergency. Your story will inspire others and help save lives.",
            share_button: "📸 Share My Emergency Story",
            share_benefits: "✓ Get Featured ✓ Inspire Others ✓ Gain Social Media Visibility",
            
            // Available Now
            coming_badge: "🚀 NOW AVAILABLE",
            coming_title: "Available Now on Google Play",
            coming_desc: "Download RESQ+ today and be prepared for any emergency",
            coming_heading: "30-Day Improvement Period - Your Feedback Matters!",
            coming_text: "RESQ+ is officially available on Google Play! Download today to transform your smartphone into a complete emergency response system. Protect yourself and your family by starting your 7-day free trial.",
            coming_form_title: "Download on Google Play",
            coming_form_desc: "Get RESQ+ now and start protecting yourself and your loved ones",
            coming_button: "Download",
            coming_button_label: "GET IT ON",
            coming_features: "✓ 7-Day Free Trial ✓ No ads ✓ Local emergency profiles ✓ Connected alerts & AI",
            
            // Newsletter
            newsletter_subscribe: "Subscribe",
            newsletter_privacy: "🔒 We respect your privacy. Unsubscribe at any time.",
            
            // Screenshot Captions
            screenshot1_caption: "Home Screen",
            screenshot2_caption: "Emergency Control Center",
            screenshot3_caption: "AI Emergency Nurse",
            screenshot4_caption: "Team Connect",
            screenshot5_caption: "Medical Profile",
            screenshot6_caption: "Emergency Settings",
            screenshot7_caption: "SOS and emergency tools",
            screenshot8_caption: "Available Now",
            
            // Partner Program
            partner_hero_badge: "🌟 Official Partner Program",
            partner_hero_title_1: "Don't just share an app.",
            partner_hero_title_2: "Protect your circle and own 33% of the revenue.",
            partner_hero_desc: "We are looking for selected local leaders, creators, and visionaries to deploy the ultimate safety infrastructure in Thailand. High payouts, lifetime tracking, and a mission that actually saves lives.",
            partner_btn_apply: "Secure Your Partner Spot →",
            partner_btn_benefits: "See Benefits",
            
            partner_concept_badge: "💡 The Financial Disruptor",
            partner_concept_title: "A Strict 50/50 Philosophy",
            partner_concept_desc: "Most programs give you crumbs. RESQ+ is built on a strict 50/50 net profit-sharing philosophy. After app store fees and local taxes are cleared, we split the money right down the middle. That means an absolute, clean <strong>33% of every single subscription</strong> goes straight to your wallet. Forever.",
            
            partner_benefits_badge: "🎁 Benefits",
            partner_benefits_title: "Why Partner With Us?",
            partner_benefit1_title: "Uncapped Lifetime Earnings",
            partner_benefit1_desc: "As long as your referrals stay protected by RESQ+, your bank account keeps growing. No limits, no ceiling.",
            partner_benefit2_title: "The GoMarketMe Command Center",
            partner_benefit2_desc: "Gain access to a private, high-tech dashboard. Track clicks, monitor active subscriptions, and view your automated payouts in real-time with total transparency.",
            partner_benefit3_title: "An Irresistible Product",
            partner_benefit3_desc: "You aren't selling a useless gadget. You are introducing a cutting-edge emergency and safety infrastructure. When people see it work, they subscribe.",
            
            partner_steps_badge: "📋 The Process",
            partner_steps_title: "Start Earning in 3 Steps",
            partner_step1_title: "The Verification (2 Mins)",
            partner_step1_desc: "Submit your legal application. We comply strictly with Thai PDPA regulations to secure your partner account.",
            partner_step2_title: "The Onboarding",
            partner_step2_desc: "Once approved, unlock your custom deployment links and access our private ambassador resource vault.",
            partner_step3_title: "Automated Scaling",
            partner_step3_desc: "Share, protect, and watch GoMarketMe handle your payouts automatically.",
            
            // FAQ
            faq_badge: "❓ FAQ",
            faq_title: "Frequently Asked Questions",
            faq_desc: "Everything you need to know about RESQ+",
            
            // Exit Intent Popup
            exit_title: "Wait! Don't Miss Out!",
            exit_desc: "Get updates about RESQ+ improvements and be among the first to hear about important features.",
            exit_placeholder: "your@email.com",
            exit_button: "🚀 Get Updates",
            exit_footer: "No Spam • Unsubscribe Anytime"
        },
        fr: {
            // Navigation
            nav: {features: "Fonctionnalités", screenshots: "Captures d'écran", notify: "Être Notifié", privacy: "Confidentialité", ambassador: "Ambassadeur"},
            
            // Hero
            hero_badge: "🚨 Réponse d'Urgence Professionnelle",
            hero_partner_badge: "Envie de posséder 33% de nos revenus ? Devenez Partenaire RESQ+ →",
            hero_title: "IA Infirmière d'Urgence + Coordination d'Équipe + Outils SOS",
            hero_subtitle: "La seule application d'urgence dont vous aurez besoin",
            hero_desc: "Obtenez des conseils d'urgence par IA, coordonnez votre équipe en temps réel, et accédez aux outils SOS, aux premiers secours et aux utilitaires météo et marins dans une seule application.",
            hero_btn1: "🚀 Recevoir les mises à jour RESQ+",
            hero_btn2: "📱 Voir les Fonctionnalités",
            
            // Features
            features_badge: "🎯 Fonctionnalités Principales",
            features_title: "Tout Ce Dont Vous Avez Besoin en Une App",
            features_desc: "Outils professionnels de réponse d'urgence conçus pour des situations réelles",
            
            // Use Cases
            usecase_badge: "🌟 Scénarios Réels",
            usecase_title: "RESQ+ en Action",
            usecase_desc: "Voyez comment RESQ+ fait la différence dans les vraies urgences",
            
            // Share Story
            share_badge: "📸 Histoires Communautaires",
            share_title: "RESQ+ M'a Sauvé la Vie",
            share_desc: "Partagez votre histoire d'urgence et inspirez les autres. Soyez mis en avant et gagnez en visibilité!",
            share_heading: "Votre Histoire Pourrait Être Ici!",
            share_text: "Partagez comment RESQ+ vous a aidé lors d'une urgence. Votre histoire inspirera les autres et aidera à sauver des vies.",
            share_button: "📸 Partager Mon Histoire d'Urgence",
            share_benefits: "✓ Être Mis en Avant ✓ Inspirer les Autres ✓ Gagner en Visibilité sur les Réseaux Sociaux",
            
            // Available Now
            coming_badge: "🚀 MAINTENANT DISPONIBLE",
            coming_title: "Disponible Maintenant sur Google Play",
            coming_desc: "Téléchargez RESQ+ dès aujourd'hui et soyez prêt pour toute urgence",
            coming_heading: "Période d'Amélioration de 30 Jours - Votre Avis Compte !",
            coming_text: "RESQ+ est maintenant disponible sur Google Play ! Nous sommes dans une période d'amélioration de 30 jours, affinant activement les fonctionnalités en fonction de vos commentaires. Téléchargez maintenant et aidez-nous à faire de RESQ+ la meilleure application de réponse d'urgence possible.",
            coming_form_title: "Télécharger sur Google Play",
            coming_form_desc: "Obtenez RESQ+ maintenant et commencez à protéger vous et vos proches",
            coming_button: "Télécharger",
            coming_button_label: "OBTENIR SUR",
            coming_features: "✓ Essai gratuit de 7 jours ✓ Sans publicités ✓ Profils d'urgence locaux ✓ Alertes et IA connectées",
            
            // Newsletter
            newsletter_subscribe: "S'abonner",
            newsletter_privacy: "🔒 Nous respectons votre vie privée. Désabonnez-vous à tout moment.",
            
            // Screenshot Captions
            screenshot1_caption: "Écran d'Accueil",
            screenshot2_caption: "Centre de Contrôle d'Urgence",
            screenshot3_caption: "Infirmière d'Urgence IA",
            screenshot4_caption: "Connexion d'Équipe",
            screenshot5_caption: "Profil Médical",
            screenshot6_caption: "Paramètres d'Urgence",
            screenshot7_caption: "SOS et outils d'urgence",
            screenshot8_caption: "Disponible Maintenant",
            
            // FAQ
            faq_badge: "❓ FAQ",
            faq_title: "Questions Fréquemment Posées",
            faq_desc: "Tout ce que vous devez savoir sur RESQ+",
            
            // Exit Intent Popup
            exit_title: "Attendez! Ne Ratez Pas Ça!",
            exit_desc: "Recevez des nouvelles sur les améliorations de RESQ+ et soyez parmi les premiers informés des fonctionnalités importantes.",
            exit_placeholder: "votre@email.com",
            exit_button: "🚀 Recevoir les mises à jour",
            exit_footer: "100% Gratuit • Sans Spam • Désabonnement à Tout Moment"
        },
        th: {
            // Navigation
            nav: {features: "คุณสมบัติ", screenshots: "ภาพหน้าจอ", notify: "รับการแจ้งเตือน", privacy: "ความเป็นส่วนตัว", ambassador: "แอมบาสเดอร์"},
            
            // Hero
            hero_badge: "🚨 การตอบสนองฉุกเฉินระดับมืออาชีพ",
            hero_partner_badge: "ต้องการรับรายได้ 33% ของเราหรือไม่? ร่วมเป็นพาร์ทเนอร์ RESQ+ →",
            hero_title: "AI Emergency Nurse + การประสานงานทีม + เครื่องมือ SOS",
            hero_subtitle: "แอปฉุกเฉินเดียวที่คุณต้องการ",
            hero_desc: "รับคำแนะนำฉุกเฉินจาก AI ประสานงานกับทีมแบบเรียลไทม์ และเข้าถึงเครื่องมือ SOS การปฐมพยาบาล รวมถึงเครื่องมืออากาศและทางทะเลในแอปเดียว",
            hero_btn1: "🚀 รับข่าวสาร RESQ+",
            hero_btn2: "📱 ดูคุณสมบัติ",
            
            // Features
            features_badge: "🎯 คุณสมบัติหลัก",
            features_title: "ทุกสิ่งที่คุณต้องการในแอปเดียว",
            features_desc: "เครื่องมือตอบสนองฉุกเฉินระดับมืออาชีพที่ออกแบบสำหรับสถานการณ์จริง",
            
            // Use Cases
            usecase_badge: "🌟 สถานการณ์จริง",
            usecase_title: "RESQ+ ในการปฏิบัติการ",
            usecase_desc: "ดูว่า RESQ+ สร้างความแตกต่างในเหตุฉุกเฉินจริงอย่างไร",
            
            // Share Story
            share_badge: "📸 เรื่องราวจากชุมชน",
            share_title: "RESQ+ ช่วยชีวิตฉันไว้",
            share_desc: "แบ่งปันเรื่องราวฉุกเฉินของคุณและสร้างแรงบันดาลใจให้ผู้อื่น ได้รับการแนะนำและเพิ่มการมองเห็น!",
            share_heading: "เรื่องราวของคุณอาจอยู่ที่นี่!",
            share_text: "แบ่งปันว่า RESQ+ ช่วยคุณในเหตุฉุกเฉินอย่างไร เรื่องราวของคุณจะสร้างแรงบันดาลใจให้ผู้อื่นและช่วยชีวิต",
            share_button: "📸 แบ่งปันเรื่องราวฉุกเฉินของฉัน",
            share_benefits: "✓ ได้รับการแนะนำ ✓ สร้างแรงบันดาลใจให้ผู้อื่น ✓ เพิ่มการมองเห็นบนโซเชียลมีเดีย",
            
            // Available Now
            coming_badge: "🚀 พร้อมใช้งานแล้ว",
            coming_title: "พร้อมใช้งานบน Google Play",
            coming_desc: "ดาวน์โหลด RESQ+ วันนี้และเตรียมพร้อมสำหรับเหตุฉุกเฉินใดๆ",
            coming_heading: "ช่วงปรับปรุง 30 วัน - ความคิดเห็นของคุณมีความสำคัญ!",
            coming_text: "RESQ+ พร้อมใช้งานบน Google Play แล้ว! เราอยู่ในช่วงปรับปรุง 30 วัน กำลังปรับแต่งฟีเจอร์อย่างต่อเนื่องตามความคิดเห็นของคุณ ดาวน์โหลดตอนนี้และช่วยเราทำให้ RESQ+ เป็นแอปตอบสนองฉุกเฉินที่ดีที่สุด",
            coming_form_title: "ดาวน์โหลดบน Google Play",
            coming_form_desc: "รับ RESQ+ ตอนนี้และเริ่มปกป้องตัวคุณและคนที่คุณรัก",
            coming_button: "ดาวน์โหลด",
            coming_button_label: "ดาวน์โหลดจาก",
            coming_features: "✓ ทดลองใช้ฟรี 7 วัน ✓ ไม่มีโฆษณา ✓ โปรไฟล์ฉุกเฉินในเครื่อง ✓ การแจ้งเตือนและ AI แบบเชื่อมต่อ",
            
            // Newsletter
            newsletter_subscribe: "สมัครรับข่าวสาร",
            newsletter_privacy: "🔒 เรายึดถือความเป็นส่วนตัวของคุณ ยกเลิกการสมัครได้ตลอดเวลา",
            
            // Screenshot Captions
            screenshot1_caption: "หน้าจอหลัก",
            screenshot2_caption: "ศูนย์ควบคุมฉุกเฉิน",
            screenshot3_caption: "พยาบาลฉุกเฉิน AI",
            screenshot4_caption: "เชื่อมต่อทีม",
            screenshot5_caption: "โปรไฟล์ทางการแพทย์",
            screenshot6_caption: "การตั้งค่าฉุกเฉิน",
            screenshot7_caption: "SOS และเครื่องมือฉุกเฉิน",
            screenshot8_caption: "พร้อมใช้งานแล้ว",
            
            // FAQ
            faq_badge: "❓ คำถามที่พบบ่อย",
            faq_title: "คำถามที่พบบ่อย",
            faq_desc: "ทุกสิ่งที่คุณต้องรู้เกี่ยวกับ RESQ+",
            
            // Exit Intent Popup
            exit_title: "รอก่อน! อย่าพลาด!",
            exit_desc: "รับข่าวเกี่ยวกับการปรับปรุงของ RESQ+ และเป็นกลุ่มแรกที่ทราบฟีเจอร์สำคัญ",
            exit_placeholder: "อีเมลของคุณ@email.com",
            exit_button: "🚀 รับอัปเดต",
            exit_footer: "ไม่มีสแปม • ยกเลิกได้ตลอดเวลา"
        }
    },
    
    setLanguage(lang) {
        this.switchLang(lang);
    },

    switchLang(lang) {
        const nextLang = I18N_SUPPORTED_LANGUAGES.includes(lang) ? lang : 'en';
        this.currentLang = nextLang;
        localStorage.setItem('resq_lang', nextLang);
        localStorage.setItem('selectedLanguage', nextLang);
        this.updatePage();
        this.updateExitPopup();
        
        // Update active state and aria-pressed on language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        // Add active class and aria-pressed to selected language button
        const selectedBtn = document.querySelector(`.lang-btn[onclick*="'${nextLang}'"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
            selectedBtn.setAttribute('aria-pressed', 'true');
        }
    },
    
    updateExitPopup() {
        const lang = this.t[this.currentLang];
        const popup = document.querySelector('.exit-intent-popup');
        if (!popup) return;
        
        // Update exit popup text
        const exitTitle = popup.querySelector('[data-i18n-exit="title"]');
        if (exitTitle) exitTitle.textContent = lang.exit_title;
        
        const exitDesc = popup.querySelector('[data-i18n-exit="desc"]');
        if (exitDesc) exitDesc.textContent = lang.exit_desc;
        
        const exitInput = popup.querySelector('[data-i18n-exit-placeholder="placeholder"]');
        if (exitInput) exitInput.placeholder = lang.exit_placeholder;
        
        const exitButton = popup.querySelector('[data-i18n-exit="button"]');
        if (exitButton) exitButton.textContent = lang.exit_button;
        
        const exitFooter = popup.querySelector('[data-i18n-exit="footer"]');
        if (exitFooter) exitFooter.textContent = lang.exit_footer;
    },
    
    updatePage() {
        if (!this.t[this.currentLang]) {
            this.currentLang = 'en';
            localStorage.setItem('resq_lang', 'en');
            localStorage.setItem('selectedLanguage', 'en');
        }

        const lang = this.t[this.currentLang];
        if (!lang) return;
        
        // ✅ Update HTML lang attribute for SEO
        const htmlRoot = document.getElementById('html-root') || document.documentElement;
        if (htmlRoot) {
            htmlRoot.setAttribute('lang', this.currentLang);
        }
        
        // ✅ UNIVERSAL AUTO-TRANSLATE: All elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            
            // Support nested keys like "features.feature1_title"
            let translation = lang;
            const keys = key.split('.');
            for (const k of keys) {
                if (translation && translation[k]) {
                    translation = translation[k];
                } else {
                    translation = null;
                    break;
                }
            }
            
            if (translation) {
                el.innerHTML = translation;
            } else if (lang[key]) {
                // Fallback for direct keys
                el.innerHTML = lang[key];
            }
        });
        
        console.log(`✅ Language switched to: ${this.currentLang.toUpperCase()} - ${document.querySelectorAll('[data-i18n]').length} elements translated`);
    }
};

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => {
    i18n.updatePage();
    
    // Set initial active button
    const activeBtn = document.querySelector(`.lang-btn[onclick*="${i18n.currentLang}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    console.log('🌍 Multi-language system ready! Current: ' + i18n.currentLang.toUpperCase());
});
