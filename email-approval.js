/* ============================================
   EMAIL APPROVAL SYSTEM FOR STORIES
   Sends story submissions to admin email for approval
   ============================================ */

// EmailJS Configuration
// Sign up at https://www.emailjs.com/ and get your keys
const EMAIL_CONFIG = {
    serviceId: 'service_bekeyz3',  // EmailJS Service ID
    templateId: 'template_bdcbm0', // EmailJS Template ID
    publicKey: 'DqmkWeB2GB4TOL1ri'    // EmailJS Public Key
};

// Alternative: Formspree (simpler setup)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvlkypvo'; // Real Formspree form ID

// Admin email for notifications
const ADMIN_EMAIL = 'sales@sornsawan.com';

// EmailJS is a third-party library served by the jsDelivr CDN. It used to be loaded on every page
// view (even on pages without a form) and now loads only when a story is actually sent.
const EMAILJS_LIB_URL = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
let emailJsLoading = null;

function loadEmailJS() {
    if (typeof emailjs !== 'undefined') return Promise.resolve(true);
    if (!emailJsLoading) {
        emailJsLoading = new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = EMAILJS_LIB_URL;
            script.onload = () => resolve(true);
            script.onerror = () => { emailJsLoading = null; resolve(false); };
            document.head.appendChild(script);
        });
    }
    return emailJsLoading;
}

// Initialize EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAIL_CONFIG.publicKey);
        console.log('✅ EmailJS initialized');
        return true;
    }
    console.log('⚠️ EmailJS not configured yet');
    return false;
}

// Send story approval email to admin
async function sendStoryApprovalEmail(formData) {
    const storyData = {
        name: formData.get('name'),
        email: formData.get('email'),
        storyType: formData.get('storyType'),
        story: formData.get('story'),
        socialLink: formData.get('socialLink') || 'N/A',
        timestamp: new Date().toLocaleString(),
        fileName: formData.get('media')?.name || 'No file'
    };

    // Load the EmailJS library now (only when a story is sent), then try it first
    await loadEmailJS();
    initEmailJS();
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
        try {
            const response = await emailjs.send(
                EMAIL_CONFIG.serviceId,
                EMAIL_CONFIG.templateId,
                {
                    to_email: ADMIN_EMAIL,
                    from_name: storyData.name,
                    from_email: storyData.email,
                    story_type: storyData.storyType,
                    story_text: storyData.story,
                    social_link: storyData.socialLink,
                    timestamp: storyData.timestamp,
                    file_name: storyData.fileName,
                    subject: `[RESQ+] New Story Approval Required: ${storyData.storyType}`,
                    message: `
                        🆕 NEW STORY SUBMISSION FOR APPROVAL
                        
                        📋 Details:
                        - Name: ${storyData.name}
                        - Email: ${storyData.email}
                        - Type: ${storyData.storyType}
                        - Timestamp: ${storyData.timestamp}
                        
                        📖 Story:
                        ${storyData.story}
                        
                        🔗 Social Media:
                        ${storyData.socialLink}
                        
                        📁 Media File:
                        ${storyData.fileName}
                        
                        ⚠️ ACTION REQUIRED: Review and approve/reject this story
                        
                        Reply to this email to contact the submitter directly.
                    `
                }
            );
            console.log('✅ Email sent via EmailJS:', response);
            return { success: true, method: 'EmailJS' };
        } catch (error) {
            console.error('❌ EmailJS failed:', error);
            // Fall through to Formspree
        }
    }

    // Try Formspree as fallback
    if (FORMSPREE_ENDPOINT !== 'https://formspree.io/f/YOUR_FORM_ID') {
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                console.log('✅ Email sent via Formspree');
                return { success: true, method: 'Formspree' };
            } else {
                throw new Error('Formspree request failed');
            }
        } catch (error) {
            console.error('❌ Formspree failed:', error);
            // Fall through to demo mode
        }
    }

    // Demo mode - log to console
    console.log('📧 DEMO MODE - Story would be sent to:', ADMIN_EMAIL);
    console.log('Story Data:', storyData);
    return { success: true, method: 'Demo', data: storyData };
}

// Enhanced form submission handler
async function handleStorySubmission(formData) {
    try {
        // Send approval email to admin
        const emailResult = await sendStoryApprovalEmail(formData);

        // Show appropriate success message based on method
        if (emailResult.method === 'Demo') {
            if (window.toast) {
                toast.info(
                    '📧 DEMO MODE: Your story has been logged. In production, an approval email would be sent to ' + ADMIN_EMAIL,
                    6000
                );
            }
        } else {
            if (window.toast) {
                toast.success(
                    '✅ Story submitted! An approval email has been sent to our team. You\'ll be notified if approved.',
                    5000
                );
            }
        }

        return emailResult;
    } catch (error) {
        console.error('❌ Story submission failed:', error);
        
        if (window.toast) {
            toast.error('Failed to submit story. Please try again or contact us at ' + ADMIN_EMAIL, 4000);
        }
        
        throw error;
    }
}

// Send confirmation email to user
async function sendUserConfirmation(userEmail, userName) {
    const message = {
        to_email: userEmail,
        to_name: userName,
        subject: 'RESQ+ Story Submitted - Awaiting Approval',
        message: `
            Hi ${userName},
            
            Thank you for sharing your RESQ+ emergency story! 🎉
            
            Your submission has been received and is currently under review by our team.
            
            ✅ What happens next:
            1. Our team will review your story within 48 hours
            2. If approved, we'll feature it on our website
            3. You'll receive an email notification once it's live
            4. Your social media link will be included for visibility
            
            If you have any questions, reply to this email.
            
            Best regards,
            The RESQ+ Team
            
            ---
            RESQ+ Emergency Response App
            Saving Lives Together
        `
    };

    await loadEmailJS();
    initEmailJS();
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
        try {
            await emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, message);
            console.log('✅ Confirmation sent to user');
        } catch (error) {
            console.log('⚠️ Could not send user confirmation:', error);
        }
    }
}

// Export for use in modal-stellar.js
window.emailApproval = {
    handleStorySubmission,
    sendUserConfirmation,
    initEmailJS,
    loadEmailJS,
    ADMIN_EMAIL
};

// Initialize on load (EmailJS itself is loaded later, when a story is sent)
document.addEventListener('DOMContentLoaded', () => {
    console.log('📧 Email approval system ready');
    console.log('📬 Admin email:', ADMIN_EMAIL);
});
