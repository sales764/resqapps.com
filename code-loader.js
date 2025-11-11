// ========================================
// DYNAMIC CODE LOADER
// Item 49/78: Code splitting & lazy loading
// ========================================

(function() {
    'use strict';

    // Feature detection
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    const supportsImport = 'noModule' in HTMLScriptElement.prototype;

    // Loaded modules tracking
    const loadedModules = new Set();

    /**
     * Dynamically loads a JavaScript file
     * @param {string} src - Script URL to load
     * @param {Object} [options={}] - Loading options
     * @param {boolean} [options.async=true] - Load asynchronously
     * @param {boolean} [options.defer=false] - Defer execution
     * @returns {Promise} Promise that resolves when script loads
     * @example
     * CodeLoader.loadScript('analytics.js').then(() => console.log('Loaded!'));
     */
    function loadScript(src, options = {}) {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (loadedModules.has(src)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = options.async !== false;
            script.defer = options.defer || false;

            script.onload = () => {
                loadedModules.add(src);
                resolve();
            };

            script.onerror = () => {
                reject(new Error(`Failed to load script: ${src}`));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Dynamically loads a CSS file
     * @param {string} href - CSS URL to load
     * @returns {Promise} Promise that resolves when CSS loads
     * @example
     * CodeLoader.loadCSS('extra-styles.css');
     */
    function loadCSS(href) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`link[href="${href}"]`)) {
                resolve();
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;

            link.onload = resolve;
            link.onerror = reject;

            document.head.appendChild(link);
        });
    }

    /**
     * Loads script when element becomes visible (lazy loading)
     * Uses IntersectionObserver for efficient scroll detection
     * @param {string} selector - CSS selector for target element
     * @param {string} scriptSrc - Script URL to load when visible
     * @example
     * CodeLoader.lazyLoadOnScroll('.comments-section', 'comments.js');
     */
    function lazyLoadOnScroll(selector, scriptSrc) {
        const elements = document.querySelectorAll(selector);
        
        if (!elements.length || !supportsIntersectionObserver) {
            loadScript(scriptSrc);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadScript(scriptSrc);
                    observer.disconnect();
                }
            });
        }, {
            rootMargin: '50px'
        });

        elements.forEach(el => observer.observe(el));
    }

    /**
     * Loads script on first user interaction (click, scroll, etc.)
     * Improves initial load performance
     * @param {string} eventType - Event type to listen for ('click', 'scroll', etc.)
     * @param {string} scriptSrc - Script URL to load
     * @example
     * CodeLoader.loadOnInteraction('click', 'interactive-features.js');
     */
    function loadOnInteraction(eventType, scriptSrc) {
        const handler = () => {
            loadScript(scriptSrc);
            document.removeEventListener(eventType, handler);
        };

        document.addEventListener(eventType, handler, { once: true });
    }

    /**
     * Preloads a script for future navigation (doesn't execute)
     * Uses <link rel="preload"> for browser optimization
     * @param {string} src - Script URL to preload
     * @example
     * CodeLoader.preloadScript('about-page.js'); // Preload for next page
     */
    function preloadScript(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = src;
        document.head.appendChild(link);
    }

    // Initialize based on page
    function init() {
        const page = window.location.pathname;

        // Core scripts always loaded (already in HTML)
        
        // Conditional loading based on features used
        
        // Social share - only if share buttons exist
        if (document.querySelector('.social-share-inline, .social-share-floating')) {
            // Already loaded, but example of conditional loading
        }

        // Newsletter popup - delay load
        setTimeout(() => {
            // Already loaded via defer
        }, 1000);

        console.log('[Code Loader] ✅ Page-specific loading ready');
    }

    // Public API
    window.CodeLoader = {
        loadScript,
        loadCSS,
        lazyLoadOnScroll,
        loadOnInteraction,
        preloadScript
    };

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// Usage examples:
/*
// Load script when user scrolls to element
CodeLoader.lazyLoadOnScroll('.comments-section', 'comments.js');

// Load on first click
CodeLoader.loadOnInteraction('click', 'analytics-extra.js');

// Preload for next page
CodeLoader.preloadScript('about-page.js');
*/
