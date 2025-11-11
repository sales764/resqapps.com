// ========================================
// SIGNUP PROGRESS BAR
// Item 40/78: Multi-step signup form
// ========================================

(function() {
    'use strict';

    // Configuration
    const config = {
        totalSteps: 2,
        currentStep: 1,
        
        // Form selectors
        emailFormSelector: '#testimonials form, .newsletter-form, .email-signup-form',
        
        // Progress bar settings
        showStepNumbers: true,
        showStepLabels: true,
        animateProgress: true,
        
        // Step labels
        stepLabels: {
            1: 'Email',
            2: 'Confirm'
        },
        
        // Colors
        completedColor: '#4caf50',  // Green
        activeColor: '#4facfe',      // Blue
        inactiveColor: '#e0e0e0'     // Gray
    };

    // State
    let currentStepState = 1;
    let userEmail = '';

    // Create progress bar HTML
    function createProgressBarHTML() {
        return `
            <div class="signup-progress-container">
                <div class="progress-steps">
                    ${createStepsHTML()}
                </div>
                <div class="progress-bar-track">
                    <div class="progress-bar-fill" data-progress="0"></div>
                </div>
                <div class="progress-step-indicator">
                    <span class="step-text">Step <span class="step-current">1</span> of <span class="step-total">${config.totalSteps}</span></span>
                </div>
            </div>
        `;
    }

    // Create steps HTML
    function createStepsHTML() {
        let html = '';
        for (let i = 1; i <= config.totalSteps; i++) {
            const isActive = i === currentStepState;
            const isCompleted = i < currentStepState;
            const statusClass = isCompleted ? 'completed' : (isActive ? 'active' : 'inactive');
            
            html += `
                <div class="progress-step ${statusClass}" data-step="${i}">
                    <div class="step-circle">
                        ${isCompleted ? '✓' : i}
                    </div>
                    ${config.showStepLabels ? `<div class="step-label">${config.stepLabels[i] || 'Step ' + i}</div>` : ''}
                </div>
            `;
        }
        return html;
    }

    // Add CSS styles
    function addStyles() {
        if (document.getElementById('signup-progress-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'signup-progress-styles';
        style.textContent = `
            /* Progress Container */
            .signup-progress-container {
                margin-bottom: 30px;
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(20px);
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            /* Progress Steps */
            .progress-steps {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                position: relative;
            }
            
            /* Progress Step */
            .progress-step {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                flex: 1;
                position: relative;
                z-index: 2;
            }
            
            /* Step Circle */
            .step-circle {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 16px;
                transition: all 0.3s ease;
                border: 3px solid;
            }
            
            /* Step States */
            .progress-step.inactive .step-circle {
                background: transparent;
                border-color: ${config.inactiveColor};
                color: ${config.inactiveColor};
            }
            
            .progress-step.active .step-circle {
                background: ${config.activeColor};
                border-color: ${config.activeColor};
                color: white;
                box-shadow: 0 0 20px rgba(79, 172, 254, 0.5);
                animation: pulse-step 2s ease-in-out infinite;
            }
            
            .progress-step.completed .step-circle {
                background: ${config.completedColor};
                border-color: ${config.completedColor};
                color: white;
            }
            
            @keyframes pulse-step {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(79, 172, 254, 0.5);
                }
                50% {
                    box-shadow: 0 0 30px rgba(79, 172, 254, 0.8);
                }
            }
            
            /* Step Label */
            .step-label {
                font-size: 13px;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .progress-step.inactive .step-label {
                color: rgba(255, 255, 255, 0.4);
            }
            
            .progress-step.active .step-label {
                color: ${config.activeColor};
            }
            
            .progress-step.completed .step-label {
                color: ${config.completedColor};
            }
            
            /* Progress Bar Track */
            .progress-bar-track {
                width: 100%;
                height: 6px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                overflow: hidden;
                margin-bottom: 15px;
            }
            
            .progress-bar-fill {
                height: 100%;
                background: linear-gradient(90deg, ${config.activeColor}, ${config.completedColor});
                border-radius: 3px;
                transition: width 0.5s ease;
                width: 0%;
            }
            
            /* Step Indicator Text */
            .progress-step-indicator {
                text-align: center;
            }
            
            .step-text {
                color: rgba(255, 255, 255, 0.8);
                font-size: 14px;
                font-weight: 600;
            }
            
            .step-current {
                color: ${config.activeColor};
                font-weight: 700;
                font-size: 16px;
            }
            
            .step-total {
                color: rgba(255, 255, 255, 0.6);
            }
            
            /* Confirmation Step */
            .signup-confirmation {
                display: none;
                animation: fadeIn 0.5s ease;
            }
            
            .signup-confirmation.active {
                display: block;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Confirmation Content */
            .confirmation-content {
                text-align: center;
                padding: 30px 20px;
            }
            
            .confirmation-email {
                font-size: 18px;
                color: ${config.activeColor};
                font-weight: 600;
                margin: 15px 0;
                word-break: break-all;
            }
            
            .confirmation-message {
                color: rgba(255, 255, 255, 0.9);
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 25px;
            }
            
            .confirmation-buttons {
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .btn-confirm,
            .btn-edit {
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                border: none;
                font-size: 15px;
            }
            
            .btn-confirm {
                background: ${config.completedColor};
                color: white;
            }
            
            .btn-confirm:hover {
                background: #45a049;
                transform: translateY(-2px);
                box-shadow: 0 5px 20px rgba(76, 175, 80, 0.4);
            }
            
            .btn-edit {
                background: transparent;
                color: rgba(255, 255, 255, 0.8);
                border: 2px solid rgba(255, 255, 255, 0.3);
            }
            
            .btn-edit:hover {
                border-color: ${config.activeColor};
                color: ${config.activeColor};
                transform: translateY(-2px);
            }
            
            /* Mobile Responsiveness */
            @media (max-width: 768px) {
                .signup-progress-container {
                    padding: 15px;
                }
                
                .step-circle {
                    width: 35px;
                    height: 35px;
                    font-size: 14px;
                }
                
                .step-label {
                    font-size: 12px;
                }
                
                .confirmation-buttons {
                    flex-direction: column;
                }
                
                .btn-confirm,
                .btn-edit {
                    width: 100%;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Update progress
    function updateProgress(step) {
        currentStepState = step;
        
        // Update step circles
        document.querySelectorAll('.progress-step').forEach((stepEl, index) => {
            const stepNum = index + 1;
            stepEl.className = 'progress-step';
            
            if (stepNum < step) {
                stepEl.classList.add('completed');
                stepEl.querySelector('.step-circle').textContent = '✓';
            } else if (stepNum === step) {
                stepEl.classList.add('active');
                stepEl.querySelector('.step-circle').textContent = stepNum;
            } else {
                stepEl.classList.add('inactive');
                stepEl.querySelector('.step-circle').textContent = stepNum;
            }
        });
        
        // Update progress bar
        const progressPercent = ((step - 1) / (config.totalSteps - 1)) * 100;
        const progressBar = document.querySelector('.progress-bar-fill');
        if (progressBar) {
            progressBar.style.width = progressPercent + '%';
            progressBar.setAttribute('data-progress', progressPercent);
        }
        
        // Update step indicator
        const stepCurrent = document.querySelector('.step-current');
        if (stepCurrent) {
            stepCurrent.textContent = step;
        }
    }

    // Show confirmation step
    function showConfirmationStep(email) {
        userEmail = email;
        
        // Create confirmation HTML
        const confirmationHTML = `
            <div class="signup-confirmation active">
                <div class="confirmation-content">
                    <div style="font-size: 60px; margin-bottom: 20px;">📧</div>
                    <h3 style="color: white; font-size: 24px; margin-bottom: 15px;">
                        Confirm Your Email
                    </h3>
                    <p class="confirmation-message">
                        Please confirm that this email address is correct:
                    </p>
                    <div class="confirmation-email">${email}</div>
                    <p class="confirmation-message">
                        We'll send you exclusive updates about RESQ+ launch!
                    </p>
                    <div class="confirmation-buttons">
                        <button class="btn-confirm" onclick="window.SignupProgress.confirmEmail()">
                            ✓ Confirm & Subscribe
                        </button>
                        <button class="btn-edit" onclick="window.SignupProgress.goBack()">
                            ← Edit Email
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Find form container
        const form = document.querySelector(config.emailFormSelector);
        if (form) {
            // Hide original form
            form.style.display = 'none';
            
            // Insert confirmation
            form.insertAdjacentHTML('afterend', confirmationHTML);
            
            // Update progress to step 2
            updateProgress(2);
        }
    }

    // Go back to step 1
    function goBack() {
        // Remove confirmation
        const confirmation = document.querySelector('.signup-confirmation');
        if (confirmation) {
            confirmation.remove();
        }
        
        // Show original form
        const form = document.querySelector(config.emailFormSelector);
        if (form) {
            form.style.display = 'block';
        }
        
        // Update progress to step 1
        updateProgress(1);
    }

    // Confirm email and submit
    function confirmEmail() {
        // Track with GA4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'signup_completed', {
                'event_category': 'Conversion',
                'event_label': 'Email Confirmed',
                'value': userEmail
            });
        }
        
        console.log('[Signup Progress] Email confirmed:', userEmail);
        
        // Redirect to thank you page with email parameter
        setTimeout(() => {
            window.location.href = `thank-you.html?email=${encodeURIComponent(userEmail)}`;
        }, 500);
    }

    // Intercept form submission
    function interceptFormSubmit() {
        const forms = document.querySelectorAll(config.emailFormSelector);
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get email value
                const emailInput = form.querySelector('input[type="email"]');
                if (emailInput && emailInput.value) {
                    const email = emailInput.value;
                    
                    // Validate email
                    if (validateEmail(email)) {
                        showConfirmationStep(email);
                    } else {
                        alert('Please enter a valid email address');
                    }
                }
            });
        });
    }

    // Validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Initialize
    function init() {
        // Add styles
        addStyles();
        
        // Find email forms
        const forms = document.querySelectorAll(config.emailFormSelector);
        
        if (forms.length === 0) {
            console.warn('[Signup Progress] No email forms found');
            return;
        }
        
        // Insert progress bar before each form
        forms.forEach(form => {
            const progressBar = createProgressBarHTML();
            form.insertAdjacentHTML('beforebegin', progressBar);
        });
        
        // Initialize at step 1
        updateProgress(1);
        
        // Intercept form submissions
        interceptFormSubmit();
        
        console.log('[Signup Progress] ✅ Initialized');
        console.log('[Signup Progress] Forms found:', forms.length);
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    window.SignupProgress = {
        goToStep: updateProgress,
        showConfirmation: showConfirmationStep,
        confirmEmail: confirmEmail,
        goBack: goBack,
        getCurrentStep: () => currentStepState,
        getUserEmail: () => userEmail
    };

})();
