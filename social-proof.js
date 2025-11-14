// ========================================
// SOCIAL PROOF COUNTER
// Item 38/78: "X people signed up"
// ========================================

(function() {
    'use strict';

    // Configuration
    const config = {
        // Mode: 'static' or 'live'
        mode: 'dynamic',  // Changed to dynamic to track real signups
        
        // Static mode settings
        staticCount: 2,  // Starting count (you + your wife) - will increment with real signups
        
        // Live mode settings (if using backend)
        apiEndpoint: '/api/signup-count',  // Your API endpoint
        updateInterval: 30000,  // Update every 30 seconds
        
        // Animation settings
        animateOnLoad: true,
        animationDuration: 2000,  // 2 seconds
        
        // Display settings
        showAnimation: true,
        showRecentSignup: true,  // Show "Someone just signed up!"
        recentSignupInterval: 15000,  // Every 15 seconds
        
        // Target elements
        containers: [
            '#social-proof-hero',      // Hero section
            '#social-proof-footer'     // Footer (optional)
        ]
    };

    // State
    let currentCount = 0;
    let targetCount = 0;

    // Create social proof HTML
    function createSocialProofHTML(count) {
        return `
            <div class="social-proof-container">
                <div class="social-proof-content">
                    <div class="social-proof-icon">👥</div>
                    <div class="social-proof-text">
                        <span class="social-proof-number" data-count="${count}">0</span>
                        <span class="social-proof-label" data-i18n="countdown.peopleSignedUp">people already signed up</span>
                    </div>
                </div>
                ${config.showRecentSignup ? '<div class="social-proof-recent" style="display: none;"><span class="pulse-dot"></span> Someone just signed up!</div>' : ''}
            </div>
        `;
    }

    // Add CSS styles
    function addStyles() {
        if (document.getElementById('social-proof-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'social-proof-styles';
        style.textContent = `
            .social-proof-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                padding: 20px 24px;
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(20px);
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                margin: 20px auto;
                max-width: 400px;
                animation: slideUp 0.6s ease;
            }
            
            [data-theme="light"] .social-proof-container {
                background: rgba(255, 255, 255, 0.8);
                border: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .social-proof-content {
                display: flex;
                align-items: center;
                gap: 16px;
            }
            
            .social-proof-icon {
                font-size: 32px;
                animation: bounce 2s ease infinite;
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
            
            .social-proof-text {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            
            .social-proof-number {
                font-size: 32px;
                font-weight: 800;
                background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                line-height: 1;
            }
            
            /* Light mode - SAME gradient effect, darker colors */
            [data-theme="light"] .social-proof-number {
                background: linear-gradient(135deg, #1565C0 0%, #0D47A1 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .social-proof-label {
                color: rgba(255, 255, 255, 0.8);
                font-size: 14px;
                font-weight: 500;
            }
            
            [data-theme="light"] .social-proof-label {
                color: #1a1a1a;
                font-weight: 600;
            }
            
            /* Recent signup notification */
            .social-proof-recent {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                background: rgba(76, 175, 80, 0.1);
                border: 1px solid rgba(76, 175, 80, 0.3);
                border-radius: 12px;
                color: #4caf50;
                font-size: 13px;
                font-weight: 600;
                animation: fadeInOut 1s ease;
            }
            
            @keyframes fadeInOut {
                0% { opacity: 0; transform: scale(0.9); }
                100% { opacity: 1; transform: scale(1); }
            }
            
            .pulse-dot {
                width: 8px;
                height: 8px;
                background: #4caf50;
                border-radius: 50%;
                animation: pulse 1.5s ease infinite;
            }
            
            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.5;
                    transform: scale(1.2);
                }
            }
            
            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .social-proof-container {
                    padding: 16px 20px;
                    max-width: 90%;
                }
                
                .social-proof-icon {
                    font-size: 28px;
                }
                
                .social-proof-number {
                    font-size: 28px;
                }
                
                .social-proof-label {
                    font-size: 13px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Animate counter from 0 to target
    function animateCounter(element, target) {
        if (!config.animateOnLoad) {
            element.textContent = formatNumber(target);
            return;
        }

        const duration = config.animationDuration;
        const startTime = Date.now();
        const startValue = 0;

        function update() {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
            
            element.textContent = formatNumber(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = formatNumber(target);
            }
        }
        
        update();
    }

    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Show recent signup notification
    function showRecentSignup(container) {
        const notification = container.querySelector('.social-proof-recent');
        if (!notification) return;
        
        notification.style.display = 'flex';
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Fetch count from API (live mode)
    async function fetchLiveCount() {
        try {
            const response = await fetch(config.apiEndpoint);
            const data = await response.json();
            return data.count || config.staticCount;
        } catch (error) {
            console.warn('[Social Proof] Failed to fetch live count:', error);
            return config.staticCount;
        }
    }

    // Update count
    async function updateCount() {
        let newCount;
        
        if (config.mode === 'live') {
            newCount = await fetchLiveCount();
        } else {
            newCount = config.staticCount;
        }
        
        // Update all containers
        config.containers.forEach(selector => {
            const container = document.querySelector(selector);
            if (!container) return;
            
            const numberElement = container.querySelector('.social-proof-number');
            if (numberElement) {
                const currentCount = parseInt(numberElement.getAttribute('data-count'));
                
                // Only animate if count changed
                if (newCount !== currentCount) {
                    numberElement.setAttribute('data-count', newCount);
                    animateCounter(numberElement, newCount);
                    
                    // Show recent signup notification
                    if (config.showRecentSignup && newCount > currentCount) {
                        showRecentSignup(container);
                    }
                }
            }
        });
        
        targetCount = newCount;
    }

    // Initialize social proof
    function init() {
        // Add styles
        addStyles();
        
        // Get initial count (always start from staticCount so the base value
        // like 2 signups is visible immediately, even in dynamic mode)
        const initialCount = config.staticCount;
        
        // Insert HTML into all containers
        config.containers.forEach(selector => {
            const container = document.querySelector(selector);
            if (container) {
                container.innerHTML = createSocialProofHTML(initialCount);
            }
        });
        
        // Apply translations if available
        if (typeof applyTranslations === 'function') {
            const currentLang = localStorage.getItem('selectedLanguage') || 'en';
            applyTranslations(currentLang);
        }
        
        // Initial update
        updateCount();
        
        // Setup live updates if in live mode
        if (config.mode === 'live') {
            setInterval(updateCount, config.updateInterval);
        }
        
        // Show random "recent signup" notifications
        if (config.showRecentSignup) {
            setInterval(() => {
                const randomContainer = document.querySelector(
                    config.containers[Math.floor(Math.random() * config.containers.length)]
                );
                if (randomContainer) {
                    showRecentSignup(randomContainer);
                }
            }, config.recentSignupInterval);
        }
        
        console.log('[Social Proof] ✅ Initialized');
        console.log('[Social Proof] Mode:', config.mode);
        console.log('[Social Proof] Count:', config.staticCount);
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    window.SocialProof = {
        // Update count manually
        setCount: function(count) {
            config.staticCount = count;
            updateCount();
        },
        
        // Get current count
        getCount: function() {
            return targetCount;
        },
        
        // Switch mode
        setMode: function(mode) {
            config.mode = mode;
            updateCount();
        },
        
        // Show notification manually
        showNotification: function() {
            const container = document.querySelector(config.containers[0]);
            if (container) {
                showRecentSignup(container);
            }
        }
    };

})();

// ========================================
// USAGE EXAMPLES
// ========================================

/*
// Change count manually
SocialProof.setCount(6000);

// Get current count
const count = SocialProof.getCount();
console.log('Current signups:', count);

// Switch to live mode
SocialProof.setMode('live');

// Show notification manually
SocialProof.showNotification();
*/
