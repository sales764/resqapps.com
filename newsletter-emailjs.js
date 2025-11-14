/**
 * Newsletter Subscription with EmailJS Integration
 * Sends confirmation emails to subscribers using EmailJS
 * Multi-language support: EN, FR, TH, ZH
 */

(function() {
    'use strict';

    // EmailJS Configuration
    const EMAILJS_CONFIG = {
        serviceId: 'service_b4sky23',
        templateId: 'template_od7f3qc',
        publicKey: 'DqmkWeB2GB4TOL1ri'
    };

    // Email Content Translations
    const EMAIL_TRANSLATIONS = {
        en: {
            subtitle: 'Emergency Response System',
            title: '🎉 Welcome Aboard!',
            message: 'Thank you for joining the RESQ+ community!',
            whats_next_title: '✅ What\'s Next?',
            benefit_1: 'Instant notification when RESQ+ launches',
            benefit_2: 'Early access to premium features',
            benefit_3: 'Be among the first users',
            benefit_4: 'Multi-language support (FR/EN/TH/ZH)',
            features_title: '🚀 RESQ+ Features',
            features_list: '<span style="color: #00d4ff;">🤖 AI Medical Nurse</span> • <span style="color: #ff0080;">👥 Team GPS</span><br><span style="color: #ff4500;">🚨 SOS System</span> • <span style="color: #00d4ff;">🎮 Training Game</span><br><span style="color: #ff0080;">📱 100% Free</span> • <span style="color: #ff4500;">🔒 Privacy First</span>',
            cta_button: '🌐 Visit Website',
            contact_title: '💬 Contact Us',
            copyright: 'All rights reserved.'
        },
        fr: {
            subtitle: 'Système de Réponse d\'Urgence',
            title: '🎉 Bienvenue à Bord!',
            message: 'Merci de rejoindre la communauté RESQ+!',
            whats_next_title: '✅ La Suite?',
            benefit_1: 'Notification instantanée au lancement de RESQ+',
            benefit_2: 'Accès anticipé aux fonctionnalités premium',
            benefit_3: 'Parmi les premiers utilisateurs',
            benefit_4: 'Support multilingue (FR/EN/TH/ZH)',
            features_title: '🚀 Fonctionnalités RESQ+',
            features_list: '<span style="color: #00d4ff;">🤖 Infirmière IA</span> • <span style="color: #ff0080;">👥 GPS Équipe</span><br><span style="color: #ff4500;">🚨 Système SOS</span> • <span style="color: #00d4ff;">🎮 Jeu Formation</span><br><span style="color: #ff0080;">📱 100% Gratuit</span> • <span style="color: #ff4500;">🔒 Vie Privée</span>',
            cta_button: '🌐 Visiter le Site',
            contact_title: '💬 Contactez-nous',
            copyright: 'Tous droits réservés.'
        },
        th: {
            subtitle: 'ระบบตอบสนองฉุกเฉิน',
            title: '🎉 ยินดีต้อนรับ!',
            message: 'ขอบคุณที่เข้าร่วมชุมชน RESQ+!',
            whats_next_title: '✅ ขั้นตอนต่อไป?',
            benefit_1: 'รับการแจ้งเตือนเมื่อ RESQ+ เปิดตัว',
            benefit_2: 'เข้าถึงฟีเจอร์พรีเมียมก่อนใคร',
            benefit_3: 'เป็นหนึ่งในผู้ใช้คนแรก',
            benefit_4: 'รองรับหลายภาษา (FR/EN/TH/ZH)',
            features_title: '🚀 ฟีเจอร์ RESQ+',
            features_list: '<span style="color: #00d4ff;">🤖 พยาบาล AI</span> • <span style="color: #ff0080;">👥 GPS ทีม</span><br><span style="color: #ff4500;">🚨 ระบบ SOS</span> • <span style="color: #00d4ff;">🎮 เกมฝึกอบรม</span><br><span style="color: #ff0080;">📱 ฟรี 100%</span> • <span style="color: #ff4500;">🔒 ความเป็นส่วนตัว</span>',
            cta_button: '🌐 เยี่ยมชมเว็บไซต์',
            contact_title: '💬 ติดต่อเรา',
            copyright: 'สงวนลิขสิทธิ์'
        },
        zh: {
            subtitle: '紧急响应系统',
            title: '🎉 欢迎加入！',
            message: '感谢您加入 RESQ+ 社区！',
            whats_next_title: '✅ 接下来？',
            benefit_1: 'RESQ+ 发布时即时通知',
            benefit_2: '提前访问高级功能',
            benefit_3: '成为首批用户之一',
            benefit_4: '多语言支持 (FR/EN/TH/ZH)',
            features_title: '🚀 RESQ+ 功能',
            features_list: '<span style="color: #00d4ff;">🤖 AI医疗护士</span> • <span style="color: #ff0080;">👥 团队GPS</span><br><span style="color: #ff4500;">🚨 SOS系统</span> • <span style="color: #00d4ff;">🎮 培训游戏</span><br><span style="color: #ff0080;">📱 100%免费</span> • <span style="color: #ff4500;">🔒 隐私优先</span>',
            cta_button: '🌐 访问网站',
            contact_title: '💬 联系我们',
            copyright: '版权所有。'
        }
    };

    // Get current language from localStorage
    function getCurrentLanguage() {
        return localStorage.getItem('resq_lang') || localStorage.getItem('selectedLanguage') || 'en';
    }

    // Initialize EmailJS
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('[Newsletter EmailJS] Initialized successfully');
            return true;
        } else {
            console.error('[Newsletter EmailJS] EmailJS library not loaded');
            return false;
        }
    }
    
    // Check if EmailJS is ready
    function isEmailJSReady() {
        return typeof emailjs !== 'undefined' && emailjs.init;
    }

    // Send confirmation email via EmailJS
    async function sendConfirmationEmail(email) {
        try {
            // Validate email
            if (!email || !email.includes('@')) {
                throw new Error('Invalid email address: ' + email);
            }

            // Check if EmailJS is ready
            if (!isEmailJSReady()) {
                // Try to initialize again
                if (!initEmailJS()) {
                    throw new Error('EmailJS is not loaded. Please refresh the page.');
                }
            }

            const lang = getCurrentLanguage();
            const content = EMAIL_TRANSLATIONS[lang] || EMAIL_TRANSLATIONS.en;

            // Map content to match EmailJS template variables exactly
            // Template uses {{subtitle}}, {{title}}, {{message}}, {{email}}, etc.
            const templateParams = {
                email: email,
                to_email: email,
                subtitle: content.subtitle,  // Template uses {{subtitle}} in lowercase
                title: content.title,
                message: content.message,
                whats_next_title: content.whats_next_title,
                benefit_1: content.benefit_1,
                benefit_2: content.benefit_2,
                benefit_3: content.benefit_3,
                benefit_4: content.benefit_4,
                features_title: content.features_title,
                features_list: content.features_list,
                cta_button: content.cta_button,
                contact_title: content.contact_title,
                copyright: content.copyright
            };

            console.log('[Newsletter EmailJS] Sending email in language:', lang);
            console.log('[Newsletter EmailJS] Email address:', email);
            console.log('[Newsletter EmailJS] Template params:', templateParams);
            console.log('[Newsletter EmailJS] Service ID:', EMAILJS_CONFIG.serviceId);
            console.log('[Newsletter EmailJS] Template ID:', EMAILJS_CONFIG.templateId);

            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );

            console.log('[Newsletter EmailJS] ✅ Confirmation email sent successfully!');
            console.log('[Newsletter EmailJS] Response:', response);
            return { success: true, response };
        } catch (error) {
            console.error('[Newsletter EmailJS] ❌ Error sending email:', error);
            console.error('[Newsletter EmailJS] Error details:', JSON.stringify(error, null, 2));
            if (error.text) {
                console.error('[Newsletter EmailJS] Error text:', error.text);
            }
            return { success: false, error };
        }
    }

    // Intercept form submission
    function setupFormInterceptor() {
        const form = document.querySelector('.stellar-notify-form');
        
        if (!form) {
            console.warn('[Newsletter EmailJS] Form not found');
            return;
        }

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[name="email"]');
            const submitBtn = form.querySelector('.stellar-submit-btn');
            const email = emailInput?.value?.trim();

            console.log('[Newsletter EmailJS] Form submitted');
            console.log('[Newsletter EmailJS] Email input found:', !!emailInput);
            console.log('[Newsletter EmailJS] Email value:', email);

            if (!email) {
                alert('Please enter a valid email address');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Disable button during submission
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';

            try {
                // Step 1: Submit to Formspree (collects email for you)
                console.log('[Newsletter EmailJS] Submitting to Formspree...');
                const formData = new FormData(form);
                const formspreeResponse = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!formspreeResponse.ok) {
                    throw new Error('Formspree submission failed');
                }

                console.log('[Newsletter EmailJS] ✅ Formspree submission successful');

                // Step 2: Update social proof counter
                if (typeof window.SocialProof !== 'undefined') {
                    const currentCount = window.SocialProof.getCount() || 0;
                    const newCount = currentCount + 1;
                    window.SocialProof.setCount(newCount);
                    console.log('[Newsletter EmailJS] ✅ Social proof counter updated to:', newCount);
                }

                // Step 3: Send confirmation email via EmailJS
                console.log('[Newsletter EmailJS] 📧 Sending confirmation email to:', email);
                const emailJsResult = await sendConfirmationEmail(email);

                if (emailJsResult.success) {
                    console.log('[Newsletter EmailJS] ✅ Email sent successfully!');
                } else {
                    console.error('[Newsletter EmailJS] ❌ Email failed:', emailJsResult.error);
                    // Don't block the user flow if EmailJS fails, but log it
                }

                // Step 4: Wait a bit to ensure email is sent, then redirect
                console.log('[Newsletter EmailJS] Waiting before redirect...');
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                console.log('[Newsletter EmailJS] Redirecting...');
                window.location.href = form.querySelector('input[name="_next"]')?.value || '/thank-you.html';

            } catch (error) {
                console.error('[Newsletter EmailJS] Error:', error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                alert('An error occurred. Please try again.');
            }
        });

        console.log('[Newsletter EmailJS] Form interceptor setup complete');
    }

    // Initialize when DOM is fully ready
    function init() {
        console.log('[Newsletter EmailJS] Initializing...');
        initEmailJS();
        
        // Wait a bit for other scripts to load
        setTimeout(function() {
            setupFormInterceptor();
        }, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(init, 1000);
    }

    // Expose sendConfirmationEmail function for use by popup and other scripts
    window.sendConfirmationEmail = sendConfirmationEmail;

})();
