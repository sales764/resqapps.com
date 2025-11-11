// ========================================
// THEME TOGGLE FUNCTIONALITY
// Item 58/78: Dark/Light mode switcher
// ========================================

(function() {
    'use strict';

    // Theme keys
    const THEME_KEY = 'resq-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    /**
     * Gets current theme from localStorage or system preference
     * @returns {string} Current theme ('dark' or 'light')
     */
    function getCurrentTheme() {
        // Check localStorage first
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            return savedTheme;
        }

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return LIGHT;
        }

        // Default to dark (optimal for emergency app)
        return DARK;
    }

    /**
     * Applies theme to document
     * @param {string} theme - Theme to apply ('dark' or 'light')
     */
    function applyTheme(theme) {
        if (theme === LIGHT) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        // Save to localStorage
        localStorage.setItem(THEME_KEY, theme);

        // Update toggle button aria-label
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            const newLabel = theme === DARK 
                ? 'Switch to light mode' 
                : 'Switch to dark mode';
            toggle.setAttribute('aria-label', newLabel);
        }

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme } 
        }));
    }

    /**
     * Toggles between dark and light themes
     */
    function toggleTheme() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === DARK ? LIGHT : DARK;
        
        // Add animation class
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.classList.add('animating');
            setTimeout(() => {
                toggle.classList.remove('animating');
            }, 500);
        }

        applyTheme(newTheme);

        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_toggle', {
                'theme': newTheme
            });
        }
    }

    /**
     * Creates toggle button HTML
     * @returns {string} Toggle button HTML
     */
    function createToggleButton() {
        const currentTheme = getCurrentTheme();
        const ariaLabel = currentTheme === DARK 
            ? 'Switch to light mode' 
            : 'Switch to dark mode';

        return `
            <button 
                class="theme-toggle" 
                aria-label="${ariaLabel}"
                title="${ariaLabel}"
            >
                <span class="theme-toggle-icon theme-toggle-dark">🌙</span>
                <span class="theme-toggle-icon theme-toggle-light">☀️</span>
            </button>
        `;
    }

    /**
     * Initializes theme toggle
     */
    function init() {
        // Apply saved or system theme immediately (before page render)
        const currentTheme = getCurrentTheme();
        applyTheme(currentTheme);

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupToggle);
        } else {
            setupToggle();
        }
    }

    /**
     * Sets up toggle button and event listeners
     */
    function setupToggle() {
        // Create and insert toggle button
        const toggleHTML = createToggleButton();
        document.body.insertAdjacentHTML('beforeend', toggleHTML);

        // Add click event
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', toggleTheme);

            // Keyboard support
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
            
            // Modern browsers
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', (e) => {
                    // Only apply if user hasn't manually set a preference
                    if (!localStorage.getItem(THEME_KEY)) {
                        applyTheme(e.matches ? LIGHT : DARK);
                    }
                });
            }
        }
    }

    /**
     * Programmatic API
     */
    window.ThemeToggle = {
        get current() {
            return getCurrentTheme();
        },
        
        set(theme) {
            if (theme === DARK || theme === LIGHT) {
                applyTheme(theme);
            }
        },
        
        toggle() {
            toggleTheme();
        },
        
        reset() {
            localStorage.removeItem(THEME_KEY);
            const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches 
                ? LIGHT 
                : DARK;
            applyTheme(systemTheme);
        }
    };

    // Initialize
    init();

})();

/* 
USAGE EXAMPLES:

// Get current theme
const theme = ThemeToggle.current; // 'dark' or 'light'

// Set theme programmatically
ThemeToggle.set('light');
ThemeToggle.set('dark');

// Toggle theme
ThemeToggle.toggle();

// Reset to system preference
ThemeToggle.reset();

// Listen for theme changes
window.addEventListener('themechange', (e) => {
    console.log('Theme changed to:', e.detail.theme);
});
*/
