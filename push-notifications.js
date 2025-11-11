// ========================================
// PUSH NOTIFICATIONS SETUP
// Item 71/78: Push notifications for launches and emergency alerts
// ========================================

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        // VAPID public key (generate at: https://web-push-codelab.glitch.me/)
        // Replace with your own key
        vapidPublicKey: 'YOUR_VAPID_PUBLIC_KEY_HERE',
        
        // Don't ask again if denied for X days
        deniedCooldown: 30 * 24 * 60 * 60 * 1000, // 30 days
        
        // Ask after X page views
        minPageViews: 3,
        
        // Storage keys
        storageKeys: {
            permission: 'push_permission_status',
            deniedAt: 'push_denied_at',
            subscription: 'push_subscription',
            pageViews: 'push_page_views'
        }
    };

    /**
     * Check if push notifications are supported
     */
    function isPushSupported() {
        return ('serviceWorker' in navigator && 
                'PushManager' in window &&
                'Notification' in window);
    }

    /**
     * Check current permission status
     */
    function getPermissionStatus() {
        if (!isPushSupported()) {
            return 'unsupported';
        }
        return Notification.permission; // 'default', 'granted', 'denied'
    }

    /**
     * Check if should ask for permission
     */
    function shouldAskPermission() {
        const status = getPermissionStatus();
        
        if (status === 'unsupported' || status === 'granted') {
            return false;
        }
        
        if (status === 'denied') {
            // Check if enough time has passed
            const deniedAt = localStorage.getItem(CONFIG.storageKeys.deniedAt);
            if (deniedAt) {
                const timeSinceDenied = Date.now() - parseInt(deniedAt);
                if (timeSinceDenied < CONFIG.deniedCooldown) {
                    return false;
                }
            }
        }
        
        // Check page views
        const pageViews = parseInt(localStorage.getItem(CONFIG.storageKeys.pageViews) || '0');
        return pageViews >= CONFIG.minPageViews;
    }

    /**
     * Track page view
     */
    function trackPageView() {
        const views = parseInt(localStorage.getItem(CONFIG.storageKeys.pageViews) || '0');
        localStorage.setItem(CONFIG.storageKeys.pageViews, (views + 1).toString());
        return views + 1;
    }

    /**
     * Convert VAPID key to Uint8Array
     */
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    /**
     * Request notification permission
     */
    async function requestPermission() {
        try {
            const permission = await Notification.requestPermission();
            
            localStorage.setItem(CONFIG.storageKeys.permission, permission);
            
            if (permission === 'granted') {
                console.log('Push notification permission granted');
                
                // Subscribe to push notifications
                await subscribeToPush();
                
                // Track in analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'push_permission_granted', {
                        'event_category': 'Push Notifications',
                        'event_label': 'Granted'
                    });
                }
                
                return true;
            } else if (permission === 'denied') {
                console.log('Push notification permission denied');
                
                // Save denied timestamp
                localStorage.setItem(CONFIG.storageKeys.deniedAt, Date.now().toString());
                
                // Track in analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'push_permission_denied', {
                        'event_category': 'Push Notifications',
                        'event_label': 'Denied'
                    });
                }
                
                return false;
            }
            
            return false;
        } catch (error) {
            console.error('Error requesting permission:', error);
            return false;
        }
    }

    /**
     * Subscribe to push notifications
     */
    async function subscribeToPush() {
        try {
            const registration = await navigator.serviceWorker.ready;
            
            // Check if already subscribed
            const existingSubscription = await registration.pushManager.getSubscription();
            if (existingSubscription) {
                console.log('Already subscribed to push');
                await sendSubscriptionToServer(existingSubscription);
                return existingSubscription;
            }
            
            // Subscribe
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(CONFIG.vapidPublicKey)
            });
            
            console.log('Push subscription created:', subscription);
            
            // Save subscription
            localStorage.setItem(
                CONFIG.storageKeys.subscription, 
                JSON.stringify(subscription)
            );
            
            // Send to server
            await sendSubscriptionToServer(subscription);
            
            return subscription;
        } catch (error) {
            console.error('Error subscribing to push:', error);
            throw error;
        }
    }

    /**
     * Send subscription to server
     */
    async function sendSubscriptionToServer(subscription) {
        try {
            const response = await fetch('/api/push/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subscription: subscription,
                    userAgent: navigator.userAgent,
                    timestamp: Date.now()
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to send subscription to server');
            }
            
            console.log('Subscription sent to server successfully');
            
            // Track in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'push_subscribed', {
                    'event_category': 'Push Notifications',
                    'event_label': 'Subscribed'
                });
            }
            
            return true;
        } catch (error) {
            console.error('Error sending subscription:', error);
            return false;
        }
    }

    /**
     * Unsubscribe from push notifications
     */
    async function unsubscribeFromPush() {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            
            if (subscription) {
                await subscription.unsubscribe();
                
                // Remove from localStorage
                localStorage.removeItem(CONFIG.storageKeys.subscription);
                
                // Notify server
                await fetch('/api/push/unsubscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ subscription })
                });
                
                console.log('Unsubscribed from push notifications');
                
                // Track in analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'push_unsubscribed', {
                        'event_category': 'Push Notifications',
                        'event_label': 'Unsubscribed'
                    });
                }
                
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error unsubscribing:', error);
            return false;
        }
    }

    /**
     * Check if subscribed
     */
    async function isSubscribed() {
        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            return subscription !== null;
        } catch (error) {
            return false;
        }
    }

    /**
     * Create notification prompt UI
     */
    function createPromptUI() {
        const prompt = document.createElement('div');
        prompt.id = 'push-notification-prompt';
        prompt.className = 'push-prompt';
        prompt.innerHTML = `
            <div class="push-prompt-card">
                <button class="push-prompt-close" aria-label="Close">×</button>
                
                <div class="push-prompt-icon">
                    🔔
                </div>
                
                <h3 class="push-prompt-title">
                    Stay Informed
                </h3>
                
                <p class="push-prompt-message">
                    Get instant alerts about:
                </p>
                
                <ul class="push-prompt-benefits">
                    <li>
                        <span class="benefit-icon">🚨</span>
                        <span>Emergency updates</span>
                    </li>
                    <li>
                        <span class="benefit-icon">📢</span>
                        <span>Important announcements</span>
                    </li>
                    <li>
                        <span class="benefit-icon">⚡</span>
                        <span>Critical alerts</span>
                    </li>
                </ul>
                
                <div class="push-prompt-actions">
                    <button class="push-prompt-allow">
                        <span>🔔</span>
                        <span>Enable Notifications</span>
                    </button>
                    <button class="push-prompt-dismiss">
                        Maybe Later
                    </button>
                </div>
                
                <p class="push-prompt-note">
                    You can change this anytime in settings
                </p>
            </div>
        `;
        
        return prompt;
    }

    /**
     * Show notification prompt
     */
    function showPrompt() {
        if (!shouldAskPermission()) {
            return;
        }
        
        const prompt = createPromptUI();
        document.body.appendChild(prompt);
        
        // Animate in
        setTimeout(() => {
            prompt.classList.add('show');
        }, 100);
        
        // Setup event listeners
        const allowBtn = prompt.querySelector('.push-prompt-allow');
        const dismissBtn = prompt.querySelector('.push-prompt-dismiss');
        const closeBtn = prompt.querySelector('.push-prompt-close');
        
        allowBtn.addEventListener('click', async () => {
            const granted = await requestPermission();
            removePrompt(prompt);
            
            if (granted) {
                showSuccessMessage();
            }
        });
        
        dismissBtn.addEventListener('click', () => {
            removePrompt(prompt);
            
            // Track dismissal
            if (typeof gtag !== 'undefined') {
                gtag('event', 'push_prompt_dismissed', {
                    'event_category': 'Push Notifications',
                    'event_label': 'Dismissed'
                });
            }
        });
        
        closeBtn.addEventListener('click', () => {
            removePrompt(prompt);
        });
        
        // Track prompt shown
        if (typeof gtag !== 'undefined') {
            gtag('event', 'push_prompt_shown', {
                'event_category': 'Push Notifications',
                'event_label': 'Shown'
            });
        }
    }

    /**
     * Remove prompt
     */
    function removePrompt(prompt) {
        prompt.classList.remove('show');
        setTimeout(() => {
            if (prompt && prompt.parentNode) {
                prompt.parentNode.removeChild(prompt);
            }
        }, 300);
    }

    /**
     * Show success message
     */
    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'push-success-message';
        message.innerHTML = `
            <div class="push-success-content">
                <span class="success-icon">✅</span>
                <span class="success-text">Notifications enabled! You'll receive important alerts.</span>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                if (message && message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 5000);
    }

    /**
     * Initialize push notifications
     */
    function init() {
        // Track page view
        trackPageView();
        
        // Check if supported
        if (!isPushSupported()) {
            console.log('Push notifications not supported');
            return;
        }
        
        // Check current status
        const status = getPermissionStatus();
        console.log('Push notification status:', status);
        
        if (status === 'granted') {
            // Already granted, ensure subscribed
            subscribeToPush();
        } else if (status === 'default') {
            // Show prompt after delay
            setTimeout(() => {
                if (shouldAskPermission()) {
                    showPrompt();
                }
            }, 5000); // 5 seconds delay
        }
    }

    // Public API
    window.PushNotifications = {
        /**
         * Check if supported
         */
        isSupported: isPushSupported,
        
        /**
         * Get permission status
         */
        getStatus: getPermissionStatus,
        
        /**
         * Request permission manually
         */
        requestPermission: requestPermission,
        
        /**
         * Subscribe to push
         */
        subscribe: subscribeToPush,
        
        /**
         * Unsubscribe from push
         */
        unsubscribe: unsubscribeFromPush,
        
        /**
         * Check if subscribed
         */
        isSubscribed: isSubscribed,
        
        /**
         * Show prompt manually
         */
        showPrompt: showPrompt,
        
        /**
         * Reset (for testing)
         */
        reset: function() {
            localStorage.removeItem(CONFIG.storageKeys.permission);
            localStorage.removeItem(CONFIG.storageKeys.deniedAt);
            localStorage.removeItem(CONFIG.storageKeys.subscription);
            localStorage.removeItem(CONFIG.storageKeys.pageViews);
        }
    };

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/*
USAGE:

// Automatic - just include the script
<script src="push-notifications.js"></script>

// Manual control
PushNotifications.requestPermission();

// Check status
const status = PushNotifications.getStatus();
console.log('Status:', status); // 'default', 'granted', 'denied'

// Check if subscribed
const subscribed = await PushNotifications.isSubscribed();

// Unsubscribe
await PushNotifications.unsubscribe();

// Show prompt manually
PushNotifications.showPrompt();

// Reset (testing)
PushNotifications.reset();

IMPORTANT NOTES:

1. Generate VAPID keys:
   - Visit: https://web-push-codelab.glitch.me/
   - Or use: npx web-push generate-vapid-keys
   - Replace CONFIG.vapidPublicKey with your public key

2. Implement server endpoints:
   - POST /api/push/subscribe (save subscription)
   - POST /api/push/unsubscribe (remove subscription)
   - POST /api/push/send (send notification)

3. Update service worker (sw.js):
   - Add push event listener
   - Add notificationclick event listener

4. Test with:
   - Chrome DevTools → Application → Service Workers
   - Use "Send notification" to test
*/
