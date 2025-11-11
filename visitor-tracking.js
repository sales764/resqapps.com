/* ============================================
   VISITOR TRACKING & REAL-TIME NOTIFICATIONS
   Notifie l'admin de chaque visiteur et action
   ============================================ */

// Configuration
const TRACKING_CONFIG = {
    adminEmail: 'sales@sornsawan.com',
    sendImmediateNotifications: true,
    batchInterval: 5 * 60 * 1000, // 5 minutes
    trackingEnabled: true,
    detailedTracking: true
};

// Session storage
let visitorSession = {
    sessionId: null,
    startTime: null,
    pageViews: 0,
    actions: [],
    device: {},
    location: {},
    referrer: null
};

// ========================================
// INITIALIZE VISITOR SESSION
// ========================================
function initVisitorSession() {
    // Generate unique session ID
    visitorSession.sessionId = generateSessionId();
    visitorSession.startTime = new Date().toISOString();
    visitorSession.referrer = document.referrer || 'Direct';
    
    // Detect device info
    visitorSession.device = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenSize: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        mobile: /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent),
        browser: detectBrowser()
    };
    
    // Try to get location (approximate)
    getVisitorLocation();
    
    console.log('👤 New visitor session:', visitorSession.sessionId);
}

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.indexOf('Chrome') > -1) return 'Chrome';
    if (ua.indexOf('Firefox') > -1) return 'Firefox';
    if (ua.indexOf('Safari') > -1) return 'Safari';
    if (ua.indexOf('Edge') > -1) return 'Edge';
    return 'Other';
}

// ========================================
// GET VISITOR LOCATION (IP-based)
// ========================================
async function getVisitorLocation() {
    try {
        // Use free IP geolocation API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        visitorSession.location = {
            ip: data.ip || 'Unknown',
            city: data.city || 'Unknown',
            region: data.region || 'Unknown',
            country: data.country_name || 'Unknown',
            timezone: data.timezone || 'Unknown'
        };
        
        console.log('📍 Visitor location:', visitorSession.location.city, visitorSession.location.country);
    } catch (error) {
        console.log('⚠️ Could not get location:', error);
        visitorSession.location = {
            ip: 'Unknown',
            city: 'Unknown',
            country: 'Unknown'
        };
    }
}

// ========================================
// SEND NOTIFICATION TO ADMIN
// ========================================
async function sendVisitorNotification(type, data) {
    if (!TRACKING_CONFIG.trackingEnabled) return;
    
    const notification = {
        type: type,
        sessionId: visitorSession.sessionId,
        timestamp: new Date().toLocaleString('fr-FR', { 
            timeZone: 'Asia/Bangkok',
            dateStyle: 'medium',
            timeStyle: 'medium'
        }),
        visitor: visitorSession,
        data: data
    };
    
    // Send via email (using email-approval system if configured)
    if (window.emailApproval) {
        await sendEmailNotification(notification);
    }
    
    // Also send to console for testing
    console.log('📧 Notification:', type, data);
    
    // Store locally (for batch sending)
    storeNotification(notification);
}

async function sendEmailNotification(notification) {
    const emailContent = formatNotificationEmail(notification);
    
    // Use EmailJS if configured
    if (typeof emailjs !== 'undefined' && window.emailApproval) {
        try {
            // Send to admin via email system
            const formData = new FormData();
            formData.append('notification', JSON.stringify(notification));
            formData.append('subject', `[RESQ+] ${notification.type} - ${notification.visitor.location.city}`);
            formData.append('message', emailContent);
            formData.append('to', TRACKING_CONFIG.adminEmail);
            
            console.log('📧 Email notification sent:', notification.type);
        } catch (error) {
            console.error('❌ Failed to send email:', error);
        }
    }
}

