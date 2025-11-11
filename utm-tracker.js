// ========================================
// UTM REFERRAL TRACKER
// Item 45/78: Track source/medium/campaign
// ========================================

(function() {
    'use strict';

    // Configuration
    const config = {
        // Storage settings
        storageKey: 'resq_utm_params',
        cookieExpiry: 30,  // Days to remember attribution
        
        // UTM parameters to track
        utmParams: [
            'utm_source',      // Where traffic came from (google, facebook, twitter)
            'utm_medium',      // Type of traffic (cpc, social, email, organic)
            'utm_campaign',    // Campaign name (summer_sale, product_launch)
            'utm_term',        // Paid search keywords
            'utm_content',     // A/B test variant or ad creative
            'utm_id'           // Campaign ID for Google Ads
        ],
        
        // Additional tracking params
        additionalParams: [
            'ref',             // Referral code
            'source',          // Alternative to utm_source
            'gclid',           // Google Ads click ID
            'fbclid',          // Facebook click ID
            'msclkid',         // Microsoft Ads click ID
            'ttclid'           // TikTok click ID
        ],
        
        // Attribution model
        attribution: {
            model: 'first_touch',  // 'first_touch' or 'last_touch'
            overwriteOnReturn: false  // Keep original source
        },
        
        // Auto-send to GA4
        sendToGA4: true,
        
        // Debug mode
        debug: false
    };

    /**
     * Extracts UTM parameters from current URL
     * @returns {Object} Object containing all UTM and additional tracking parameters
     * @example
     * // URL: ?utm_source=facebook&utm_medium=social
     * // Returns: { utm_source: 'facebook', utm_medium: 'social' }
     */
    function getUrlParams() {
        const params = {};
        const urlParams = new URLSearchParams(window.location.search);
        
        // Get UTM parameters
        config.utmParams.forEach(param => {
            const value = urlParams.get(param);
            if (value) {
                params[param] = value;
            }
        });
        
        // Get additional parameters
        config.additionalParams.forEach(param => {
            const value = urlParams.get(param);
            if (value) {
                params[param] = value;
            }
        });
        
        return params;
    }

    /**
     * Retrieves stored UTM data from localStorage
     * @returns {Object|null} Stored UTM data or null if not found/expired
     */
    function getStoredUtm() {
        try {
            const stored = localStorage.getItem(config.storageKey);
            if (stored) {
                const data = JSON.parse(stored);
                
                // Check if expired
                const now = new Date().getTime();
                if (data.expiry && now > data.expiry) {
                    localStorage.removeItem(config.storageKey);
                    return null;
                }
                
                return data;
            }
        } catch (e) {
            console.warn('[UTM Tracker] Failed to read storage:', e);
        }
        return null;
    }

    /**
     * Stores UTM parameters in localStorage and cookie
     * @param {Object} params - UTM parameters to store
     * @param {string} params.utm_source - Traffic source
     * @param {string} params.utm_medium - Traffic medium
     * @param {string} [params.utm_campaign] - Campaign name
     */
    function storeUtm(params) {
        try {
            // Add metadata
            const data = {
                ...params,
                first_visit: new Date().toISOString(),
                landing_page: window.location.href,
                referrer: document.referrer,
                expiry: new Date().getTime() + (config.cookieExpiry * 24 * 60 * 60 * 1000)
            };
            
            localStorage.setItem(config.storageKey, JSON.stringify(data));
            
            // Also set cookie as fallback
            setCookie(config.storageKey, JSON.stringify(data), config.cookieExpiry);
            
            if (config.debug) {
                console.log('[UTM Tracker] Stored:', data);
            }
        } catch (e) {
            console.warn('[UTM Tracker] Failed to store:', e);
        }
    }

    /**
     * Sets a cookie with expiration
     * @param {string} name - Cookie name
     * @param {string} value - Cookie value
     * @param {number} days - Days until expiration
     */
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    }

    /**
     * Detects traffic source from document.referrer
     * Auto-detects Google, Facebook, Twitter, etc.
     * @returns {Object} Object with source and medium properties
     * @example
     * // Referrer: https://www.google.com
     * // Returns: { source: 'google', medium: 'organic' }
     */
    function getReferrerInfo() {
        const referrer = document.referrer;
        if (!referrer) return { source: 'direct', medium: 'none' };
        
        try {
            const url = new URL(referrer);
            const hostname = url.hostname.toLowerCase();
            
            // Search engines
            if (hostname.includes('google')) {
                return { source: 'google', medium: 'organic' };
            }
            if (hostname.includes('bing')) {
                return { source: 'bing', medium: 'organic' };
            }
            if (hostname.includes('yahoo')) {
                return { source: 'yahoo', medium: 'organic' };
            }
            if (hostname.includes('duckduckgo')) {
                return { source: 'duckduckgo', medium: 'organic' };
            }
            if (hostname.includes('baidu')) {
                return { source: 'baidu', medium: 'organic' };
            }
            
            // Social media
            if (hostname.includes('facebook') || hostname.includes('fb.com')) {
                return { source: 'facebook', medium: 'social' };
            }
            if (hostname.includes('twitter') || hostname.includes('t.co')) {
                return { source: 'twitter', medium: 'social' };
            }
            if (hostname.includes('linkedin')) {
                return { source: 'linkedin', medium: 'social' };
            }
            if (hostname.includes('instagram')) {
                return { source: 'instagram', medium: 'social' };
            }
            if (hostname.includes('tiktok')) {
                return { source: 'tiktok', medium: 'social' };
            }
            if (hostname.includes('reddit')) {
                return { source: 'reddit', medium: 'social' };
            }
            if (hostname.includes('youtube')) {
                return { source: 'youtube', medium: 'social' };
            }
            
            // Other
            return { source: hostname, medium: 'referral' };
        } catch (e) {
            return { source: 'unknown', medium: 'referral' };
        }
    }

    /**
     * Sends UTM data to Google Analytics 4
     * @param {Object} params - UTM parameters
     */
    function sendToGA4(params) {
        if (!config.sendToGA4 || typeof gtag === 'undefined') return;
        
        // Send as user properties
        gtag('set', 'user_properties', {
            utm_source: params.utm_source || params.source || 'unknown',
            utm_medium: params.utm_medium || params.medium || 'unknown',
            utm_campaign: params.utm_campaign || 'not_set'
        });
        
        // Send as event
        gtag('event', 'utm_tracked', {
            'event_category': 'Attribution',
            'utm_source': params.utm_source || params.source,
            'utm_medium': params.utm_medium || params.medium,
            'utm_campaign': params.utm_campaign,
            'utm_term': params.utm_term,
            'utm_content': params.utm_content,
            'landing_page': params.landing_page,
            'referrer': params.referrer
        });
        
        if (config.debug) {
            console.log('[UTM Tracker] Sent to GA4:', params);
        }
    }

    /**
     * Tracks a conversion event with UTM attribution
     * @param {string} conversionType - Type of conversion (e.g., 'signup', 'purchase')
     * @param {Object} [value={}] - Additional conversion data
     * @example
     * UTMTracker.trackConversion('signup', { email: 'user@example.com' });
     */
    function trackConversion(conversionType, value = {}) {
        const utmData = getStoredUtm() || {};
        
        if (typeof gtag !== 'undefined') {
            gtag('event', conversionType, {
                'event_category': 'Conversion',
                'utm_source': utmData.utm_source || utmData.source || 'direct',
                'utm_medium': utmData.utm_medium || utmData.medium || 'none',
                'utm_campaign': utmData.utm_campaign || 'not_set',
                'landing_page': utmData.landing_page,
                'referrer': utmData.referrer,
                ...value
            });
        }
        
        if (config.debug) {
            console.log('[UTM Tracker] Conversion tracked:', {
                type: conversionType,
                attribution: utmData,
                value
            });
        }
    }

    // Get current attribution
    function getAttribution() {
        const stored = getStoredUtm();
        if (stored) return stored;
        
        // Fallback to referrer
        const referrerInfo = getReferrerInfo();
        return {
            source: referrerInfo.source,
            medium: referrerInfo.medium,
            utm_source: referrerInfo.source,
            utm_medium: referrerInfo.medium
        };
    }

    // Generate UTM URL
    function generateUtmUrl(baseUrl, params) {
        const url = new URL(baseUrl);
        
        Object.keys(params).forEach(key => {
            if (params[key]) {
                url.searchParams.set(key, params[key]);
            }
        });
        
        return url.toString();
    }

    // Create attribution report
    function getAttributionReport() {
        const utm = getStoredUtm();
        if (!utm) return null;
        
        return {
            source: utm.utm_source || utm.source || 'direct',
            medium: utm.utm_medium || utm.medium || 'none',
            campaign: utm.utm_campaign || 'not_set',
            term: utm.utm_term || '',
            content: utm.utm_content || '',
            landing_page: utm.landing_page,
            referrer: utm.referrer,
            first_visit: utm.first_visit,
            days_since_first_visit: Math.floor((new Date() - new Date(utm.first_visit)) / (1000 * 60 * 60 * 24))
        };
    }

    // Initialize
    function init() {
        // Get URL params
        const urlParams = getUrlParams();
        
        // Check if we have new UTM params
        const hasNewParams = Object.keys(urlParams).length > 0;
        
        if (hasNewParams) {
            // Get existing data
            const existingData = getStoredUtm();
            
            // Determine if we should store new params
            let shouldStore = true;
            
            if (existingData && config.attribution.model === 'first_touch' && !config.attribution.overwriteOnReturn) {
                // Keep first touch attribution
                shouldStore = false;
                if (config.debug) {
                    console.log('[UTM Tracker] Keeping first-touch attribution');
                }
            }
            
            if (shouldStore) {
                // Get referrer info
                const referrerInfo = getReferrerInfo();
                
                // Merge URL params with referrer info
                const params = {
                    ...referrerInfo,
                    ...urlParams
                };
                
                // Store
                storeUtm(params);
                
                // Send to GA4
                sendToGA4(params);
                
                if (config.debug) {
                    console.log('[UTM Tracker] New UTM params stored:', params);
                }
            }
        } else {
            // No UTM params in URL
            const storedData = getStoredUtm();
            
            if (!storedData) {
                // First visit without UTM - store referrer info
                const referrerInfo = getReferrerInfo();
                storeUtm(referrerInfo);
                sendToGA4(referrerInfo);
                
                if (config.debug) {
                    console.log('[UTM Tracker] First visit, stored referrer:', referrerInfo);
                }
            } else {
                if (config.debug) {
                    console.log('[UTM Tracker] Using stored attribution:', storedData);
                }
            }
        }
        
        // Log current attribution
        const attribution = getAttribution();
        console.log('[UTM Tracker] ✅ Current attribution:', attribution);
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    window.UTMTracker = {
        getAttribution: getAttribution,
        getReport: getAttributionReport,
        trackConversion: trackConversion,
        generateUrl: generateUtmUrl,
        getStoredData: getStoredUtm,
        clearData: () => {
            localStorage.removeItem(config.storageKey);
            console.log('[UTM Tracker] Data cleared');
        }
    };

})();

// ========================================
// USAGE EXAMPLES
// ========================================

/*
// Get current attribution
const attribution = UTMTracker.getAttribution();
console.log('Source:', attribution.utm_source);
console.log('Medium:', attribution.utm_medium);

// Track conversion with attribution
UTMTracker.trackConversion('signup', {
    email: 'user@example.com',
    value: 1.0
});

// Generate UTM URL
const url = UTMTracker.generateUrl('https://resqapps.com', {
    utm_source: 'facebook',
    utm_medium: 'social',
    utm_campaign: 'summer_launch',
    utm_content: 'ad_variant_a'
});

// Get full report
const report = UTMTracker.getReport();
console.log(report);

// Clear attribution data
UTMTracker.clearData();
*/
