// ========================================
// LIVE CHAT INTEGRATION
// Item 42/78: Tawk.to & Intercom
// ========================================

(function() {
    'use strict';

    // Configuration
    const config = {
        // Live chat provider: 'tawk' or 'intercom' or 'none'
        provider: 'tawk',
        
        // Tawk.to settings (FREE)
        tawk: {
            enabled: true,
            propertyId: 'YOUR_TAWK_PROPERTY_ID',     // Change this!
            widgetId: 'YOUR_TAWK_WIDGET_ID',         // Change this!
            
            // Customization
            appearance: {
                bubbleColor: '#4facfe',
                bubbleTextColor: '#ffffff',
                position: 'bottom-right'  // or 'bottom-left'
            },
            
            // Visitor info
            visitorName: '',
            visitorEmail: '',
            
            // Auto-show settings
            autoShow: false,
            showAfterSeconds: 30,
            showOnPages: ['index.html', 'privacy.html']
        },
        
        // Intercom settings (PAID)
        intercom: {
            enabled: false,
            appId: 'YOUR_INTERCOM_APP_ID',           // Change this!
            
            // User attributes
            name: '',
            email: '',
            created_at: Math.floor(Date.now() / 1000),
            
            // Customization
            appearance: {
                widget_color: '#4facfe',
                horizontal_padding: 20,
                vertical_padding: 20
            }
        },
        
        // Custom launcher
        customLauncher: {
            enabled: true,
            position: 'bottom-right',
            text: 'Need Help?',
            icon: '💬'
        }
    };

    // Initialize Tawk.to
    function initTawk() {
        if (!config.tawk.enabled) {
            console.log('[Live Chat] Tawk.to disabled');
            return;
        }

        // Create Tawk script
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();
        
        (function(){
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = `https://embed.tawk.to/${config.tawk.propertyId}/${config.tawk.widgetId}`;
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
        })();

        // Customize Tawk widget
        Tawk_API.onLoad = function(){
            console.log('[Live Chat] ✅ Tawk.to loaded');
            
            // Set visitor info if available
            if (config.tawk.visitorName) {
                Tawk_API.setAttributes({
                    'name': config.tawk.visitorName,
                    'email': config.tawk.visitorEmail
                });
            }
            
            // Track with GA4
            if (typeof gtag !== 'undefined') {
                gtag('event', 'live_chat_loaded', {
                    'event_category': 'Engagement',
                    'event_label': 'Tawk.to'
                });
            }
        };

        // Track chat started
        Tawk_API.onChatStarted = function(){
            console.log('[Live Chat] Chat started');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'live_chat_started', {
                    'event_category': 'Engagement',
                    'event_label': 'Tawk.to'
                });
            }
        };

        // Track chat ended
        Tawk_API.onChatEnded = function(){
            console.log('[Live Chat] Chat ended');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'live_chat_ended', {
                    'event_category': 'Engagement',
                    'event_label': 'Tawk.to'
                });
            }
        };

        // Auto-show if configured
        if (config.tawk.autoShow) {
            setTimeout(() => {
                Tawk_API.maximize();
            }, config.tawk.showAfterSeconds * 1000);
        }
    }

    // Initialize Intercom
    function initIntercom() {
        if (!config.intercom.enabled) {
            console.log('[Live Chat] Intercom disabled');
            return;
        }

        window.intercomSettings = {
            api_base: "https://api-iam.intercom.io",
            app_id: config.intercom.appId,
            name: config.intercom.name,
            email: config.intercom.email,
            created_at: config.intercom.created_at,
            ...config.intercom.appearance
        };

        // Create Intercom script
        (function(){
            var w=window;
            var ic=w.Intercom;
            if(typeof ic==="function"){
                ic('reattach_activator');
                ic('update',w.intercomSettings);
            } else {
                var d=document;
                var i=function(){
                    i.c(arguments);
                };
                i.q=[];
                i.c=function(args){
                    i.q.push(args);
                };
                w.Intercom=i;
                var l=function(){
                    var s=d.createElement('script');
                    s.type='text/javascript';
                    s.async=true;
                    s.src='https://widget.intercom.io/widget/' + config.intercom.appId;
                    var x=d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s,x);
                };
                if(document.readyState==='complete'){
                    l();
                } else if(w.attachEvent){
                    w.attachEvent('onload',l);
                } else {
                    w.addEventListener('load',l,false);
                }
            }
        })();

        console.log('[Live Chat] ✅ Intercom loaded');
        
        // Track with GA4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'live_chat_loaded', {
                'event_category': 'Engagement',
                'event_label': 'Intercom'
            });
        }
    }

    // Create custom launcher button
    function createCustomLauncher() {
        if (!config.customLauncher.enabled) return;

        const launcher = document.createElement('div');
        launcher.id = 'custom-chat-launcher';
        launcher.innerHTML = `
            <div class="chat-launcher-button">
                <span class="chat-icon">${config.customLauncher.icon}</span>
                <span class="chat-text">${config.customLauncher.text}</span>
            </div>
        `;

        document.body.appendChild(launcher);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #custom-chat-launcher {
                position: fixed;
                ${config.customLauncher.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
                bottom: 20px;
                z-index: 9999;
                cursor: pointer;
            }
            
            .chat-launcher-button {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                color: white;
                padding: 14px 20px;
                border-radius: 50px;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);
                transition: all 0.3s ease;
                font-weight: 600;
                font-size: 15px;
                animation: pulse-chat 2s ease-in-out infinite;
            }
            
            .chat-launcher-button:hover {
                transform: translateY(-3px) scale(1.05);
                box-shadow: 0 15px 40px rgba(79, 172, 254, 0.6);
            }
            
            .chat-icon {
                font-size: 24px;
            }
            
            @keyframes pulse-chat {
                0%, 100% {
                    box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);
                }
                50% {
                    box-shadow: 0 10px 30px rgba(79, 172, 254, 0.6), 0 0 0 10px rgba(79, 172, 254, 0);
                }
            }
            
            @media (max-width: 768px) {
                .chat-text {
                    display: none;
                }
                
                .chat-launcher-button {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    justify-content: center;
                    padding: 0;
                }
                
                .chat-icon {
                    font-size: 28px;
                }
            }
        `;
        document.head.appendChild(style);

        // Click handler
        launcher.addEventListener('click', () => {
            if (config.provider === 'tawk' && typeof Tawk_API !== 'undefined') {
                Tawk_API.toggle();
            } else if (config.provider === 'intercom' && typeof Intercom !== 'undefined') {
                Intercom('show');
            }
            
            // Track click
            if (typeof gtag !== 'undefined') {
                gtag('event', 'custom_launcher_clicked', {
                    'event_category': 'Engagement',
                    'event_label': 'Live Chat'
                });
            }
        });
    }

    // Set visitor info (called from outside)
    function setVisitorInfo(name, email) {
        config.tawk.visitorName = name;
        config.tawk.visitorEmail = email;
        config.intercom.name = name;
        config.intercom.email = email;

        // Update if already loaded
        if (config.provider === 'tawk' && typeof Tawk_API !== 'undefined') {
            Tawk_API.setAttributes({
                'name': name,
                'email': email
            });
        } else if (config.provider === 'intercom' && typeof Intercom !== 'undefined') {
            Intercom('update', {
                name: name,
                email: email
            });
        }
    }

    // Initialize based on provider
    function init() {
        console.log('[Live Chat] Initializing...');
        console.log('[Live Chat] Provider:', config.provider);

        if (config.provider === 'tawk') {
            initTawk();
        } else if (config.provider === 'intercom') {
            initIntercom();
        } else {
            console.log('[Live Chat] No provider enabled');
            return;
        }

        // Create custom launcher if enabled
        // createCustomLauncher();

        console.log('[Live Chat] ✅ Initialized');
    }

    // Start when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    window.LiveChat = {
        setVisitor: setVisitorInfo,
        
        show: function() {
            if (config.provider === 'tawk' && typeof Tawk_API !== 'undefined') {
                Tawk_API.maximize();
            } else if (config.provider === 'intercom' && typeof Intercom !== 'undefined') {
                Intercom('show');
            }
        },
        
        hide: function() {
            if (config.provider === 'tawk' && typeof Tawk_API !== 'undefined') {
                Tawk_API.minimize();
            } else if (config.provider === 'intercom' && typeof Intercom !== 'undefined') {
                Intercom('hide');
            }
        },
        
        toggle: function() {
            if (config.provider === 'tawk' && typeof Tawk_API !== 'undefined') {
                Tawk_API.toggle();
            } else if (config.provider === 'intercom' && typeof Intercom !== 'undefined') {
                Intercom('show');
            }
        }
    };

})();

// ========================================
// USAGE EXAMPLES
// ========================================

/*
// Set visitor info after signup
LiveChat.setVisitor('John Doe', 'john@example.com');

// Show chat manually
LiveChat.show();

// Hide chat
LiveChat.hide();

// Toggle chat
LiveChat.toggle();
*/
