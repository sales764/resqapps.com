// ========================================
// ADVANCED EMAIL VALIDATOR
// Item 44/78: Format + Domain + Typo detection
// ========================================

(function() {
    'use strict';

    // Configuration
    const config = {
        // Common email providers
        commonProviders: [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'icloud.com', 'mail.com', 'aol.com', 'protonmail.com',
            'zoho.com', 'yandex.com', 'gmx.com', 'live.com',
            'msn.com', 'me.com', 'mac.com', 'inbox.com'
        ],
        
        // Common typos
        commonTypos: {
            'gmial.com': 'gmail.com',
            'gmai.com': 'gmail.com',
            'gmil.com': 'gmail.com',
            'gmaul.com': 'gmail.com',
            'gmeil.com': 'gmail.com',
            'yahooo.com': 'yahoo.com',
            'yaho.com': 'yahoo.com',
            'hotmial.com': 'hotmail.com',
            'hotmai.com': 'hotmail.com',
            'outlok.com': 'outlook.com',
            'outloo.com': 'outlook.com',
            'icould.com': 'icloud.com',
            'iclod.com': 'icloud.com'
        },
        
        // Validation settings
        checkDomain: true,          // DNS lookup (requires API or manual)
        suggestTypos: true,         // Suggest corrections
        blockDisposable: true,      // Block temp email services
        strictMode: false,          // Extra validation rules
        
        // Disposable email domains (partial list)
        disposableDomains: [
            'tempmail.com', '10minutemail.com', 'guerrillamail.com',
            'mailinator.com', 'throwaway.email', 'temp-mail.org',
            'getnada.com', 'maildrop.cc', 'trashmail.com'
        ],
        
        // UI settings
        showInlineErrors: true,
        showSuggestions: false,     // Disabled - was blocking popup button
        autoCorrect: false          // Auto-apply suggestions
    };

    // Email regex (RFC 5322 simplified)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    /**
     * Validates email format according to RFC 5322
     * @param {string} email - Email address to validate
     * @returns {Object} Validation result with valid flag and error/email
     * @example
     * validateFormat('john@gmail.com')
     * // Returns: { valid: true, email: 'john@gmail.com' }
     */
    function validateFormat(email) {
        if (!email || email.trim() === '') {
            return { valid: false, error: 'Email is required' };
        }

        email = email.trim().toLowerCase();

        // Check length
        if (email.length > 254) {
            return { valid: false, error: 'Email is too long (max 254 characters)' };
        }

        // Check basic format
        if (!emailRegex.test(email)) {
            return { valid: false, error: 'Invalid email format' };
        }

        // Check for spaces
        if (email.includes(' ')) {
            return { valid: false, error: 'Email cannot contain spaces' };
        }

        // Split into parts
        const parts = email.split('@');
        if (parts.length !== 2) {
            return { valid: false, error: 'Email must contain exactly one @' };
        }

        const [local, domain] = parts;

        // Check local part
        if (local.length === 0 || local.length > 64) {
            return { valid: false, error: 'Invalid email address' };
        }

        // Check domain
        if (domain.length === 0 || domain.length > 253) {
            return { valid: false, error: 'Invalid domain' };
        }

        // Check for consecutive dots
        if (email.includes('..')) {
            return { valid: false, error: 'Email cannot contain consecutive dots' };
        }

        // Check domain has at least one dot
        if (!domain.includes('.')) {
            return { valid: false, error: 'Domain must contain a dot (e.g., gmail.com)' };
        }

        // Check TLD (top-level domain)
        const tld = domain.split('.').pop();
        if (tld.length < 2) {
            return { valid: false, error: 'Invalid domain extension' };
        }

        return { valid: true, email: email };
    }

    /**
     * Checks for common email typos using Levenshtein distance
     * @param {string} email - Email address to check
     * @returns {Object} Object with hasSuggestion flag and suggestion/reason if found
     * @example
     * checkTypos('john@gmial.com')
     * // Returns: { hasSuggestion: true, suggestion: 'john@gmail.com', reason: 'Did you mean gmail.com?' }
     */
    function checkTypos(email) {
        const domain = email.split('@')[1];
        
        // Direct typo match
        if (config.commonTypos[domain]) {
            return {
                hasSuggestion: true,
                suggestion: email.replace(domain, config.commonTypos[domain]),
                reason: `Did you mean ${config.commonTypos[domain]}?`
            };
        }

        // Levenshtein distance check for similar domains
        for (const provider of config.commonProviders) {
            const distance = levenshteinDistance(domain, provider);
            
            // If domain is very similar (1-2 characters different)
            if (distance > 0 && distance <= 2) {
                return {
                    hasSuggestion: true,
                    suggestion: email.replace(domain, provider),
                    reason: `Did you mean ${provider}?`
                };
            }
        }

        return { hasSuggestion: false };
    }

    /**
     * Calculates Levenshtein distance between two strings
     * Used to detect similar domains (typo detection)
     * @param {string} str1 - First string
     * @param {string} str2 - Second string
     * @returns {number} Edit distance between strings
     */
    function levenshteinDistance(str1, str2) {
        const matrix = [];

        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[str2.length][str1.length];
    }

    /**
     * Checks if email uses a disposable/temporary email service
     * @param {string} email - Email address to check
     * @returns {Object} Object with isDisposable flag and error if disposable
     */
    function checkDisposable(email) {
        if (!config.blockDisposable) return { isDisposable: false };

        const domain = email.split('@')[1];
        
        if (config.disposableDomains.includes(domain)) {
            return {
                isDisposable: true,
                error: 'Temporary email addresses are not allowed'
            };
        }

        return { isDisposable: false };
    }

    /**
     * Complete email validation (format + disposable + typo check)
     * @param {string} email - Email address to validate
     * @returns {Object} Validation result with valid flag, error, suggestion
     * @example
     * validate('john@gmial.com')
     * // Returns: { valid: true, email: 'john@gmial.com', suggestion: 'john@gmail.com', suggestionReason: 'Did you mean gmail.com?' }
     */
    function validate(email) {
        // Step 1: Format validation
        const formatCheck = validateFormat(email);
        if (!formatCheck.valid) {
            return {
                valid: false,
                error: formatCheck.error,
                email: email
            };
        }

        email = formatCheck.email;

        // Step 2: Disposable check
        const disposableCheck = checkDisposable(email);
        if (disposableCheck.isDisposable) {
            return {
                valid: false,
                error: disposableCheck.error,
                email: email
            };
        }

        // Step 3: Typo check
        const typoCheck = checkTypos(email);
        if (typoCheck.hasSuggestion && config.suggestTypos) {
            return {
                valid: true,
                email: email,
                suggestion: typoCheck.suggestion,
                suggestionReason: typoCheck.reason
            };
        }

        // All good!
        return {
            valid: true,
            email: email
        };
    }

    // Create suggestion UI
    function showSuggestion(input, suggestion, reason) {
        // Remove existing suggestion
        const existingSuggestion = input.parentElement.querySelector('.email-suggestion');
        if (existingSuggestion) {
            existingSuggestion.remove();
        }

        // Create suggestion element
        const suggestionEl = document.createElement('div');
        suggestionEl.className = 'email-suggestion';
        suggestionEl.innerHTML = `
            <span class="suggestion-text">
                ${reason} 
                <button class="suggestion-btn" data-suggestion="${suggestion}">
                    Use ${suggestion}
                </button>
            </span>
            <button class="suggestion-close">&times;</button>
        `;

        // Insert after input
        input.parentElement.insertBefore(suggestionEl, input.nextSibling);

        // Add event listeners
        const useBtn = suggestionEl.querySelector('.suggestion-btn');
        const closeBtn = suggestionEl.querySelector('.suggestion-close');

        useBtn.addEventListener('click', () => {
            input.value = suggestion;
            suggestionEl.remove();
            
            // Trigger validation again
            const event = new Event('input', { bubbles: true });
            input.dispatchEvent(event);
            
            // Track with GA4
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_suggestion_accepted', {
                    'event_category': 'Form',
                    'event_label': suggestion
                });
            }
        });

        closeBtn.addEventListener('click', () => {
            suggestionEl.remove();
        });
    }

    // Show error message
    function showError(input, error) {
        // Remove existing error
        const existingError = input.parentElement.querySelector('.email-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error class to input
        input.classList.add('email-invalid');

        // Create error element
        const errorEl = document.createElement('div');
        errorEl.className = 'email-error';
        errorEl.textContent = error;

        // Insert after input (or after suggestion if exists)
        const suggestion = input.parentElement.querySelector('.email-suggestion');
        if (suggestion) {
            input.parentElement.insertBefore(errorEl, suggestion.nextSibling);
        } else {
            input.parentElement.insertBefore(errorEl, input.nextSibling);
        }
    }

    // Clear error message
    function clearError(input) {
        const error = input.parentElement.querySelector('.email-error');
        if (error) {
            error.remove();
        }
        input.classList.remove('email-invalid');
        input.classList.add('email-valid');
    }

    // Add CSS styles
    function addStyles() {
        if (document.getElementById('email-validator-styles')) return;

        const style = document.createElement('style');
        style.id = 'email-validator-styles';
        style.textContent = `
            /* Email input states */
            input[type="email"].email-invalid {
                border-color: #ff3b3b !important;
                background: rgba(255, 59, 59, 0.05);
            }
            
            input[type="email"].email-valid {
                border-color: #4caf50 !important;
                background: rgba(76, 175, 80, 0.05);
            }
            
            /* Error message */
            .email-error {
                color: #ff3b3b;
                font-size: 13px;
                margin-top: 6px;
                display: flex;
                align-items: center;
                gap: 6px;
                animation: slideDown 0.3s ease;
            }
            
            .email-error::before {
                content: '⚠';
                font-size: 16px;
            }
            
            /* Suggestion box */
            .email-suggestion {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                margin-top: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                animation: slideDown 0.3s ease;
                box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
            }
            
            .suggestion-text {
                flex: 1;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .suggestion-btn {
                background: white;
                color: #4facfe;
                border: none;
                padding: 6px 14px;
                border-radius: 6px;
                font-weight: 600;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .suggestion-btn:hover {
                background: rgba(255, 255, 255, 0.9);
                transform: translateY(-2px);
            }
            
            .suggestion-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            
            .suggestion-close:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            /* Animations */
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Mobile */
            @media (max-width: 768px) {
                .email-suggestion {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .suggestion-text {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .suggestion-btn {
                    width: 100%;
                }
            }
        `;

        document.head.appendChild(style);
    }

    // Attach to email inputs
    function attachToInputs() {
        const emailInputs = document.querySelectorAll('input[type="email"]');

        emailInputs.forEach(input => {
            // Skip if already attached
            if (input.dataset.validatorAttached) return;
            input.dataset.validatorAttached = 'true';

            // Validate on blur
            input.addEventListener('blur', () => {
                const email = input.value.trim();
                if (!email) {
                    clearError(input);
                    return;
                }

                const result = validate(email);

                if (!result.valid) {
                    showError(input, result.error);
                } else {
                    clearError(input);
                    
                    if (result.suggestion) {
                        showSuggestion(input, result.suggestion, result.suggestionReason);
                    }
                }
            });

            // Clear error on focus
            input.addEventListener('focus', () => {
                const error = input.parentElement.querySelector('.email-error');
                if (error) {
                    input.classList.remove('email-invalid');
                }
            });

            // Validate on input (debounced)
            let timeout;
            input.addEventListener('input', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    const email = input.value.trim();
                    if (email.length > 5 && email.includes('@')) {
                        const result = validate(email);
                        
                        if (result.valid && result.suggestion) {
                            showSuggestion(input, result.suggestion, result.suggestionReason);
                        }
                    }
                }, 500);
            });
        });
    }

    // Initialize
    function init() {
        addStyles();
        attachToInputs();

        // Re-attach on dynamic content
        const observer = new MutationObserver(() => {
            attachToInputs();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('[Email Validator] ✅ Initialized');
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    window.EmailValidator = {
        validate: validate,
        validateFormat: validateFormat,
        checkTypos: checkTypos,
        checkDisposable: checkDisposable
    };

})();
