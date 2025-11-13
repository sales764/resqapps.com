/**
 * Newsletter Subscription with EmailJS Integration
 * Sends confirmation emails to subscribers using EmailJS
 */

(function() {
    'use strict';

    // EmailJS Configuration
    const EMAILJS_CONFIG = {
        serviceId: 'service_b4kky23',
        templateId: 'zu99b2p',
        publicKey: 'DqmkWe82GB4TOL1ri'
    };

    // Initialize EmailJS
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('[Newsletter EmailJS] Initialized successfully');
        } else {
            console.error('[Newsletter EmailJS] EmailJS library not loaded');
        }
    }

    // Send confirmation email via EmailJS
    async function sendConfirmationEmail(email) {
        try {
            const templateParams = {
                email: email,
                to_email: email
            };

            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );

            console.log('[Newsletter EmailJS] Confirmation email sent:', response);
            return { success: true, response };
        } catch (error) {
            console.error('[Newsletter EmailJS] Error sending email:', error);
            return { success: false, error };
        }
    }

    // Intercept form submission
    function setupFormInterceptor() {
        const form = document.querySelector('.stellar-notify-form');
        
        if (!form) {
            console.warn('[Newsletter EmailJS] Form not found');
            return;
        }

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[name="email"]');
            const submitBtn = form.querySelector('.stellar-submit-btn');
            const email = emailInput?.value?.trim();

            if (!email) {
                alert('Please enter a valid email address');
                return;
            }

            // Disable button during submission
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';

            try {
                // Step 1: Submit to Formspree (collects email for you)
                const formData = new FormData(form);
                const formspreeResponse = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!formspreeResponse.ok) {
                    throw new Error('Formspree submission failed');
                }

                console.log('[Newsletter EmailJS] Formspree submission successful');

                // Step 2: Send confirmation email via EmailJS
                const emailJsResult = await sendConfirmationEmail(email);

                if (emailJsResult.success) {
                    console.log('[Newsletter EmailJS] Confirmation email sent successfully');
                } else {
                    console.warn('[Newsletter EmailJS] Email sending failed, but subscription recorded');
                }

                // Step 3: Redirect to thank you page
                window.location.href = form.querySelector('input[name="_next"]')?.value || '/thank-you.html';

            } catch (error) {
                console.error('[Newsletter EmailJS] Submission error:', error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                alert('An error occurred. Please try again.');
            }
        });

        console.log('[Newsletter EmailJS] Form interceptor setup complete');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initEmailJS();
            setupFormInterceptor();
        });
    } else {
        initEmailJS();
        setupFormInterceptor();
    }

})();
