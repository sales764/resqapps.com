// ========================================
// SIMPLE ERROR LOGGER
// Alternative gratuite à Sentry
// ========================================

(function() {
    'use strict';

    // Configuration
    const config = {
        enabled: true,
        logToConsole: true,
        logToGA4: true, // Envoyer les erreurs à Google Analytics
        maxErrors: 50, // Maximum d'erreurs à stocker localement
        endpoint: null // Optionnel: endpoint pour envoyer les erreurs
    };

    // Storage pour les erreurs
    let errorLog = [];

    // Charger les erreurs existantes du localStorage
    function loadErrorLog() {
        try {
            const stored = localStorage.getItem('resq_error_log');
            if (stored) {
                errorLog = JSON.parse(stored);
            }
        } catch (e) {
            console.warn('[Error Logger] Could not load error log:', e);
        }
    }

    // Sauvegarder les erreurs dans localStorage
    function saveErrorLog() {
        try {
            // Garder seulement les X dernières erreurs
            if (errorLog.length > config.maxErrors) {
                errorLog = errorLog.slice(-config.maxErrors);
            }
            localStorage.setItem('resq_error_log', JSON.stringify(errorLog));
        } catch (e) {
            console.warn('[Error Logger] Could not save error log:', e);
        }
    }

    // Capturer les détails de l'erreur
    function captureError(error, context = {}) {
        if (!config.enabled) return;

        const errorData = {
            timestamp: new Date().toISOString(),
            message: error.message || String(error),
            stack: error.stack || null,
            url: window.location.href,
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            context: context
        };

        // Ajouter au log
        errorLog.push(errorData);
        saveErrorLog();

        // Log dans la console
        if (config.logToConsole) {
            console.error('[Error Logger]', errorData);
        }

        // Envoyer à Google Analytics si disponible
        if (config.logToGA4 && typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: errorData.message,
                fatal: false
            });
        }

        // Envoyer à un endpoint custom si configuré
        if (config.endpoint) {
            sendToEndpoint(errorData);
        }

        return errorData;
    }

    // Envoyer à un endpoint custom
    function sendToEndpoint(errorData) {
        try {
            fetch(config.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(errorData)
            }).catch(e => {
                console.warn('[Error Logger] Could not send error to endpoint:', e);
            });
        } catch (e) {
            console.warn('[Error Logger] Endpoint error:', e);
        }
    }

    // ========================================
    // GLOBAL ERROR HANDLERS
    // ========================================

    // Capturer les erreurs JavaScript non gérées
    window.addEventListener('error', function(event) {
        captureError(event.error || new Error(event.message), {
            type: 'uncaught_error',
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    });

    // Capturer les promesses rejetées non gérées
    window.addEventListener('unhandledrejection', function(event) {
        captureError(event.reason || new Error('Unhandled Promise Rejection'), {
            type: 'unhandled_promise_rejection',
            promise: event.promise
        });
    });

    // Capturer les erreurs de ressources (images, scripts, etc.)
    window.addEventListener('error', function(event) {
        if (event.target !== window) {
            captureError(new Error('Resource failed to load'), {
                type: 'resource_error',
                tagName: event.target.tagName,
                src: event.target.src || event.target.href
            });
        }
    }, true);

    // ========================================
    // API PUBLIQUE
    // ========================================

    window.ErrorLogger = {
        // Capturer une erreur manuellement
        capture: function(error, context) {
            return captureError(error, context);
        },

        // Obtenir tous les logs
        getLogs: function() {
            return errorLog;
        },

        // Effacer tous les logs
        clearLogs: function() {
            errorLog = [];
            localStorage.removeItem('resq_error_log');
        },

        // Obtenir un résumé des erreurs
        getSummary: function() {
            const summary = {
                total: errorLog.length,
                byType: {},
                recent: errorLog.slice(-10)
            };

            errorLog.forEach(function(error) {
                const type = error.context?.type || 'unknown';
                summary.byType[type] = (summary.byType[type] || 0) + 1;
            });

            return summary;
        },

        // Exporter les logs
        export: function() {
            const data = JSON.stringify(errorLog, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resq-error-log-' + Date.now() + '.json';
            a.click();
            URL.revokeObjectURL(url);
        },

        // Configuration
        config: function(newConfig) {
            Object.assign(config, newConfig);
        }
    };

    // ========================================
    // MONITORING SPÉCIFIQUE RESQ+
    // ========================================

    // Monitorer les échecs de chargement des traductions
    if (typeof i18n !== 'undefined') {
        const originalTranslate = i18n.translate;
        i18n.translate = function(key) {
            try {
                return originalTranslate.call(this, key);
            } catch (e) {
                captureError(e, {
                    type: 'translation_error',
                    key: key
                });
                return key; // Fallback
            }
        };
    }

    // Monitorer les échecs AJAX/Fetch
    const originalFetch = window.fetch;
    window.fetch = function() {
        return originalFetch.apply(this, arguments)
            .catch(function(error) {
                captureError(error, {
                    type: 'fetch_error',
                    url: arguments[0]
                });
                throw error;
            });
    };

    // ========================================
    // CONSOLE HELPER
    // ========================================

    // Ajouter une commande console pour debugging
    window.showErrorLog = function() {
        console.table(errorLog);
        console.log('Total errors:', errorLog.length);
        console.log('Export logs:', 'ErrorLogger.export()');
        console.log('Clear logs:', 'ErrorLogger.clearLogs()');
    };

    // ========================================
    // INITIALIZATION
    // ========================================

    loadErrorLog();

    console.log('[Error Logger] ✅ Initialized');
    console.log('[Error Logger] Type "showErrorLog()" to view errors');
    console.log('[Error Logger] Type "ErrorLogger.export()" to export logs');

    // Envoyer un résumé à GA4 au chargement si des erreurs existent
    if (errorLog.length > 0 && config.logToGA4 && typeof gtag !== 'undefined') {
        gtag('event', 'error_summary', {
            event_category: 'Errors',
            event_label: 'Session has errors',
            value: errorLog.length
        });
    }

})();

// ========================================
// USAGE EXAMPLES
// ========================================

/*
// Capturer une erreur manuellement
try {
    // Code qui peut fail
    somethingDangerous();
} catch (error) {
    ErrorLogger.capture(error, { context: 'newsletter_form' });
}

// Obtenir tous les logs
const logs = ErrorLogger.getLogs();

// Obtenir un résumé
const summary = ErrorLogger.getSummary();
console.log('Total errors:', summary.total);
console.log('By type:', summary.byType);

// Exporter vers fichier JSON
ErrorLogger.export();

// Effacer les logs
ErrorLogger.clearLogs();

// Changer la config
ErrorLogger.config({
    enabled: true,
    logToGA4: true,
    endpoint: 'https://your-api.com/errors'
});
*/
