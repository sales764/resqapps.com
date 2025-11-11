// ========================================
// CLIENT-SIDE RATE LIMITER
// Item 66/78: Rate limiting for forms and API calls
// ========================================

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        // Email signup limits
        emailSignup: {
            maxAttempts: 3,           // Max attempts per window
            windowMs: 60000,          // 1 minute window
            blockDurationMs: 300000   // 5 minute block after limit exceeded
        },
        
        // Contact form limits
        contactForm: {
            maxAttempts: 5,
            windowMs: 300000,         // 5 minutes
            blockDurationMs: 900000   // 15 minutes
        },
        
        // Generic API calls
        api: {
            maxAttempts: 10,
            windowMs: 60000,
            blockDurationMs: 300000
        },
        
        // Storage key prefix
        storagePrefix: 'rateLimit_',
        
        // Enable/disable console logs
        debug: false
    };

    /**
     * Rate Limiter Class
     */
    class RateLimiter {
        constructor(identifier, config) {
            this.identifier = identifier;
            this.config = config;
            this.storageKey = CONFIG.storagePrefix + identifier;
        }

        /**
         * Get rate limit data from storage
         */
        getData() {
            try {
                const data = localStorage.getItem(this.storageKey);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                return null;
            }
        }

        /**
         * Save rate limit data to storage
         */
        setData(data) {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(data));
            } catch (e) {
                console.error('Failed to save rate limit data:', e);
            }
        }

        /**
         * Clear rate limit data
         */
        clearData() {
            localStorage.removeItem(this.storageKey);
        }

        /**
         * Check if action is allowed
         * @returns {Object} { allowed: boolean, reason: string, retryAfter: number }
         */
        check() {
            const now = Date.now();
            const data = this.getData();

            // No previous data - allow
            if (!data) {
                return { allowed: true, reason: null, retryAfter: 0 };
            }

            // Check if blocked
            if (data.blockedUntil && now < data.blockedUntil) {
                const retryAfter = Math.ceil((data.blockedUntil - now) / 1000);
                return {
                    allowed: false,
                    reason: 'blocked',
                    retryAfter: retryAfter,
                    message: `Too many attempts. Please wait ${retryAfter} seconds.`
                };
            }

            // Block expired - clear it
            if (data.blockedUntil && now >= data.blockedUntil) {
                this.clearData();
                return { allowed: true, reason: null, retryAfter: 0 };
            }

            // Check rate limit window
            const windowStart = now - this.config.windowMs;
            const attemptsInWindow = data.attempts.filter(timestamp => timestamp > windowStart);

            // Window expired - allow
            if (attemptsInWindow.length === 0) {
                this.clearData();
                return { allowed: true, reason: null, retryAfter: 0 };
            }

            // Check if limit exceeded
            if (attemptsInWindow.length >= this.config.maxAttempts) {
                const oldestAttempt = Math.min(...attemptsInWindow);
                const retryAfter = Math.ceil((oldestAttempt + this.config.windowMs - now) / 1000);
                
                return {
                    allowed: false,
                    reason: 'rate_limit',
                    retryAfter: retryAfter,
                    message: `Rate limit exceeded. Please wait ${retryAfter} seconds.`
                };
            }

            // Within limits - allow
            return { allowed: true, reason: null, retryAfter: 0 };
        }

        /**
         * Record an attempt
         */
        record() {
            const now = Date.now();
            const data = this.getData() || { attempts: [] };

            // Add current attempt
            data.attempts.push(now);

            // Clean old attempts
            const windowStart = now - this.config.windowMs;
            data.attempts = data.attempts.filter(timestamp => timestamp > windowStart);

            // Check if should block
            if (data.attempts.length >= this.config.maxAttempts) {
                data.blockedUntil = now + this.config.blockDurationMs;
                
                if (CONFIG.debug) {
                    console.warn(`Rate limit exceeded for ${this.identifier}. Blocked until ${new Date(data.blockedUntil)}`);
                }

                // Track in analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'rate_limit_exceeded', {
                        'event_category': 'Security',
                        'event_label': this.identifier,
                        'value': data.attempts.length
                    });
                }
            }

            this.setData(data);
        }

        /**
         * Reset rate limit
         */
        reset() {
            this.clearData();
        }

        /**
         * Get status info
         */
        getStatus() {
            const data = this.getData();
            if (!data) {
                return {
                    attempts: 0,
                    remaining: this.config.maxAttempts,
                    blocked: false
                };
            }

            const now = Date.now();
            const windowStart = now - this.config.windowMs;
            const attemptsInWindow = data.attempts.filter(timestamp => timestamp > windowStart);

            return {
                attempts: attemptsInWindow.length,
                remaining: Math.max(0, this.config.maxAttempts - attemptsInWindow.length),
                blocked: data.blockedUntil && now < data.blockedUntil,
                blockedUntil: data.blockedUntil || null
            };
        }
    }

    /**
     * Form Protection
     */
    class FormProtection {
        constructor(form, limiterConfig) {
            this.form = form;
            this.limiter = new RateLimiter(
                form.id || 'form_' + Date.now(),
                limiterConfig
            );
            this.init();
        }

        init() {
            // Add submit event listener
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));

            // Add visual feedback
            this.updateUI();
        }

        handleSubmit(e) {
            const check = this.limiter.check();

            if (!check.allowed) {
                e.preventDefault();
                this.showError(check.message);
                return false;
            }

            // Record attempt
            this.limiter.record();
            this.updateUI();

            return true;
        }

        showError(message) {
            // Remove existing error
            const existingError = this.form.querySelector('.rate-limit-error');
            if (existingError) {
                existingError.remove();
            }

            // Create error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'rate-limit-error';
            errorDiv.style.cssText = `
                background: #ff3b3b;
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                margin-bottom: 15px;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 10px;
            `;
            errorDiv.innerHTML = `
                <span style="font-size: 20px;">⚠️</span>
                <span>${message}</span>
            `;

            // Insert at top of form
            this.form.insertBefore(errorDiv, this.form.firstChild);

            // Remove after 5 seconds
            setTimeout(() => errorDiv.remove(), 5000);
        }

        updateUI() {
            const status = this.limiter.getStatus();
            const submitBtn = this.form.querySelector('button[type="submit"]');

            if (submitBtn && status.blocked) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.5';
                submitBtn.style.cursor = 'not-allowed';
            } else if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }
        }
    }

    /**
     * Honeypot Protection (Anti-Bot)
     */
    function addHoneypot(form) {
        // Create honeypot field (invisible to humans, visible to bots)
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website'; // Common bot target
        honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;';
        honeypot.tabIndex = -1;
        honeypot.autocomplete = 'off';
        
        form.appendChild(honeypot);

        // Check on submit
        form.addEventListener('submit', (e) => {
            if (honeypot.value) {
                e.preventDefault();
                console.warn('Bot detected via honeypot');
                
                // Track in analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'bot_detected', {
                        'event_category': 'Security',
                        'event_label': 'Honeypot'
                    });
                }
                
                return false;
            }
        });
    }

    /**
     * Timing Protection (Anti-Bot)
     */
    function addTimingCheck(form, minSeconds = 2) {
        const loadTime = Date.now();

        form.addEventListener('submit', (e) => {
            const submitTime = Date.now();
            const elapsed = (submitTime - loadTime) / 1000;

            if (elapsed < minSeconds) {
                e.preventDefault();
                console.warn(`Form submitted too quickly (${elapsed}s). Possible bot.`);
                
                // Track in analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'bot_detected', {
                        'event_category': 'Security',
                        'event_label': 'Fast Submit',
                        'value': Math.round(elapsed)
                    });
                }
                
                return false;
            }
        });
    }

    // Public API
    window.RateLimiter = {
        /**
         * Create a rate limiter
         */
        create: function(identifier, config) {
            return new RateLimiter(identifier, config || CONFIG.api);
        },

        /**
         * Protect a form with rate limiting
         */
        protectForm: function(formSelector, limiterType = 'api') {
            const form = typeof formSelector === 'string' 
                ? document.querySelector(formSelector)
                : formSelector;

            if (!form) {
                console.error('Form not found:', formSelector);
                return null;
            }

            const config = CONFIG[limiterType] || CONFIG.api;
            return new FormProtection(form, config);
        },

        /**
         * Add honeypot to form
         */
        addHoneypot: addHoneypot,

        /**
         * Add timing check to form
         */
        addTimingCheck: addTimingCheck,

        /**
         * Protect email signup form (all-in-one)
         */
        protectEmailSignup: function(formSelector) {
            const form = typeof formSelector === 'string'
                ? document.querySelector(formSelector)
                : formSelector;

            if (!form) {
                console.error('Form not found:', formSelector);
                return null;
            }

            // Rate limiting
            const protection = new FormProtection(form, CONFIG.emailSignup);

            // Honeypot
            addHoneypot(form);

            // Timing check (minimum 2 seconds)
            addTimingCheck(form, 2);

            return protection;
        },

        /**
         * Configure rate limits
         */
        config: function(newConfig) {
            Object.assign(CONFIG, newConfig);
        },

        /**
         * Get configuration
         */
        getConfig: function() {
            return { ...CONFIG };
        }
    };

})();

/*
USAGE:

// 1. Protect email signup form
RateLimiter.protectEmailSignup('#newsletter-form');

// 2. Protect contact form
RateLimiter.protectForm('#contact-form', 'contactForm');

// 3. Custom rate limiter for API calls
const apiLimiter = RateLimiter.create('api_call', {
    maxAttempts: 10,
    windowMs: 60000,
    blockDurationMs: 300000
});

// Check before API call
const check = apiLimiter.check();
if (check.allowed) {
    // Make API call
    await fetch('/api/endpoint');
    apiLimiter.record();
} else {
    console.log(check.message);
}

// 4. Add only honeypot
RateLimiter.addHoneypot(document.querySelector('#form'));

// 5. Add only timing check
RateLimiter.addTimingCheck(document.querySelector('#form'), 3);

// 6. Custom configuration
RateLimiter.config({
    emailSignup: {
        maxAttempts: 5,
        windowMs: 120000
    }
});
*/
