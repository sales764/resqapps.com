// ========================================
// KEYBOARD SHORTCUTS
// Item 73/78: Keyboard shortcuts for quick navigation
// ========================================

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        // Enable/disable shortcuts
        enabled: true,
        
        // Show visual indicator when shortcut pressed
        showIndicator: true,
        
        // Indicator duration (ms)
        indicatorDuration: 2000,
        
        // Storage key
        storageKey: 'keyboard_shortcuts_enabled'
    };

    // Keyboard shortcuts map
    const SHORTCUTS = {
        // Language shortcuts (Alt + Number)
        'Alt+1': {
            description: 'Switch to English',
            action: () => switchLanguage('en'),
            category: 'Language'
        },
        'Alt+2': {
            description: 'Switch to Français',
            action: () => switchLanguage('fr'),
            category: 'Language'
        },
        'Alt+3': {
            description: 'Switch to ภาษาไทย',
            action: () => switchLanguage('th'),
            category: 'Language'
        },
        'Alt+4': {
            description: 'Switch to 中文',
            action: () => switchLanguage('zh'),
            category: 'Language'
        },
        
        // Navigation shortcuts (Alt + Letter)
        'Alt+H': {
            description: 'Go to Home',
            action: () => navigateTo('/'),
            category: 'Navigation'
        },
        'Alt+S': {
            description: 'Search',
            action: () => focusSearch(),
            category: 'Navigation'
        },
        'Alt+M': {
            description: 'Toggle Menu',
            action: () => toggleMenu(),
            category: 'Navigation'
        },
        
        // Theme shortcuts (Alt+T)
        'Alt+T': {
            description: 'Toggle Dark/Light Theme',
            action: () => toggleTheme(),
            category: 'Appearance'
        },
        
        // Accessibility shortcuts
        'Alt+K': {
            description: 'Show Keyboard Shortcuts',
            action: () => showShortcutsHelp(),
            category: 'Help'
        },
        'Alt+/': {
            description: 'Show Help',
            action: () => showShortcutsHelp(),
            category: 'Help'
        },
        
        // Scroll shortcuts
        'Alt+ArrowUp': {
            description: 'Scroll to Top',
            action: () => scrollToTop(),
            category: 'Navigation'
        },
        'Alt+ArrowDown': {
            description: 'Scroll to Bottom',
            action: () => scrollToBottom(),
            category: 'Navigation'
        }
    };

    /**
     * Switch language
     */
    function switchLanguage(lang) {
        console.log(`[Shortcuts] Switching to language: ${lang}`);
        
        // Method 1: Use GeoLanguage API if available
        if (typeof window.GeoLanguage !== 'undefined' && window.GeoLanguage.setManual) {
            window.GeoLanguage.setManual(lang);
            showIndicator(`Language: ${getLanguageName(lang)}`);
            return;
        }
        
        // Method 2: Use i18n API if available
        if (typeof window.setLanguage === 'function') {
            window.setLanguage(lang);
            showIndicator(`Language: ${getLanguageName(lang)}`);
            return;
        }
        
        // Method 3: Use i18n object
        if (typeof window.i18n !== 'undefined' && window.i18n.setLanguage) {
            window.i18n.setLanguage(lang);
            showIndicator(`Language: ${getLanguageName(lang)}`);
            return;
        }
        
        // Method 4: Set HTML lang attribute
        document.documentElement.lang = lang;
        localStorage.setItem('selectedLanguage', lang);
        showIndicator(`Language: ${getLanguageName(lang)}`);
        
        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'keyboard_shortcut_language', {
                'event_category': 'Keyboard Shortcuts',
                'event_label': lang
            });
        }
    }

    /**
     * Get language name
     */
    function getLanguageName(code) {
        const names = {
            'en': 'English',
            'fr': 'Français',
            'th': 'ภาษาไทย',
            'zh': '中文'
        };
        return names[code] || code;
    }

    /**
     * Navigate to URL
     */
    function navigateTo(url) {
        console.log(`[Shortcuts] Navigating to: ${url}`);
        window.location.href = url;
    }

    /**
     * Focus search
     */
    function focusSearch() {
        const searchInput = document.querySelector('input[type="search"]') ||
                           document.querySelector('input[name="search"]') ||
                           document.querySelector('#search') ||
                           document.querySelector('.search-input');
        
        if (searchInput) {
            searchInput.focus();
            showIndicator('Search focused');
            console.log('[Shortcuts] Search focused');
        } else {
            console.log('[Shortcuts] Search input not found');
        }
    }

    /**
     * Toggle menu
     */
    function toggleMenu() {
        // Try to find menu button
        const menuButton = document.querySelector('.menu-toggle') ||
                          document.querySelector('.mobile-menu-toggle') ||
                          document.querySelector('[aria-label*="menu"]') ||
                          document.querySelector('.hamburger');
        
        if (menuButton) {
            menuButton.click();
            showIndicator('Menu toggled');
            console.log('[Shortcuts] Menu toggled');
        } else {
            console.log('[Shortcuts] Menu button not found');
        }
    }

    /**
     * Toggle theme
     */
    function toggleTheme() {
        // Method 1: Use existing theme toggle
        const themeToggle = document.querySelector('.theme-toggle') ||
                           document.querySelector('#theme-toggle') ||
                           document.querySelector('[aria-label*="theme"]');
        
        if (themeToggle) {
            themeToggle.click();
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            showIndicator(`Theme: ${currentTheme === 'dark' ? 'Light' : 'Dark'}`);
            console.log('[Shortcuts] Theme toggled via button');
            return;
        }
        
        // Method 2: Toggle manually
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        showIndicator(`Theme: ${newTheme === 'dark' ? 'Dark' : 'Light'}`);
        console.log(`[Shortcuts] Theme changed to: ${newTheme}`);
        
        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'keyboard_shortcut_theme', {
                'event_category': 'Keyboard Shortcuts',
                'event_label': newTheme
            });
        }
    }

    /**
     * Scroll to top
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        showIndicator('Scrolled to top');
        console.log('[Shortcuts] Scrolled to top');
    }

    /**
     * Scroll to bottom
     */
    function scrollToBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
        showIndicator('Scrolled to bottom');
        console.log('[Shortcuts] Scrolled to bottom');
    }

    /**
     * Show shortcuts help modal
     */
    function showShortcutsHelp() {
        console.log('[Shortcuts] Showing help');
        
        // Check if modal already exists
        let modal = document.getElementById('keyboard-shortcuts-modal');
        
        if (modal) {
            modal.classList.add('show');
            return;
        }
        
        // Create modal
        modal = createShortcutsModal();
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
        
        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'keyboard_shortcuts_help_shown', {
                'event_category': 'Keyboard Shortcuts',
                'event_label': 'Help Modal'
            });
        }
    }

    /**
     * Create shortcuts help modal
     */
    function createShortcutsModal() {
        const modal = document.createElement('div');
        modal.id = 'keyboard-shortcuts-modal';
        modal.className = 'keyboard-shortcuts-modal';
        
        // Group shortcuts by category
        const categories = {};
        Object.entries(SHORTCUTS).forEach(([key, shortcut]) => {
            if (!categories[shortcut.category]) {
                categories[shortcut.category] = [];
            }
            categories[shortcut.category].push({ key, ...shortcut });
        });
        
        // Build category sections
        let categorySections = '';
        Object.entries(categories).forEach(([category, shortcuts]) => {
            categorySections += `
                <div class="shortcuts-category">
                    <h3 class="category-title">${category}</h3>
                    <div class="shortcuts-list">
                        ${shortcuts.map(shortcut => `
                            <div class="shortcut-item">
                                <kbd class="shortcut-key">${shortcut.key}</kbd>
                                <span class="shortcut-description">${shortcut.description}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        modal.innerHTML = `
            <div class="shortcuts-overlay"></div>
            <div class="shortcuts-content">
                <div class="shortcuts-header">
                    <h2>⌨️ Keyboard Shortcuts</h2>
                    <button class="shortcuts-close" aria-label="Close">×</button>
                </div>
                <div class="shortcuts-body">
                    ${categorySections}
                </div>
                <div class="shortcuts-footer">
                    <p>Press <kbd>Alt+K</kbd> or <kbd>Alt+/</kbd> to toggle this panel</p>
                </div>
            </div>
        `;
        
        // Event listeners
        modal.querySelector('.shortcuts-close').addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        modal.querySelector('.shortcuts-overlay').addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        return modal;
    }

    /**
     * Show visual indicator
     */
    function showIndicator(text) {
        if (!CONFIG.showIndicator) return;
        
        // Remove existing indicator
        const existing = document.querySelector('.shortcut-indicator');
        if (existing) {
            existing.remove();
        }
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'shortcut-indicator';
        indicator.textContent = text;
        document.body.appendChild(indicator);
        
        // Animate in
        setTimeout(() => {
            indicator.classList.add('show');
        }, 10);
        
        // Remove after duration
        setTimeout(() => {
            indicator.classList.remove('show');
            setTimeout(() => {
                if (indicator && indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 300);
        }, CONFIG.indicatorDuration);
    }

    /**
     * Parse key combination
     */
    function parseKeyCombination(event) {
        const keys = [];
        
        if (event.ctrlKey) keys.push('Ctrl');
        if (event.altKey) keys.push('Alt');
        if (event.shiftKey) keys.push('Shift');
        if (event.metaKey) keys.push('Meta');
        
        // Handle special keys
        const specialKeys = {
            'ArrowUp': 'ArrowUp',
            'ArrowDown': 'ArrowDown',
            'ArrowLeft': 'ArrowLeft',
            'ArrowRight': 'ArrowRight',
            '/': '/'
        };
        
        const key = specialKeys[event.key] || event.key.toUpperCase();
        
        if (key && !['CONTROL', 'ALT', 'SHIFT', 'META'].includes(key)) {
            keys.push(key);
        }
        
        return keys.join('+');
    }

    /**
     * Handle keyboard event
     */
    function handleKeyboard(event) {
        // Don't intercept if user is typing in input/textarea
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' || 
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable) {
            return;
        }
        
        // Parse key combination
        const combination = parseKeyCombination(event);
        
        // Check if shortcut exists
        const shortcut = SHORTCUTS[combination];
        
        if (shortcut) {
            event.preventDefault();
            console.log(`[Shortcuts] Triggered: ${combination}`);
            shortcut.action();
            
            // Track in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'keyboard_shortcut_used', {
                    'event_category': 'Keyboard Shortcuts',
                    'event_label': combination
                });
            }
        }
    }

    /**
     * Initialize keyboard shortcuts
     */
    function init() {
        // Check if enabled
        const enabled = localStorage.getItem(CONFIG.storageKey);
        if (enabled === 'false') {
            console.log('[Shortcuts] Disabled by user');
            return;
        }
        
        // Listen for keyboard events
        document.addEventListener('keydown', handleKeyboard);
        
        console.log('[Shortcuts] Initialized');
        console.log('[Shortcuts] Press Alt+K or Alt+/ for help');
    }

    // Public API
    window.KeyboardShortcuts = {
        /**
         * Enable shortcuts
         */
        enable: function() {
            CONFIG.enabled = true;
            localStorage.setItem(CONFIG.storageKey, 'true');
            console.log('[Shortcuts] Enabled');
        },
        
        /**
         * Disable shortcuts
         */
        disable: function() {
            CONFIG.enabled = false;
            localStorage.setItem(CONFIG.storageKey, 'false');
            console.log('[Shortcuts] Disabled');
        },
        
        /**
         * Show help
         */
        showHelp: showShortcutsHelp,
        
        /**
         * Get all shortcuts
         */
        getShortcuts: function() {
            return SHORTCUTS;
        },
        
        /**
         * Add custom shortcut
         */
        addShortcut: function(key, description, action, category = 'Custom') {
            SHORTCUTS[key] = {
                description,
                action,
                category
            };
            console.log(`[Shortcuts] Added: ${key}`);
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
<script src="keyboard-shortcuts.js"></script>

// Show help
KeyboardShortcuts.showHelp();

// Disable shortcuts
KeyboardShortcuts.disable();

// Enable shortcuts
KeyboardShortcuts.enable();

// Add custom shortcut
KeyboardShortcuts.addShortcut('Alt+C', 'Custom action', () => {
    console.log('Custom!');
}, 'Custom');

AVAILABLE SHORTCUTS:

Language:
- Alt+1: English
- Alt+2: Français
- Alt+3: ภาษาไทย
- Alt+4: 中文

Navigation:
- Alt+H: Home
- Alt+S: Search
- Alt+M: Toggle Menu
- Alt+↑: Scroll to Top
- Alt+↓: Scroll to Bottom

Appearance:
- Alt+T: Toggle Theme

Help:
- Alt+K: Show Shortcuts Help
- Alt+/: Show Shortcuts Help

ACCESSIBILITY:
- Works with screen readers
- Visual indicators for feedback
- Can be disabled if needed
- Non-intrusive (respects input fields)
*/
