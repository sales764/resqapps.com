// ========================================
// RESQ+ SERVICE WORKER (PWA)
// Progressive Web App Functionality
// ========================================

const CACHE_VERSION = 'resq-v2.2.0';
const CACHE_NAME = `resq-cache-${CACHE_VERSION}`;
const RUNTIME_CACHE = 'resq-runtime';
const IMAGE_CACHE = 'resq-images';

// Core assets to cache immediately (critical for offline)
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/privacy.html',
    '/offline.html',
    '/404.html',
    '/500.html',
    '/manifest.json'
];

// CSS files to cache
const CSS_ASSETS = [
    '/styles.css',
    '/styles-stellar.css',
    '/styles-stellar-override.css',
    '/ux-advanced.css',
    '/modal-stellar.css',
    '/lang-switcher.css',
    '/logo-stellar.css',
    '/touch-targets.css'
];

// JavaScript files to cache
const JS_ASSETS = [
    '/script.js',
    '/i18n.js',
    '/translations-complete.js',
    '/ux-advanced.js',
    '/modal-stellar.js',
    '/email-approval.js',
    '/visitor-tracking.js'
];

// Images to cache (critical ones)
const IMAGE_ASSETS = [
    '/images/resq-logo.png',
    '/images/app-icon.webp',
    '/images/screenshot-1.png',
    '/images/screenshot-2.png',
    '/images/screenshot-3.png',
    '/images/screenshot-4.png',
    '/images/screenshot-5.png',
    '/images/screenshot-6.png',
    '/images/screenshot-7.png',
    '/images/screenshot-8.png'
];

// Combine all assets
const ASSETS_TO_CACHE = [
    ...CORE_ASSETS,
    ...CSS_ASSETS,
    ...JS_ASSETS,
    ...IMAGE_ASSETS
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('[Service Worker] Installation complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - advanced caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // HTML - Network First (always fresh)
    if (request.headers.get('Accept').includes('text/html')) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Images - Cache First (performance)
    if (request.destination === 'image') {
        event.respondWith(cacheFirst(request, IMAGE_CACHE));
        return;
    }
    
    // CSS/JS - Stale While Revalidate (balance speed + freshness)
    if (request.destination === 'style' || request.destination === 'script') {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }
    
    // Default - Cache First
    event.respondWith(cacheFirst(request, CACHE_NAME));
});

// Strategy 1: Network First (for HTML)
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        // Fallback to offline page
        if (request.mode === 'navigate') {
            return caches.match('/offline.html');
        }
        throw error;
    }
}

// Strategy 2: Cache First (for images)
async function cacheFirst(request, cacheName = CACHE_NAME) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);
        throw error;
    }
}

// Strategy 3: Stale While Revalidate (for CSS/JS)
async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);
    
    const fetchPromise = fetch(request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
        });
        return networkResponse;
    });
    
    return cachedResponse || fetchPromise;
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-newsletter') {
        event.waitUntil(syncNewsletter());
    }
});

async function syncNewsletter() {
    // Implement newsletter sync logic
    console.log('[Service Worker] Syncing newsletter subscriptions');
}

// Push notification handler
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    
    const options = {
        body: data.body || 'New emergency alert',
        icon: '/images/app-icon.webp',
        badge: '/images/resq-logo.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(
            data.title || 'RESQ+ Alert',
            options
        )
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
