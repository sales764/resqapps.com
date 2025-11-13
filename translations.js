/**
 * GLOBAL TRANSLATIONS FOR ALL PAGES
 * Supports: EN, FR, TH, ZH (All 4 languages complete)
 */

const TRANSLATIONS = {
    // Common elements across all pages
    common: {
        en: {
            skipToContent: "Skip to main content",
            siteName: "RESQ+",
            tagline: "Fast Emergency Response",
            loading: "Loading...",
            backToHome: "Back to Home",
            learnMore: "Learn More",
            contactUs: "Contact Us",
            readMore: "Read More",
            downloadNow: "Download Now",
            getStarted: "Get Started",
            signUp: "Sign Up",
            signIn: "Sign In",
            submit: "Submit",
            cancel: "Cancel",
            close: "Close",
            yes: "Yes",
            no: "No",
            ok: "OK",
            save: "Save",
            delete: "Delete",
            edit: "Edit",
            search: "Search",
            filter: "Filter",
            all: "All",
            copyright: "© 2024 RESQ+. All rights reserved.",
            privacyPolicy: "Privacy Policy",
            termsOfService: "Terms of Service",
            support: "Support",
            faq: "FAQ",
            blog: "Blog",
            aboutUs: "About Us",
            careers: "Careers",
            press: "Press Kit",
            api: "API Documentation"
        },
        fr: {
            skipToContent: "Passer au contenu principal",
            siteName: "RESQ+",
            tagline: "Réponse d'Urgence Rapide",
            loading: "Chargement...",
            backToHome: "Retour à l'accueil",
            learnMore: "En savoir plus",
            contactUs: "Contactez-nous",
            readMore: "Lire la suite",
            downloadNow: "Télécharger maintenant",
            getStarted: "Commencer",
            signUp: "S'inscrire",
            signIn: "Se connecter",
            submit: "Soumettre",
            cancel: "Annuler",
            close: "Fermer",
            yes: "Oui",
            no: "Non",
            ok: "OK",
            save: "Enregistrer",
            delete: "Supprimer",
            edit: "Modifier",
            search: "Rechercher",
            filter: "Filtrer",
            all: "Tous",
            copyright: "© 2024 RESQ+. Tous droits réservés.",
            privacyPolicy: "Politique de confidentialité",
            termsOfService: "Conditions d'utilisation",
            support: "Support",
            faq: "FAQ",
            blog: "Blog",
            aboutUs: "À propos",
            careers: "Carrières",
            press: "Kit presse",
            api: "Documentation API"
        },
        th: {
            skipToContent: "ข้ามไปยังเนื้อหาหลัก",
            siteName: "RESQ+",
            tagline: "การตอบสนองฉุกเฉินที่รวดเร็ว",
            loading: "กำลังโหลด...",
            backToHome: "กลับหน้าแรก",
            learnMore: "เรียนรู้เพิ่มเติม",
            contactUs: "ติดต่อเรา",
            readMore: "อ่านเพิ่มเติม",
            downloadNow: "ดาวน์โหลดเลย",
            getStarted: "เริ่มต้นใช้งาน",
            signUp: "สมัครสมาชิก",
            signIn: "เข้าสู่ระบบ",
            submit: "ส่ง",
            cancel: "ยกเลิก",
            close: "ปิด",
            yes: "ใช่",
            no: "ไม่",
            ok: "ตกลง",
            save: "บันทึก",
            delete: "ลบ",
            edit: "แก้ไข",
            search: "ค้นหา",
            filter: "กรอง",
            all: "ทั้งหมด",
            copyright: "© 2024 RESQ+ สงวนลิขสิทธิ์",
            privacyPolicy: "นโยบายความเป็นส่วนตัว",
            termsOfService: "เงื่อนไขการให้บริการ",
            support: "ฝ่ายสนับสนุน",
            faq: "คำถามที่พบบ่อย",
            blog: "บล็อก",
            aboutUs: "เกี่ยวกับเรา",
            careers: "ร่วมงานกับเรา",
            press: "สื่อมวลชน",
            api: "เอกสาร API"
        }
    },

    // Thank You page
    thankYou: {
        en: {
            title: "Thank You!",
            subtitle: "Your message has been received",
            message: "We appreciate you contacting RESQ+. One of our team members will get back to you within 24 hours.",
            whatNext: "What happens next?",
            step1Title: "We Review",
            step1Text: "Our team reviews your message carefully",
            step2Title: "We Respond",
            step2Text: "You'll receive a personalized response within 24 hours",
            step3Title: "We Assist",
            step3Text: "We provide the support you need",
            downloadApp: "Download the RESQ+ App",
            downloadText: "Get instant access to emergency services",
            exploreResources: "Explore Our Resources",
            socialMedia: "Follow Us on Social Media",
            needUrgentHelp: "Need urgent help?",
            callEmergency: "Call Emergency Services",
            emergencyNumber: "1669"
        },
        fr: {
            title: "Merci!",
            subtitle: "Votre message a été reçu",
            message: "Nous vous remercions d'avoir contacté RESQ+. Un membre de notre équipe vous répondra dans les 24 heures.",
            whatNext: "Et maintenant?",
            step1Title: "Nous examinons",
            step1Text: "Notre équipe examine attentivement votre message",
            step2Title: "Nous répondons",
            step2Text: "Vous recevrez une réponse personnalisée dans les 24 heures",
            step3Title: "Nous assistons",
            step3Text: "Nous fournissons le support dont vous avez besoin",
            downloadApp: "Télécharger l'application RESQ+",
            downloadText: "Accédez instantanément aux services d'urgence",
            exploreResources: "Explorez nos ressources",
            socialMedia: "Suivez-nous sur les réseaux sociaux",
            needUrgentHelp: "Besoin d'aide urgente?",
            callEmergency: "Appelez les services d'urgence",
            emergencyNumber: "1669"
        },
        th: {
            title: "ขอบคุณ!",
            subtitle: "เราได้รับข้อความของคุณแล้ว",
            message: "ขอบคุณที่ติดต่อ RESQ+ ทีมงานของเราจะติดต่อกลับภายใน 24 ชั่วโมง",
            whatNext: "ขั้นตอนถัดไป?",
            step1Title: "เราตรวจสอบ",
            step1Text: "ทีมงานของเราจะตรวจสอบข้อความของคุณอย่างรอบคอบ",
            step2Title: "เราตอบกลับ",
            step2Text: "คุณจะได้รับการตอบกลับภายใน 24 ชั่วโมง",
            step3Title: "เราช่วยเหลือ",
            step3Text: "เราให้การสนับสนุนที่คุณต้องการ",
            downloadApp: "ดาวน์โหลดแอป RESQ+",
            downloadText: "เข้าถึงบริการฉุกเฉินได้ทันที",
            exploreResources: "สำรวจทรัพยากรของเรา",
            socialMedia: "ติดตามเราบนโซเชียลมีเดีย",
            needUrgentHelp: "ต้องการความช่วยเหลือด่วน?",
            callEmergency: "โทรบริการฉุกเฉิน",
            emergencyNumber: "1669"
        }
    },

    // 404 Error page
    error404: {
        en: {
            title: "404 - Page Not Found",
            subtitle: "Oops! The page you're looking for doesn't exist.",
            message: "The page you are trying to access may have been moved, deleted, or never existed.",
            suggestions: "Here are some helpful links:",
            goHome: "Go to Homepage",
            searchSite: "Search our site",
            contactSupport: "Contact Support",
            recentPages: "Recent Pages",
            errorCode: "Error Code: 404"
        },
        fr: {
            title: "404 - Page non trouvée",
            subtitle: "Oups! La page que vous recherchez n'existe pas.",
            message: "La page que vous essayez d'accéder a peut-être été déplacée, supprimée ou n'a jamais existé.",
            suggestions: "Voici quelques liens utiles:",
            goHome: "Aller à l'accueil",
            searchSite: "Rechercher sur notre site",
            contactSupport: "Contacter le support",
            recentPages: "Pages récentes",
            errorCode: "Code d'erreur: 404"
        },
        th: {
            title: "404 - ไม่พบหน้า",
            subtitle: "ขออภัย! ไม่พบหน้าที่คุณกำลังมองหา",
            message: "หน้าที่คุณพยายามเข้าถึงอาจถูกย้าย ลบ หรือไม่เคยมีอยู่",
            suggestions: "ลิงก์ที่อาจช่วยได้:",
            goHome: "ไปหน้าแรก",
            searchSite: "ค้นหาในเว็บไซต์",
            contactSupport: "ติดต่อฝ่ายสนับสนุน",
            recentPages: "หน้าล่าสุด",
            errorCode: "รหัสข้อผิดพลาด: 404"
        }
    },

    // 500 Error page
    error500: {
        en: {
            title: "500 - Server Error",
            subtitle: "Something went wrong on our end.",
            message: "We're experiencing technical difficulties. Our team has been notified and is working to fix the issue.",
            suggestions: "What you can do:",
            refresh: "Refresh the page",
            tryAgain: "Try again in a few minutes",
            goHome: "Return to homepage",
            contactSupport: "Contact support if the problem persists",
            errorCode: "Error Code: 500"
        },
        fr: {
            title: "500 - Erreur serveur",
            subtitle: "Quelque chose s'est mal passé de notre côté.",
            message: "Nous rencontrons des difficultés techniques. Notre équipe a été notifiée et travaille pour résoudre le problème.",
            suggestions: "Ce que vous pouvez faire:",
            refresh: "Actualiser la page",
            tryAgain: "Réessayer dans quelques minutes",
            goHome: "Retourner à l'accueil",
            contactSupport: "Contacter le support si le problème persiste",
            errorCode: "Code d'erreur: 500"
        },
        th: {
            title: "500 - ข้อผิดพลาดเซิร์ฟเวอร์",
            subtitle: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ของเรา",
            message: "เรากำลังประสบปัญหาทางเทคนิค ทีมงานของเราได้รับแจ้งแล้วและกำลังแก้ไข",
            suggestions: "คุณสามารถ:",
            refresh: "รีเฟรชหน้านี้",
            tryAgain: "ลองใหม่อีกครั้งในอีกสักครู่",
            goHome: "กลับไปหน้าแรก",
            contactSupport: "ติดต่อฝ่ายสนับสนุนหากปัญหายังคงอยู่",
            errorCode: "รหัสข้อผิดพลาด: 500"
        }
    },

    // Blog page
    blog: {
        en: {
            title: "RESQ+ Blog",
            subtitle: "Latest emergency response insights and safety tips",
            allPosts: "All Posts",
            categories: "Categories",
            technology: "🔬 Technology",
            safetyTips: "🚨 Safety Tips",
            companyNews: "📰 Company News",
            caseStudies: "📊 Case Studies",
            readTime: "min read",
            publishedOn: "Published on",
            newsletter: {
                title: "📬 Stay Updated",
                subtitle: "Get the latest emergency response tips and safety guides delivered to your inbox",
                placeholder: "Enter your email",
                button: "Subscribe",
                success: "Thanks for subscribing!",
                error: "Please enter a valid email"
            }
        },
        fr: {
            title: "Blog RESQ+",
            subtitle: "Dernières informations sur les urgences et conseils de sécurité",
            allPosts: "Tous les articles",
            categories: "Catégories",
            technology: "🔬 Technologie",
            safetyTips: "🚨 Conseils de sécurité",
            companyNews: "📰 Actualités",
            caseStudies: "📊 Études de cas",
            readTime: "min de lecture",
            publishedOn: "Publié le",
            newsletter: {
                title: "📬 Restez informé",
                subtitle: "Recevez les derniers conseils d'urgence et guides de sécurité dans votre boîte mail",
                placeholder: "Entrez votre email",
                button: "S'abonner",
                success: "Merci de vous être abonné!",
                error: "Veuillez entrer un email valide"
            }
        },
        th: {
            title: "บล็อก RESQ+",
            subtitle: "ข้อมูลล่าสุดเกี่ยวกับการตอบสนองฉุกเฉินและเคล็ดลับความปลอดภัย",
            allPosts: "บทความทั้งหมด",
            categories: "หมวดหมู่",
            technology: "🔬 เทคโนโลยี",
            safetyTips: "🚨 เคล็ดลับความปลอดภัย",
            companyNews: "📰 ข่าวบริษัท",
            caseStudies: "📊 กรณีศึกษา",
            readTime: "นาที",
            publishedOn: "เผยแพร่เมื่อ",
            newsletter: {
                title: "📬 ติดตามข่าวสาร",
                subtitle: "รับเคล็ดลับฉุกเฉินและคู่มือความปลอดภัยล่าสุดส่งตรงถึงอีเมลของคุณ",
                placeholder: "ใส่อีเมลของคุณ",
                button: "สมัครรับข่าวสาร",
                success: "ขอบคุณที่สมัครรับข่าวสาร!",
                error: "กรุณาใส่อีเมลที่ถูกต้อง"
            }
        }
    },
    
    // Countdown Timer & Signup Counter
    countdown: {
        en: {
            launchIn: "LAUNCH IN",
            days: "DAYS",
            hours: "HOURS",
            minutes: "MINUTES",
            seconds: "SECONDS",
            peopleSignedUp: "people already signed up"
        },
        fr: {
            launchIn: "LANCEMENT DANS",
            days: "JOURS",
            hours: "HEURES",
            minutes: "MINUTES",
            seconds: "SECONDES",
            peopleSignedUp: "personnes déjà inscrites"
        },
        th: {
            launchIn: "เปิดตัวใน",
            days: "วัน",
            hours: "ชั่วโมง",
            minutes: "นาที",
            seconds: "วินาที",
            peopleSignedUp: "คนลงทะเบียนแล้ว"
        },
        zh: {
            launchIn: "启动倒计时",
            days: "天",
            hours: "小时",
            minutes: "分钟",
            seconds: "秒",
            peopleSignedUp: "人已注册"
        }
    },
    
    // Contact Information
    contact: {
        en: {
            email: "📧 Email Us",
            whatsapp: "💬 WhatsApp",
            emailAddress: "sales@sornsawan.com",
            whatsappNumber: "+66 63 670 6074"
        },
        fr: {
            email: "📧 Écrivez-nous",
            whatsapp: "💬 WhatsApp",
            emailAddress: "sales@sornsawan.com",
            whatsappNumber: "+66 63 670 6074"
        },
        th: {
            email: "📧 ส่งอีเมล",
            whatsapp: "💬 วอทส์แอป",
            emailAddress: "sales@sornsawan.com",
            whatsappNumber: "+66 63 670 6074"
        },
        zh: {
            email: "📧 给我们发邮件",
            whatsapp: "💬 WhatsApp",
            emailAddress: "sales@sornsawan.com",
            whatsappNumber: "+66 63 670 6074"
        }
    },
    
    // Screenshots Coming Soon Section
    screenshots: {
        en: {
            coming_soon_title: "Screenshots Coming Soon!",
            coming_soon_message: "We're finalizing the app interface for the Google Play Store launch. Professional screenshots of our AI Medical Nurse, Team Coordination, and Emergency Training features will be available soon.",
            launching_soon: "🚀 Launching Soon on Google Play"
        },
        fr: {
            coming_soon_title: "Captures d'écran à venir !",
            coming_soon_message: "Nous finalisons l'interface de l'application pour le lancement sur Google Play Store. Des captures d'écran professionnelles de notre Infirmière Médicale IA, Coordination d'Équipe et fonctionnalités de Formation aux Urgences seront disponibles bientôt.",
            launching_soon: "🚀 Lancement bientôt sur Google Play"
        },
        th: {
            coming_soon_title: "ภาพหน้าจออีกไม่นาน!",
            coming_soon_message: "เรากำลังปรับแต่งอินเทอร์เฟซแอปพลิเคชันสำหรับการเปิดตัว Google Play Store ภาพหน้าจออย่างมืออาชีพของพยาบาล AI ทางการแพทย์ การประสานงานทีม และคุณสมบัติการฝึกอบรมฉุกเฉินจะพร้อมใช้งานเร็ว ๆ นี้",
            launching_soon: "🚀 เปิดตัวเร็ว ๆ นี้บน Google Play"
        },
        zh: {
            coming_soon_title: "即将推出屏幕截图！",
            coming_soon_message: "我们正在为 Google Play Store 发布而完善应用界面。我们的 AI 医疗护士、团队协调和紧急培训功能的专业屏幕截图将很快推出。",
            launching_soon: "🚀 即将在 Google Play 上推出"
        }
    },
    
    // Homepage specific (index.html)
    homepage: {
        en: {
            logoAlt: "RESQ+ Logo",
            heroImageAlt: "RESQ+ Welcome Screen",
            emailPlaceholder: "your@email.com",
            screenshot1Alt: "RESQ+ Welcome Screen",
            screenshot2Alt: "RESQ+ SOS Emergency",
            screenshot3Alt: "RESQ+ AI Medical Nurse",
            screenshot4Alt: "RESQ+ Emergency Profile",
            screenshot5Alt: "RESQ+ First Aid & Triage",
            screenshot6Alt: "RESQ+ Team Connect",
            screenshot7Alt: "RESQ+ Rescue Game",
            screenshot8Alt: "RESQ+ Ready - Coming Soon"
        },
        fr: {
            logoAlt: "Logo RESQ+",
            heroImageAlt: "Écran d'accueil RESQ+",
            emailPlaceholder: "votre@email.com",
            screenshot1Alt: "Écran d'accueil RESQ+",
            screenshot2Alt: "RESQ+ SOS Urgence",
            screenshot3Alt: "RESQ+ Infirmière IA",
            screenshot4Alt: "RESQ+ Profil d'Urgence",
            screenshot5Alt: "RESQ+ Premiers Soins et Triage",
            screenshot6Alt: "RESQ+ Connexion d'Équipe",
            screenshot7Alt: "RESQ+ Jeu de Sauvetage",
            screenshot8Alt: "RESQ+ Prêt - Bientôt Disponible"
        },
        th: {
            logoAlt: "โลโก้ RESQ+",
            heroImageAlt: "หน้าจอต้อนรับ RESQ+",
            emailPlaceholder: "email@ของคุณ.com",
            screenshot1Alt: "หน้าจอต้อนรับ RESQ+",
            screenshot2Alt: "RESQ+ SOS ฉุกเฉิน",
            screenshot3Alt: "RESQ+ พยาบาล AI",
            screenshot4Alt: "RESQ+ โปรไฟล์ฉุกเฉิน",
            screenshot5Alt: "RESQ+ ปฐมพยาบาลและการคัดกรอง",
            screenshot6Alt: "RESQ+ เชื่อมต่อทีม",
            screenshot7Alt: "RESQ+ เกมช่วยเหลือ",
            screenshot8Alt: "RESQ+ พร้อมแล้ว - เร็วๆ นี้"
        },
        zh: {
            logoAlt: "RESQ+ 标志",
            heroImageAlt: "RESQ+ 欢迎屏幕",
            emailPlaceholder: "你的@邮箱.com",
            screenshot1Alt: "RESQ+ 欢迎屏幕",
            screenshot2Alt: "RESQ+ SOS 紧急",
            screenshot3Alt: "RESQ+ AI 医疗护士",
            screenshot4Alt: "RESQ+ 紧急档案",
            screenshot5Alt: "RESQ+ 急救和分诊",
            screenshot6Alt: "RESQ+ 团队连接",
            screenshot7Alt: "RESQ+ 救援游戏",
            screenshot8Alt: "RESQ+ 准备就绪 - 即将推出"
        }
    },
    
    // Social Share
    socialShare: {
        en: {
            shareOn: "Share on",
            copyLink: "Copy link"
        },
        fr: {
            shareOn: "Partager sur",
            copyLink: "Copier le lien"
        },
        th: {
            shareOn: "แชร์บน",
            copyLink: "คัดลอกลิงก์"
        },
        zh: {
            shareOn: "分享到",
            copyLink: "复制链接"
        }
    },
    
    // Newsletter Popup
    newsletter: {
        en: {
            title: "📧 Stay Updated!",
            subtitle: "Get early access & exclusive updates",
            description: "Join 5,000+ people getting notified when RESQ+ launches. Red Cross approved emergency guidance in your inbox.",
            placeholder: "Enter your email",
            buttonText: "Get Early Access",
            privacyText: "We respect your privacy. Unsubscribe anytime.",
            successTitle: "🎉 You're In!",
            successMessage: "Check your inbox for confirmation.",
            contactLabel: "Or contact us directly:"
        },
        fr: {
            title: "📧 Restez Informé!",
            subtitle: "Accès anticipé et mises à jour exclusives",
            description: "Rejoignez 5 000+ personnes notifiées au lancement de RESQ+. Conseils d'urgence approuvés par la Croix-Rouge dans votre boîte mail.",
            placeholder: "Entrez votre email",
            buttonText: "Accès Anticipé",
            privacyText: "Nous respectons votre vie privée. Désabonnement à tout moment.",
            successTitle: "🎉 C'est Fait!",
            successMessage: "Vérifiez votre boîte mail pour confirmation.",
            contactLabel: "Ou contactez-nous directement:"
        },
        th: {
            title: "📧 ติดตามข่าวสาร!",
            subtitle: "เข้าถึงก่อนใครและรับข่าวสารพิเศษ",
            description: "เข้าร่วมกับ 5,000+ คนที่รับการแจ้งเตือนเมื่อ RESQ+ เปิดตัว คำแนะนำฉุกเฉินที่ได้รับการรับรองจาก Red Cross ส่งตรงถึงอีเมลคุณ",
            placeholder: "ใส่อีเมลของคุณ",
            buttonText: "เข้าถึงก่อนใคร",
            privacyText: "เราเคารพความเป็นส่วนตัวของคุณ ยกเลิกได้ทุกเมื่อ",
            successTitle: "🎉 เสร็จแล้ว!",
            successMessage: "ตรวจสอบอีเมลของคุณเพื่อยืนยัน",
            contactLabel: "หรือติดต่อเราโดยตรง:"
        },
        zh: {
            title: "📧 保持更新！",
            subtitle: "获取抢先体验和独家更新",
            description: "加入 5,000+ 人，在 RESQ+ 启动时获得通知。红十字会认证的紧急指导直达您的收件箱。",
            placeholder: "输入您的电子邮件",
            buttonText: "抢先体验",
            privacyText: "我们尊重您的隐私。随时取消订阅。",
            successTitle: "🎉 成功！",
            successMessage: "查看您的收件箱确认。",
            contactLabel: "或直接联系我们："
        }
    },
    
    // Feature translations
    features: {
        en: {
            // Feature 1: SOS Smart
            feature1_title: "SOS Smart",
            feature1_desc: "Smart SOS button with haptic feedback, flash morse code, auto-SMS, auto-call, and 5-second video recording with blur privacy.",
            feature1_item1: "✓ Auto-call & auto-SMS (... --- ...)",
            feature1_item2: "✓ Flash with morse code",
            feature1_item3: "✓ Video recording with privacy",
            feature1_item4: "✓ Emergency alerts",
            
            // Feature 2: AI Emergency Nurse
            feature2_title: "AI Emergency Nurse",
            feature2_desc: "24/7 AI medical assistant with Red Cross protocols, triage assessment, and first aid kit guidance in 4 languages.",
            feature2_item1: "✓ Voice & image support",
            feature2_item2: "✓ ABC+D triage protocol",
            feature2_item3: "✓ EN / FR / TH / ZH languages",
            feature2_item4: "✓ First aid kit integration",
            
            // Feature 3: Team Connect
            feature3_title: "Team Connect",
            feature3_desc: "Create and coordinate with emergency teams. Real-time location sharing, team alerts with voice messages, and QR code joining.",
            feature3_item1: "✓ Team creation & management",
            feature3_item2: "✓ Real-time GPS tracking",
            feature3_item3: "✓ Voice message alerts",
            feature3_item4: "✓ QR code team joining",
            
            // Feature 4: Emergency Profile
            feature4_title: "Emergency Profile",
            feature4_desc: "Complete medical profile with blood type, allergies, medications, insurance, and privacy-controlled QR code for first responders.",
            feature4_item1: "✓ Medical history & allergies",
            feature4_item2: "✓ Emergency contacts",
            feature4_item3: "✓ QR code with privacy settings",
            feature4_item4: "✓ Insurance information",
            
            // Feature 5: First Aid & Triage
            feature5_title: "First Aid & Triage",
            feature5_desc: "Professional medical triage with color-coded protocols (RED/ORANGE/YELLOW/GREEN) and smart first aid kit recommendations.",
            feature5_item1: "✓ 4-level triage system",
            feature5_item2: "✓ Interactive protocols",
            feature5_item3: "✓ First aid kit guidance",
            feature5_item4: "✓ Step-by-step instructions",
            
            // Feature 6: Community & Alerts
            feature6_title: "Community & Alerts",
            feature6_desc: "Government disaster alerts, community danger reports, request help feature, and real-time emergency notifications.",
            feature6_item1: "✓ Government alerts (Thailand)",
            feature6_item2: "✓ Community danger reports",
            feature6_item3: "✓ Request help nearby",
            feature6_item4: "✓ Emergency broadcasts",
            
            // Feature 7: Rush Map
            feature7_title: "Rush Map",
            feature7_desc: "Find nearest emergency services instantly. Police stations and hospitals near you with one-tap navigation and calling.",
            feature7_item1: "✓ Nearest police stations",
            feature7_item2: "✓ Nearest hospitals",
            feature7_item3: "✓ GPS navigation",
            feature7_item4: "✓ One-tap calling",
            
            // Feature 8: Rescue Game
            feature8_title: "Rescue Game",
            feature8_desc: "Interactive emergency training game with real scenarios. Practice life-saving skills, earn badges, and unlock achievements.",
            feature8_item1: "✓ Real emergency scenarios",
            feature8_item2: "✓ Heatstroke & snakebite training",
            feature8_item3: "✓ Badges & achievements",
            feature8_item4: "✓ Skill progression system",
            
            // Feature 9: QR Scanner
            feature9_title: "QR Scanner",
            feature9_desc: "Scan emergency medical QR codes to access patient information, join teams, and access emergency protocols instantly.",
            feature9_item1: "✓ Medical profile scanning",
            feature9_item2: "✓ Team QR joining",
            feature9_item3: "✓ Fast emergency data access",
            feature9_item4: "✓ Privacy-protected"
        },
        fr: {
            // Feature 1: SOS Smart
            feature1_title: "SOS Intelligent",
            feature1_desc: "Bouton SOS intelligent avec retour haptique, code morse lumineux, SMS automatique, appel automatique et enregistrement vidéo de 5 secondes avec confidentialité.",
            feature1_item1: "✓ Appel et SMS automatiques (... --- ...)",
            feature1_item2: "✓ Flash avec code morse",
            feature1_item3: "✓ Enregistrement vidéo avec confidentialité",
            feature1_item4: "✓ Alertes d'urgence",
            
            // Feature 2: AI Emergency Nurse
            feature2_title: "Infirmière d'Urgence IA",
            feature2_desc: "Assistant médical IA 24h/24 et 7j/7 avec protocoles Red Cross, évaluation de triage et conseils sur la trousse de premiers soins en 4 langues.",
            feature2_item1: "✓ Support vocal et image",
            feature2_item2: "✓ Protocole de triage ABC+D",
            feature2_item3: "✓ Langues EN / FR / TH / ZH",
            feature2_item4: "✓ Intégration trousse premiers soins",
            
            // Feature 3: Team Connect
            feature3_title: "Connexion d'Équipe",
            feature3_desc: "Créez et coordonnez avec des équipes d'urgence. Partage de localisation en temps réel, alertes d'équipe avec messages vocaux et adhésion par code QR.",
            feature3_item1: "✓ Création et gestion d'équipe",
            feature3_item2: "✓ Suivi GPS en temps réel",
            feature3_item3: "✓ Alertes par message vocal",
            feature3_item4: "✓ Adhésion d'équipe par code QR",
            
            // Feature 4: Emergency Profile
            feature4_title: "Profil d'Urgence",
            feature4_desc: "Profil médical complet avec groupe sanguin, allergies, médicaments, assurance et code QR à confidentialité contrôlée pour les premiers intervenants.",
            feature4_item1: "✓ Antécédents médicaux et allergies",
            feature4_item2: "✓ Contacts d'urgence",
            feature4_item3: "✓ Code QR avec paramètres de confidentialité",
            feature4_item4: "✓ Informations d'assurance",
            
            // Feature 5: First Aid & Triage
            feature5_title: "Premiers Soins et Triage",
            feature5_desc: "Triage médical professionnel avec protocoles codés par couleur (ROUGE/ORANGE/JAUNE/VERT) et recommandations intelligentes de trousse de premiers soins.",
            feature5_item1: "✓ Système de triage à 4 niveaux",
            feature5_item2: "✓ Protocoles interactifs",
            feature5_item3: "✓ Guide de trousse de premiers soins",
            feature5_item4: "✓ Instructions étape par étape",
            
            // Feature 6: Community & Alerts
            feature6_title: "Communauté et Alertes",
            feature6_desc: "Alertes gouvernementales de catastrophe, rapports de danger communautaires, fonction de demande d'aide et notifications d'urgence en temps réel.",
            feature6_item1: "✓ Alertes gouvernementales (Thaïlande)",
            feature6_item2: "✓ Rapports de danger communautaires",
            feature6_item3: "✓ Demander de l'aide à proximité",
            feature6_item4: "✓ Diffusions d'urgence",
            
            // Feature 7: Rush Map
            feature7_title: "Carte Express",
            feature7_desc: "Trouvez instantanément les services d'urgence les plus proches. Commissariats et hôpitaux près de vous avec navigation et appel en un clic.",
            feature7_item1: "✓ Commissariats les plus proches",
            feature7_item2: "✓ Hôpitaux les plus proches",
            feature7_item3: "✓ Navigation GPS",
            feature7_item4: "✓ Appel en un clic",
            
            // Feature 8: Rescue Game
            feature8_title: "Jeu de Sauvetage",
            feature8_desc: "Jeu de formation aux urgences interactif avec scénarios réels. Pratiquez des compétences vitales, gagnez des badges et débloquez des réalisations.",
            feature8_item1: "✓ Scénarios d'urgence réels",
            feature8_item2: "✓ Formation coup de chaleur et morsure de serpent",
            feature8_item3: "✓ Badges et réalisations",
            feature8_item4: "✓ Système de progression des compétences",
            
            // Feature 9: QR Scanner
            feature9_title: "Scanner QR",
            feature9_desc: "Scannez les codes QR médicaux d'urgence pour accéder aux informations des patients, rejoindre des équipes et accéder instantanément aux protocoles d'urgence.",
            feature9_item1: "✓ Scan du profil médical",
            feature9_item2: "✓ Rejoindre une équipe par QR",
            feature9_item3: "✓ Accès rapide aux données d'urgence",
            feature9_item4: "✓ Protégé par confidentialité"
        },
        th: {
            // Feature 1: SOS Smart
            feature1_title: "SOS อัจฉริยะ",
            feature1_desc: "ปุ่ม SOS อัจฉริยะพร้อมแรงสั่นสะเทือน ไฟกระพริบรหัสมอร์ส ส่ง SMS อัตโนมัติ โทรอัตโนมัติ และบันทึกวิดีโอ 5 วินาทีพร้อมความเป็นส่วนตัว",
            feature1_item1: "✓ โทรและส่ง SMS อัตโนมัติ (... --- ...)",
            feature1_item2: "✓ ไฟกระพริบรหัสมอร์ส",
            feature1_item3: "✓ บันทึกวิดีโอพร้อมความเป็นส่วนตัว",
            feature1_item4: "✓ การแจ้งเตือนฉุกเฉิน",
            
            // Feature 2: AI Emergency Nurse
            feature2_title: "พยาบาลฉุกเฉิน AI",
            feature2_desc: "ผู้ช่วยทางการแพทย์ AI ตลอด 24/7 พร้อมโปรโตคอล Red Cross การประเมินการคัดกรอง และคำแนะนำชุดปฐมพยาบาลใน 4 ภาษา",
            feature2_item1: "✓ รองรับเสียงและรูปภาพ",
            feature2_item2: "✓ โปรโตคอลการคัดกรอง ABC+D",
            feature2_item3: "✓ ภาษา EN / FR / TH / ZH",
            feature2_item4: "✓ บูรณาการชุดปฐมพยาบาล",
            
            // Feature 3: Team Connect
            feature3_title: "เชื่อมต่อทีม",
            feature3_desc: "สร้างและประสานงานกับทีมฉุกเฉิน แชร์ตำแหน่งแบบเรียลไทม์ การแจ้งเตือนทีมด้วยข้อความเสียง และเข้าร่วมผ่าน QR code",
            feature3_item1: "✓ การสร้างและจัดการทีม",
            feature3_item2: "✓ ติดตาม GPS แบบเรียลไทม์",
            feature3_item3: "✓ การแจ้งเตือนด้วยข้อความเสียง",
            feature3_item4: "✓ เข้าร่วมทีมผ่าน QR code",
            
            // Feature 4: Emergency Profile
            feature4_title: "โปรไฟล์ฉุกเฉิน",
            feature4_desc: "โปรไฟล์ทางการแพทย์ที่สมบูรณ์พร้อมหมู่เลือด ภูมิแพ้ ยา ประกันภัย และ QR code ที่ควบคุมความเป็นส่วนตัวสำหรับผู้ช่วยเหลือฉุกเฉิน",
            feature4_item1: "✓ ประวัติทางการแพทย์และภูมิแพ้",
            feature4_item2: "✓ ผู้ติดต่อฉุกเฉิน",
            feature4_item3: "✓ QR code พร้อมการตั้งค่าความเป็นส่วนตัว",
            feature4_item4: "✓ ข้อมูลประกันภัย",
            
            // Feature 5: First Aid & Triage
            feature5_title: "ปฐมพยาบาลและการคัดกรอง",
            feature5_desc: "การคัดกรองทางการแพทย์แบบมืออาชีพด้วยโปรโตคอลแบ่งตามสี (แดง/ส้ม/เหลือง/เขียว) และคำแนะนำชุดปฐมพยาบาลอัจฉริยะ",
            feature5_item1: "✓ ระบบคัดกรอง 4 ระดับ",
            feature5_item2: "✓ โปรโตคอลแบบโต้ตอบ",
            feature5_item3: "✓ คำแนะนำชุดปฐมพยาบาล",
            feature5_item4: "✓ คำแนะนำทีละขั้นตอน",
            
            // Feature 6: Community & Alerts
            feature6_title: "ชุมชนและการแจ้งเตือน",
            feature6_desc: "การแจ้งเตือนภัยพิบัติจากรัฐบาล รายงานอันตรายจากชุมชน คุณสมบัติขอความช่วยเหลือ และการแจ้งเตือนฉุกเฉินแบบเรียลไทม์",
            feature6_item1: "✓ การแจ้งเตือนจากรัฐบาล (ประเทศไทย)",
            feature6_item2: "✓ รายงานอันตรายจากชุมชน",
            feature6_item3: "✓ ขอความช่วยเหลือใกล้เคียง",
            feature6_item4: "✓ การออกอากาศฉุกเฉิน",
            
            // Feature 7: Rush Map
            feature7_title: "แผนที่รวดเร็ว",
            feature7_desc: "ค้นหาบริการฉุกเฉินที่ใกล้ที่สุดทันที สถานีตำรวจและโรงพยาบาลใกล้คุณพร้อมการนำทางและโทรศัพท์แบบแตะเดียว",
            feature7_item1: "✓ สถานีตำรวจที่ใกล้ที่สุด",
            feature7_item2: "✓ โรงพยาบาลที่ใกล้ที่สุด",
            feature7_item3: "✓ การนำทาง GPS",
            feature7_item4: "✓ โทรแบบแตะเดียว",
            
            // Feature 8: Rescue Game
            feature8_title: "เกมช่วยชีวิต",
            feature8_desc: "เกมฝึกอบรมฉุกเฉินแบบโต้ตอบพร้อมสถานการณ์จริง ฝึกทักษะช่วยชีวิต รับเหรียญตรา และปลดล็อกความสำเร็จ",
            feature8_item1: "✓ สถานการณ์ฉุกเฉินจริง",
            feature8_item2: "✓ การฝึกอบรมลมแดดและงูกัด",
            feature8_item3: "✓ เหรียญตราและความสำเร็จ",
            feature8_item4: "✓ ระบบพัฒนาทักษะ",
            
            // Feature 9: QR Scanner
            feature9_title: "สแกน QR Code",
            feature9_desc: "สแกน QR code ทางการแพทย์ฉุกเฉินเพื่อเข้าถึงข้อมูลผู้ป่วย เข้าร่วมทีม และเข้าถึงโปรโตคอลฉุกเฉินทันที",
            feature9_item1: "✓ การสแกนโปรไฟล์ทางการแพทย์",
            feature9_item2: "✓ การเข้าร่วมทีมผ่าน QR",
            feature9_item3: "✓ การเข้าถึงข้อมูลฉุกเฉินอย่างรวดเร็ว",
            feature9_item4: "✓ ได้รับการปกป้องความเป็นส่วนตัว"
        },
        zh: {
            // Feature 1: SOS Smart
            feature1_title: "智能 SOS",
            feature1_desc: "智能 SOS 按钮，具有触觉反馈、闪光摩尔斯电码、自动短信、自动呼叫和 5 秒视频录制功能，并保护隐私。",
            feature1_item1: "✓ 自动呼叫和自动短信 (... --- ...)",
            feature1_item2: "✓ 摩尔斯电码闪光",
            feature1_item3: "✓ 隐私保护视频录制",
            feature1_item4: "✓ 紧急警报",
            
            // Feature 2: AI Emergency Nurse
            feature2_title: "AI 急救护士",
            feature2_desc: "24/7 AI 医疗助手，配备红十字协议、分诊评估和 4 种语言的急救包指导。",
            feature2_item1: "✓ 支持语音和图像",
            feature2_item2: "✓ ABC+D 分诊协议",
            feature2_item3: "✓ EN / FR / TH / ZH 语言",
            feature2_item4: "✓ 急救包集成",
            
            // Feature 3: Team Connect
            feature3_title: "团队连接",
            feature3_desc: "创建并协调紧急团队。实时位置共享、语音消息团队警报和二维码加入。",
            feature3_item1: "✓ 团队创建和管理",
            feature3_item2: "✓ 实时 GPS 跟踪",
            feature3_item3: "✓ 语音消息警报",
            feature3_item4: "✓ 二维码加入团队",
            
            // Feature 4: Emergency Profile
            feature4_title: "紧急档案",
            feature4_desc: "完整的医疗档案，包含血型、过敏史、药物、保险和隐私控制的二维码，供急救人员使用。",
            feature4_item1: "✓ 病史和过敏史",
            feature4_item2: "✓ 紧急联系人",
            feature4_item3: "✓ 带隐私设置的二维码",
            feature4_item4: "✓ 保险信息",
            
            // Feature 5: First Aid & Triage
            feature5_title: "急救和分诊",
            feature5_desc: "专业医疗分诊，配有颜色编码协议（红/橙/黄/绿）和智能急救包建议。",
            feature5_item1: "✓ 4 级分诊系统",
            feature5_item2: "✓ 交互式协议",
            feature5_item3: "✓ 急救包指导",
            feature5_item4: "✓ 分步说明",
            
            // Feature 6: Community & Alerts
            feature6_title: "社区和警报",
            feature6_desc: "政府灾害警报、社区危险报告、请求帮助功能和实时紧急通知。",
            feature6_item1: "✓ 政府警报（泰国）",
            feature6_item2: "✓ 社区危险报告",
            feature6_item3: "✓ 请求附近帮助",
            feature6_item4: "✓ 紧急广播",
            
            // Feature 7: Rush Map
            feature7_title: "快速地图",
            feature7_desc: "即时查找最近的紧急服务。附近的警察局和医院，一键导航和呼叫。",
            feature7_item1: "✓ 最近的警察局",
            feature7_item2: "✓ 最近的医院",
            feature7_item3: "✓ GPS 导航",
            feature7_item4: "✓ 一键呼叫",
            
            // Feature 8: Rescue Game
            feature8_title: "救援游戏",
            feature8_desc: "交互式紧急训练游戏，包含真实场景。练习救生技能，获得徽章并解锁成就。",
            feature8_item1: "✓ 真实紧急场景",
            feature8_item2: "✓ 中暑和蛇咬伤训练",
            feature8_item3: "✓ 徽章和成就",
            feature8_item4: "✓ 技能进度系统",
            
            // Feature 9: QR Scanner
            feature9_title: "二维码扫描仪",
            feature9_desc: "扫描紧急医疗二维码以访问患者信息、加入团队并即时访问紧急协议。",
            feature9_item1: "✓ 医疗档案扫描",
            feature9_item2: "✓ 二维码加入团队",
            feature9_item3: "✓ 快速访问紧急数据",
            feature9_item4: "✓ 隐私保护"
        }
    }
};

