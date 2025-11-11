// ========================================
// BACK TO TOP BUTTON
// Item 62/78: Scroll to top functionality
// ========================================

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        showAfter: 300,        // Show after scrolling 300px
        scrollDuration: 800,   // Scroll duration in ms
        easing: 'easeInOutCubic',
        buttonClass: 'back-to-top',
        visibleClass: 'visible',
        withProgress: false,   // Show scroll progress ring
        position: 'right',     // 'right' or 'left'
        variant: 'default',    // 'default', 'emergency', 'secondary', 'minimal'
        tooltip: 'Retour en haut'
    };

    let button = null;
    let isScrolling = false;

    /**
     * Creates the back to top button
     * @returns {HTMLElement} Button element
     */
    function createButton() {
        const btn = document.createElement('button');
        btn.className = CONFIG.buttonClass;
        btn.setAttribute('aria-label', CONFIG.tooltip);
        btn.setAttribute('title', CONFIG.tooltip);
        btn.setAttribute('data-tooltip', CONFIG.tooltip);
        
        // Add variant class
        if (CONFIG.variant !== 'default') {
            btn.classList.add(CONFIG.variant);
        }
        
        // Add position class
        if (CONFIG.position === 'left') {
            btn.classList.add('position-left');
        }
        
        // Add progress ring
        if (CONFIG.withProgress) {
            btn.classList.add('back-to-top-with-progress');
            btn.setAttribute('data-progress', '0');
        }
        
        return btn;
    }

    /**
     * Shows the button
     */
    function showButton() {
        if (button && !button.classList.contains(CONFIG.visibleClass)) {
            button.classList.add(CONFIG.visibleClass);
        }
    }

    /**
     * Hides the button
     */
    function hideButton() {
        if (button && button.classList.contains(CONFIG.visibleClass)) {
            button.classList.remove(CONFIG.visibleClass);
        }
    }

    /**
     * Updates scroll progress (if enabled)
     */
    function updateProgress() {
        if (!CONFIG.withProgress || !button) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        const progress = Math.min(Math.round(scrollPercent), 100);
        
        button.setAttribute('data-progress', progress);
    }

    /**
     * Handles scroll event
     */
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > CONFIG.showAfter) {
            showButton();
        } else {
            hideButton();
        }
        
        updateProgress();
    }

    /**
     * Easing functions
     */
    const easingFunctions = {
        linear: t => t,
        easeInQuad: t => t * t,
        easeOutQuad: t => t * (2 - t),
        easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeInCubic: t => t * t * t,
        easeOutCubic: t => (--t) * t * t + 1,
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    };

    /**
     * Smooth scroll to top
     */
    function scrollToTop() {
        if (isScrolling) return;
        
        const start = window.pageYOffset || document.documentElement.scrollTop;
        const startTime = performance.now();
        const easing = easingFunctions[CONFIG.easing] || easingFunctions.easeInOutCubic;
        
        isScrolling = true;
        
        function scroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / CONFIG.scrollDuration, 1);
            const easedProgress = easing(progress);
            
            window.scrollTo(0, start * (1 - easedProgress));
            
            if (progress < 1) {
                requestAnimationFrame(scroll);
            } else {
                isScrolling = false;
                
                // Track in analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_to_top', {
                        'event_category': 'Navigation',
                        'event_label': 'Back to Top Button'
                    });
                }
            }
        }
        
        requestAnimationFrame(scroll);
    }

    /**
     * Handles button click
     * @param {Event} e - Click event
     */
    function handleClick(e) {
        e.preventDefault();
        scrollToTop();
    }

    /**
     * Handles keyboard events
     * @param {Event} e - Keyboard event
     */
    function handleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    }

    /**
     * Throttle function for scroll events
     * @param {Function} func - Function to throttle
     * @param {number} wait - Wait time in ms
     * @returns {Function} Throttled function
     */
    function throttle(func, wait) {
        let timeout = null;
        let previous = 0;
        
        return function() {
            const now = Date.now();
            const remaining = wait - (now - previous);
            
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(this, arguments);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    previous = Date.now();
                    timeout = null;
                    func.apply(this, arguments);
                }, remaining);
            }
        };
    }

    /**
     * Initialize back to top button
     */
    function init() {
        // Create button
        button = createButton();
        document.body.appendChild(button);
        
        // Add event listeners
        button.addEventListener('click', handleClick);
        button.addEventListener('keydown', handleKeydown);
        
        // Scroll listener (throttled)
        const throttledScroll = throttle(handleScroll, 100);
        window.addEventListener('scroll', throttledScroll, { passive: true });
        
        // Initial check
        handleScroll();
    }

    /**
     * Public API
     */
    window.BackToTop = {
        /**
         * Initialize with custom config
         * @param {Object} config - Configuration options
         */
        init: function(config) {
            if (config) {
                Object.assign(CONFIG, config);
            }
            init();
        },
        
        /**
         * Show button manually
         */
        show: showButton,
        
        /**
         * Hide button manually
         */
        hide: hideButton,
        
        /**
         * Scroll to top programmatically
         */
        scrollToTop: scrollToTop,
        
        /**
         * Update configuration
         * @param {Object} config - New configuration
         */
        config: function(config) {
            Object.assign(CONFIG, config);
            if (button) {
                button.setAttribute('data-tooltip', CONFIG.tooltip);
                button.setAttribute('aria-label', CONFIG.tooltip);
            }
        }
    };

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/* 
USAGE:

// Auto-initialized with defaults
// Button appears automatically after scrolling 300px

// Custom initialization
BackToTop.init({
    showAfter: 500,           // Show after 500px
    scrollDuration: 1000,     // 1 second scroll
    withProgress: true,       // Show progress ring
    variant: 'emergency',     // Red button
    position: 'left',         // Bottom left position
    tooltip: 'Back to top'    // Custom tooltip
});

// Programmatic control
BackToTop.show();            // Show button
BackToTop.hide();            // Hide button
BackToTop.scrollToTop();     // Scroll to top

// Update config
BackToTop.config({
    tooltip: 'Scroll up'
});
*/