function formatNotificationEmail(notification) {
    const v = notification.visitor;
    
    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔔 RESQ+ VISITOR NOTIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 TYPE: ${notification.type}
🕐 TIME: ${notification.timestamp}
🆔 SESSION: ${notification.sessionId}

👤 VISITOR INFO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Location: ${v.location.city}, ${v.location.country}
🌐 IP: ${v.location.ip}
🕐 Timezone: ${v.location.timezone}

💻 DEVICE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 Type: ${v.device.mobile ? 'Mobile' : 'Desktop'}
🌐 Browser: ${v.device.browser}
💻 Platform: ${v.device.platform}
📐 Screen: ${v.device.screenSize}
🖥️ Viewport: ${v.device.viewport}
🗣️ Language: ${v.device.language}

🔗 TRAFFIC:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔙 Referrer: ${v.referrer}
📄 Page Views: ${v.pageViews}

📋 ACTION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${JSON.stringify(notification.data, null, 2)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESQ+ Real-Time Tracking System
    `;
}

function storeNotification(notification) {
    try {
        const stored = JSON.parse(localStorage.getItem('resq_notifications') || '[]');
        stored.push(notification);
        
        // Keep only last 100 notifications
        if (stored.length > 100) {
            stored.shift();
        }
        
        localStorage.setItem('resq_notifications', JSON.stringify(stored));
    } catch (error) {
        console.error('Failed to store notification:', error);
    }
}

// ========================================
// TRACK SPECIFIC EVENTS
// ========================================

// 1. New Visitor Arrives
function trackNewVisitor() {
    sendVisitorNotification('NEW_VISITOR', {
        message: '🎉 New visitor arrived on website!',
        landingPage: window.location.pathname,
        timestamp: new Date().toISOString()
    });
}

// 2. Page View
function trackPageView(page) {
    visitorSession.pageViews++;
    
    sendVisitorNotification('PAGE_VIEW', {
        page: page || window.location.pathname,
        pageTitle: document.title,
        viewNumber: visitorSession.pageViews
    });
}

// 3. Button Click
function trackButtonClick(buttonText, buttonId) {
    sendVisitorNotification('BUTTON_CLICK', {
        buttonText: buttonText,
        buttonId: buttonId,
        page: window.location.pathname
    });
}

// 4. Form Interaction
function trackFormInteraction(formName, action) {
    sendVisitorNotification('FORM_INTERACTION', {
        formName: formName,
        action: action, // 'started', 'completed', 'abandoned'
        page: window.location.pathname
    });
}

// 5. Scroll Depth
let maxScrollDepth = 0;
function trackScrollDepth() {
    const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Send notification at key milestones
        if (scrollPercent >= 25 && scrollPercent < 30) {
            sendVisitorNotification('SCROLL_MILESTONE', { depth: '25%' });
        } else if (scrollPercent >= 50 && scrollPercent < 55) {
            sendVisitorNotification('SCROLL_MILESTONE', { depth: '50%' });
        } else if (scrollPercent >= 75 && scrollPercent < 80) {
            sendVisitorNotification('SCROLL_MILESTONE', { depth: '75%' });
        } else if (scrollPercent >= 90) {
            sendVisitorNotification('SCROLL_MILESTONE', { depth: '100%' });
        }
    }
}

// 6. Time on Page
let timeOnPage = 0;
setInterval(() => {
    timeOnPage++;
    
    // Send notification at key time milestones
    if (timeOnPage === 30) { // 30 seconds
        sendVisitorNotification('TIME_MILESTONE', { time: '30 seconds' });
    } else if (timeOnPage === 60) { // 1 minute
        sendVisitorNotification('TIME_MILESTONE', { time: '1 minute' });
    } else if (timeOnPage === 300) { // 5 minutes
        sendVisitorNotification('TIME_MILESTONE', { time: '5 minutes - Very engaged!' });
    }
}, 1000);

// 7. Link Click
function trackLinkClick(linkText, linkUrl) {
    sendVisitorNotification('LINK_CLICK', {
        linkText: linkText,
        linkUrl: linkUrl,
        isExternal: !linkUrl.includes(window.location.hostname)
    });
}

// 8. Newsletter Signup
function trackNewsletterSignup(email) {
    sendVisitorNotification('NEWSLETTER_SIGNUP', {
        email: email,
        message: '🎉 New newsletter signup!'
    });
}

// 9. Story Submission
function trackStorySubmission(storyData) {
    sendVisitorNotification('STORY_SUBMISSION', {
        name: storyData.name,
        type: storyData.storyType,
        message: '📸 New story submitted!',
        hasMedia: !!storyData.media
    });
}

// 10. Exit Intent
function trackExitIntent() {
    sendVisitorNotification('EXIT_INTENT', {
        message: '👋 Visitor about to leave',
        timeOnSite: timeOnPage + ' seconds',
        pagesViewed: visitorSession.pageViews
    });
}

// 11. Session End
function trackSessionEnd() {
    sendVisitorNotification('SESSION_END', {
        message: '👋 Visitor session ended',
        duration: timeOnPage + ' seconds',
        totalPages: visitorSession.pageViews,
        totalActions: visitorSession.actions.length,
        maxScroll: maxScrollDepth + '%'
    });
}

// ========================================
// AUTO-TRACK COMMON EVENTS
// ========================================
function setupAutoTracking() {
    // Track all button clicks
    document.addEventListener('click', (e) => {
        const button = e.target.closest('button, .btn, .stellar-btn');
        if (button) {
            const text = button.textContent.trim().substring(0, 50);
            const id = button.id || button.className;
            trackButtonClick(text, id);
        }
        
        // Track link clicks
        const link = e.target.closest('a');
        if (link) {
            const text = link.textContent.trim().substring(0, 50);
            const url = link.href;
            trackLinkClick(text, url);
        }
    });
    
    // Track scroll depth
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(trackScrollDepth, 1000);
    });
    
    // Track form interactions
    document.addEventListener('submit', (e) => {
        const form = e.target;
        const formName = form.id || form.className || 'unknown-form';
        
        // Check if it's newsletter
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            trackNewsletterSignup(emailInput.value);
        }
        
        trackFormInteraction(formName, 'completed');
    });
    
    // Track exit intent
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 10) {
            trackExitIntent();
        }
    });
    
    // Track session end
    window.addEventListener('beforeunload', () => {
        trackSessionEnd();
    });
    
    console.log('✅ Auto-tracking enabled');
}

// ========================================
// BATCH NOTIFICATIONS (Optional)
// ========================================
function sendBatchNotification() {
    const notifications = JSON.parse(localStorage.getItem('resq_notifications') || '[]');
    
    if (notifications.length === 0) return;
    
    const summary = {
        totalNotifications: notifications.length,
        types: {},
        visitors: new Set(notifications.map(n => n.sessionId)).size,
        timeRange: {
            start: notifications[0].timestamp,
            end: notifications[notifications.length - 1].timestamp
        }
    };
    
    notifications.forEach(n => {
        summary.types[n.type] = (summary.types[n.type] || 0) + 1;
    });
    
    console.log('📊 Batch summary:', summary);
    
    // Clear sent notifications
    localStorage.removeItem('resq_notifications');
}

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Visitor tracking initialized');
    
    // Initialize session
    initVisitorSession();
    
    // Wait for location then send new visitor notification
    setTimeout(() => {
        trackNewVisitor();
        trackPageView();
    }, 1000);
    
    // Setup auto-tracking
    setupAutoTracking();
    
    // Setup batch notifications (every 5 minutes)
    if (!TRACKING_CONFIG.sendImmediateNotifications) {
        setInterval(sendBatchNotification, TRACKING_CONFIG.batchInterval);
    }
});

// Export for external use
window.visitorTracking = {
    trackButtonClick,
    trackFormInteraction,
    trackNewsletterSignup,
    trackStorySubmission,
    trackPageView,
    visitorSession,
    TRACKING_CONFIG
};

console.log('📊 Visitor tracking system loaded');
