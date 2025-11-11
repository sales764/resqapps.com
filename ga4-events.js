// ========================================
// GOOGLE ANALYTICS 4 - EVENT TRACKING
// Track CTA clicks, form submits, scroll depth
// ========================================

(function() {
    'use strict';

    // Wait for gtag to be available
    if (typeof gtag === 'undefined') {
        console.warn('[GA4 Events] gtag not loaded yet');
        return;
    }

    // ========================================
    // 1. CTA CLICK TRACKING
    // ========================================

    function trackCTAClick(ctaName, location) {
        gtag('event', 'cta_click', {
            'event_category': 'Engagement',
            'event_label': ctaName,
            'cta_location': location,
            'value': 1
        });
        console.log('[GA4] CTA Click:', ctaName, 'at', location);
    }

    // Track "Get Notified" buttons
    const getNotifiedButtons = document.querySelectorAll('a[href*="#testimonials"], button[data-action="notify"]');
    getNotifiedButtons.forEach(function(btn, index) {
        btn.addEventListener('click', function(e) {
            const location = index === 0 ? 'Hero' : 'Section ' + (index + 1);
            trackCTAClick('Get Notified', location);
        });
    });

    // Track "Explore Features" button
    const exploreFeaturesBtn = document.querySelector('a[href="#features"]');
    if (exploreFeaturesBtn) {
        exploreFeaturesBtn.addEventListener('click', function() {
            trackCTAClick('Explore Features', 'Hero');
        });
    }

    // Track "Download App" / Store buttons (future)
    const downloadButtons = document.querySelectorAll('a[href*="play.google.com"], a[href*="apps.apple.com"]');
    downloadButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const store = btn.href.includes('play.google') ? 'Google Play' : 'App Store';
            gtag('event', 'download_attempt', {
                'event_category': 'Conversion',
                'event_label': store,
                'value': 10
            });
            console.log('[GA4] Download Attempt:', store);
        });
    });

    // Track language switcher clicks
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const language = btn.getAttribute('data-lang') || btn.textContent.trim();
            gtag('event', 'language_switch', {
                'event_category': 'Engagement',
                'event_label': language,
                'value': 1
            });
            console.log('[GA4] Language Switch:', language);
        });
    });

    // Track navigation menu clicks
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const linkText = link.textContent.trim();
            gtag('event', 'nav_click', {
                'event_category': 'Navigation',
                'event_label': linkText,
                'link_url': link.href
            });
            console.log('[GA4] Navigation Click:', linkText);
        });
    });

    // ========================================
    // 2. FORM SUBMIT TRACKING
    // ========================================

    function trackFormSubmit(formName, formType) {
        gtag('event', 'form_submit', {
            'event_category': 'Conversion',
            'event_label': formName,
            'form_type': formType,
            'value': 5
        });
        console.log('[GA4] Form Submit:', formName);
    }

    // Track newsletter/email form submissions
    const emailForms = document.querySelectorAll('form[data-newsletter], form[id*="email"], form[id*="notify"]');
    emailForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const formName = form.getAttribute('id') || 'Newsletter Form';
            trackFormSubmit(formName, 'Email Capture');
        });
    });

    // Track contact form (if exists)
    const contactForm = document.querySelector('form[data-contact], form[id*="contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackFormSubmit('Contact Form', 'Support');
        });
    }

    // Track modal form submissions
    const modalForms = document.querySelectorAll('.modal form');
    modalForms.forEach(function(form) {
        form.addEventListener('submit', function() {
            trackFormSubmit('Modal Form', 'Popup Conversion');
        });
    });

    // ========================================
    // 3. SCROLL DEPTH TRACKING
    // ========================================

    const scrollMilestones = [25, 50, 75, 90, 100];
    const scrollReached = {};

    function trackScrollDepth(percentage) {
        if (!scrollReached[percentage]) {
            scrollReached[percentage] = true;
            gtag('event', 'scroll_depth', {
                'event_category': 'Engagement',
                'event_label': percentage + '%',
                'value': percentage
            });
            console.log('[GA4] Scroll Depth:', percentage + '%');
        }
    }

    // Calculate scroll percentage
    function calculateScrollPercentage() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        return Math.round(scrollPercentage);
    }

    // Throttle scroll event for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            const scrollPercent = calculateScrollPercentage();
            
            scrollMilestones.forEach(function(milestone) {
                if (scrollPercent >= milestone && !scrollReached[milestone]) {
                    trackScrollDepth(milestone);
                }
            });
        }, 500);
    });

    // ========================================
    // 4. ADDITIONAL ENGAGEMENT TRACKING
    // ========================================

    // Track video plays (if YouTube embedded)
    const youtubeIframes = document.querySelectorAll('iframe[src*="youtube.com"]');
    if (youtubeIframes.length > 0) {
        console.log('[GA4] YouTube videos detected:', youtubeIframes.length);
        // YouTube API tracking can be added here
    }

    // Track outbound link clicks
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const destination = link.href;
            gtag('event', 'outbound_click', {
                'event_category': 'Engagement',
                'event_label': destination,
                'outbound_url': destination
            });
            console.log('[GA4] Outbound Click:', destination);
        });
    });

    // Track social media link clicks
    const socialLinks = document.querySelectorAll('a[href*="facebook.com"], a[href*="twitter.com"], a[href*="instagram.com"], a[href*="linkedin.com"], a[href*="youtube.com"]');
    socialLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            let platform = 'Other';
            if (link.href.includes('facebook')) platform = 'Facebook';
            else if (link.href.includes('twitter')) platform = 'Twitter';
            else if (link.href.includes('instagram')) platform = 'Instagram';
            else if (link.href.includes('linkedin')) platform = 'LinkedIn';
            else if (link.href.includes('youtube')) platform = 'YouTube';
            
            gtag('event', 'social_click', {
                'event_category': 'Social',
                'event_label': platform,
                'value': 1
            });
            console.log('[GA4] Social Click:', platform);
        });
    });

    // Track file downloads
    const downloadLinks = document.querySelectorAll('a[href$=".pdf"], a[href$=".zip"], a[href$=".doc"], a[href$=".docx"]');
    downloadLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const fileName = link.href.split('/').pop();
            const fileType = fileName.split('.').pop().toUpperCase();
            
            gtag('event', 'file_download', {
                'event_category': 'Download',
                'event_label': fileName,
                'file_type': fileType
            });
            console.log('[GA4] File Download:', fileName);
        });
    });

    // Track time on page (after 30 seconds)
    setTimeout(function() {
        gtag('event', 'engaged_user', {
            'event_category': 'Engagement',
            'event_label': '30_seconds',
            'value': 1
        });
        console.log('[GA4] Engaged User: 30+ seconds on page');
    }, 30000);

    // Track time on page (after 60 seconds)
    setTimeout(function() {
        gtag('event', 'engaged_user', {
            'event_category': 'Engagement',
            'event_label': '60_seconds',
            'value': 2
        });
        console.log('[GA4] Engaged User: 60+ seconds on page');
    }, 60000);

    // ========================================
    // 5. ERROR TRACKING (404, 500 pages)
    // ========================================

    // Check if on error page
    const pageTitle = document.title.toLowerCase();
    if (pageTitle.includes('404') || pageTitle.includes('not found')) {
        gtag('event', 'error_page', {
            'event_category': 'Error',
            'event_label': '404 - Page Not Found',
            'page_url': window.location.pathname
        });
        console.log('[GA4] Error Page: 404');
    }
    if (pageTitle.includes('500') || pageTitle.includes('server error')) {
        gtag('event', 'error_page', {
            'event_category': 'Error',
            'event_label': '500 - Server Error',
            'page_url': window.location.pathname
        });
        console.log('[GA4] Error Page: 500');
    }

    // ========================================
    // 6. MOBILE MENU TRACKING
    // ========================================

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            gtag('event', 'mobile_menu', {
                'event_category': 'Navigation',
                'event_label': isExpanded ? 'Close' : 'Open',
                'value': 1
            });
            console.log('[GA4] Mobile Menu:', isExpanded ? 'Closed' : 'Opened');
        });
    }

    // ========================================
    // INITIALIZATION COMPLETE
    // ========================================

    console.log('[GA4 Events] ✅ Event tracking initialized');
    console.log('[GA4 Events] Tracking:', {
        'CTA Buttons': getNotifiedButtons.length + (exploreFeaturesBtn ? 1 : 0),
        'Download Buttons': downloadButtons.length,
        'Language Buttons': langButtons.length,
        'Nav Links': navLinks.length,
        'Forms': emailForms.length,
        'External Links': externalLinks.length,
        'Social Links': socialLinks.length,
        'Download Links': downloadLinks.length
    });

})();
