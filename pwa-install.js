// ========================================
// PWA INSTALL PROMPT
// Item 70/78: Custom "Add to Home Screen" prompt
// ========================================

(function() {
    'use strict';

    let deferredPrompt = null;
    let installPromptShown = false;

    // Configuration
    const CONFIG = {
        // Show prompt after user visits X pages
        minPageViews: 2,
        
        // Show prompt after X seconds on site
        minTimeOnSite: 30000, // 30 seconds
        
        // Don't show again if dismissed for X days
        dismissedDuration: 7 * 24 * 60 * 60 * 1000, // 7 days
        
        // Don't show again if installed
        rememberInstalled: true,
        
        // Storage keys
        storageKeys: {
            pageViews: 'pwa_page_views',
            dismissed: 'pwa_dismissed_at',
            installed: 'pwa_installed'
        }
    };

    /**
     * Check if PWA is installable
     */
    function isPWAInstallable() {
        // Check if beforeinstallprompt is supported
        if (!('BeforeInstallPromptEvent' in window)) {
            return false;
        }

        // Check if already installed
        if (isStandalone()) {
            return false;
        }

        // Check if user previously installed
        if (CONFIG.rememberInstalled && localStorage.getItem(CONFIG.storageKeys.installed)) {
            return false;
        }

        // Check if user recently dismissed
        const dismissedAt = localStorage.getItem(CONFIG.storageKeys.dismissed);
        if (dismissedAt) {
            const timeSinceDismissed = Date.now() - parseInt(dismissedAt);
            if (timeSinceDismissed < CONFIG.dismissedDuration) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check if PWA is running in standalone mode
     */
    function isStandalone() {
        return window.matchMedia('(display-mode: standalone)').matches ||
               window.navigator.standalone ||
               document.referrer.includes('android-app://');
    }

    /**
     * Track page view
     */
    function trackPageView() {
        const pageViews = parseInt(localStorage.getItem(CONFIG.storageKeys.pageViews) || '0');
        localStorage.setItem(CONFIG.storageKeys.pageViews, (pageViews + 1).toString());
        return pageViews + 1;
    }

    /**
     * Check if should show prompt
     */
    function shouldShowPrompt() {
        if (!isPWAInstallable()) {
            return false;
        }

        if (installPromptShown) {
            return false;
        }

        const pageViews = parseInt(localStorage.getItem(CONFIG.storageKeys.pageViews) || '0');
        return pageViews >= CONFIG.minPageViews;
    }

    /**
     * Create install prompt UI
     */
    function createPromptUI() {
        const prompt = document.createElement('div');
        prompt.id = 'pwa-install-prompt';
        prompt.className = 'pwa-prompt';
        prompt.innerHTML = `
            <div class="pwa-prompt-overlay"></div>
            <div class="pwa-prompt-card">
                <button class="pwa-prompt-close" aria-label="Close" title="Close">
                    ×
                </button>
                
                <div class="pwa-prompt-icon">
                    📱
                </div>
                
                <h3 class="pwa-prompt-title">
                    Install RESQ+
                </h3>
                
                <p class="pwa-prompt-message">
                    Get instant access to emergency services. Install our app for:
                </p>
                
                <ul class="pwa-prompt-benefits">
                    <li>
                        <span class="benefit-icon">⚡</span>
                        <span>Faster loading</span>
                    </li>
                    <li>
                        <span class="benefit-icon">📴</span>
                        <span>Works offline</span>
                    </li>
                    <li>
                        <span class="benefit-icon">🏠</span>
                        <span>Home screen access</span>
                    </li>
                    <li>
                        <span class="benefit-icon">🔔</span>
                        <span>Push notifications</span>
                    </li>
                </ul>
                
                <div class="pwa-prompt-actions">
                    <button class="pwa-prompt-install">
                        <span class="button-icon">📥</span>
                        <span>Install App</span>
                    </button>
                    <button class="pwa-prompt-dismiss">
                        Not Now
                    </button>
                </div>
                
                <div class="pwa-prompt-note">
                    Free, no registration required
                </div>
            </div>
        `;

        return prompt;
    }

    /**
     * Show install prompt
     */
    function showPrompt() {
        if (!shouldShowPrompt() || !deferredPrompt) {
            return;
        }

        installPromptShown = true;

        const prompt = createPromptUI();
        document.body.appendChild(prompt);

        // Animate in
        setTimeout(() => {
            prompt.classList.add('show');
        }, 100);

        // Setup event listeners
        const installBtn = prompt.querySelector('.pwa-prompt-install');
        const dismissBtn = prompt.querySelector('.pwa-prompt-dismiss');
        const closeBtn = prompt.querySelector('.pwa-prompt-close');
        const overlay = prompt.querySelector('.pwa-prompt-overlay');

        installBtn.addEventListener('click', () => installPWA(prompt));
        dismissBtn.addEventListener('click', () => dismissPrompt(prompt));
        closeBtn.addEventListener('click', () => dismissPrompt(prompt));
        overlay.addEventListener('click', () => dismissPrompt(prompt));

        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pwa_prompt_shown', {
                'event_category': 'PWA',
                'event_label': 'Install Prompt'
            });
        }
    }

    /**
     * Install PWA
     */
    async function installPWA(prompt) {
        if (!deferredPrompt) {
            console.error('No deferred prompt available');
            return;
        }

        // Show native install prompt
        deferredPrompt.prompt();

        // Wait for user choice
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted PWA install');
            
            // Mark as installed
            localStorage.setItem(CONFIG.storageKeys.installed, 'true');
            
            // Track in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'pwa_installed', {
                    'event_category': 'PWA',
                    'event_label': 'Accepted'
                });
            }
            
            // Remove prompt
            removePrompt(prompt);
        } else {
            console.log('User dismissed PWA install');
            
            // Track in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'pwa_install_declined', {
                    'event_category': 'PWA',
                    'event_label': 'Declined'
                });
            }
            
            // Mark as dismissed
            dismissPrompt(prompt);
        }

        // Clear deferred prompt
        deferredPrompt = null;
    }

    /**
     * Dismiss prompt
     */
    function dismissPrompt(prompt) {
        // Mark as dismissed
        localStorage.setItem(CONFIG.storageKeys.dismissed, Date.now().toString());

        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pwa_prompt_dismissed', {
                'event_category': 'PWA',
                'event_label': 'Dismissed'
            });
        }

        // Remove prompt
        removePrompt(prompt);
    }

    /**
     * Remove prompt from DOM
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
     * Show install button in header (always visible)
     */
    function showInstallButton() {
        // Check if button already exists
        if (document.querySelector('.pwa-install-button')) {
            return;
        }

        // Create install button
        const button = document.createElement('button');
        button.className = 'pwa-install-button';
        button.innerHTML = `
            <span class="button-icon">📥</span>
            <span class="button-text">Install App</span>
        `;
        button.title = 'Install RESQ+ App';
        button.setAttribute('aria-label', 'Install RESQ+ App');

        // Add click handler
        button.addEventListener('click', () => {
            const prompt = createPromptUI();
            document.body.appendChild(prompt);
            setTimeout(() => prompt.classList.add('show'), 100);
            
            const installBtn = prompt.querySelector('.pwa-prompt-install');
            const dismissBtn = prompt.querySelector('.pwa-prompt-dismiss');
            const closeBtn = prompt.querySelector('.pwa-prompt-close');
            const overlay = prompt.querySelector('.pwa-prompt-overlay');
            
            installBtn.addEventListener('click', () => installPWA(prompt));
            dismissBtn.addEventListener('click', () => dismissPrompt(prompt));
            closeBtn.addEventListener('click', () => dismissPrompt(prompt));
            overlay.addEventListener('click', () => dismissPrompt(prompt));
        });

        // Find header or create container
        const header = document.querySelector('header') || document.querySelector('.header');
        if (header) {
            header.appendChild(button);
        } else {
            // Create floating button
            button.classList.add('floating');
            document.body.appendChild(button);
        }
    }

    /**
     * Initialize PWA install prompt
     */
    function init() {
        // Track page view
        trackPageView();

        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent default browser prompt
            e.preventDefault();
            
            // Store event for later use
            deferredPrompt = e;
            
            console.log('PWA install prompt captured');

            // Show install button in header
            if (isPWAInstallable()) {
                showInstallButton();
            }

            // Show custom prompt after time delay
            setTimeout(() => {
                showPrompt();
            }, CONFIG.minTimeOnSite);
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            
            // Mark as installed
            localStorage.setItem(CONFIG.storageKeys.installed, 'true');
            
            // Track in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'pwa_app_installed', {
                    'event_category': 'PWA',
                    'event_label': 'Installed'
                });
            }

            // Remove install button
            const installBtn = document.querySelector('.pwa-install-button');
            if (installBtn) {
                installBtn.remove();
            }
        });

        // If already in standalone mode
        if (isStandalone()) {
            console.log('PWA is running in standalone mode');
            
            // Track in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'pwa_standalone_launch', {
                    'event_category': 'PWA',
                    'event_label': 'Standalone'
                });
            }
        }
    }

    // Public API
    window.PWAInstall = {
        /**
         * Manually show install prompt
         */
        show: function() {
            showPrompt();
        },

        /**
         * Check if PWA is installable
         */
        isInstallable: isPWAInstallable,

        /**
         * Check if running in standalone mode
         */
        isStandalone: isStandalone,

        /**
         * Reset (for testing)
         */
        reset: function() {
            localStorage.removeItem(CONFIG.storageKeys.pageViews);
            localStorage.removeItem(CONFIG.storageKeys.dismissed);
            localStorage.removeItem(CONFIG.storageKeys.installed);
            installPromptShown = false;
        }
    };

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/*
USAGE:

// Automatic - just include the script
<script src="pwa-install.js"></script>

// Manual trigger
PWAInstall.show();

// Check if installable
if (PWAInstall.isInstallable()) {
    console.log('PWA can be installed');
}

// Check if standalone
if (PWAInstall.isStandalone()) {
    console.log('Running as installed app');
}

// Reset (for testing)
PWAInstall.reset();
*/
