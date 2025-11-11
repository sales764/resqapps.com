// ========================================
// GEOLOCATION & AUTO LANGUAGE DETECTION
// Item 72/78: Detect country to set default language
// ========================================

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        // Supported languages
        supportedLanguages: ['en', 'fr', 'th', 'zh'],
        
        // Default language (fallback)
        defaultLanguage: 'en',
        
        // API endpoints for geolocation
        geoApis: [
            {
                name: 'ipapi',
                url: 'https://ipapi.co/json/',
                parser: (data) => data.country_code
            },
            {
                name: 'ip-api',
                url: 'http://ip-api.com/json/',
                parser: (data) => data.countryCode
            },
            {
                name: 'ipinfo',
                url: 'https://ipinfo.io/json',
                parser: (data) => data.country
            }
        ],
        
        // Cache duration (24 hours)
        cacheDuration: 24 * 60 * 60 * 1000,
        
        // Storage keys
        storageKeys: {
            country: 'user_country',
            detectedLanguage: 'detected_language',
            manualLanguage: 'manual_language',
            lastDetection: 'last_geo_detection'
        }
    };

    // Country to language mapping
    const COUNTRY_TO_LANGUAGE = {
        // Thailand
        'TH': 'th',
        
        // France and French-speaking countries
        'FR': 'fr',
        'BE': 'fr', // Belgium
        'CH': 'fr', // Switzerland
        'CA': 'fr', // Canada
        'MA': 'fr', // Morocco
        'DZ': 'fr', // Algeria
        'TN': 'fr', // Tunisia
        'SN': 'fr', // Senegal
        'CI': 'fr', // Ivory Coast
        'CM': 'fr', // Cameroon
        'ML': 'fr', // Mali
        'BF': 'fr', // Burkina Faso
        'NE': 'fr', // Niger
        'MG': 'fr', // Madagascar
        'CD': 'fr', // Congo
        'RE': 'fr', // Reunion
        'MQ': 'fr', // Martinique
        'GP': 'fr', // Guadeloupe
        'GF': 'fr', // French Guiana
        'NC': 'fr', // New Caledonia
        'PF': 'fr', // French Polynesia
        
        // China and Chinese-speaking regions
        'CN': 'zh',
        'TW': 'zh',
        'HK': 'zh',
        'SG': 'zh', // Singapore (Chinese)
        'MO': 'zh', // Macau
        
        // English (default for all other countries)
        // Will be handled by fallback
    };

    /**
     * Get cached country
     */
    function getCachedCountry() {
        const cached = localStorage.getItem(CONFIG.storageKeys.country);
        const lastDetection = localStorage.getItem(CONFIG.storageKeys.lastDetection);
        
        if (cached && lastDetection) {
            const timeSince = Date.now() - parseInt(lastDetection);
            if (timeSince < CONFIG.cacheDuration) {
                return cached;
            }
        }
        
        return null;
    }

    /**
     * Cache country
     */
    function cacheCountry(country) {
        localStorage.setItem(CONFIG.storageKeys.country, country);
        localStorage.setItem(CONFIG.storageKeys.lastDetection, Date.now().toString());
    }

    /**
     * Detect country via IP geolocation API
     */
    async function detectCountryViaAPI() {
        // Try each API in order
        for (const api of CONFIG.geoApis) {
            try {
                console.log(`[GeoLanguage] Trying ${api.name}...`);
                
                const response = await fetch(api.url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`API returned ${response.status}`);
                }
                
                const data = await response.json();
                const country = api.parser(data);
                
                if (country) {
                    console.log(`[GeoLanguage] Detected country: ${country} (via ${api.name})`);
                    cacheCountry(country);
                    return country;
                }
                
            } catch (error) {
                console.warn(`[GeoLanguage] ${api.name} failed:`, error.message);
                // Continue to next API
            }
        }
        
        return null;
    }

    /**
     * Detect country via browser timezone
     */
    function detectCountryViaTimezone() {
        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            console.log(`[GeoLanguage] Browser timezone: ${timezone}`);
            
            // Map common timezones to countries
            const timezoneToCountry = {
                'Asia/Bangkok': 'TH',
                'Asia/Ho_Chi_Minh': 'TH',
                'Europe/Paris': 'FR',
                'Europe/Brussels': 'BE',
                'Europe/Zurich': 'CH',
                'America/Montreal': 'CA',
                'America/Toronto': 'CA',
                'Asia/Shanghai': 'CN',
                'Asia/Hong_Kong': 'HK',
                'Asia/Taipei': 'TW',
                'Asia/Singapore': 'SG'
            };
            
            return timezoneToCountry[timezone] || null;
            
        } catch (error) {
            console.warn('[GeoLanguage] Timezone detection failed:', error);
            return null;
        }
    }

    /**
     * Detect language from browser
     */
    function detectLanguageFromBrowser() {
        const browserLang = navigator.language || navigator.userLanguage;
        
        if (!browserLang) {
            return null;
        }
        
        // Extract language code (e.g., 'en-US' -> 'en')
        const langCode = browserLang.toLowerCase().split('-')[0];
        
        console.log(`[GeoLanguage] Browser language: ${browserLang} (${langCode})`);
        
        // Check if supported
        if (CONFIG.supportedLanguages.includes(langCode)) {
            return langCode;
        }
        
        return null;
    }

    /**
     * Map country to language
     */
    function countryToLanguage(country) {
        if (!country) {
            return null;
        }
        
        const language = COUNTRY_TO_LANGUAGE[country.toUpperCase()];
        
        if (language) {
            console.log(`[GeoLanguage] Country ${country} → Language ${language}`);
            return language;
        }
        
        // Default to English for unlisted countries
        console.log(`[GeoLanguage] Country ${country} → Default language (en)`);
        return 'en';
    }

    /**
     * Get detected language (multi-method)
     */
    async function detectLanguage() {
        // 1. Check if user manually selected language
        const manualLanguage = localStorage.getItem(CONFIG.storageKeys.manualLanguage);
        if (manualLanguage) {
            console.log(`[GeoLanguage] Using manual language: ${manualLanguage}`);
            return manualLanguage;
        }
        
        // 2. Check cached detected language
        const cachedLanguage = localStorage.getItem(CONFIG.storageKeys.detectedLanguage);
        const lastDetection = localStorage.getItem(CONFIG.storageKeys.lastDetection);
        
        if (cachedLanguage && lastDetection) {
            const timeSince = Date.now() - parseInt(lastDetection);
            if (timeSince < CONFIG.cacheDuration) {
                console.log(`[GeoLanguage] Using cached language: ${cachedLanguage}`);
                return cachedLanguage;
            }
        }
        
        // 3. Try cached country
        let country = getCachedCountry();
        
        // 4. Try IP geolocation API
        if (!country) {
            country = await detectCountryViaAPI();
        }
        
        // 5. Try timezone detection
        if (!country) {
            country = detectCountryViaTimezone();
        }
        
        // 6. Map country to language
        let language = null;
        if (country) {
            language = countryToLanguage(country);
        }
        
        // 7. Fallback to browser language
        if (!language) {
            language = detectLanguageFromBrowser();
        }
        
        // 8. Final fallback to default
        if (!language) {
            language = CONFIG.defaultLanguage;
            console.log(`[GeoLanguage] Using default language: ${language}`);
        }
        
        // Cache detected language
        localStorage.setItem(CONFIG.storageKeys.detectedLanguage, language);
        
        return language;
    }

    /**
     * Apply language to page
     */
    function applyLanguage(language) {
        // Check if i18n system exists
        if (typeof window.setLanguage === 'function') {
            window.setLanguage(language);
            console.log(`[GeoLanguage] Applied language via i18n: ${language}`);
        } else if (typeof window.i18n !== 'undefined' && window.i18n.setLanguage) {
            window.i18n.setLanguage(language);
            console.log(`[GeoLanguage] Applied language via i18n: ${language}`);
        } else {
            // Set HTML lang attribute
            document.documentElement.lang = language;
            console.log(`[GeoLanguage] Set HTML lang attribute: ${language}`);
        }
        
        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'language_detected', {
                'event_category': 'Localization',
                'event_label': language,
                'value': 1
            });
        }
    }

    /**
     * Show language confirmation prompt (optional)
     */
    function showLanguageConfirmation(detectedLanguage) {
        const languageNames = {
            'en': 'English',
            'fr': 'Français',
            'th': 'ภาษาไทย',
            'zh': '中文'
        };
        
        const prompt = document.createElement('div');
        prompt.className = 'geo-language-prompt';
        prompt.innerHTML = `
            <div class="geo-language-card">
                <button class="geo-language-close" aria-label="Close">×</button>
                
                <div class="geo-language-icon">🌍</div>
                
                <p class="geo-language-message">
                    We detected you're visiting from a <strong>${languageNames[detectedLanguage]}</strong>-speaking region.
                </p>
                
                <div class="geo-language-actions">
                    <button class="geo-language-confirm" data-lang="${detectedLanguage}">
                        Switch to ${languageNames[detectedLanguage]}
                    </button>
                    <button class="geo-language-dismiss">
                        Stay in ${languageNames[document.documentElement.lang || 'en']}
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(prompt);
        
        setTimeout(() => {
            prompt.classList.add('show');
        }, 500);
        
        // Event listeners
        prompt.querySelector('.geo-language-confirm').addEventListener('click', () => {
            applyLanguage(detectedLanguage);
            localStorage.setItem(CONFIG.storageKeys.manualLanguage, detectedLanguage);
            removePrompt(prompt);
        });
        
        prompt.querySelector('.geo-language-dismiss').addEventListener('click', () => {
            const currentLang = document.documentElement.lang || 'en';
            localStorage.setItem(CONFIG.storageKeys.manualLanguage, currentLang);
            removePrompt(prompt);
        });
        
        prompt.querySelector('.geo-language-close').addEventListener('click', () => {
            removePrompt(prompt);
        });
    }

    /**
     * Remove prompt
     */
    function removePrompt(prompt) {
        prompt.classList.remove('show');
        setTimeout(() => {
            if (prompt && prompt.parentNode) {
                prompt.parentNode.removeChild(prompt);
            }
        }, 300);
    }

    /**
     * Initialize geolocation & language detection
     */
    async function init() {
        console.log('[GeoLanguage] Initializing...');
        
        // Detect language
        const detectedLanguage = await detectLanguage();
        
        console.log(`[GeoLanguage] Final detected language: ${detectedLanguage}`);
        
        // Get current language
        const currentLanguage = document.documentElement.lang || 
                               localStorage.getItem('selectedLanguage') || 
                               CONFIG.defaultLanguage;
        
        console.log(`[GeoLanguage] Current language: ${currentLanguage}`);
        
        // If detected language differs from current, apply it automatically
        // OR show confirmation prompt (based on preference)
        if (detectedLanguage !== currentLanguage) {
            // Option 1: Apply automatically (silent)
            applyLanguage(detectedLanguage);
            
            // Option 2: Ask user (uncomment to enable)
            // showLanguageConfirmation(detectedLanguage);
        } else {
            console.log('[GeoLanguage] Language already correct');
        }
    }

    // Public API
    window.GeoLanguage = {
        /**
         * Detect user's language
         */
        detect: detectLanguage,
        
        /**
         * Apply language
         */
        apply: applyLanguage,
        
        /**
         * Get country
         */
        getCountry: async function() {
            let country = getCachedCountry();
            if (!country) {
                country = await detectCountryViaAPI();
            }
            return country;
        },
        
        /**
         * Force re-detection
         */
        refresh: async function() {
            // Clear cache
            localStorage.removeItem(CONFIG.storageKeys.country);
            localStorage.removeItem(CONFIG.storageKeys.detectedLanguage);
            localStorage.removeItem(CONFIG.storageKeys.lastDetection);
            
            // Re-detect
            return await detectLanguage();
        },
        
        /**
         * Set manual language (overrides auto-detection)
         */
        setManual: function(language) {
            if (CONFIG.supportedLanguages.includes(language)) {
                localStorage.setItem(CONFIG.storageKeys.manualLanguage, language);
                applyLanguage(language);
                return true;
            }
            return false;
        },
        
        /**
         * Clear manual selection (allow auto-detection)
         */
        clearManual: function() {
            localStorage.removeItem(CONFIG.storageKeys.manualLanguage);
        }
    };

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/*
USAGE:

// Automatic - just include the script
<script src="geo-language.js"></script>

// Manual control
const language = await GeoLanguage.detect();
console.log('Detected:', language);

// Apply language
GeoLanguage.apply('fr');

// Get country
const country = await GeoLanguage.getCountry();
console.log('Country:', country);

// Force refresh
const newLanguage = await GeoLanguage.refresh();

// Set manual language
GeoLanguage.setManual('th');

// Clear manual selection
GeoLanguage.clearManual();

SUPPORTED LANGUAGES:
- en: English (default)
- fr: Français
- th: ภาษาไทย
- zh: 中文

DETECTION METHODS (in order):
1. Manual selection (stored in localStorage)
2. Cached detection (24 hours)
3. IP geolocation API (ipapi.co, ip-api.com, ipinfo.io)
4. Browser timezone
5. Browser language (navigator.language)
6. Default fallback (en)

PRIVACY:
- No sensitive data collected
- Uses free public IP geolocation APIs
- All data cached locally
- User can override with manual selection

PERFORMANCE:
- Cached for 24 hours (reduces API calls)
- Fallback methods if API fails
- Non-blocking (async)
- ~2 KB minified
*/
