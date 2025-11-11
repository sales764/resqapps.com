// ========================================
// INPUT SANITIZATION & XSS PREVENTION
// Item 67/78: Sanitize and validate user inputs
// ========================================

(function() {
    'use strict';

    /**
     * HTML Escape - Prevent XSS by escaping HTML characters
     */
    function escapeHtml(str) {
        if (typeof str !== 'string') return '';
        
        const htmlEscapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        };
        
        return str.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char]);
    }

    /**
     * Strip HTML tags - Remove all HTML from string
     */
    function stripHtml(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/<[^>]*>/g, '');
    }

    /**
     * Sanitize email
     */
    function sanitizeEmail(email) {
        if (!email) return '';
        
        // Convert to lowercase
        email = email.toLowerCase().trim();
        
        // Remove any HTML
        email = stripHtml(email);
        
        // Remove spaces
        email = email.replace(/\s+/g, '');
        
        // Basic email validation pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(email)) {
            return ''; // Invalid email
        }
        
        return email;
    }

    /**
     * Sanitize name (alphanumeric, spaces, hyphens, apostrophes)
     */
    function sanitizeName(name) {
        if (!name) return '';
        
        // Trim whitespace
        name = name.trim();
        
        // Remove HTML
        name = stripHtml(name);
        
        // Remove any character that's not letter, space, hyphen, or apostrophe
        name = name.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '');
        
        // Remove multiple spaces
        name = name.replace(/\s+/g, ' ');
        
        // Limit length
        if (name.length > 100) {
            name = name.substring(0, 100);
        }
        
        return name;
    }

    /**
     * Sanitize phone number
     */
    function sanitizePhone(phone) {
        if (!phone) return '';
        
        // Remove HTML
        phone = stripHtml(phone);
        
        // Keep only numbers, spaces, hyphens, parentheses, and plus sign
        phone = phone.replace(/[^0-9\s\-()+ ]/g, '');
        
        // Remove multiple spaces
        phone = phone.replace(/\s+/g, ' ').trim();
        
        return phone;
    }

    /**
     * Sanitize message/textarea content
     */
    function sanitizeMessage(message) {
        if (!message) return '';
        
        // Trim whitespace
        message = message.trim();
        
        // Remove HTML tags (keep text content only)
        message = stripHtml(message);
        
        // Escape remaining special characters
        message = escapeHtml(message);
        
        // Remove control characters except newlines
        message = message.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F]/g, '');
        
        // Limit length
        if (message.length > 5000) {
            message = message.substring(0, 5000);
        }
        
        return message;
    }

    /**
     * Sanitize URL
     */
    function sanitizeUrl(url) {
        if (!url) return '';
        
        // Trim whitespace
        url = url.trim();
        
        // Remove HTML
        url = stripHtml(url);
        
        // Only allow http:// and https:// protocols
        if (!url.match(/^https?:\/\//i)) {
            return '';
        }
        
        try {
            const urlObj = new URL(url);
            // Reconstruct URL to ensure it's valid
            return urlObj.href;
        } catch (e) {
            return ''; // Invalid URL
        }
    }

    /**
     * Validate email format
     */
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    /**
     * Check for XSS patterns
     */
    function containsXSS(str) {
        const xssPatterns = [
            /<script[^>]*>.*?<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,  // onclick=, onload=, etc.
            /<iframe/gi,
            /<object/gi,
            /<embed/gi,
            /eval\(/gi,
            /expression\(/gi
        ];
        
        return xssPatterns.some(pattern => pattern.test(str));
    }

    /**
     * Check for SQL injection patterns
     */
    function containsSQLInjection(str) {
        const sqlPatterns = [
            /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/gi,
            /UNION\s+SELECT/gi,
            /DROP\s+TABLE/gi,
            /INSERT\s+INTO/gi,
            /DELETE\s+FROM/gi,
            /UPDATE\s+\w+\s+SET/gi,
            /--/g,
            /;.*?SELECT/gi
        ];
        
        return sqlPatterns.some(pattern => pattern.test(str));
    }

    /**
     * Sanitize form data
     */
    function sanitizeFormData(formData) {
        const sanitized = {};
        
        for (const [key, value] of Object.entries(formData)) {
            if (typeof value !== 'string') {
                sanitized[key] = value;
                continue;
            }
            
            // Sanitize based on field type
            if (key === 'email') {
                sanitized[key] = sanitizeEmail(value);
            } else if (key === 'name' || key.includes('name')) {
                sanitized[key] = sanitizeName(value);
            } else if (key === 'phone' || key.includes('phone')) {
                sanitized[key] = sanitizePhone(value);
            } else if (key === 'message' || key === 'comment' || key === 'description') {
                sanitized[key] = sanitizeMessage(value);
            } else if (key === 'url' || key === 'website') {
                sanitized[key] = sanitizeUrl(value);
            } else {
                // Default: escape HTML
                sanitized[key] = escapeHtml(stripHtml(value));
            }
        }
        
        return sanitized;
    }

    /**
     * Auto-sanitize form on submit
     */
    function protectForm(form, options = {}) {
        if (!form) return;
        
        const config = {
            preventXSS: true,
            preventSQL: true,
            showErrors: true,
            ...options
        };
        
        form.addEventListener('submit', (e) => {
            // Get form data
            const formData = new FormData(form);
            const data = {};
            
            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Check for XSS
            if (config.preventXSS) {
                for (const [key, value] of Object.entries(data)) {
                    if (typeof value === 'string' && containsXSS(value)) {
                        e.preventDefault();
                        if (config.showErrors) {
                            showError(form, 'Invalid input detected. Please remove any HTML or script tags.');
                        }
                        
                        // Track in analytics
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'xss_attempt_blocked', {
                                'event_category': 'Security',
                                'event_label': key
                            });
                        }
                        
                        return false;
                    }
                }
            }
            
            // Check for SQL injection
            if (config.preventSQL) {
                for (const [key, value] of Object.entries(data)) {
                    if (typeof value === 'string' && containsSQLInjection(value)) {
                        e.preventDefault();
                        if (config.showErrors) {
                            showError(form, 'Invalid input detected. Please check your input.');
                        }
                        
                        // Track in analytics
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'sql_injection_blocked', {
                                'event_category': 'Security',
                                'event_label': key
                            });
                        }
                        
                        return false;
                    }
                }
            }
            
            // Sanitize all inputs
            const sanitized = sanitizeFormData(data);
            
            // Update form values with sanitized data
            for (const [key, value] of Object.entries(sanitized)) {
                const field = form.elements[key];
                if (field && typeof value === 'string') {
                    field.value = value;
                }
            }
        });
    }

    /**
     * Show error message
     */
    function showError(form, message) {
        // Remove existing error
        const existingError = form.querySelector('.sanitization-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'sanitization-error';
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
            <span style="font-size: 20px;">🛡️</span>
            <span>${message}</span>
        `;
        
        // Insert at top of form
        form.insertBefore(errorDiv, form.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => errorDiv.remove(), 5000);
    }

    /**
     * Real-time sanitization on input
     */
    function enableRealTimeSanitization(form) {
        if (!form) return;
        
        // Email fields
        const emailFields = form.querySelectorAll('input[type="email"], input[name="email"]');
        emailFields.forEach(field => {
            field.addEventListener('blur', () => {
                field.value = sanitizeEmail(field.value);
            });
        });
        
        // Name fields
        const nameFields = form.querySelectorAll('input[name*="name"]');
        nameFields.forEach(field => {
            field.addEventListener('blur', () => {
                field.value = sanitizeName(field.value);
            });
        });
        
        // Phone fields
        const phoneFields = form.querySelectorAll('input[type="tel"], input[name*="phone"]');
        phoneFields.forEach(field => {
            field.addEventListener('blur', () => {
                field.value = sanitizePhone(field.value);
            });
        });
        
        // Message/textarea fields
        const messageFields = form.querySelectorAll('textarea');
        messageFields.forEach(field => {
            field.addEventListener('blur', () => {
                field.value = sanitizeMessage(field.value);
            });
        });
    }

    // Public API
    window.InputSanitizer = {
        /**
         * Escape HTML characters
         */
        escapeHtml: escapeHtml,
        
        /**
         * Strip HTML tags
         */
        stripHtml: stripHtml,
        
        /**
         * Sanitize specific field types
         */
        sanitizeEmail: sanitizeEmail,
        sanitizeName: sanitizeName,
        sanitizePhone: sanitizePhone,
        sanitizeMessage: sanitizeMessage,
        sanitizeUrl: sanitizeUrl,
        
        /**
         * Sanitize entire form data object
         */
        sanitizeFormData: sanitizeFormData,
        
        /**
         * Validation
         */
        isValidEmail: isValidEmail,
        containsXSS: containsXSS,
        containsSQLInjection: containsSQLInjection,
        
        /**
         * Protect form from XSS and SQL injection
         */
        protectForm: protectForm,
        
        /**
         * Enable real-time sanitization
         */
        enableRealTime: enableRealTimeSanitization
    };

})();

/*
USAGE:

// 1. Protect form (automatic on submit)
InputSanitizer.protectForm(document.querySelector('#contact-form'));

// 2. Enable real-time sanitization (on blur)
InputSanitizer.enableRealTime(document.querySelector('#newsletter-form'));

// 3. Manual sanitization
const email = InputSanitizer.sanitizeEmail(userInput);
const name = InputSanitizer.sanitizeName(userInput);
const message = InputSanitizer.sanitizeMessage(userInput);

// 4. Sanitize entire form data
const formData = {
    email: 'test@example.com',
    name: 'John <script>alert("xss")</script> Doe',
    message: 'Hello <b>world</b>'
};
const clean = InputSanitizer.sanitizeFormData(formData);

// 5. Check for malicious content
if (InputSanitizer.containsXSS(input)) {
    alert('XSS detected!');
}

// 6. Escape HTML for safe display
const safe = InputSanitizer.escapeHtml(userContent);
document.getElementById('output').textContent = safe;
*/
