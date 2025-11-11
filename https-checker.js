// ========================================
// HTTPS CHECKER
// Item 64/78: Check all links and upgrade insecure requests
// ========================================

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        checkOnLoad: true,
        logToConsole: true,
        fixAutomatically: false,  // Set to true to auto-upgrade HTTP to HTTPS
        showWarnings: true,
        trackInsecure: true
    };

    /**
     * Check all links on the page for HTTP
     */
    function checkAllLinks() {
        const results = {
            total: 0,
            secure: 0,
            insecure: 0,
            insecureLinks: []
        };

        // Check all anchor tags
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('http://')) {
                results.insecure++;
                results.insecureLinks.push({
                    type: 'link',
                    url: href,
                    element: link,
                    text: link.textContent.trim()
                });
            } else if (href && href.startsWith('https://')) {
                results.secure++;
            }
            results.total++;
        });

        return results;
    }

    /**
     * Check all images for HTTP sources
     */
    function checkAllImages() {
        const results = {
            total: 0,
            secure: 0,
            insecure: 0,
            insecureImages: []
        };

        const images = document.querySelectorAll('img[src]');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && src.startsWith('http://')) {
                results.insecure++;
                results.insecureImages.push({
                    type: 'image',
                    url: src,
                    element: img,
                    alt: img.alt || 'No alt text'
                });
            } else if (src && src.startsWith('https://')) {
                results.secure++;
            }
            results.total++;
        });

        return results;
    }

    /**
     * Check all scripts for HTTP sources
     */
    function checkAllScripts() {
        const results = {
            total: 0,
            secure: 0,
            insecure: 0,
            insecureScripts: []
        };

        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            const src = script.getAttribute('src');
            if (src && src.startsWith('http://')) {
                results.insecure++;
                results.insecureScripts.push({
                    type: 'script',
                    url: src,
                    element: script
                });
            } else if (src && src.startsWith('https://')) {
                results.secure++;
            }
            results.total++;
        });

        return results;
    }

    /**
     * Check all stylesheets for HTTP sources
     */
    function checkAllStylesheets() {
        const results = {
            total: 0,
            secure: 0,
            insecure: 0,
            insecureStylesheets: []
        };

        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('http://')) {
                results.insecure++;
                results.insecureStylesheets.push({
                    type: 'stylesheet',
                    url: href,
                    element: link
                });
            } else if (href && href.startsWith('https://')) {
                results.secure++;
            }
            results.total++;
        });

        return results;
    }

    /**
     * Check all iframes for HTTP sources
     */
    function checkAllIframes() {
        const results = {
            total: 0,
            secure: 0,
            insecure: 0,
            insecureIframes: []
        };

        const iframes = document.querySelectorAll('iframe[src]');
        iframes.forEach(iframe => {
            const src = iframe.getAttribute('src');
            if (src && src.startsWith('http://')) {
                results.insecure++;
                results.insecureIframes.push({
                    type: 'iframe',
                    url: src,
                    element: iframe
                });
            } else if (src && src.startsWith('https://')) {
                results.secure++;
            }
            results.total++;
        });

        return results;
    }

    /**
     * Upgrade HTTP to HTTPS
     * @param {string} url - URL to upgrade
     * @returns {string} - HTTPS URL
     */
    function upgradeToHttps(url) {
        return url.replace(/^http:\/\//i, 'https://');
    }

    /**
     * Fix insecure content automatically
     * @param {Array} insecureItems - Array of insecure items
     */
    function fixInsecureContent(insecureItems) {
        let fixed = 0;

        insecureItems.forEach(item => {
            const element = item.element;
            const oldUrl = item.url;
            const newUrl = upgradeToHttps(oldUrl);

            try {
                if (item.type === 'link') {
                    element.setAttribute('href', newUrl);
                } else if (item.type === 'image') {
                    element.setAttribute('src', newUrl);
                } else if (item.type === 'script') {
                    element.setAttribute('src', newUrl);
                } else if (item.type === 'stylesheet') {
                    element.setAttribute('href', newUrl);
                } else if (item.type === 'iframe') {
                    element.setAttribute('src', newUrl);
                }
                fixed++;
            } catch (e) {
                console.error('Failed to fix:', oldUrl, e);
            }
        });

        return fixed;
    }

    /**
     * Run comprehensive HTTPS check
     */
    function runCheck() {
        const linkResults = checkAllLinks();
        const imageResults = checkAllImages();
        const scriptResults = checkAllScripts();
        const stylesheetResults = checkAllStylesheets();
        const iframeResults = checkAllIframes();

        const totalInsecure = linkResults.insecure + 
                             imageResults.insecure + 
                             scriptResults.insecure + 
                             stylesheetResults.insecure +
                             iframeResults.insecure;

        const allInsecureItems = [
            ...linkResults.insecureLinks,
            ...imageResults.insecureImages,
            ...scriptResults.insecureScripts,
            ...stylesheetResults.insecureStylesheets,
            ...iframeResults.insecureIframes
        ];

        // Log results
        if (CONFIG.logToConsole) {
            console.group('🔒 HTTPS Security Check');
            console.log(`Total Resources: ${linkResults.total + imageResults.total + scriptResults.total + stylesheetResults.total + iframeResults.total}`);
            console.log(`✅ Secure (HTTPS): ${linkResults.secure + imageResults.secure + scriptResults.secure + stylesheetResults.secure + iframeResults.secure}`);
            console.log(`❌ Insecure (HTTP): ${totalInsecure}`);
            
            if (totalInsecure > 0) {
                console.group('⚠️ Insecure Resources Found:');
                console.log(`Links: ${linkResults.insecure}`);
                console.log(`Images: ${imageResults.insecure}`);
                console.log(`Scripts: ${scriptResults.insecure}`);
                console.log(`Stylesheets: ${stylesheetResults.insecure}`);
                console.log(`Iframes: ${iframeResults.insecure}`);
                
                allInsecureItems.forEach(item => {
                    console.warn(`[${item.type.toUpperCase()}] ${item.url}`);
                });
                console.groupEnd();
            }
            
            console.groupEnd();
        }

        // Show warnings
        if (CONFIG.showWarnings && totalInsecure > 0) {
            showWarningBanner(totalInsecure, allInsecureItems);
        }

        // Auto-fix if enabled
        if (CONFIG.fixAutomatically && totalInsecure > 0) {
            const fixed = fixInsecureContent(allInsecureItems);
            console.log(`✅ Auto-fixed ${fixed} insecure resources`);
        }

        // Track in analytics
        if (CONFIG.trackInsecure && totalInsecure > 0 && typeof gtag !== 'undefined') {
            gtag('event', 'insecure_content_detected', {
                'event_category': 'Security',
                'event_label': 'HTTP Resources',
                'value': totalInsecure
            });
        }

        return {
            links: linkResults,
            images: imageResults,
            scripts: scriptResults,
            stylesheets: stylesheetResults,
            iframes: iframeResults,
            totalInsecure: totalInsecure,
            allInsecureItems: allInsecureItems
        };
    }

    /**
     * Show warning banner for insecure content
     * @param {number} count - Number of insecure items
     * @param {Array} items - Insecure items
     */
    function showWarningBanner(count, items) {
        // Only show in development
        if (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1') {
            
            const banner = document.createElement('div');
            banner.id = 'https-warning-banner';
            banner.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #ff3b3b;
                color: white;
                padding: 15px;
                text-align: center;
                z-index: 999999;
                font-family: Arial, sans-serif;
                font-size: 14px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            `;
            
            banner.innerHTML = `
                <strong>⚠️ Security Warning:</strong> 
                ${count} insecure HTTP resource${count > 1 ? 's' : ''} detected on this page.
                <button onclick="console.table(window.HTTPSChecker.getResults().allInsecureItems)" 
                        style="margin-left: 10px; padding: 5px 10px; background: white; color: #ff3b3b; border: none; border-radius: 4px; cursor: pointer;">
                    View Details
                </button>
                <button onclick="document.getElementById('https-warning-banner').remove()" 
                        style="margin-left: 10px; padding: 5px 10px; background: rgba(255,255,255,0.2); color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Dismiss
                </button>
            `;
            
            document.body.insertBefore(banner, document.body.firstChild);
        }
    }

    /**
     * Check if page itself is HTTPS
     */
    function checkPageProtocol() {
        const protocol = window.location.protocol;
        const isHttps = protocol === 'https:';
        
        if (CONFIG.logToConsole) {
            if (isHttps) {
                console.log('✅ Page is served over HTTPS');
            } else {
                console.warn('⚠️ Page is NOT served over HTTPS');
                console.log('Current protocol:', protocol);
            }
        }
        
        return isHttps;
    }

    /**
     * Check if upgrade-insecure-requests meta tag is present
     */
    function checkUpgradeMetaTag() {
        const metaTag = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        const hasUpgrade = metaTag && 
                          metaTag.content && 
                          metaTag.content.includes('upgrade-insecure-requests');
        
        if (CONFIG.logToConsole) {
            if (hasUpgrade) {
                console.log('✅ upgrade-insecure-requests meta tag found');
            } else {
                console.warn('⚠️ upgrade-insecure-requests meta tag not found');
                console.log('Add this to <head>: <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
            }
        }
        
        return hasUpgrade;
    }

    /**
     * Initialize HTTPS checker
     */
    function init() {
        checkPageProtocol();
        checkUpgradeMetaTag();
        
        if (CONFIG.checkOnLoad) {
            // Check after page fully loads
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', runCheck);
            } else {
                runCheck();
            }
        }
    }

    // Public API
    window.HTTPSChecker = {
        check: runCheck,
        checkLinks: checkAllLinks,
        checkImages: checkAllImages,
        checkScripts: checkAllScripts,
        checkStylesheets: checkAllStylesheets,
        checkIframes: checkAllIframes,
        checkPageProtocol: checkPageProtocol,
        checkUpgradeMetaTag: checkUpgradeMetaTag,
        upgradeToHttps: upgradeToHttps,
        fixInsecureContent: function() {
            const results = runCheck();
            return fixInsecureContent(results.allInsecureItems);
        },
        getResults: function() {
            return runCheck();
        },
        config: function(newConfig) {
            Object.assign(CONFIG, newConfig);
        }
    };

    // Auto-initialize
    init();

})();

/*
USAGE:

// Automatically checks on page load
// View results in console

// Manual check
HTTPSChecker.check();

// Get detailed results
const results = HTTPSChecker.getResults();
console.table(results.allInsecureItems);

// Check specific resource types
HTTPSChecker.checkLinks();
HTTPSChecker.checkImages();

// Auto-fix insecure content (use with caution)
HTTPSChecker.config({ fixAutomatically: true });
HTTPSChecker.check();

// Or manually fix
HTTPSChecker.fixInsecureContent();
*/
