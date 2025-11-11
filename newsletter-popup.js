// ========================================
// NEWSLETTER POPUP
// Item 46/78: Timing-based subscription popup
// ========================================

(function() {
    'use strict';

    // Configuration
    const config = {
        // Trigger settings
        triggers: {
            timeDelay: 0,            // DISABLED - Only use scroll trigger
            scrollPercent: 50,       // Show after 50% scroll
            exitIntent: false        // Don't trigger on exit (already have exit-intent.js)
        },
        
        // Display settings
        showOnce: true,              // Show only once per session
        cookieName: 'resq_newsletter_shown',
        cookieExpiry: 7,             // Days before showing again
        
        // Behavior
        closeOnBackdropClick: true,  // Click outside to close
        closeOnEscape: true,         // Press ESC to close
        
        // Content (will be loaded from TRANSLATIONS dynamically)
        content: null,
        
        // Design
        animation: 'slideUp',        // 'slideUp', 'fadeIn', 'scaleIn'
        position: 'center',          // 'center', 'bottom-right', 'bottom-center'
        
        // Debug
        debug: false
    };

    // State
    let triggered = false;
    let scrollTriggered = false;
    let timeTriggered = false;

    /**
     * Checks if popup should be displayed based on cookie
     * @returns {boolean} True if popup should show, false otherwise
     */
    function shouldShow() {
        // Check cookie
        if (config.showOnce && getCookie(config.cookieName)) {
            if (config.debug) {
                console.log('[Newsletter Popup] Already shown (cookie exists)');
            }
            return false;
        }
        
        // Check if already triggered
        if (triggered) {
            if (config.debug) {
                console.log('[Newsletter Popup] Already triggered this session');
            }
            return false;
        }
        
        return true;
    }

    /**
     * Retrieves cookie value by name
     * @param {string} name - Cookie name
     * @returns {string|null} Cookie value or null if not found
     */
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    /**
     * Sets cookie to prevent popup from showing again
     * @param {string} name - Cookie name
     * @param {string} value - Cookie value
     * @param {number} [days] - Days until cookie expires (uses config.cookieExpiry if not specified)
     */
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.setTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    }

    /**
     * Loads content from TRANSLATIONS based on current language
     */
    function loadTranslatedContent() {
        const lang = localStorage.getItem('resq_lang') || localStorage.getItem('selectedLanguage') || 'en';
        const translations = window.TRANSLATIONS?.newsletter?.[lang];
        
        if (!translations) {
            console.warn('[Newsletter Popup] No translations found for language:', lang);
            // Fallback to English
            config.content = {
                title: "📧 Stay Updated!",
                subtitle: "Get early access & exclusive updates",
                description: "Join 5,000+ people getting notified when RESQ+ launches. Red Cross approved emergency guidance in your inbox.",
                placeholder: "Enter your email",
                buttonText: "Get Early Access",
                privacyText: "We respect your privacy. Unsubscribe anytime.",
                successTitle: "🎉 You're In!",
                successMessage: "Check your inbox for confirmation.",
                contactLabel: "Or contact us directly:",
                contactEmail: "sales@sornsawan.com",
                contactWhatsApp: "+66 63 670 6074",
                contactWhatsAppLink: "https://wa.me/66636706074"
            };
        } else {
            config.content = {
                ...translations,
                contactEmail: "sales@sornsawan.com",
                contactWhatsApp: "+66 63 670 6074",
                contactWhatsAppLink: "https://wa.me/66636706074"
            };
        }
    }

    /**
     * Creates popup HTML structure
     * @returns {string} HTML string for popup
     */
    function createPopupHTML() {
        return `
            <div class="newsletter-overlay" id="newsletterOverlay">
                <div class="newsletter-popup ${config.animation}">
                    <button class="newsletter-close" id="newsletterClose" aria-label="Close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <div class="newsletter-content">
                        <div class="newsletter-icon">
                            📧
                        </div>
                        
                        <h2 class="newsletter-title">${config.content.title}</h2>
                        <p class="newsletter-subtitle">${config.content.subtitle}</p>
                        <p class="newsletter-description">${config.content.description}</p>
                        
                        <form class="newsletter-form" id="newsletterForm" action="https://formspree.io/f/mNkynpqo" method="POST">
                            <div class="newsletter-input-group">
                                <input 
                                    type="email" 
                                    id="newsletterEmail" 
                                    name="email"
                                    class="newsletter-input" 
                                    placeholder="${config.content.placeholder}"
                                    required
                                    autocomplete="email"
                                >
                                <button type="submit" class="newsletter-submit">
                                    ${config.content.buttonText}
                                    <svg class="newsletter-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                            <p class="newsletter-privacy">${config.content.privacyText}</p>
                        </form>
                        
                        <div class="newsletter-contact" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                            <p style="font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 10px;">${config.content.contactLabel}</p>
                            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                                <a href="mailto:${config.content.contactEmail}" style="display: flex; align-items: center; gap: 6px; color: #4facfe; text-decoration: none; font-size: 14px; transition: opacity 0.3s;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    ${config.content.contactEmail}
                                </a>
                                <a href="${config.content.contactWhatsAppLink}" target="_blank" style="display: flex; align-items: center; gap: 6px; color: #25D366; text-decoration: none; font-size: 14px; transition: opacity 0.3s;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    ${config.content.contactWhatsApp}
                                </a>
                            </div>
                        </div>
                        
                        <div class="newsletter-success" id="newsletterSuccess" style="display: none;">
                            <div class="success-icon">🎉</div>
                            <h3 class="success-title">${config.content.successTitle}</h3>
                            <p class="success-message">${config.content.successMessage}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Adds CSS styles for popup
     */
    function addStyles() {
        if (document.getElementById('newsletter-popup-styles')) return;

        const style = document.createElement('style');
        style.id = 'newsletter-popup-styles';
        style.textContent = `
            /* Overlay */
            .newsletter-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                animation: fadeIn 0.3s ease forwards;
                padding: 20px;
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            
            /* Popup */
            .newsletter-popup {
                background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
                border-radius: 24px;
                max-width: 500px;
                width: 100%;
                position: relative;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            /* Animations */
            .newsletter-popup.slideUp {
                animation: slideUp 0.5s ease;
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .newsletter-popup.fadeIn {
                animation: popupFadeIn 0.5s ease;
            }
            
            @keyframes popupFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .newsletter-popup.scaleIn {
                animation: scaleIn 0.5s ease;
            }
            
            @keyframes scaleIn {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            /* Close button */
            .newsletter-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                color: white;
                z-index: 1;
            }
            
            .newsletter-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(90deg);
            }
            
            /* Content */
            .newsletter-content {
                padding: 50px 40px 40px;
                text-align: center;
            }
            
            .newsletter-icon {
                font-size: 60px;
                margin-bottom: 20px;
                animation: bounce 1s ease infinite;
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            .newsletter-title {
                font-size: 32px;
                font-weight: 800;
                color: white;
                margin: 0 0 10px 0;
                font-family: 'Plus Jakarta Sans', sans-serif;
            }
            
            .newsletter-subtitle {
                font-size: 18px;
                color: rgba(255, 255, 255, 0.9);
                margin: 0 0 15px 0;
                font-weight: 600;
            }
            
            .newsletter-description {
                font-size: 15px;
                color: rgba(255, 255, 255, 0.7);
                line-height: 1.6;
                margin: 0 0 30px 0;
            }
            
            /* Form */
            .newsletter-form {
                margin-bottom: 0;
            }
            
            .newsletter-input-group {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .newsletter-input {
                flex: 1;
                padding: 16px 20px;
                border-radius: 12px;
                border: 2px solid rgba(255, 255, 255, 0.2);
                background: rgba(255, 255, 255, 0.1);
                color: white;
                font-size: 15px;
                transition: all 0.3s ease;
            }
            
            .newsletter-input::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
            
            .newsletter-input:focus {
                outline: none;
                border-color: #4facfe;
                background: rgba(255, 255, 255, 0.15);
            }
            
            .newsletter-submit {
                padding: 16px 24px;
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                color: white;
                border: none;
                border-radius: 12px;
                font-weight: 700;
                font-size: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);
                white-space: nowrap;
            }
            
            .newsletter-submit:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 40px rgba(79, 172, 254, 0.6);
            }
            
            .newsletter-submit:active {
                transform: translateY(0);
            }
            
            .newsletter-arrow {
                transition: transform 0.3s ease;
            }
            
            .newsletter-submit:hover .newsletter-arrow {
                transform: translateX(5px);
            }
            
            .newsletter-privacy {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.5);
                margin: 0;
            }
            
            /* Success state */
            .newsletter-success {
                text-align: center;
            }
            
            .success-icon {
                font-size: 80px;
                margin-bottom: 20px;
                animation: scaleIn 0.5s ease;
            }
            
            .success-title {
                font-size: 28px;
                font-weight: 800;
                color: white;
                margin: 0 0 10px 0;
            }
            
            .success-message {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.8);
                margin: 0;
            }
            
            /* Contact links hover effects */
            .newsletter-contact a:hover {
                opacity: 0.8;
                transform: translateY(-2px);
            }
            
            /* HIDE EMAIL SUGGESTION BOX - Prevents blocking button */
            .newsletter-popup .email-suggestion {
                display: none !important;
            }
            
            .newsletter-overlay .email-suggestion {
                display: none !important;
            }
            
            /* LIGHT MODE SUPPORT */
            [data-theme="light"] .newsletter-popup {
                background: #ffffff !important;
                border: 1px solid rgba(0, 0, 0, 0.1) !important;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2) !important;
            }
            
            [data-theme="light"] .newsletter-close {
                background: rgba(0, 0, 0, 0.05) !important;
                color: #1a1a1a !important;
            }
            
            [data-theme="light"] .newsletter-close:hover {
                background: rgba(0, 0, 0, 0.1) !important;
            }
            
            [data-theme="light"] .newsletter-title {
                color: #1a1a1a !important;
            }
            
            [data-theme="light"] .newsletter-subtitle {
                color: #4a4a4a !important;
            }
            
            [data-theme="light"] .newsletter-description {
                color: #6b6b6b !important;
            }
            
            [data-theme="light"] .newsletter-input {
                border: 2px solid #E5E7EB !important;
                background: #f8f9fa !important;
                color: #1a1a1a !important;
            }
            
            [data-theme="light"] .newsletter-input::placeholder {
                color: #9CA3AF !important;
            }
            
            [data-theme="light"] .newsletter-input:focus {
                border-color: #1565C0 !important;
                background: #ffffff !important;
            }
            
            [data-theme="light"] .newsletter-privacy {
                color: #6b6b6b !important;
            }
            
            [data-theme="light"] .newsletter-contact {
                border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
            }
            
            [data-theme="light"] .newsletter-contact p {
                color: #6b6b6b !important;
            }
            
            [data-theme="light"] .success-title {
                color: #1a1a1a !important;
            }
            
            [data-theme="light"] .success-message {
                color: #4a4a4a !important;
            }
            
            /* Mobile responsive */
            @media (max-width: 768px) {
                .newsletter-popup {
                    border-radius: 20px;
                    max-width: 90%;
                }
                
                .newsletter-content {
                    padding: 40px 25px 30px;
                }
                
                .newsletter-icon {
                    font-size: 50px;
                }
                
                .newsletter-title {
                    font-size: 26px;
                }
                
                .newsletter-subtitle {
                    font-size: 16px;
                }
                
                .newsletter-description {
                    font-size: 14px;
                }
                
                .newsletter-input-group {
                    flex-direction: column;
                }
                
                .newsletter-submit {
                    width: 100%;
                    justify-content: center;
                }
            }
        `;

        document.head.appendChild(style);
    }

    /**
     * Displays the newsletter popup with animation
     * Tracks popup_shown event in GA4
     */
    function showPopup() {
        if (!shouldShow()) return;

        // Load translated content based on current language
        loadTranslatedContent();

        // Mark as triggered
        triggered = true;

        // Create and insert popup
        const popupHTML = createPopupHTML();
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        // Get elements
        const overlay = document.getElementById('newsletterOverlay');
        const closeBtn = document.getElementById('newsletterClose');
        const form = document.getElementById('newsletterForm');

        // Close handlers
        closeBtn.addEventListener('click', closePopup);

        if (config.closeOnBackdropClick) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closePopup();
                }
            });
        }

        if (config.closeOnEscape) {
            document.addEventListener('keydown', handleEscape);
        }

        // Form submit with proper handling
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = document.getElementById('newsletterEmail');
                const email = emailInput.value.trim();
                
                if (!email) return;
                
                // Submit to Formspree
                const formData = new FormData();
                formData.append('email', email);
                formData.append('_subject', 'New RESQ+ Newsletter Popup Signup!');
                formData.append('source', 'Newsletter Popup');
                
                fetch('https://formspree.io/f/mNkynpqo', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        // Track with GA4
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'newsletter_signup', {
                                'event_category': 'Conversion',
                                'event_label': 'Newsletter Popup'
                            });
                        }
                        
                        // Show success
                        const formEl = document.getElementById('newsletterForm');
                        const success = document.getElementById('newsletterSuccess');
                        
                        if (formEl && success) {
                            formEl.style.display = 'none';
                            success.style.display = 'block';
                            
                            // Auto-close after 3 seconds
                            setTimeout(() => {
                                closePopup();
                            }, 3000);
                        }
                    }
                }).catch(error => {
                    console.error('Newsletter error:', error);
                    alert('Error submitting. Please try again or contact us directly.');
                });
            });
        }

        // Track with GA4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_popup_shown', {
                'event_category': 'Engagement',
                'trigger': getTriggeredBy()
            });
        }

        // Set cookie
        setCookie(config.cookieName, 'true', config.cookieExpiry);

        if (config.debug) {
            console.log('[Newsletter Popup] ✅ Popup shown');
        }
    }

    /**
     * Closes the newsletter popup with animation
     * Sets cookie and tracks popup_closed event
     */
    function closePopup() {
        const overlay = document.getElementById('newsletterOverlay');
        if (!overlay) return;

        overlay.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            overlay.remove();
        }, 300);

        // Remove escape listener
        document.removeEventListener('keydown', handleEscape);

        // Track with GA4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_popup_closed', {
                'event_category': 'Engagement'
            });
        }

        if (config.debug) {
            console.log('[Newsletter Popup] Closed');
        }
    }

    // Handle escape key
    function handleEscape(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    }

    /**
     * Handles newsletter form submission
     * Validates email, shows success state, and tracks signup event
     * @param {Event} e - Form submit event
     */
    function handleSubmit(e) {
        e.preventDefault();

        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();

        if (!email) return;

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailInput.focus();
            return;
        }

        // Send to Formspree
        fetch('https://formspree.io/f/mNkynpqo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                _subject: 'New RESQ+ Newsletter Popup Signup!',
                source: 'Newsletter Popup',
                timestamp: new Date().toISOString()
            })
        }).then(response => {
            if (response.ok) {
                // Track with GA4
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_signup', {
                        'event_category': 'Conversion',
                        'event_label': 'Newsletter Popup',
                        'value': email
                    });
                }

                // Show success
                const form = document.getElementById('newsletterForm');
                const success = document.getElementById('newsletterSuccess');

                if (form && success) {
                    form.style.display = 'none';
                    success.style.display = 'block';
                }

                // Auto-close after 3 seconds
                setTimeout(() => {
                    closePopup();
                }, 3000);
            }
        }).catch(error => {
            console.error('[Newsletter Popup] Error:', error);
        });
    }

    /**
     * Returns the trigger that caused the popup to show
     * @returns {string} Trigger type (time, scroll, or unknown)
     */
    function getTriggeredBy() {
        if (scrollTriggered) return 'scroll';
        if (timeTriggered) return 'time';
        return 'unknown';
    }

    /**
     * Sets up time-based trigger for popup display
     */
    function setupTimeBasedTrigger() {
        if (!config.triggers.timeDelay) return;

        setTimeout(() => {
            if (!triggered) {
                timeTriggered = true;
                showPopup();
            }
        }, config.triggers.timeDelay);
    }

    // Scroll-based trigger
    function setupScrollTrigger() {
        if (!config.triggers.scrollPercent) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

                    if (scrollPercent >= config.triggers.scrollPercent && !triggered) {
                        scrollTriggered = true;
                        showPopup();
                    }

                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    // Initialize
    function init() {
        if (!shouldShow()) return;

        addStyles();
        setupTimeBasedTrigger();
        setupScrollTrigger();

        console.log('[Newsletter Popup] ✅ Initialized');
        console.log('[Newsletter Popup] Triggers:', {
            time: config.triggers.timeDelay ? `${config.triggers.timeDelay / 1000}s` : 'disabled',
            scroll: config.triggers.scrollPercent ? `${config.triggers.scrollPercent}%` : 'disabled'
        });
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    window.NewsletterPopup = {
        show: showPopup,
        close: closePopup,
        reset: () => {
            document.cookie = `${config.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            triggered = false;
            timeTriggered = false;
            scrollTriggered = false;
            if (config.debug) {
                console.log('[Newsletter Popup] State reset');
            }
        },
        refresh: () => {
            loadTranslatedContent();
            const overlay = document.getElementById('newsletterOverlay');
            if (overlay && overlay.classList.contains('active')) {
                closePopup();
                setTimeout(() => showPopup(), 300);
            }
            console.log('[Newsletter Popup] Refreshed for new language');
        }
    };

})();
