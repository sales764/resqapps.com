// ========================================
// SOCIAL SHARING BUTTONS
// Item 43/78: Share buttons + Open Graph
// ========================================

(function() {
    'use strict';

    // Configuration
    const config = {
        // Share settings
        shareUrl: window.location.href,
        shareTitle: 'RESQ+ | AI Emergency Response App',
        shareDescription: 'AI Medical Nurse, GPS team tracking & emergency training in one app. Red Cross compliant. 100% free forever. Save lives with professional guidance.',
        shareImage: 'https://resqapps.com/og-image.jpg',
        shareHashtags: 'RESQ,EmergencyResponse,AIHealthcare,LifeSaving',
        
        // Platforms enabled
        platforms: {
            facebook: true,
            twitter: true,
            linkedin: true,
            whatsapp: true,
            telegram: true,
            email: true,
            copyLink: true
        },
        
        // Button placement
        placement: {
            floating: true,        // Floating buttons on side
            inline: true,          // Inline buttons in content
            sticky: false          // Sticky bar at bottom
        },
        
        // Design
        design: {
            buttonStyle: 'filled',  // 'filled' or 'outline'
            showLabels: true,
            showCounts: false,      // Share counts (requires API)
            animation: 'slide'      // 'slide', 'fade', or 'none'
        }
    };

    // Share URLs for each platform
    const shareUrls = {
        facebook: (url, title) => 
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        
        twitter: (url, title, description) => 
            `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' - ' + description)}&hashtags=${config.shareHashtags}`,
        
        linkedin: (url, title, description) => 
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        
        whatsapp: (url, title, description) => 
            `https://wa.me/?text=${encodeURIComponent(title + ' - ' + description + ' ' + url)}`,
        
        telegram: (url, title, description) => 
            `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' - ' + description)}`,
        
        email: (url, title, description) => 
            `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`,
        
        emailNative: (url, title, description) => 
            `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`
    };

    // Platform data
    const platforms = {
        facebook: {
            name: 'Facebook',
            icon: '📘',
            color: '#1877F2',
            svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
        },
        twitter: {
            name: 'X',
            icon: '𝕏',
            color: '#000000',
            svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
        },
        linkedin: {
            name: 'LinkedIn',
            icon: '💼',
            color: '#0A66C2',
            svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
        },
        whatsapp: {
            name: 'WhatsApp',
            icon: '💬',
            color: '#25D366',
            svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'
        },
        telegram: {
            name: 'Telegram',
            icon: '✈️',
            color: '#0088cc',
            svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'
        },
        email: {
            name: 'Email',
            icon: '📧',
            color: '#7D7D7D',
            svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
        }
    };

    // Create floating share buttons
    function createFloatingButtons() {
        if (!config.placement.floating) return;

        const container = document.createElement('div');
        container.className = 'social-share-floating';
        container.innerHTML = `
            <div class="share-buttons-vertical">
                ${createButtons('vertical')}
            </div>
        `;

        document.body.appendChild(container);
    }

    // Create inline share buttons
    function createInlineButtons() {
        if (!config.placement.inline) return;

        const containers = document.querySelectorAll('.social-share-inline');
        
        containers.forEach(container => {
            container.innerHTML = `
                <div class="share-label">Share this:</div>
                <div class="share-buttons-horizontal">
                    ${createButtons('horizontal')}
                </div>
            `;
        });
    }

    // Get translated text
    function getTranslation(key) {
        const lang = localStorage.getItem('selectedLanguage') || 'en';
        return window.TRANSLATIONS?.socialShare?.[lang]?.[key] || key;
    }

    // Create buttons HTML
    function createButtons(orientation) {
        let html = '';
        const shareOnText = getTranslation('shareOn');
        const copyLinkText = getTranslation('copyLink');
        
        Object.keys(platforms).forEach(platform => {
            if (!config.platforms[platform]) return;
            
            const data = platforms[platform];
            const buttonClass = orientation === 'vertical' ? 'share-btn-vertical' : 'share-btn-horizontal';
            
            html += `
                <button 
                    class="share-btn ${buttonClass}" 
                    data-platform="${platform}"
                    style="background-color: ${data.color}"
                    title="${shareOnText} ${data.name}"
                >
                    <span class="share-icon">${data.svg}</span>
                    ${config.design.showLabels && orientation === 'horizontal' ? `<span class="share-label">${data.name}</span>` : ''}
                </button>
            `;
        });

        // Copy link button
        if (config.platforms.copyLink) {
            html += `
                <button 
                    class="share-btn ${orientation === 'vertical' ? 'share-btn-vertical' : 'share-btn-horizontal'}" 
                    data-platform="copy"
                    style="background-color: #7D7D7D"
                    title="${copyLinkText}"
                >
                    <span class="share-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                    </span>
                    ${config.design.showLabels && orientation === 'horizontal' ? `<span class="share-label">${copyLinkText}</span>` : ''}
                </button>
            `;
        }

        return html;
    }

    // Add CSS styles
    function addStyles() {
        if (document.getElementById('social-share-styles')) return;

        const style = document.createElement('style');
        style.id = 'social-share-styles';
        style.textContent = `
            /* Floating Buttons */
            .social-share-floating {
                position: fixed;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                z-index: 1000;
                animation: slideInRight 0.5s ease;
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateY(-50%) translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateY(-50%) translateX(0);
                }
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateY(-50%) translateX(-100px);
                }
                to {
                    opacity: 1;
                    transform: translateY(-50%) translateX(0);
                }
            }
            
            .share-buttons-vertical {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            /* Inline Buttons */
            .social-share-inline {
                display: flex;
                align-items: center;
                gap: 15px;
                flex-wrap: wrap;
                margin: 30px 0;
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .share-label {
                color: rgba(255, 255, 255, 0.8);
                font-weight: 600;
                font-size: 15px;
            }
            
            .share-buttons-horizontal {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            /* Share Buttons */
            .share-btn {
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-weight: 600;
                font-size: 14px;
                color: white;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            .share-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            }
            
            .share-btn:active {
                transform: translateY(-1px);
            }
            
            /* Vertical buttons (floating) */
            .share-btn-vertical {
                width: 50px;
                height: 50px;
                padding: 0;
            }
            
            .share-btn-vertical .share-icon {
                width: 24px;
                height: 24px;
            }
            
            /* Horizontal buttons (inline) */
            .share-btn-horizontal {
                padding: 10px 16px;
                min-width: 44px;
            }
            
            .share-btn-horizontal .share-icon {
                width: 20px;
                height: 20px;
            }
            
            .share-icon {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .share-icon svg {
                width: 100%;
                height: 100%;
            }
            
            /* iPad and Tablet Optimizations */
            @media (max-width: 1024px) and (min-width: 769px) {
                .social-share-floating {
                    right: 10px;
                    transform: translateY(-50%) scale(0.8);
                }
                
                .share-btn-vertical {
                    width: 40px;
                    height: 40px;
                }
                
                .share-btn-vertical .share-icon {
                    width: 18px;
                    height: 18px;
                }
            }
            
            /* Ensure content doesn't overlap with floating buttons */
            /* Barre positionnée à droite, ne bloque plus le contenu principal */
            
            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .social-share-floating {
                    display: none;
                }
                
                .social-share-inline {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .share-buttons-horizontal {
                    flex-direction: column;
                }
                
                .share-btn-horizontal {
                    width: 100%;
                    justify-content: center;
                }
            }
            
            /* Copy success animation */
            .share-btn.copied {
                background-color: #4caf50 !important;
            }
            
            @keyframes copySuccess {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .share-btn.copied {
                animation: copySuccess 0.3s ease;
            }
        `;

        document.head.appendChild(style);
    }

    // Handle share button click
    function handleShare(platform) {
        const url = config.shareUrl;
        const title = config.shareTitle;
        const description = config.shareDescription;

        if (platform === 'copy') {
            copyLink(url);
            return;
        }

        // Special handling for email - try native first, fallback to Gmail
        if (platform === 'email') {
            handleEmailShare(url, title, description);
            return;
        }

        const shareUrl = shareUrls[platform](url, title, description);
        window.open(shareUrl, '_blank', 'width=600,height=400');

        // Track with GA4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
                'method': platform,
                'content_type': 'website',
                'content_id': url
            });
        }

        console.log('[Social Share] Shared on:', platform);
    }

    // Universal email handler
    function handleEmailShare(url, title, description) {
        // Try native email client first
        const mailtoUrl = shareUrls.emailNative(url, title, description);
        const gmailUrl = shareUrls.email(url, title, description);
        
        // Create a temporary link to test mailto
        const testLink = document.createElement('a');
        testLink.href = mailtoUrl;
        
        // Try to open mailto
        try {
            window.location.href = mailtoUrl;
            
            // If mailto doesn't work (no email client), open Gmail after 1 second
            setTimeout(() => {
                // Check if page is still visible (mailto didn't work)
                if (document.visibilityState === 'visible') {
                    window.open(gmailUrl, '_blank', 'width=800,height=600');
                }
            }, 1000);
        } catch (e) {
            // Fallback to Gmail immediately
            window.open(gmailUrl, '_blank', 'width=800,height=600');
        }

        // Track with GA4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'share', {
                'method': 'email',
                'content_type': 'website',
                'content_id': url
            });
        }

        console.log('[Social Share] Email share initiated');
    }

    // Copy link to clipboard
    function copyLink(url) {
        navigator.clipboard.writeText(url).then(() => {
            // Find all copy buttons
            const copyBtns = document.querySelectorAll('[data-platform="copy"]');
            copyBtns.forEach(btn => {
                const originalBg = btn.style.backgroundColor;
                btn.classList.add('copied');
                btn.title = 'Copied!';
                
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.style.backgroundColor = originalBg;
                    btn.title = 'Copy link';
                }, 2000);
            });

            // Track with GA4
            if (typeof gtag !== 'undefined') {
                gtag('event', 'copy_link', {
                    'event_category': 'Share',
                    'event_label': url
                });
            }

            console.log('[Social Share] Link copied');
        }).catch(err => {
            console.error('[Social Share] Copy failed:', err);
            // Fallback: select input method
            prompt('Copy this link:', url);
        });
    }

    // Attach event listeners
    function attachListeners() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.share-btn');
            if (!btn) return;

            const platform = btn.getAttribute('data-platform');
            handleShare(platform);
        });
    }

    // Initialize
    function init() {
        addStyles();
        createFloatingButtons();
        createInlineButtons();
        attachListeners();

        console.log('[Social Share] ✅ Initialized');
        console.log('[Social Share] Platforms enabled:', Object.keys(platforms).filter(p => config.platforms[p]));
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Refresh buttons (call when language changes)
    function refreshButtons() {
        // Remove old buttons
        const oldFloating = document.querySelector('.social-share-floating');
        if (oldFloating) oldFloating.remove();
        
        // Recreate with new translations
        createFloatingButtons();
        createInlineButtons();
        
        console.log('[Social Share] Buttons refreshed for new language');
    }

    // Public API
    window.SocialShare = {
        share: handleShare,
        copyLink: () => copyLink(config.shareUrl),
        setShareUrl: (url) => config.shareUrl = url,
        setShareTitle: (title) => config.shareTitle = title,
        setShareDescription: (desc) => config.shareDescription = desc,
        refresh: refreshButtons
    };

})();
