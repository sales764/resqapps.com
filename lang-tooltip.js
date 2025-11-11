// ========================================
// LANGUAGE SWITCHER TOOLTIPS
// Item 61/78: Initialize tooltips for lang buttons
// ========================================

(function() {
    'use strict';

    /**
     * Language names mapping
     */
    const languageNames = {
        'en': 'English',
        'fr': 'Français',
        'th': 'ไทย',
        'zh': '中文',
        'es': 'Español',
        'de': 'Deutsch',
        'it': 'Italiano',
        'pt': 'Português',
        'ru': 'Русский',
        'ja': '日本語',
        'ko': '한국어',
        'ar': 'العربية'
    };

    /**
     * Initialize tooltips on language buttons
     */
    function initTooltips() {
        // Find all language buttons
        const langButtons = document.querySelectorAll('.lang-btn, [data-lang]');

        langButtons.forEach(button => {
            // Get language code from data attribute or button text
            let langCode = button.getAttribute('data-lang');
            
            // If no data-lang, try to detect from button content
            if (!langCode) {
                const buttonText = button.textContent.trim().toLowerCase();
                if (buttonText.includes('en') || buttonText.includes('🇺🇸')) {
                    langCode = 'en';
                } else if (buttonText.includes('fr') || buttonText.includes('🇫🇷')) {
                    langCode = 'fr';
                } else if (buttonText.includes('th') || buttonText.includes('🇹🇭')) {
                    langCode = 'th';
                } else if (buttonText.includes('zh') || buttonText.includes('🇨🇳')) {
                    langCode = 'zh';
                }
            }

            // Set data-lang if not already set
            if (langCode && !button.getAttribute('data-lang')) {
                button.setAttribute('data-lang', langCode);
            }

            // Set tooltip name
            if (langCode && languageNames[langCode]) {
                button.setAttribute('data-lang-name', languageNames[langCode]);
                
                // Add ARIA label for accessibility
                button.setAttribute('aria-label', `Switch to ${languageNames[langCode]}`);
                button.setAttribute('title', languageNames[langCode]);
            }

            // Add lang-btn class if not present
            if (!button.classList.contains('lang-btn')) {
                button.classList.add('lang-btn');
            }
        });
    }

    /**
     * Update active state
     */
    function updateActiveState() {
        const currentLang = document.documentElement.lang || 'en';
        const langButtons = document.querySelectorAll('.lang-btn');

        langButtons.forEach(button => {
            const buttonLang = button.getAttribute('data-lang');
            
            if (buttonLang === currentLang) {
                button.classList.add('active');
                button.setAttribute('aria-current', 'true');
            } else {
                button.classList.remove('active');
                button.removeAttribute('aria-current');
            }
        });
    }

    /**
     * Handle language change
     */
    function handleLanguageChange(langCode) {
        // Update document language
        document.documentElement.lang = langCode;
        
        // Save to localStorage
        localStorage.setItem('preferred-language', langCode);
        
        // Update active states
        updateActiveState();
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('languagechange', {
            detail: { language: langCode }
        }));

        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'language_change', {
                'language': langCode
            });
        }
    }

    /**
     * Setup click handlers
     */
    function setupClickHandlers() {
        const langButtons = document.querySelectorAll('.lang-btn');

        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const langCode = button.getAttribute('data-lang');
                
                if (langCode) {
                    handleLanguageChange(langCode);
                }
            });

            // Keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const langCode = button.getAttribute('data-lang');
                    
                    if (langCode) {
                        handleLanguageChange(langCode);
                    }
                }
            });
        });
    }

    /**
     * Initialize on DOM ready
     */
    function init() {
        initTooltips();
        updateActiveState();
        setupClickHandlers();

        // Load saved language preference
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && savedLang !== document.documentElement.lang) {
            // Don't auto-switch, but update UI
            updateActiveState();
        }
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    window.LangTooltip = {
        init: initTooltips,
        setLanguage: handleLanguageChange,
        getCurrentLanguage: () => document.documentElement.lang || 'en'
    };

})();

/* 
USAGE:

HTML (automatic detection):
<button class="lang-btn" data-lang="en">EN</button>
<button class="lang-btn" data-lang="fr">FR</button>
<button class="lang-btn" data-lang="th">TH</button>

HTML (with explicit names):
<button class="lang-btn" data-lang="en" data-lang-name="English">🇺🇸</button>
<button class="lang-btn" data-lang="fr" data-lang-name="Français">🇫🇷</button>

JavaScript:
// Change language programmatically
LangTooltip.setLanguage('fr');

// Get current language
const lang = LangTooltip.getCurrentLanguage();

// Listen for language changes
window.addEventListener('languagechange', (e) => {
    console.log('Language changed to:', e.detail.language);
});
*/
