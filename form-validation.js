// ========================================
// FORM VALIDATION
// Item 60/78: Real-time form validation
// ========================================

(function() {
    'use strict';

    /**
     * Validation rules
     */
    const rules = {
        required: (value) => value.trim() !== '',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => /^[\d\s\-\+\(\)]+$/.test(value) && value.replace(/\D/g, '').length >= 10,
        minLength: (value, length) => value.length >= length,
        maxLength: (value, length) => value.length <= length,
        pattern: (value, pattern) => new RegExp(pattern).test(value),
        url: (value) => /^https?:\/\/.+\..+/.test(value),
        number: (value) => !isNaN(value) && value.trim() !== '',
        min: (value, min) => parseFloat(value) >= min,
        max: (value, max) => parseFloat(value) <= max
    };

    /**
     * Error messages
     */
    const messages = {
        required: 'Ce champ est obligatoire',
        email: 'Veuillez entrer une adresse email valide',
        phone: 'Veuillez entrer un numéro de téléphone valide',
        minLength: 'Minimum {0} caractères requis',
        maxLength: 'Maximum {0} caractères autorisés',
        pattern: 'Format invalide',
        url: 'Veuillez entrer une URL valide',
        number: 'Veuillez entrer un nombre valide',
        min: 'La valeur minimale est {0}',
        max: 'La valeur maximale est {0}',
        match: 'Les champs ne correspondent pas',
        passwordStrength: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre'
    };

    /**
     * Validates a single field
     * @param {HTMLElement} field - Input field to validate
     * @returns {Object} Validation result
     */
    function validateField(field) {
        const value = field.value;
        const validations = field.dataset.validate ? field.dataset.validate.split('|') : [];
        const errors = [];

        validations.forEach(validation => {
            const [rule, param] = validation.split(':');
            
            if (rule === 'required' && !rules.required(value)) {
                errors.push(messages.required);
            }
            else if (value && rule === 'email' && !rules.email(value)) {
                errors.push(messages.email);
            }
            else if (value && rule === 'phone' && !rules.phone(value)) {
                errors.push(messages.phone);
            }
            else if (value && rule === 'minLength' && !rules.minLength(value, parseInt(param))) {
                errors.push(messages.minLength.replace('{0}', param));
            }
            else if (value && rule === 'maxLength' && !rules.maxLength(value, parseInt(param))) {
                errors.push(messages.maxLength.replace('{0}', param));
            }
            else if (value && rule === 'pattern' && !rules.pattern(value, param)) {
                errors.push(messages.pattern);
            }
            else if (value && rule === 'url' && !rules.url(value)) {
                errors.push(messages.url);
            }
            else if (value && rule === 'number' && !rules.number(value)) {
                errors.push(messages.number);
            }
            else if (value && rule === 'min' && !rules.min(value, parseFloat(param))) {
                errors.push(messages.min.replace('{0}', param));
            }
            else if (value && rule === 'max' && !rules.max(value, parseFloat(param))) {
                errors.push(messages.max.replace('{0}', param));
            }
        });

        // Check match (for password confirmation)
        if (field.dataset.match) {
            const matchField = document.getElementById(field.dataset.match);
            if (matchField && value !== matchField.value) {
                errors.push(messages.match);
            }
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Displays error message
     * @param {HTMLElement} field - Input field
     * @param {Array} errors - Error messages
     */
    function showError(field, errors) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        // Add invalid class
        field.classList.add('invalid');
        field.classList.remove('valid');
        formGroup.classList.add('invalid');
        formGroup.classList.remove('valid');

        // Get or create error message element
        let errorMsg = formGroup.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
        }

        // Show first error
        errorMsg.textContent = errors[0];
        errorMsg.classList.add('show');

        // Hide success message if exists
        const successMsg = formGroup.querySelector('.success-message');
        if (successMsg) {
            successMsg.classList.remove('show');
        }

        // Trigger shake animation
        field.style.animation = 'none';
        setTimeout(() => {
            field.style.animation = 'shakeSubtle 0.4s ease';
        }, 10);
    }

    /**
     * Displays success state
     * @param {HTMLElement} field - Input field
     */
    function showSuccess(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        // Add valid class
        field.classList.add('valid');
        field.classList.remove('invalid');
        formGroup.classList.add('valid');
        formGroup.classList.remove('invalid');

        // Hide error message
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.classList.remove('show');
        }

        // Show success message if configured
        if (field.dataset.successMessage) {
            let successMsg = formGroup.querySelector('.success-message');
            if (!successMsg) {
                successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                field.parentNode.insertBefore(successMsg, field.nextSibling);
            }
            successMsg.textContent = field.dataset.successMessage;
            successMsg.classList.add('show');
        }
    }

    /**
     * Validates entire form
     * @param {HTMLFormElement} form - Form to validate
     * @returns {boolean} Form validity
     */
    function validateForm(form) {
        const fields = form.querySelectorAll('[data-validate]');
        let isValid = true;
        const errorSummary = [];

        fields.forEach(field => {
            const result = validateField(field);
            
            if (!result.valid) {
                isValid = false;
                showError(field, result.errors);
                errorSummary.push({
                    field: field.name || field.id,
                    label: field.dataset.label || field.name,
                    errors: result.errors
                });
            } else if (field.value) {
                showSuccess(field);
            }
        });

        // Show error summary
        showErrorSummary(form, errorSummary);

        return isValid;
    }

    /**
     * Shows form error summary
     * @param {HTMLFormElement} form - Form element
     * @param {Array} errors - Array of errors
     */
    function showErrorSummary(form, errors) {
        let summary = form.querySelector('.form-error-summary');
        
        if (errors.length > 0) {
            if (!summary) {
                summary = document.createElement('div');
                summary.className = 'form-error-summary';
                form.insertBefore(summary, form.firstChild);
            }

            const errorList = errors.map(e => 
                `<li><strong>${e.label}:</strong> ${e.errors[0]}</li>`
            ).join('');

            summary.innerHTML = `
                <h4>Veuillez corriger les erreurs suivantes:</h4>
                <ul>${errorList}</ul>
            `;
            summary.classList.add('show');

            // Scroll to summary
            summary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (summary) {
            summary.classList.remove('show');
        }
    }

    /**
     * Password strength checker
     * @param {string} password - Password to check
     * @returns {Object} Strength result
     */
    function checkPasswordStrength(password) {
        let strength = 0;
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*]/.test(password)
        };

        Object.values(checks).forEach(check => {
            if (check) strength++;
        });

        let level = 'weak';
        let text = 'Faible';
        
        if (strength >= 4) {
            level = 'strong';
            text = 'Fort';
        } else if (strength >= 3) {
            level = 'medium';
            text = 'Moyen';
        }

        return {
            level,
            text,
            checks,
            strength: (strength / 5) * 100
        };
    }

    /**
     * Shows password strength indicator
     * @param {HTMLElement} field - Password field
     */
    function showPasswordStrength(field) {
        const result = checkPasswordStrength(field.value);
        let indicator = field.parentNode.querySelector('.password-strength');

        if (!indicator && field.value) {
            indicator = document.createElement('div');
            indicator.className = 'password-strength';
            indicator.innerHTML = `
                <div class="password-strength-bar">
                    <div class="password-strength-fill"></div>
                </div>
                <div class="password-strength-text"></div>
            `;
            field.parentNode.insertBefore(indicator, field.nextSibling);
        }

        if (indicator && field.value) {
            indicator.className = `password-strength ${result.level}`;
            indicator.querySelector('.password-strength-text').textContent = `Force: ${result.text}`;
            indicator.querySelector('.password-strength-fill').style.width = result.strength + '%';
        } else if (indicator && !field.value) {
            indicator.remove();
        }
    }

    /**
     * Character counter
     * @param {HTMLElement} field - Input/textarea field
     */
    function updateCharCounter(field) {
        const maxLength = field.getAttribute('maxlength');
        if (!maxLength) return;

        let counter = field.parentNode.querySelector('.char-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'char-counter';
            field.parentNode.insertBefore(counter, field.nextSibling);
        }

        const remaining = maxLength - field.value.length;
        counter.textContent = `${field.value.length} / ${maxLength} caractères`;

        counter.classList.remove('warning', 'error');
        if (remaining < maxLength * 0.1) {
            counter.classList.add('error');
        } else if (remaining < maxLength * 0.2) {
            counter.classList.add('warning');
        }
    }

    /**
     * Email suggestion (typo detection)
     * @param {HTMLElement} field - Email field
     */
    function suggestEmail(field) {
        if (!field.value || !field.value.includes('@')) return;

        const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        const [local, domain] = field.value.split('@');
        
        // Simple typo detection
        const typos = {
            'gmial.com': 'gmail.com',
            'gmai.com': 'gmail.com',
            'yahooo.com': 'yahoo.com',
            'hotmial.com': 'hotmail.com'
        };

        if (typos[domain]) {
            const suggestion = `${local}@${typos[domain]}`;
            showEmailSuggestion(field, suggestion);
        }
    }

    /**
     * Shows email suggestion
     * @param {HTMLElement} field - Email field
     * @param {string} suggestion - Suggested email
     */
    function showEmailSuggestion(field, suggestion) {
        let suggestionEl = field.parentNode.querySelector('.email-suggestion');
        
        if (!suggestionEl) {
            suggestionEl = document.createElement('div');
            suggestionEl.className = 'email-suggestion';
            field.parentNode.insertBefore(suggestionEl, field.nextSibling);
        }

        suggestionEl.textContent = `Vouliez-vous dire: ${suggestion}?`;
        suggestionEl.classList.add('show');

        suggestionEl.onclick = () => {
            field.value = suggestion;
            suggestionEl.classList.remove('show');
            validateField(field);
        };
    }

    /**
     * Initialize form validation
     */
    function init() {
        // Find all forms with validation
        const forms = document.querySelectorAll('form[data-validate]');

        forms.forEach(form => {
            // Real-time validation on input
            form.addEventListener('input', (e) => {
                if (e.target.dataset.validate) {
                    const result = validateField(e.target);
                    
                    if (result.valid && e.target.value) {
                        showSuccess(e.target);
                    } else if (!result.valid) {
                        showError(e.target, result.errors);
                    }

                    // Password strength
                    if (e.target.type === 'password') {
                        showPasswordStrength(e.target);
                    }

                    // Character counter
                    if (e.target.getAttribute('maxlength')) {
                        updateCharCounter(e.target);
                    }

                    // Email suggestions
                    if (e.target.type === 'email') {
                        suggestEmail(e.target);
                    }
                }
            });

            // Validation on blur
            form.addEventListener('blur', (e) => {
                if (e.target.dataset.validate && e.target.value) {
                    const result = validateField(e.target);
                    
                    if (result.valid) {
                        showSuccess(e.target);
                    } else {
                        showError(e.target, result.errors);
                    }
                }
            }, true);

            // Form submission
            form.addEventListener('submit', (e) => {
                if (!validateForm(form)) {
                    e.preventDefault();
                    return false;
                }

                // Add loading state
                form.classList.add('form-submitting');
            });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    window.FormValidator = {
        validate: validateForm,
        validateField: validateField,
        checkPasswordStrength: checkPasswordStrength
    };

})();

/* 
USAGE:

HTML:
<form data-validate>
    <div class="form-group">
        <label for="email" class="required">Email</label>
        <input 
            type="email" 
            id="email" 
            name="email"
            data-validate="required|email"
            data-label="Email"
            data-success-message="Email valide!"
        >
    </div>
    
    <div class="form-group">
        <label for="password" class="required">Mot de passe</label>
        <input 
            type="password" 
            id="password"
            data-validate="required|minLength:8"
            data-label="Mot de passe"
        >
    </div>
    
    <button type="submit">Envoyer</button>
</form>

JavaScript:
// Validate programmatically
FormValidator.validate(formElement);

// Validate single field
FormValidator.validateField(inputElement);
*/
