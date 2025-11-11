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
            
            // Coming Soon
            coming_badge: "🚀 Coming Soon",
            coming_title: "Launching on Google Play",
            coming_desc: "Be the first to know when RESQ+ is available for download",
            coming_heading: "App Under Final Review",
            coming_text: "RESQ+ is currently undergoing final testing and quality assurance. We're committed to delivering a reliable, professional emergency response app that you can trust when it matters most.",
            coming_form_title: "Get Notified at Launch",
            coming_form_desc: "Enter your email to receive an instant notification when RESQ+ goes live",
            coming_button: "Notify Me",
            coming_features: "✓ 100% Free ✓ No Ads ✓ Zero Personal Data ✓ Local Storage Only",
            
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
            
            // Coming Soon
            coming_badge: "🚀 Bientôt Disponible",
            coming_title: "Lancement sur Google Play",
            coming_desc: "Soyez le premier à savoir quand RESQ+ sera disponible au téléchargement",
            coming_heading: "Application en Révision Finale",
            coming_text: "RESQ+ est actuellement en phase de tests finals et d'assurance qualité. Nous nous engageons à livrer une application de réponse d'urgence fiable et professionnelle en qui vous pouvez avoir confiance quand cela compte le plus.",
            coming_form_title: "Être Notifié au Lancement",
            coming_form_desc: "Entrez votre email pour recevoir une notification instantanée quand RESQ+ sera en ligne",
            coming_button: "Me Notifier",
            coming_features: "✓ 100% Gratuit ✓ Sans Publicités ✓ Zéro Données Personnelles ✓ Stockage Local Seulement",
            
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
            
            // Coming Soon
            coming_badge: "🚀 เร็วๆ นี้",
            coming_title: "เปิดตัวบน Google Play",
            coming_desc: "เป็นคนแรกที่รู้เมื่อ RESQ+ พร้อมให้ดาวน์โหลด",
            coming_heading: "แอปอยู่ระหว่างการตรวจสอบขั้นสุดท้าย",
            coming_text: "RESQ+ กำลังอยู่ระหว่างการทดสอบขั้นสุดท้ายและการประกันคุณภาพ เรามุ่งมั่นที่จะส่งมอบแอปตอบสนองฉุกเฉินที่เชื่อถือได้และเป็นมืออาชีพที่คุณสามารถไว้วางใจได้เมื่อมันสำคัญที่สุด",
            coming_form_title: "รับการแจ้งเตือนเมื่อเปิดตัว",
            coming_form_desc: "ใส่อีเมลของคุณเพื่อรับการแจ้งเตือนทันทีเมื่อ RESQ+ เปิดตัว",
            coming_button: "แจ้งเตือนฉัน",
            coming_features: "✓ ฟรี 100% ✓ ไม่มีโฆษณา ✓ ไม่มีข้อมูลส่วนบุคคล ✓ จัดเก็บในเครื่องเท่านั้น",
            
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
            
            // Coming Soon
            coming_badge: "🚀 即将推出",
            coming_title: "即将在Google Play上推出",
            coming_desc: "成为第一个知道RESQ+何时可供下载的人",
            coming_heading: "应用正在最终审核中",
            coming_text: "RESQ+目前正在进行最终测试和质量保证。我们致力于提供一个可靠、专业的紧急响应应用，您可以在最需要的时候信赖它。",
            coming_form_title: "启动时获取通知",
            coming_form_desc: "输入您的电子邮件，以便在RESQ+上线时立即收到通知",
            coming_button: "通知我",
            coming_features: "✓ 100%免费 ✓ 无广告 ✓ 零个人数据 ✓ 仅本地存储",
            
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
