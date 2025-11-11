// ========================================
// EXIT INTENT POPUP
// Item 36/78: Conversion Optimization
// ========================================

(function() {
    'use strict';

    // Configuration
    const config = {
        enabled: true,
        showDelay: 3000, // Minimum 3 seconds on page
        cookieName: 'resq_exit_shown',
        cookieExpiry: 7, // Days
        sensitivity: 20, // Pixels from top to trigger
        aggressive: false // Show only once per session if false
    };

    // State
    let exitIntentShown = false;
    let timeOnPage = 0;
    let mouseY = 0;

    // Check if already shown (cookie)
    function hasSeenPopup() {
        return document.cookie.includes(config.cookieName + '=true');
    }

    // Set cookie
    function setPopupCookie() {
        const date = new Date();
        date.setTime(date.getTime() + (config.cookieExpiry * 24 * 60 * 60 * 1000));
        document.cookie = config.cookieName + '=true; expires=' + date.toUTCString() + '; path=/';
    }

    // Create popup HTML
    function createPopup() {
        const popup = document.createElement('div');
        popup.id = 'exit-intent-popup';
        popup.className = 'exit-popup-overlay';
        popup.innerHTML = `
            <div class="exit-popup-content">
                <button class="exit-popup-close" aria-label="Close popup">&times;</button>
                
                <div class="exit-popup-emoji">🚨</div>
                
                <h2 class="exit-popup-title">Wait! Before You Go...</h2>
                
                <p class="exit-popup-subtitle">
                    Join 5,000+ people getting notified when RESQ+ launches!
                </p>
                
                <div class="exit-popup-benefits">
                    <div class="exit-benefit">
                        <span class="benefit-icon">✅</span>
                        <span>Be first to download</span>
                    </div>
                    <div class="exit-benefit">
                        <span class="benefit-icon">🎁</span>
                        <span>Exclusive launch bonus</span>
                    </div>
                    <div class="exit-benefit">
                        <span class="benefit-icon">⚡</span>
                        <span>Early access features</span>
                    </div>
                </div>
                
                <form class="exit-popup-form" id="exitIntentForm">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email..." 
                        required 
                        class="exit-popup-input"
                    />
                    <button type="submit" class="exit-popup-button">
                        Notify Me! 🚀
                    </button>
                </form>
                
                <p class="exit-popup-privacy">
                    🔒 We respect your privacy. Unsubscribe anytime.
                </p>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Add CSS
        addStyles();
        
        // Event listeners
        attachEventListeners(popup);
        
        return popup;
    }

    // Add CSS styles
    function addStyles() {
        if (document.getElementById('exit-popup-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'exit-popup-styles';
        style.textContent = `
            .exit-popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 32, 39, 0.95);
                backdrop-filter: blur(10px);
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
            
            .exit-popup-content {
                background: linear-gradient(135deg, #1565C0 0%, #0D47A1 100%);
                border-radius: 24px;
                padding: 40px;
                max-width: 500px;
                width: 100%;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                transform: scale(0.9);
                animation: popIn 0.3s ease 0.1s forwards;
            }
            
            @keyframes popIn {
                to { transform: scale(1); }
            }
            
            .exit-popup-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: white;
                font-size: 24px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .exit-popup-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(90deg);
            }
            
            .exit-popup-emoji {
                font-size: 60px;
                text-align: center;
                margin-bottom: 20px;
                animation: bounce 0.6s ease;
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            .exit-popup-title {
                color: white;
                font-size: 32px;
                font-weight: 800;
                text-align: center;
                margin: 0 0 15px 0;
                line-height: 1.2;
            }
            
            .exit-popup-subtitle {
                color: rgba(255, 255, 255, 0.9);
                font-size: 18px;
                text-align: center;
                margin: 0 0 30px 0;
                line-height: 1.5;
            }
            
            .exit-popup-benefits {
                display: flex;
                flex-direction: column;
                gap: 12px;
                margin-bottom: 30px;
            }
            
            .exit-benefit {
                display: flex;
                align-items: center;
                gap: 12px;
                background: rgba(255, 255, 255, 0.1);
                padding: 12px 16px;
                border-radius: 12px;
                color: white;
                font-size: 16px;
                transition: all 0.3s ease;
            }
            
            .exit-benefit:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateX(5px);
            }
            
            .benefit-icon {
                font-size: 20px;
            }
            
            .exit-popup-form {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .exit-popup-input {
                width: 100%;
                padding: 16px 20px;
                border-radius: 12px;
                border: 2px solid rgba(255, 255, 255, 0.2);
                background: rgba(255, 255, 255, 0.1);
                color: white;
                font-size: 16px;
                transition: all 0.3s ease;
            }
            
            .exit-popup-input::placeholder {
                color: rgba(255, 255, 255, 0.6);
            }
            
            .exit-popup-input:focus {
                outline: none;
                border-color: #4facfe;
                background: rgba(255, 255, 255, 0.15);
            }
            
            .exit-popup-button {
                width: 100%;
                padding: 18px;
                border-radius: 12px;
                border: none;
                background: linear-gradient(135deg, #ff3b3b 0%, #ff6b6b 100%);
                color: white;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 10px 30px rgba(255, 59, 59, 0.3);
            }
            
            .exit-popup-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(255, 59, 59, 0.4);
            }
            
            .exit-popup-button:active {
                transform: translateY(-1px);
            }
            
            .exit-popup-privacy {
                text-align: center;
                color: rgba(255, 255, 255, 0.7);
                font-size: 14px;
                margin: 15px 0 0 0;
            }
            
            /* LIGHT MODE SUPPORT */
            [data-theme="light"] .exit-popup-overlay {
                background: rgba(0, 0, 0, 0.7) !important;
            }
            
            [data-theme="light"] .exit-popup-content {
                background: #ffffff !important;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
            }
            
            [data-theme="light"] .exit-popup-close {
                background: rgba(0, 0, 0, 0.05) !important;
                color: #1a1a1a !important;
            }
            
            [data-theme="light"] .exit-popup-close:hover {
                background: rgba(0, 0, 0, 0.1) !important;
            }
            
            [data-theme="light"] .exit-popup-title {
                color: #1a1a1a !important;
            }
            
            [data-theme="light"] .exit-popup-subtitle {
                color: #4a4a4a !important;
            }
            
            [data-theme="light"] .exit-benefit {
                background: #f8f9fa !important;
                color: #1a1a1a !important;
                border: 1px solid rgba(0, 0, 0, 0.08) !important;
            }
            
            [data-theme="light"] .exit-benefit:hover {
                background: #e9ecef !important;
            }
            
            [data-theme="light"] .exit-popup-input {
                border: 2px solid #E5E7EB !important;
                background: #f8f9fa !important;
                color: #1a1a1a !important;
            }
            
            [data-theme="light"] .exit-popup-input::placeholder {
                color: #9CA3AF !important;
            }
            
            [data-theme="light"] .exit-popup-input:focus {
                border-color: #1565C0 !important;
                background: #ffffff !important;
            }
            
            [data-theme="light"] .exit-popup-privacy {
                color: #6b6b6b !important;
            }
            
            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .exit-popup-content {
                    padding: 30px 25px;
                }
                
                .exit-popup-title {
                    font-size: 26px;
                }
                
                .exit-popup-subtitle {
                    font-size: 16px;
                }
                
                .exit-popup-emoji {
                    font-size: 50px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Attach event listeners
    function attachEventListeners(popup) {
        // Close button
        const closeBtn = popup.querySelector('.exit-popup-close');
        closeBtn.addEventListener('click', () => closePopup(popup));
        
        // Click outside to close
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup(popup);
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.parentNode) {
                closePopup(popup);
            }
        });
        
        // Form submission
        const form = popup.querySelector('#exitIntentForm');
        form.addEventListener('submit', handleFormSubmit);
    }

    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const email = e.target.email.value;
        const popup = document.getElementById('exit-intent-popup');
        
        // Show success message
        const content = popup.querySelector('.exit-popup-content');
        content.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 60px; margin-bottom: 20px;">🎉</div>
                <h2 style="color: white; font-size: 28px; margin-bottom: 15px;">
                    You're In!
                </h2>
                <p style="color: rgba(255, 255, 255, 0.9); font-size: 18px; margin-bottom: 30px;">
                    We'll notify you when RESQ+ launches!
                </p>
                <button 
                    onclick="document.getElementById('exit-intent-popup').remove()" 
                    style="background: white; color: #1565C0; padding: 14px 32px; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer;"
                >
                    Got It! 🚀
                </button>
            </div>
        `;
        
        // Set cookie
        setPopupCookie();
        
        // Track with GA4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exit_intent_signup', {
                'event_category': 'Conversion',
                'event_label': 'Exit Intent Popup',
                'value': email
            });
        }
        
        // Close after 3 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                closePopup(popup);
            }
        }, 3000);
    }

    // Close popup
    function closePopup(popup) {
        popup.style.opacity = '0';
        setTimeout(() => {
            if (popup.parentNode) {
                popup.remove();
            }
        }, 300);
        setPopupCookie();
    }

    // Show popup
    function showPopup() {
        if (exitIntentShown || hasSeenPopup()) return;
        if (timeOnPage < config.showDelay) return;
        
        exitIntentShown = true;
        createPopup();
        
        // Track with GA4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exit_intent_shown', {
                'event_category': 'Engagement',
                'event_label': 'Exit Intent Popup Shown'
            });
        }
        
        console.log('[Exit Intent] Popup shown');
    }

    // Mouse leave detection
    function handleMouseLeave(e) {
        if (!config.enabled) return;
        
        mouseY = e.clientY;
        
        // Detect mouse leaving from top
        if (mouseY < config.sensitivity) {
            showPopup();
        }
    }

    // Track time on page
    setInterval(() => {
        timeOnPage += 1000;
    }, 1000);

    // Initialize
    function init() {
        if (!config.enabled) {
            console.log('[Exit Intent] Disabled');
            return;
        }
        
        // Only on desktop (mobile exit intent is annoying)
        if (window.innerWidth < 768) {
            console.log('[Exit Intent] Disabled on mobile');
            return;
        }
        
        // Don't show if already seen
        if (hasSeenPopup()) {
            console.log('[Exit Intent] Already shown (cookie exists)');
            return;
        }
        
        // Attach mouse leave listener
        document.addEventListener('mouseleave', handleMouseLeave);
        
        console.log('[Exit Intent] ✅ Initialized');
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
