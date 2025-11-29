// RESQ+ Multi-Language System - EN•FR•TH•ZH - COMPLETE VERSION
const i18n = {
    currentLang: localStorage.getItem('resq_lang') || 'en',
    
    // Merge complete translations from translations-complete.js AND translations.js
    t: (() => {
        const merged = i18nComplete || {};
        
        // Merge TRANSLATIONS sections if available
        if (typeof TRANSLATIONS !== 'undefined') {
            ['en', 'fr', 'th', 'zh'].forEach(lang => {
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
            nav: {features: "Features", screenshots: "Screenshots", notify: "Get Notified", privacy: "Privacy"},
            
            // Hero
            hero_badge: "🚨 Professional Emergency Response",
            hero_title: "AI Medical Nurse + Team Coordination + Emergency Training",
            hero_subtitle: "The only emergency app you'll ever need",
            hero_desc: "Get instant AI medical guidance, coordinate with your team in real-time, train through interactive games, and access 15+ life-saving features. Red Cross compliant. 100% free forever.",
            hero_btn1: "🚀 Get Notified at Launch",
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
            coming_text: "RESQ+ is now live on Google Play! We're in a 30-day improvement period, actively refining features based on your feedback. Download now and help us make RESQ+ the best emergency response app possible.",
            coming_form_title: "Download on Google Play",
            coming_form_desc: "Get RESQ+ now and start protecting yourself and your loved ones",
            coming_button: "Download",
            coming_button_label: "GET IT ON",
            coming_features: "✓ 100% Free ✓ No Ads ✓ Zero Personal Data ✓ Local Storage Only",
            
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
            screenshot7_caption: "SOS Features",
            screenshot8_caption: "Available Now",
            
            // FAQ
            faq_badge: "❓ FAQ",
            faq_title: "Frequently Asked Questions",
            faq_desc: "Everything you need to know about RESQ+",
            
            // Exit Intent Popup
            exit_title: "Wait! Don't Miss Out!",
            exit_desc: "Get notified when RESQ+ launches and be among the first to access life-saving features!",
            exit_placeholder: "your@email.com",
            exit_button: "🚀 Notify Me at Launch",
            exit_footer: "100% Free • No Spam • Unsubscribe Anytime"
        },
        fr: {
            // Navigation
            nav: {features: "Fonctionnalités", screenshots: "Captures d'écran", notify: "Être Notifié", privacy: "Confidentialité"},
            
            // Hero
            hero_badge: "🚨 Réponse d'Urgence Professionnelle",
            hero_title: "IA Infirmière Médicale + Coordination d'Équipe + Formation aux Urgences",
            hero_subtitle: "La seule application d'urgence dont vous aurez besoin",
            hero_desc: "Obtenez des conseils médicaux instantanés par IA, coordonnez avec votre équipe en temps réel, entraînez-vous avec des jeux interactifs et accédez à plus de 15 fonctionnalités vitales. Conforme à la Croix-Rouge. 100% gratuit pour toujours.",
            hero_btn1: "🚀 Être Notifié au Lancement",
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
            coming_features: "✓ 100% Gratuit ✓ Sans Publicités ✓ Zéro Données Personnelles ✓ Stockage Local Seulement",
            
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
            screenshot7_caption: "Fonctionnalités SOS",
            screenshot8_caption: "Disponible Maintenant",
            
            // FAQ
            faq_badge: "❓ FAQ",
            faq_title: "Questions Fréquemment Posées",
            faq_desc: "Tout ce que vous devez savoir sur RESQ+",
            
            // Exit Intent Popup
            exit_title: "Attendez! Ne Ratez Pas Ça!",
            exit_desc: "Soyez notifié au lancement de RESQ+ et soyez parmi les premiers à accéder aux fonctionnalités vitales!",
            exit_placeholder: "votre@email.com",
            exit_button: "🚀 Me Notifier au Lancement",
            exit_footer: "100% Gratuit • Sans Spam • Désabonnement à Tout Moment"
        },
        th: {
            // Navigation
            nav: {features: "คุณสมบัติ", screenshots: "ภาพหน้าจอ", notify: "รับการแจ้งเตือน", privacy: "ความเป็นส่วนตัว"},
            
            // Hero
            hero_badge: "🚨 การตอบสนองฉุกเฉินระดับมืออาชีพ",
            hero_title: "พยาบาลทางการแพทย์ AI + การประสานงานทีม + การฝึกอบรมฉุกเฉิน",
            hero_subtitle: "แอปฉุกเฉินเดียวที่คุณต้องการ",
            hero_desc: "รับคำแนะนำทางการแพทย์แบบ AI ทันที ประสานงานกับทีมของคุณแบบเรียลไทม์ ฝึกฝนผ่านเกมโต้ตอบ และเข้าถึงฟีเจอร์ช่วยชีวิตมากกว่า 15 รายการ สอดคล้องกับกาชาดสากล ฟรี 100% ตลอดไป",
            hero_btn1: "🚀 รับการแจ้งเตือนเมื่อเปิดตัว",
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
            coming_features: "✓ ฟรี 100% ✓ ไม่มีโฆษณา ✓ ไม่มีข้อมูลส่วนบุคคล ✓ จัดเก็บในเครื่องเท่านั้น",
            
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
            screenshot7_caption: "คุณสมบัติ SOS",
            screenshot8_caption: "พร้อมใช้งานแล้ว",
            
            // FAQ
            faq_badge: "❓ คำถามที่พบบ่อย",
            faq_title: "คำถามที่พบบ่อย",
            faq_desc: "ทุกสิ่งที่คุณต้องรู้เกี่ยวกับ RESQ+",
            
            // Exit Intent Popup
            exit_title: "รอก่อน! อย่าพลาด!",
            exit_desc: "รับการแจ้งเตือนเมื่อ RESQ+ เปิดตัวและเป็นคนแรกที่เข้าถึงฟีเจอร์ช่วยชีวิต!",
            exit_placeholder: "อีเมลของคุณ@email.com",
            exit_button: "🚀 แจ้งเตือนฉันเมื่อเปิดตัว",
            exit_footer: "ฟรี 100% • ไม่มีสแปม • ยกเลิกได้ตลอดเวลา"
        },
        zh: {
            // Navigation
            nav: {features: "功能", screenshots: "截图", notify: "获取通知", privacy: "隐私"},
            
            // Hero
            hero_badge: "🚨 专业紧急响应",
            hero_title: "AI医疗护士 + 团队协调 + 紧急培训",
            hero_subtitle: "您唯一需要的紧急应用",
            hero_desc: "获取即时AI医疗指导，实时协调您的团队，通过互动游戏进行培训，并访问15+救生功能。符合红十字会标准。永久100%免费。",
            hero_btn1: "🚀 启动时获取通知",
            hero_btn2: "📱 查看功能",
            
            // Features
            features_badge: "🎯 核心功能",
            features_title: "一个应用包含所有内容",
            features_desc: "为实际情况设计的专业紧急响应工具",
            
            // Use Cases
            usecase_badge: "🌟 真实场景",
            usecase_title: "RESQ+ 实战",
            usecase_desc: "看看RESQ+如何在真实紧急情况下发挥作用",
            
            // Share Story
            share_badge: "📸 社区故事",
            share_title: "RESQ+ 救了我的命",
            share_desc: "分享您的紧急故事并激励他人。获得特色展示并提高知名度！",
            share_heading: "您的故事可能在这里！",
            share_text: "分享RESQ+如何在紧急情况下帮助您。您的故事将激励他人并拯救生命。",
            share_button: "📸 分享我的紧急故事",
            share_benefits: "✓ 获得特色展示 ✓ 激励他人 ✓ 提高社交媒体知名度",
            
            // Available Now
            coming_badge: "🚀 现已推出",
            coming_title: "现已在Google Play上推出",
            coming_desc: "立即下载RESQ+，为任何紧急情况做好准备",
            coming_heading: "30天改进期 - 您的反馈很重要！",
            coming_text: "RESQ+现已在Google Play上推出！我们正处于30天的改进期，根据您的反馈积极完善功能。立即下载，帮助我们使RESQ+成为最好的紧急响应应用。",
            coming_form_title: "在Google Play上下载",
            coming_form_desc: "立即获取RESQ+，开始保护您和您所爱的人",
            coming_button: "下载",
            coming_button_label: "在",
            coming_features: "✓ 100%免费 ✓ 无广告 ✓ 零个人数据 ✓ 仅本地存储",
            
            // Newsletter
            newsletter_subscribe: "订阅",
            newsletter_privacy: "🔒 我们尊重您的隐私。随时可以取消订阅。",
            
            // Screenshot Captions
            screenshot1_caption: "主屏幕",
            screenshot2_caption: "紧急控制中心",
            screenshot3_caption: "AI紧急护士",
            screenshot4_caption: "团队连接",
            screenshot5_caption: "医疗档案",
            screenshot6_caption: "紧急设置",
            screenshot7_caption: "SOS功能",
            screenshot8_caption: "现已推出",
            
            // FAQ
            faq_badge: "❓ 常见问题",
            faq_title: "常见问题",
            faq_desc: "关于RESQ+您需要知道的一切",
            
            // Exit Intent Popup
            exit_title: "等等！不要错过！",
            exit_desc: "在RESQ+推出时获得通知，成为第一批访问救生功能的人！",
            exit_placeholder: "您的邮箱@email.com",
            exit_button: "🚀 启动时通知我",
            exit_footer: "100%免费 • 无垃圾邮件 • 随时取消订阅"
        }
    },
    
    switchLang(lang) {
        this.currentLang = lang;
        localStorage.setItem('resq_lang', lang);
        this.updatePage();
        this.updateExitPopup();
        
        // Update active state and aria-pressed on language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        // Add active class and aria-pressed to selected language button
        const selectedBtn = document.querySelector(`.lang-btn[onclick*="'${lang}'"]`);
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
