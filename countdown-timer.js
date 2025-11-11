// ========================================
// COUNTDOWN TIMER
// Item 37/78: Create urgency for launch
// ========================================

(function() {
    'use strict';

    // Configuration - SET YOUR LAUNCH DATE HERE
    const config = {
        // Launch date (CHANGE THIS!)
        launchDate: '2025-12-31 00:00:00', // Format: YYYY-MM-DD HH:MM:SS
        
        // Where to insert countdown
        targetSelector: '#countdown-container',
        
        // Text customization
        preText: 'Launch in',
        postText: '',
        
        // Show format
        showDays: true,
        showHours: true,
        showMinutes: true,
        showSeconds: true
    };

    // Calculate time remaining
    function getTimeRemaining() {
        const now = new Date().getTime();
        const launch = new Date(config.launchDate).getTime();
        const diff = launch - now;

        if (diff <= 0) {
            return {
                total: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        return {
            total: diff,
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };
    }

    // Format number with leading zero
    function pad(num) {
        return num < 10 ? '0' + num : num;
    }

    // Get translations
    function getTranslatedText(key) {
        const lang = localStorage.getItem('resq_lang') || localStorage.getItem('selectedLanguage') || 'en';
        const translation = window.TRANSLATIONS?.countdown?.[lang]?.[key];
        if (translation) {
            return translation;
        }
        // Fallback to English defaults
        const defaults = {
            launchIn: 'LAUNCH IN',
            days: 'DAYS',
            hours: 'HOURS',
            minutes: 'MINUTES',
            seconds: 'SECONDS'
        };
        return defaults[key] || key;
    }

    // Create countdown HTML
    function createCountdownHTML() {
        return `
            <div class="countdown-timer">
                <div class="countdown-pre-text" data-i18n="countdown.launchIn">${getTranslatedText('launchIn')}</div>
                <div class="countdown-numbers">
                    ${config.showDays ? `<div class="countdown-unit"><span class="countdown-value" id="countdown-days">00</span><span class="countdown-label" data-i18n="countdown.days">${getTranslatedText('days')}</span></div>` : ''}
                    ${config.showHours ? `<div class="countdown-unit"><span class="countdown-value" id="countdown-hours">00</span><span class="countdown-label" data-i18n="countdown.hours">${getTranslatedText('hours')}</span></div>` : ''}
                    ${config.showMinutes ? `<div class="countdown-unit"><span class="countdown-value" id="countdown-minutes">00</span><span class="countdown-label" data-i18n="countdown.minutes">${getTranslatedText('minutes')}</span></div>` : ''}
                    ${config.showSeconds ? `<div class="countdown-unit"><span class="countdown-value" id="countdown-seconds">00</span><span class="countdown-label" data-i18n="countdown.seconds">${getTranslatedText('seconds')}</span></div>` : ''}
                </div>
                ${config.postText ? `<div class="countdown-post-text">${config.postText}</div>` : ''}
            </div>
        `;
    }

    // Update countdown display
    function updateCountdown() {
        const time = getTimeRemaining();

        // If countdown finished
        if (time.total <= 0) {
            showLaunchedMessage();
            return;
        }

        // Update values
        if (config.showDays) {
            document.getElementById('countdown-days').textContent = pad(time.days);
        }
        if (config.showHours) {
            document.getElementById('countdown-hours').textContent = pad(time.hours);
        }
        if (config.showMinutes) {
            document.getElementById('countdown-minutes').textContent = pad(time.minutes);
        }
        if (config.showSeconds) {
            document.getElementById('countdown-seconds').textContent = pad(time.seconds);
        }

        // Add pulse animation on seconds
        if (config.showSeconds) {
            const secondsEl = document.getElementById('countdown-seconds');
            secondsEl.style.transform = 'scale(1.1)';
            setTimeout(() => {
                secondsEl.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // Show "We're Live!" message
    function showLaunchedMessage() {
        const container = document.querySelector(config.targetSelector);
        if (!container) return;

        container.innerHTML = `
            <div class="countdown-launched">
                <div class="countdown-launched-emoji">🚀</div>
                <div class="countdown-launched-title">We're Live!</div>
                <div class="countdown-launched-subtitle">Download RESQ+ now!</div>
                <a href="#download" class="countdown-launched-button">Get the App</a>
            </div>
        `;
    }

    // Add CSS styles
    function addStyles() {
        if (document.getElementById('countdown-styles')) return;

        const style = document.createElement('style');
        style.id = 'countdown-styles';
        style.textContent = `
            .countdown-timer {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                padding: 30px;
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(20px);
                border-radius: 24px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                margin: 30px auto;
                max-width: 600px;
            }
            
            [data-theme="light"] .countdown-timer {
                background: rgba(255, 255, 255, 0.8);
                border: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            .countdown-pre-text {
                color: rgba(255, 255, 255, 0.8);
                font-size: 18px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            
            [data-theme="light"] .countdown-pre-text {
                color: #1a1a1a;
                font-weight: 700;
            }
            
            .countdown-numbers {
                display: flex;
                gap: 20px;
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .countdown-unit {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                min-width: 80px;
            }
            
            .countdown-value {
                font-size: 48px;
                font-weight: 800;
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                transition: transform 0.2s ease;
                line-height: 1;
            }
            
            /* Light mode - SAME gradient effect, darker colors for visibility */
            [data-theme="light"] .countdown-value {
                background: linear-gradient(135deg, #0D47A1 0%, #1565C0 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .countdown-label {
                color: rgba(255, 255, 255, 0.7);
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            [data-theme="light"] .countdown-label {
                color: #1a1a1a;
                font-weight: 700;
            }
            
            .countdown-post-text {
                color: var(--text-secondary);
                font-size: 16px;
                text-align: center;
            }
            
            /* Launched message */
            .countdown-launched {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                padding: 40px;
                text-align: center;
            }
            
            .countdown-launched-emoji {
                font-size: 80px;
                animation: rocketLaunch 1s ease;
            }
            
            @keyframes rocketLaunch {
                0% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-30px) rotate(-10deg); }
                100% { transform: translateY(0) rotate(0deg); }
            }
            
            .countdown-launched-title {
                font-size: 48px;
                font-weight: 900;
                color: #1565C0;
            }
            
            .countdown-launched-subtitle {
                font-size: 24px;
                color: var(--text-secondary);
            }
            
            .countdown-launched-button {
                background: linear-gradient(135deg, #ff3b3b 0%, #ff6b6b 100%);
                color: white;
                padding: 16px 40px;
                border-radius: 12px;
                text-decoration: none;
                font-size: 18px;
                font-weight: 700;
                transition: all 0.3s ease;
                display: inline-block;
                margin-top: 10px;
                box-shadow: 0 10px 30px rgba(255, 59, 59, 0.3);
            }
            
            .countdown-launched-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(255, 59, 59, 0.4);
            }
            
            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .countdown-timer {
                    padding: 25px 20px;
                }
                
                .countdown-value {
                    font-size: 36px;
                }
                
                .countdown-unit {
                    min-width: 60px;
                }
                
                .countdown-numbers {
                    gap: 15px;
                }
                
                .countdown-launched-emoji {
                    font-size: 60px;
                }
                
                .countdown-launched-title {
                    font-size: 36px;
                }
                
                .countdown-launched-subtitle {
                    font-size: 18px;
                }
            }
            
            @media (max-width: 480px) {
                .countdown-value {
                    font-size: 28px;
                }
                
                .countdown-unit {
                    min-width: 50px;
                }
                
                .countdown-label {
                    font-size: 11px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    // Initialize countdown
    function init() {
        const container = document.querySelector(config.targetSelector);
        
        if (!container) {
            console.warn('[Countdown] Container not found:', config.targetSelector);
            return;
        }

        // Add styles
        addStyles();

        // Insert countdown HTML
        container.innerHTML = createCountdownHTML();

        // Apply translations if available
        if (typeof applyTranslations === 'function') {
            const currentLang = localStorage.getItem('resq_lang') || 'en';
            applyTranslations(currentLang);
        }

        // Update immediately
        updateCountdown();

        // Update every second
        setInterval(updateCountdown, 1000);

        console.log('[Countdown] ✅ Initialized');
        console.log('[Countdown] Launch date:', config.launchDate);
    }

    // Wait for TRANSLATIONS to be available
    function waitForTranslations() {
        if (typeof window.TRANSLATIONS !== 'undefined') {
            init();
        } else {
            // Check every 50ms for TRANSLATIONS
            setTimeout(waitForTranslations, 50);
        }
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForTranslations);
    } else {
        waitForTranslations();
    }

    // Public API
    window.CountdownTimer = {
        // Update launch date dynamically
        setLaunchDate: function(date) {
            config.launchDate = date;
            updateCountdown();
        },
        
        // Get time remaining
        getTimeRemaining: getTimeRemaining,
        
        // Restart countdown
        restart: function() {
            init();
        }
    };

})();
