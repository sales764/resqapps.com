/**
 * GLOBAL TRANSLATIONS FOR ALL PAGES
 * Supports: EN, FR, TH
 */

 const TRANSLATION_SUPPORTED_LANGUAGES = ['en', 'fr', 'th'];

 function normalizeTranslationLanguage(lang) {
     return TRANSLATION_SUPPORTED_LANGUAGES.includes(lang) ? lang : 'en';
 }

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
        }
    },
    
    // Screenshots Section
    screenshots: {
        en: {
            coming_soon_title: "View Screenshots on Google Play!",
            coming_soon_message: "RESQ+ is now available! See professional screenshots of our AI Medical Nurse, Team Coordination, and Emergency Training features directly on the Google Play Store. Download now and explore all the life-saving features.",
            launching_soon: "🚀 View on Google Play"
        },
        fr: {
            coming_soon_title: "Voir les Captures d'écran sur Google Play !",
            coming_soon_message: "RESQ+ est maintenant disponible ! Voir les captures d'écran professionnelles de notre Infirmière Médicale IA, Coordination d'Équipe et fonctionnalités de Formation aux Urgences directement sur Google Play Store. Téléchargez maintenant et explorez toutes les fonctionnalités qui sauvent des vies.",
            launching_soon: "🚀 Voir sur Google Play"
        },
        th: {
            coming_soon_title: "ดูภาพหน้าจอบน Google Play!",
            coming_soon_message: "RESQ+ พร้อมใช้งานแล้ว! ดูภาพหน้าจออย่างมืออาชีพของพยาบาล AI ทางการแพทย์ การประสานงานทีม และคุณสมบัติการฝึกอบรมฉุกเฉินโดยตรงบน Google Play Store ดาวน์โหลดตอนนี้และสำรวจคุณสมบัติที่ช่วยชีวิตทั้งหมด",
            launching_soon: "🚀 ดูบน Google Play"
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
        }
    },
    
    // Newsletter Popup
    newsletter: {
        en: {
            title: "📧 Stay Updated!",
            subtitle: "Get product updates & exclusive news",
            description: "Get updates about RESQ+ improvements, emergency guidance features, and important product news.",
            placeholder: "Enter your email",
            buttonText: "Get Updates",
            privacyText: "We respect your privacy. Unsubscribe anytime.",
            successTitle: "🎉 You're In!",
            successMessage: "Check your inbox for confirmation.",
            contactLabel: "Or contact us directly:"
        },
        fr: {
            title: "📧 Restez Informé!",
            subtitle: "Recevez des mises à jour produit et des nouvelles exclusives",
            description: "Recevez des nouvelles sur les améliorations de RESQ+, les fonctions de guidage d'urgence et les actualités importantes du produit.",
            placeholder: "Entrez votre email",
            buttonText: "Recevoir les mises à jour",
            privacyText: "Nous respectons votre vie privée. Désabonnement à tout moment.",
            successTitle: "🎉 C'est Fait!",
            successMessage: "Vérifiez votre boîte mail pour confirmation.",
            contactLabel: "Ou contactez-nous directement:"
        },
        th: {
            title: "📧 ติดตามข่าวสาร!",
            subtitle: "รับอัปเดตสินค้าและข่าวสารพิเศษ",
            description: "รับข่าวเกี่ยวกับการปรับปรุง RESQ+, ฟีเจอร์คำแนะนำฉุกเฉิน และข่าวสารสำคัญของผลิตภัณฑ์",
            placeholder: "ใส่อีเมลของคุณ",
            buttonText: "รับอัปเดต",
            privacyText: "เราเคารพความเป็นส่วนตัวของคุณ ยกเลิกได้ทุกเมื่อ",
            successTitle: "🎉 เสร็จแล้ว!",
            successMessage: "ตรวจสอบอีเมลของคุณเพื่อยืนยัน",
            contactLabel: "หรือติดต่อเราโดยตรง:"
        }
    },
    
    // Feature translations
    features: {
        en: {
            // Feature 1: SOS Smart
            feature1_title: "SOS Smart",
            feature1_desc: "Emergency SOS with flash Morse code, emergency recording, SMS alerts, and sound alert tools.",
            feature1_item1: "✓ Flash Morse code (... --- ...)",
            feature1_item2: "✓ Emergency recording",
            feature1_item3: "✓ SMS alerts",
            feature1_item4: "✓ Sound alert tools",
            
            // Feature 2: AI Emergency Nurse
            feature2_title: "AI Emergency Nurse",
            feature2_desc: "AI medical guidance customized to your family's medical profiles and specific first aid kit inventory. Voice/image input with ABC+D triage.",
            feature2_item1: "✓ Voice & image support",
            feature2_item2: "✓ ABC+D triage protocol",
            feature2_item3: "✓ Family medical profiles",
            feature2_item4: "✓ Exact kit inventory match",
            
            // Feature 3: Team Connect
            feature3_title: "Team Connect",
            feature3_desc: "Create and coordinate with emergency teams. Real-time location sharing, team alerts with voice messages, and QR code joining.",
            feature3_item1: "✓ Team creation & management",
            feature3_item2: "✓ Real-time GPS tracking",
            feature3_item3: "✓ Voice message alerts",
            feature3_item4: "✓ QR code team joining",
            
            // Feature 4: Emergency Profile
            feature4_title: "Emergency Profile",
            feature4_desc: "Store medical details, contacts, and insurance locally on your device, with privacy controls for emergency information sharing.",
            feature4_item1: "✓ Medical history & allergies",
            feature4_item2: "✓ Emergency contacts",
            feature4_item3: "✓ QR sharing settings",
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
            feature6_desc: "Community danger reports, nearby help requests, and emergency notifications.",
            feature6_item1: "✓ Community alert feed",
            feature6_item2: "✓ Community danger reports",
            feature6_item3: "✓ Request help nearby",
            feature6_item4: "✓ Push notifications",
            
            // Feature 7: Rush Map
            feature7_title: "Rush Map",
            feature7_desc: "Find nearest emergency services instantly. Police stations and hospitals near you with one-tap navigation and calling.",
            feature7_item1: "✓ Nearest police stations",
            feature7_item2: "✓ Nearest hospitals",
            feature7_item3: "✓ GPS navigation",
            feature7_item4: "✓ One-tap calling",
            
            // Feature 8: Weather, Marine & Utility Tools
            feature8_title: "Weather, Marine & Utility Tools",
            feature8_desc: "Access weather conditions, marine forecasts, navigation tools, compass modes, and a bubble level from one app.",
            feature8_item1: "✓ Weather screen",
            feature8_item2: "✓ Marine dashboard & forecast",
            feature8_item3: "✓ Compass & Qibla tools",
            feature8_item4: "✓ Bubble level utility",
            
            // Feature 9: QR Scanner & Sharing
            feature9_title: "QR Scanner & Sharing",
            feature9_desc: "Use QR tools for team joining and manage which emergency profile details are prepared for QR sharing.",
            feature9_item1: "✓ Team QR joining",
            feature9_item2: "✓ Camera QR scanning",
            feature9_item3: "✓ Emergency profile sharing settings",
            feature9_item4: "✓ Privacy controls"
        },
        fr: {
            // Feature 1: SOS Smart
            feature1_title: "SOS Intelligent",
            feature1_desc: "SOS d'urgence avec code Morse lumineux, enregistrement d'urgence, alertes SMS et outils d'alerte sonore.",
            feature1_item1: "✓ Code Morse lumineux (... --- ...)",
            feature1_item2: "✓ Enregistrement d'urgence",
            feature1_item3: "✓ Alertes SMS",
            feature1_item4: "✓ Outils d'alerte sonore",
            
            // Feature 2: AI Emergency Nurse
            feature2_title: "Infirmière d'Urgence IA",
            feature2_desc: "Assistance médicale par IA personnalisée selon les profils médicaux familiaux et le contenu exact de votre trousse de secours. Saisie vocale/image avec triage ABC+D.",
            feature2_item1: "✓ Support vocal et image",
            feature2_item2: "✓ Protocole de triage ABC+D",
            feature2_item3: "✓ Profils médicaux familiaux",
            feature2_item4: "✓ Inventaire exact de la trousse",
            
            // Feature 3: Team Connect
            feature3_title: "Connexion d'Équipe",
            feature3_desc: "Créez et coordonnez avec des équipes d'urgence. Partage de localisation en temps réel, alertes d'équipe avec messages vocaux et adhésion par code QR.",
            feature3_item1: "✓ Création et gestion d'équipe",
            feature3_item2: "✓ Suivi GPS en temps réel",
            feature3_item3: "✓ Alertes par message vocal",
            feature3_item4: "✓ Adhésion d'équipe par code QR",
            
            // Feature 4: Emergency Profile
            feature4_title: "Profil d'Urgence",
            feature4_desc: "Stockez les informations médicales, contacts et assurances localement sur votre appareil, avec des contrôles de confidentialité pour le partage d'informations d'urgence.",
            feature4_item1: "✓ Antécédents médicaux et allergies",
            feature4_item2: "✓ Contacts d'urgence",
            feature4_item3: "✓ Paramètres de partage QR",
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
            feature6_desc: "Rapports de danger communautaires, demandes d'aide à proximité et notifications d'urgence.",
            feature6_item1: "✓ Flux d'alertes communautaires",
            feature6_item2: "✓ Rapports de danger communautaires",
            feature6_item3: "✓ Demander de l'aide à proximité",
            feature6_item4: "✓ Notifications push",
            
            // Feature 7: Rush Map
            feature7_title: "Carte Express",
            feature7_desc: "Trouvez instantanément les services d'urgence les plus proches. Commissariats et hôpitaux près de vous avec navigation et appel en un clic.",
            feature7_item1: "✓ Commissariats les plus proches",
            feature7_item2: "✓ Hôpitaux les plus proches",
            feature7_item3: "✓ Navigation GPS",
            feature7_item4: "✓ Appel en un clic",
            
            // Feature 8: Weather, Marine & Utility Tools
            feature8_title: "Météo, Marine et Outils",
            feature8_desc: "Accédez aux conditions météo, prévisions marines, outils de navigation, modes boussole et niveau à bulle dans une seule application.",
            feature8_item1: "✓ Écran météo",
            feature8_item2: "✓ Tableau de bord et prévisions marines",
            feature8_item3: "✓ Outils boussole et Qibla",
            feature8_item4: "✓ Niveau à bulle",
            
            // Feature 9: QR Scanner & Sharing
            feature9_title: "Scanner et Partage QR",
            feature9_desc: "Utilisez les outils QR pour rejoindre une équipe et gérer les informations du profil d'urgence préparées pour le partage QR.",
            feature9_item1: "✓ Rejoindre une équipe par QR",
            feature9_item2: "✓ Scan QR avec caméra",
            feature9_item3: "✓ Paramètres de partage du profil d'urgence",
            feature9_item4: "✓ Contrôles de confidentialité"
        },
        th: {
            // Feature 1: SOS Smart
            feature1_title: "SOS อัจฉริยะ",
            feature1_desc: "SOS ฉุกเฉินพร้อมไฟแฟลชรหัสมอร์ส การบันทึกเหตุฉุกเฉิน การแจ้งเตือน SMS และเครื่องมือแจ้งเตือนด้วยเสียง",
            feature1_item1: "✓ แฟลชรหัสมอร์ส (... --- ...)",
            feature1_item2: "✓ การบันทึกเหตุฉุกเฉิน",
            feature1_item3: "✓ การแจ้งเตือน SMS",
            feature1_item4: "✓ เครื่องมือแจ้งเตือนด้วยเสียง",
            
            // Feature 2: AI Emergency Nurse
            feature2_title: "พยาบาลฉุกเฉิน AI",
            feature2_desc: "คำแนะนำทางการแพทย์จาก AI ที่ปรับแต่งตามโปรไฟล์ทางการแพทย์ของครอบครัวและชุดปฐมพยาบาลของคุณโดยเฉพาะ พร้อมประเมินการคัดกรอง ABC+D",
            feature2_item1: "✓ รองรับเสียงและรูปภาพ",
            feature2_item2: "✓ โปรโตคอลการคัดกรอง ABC+D",
            feature2_item3: "✓ โปรไฟล์ทางการแพทย์ของครอบครัว",
            feature2_item4: "✓ วิเคราะห์ตามชุดปฐมพยาบาลของคุณ",
            
            // Feature 3: Team Connect
            feature3_title: "เชื่อมต่อทีม",
            feature3_desc: "สร้างและประสานงานกับทีมฉุกเฉิน แชร์ตำแหน่งแบบเรียลไทม์ การแจ้งเตือนทีมด้วยข้อความเสียง และเข้าร่วมผ่าน QR code",
            feature3_item1: "✓ การสร้างและจัดการทีม",
            feature3_item2: "✓ ติดตาม GPS แบบเรียลไทม์",
            feature3_item3: "✓ การแจ้งเตือนด้วยข้อความเสียง",
            feature3_item4: "✓ เข้าร่วมทีมผ่าน QR code",
            
            // Feature 4: Emergency Profile
            feature4_title: "โปรไฟล์ฉุกเฉิน",
            feature4_desc: "จัดเก็บข้อมูลทางการแพทย์ ผู้ติดต่อ และประกันไว้ในอุปกรณ์ของคุณ พร้อมตัวควบคุมความเป็นส่วนตัวสำหรับการแชร์ข้อมูลฉุกเฉิน",
            feature4_item1: "✓ ประวัติทางการแพทย์และภูมิแพ้",
            feature4_item2: "✓ ผู้ติดต่อฉุกเฉิน",
            feature4_item3: "✓ การตั้งค่าการแชร์ QR",
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
            feature6_desc: "รายงานอันตรายจากชุมชน การขอความช่วยเหลือใกล้เคียง และการแจ้งเตือนฉุกเฉิน",
            feature6_item1: "✓ ฟีดการแจ้งเตือนชุมชน",
            feature6_item2: "✓ รายงานอันตรายจากชุมชน",
            feature6_item3: "✓ ขอความช่วยเหลือใกล้เคียง",
            feature6_item4: "✓ การแจ้งเตือนแบบพุช",
            
            // Feature 7: Rush Map
            feature7_title: "แผนที่รวดเร็ว",
            feature7_desc: "ค้นหาบริการฉุกเฉินที่ใกล้ที่สุดทันที สถานีตำรวจและโรงพยาบาลใกล้คุณพร้อมการนำทางและโทรศัพท์แบบแตะเดียว",
            feature7_item1: "✓ สถานีตำรวจที่ใกล้ที่สุด",
            feature7_item2: "✓ โรงพยาบาลที่ใกล้ที่สุด",
            feature7_item3: "✓ การนำทาง GPS",
            feature7_item4: "✓ โทรแบบแตะเดียว",
            
            // Feature 8: Weather, Marine & Utility Tools
            feature8_title: "อากาศ ทะเล และเครื่องมือ",
            feature8_desc: "เข้าถึงสภาพอากาศ การพยากรณ์ทางทะเล เครื่องมือนำทาง โหมดเข็มทิศ และระดับน้ำในแอปเดียว",
            feature8_item1: "✓ หน้าจอสภาพอากาศ",
            feature8_item2: "✓ แดชบอร์ดและพยากรณ์ทางทะเล",
            feature8_item3: "✓ เครื่องมือเข็มทิศและกิบละห์",
            feature8_item4: "✓ ระดับน้ำ",
            
            // Feature 9: QR Scanner & Sharing
            feature9_title: "สแกนและแชร์ QR",
            feature9_desc: "ใช้เครื่องมือ QR เพื่อเข้าร่วมทีมและจัดการว่าข้อมูลโปรไฟล์ฉุกเฉินใดถูกเตรียมไว้สำหรับการแชร์ผ่าน QR",
            feature9_item1: "✓ เข้าร่วมทีมด้วย QR",
            feature9_item2: "✓ สแกน QR ด้วยกล้อง",
            feature9_item3: "✓ การตั้งค่าการแชร์โปรไฟล์ฉุกเฉิน",
            feature9_item4: "✓ ตัวควบคุมความเป็นส่วนตัว"
        }
    }
};