// Initialize translation system
function initTranslations() {
    const currentLang = localStorage.getItem('resq_lang') || detectLanguage();
    applyTranslations(currentLang);
    setupLanguageSelector();
}

// Detect user's language
function detectLanguage() {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('th')) return 'th';
    if (browserLang.startsWith('zh')) return 'zh';
    return 'en';
}

// Apply translations to page
function applyTranslations(lang) {
    // Translate elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const [section, ...path] = key.split('.');
        
        let translation = TRANSLATIONS[section]?.[lang];
        for (const p of path) {
            translation = translation?.[p];
        }
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.type !== 'submit') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Translate alt attributes with data-i18n-alt
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        const [section, ...path] = key.split('.');
        
        let translation = TRANSLATIONS[section]?.[lang];
        for (const p of path) {
            translation = translation?.[p];
        }
        
        if (translation) {
            element.alt = translation;
        }
    });
    
    // Translate placeholders with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const [section, ...path] = key.split('.');
        
        let translation = TRANSLATIONS[section]?.[lang];
        for (const p of path) {
            translation = translation?.[p];
        }
        
        if (translation) {
            element.placeholder = translation;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Save preference
    localStorage.setItem('resq_lang', lang);
    
    // Refresh social share buttons if available
    if (window.SocialShare && typeof window.SocialShare.refresh === 'function') {
        window.SocialShare.refresh();
    }
    
    // Refresh countdown timer if available
    if (window.CountdownTimer && typeof window.CountdownTimer.restart === 'function') {
        window.CountdownTimer.restart();
    }
    
    // Refresh newsletter popup if available
    if (window.NewsletterPopup && typeof window.NewsletterPopup.refresh === 'function') {
        window.NewsletterPopup.refresh();
    }
}

// Setup language selector
function setupLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (selector) {
        const currentLang = localStorage.getItem('resq_lang') || localStorage.getItem('selectedLanguage') || 'en';
        selector.value = currentLang;
        
        selector.addEventListener('change', (e) => {
            applyTranslations(e.target.value);
        });
    }
}

// Expose TRANSLATIONS globally for other scripts
window.TRANSLATIONS = TRANSLATIONS;

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTranslations);
} else {
    initTranslations();
}