// Initialize translation system
function initTranslations() {
    const currentLang = 'en';
    applyTranslations(currentLang);
    setupLanguageSelector();
}

// Detect user's language
function detectLanguage() {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('th')) return 'th';
    return 'en';
}

// Apply translations to page
function applyTranslations(lang) {
    const safeLang = normalizeTranslationLanguage(lang);

    // Translate elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const [section, ...path] = key.split('.');
        
        let translation = TRANSLATIONS[section]?.[safeLang];
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
        
        let translation = TRANSLATIONS[section]?.[safeLang];
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
        
        let translation = TRANSLATIONS[section]?.[safeLang];
        for (const p of path) {
            translation = translation?.[p];
        }
        
        if (translation) {
            element.placeholder = translation;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = safeLang;
    
    // Save preference
    localStorage.setItem('resq_lang', safeLang);
    localStorage.setItem('selectedLanguage', safeLang);
    
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
        const currentLang = normalizeTranslationLanguage(localStorage.getItem('resq_lang') || localStorage.getItem('selectedLanguage') || 'en');
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



const NEW_FEATURES_EN = {
    feature1_title: "SOS Smart System",
    feature1_desc: "Advanced emergency activation with flash morse code, automatic video recording, SMS alerts, and sound alert system.",
    feature1_item1: "✓ Flash morse code (... --- ...)",
    feature1_item2: "✓ Auto-recording with timer",
    feature1_item3: "✓ SMS emergency alerts",
    feature1_item4: "✓ Sound alert system",

    feature2_title: "AI Emergency Nurse",
    feature2_desc: "AI medical guidance customized to your family's medical profiles and specific first aid kit inventory. Voice/image input with ABC+D triage.",
    feature2_item1: "✓ Voice & image support",
    feature2_item2: "✓ ABC+D triage protocol",
    feature2_item3: "✓ Family medical profiles",
    feature2_item4: "✓ Exact kit inventory match",

    feature3_title: "Team Connect",
    feature3_desc: "Create and coordinate with emergency teams. Real-time location sharing, team alerts with voice messages, and QR code joining.",
    feature3_item1: "✓ Team creation & management",
    feature3_item2: "✓ Real-time GPS tracking",
    feature3_item3: "✓ Voice message alerts",
    feature3_item4: "✓ QR code team joining",

    feature4_title: "Emergency Profile",
    feature4_desc: "Store medical details, contacts, and insurance locally on your device, with privacy controls for emergency information sharing.",
    feature4_item1: "✓ Medical history & allergies",
    feature4_item2: "✓ Emergency contacts",
    feature4_item3: "✓ QR sharing settings",
    feature4_item4: "✓ Insurance information",

    feature5_title: "First Aid & Triage",
    feature5_desc: "Professional medical triage with color-coded protocols (RED/ORANGE/YELLOW/GREEN) and smart first aid kit recommendations.",
    feature5_item1: "✓ 4-level triage system",
    feature5_item2: "✓ Interactive protocols",
    feature5_item3: "✓ First aid kit guidance",
    feature5_item4: "✓ Step-by-step instructions",

    feature6_title: "Community & Alerts",
    feature6_desc: "Community danger reports, nearby help requests, and emergency notifications.",
    feature6_item1: "✓ Community alert feed",
    feature6_item2: "✓ Community danger reports",
    feature6_item3: "✓ Request help nearby",
    feature6_item4: "✓ Push notifications",

    feature7_title: "Global Emergency Directory",
    feature7_desc: "Automatic region detection updates local emergency numbers instantly (Police, Ambulance, Fire, Mental Health) wherever you travel.",
    feature7_item1: "✓ Auto region detection",
    feature7_item2: "✓ Local police & ambulance",
    feature7_item3: "✓ Offline directory",
    feature7_item4: "✓ One-tap dialing",

    feature8_title: "My First Aid Kit",
    feature8_desc: "Manage your medical supplies with a digital inventory. Track completion status, add custom items, and store locally offline.",
    feature8_item1: "✓ Digital supply inventory",
    feature8_item2: "✓ Completion tracking",
    feature8_item3: "✓ Custom equipment",
    feature8_item4: "✓ Offline local storage",

    feature9_title: "Weather & Utility Tools",
    feature9_desc: "Access real-time weather, multiple compass modes (Standard, Telescope, Qibla), and a bubble level all in one app.",
    feature9_item1: "✓ Real-time weather",
    feature9_item2: "✓ Standard & Qibla compass",
    feature9_item3: "✓ Bubble level",
    feature9_item4: "✓ Usable without internet",

    feature10_title: "Rescue Game",
    feature10_desc: "Interactive emergency training with real-life scenarios. Practice life-saving skills, earn badges, and unlock achievements.",
    feature10_item1: "✓ Interactive scenarios",
    feature10_item2: "✓ Earn skill badges",
    feature10_item3: "✓ Heatstroke & snakebite",
    feature10_item4: "✓ Progression system",

    feature11_title: "QR Scanner & Sharing",
    feature11_desc: "Use QR tools for team joining and manage which emergency profile details are prepared for QR sharing.",
    feature11_item1: "✓ Team QR joining",
    feature11_item2: "✓ Camera QR scanning",
    feature11_item3: "✓ Privacy controls",
    feature11_item4: "✓ Emergency sharing"
};

const NEW_FEATURES_FR = {
    feature1_title: "Système SOS Intelligent",
    feature1_desc: "Activation d'urgence avancée avec code morse lumineux, enregistrement vidéo automatique, alertes SMS et alerte sonore.",
    feature1_item1: "✓ Code morse lumineux (... --- ...)",
    feature1_item2: "✓ Auto-enregistrement avec minuteur",
    feature1_item3: "✓ Alertes d'urgence SMS",
    feature1_item4: "✓ Système d'alerte sonore",

    feature2_title: "IA Infirmière d'Urgence",
    feature2_desc: "Assistance médicale par IA personnalisée selon les profils médicaux familiaux et le contenu exact de votre trousse de secours. Saisie vocale/image avec triage ABC+D.",
    feature2_item1: "✓ Support vocal et d'images",
    feature2_item2: "✓ Protocole de triage ABC+D",
    feature2_item3: "✓ Profils médicaux familiaux",
    feature2_item4: "✓ Inventaire exact de la trousse",

    feature3_title: "Connexion d'Équipe",
    feature3_desc: "Créez et coordonnez vos équipes d'urgence. Partage de position en temps réel, alertes avec messages vocaux et invitation par code QR.",
    feature3_item1: "✓ Création et gestion d'équipe",
    feature3_item2: "✓ Suivi GPS en temps réel",
    feature3_item3: "✓ Messages vocaux d'alerte",
    feature3_item4: "✓ Rejoindre par code QR",

    feature4_title: "Profil d'Urgence",
    feature4_desc: "Stockez localement vos antécédents médicaux, contacts et assurances, avec des paramètres de confidentialité stricts pour le partage.",
    feature4_item1: "✓ Antécédents médicaux & allergies",
    feature4_item2: "✓ Contacts d'urgence",
    feature4_item3: "✓ Paramètres de partage QR",
    feature4_item4: "✓ Informations d'assurance",

    feature5_title: "Premiers Soins et Triage",
    feature5_desc: "Triage médical professionnel avec protocoles par code couleur (ROUGE/ORANGE/JAUNE/VERT) et recommandations intelligentes.",
    feature5_item1: "✓ Système de triage à 4 niveaux",
    feature5_item2: "✓ Protocoles interactifs",
    feature5_item3: "✓ Conseils trousse de secours",
    feature5_item4: "✓ Instructions étape par étape",

    feature6_title: "Communauté et Alertes",
    feature6_desc: "Signalez des dangers, demandez de l'aide à proximité et recevez des notifications d'urgence locales.",
    feature6_item1: "✓ Fil d'alertes communautaires",
    feature6_item2: "✓ Signalement de dangers",
    feature6_item3: "✓ Demande d'aide à proximité",
    feature6_item4: "✓ Notifications push",

    feature7_title: "Annuaire d'Urgence Global",
    feature7_desc: "Détection automatique de la région mettant à jour instantanément les numéros locaux (Police, Ambulance, Pompiers) lors de vos voyages.",
    feature7_item1: "✓ Détection auto de la région",
    feature7_item2: "✓ Police & ambulance locales",
    feature7_item3: "✓ Annuaire hors-ligne",
    feature7_item4: "✓ Appel en un clic",

    feature8_title: "Ma Trousse de Secours",
    feature8_desc: "Gérez votre matériel médical avec un inventaire numérique. Suivez son état, ajoutez des objets personnalisés et stockez localement.",
    feature8_item1: "✓ Inventaire numérique",
    feature8_item2: "✓ Suivi de complétion",
    feature8_item3: "✓ Équipements personnalisés",
    feature8_item4: "✓ Stockage local hors-ligne",

    feature9_title: "Météo, Boussoles & Outils",
    feature9_desc: "Accédez à la météo en temps réel, aux différents modes de boussole (Standard, Télescope, Qibla) et à un niveau à bulle.",
    feature9_item1: "✓ Météo en temps réel",
    feature9_item2: "✓ Boussole Standard & Qibla",
    feature9_item3: "✓ Niveau à bulle",
    feature9_item4: "✓ Utilisable sans internet",

    feature10_title: "Jeu de Sauvetage",
    feature10_desc: "Entraînement interactif aux urgences avec des scénarios réels. Pratiquez vos compétences, gagnez des badges et progressez.",
    feature10_item1: "✓ Scénarios interactifs",
    feature10_item2: "✓ Gagnez des badges",
    feature10_item3: "✓ Insolation et morsure de serpent",
    feature10_item4: "✓ Système de progression",

    feature11_title: "Scanner et Partage QR",
    feature11_desc: "Utilisez les outils QR pour rejoindre des équipes et gérer les informations médicales préparées pour le partage d'urgence.",
    feature11_item1: "✓ Rejoindre une équipe par QR",
    feature11_item2: "✓ Scanner avec la caméra",
    feature11_item3: "✓ Contrôles de confidentialité",
    feature11_item4: "✓ Partage d'urgence"
};

const NEW_FEATURES_TH = {
    feature1_title: "ระบบ SOS อัจฉริยะ",
    feature1_desc: "การเปิดใช้งานฉุกเฉินขั้นสูงด้วยรหัสมอร์สแบบแฟลช การบันทึกวิดีโออัตโนมัติ การแจ้งเตือนผ่าน SMS และระบบเสียงเตือน",
    feature1_item1: "✓ รหัสมอร์สแบบแฟลช (... --- ...)",
    feature1_item2: "✓ บันทึกวิดีโออัตโนมัติพร้อมตัวจับเวลา",
    feature1_item3: "✓ การแจ้งเตือนฉุกเฉินผ่าน SMS",
    feature1_item4: "✓ ระบบเสียงเตือนภัย",

    feature2_title: "พยาบาลฉุกเฉิน AI",
    feature2_desc: "คำแนะนำทางการแพทย์จาก AI ที่ปรับแต่งตามโปรไฟล์ทางการแพทย์ของครอบครัวและชุดปฐมพยาบาลของคุณโดยเฉพาะ พร้อมประเมินการคัดกรอง ABC+D",
    feature2_item1: "✓ รองรับการป้อนข้อมูลด้วยเสียงและภาพ",
    feature2_item2: "✓ โปรโตคอลการคัดกรอง ABC+D",
    feature2_item3: "✓ โปรไฟล์ทางการแพทย์ของครอบครัว",
    feature2_item4: "✓ วิเคราะห์ตามชุดปฐมพยาบาลของคุณ",

    feature3_title: "การเชื่อมต่อทีม",
    feature3_desc: "สร้างและประสานงานกับทีมฉุกเฉิน การแชร์ตำแหน่งแบบเรียลไทม์ การแจ้งเตือนทีมด้วยข้อความเสียง และการเข้าร่วมด้วย QR code",
    feature3_item1: "✓ การสร้างและการจัดการทีม",
    feature3_item2: "✓ การติดตาม GPS แบบเรียลไทม์",
    feature3_item3: "✓ การแจ้งเตือนด้วยข้อความเสียง",
    feature3_item4: "✓ การเข้าร่วมทีมด้วย QR code",

    feature4_title: "โปรไฟล์ฉุกเฉิน",
    feature4_desc: "จัดเก็บรายละเอียดทางการแพทย์ รายชื่อติดต่อ และประกันภัยแบบออฟไลน์บนอุปกรณ์ของคุณ พร้อมการควบคุมความเป็นส่วนตัว",
    feature4_item1: "✓ ประวัติทางการแพทย์และอาการแพ้",
    feature4_item2: "✓ รายชื่อผู้ติดต่อฉุกเฉิน",
    feature4_item3: "✓ การตั้งค่าการแชร์ QR",
    feature4_item4: "✓ ข้อมูลการประกันภัย",

    feature5_title: "การปฐมพยาบาลและการคัดกรอง",
    feature5_desc: "การคัดกรองทางการแพทย์อย่างมืออาชีพพร้อมโปรโตคอลรหัสสี (แดง/ส้ม/เหลือง/เขียว) และคำแนะนำชุดปฐมพยาบาลอัจฉริยะ",
    feature5_item1: "✓ ระบบการคัดกรอง 4 ระดับ",
    feature5_item2: "✓ โปรโตคอลแบบโต้ตอบ",
    feature5_item3: "✓ คำแนะนำเกี่ยวกับชุดปฐมพยาบาล",
    feature5_item4: "✓ คำแนะนำทีละขั้นตอน",

    feature6_title: "ชุมชนและการแจ้งเตือน",
    feature6_desc: "รายงานอันตรายในชุมชน การขอความช่วยเหลือในบริเวณใกล้เคียง และการแจ้งเตือนเหตุฉุกเฉิน",
    feature6_item1: "✓ ฟีดการแจ้งเตือนของชุมชน",
    feature6_item2: "✓ รายงานอันตรายในชุมชน",
    feature6_item3: "✓ ขอความช่วยเหลือใกล้เคียง",
    feature6_item4: "✓ การแจ้งเตือนแบบพุช",

    feature7_title: "ไดเรกทอรีฉุกเฉินทั่วโลก",
    feature7_desc: "ระบบตรวจจับภูมิภาคอัตโนมัติจะอัปเดตหมายเลขฉุกเฉินในพื้นที่ทันที (ตำรวจ, รถพยาบาล, ดับเพลิง) ทุกที่ที่คุณเดินทาง",
    feature7_item1: "✓ ตรวจจับภูมิภาคอัตโนมัติ",
    feature7_item2: "✓ ตำรวจและรถพยาบาลท้องถิ่น",
    feature7_item3: "✓ ไดเรกทอรีแบบออฟไลน์",
    feature7_item4: "✓ โทรออกด้วยการแตะเพียงครั้งเดียว",

    feature8_title: "ชุดปฐมพยาบาลของฉัน",
    feature8_desc: "จัดการอุปกรณ์ทางการแพทย์ด้วยระบบสินค้าคงคลังดิจิทัล ติดตามสถานะความพร้อม เพิ่มรายการแบบกำหนดเอง และเก็บข้อมูลแบบออฟไลน์",
    feature8_item1: "✓ สินค้าคงคลังดิจิทัล",
    feature8_item2: "✓ การติดตามสถานะความพร้อม",
    feature8_item3: "✓ อุปกรณ์กำหนดเอง",
    feature8_item4: "✓ การจัดเก็บในเครื่องแบบออฟไลน์",

    feature9_title: "สภาพอากาศและเครื่องมือยูทิลิตี้",
    feature9_desc: "เข้าถึงสภาพอากาศแบบเรียลไทม์, โหมดเข็มทิศหลายโหมด (มาตรฐาน, กล้องโทรทรรศน์, กิบลัต) และระดับน้ำในแอปเดียว",
    feature9_item1: "✓ สภาพอากาศแบบเรียลไทม์",
    feature9_item2: "✓ เข็มทิศมาตรฐานและกิบลัต",
    feature9_item3: "✓ เครื่องวัดระดับน้ำ",
    feature9_item4: "✓ ใช้งานได้โดยไม่ต้องใช้อินเทอร์เน็ต",

    feature10_title: "เกมช่วยเหลือ",
    feature10_desc: "การฝึกอบรมฉุกเฉินแบบโต้ตอบกับสถานการณ์จริง ฝึกทักษะการช่วยชีวิต รับเหรียญตรา และปลดล็อกความสำเร็จ",
    feature10_item1: "✓ สถานการณ์แบบโต้ตอบ",
    feature10_item2: "✓ รับเหรียญตราทักษะ",
    feature10_item3: "✓ โรคลมแดดและงูกัด",
    feature10_item4: "✓ ระบบความก้าวหน้า",

    feature11_title: "เครื่องสแกน QR และการแชร์",
    feature11_desc: "ใช้เครื่องมือ QR เพื่อเข้าร่วมทีมและจัดการรายละเอียดโปรไฟล์ฉุกเฉินที่เตรียมไว้สำหรับการแชร์ผ่าน QR",
    feature11_item1: "✓ การเข้าร่วมทีมด้วย QR",
    feature11_item2: "✓ การสแกน QR ด้วยกล้อง",
    feature11_item3: "✓ การควบคุมความเป็นส่วนตัว",
    feature11_item4: "✓ การแชร์ในกรณีฉุกเฉิน"
};

const NEW_FEATURES_ES = {
    feature1_title: "Sistema Inteligente SOS",
    feature1_desc: "Activación de emergencia avanzada con código morse de luz, grabación automática, alertas SMS y sistema de alerta de sonido.",
    feature1_item1: "✓ Código morse de luz (... --- ...)",
    feature1_item2: "✓ Auto-grabación con temporizador",
    feature1_item3: "✓ Alertas SMS de emergencia",
    feature1_item4: "✓ Sistema de alerta sonora",

    feature2_title: "IA Enfermera de Emergencia",
    feature2_desc: "Guía médica de IA adaptada a los perfiles médicos de su familia y al inventario exacto de su botiquín de primeros auxilios. Entrada de voz/imagen con triaje ABC+D.",
    feature2_item1: "✓ Soporte de voz e imagen",
    feature2_item2: "✓ Protocolo de triaje ABC+D",
    feature2_item3: "✓ Perfiles médicos familiares",
    feature2_item4: "✓ Inventario exacto del botiquín",

    feature3_title: "Conexión de Equipo",
    feature3_desc: "Cree y coordine equipos de emergencia. Ubicación en tiempo real, alertas de equipo con mensajes de voz y unión por código QR.",
    feature3_item1: "✓ Creación y gestión de equipos",
    feature3_item2: "✓ Seguimiento GPS en tiempo real",
    feature3_item3: "✓ Alertas de mensajes de voz",
    feature3_item4: "✓ Unirse por código QR",

    feature4_title: "Perfil de Emergencia",
    feature4_desc: "Guarde detalles médicos, contactos y seguros localmente con controles de privacidad para compartir información de emergencia.",
    feature4_item1: "✓ Historial médico y alergias",
    feature4_item2: "✓ Contactos de emergencia",
    feature4_item3: "✓ Configuración para compartir QR",
    feature4_item4: "✓ Información del seguro",

    feature5_title: "Primeros Auxilios y Triaje",
    feature5_desc: "Triaje médico profesional con protocolos codificados por colores (ROJO/NARANJA/AMARILLO/VERDE) y recomendaciones de botiquín.",
    feature5_item1: "✓ Sistema de triaje de 4 niveles",
    feature5_item2: "✓ Protocolos interactivos",
    feature5_item3: "✓ Guía de primeros auxilios",
    feature5_item4: "✓ Instrucciones paso a paso",

    feature6_title: "Comunidad y Alertas",
    feature6_desc: "Informes de peligro comunitarios, solicitudes de ayuda cercanas y notificaciones de emergencia.",
    feature6_item1: "✓ Feed de alertas de la comunidad",
    feature6_item2: "✓ Reporte de peligros",
    feature6_item3: "✓ Pedir ayuda cerca",
    feature6_item4: "✓ Notificaciones push",

    feature7_title: "Directorio Global de Emergencia",
    feature7_desc: "Detección automática de región: actualiza números locales de emergencia (Policía, Ambulancia, Bomberos) donde quiera que viaje.",
    feature7_item1: "✓ Detección de región automática",
    feature7_item2: "✓ Policía y ambulancia local",
    feature7_item3: "✓ Directorio sin conexión",
    feature7_item4: "✓ Llamada con un toque",

    feature8_title: "Mi Botiquín de Primeros Auxilios",
    feature8_desc: "Administre sus suministros médicos con un inventario digital. Realice un seguimiento, agregue artículos y guárdelos localmente.",
    feature8_item1: "✓ Inventario digital",
    feature8_item2: "✓ Seguimiento del completado",
    feature8_item3: "✓ Artículos personalizados",
    feature8_item4: "✓ Almacenamiento local",

    feature9_title: "Herramientas de Clima y Brújula",
    feature9_desc: "Acceda al clima, múltiples modos de brújula (Estándar, Telescopio, Qibla) y un nivel de burbuja en una sola aplicación.",
    feature9_item1: "✓ Clima en tiempo real",
    feature9_item2: "✓ Brújula estándar y Qibla",
    feature9_item3: "✓ Nivel de burbuja",
    feature9_item4: "✓ Utilizable sin internet",

    feature10_title: "Juego de Rescate",
    feature10_desc: "Entrenamiento interactivo de emergencias con escenarios reales. Practique habilidades y gane insignias.",
    feature10_item1: "✓ Escenarios interactivos",
    feature10_item2: "✓ Gana insignias",
    feature10_item3: "✓ Golpe de calor y mordedura",
    feature10_item4: "✓ Sistema de progresión",

    feature11_title: "Escáner QR y Compartir",
    feature11_desc: "Utilice herramientas QR para unirse a equipos y administrar qué detalles de su perfil están preparados para compartir.",
    feature11_item1: "✓ Unirse al equipo con QR",
    feature11_item2: "✓ Escaneo de cámara QR",
    feature11_item3: "✓ Controles de privacidad",
    feature11_item4: "✓ Compartir en emergencias"
};

const NEW_FEATURES_IT = {
    feature1_title: "Sistema SOS Intelligente",
    feature1_desc: "Attivazione di emergenza avanzata con codice morse luminoso, registrazione automatica, avvisi SMS e allarme sonoro.",
    feature1_item1: "✓ Codice morse luminoso (... --- ...)",
    feature1_item2: "✓ Registrazione automatica",
    feature1_item3: "✓ Avvisi SMS di emergenza",
    feature1_item4: "✓ Sistema di allarme sonoro",

    feature2_title: "Infermiere AI di Emergenza",
    feature2_desc: "Guida medica IA personalizzata per i profili medici familiari e l'inventario esatto del tuo kit di pronto soccorso. Input vocale/immagine con triage ABC+D.",
    feature2_item1: "✓ Supporto voce e immagine",
    feature2_item2: "✓ Protocollo di triage ABC+D",
    feature2_item3: "✓ Profili medici familiari",
    feature2_item4: "✓ Inventario esatto del kit",

    feature3_title: "Team Connect",
    feature3_desc: "Crea e coordina squadre di emergenza. Condivisione posizione in tempo reale, avvisi di squadra con messaggi vocali e QR code.",
    feature3_item1: "✓ Creazione e gestione team",
    feature3_item2: "✓ Tracciamento GPS in tempo reale",
    feature3_item3: "✓ Avvisi con messaggi vocali",
    feature3_item4: "✓ Unione team tramite QR",

    feature4_title: "Profilo di Emergenza",
    feature4_desc: "Archivia localmente dettagli medici, contatti e assicurazione, con controlli sulla privacy per la condivisione.",
    feature4_item1: "✓ Anamnesi medica e allergie",
    feature4_item2: "✓ Contatti di emergenza",
    feature4_item3: "✓ Impostazioni condivisione QR",
    feature4_item4: "✓ Informazioni assicurative",

    feature5_title: "Primo Soccorso e Triage",
    feature5_desc: "Triage medico professionale con protocolli a colori (ROSSO/ARANCIO/GIALLO/VERDE) e raccomandazioni intelligenti.",
    feature5_item1: "✓ Sistema di triage a 4 livelli",
    feature5_item2: "✓ Protocolli interattivi",
    feature5_item3: "✓ Guida al kit primo soccorso",
    feature5_item4: "✓ Istruzioni passo dopo passo",

    feature6_title: "Comunità e Avvisi",
    feature6_desc: "Rapporti di pericolo dalla comunità, richieste di aiuto nelle vicinanze e notifiche di emergenza.",
    feature6_item1: "✓ Feed avvisi della comunità",
    feature6_item2: "✓ Segnalazioni di pericolo",
    feature6_item3: "✓ Richiesta aiuto nelle vicinanze",
    feature6_item4: "✓ Notifiche push",

    feature7_title: "Rubrica di Emergenza Globale",
    feature7_desc: "Rilevamento automatico della regione che aggiorna i numeri locali (Polizia, Ambulanza, Vigili del Fuoco) ovunque viaggi.",
    feature7_item1: "✓ Rilevamento regione automatico",
    feature7_item2: "✓ Polizia e ambulanza locale",
    feature7_item3: "✓ Rubrica offline",
    feature7_item4: "✓ Chiamata con un tocco",

    feature8_title: "Il Mio Kit di Primo Soccorso",
    feature8_desc: "Gestisci le tue scorte mediche. Tieni traccia del completamento, aggiungi oggetti personalizzati e archivia offline.",
    feature8_item1: "✓ Inventario digitale",
    feature8_item2: "✓ Monitoraggio del completamento",
    feature8_item3: "✓ Attrezzatura personalizzata",
    feature8_item4: "✓ Archiviazione locale offline",

    feature9_title: "Meteo, Bussole e Strumenti",
    feature9_desc: "Meteo in tempo reale, diverse modalità bussola (Standard, Telescopio, Qibla) e una livella a bolla in una sola app.",
    feature9_item1: "✓ Meteo in tempo reale",
    feature9_item2: "✓ Bussola Standard & Qibla",
    feature9_item3: "✓ Livella a bolla",
    feature9_item4: "✓ Utilizzabile senza internet",

    feature10_title: "Gioco di Salvataggio",
    feature10_desc: "Addestramento interattivo alle emergenze con scenari di vita reale. Fai pratica e guadagna distintivi.",
    feature10_item1: "✓ Scenari interattivi",
    feature10_item2: "✓ Guadagna distintivi",
    feature10_item3: "✓ Colpo di calore e morsi",
    feature10_item4: "✓ Sistema di progressione",

    feature11_title: "Scanner QR e Condivisione",
    feature11_desc: "Usa gli strumenti QR per unirti ai team e gestire le informazioni del profilo preparate per la condivisione.",
    feature11_item1: "✓ Unione team via QR",
    feature11_item2: "✓ Scansione fotocamera QR",
    feature11_item3: "✓ Controlli privacy",
    feature11_item4: "✓ Condivisione emergenza"
};

const NEW_FEATURES_FIL = {
    feature1_title: "SOS Smart System",
    feature1_desc: "Advanced na pag-activate ng emergency na may flash morse code, awtomatikong video recording, SMS alert, at sound alert.",
    feature1_item1: "✓ Flash morse code (... --- ...)",
    feature1_item2: "✓ Auto-recording na may timer",
    feature1_item3: "✓ Mga SMS emergency alert",
    feature1_item4: "✓ Sound alert system",

    feature2_title: "AI Emergency Nurse",
    feature2_desc: "AI medikal na gabay na naka-customize para sa mga medikal na profile ng pamilya at sa iyong eksaktong first aid kit inventory. Voice/image input na may ABC+D triage.",
    feature2_item1: "✓ Voice at image support",
    feature2_item2: "✓ ABC+D triage protocol",
    feature2_item3: "✓ Family medical profiles",
    feature2_item4: "✓ Eksaktong kit inventory",

    feature3_title: "Team Connect",
    feature3_desc: "Gumawa at makipag-ugnayan sa mga emergency team. Real-time location sharing, voice message alerts, at QR code joining.",
    feature3_item1: "✓ Pag-gawa at pamamahala ng team",
    feature3_item2: "✓ Real-time GPS tracking",
    feature3_item3: "✓ Mga alerto sa voice message",
    feature3_item4: "✓ QR code team joining",

    feature4_title: "Emergency Profile",
    feature4_desc: "Itabi ang iyong mga medikal na detalye, contacts, at insurance nang lokal na may kontrol sa privacy para sa pagbabahagi.",
    feature4_item1: "✓ Medical history at allergy",
    feature4_item2: "✓ Mga emergency contact",
    feature4_item3: "✓ Mga setting sa pagbahagi ng QR",
    feature4_item4: "✓ Impormasyon sa insurance",

    feature5_title: "First Aid & Triage",
    feature5_desc: "Propesyonal na medikal na triage na may mga protocol na color-coded (RED/ORANGE/YELLOW/GREEN) at first aid kit na gabay.",
    feature5_item1: "✓ 4-level triage system",
    feature5_item2: "✓ Mga interactive na protocol",
    feature5_item3: "✓ Gabay sa first aid kit",
    feature5_item4: "✓ Sunud-sunod na tagubilin",

    feature6_title: "Komunidad at Mga Alerto",
    feature6_desc: "Mga ulat ng panganib sa komunidad, paghingi ng tulong sa malapit, at mga notification sa emergency.",
    feature6_item1: "✓ Feed ng alerto ng komunidad",
    feature6_item2: "✓ Mga ulat ng panganib",
    feature6_item3: "✓ Humingi ng tulong sa malapit",
    feature6_item4: "✓ Mga push notification",

    feature7_title: "Global Emergency Directory",
    feature7_desc: "Awtomatikong nakikita ang rehiyon para i-update ang mga lokal na numero ng emergency (Pulis, Ambulansya) saan ka man pumunta.",
    feature7_item1: "✓ Awtomatikong pagtukoy ng rehiyon",
    feature7_item2: "✓ Pulis at ambulansya sa lugar",
    feature7_item3: "✓ Offline directory",
    feature7_item4: "✓ One-tap dialing",

    feature8_title: "Aking First Aid Kit",
    feature8_desc: "Pamahalaan ang iyong mga medikal na supply. Subaybayan ang pagkumpleto, magdagdag ng mga item, at iimbak nang offline.",
    feature8_item1: "✓ Digital na imbentaryo",
    feature8_item2: "✓ Pagsubaybay sa pagkumpleto",
    feature8_item3: "✓ Pasadyang kagamitan",
    feature8_item4: "✓ Lokal na imbakan",

    feature9_title: "Panahon at Mga Tool",
    feature9_desc: "Makuha ang real-time na panahon, maraming compass mode (Standard, Telescope, Qibla), at bubble level sa isang app.",
    feature9_item1: "✓ Real-time na panahon",
    feature9_item2: "✓ Standard at Qibla compass",
    feature9_item3: "✓ Bubble level",
    feature9_item4: "✓ Magagamit nang walang internet",

    feature10_title: "Rescue Game",
    feature10_desc: "Interactive na emergency training na may totoong buhay na senaryo. Magsanay, kumita ng mga badge at achievement.",
    feature10_item1: "✓ Interactive na mga sitwasyon",
    feature10_item2: "✓ Kumita ng skill badges",
    feature10_item3: "✓ Heatstroke at kagat ng ahas",
    feature10_item4: "✓ Progression system",

    feature11_title: "QR Scanner at Pagbahagi",
    feature11_desc: "Gumamit ng QR para sa pagsali sa team at pamahalaan kung anong mga detalye ng profile ang ibabahagi sa pamamagitan ng QR.",
    feature11_item1: "✓ Pagsali sa team gamit ang QR",
    feature11_item2: "✓ Camera QR scanning",
    feature11_item3: "✓ Mga kontrol sa privacy",
    feature11_item4: "✓ Pagbabahagi ng emergency"
};

/* --- AUTO-GENERATED FEATURES PATCH --- */
['es', 'it', 'fil'].forEach(lang => {
    if (typeof i18nComplete !== 'undefined' && !i18nComplete[lang]) i18nComplete[lang] = {};
    if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS.features && !TRANSLATIONS.features[lang]) TRANSLATIONS.features[lang] = {};
});

// Update i18nComplete
if (typeof i18nComplete !== 'undefined') {
    Object.assign(i18nComplete.en, NEW_FEATURES_EN);
    Object.assign(i18nComplete.fr, NEW_FEATURES_FR);
    Object.assign(i18nComplete.th, NEW_FEATURES_TH);
    Object.assign(i18nComplete.es, NEW_FEATURES_ES);
    Object.assign(i18nComplete.it, NEW_FEATURES_IT);
    Object.assign(i18nComplete.fil, NEW_FEATURES_FIL);
}

// Update TRANSLATIONS
if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS.features) {
    Object.assign(TRANSLATIONS.features.en, NEW_FEATURES_EN);
    Object.assign(TRANSLATIONS.features.fr, NEW_FEATURES_FR);
    Object.assign(TRANSLATIONS.features.th, NEW_FEATURES_TH);
    Object.assign(TRANSLATIONS.features.es, NEW_FEATURES_ES);
    Object.assign(TRANSLATIONS.features.it, NEW_FEATURES_IT);
    Object.assign(TRANSLATIONS.features.fil, NEW_FEATURES_FIL);
}
/* ------------------------------------- */
