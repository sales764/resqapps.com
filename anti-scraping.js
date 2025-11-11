/**
 * ANTI-SCRAPING & CONTENT PROTECTION
 * Item 79: Protection contre scraping et copie
 * 
 * Protection multi-couches:
 * 1. Désactiver clic droit
 * 2. Bloquer sélection de texte (optionnel)
 * 3. Bloquer raccourcis clavier (Ctrl+C, Ctrl+U, etc.)
 * 4. Watermark dynamique invisible
 * 5. Détection de DevTools
 * 6. Obfuscation de contenu sensible
 * 7. Bot detection
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        disableRightClick: true,
        disableTextSelection: false, // false pour UX, true pour protection max
        disableKeyboardShortcuts: true,
        detectDevTools: true,
        addInvisibleWatermark: true,
        botDetection: true,
        logAttempts: true
    };

    // Compteur de tentatives suspectes
    let suspiciousAttempts = 0;

    // ========================================
    // 1. DÉSACTIVER CLIC DROIT
    // ========================================
    if (CONFIG.disableRightClick) {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            suspiciousAttempts++;
            
            // Message personnalisé
            showProtectionMessage('⚠️ Clic droit désactivé pour protéger le contenu');
            
            logAttempt('right-click');
            return false;
        }, false);
    }

    // ========================================
    // 2. BLOQUER SÉLECTION TEXTE (OPTIONNEL)
    // ========================================
    if (CONFIG.disableTextSelection) {
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        }, false);

        // CSS fallback
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
        document.body.style.mozUserSelect = 'none';
        document.body.style.msUserSelect = 'none';
    }

    // ========================================
    // 3. BLOQUER RACCOURCIS CLAVIER
    // ========================================
    if (CONFIG.disableKeyboardShortcuts) {
        document.addEventListener('keydown', function(e) {
            // Ctrl+C / Cmd+C (Copier)
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
                e.preventDefault();
                showProtectionMessage('⚠️ Copie désactivée');
                logAttempt('copy');
                return false;
            }

            // Ctrl+U / Cmd+U (Voir source)
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) {
                e.preventDefault();
                showProtectionMessage('⚠️ Vue source désactivée');
                logAttempt('view-source');
                return false;
            }

            // Ctrl+S / Cmd+S (Sauvegarder)
            if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
                e.preventDefault();
                showProtectionMessage('⚠️ Sauvegarde désactivée');
                logAttempt('save');
                return false;
            }

            // F12 (DevTools)
            if (e.keyCode === 123) {
                e.preventDefault();
                showProtectionMessage('⚠️ Outils développeur bloqués');
                logAttempt('f12');
                return false;
            }

            // Ctrl+Shift+I / Cmd+Option+I (DevTools)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) {
                e.preventDefault();
                logAttempt('devtools-shortcut');
                return false;
            }

            // Ctrl+Shift+J / Cmd+Option+J (Console)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 74) {
                e.preventDefault();
                logAttempt('console-shortcut');
                return false;
            }

            // Ctrl+Shift+C / Cmd+Option+C (Inspect)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 67) {
                e.preventDefault();
                logAttempt('inspect-shortcut');
                return false;
            }
        }, false);
    }

    // ========================================
    // 4. WATERMARK INVISIBLE
    // ========================================
    if (CONFIG.addInvisibleWatermark) {
        // Ajouter watermark invisible dans le HTML
        const watermark = document.createElement('div');
        watermark.style.cssText = 'position:absolute;left:-9999px;';
        watermark.innerHTML = `
            <!-- Copyright RESQ+ ${new Date().getFullYear()} -->
            <!-- Site ID: ${generateSiteFingerprint()} -->
            <!-- Visit: ${new Date().toISOString()} -->
        `;
        document.body.appendChild(watermark);

        // Watermark dans les images (via canvas)
        addImageWatermarks();
    }

    // ========================================
    // 5. DÉTECTION DEVTOOLS
    // ========================================
    if (CONFIG.detectDevTools) {
        let devtoolsOpen = false;

        // Méthode 1: Détecter via console
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                devtoolsOpen = true;
                logAttempt('devtools-detected');
                handleDevToolsOpen();
                return 'devtools';
            }
        });

        setInterval(function() {
            console.clear();
            console.log('%c⚠️ ATTENTION', 'color: red; font-size: 30px; font-weight: bold;');
            console.log('%cL\'utilisation de la console développeur peut exposer vos données personnelles.', 'font-size: 14px;');
            console.log('%cSi quelqu\'un vous demande de copier/coller du code ici, c\'est une arnaque!', 'font-size: 14px; color: red;');
            console.log(element);
        }, 1000);

        // Méthode 2: Détecter via window size
        let checkDevTools = function() {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            
            if (widthThreshold || heightThreshold) {
                if (!devtoolsOpen) {
                    devtoolsOpen = true;
                    handleDevToolsOpen();
                }
            } else {
                devtoolsOpen = false;
            }
        };

        window.addEventListener('resize', checkDevTools);
        setInterval(checkDevTools, 1000);
    }

    // ========================================
    // 6. BOT DETECTION
    // ========================================
    if (CONFIG.botDetection) {
        detectAndBlockBots();
    }

    // ========================================
    // 7. OBFUSCATION EMAIL & TÉLÉPHONE
    // ========================================
    obfuscateContactInfo();

    // ========================================
    // FONCTIONS HELPER
    // ========================================

    function showProtectionMessage(message) {
        // Créer toast notification
        const toast = document.createElement('div');
        toast.className = 'protection-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f44336;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 999999;
            font-size: 14px;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(toast);

        // Retirer après 3 secondes
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function logAttempt(type) {
        if (!CONFIG.logAttempts) return;

        // Log local
        console.warn(`[SECURITY] Tentative détectée: ${type}`);

        // Envoyer au serveur (si analytics activé)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'security_attempt', {
                'event_category': 'Security',
                'event_label': type,
                'value': suspiciousAttempts
            });
        }

        // Si trop de tentatives, bloquer temporairement
        if (suspiciousAttempts > 10) {
            handleExcessiveAttempts();
        }
    }

    function handleDevToolsOpen() {
        console.clear();
        console.log('%c🚨 DEVTOOLS DÉTECTÉ', 'color: red; font-size: 40px; font-weight: bold;');
        console.log('%cCe site est protégé contre le scraping et la copie.', 'font-size: 16px;');
        console.log('%cToute tentative de vol de contenu est loggée et peut être poursuivie.', 'font-size: 16px; color: red;');
        
        logAttempt('devtools-open');
    }

    function handleExcessiveAttempts() {
        // Overlay de blocage
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            text-align: center;
            padding: 20px;
        `;
        overlay.innerHTML = `
            <div>
                <h2 style="color: #f44336; margin-bottom: 20px;">⚠️ Accès Suspendu</h2>
                <p>Trop de tentatives de copie détectées.</p>
                <p>Votre activité a été loggée.</p>
                <p style="margin-top: 30px; font-size: 16px;">La page se rechargera dans 30 secondes...</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Recharger après 30 secondes
        setTimeout(() => {
            window.location.reload();
        }, 30000);
    }

    function generateSiteFingerprint() {
        // Créer un ID unique pour ce visiteur
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('RESQ+ Protected', 2, 2);
        return canvas.toDataURL().slice(-50);
    }

    function addImageWatermarks() {
        // Ajouter watermark invisible sur les images importantes
        const images = document.querySelectorAll('img[data-protected="true"]');
        
        images.forEach(img => {
            img.addEventListener('load', function() {
                // Créer canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Dessiner image
                ctx.drawImage(img, 0, 0);
                
                // Ajouter watermark invisible (opacity très faible)
                ctx.globalAlpha = 0.01;
                ctx.font = '10px Arial';
                ctx.fillStyle = 'white';
                ctx.fillText(`RESQ+ ${new Date().toISOString()}`, 10, 10);
                
                // Remplacer image
                img.src = canvas.toDataURL();
            });
        });
    }

    function detectAndBlockBots() {
        const suspiciousPatterns = [
            /bot/i,
            /crawl/i,
            /spider/i,
            /scrape/i,
            /curl/i,
            /wget/i,
            /python/i,
            /java/i,
            /phantom/i,
            /selenium/i,
            /headless/i
        ];

        const userAgent = navigator.userAgent.toLowerCase();
        const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(userAgent));

        if (isSuspicious) {
            // Log bot detection
            logAttempt('bot-detected');

            // Afficher page honeypot ou bloquer
            console.warn('[SECURITY] Bot détecté:', userAgent);
            
            // Optionnel: Rediriger vers page honeypot
            // window.location.href = '/honeypot.html';
        }

        // Vérifier comportement humain
        let mouseMovements = 0;
        document.addEventListener('mousemove', function() {
            mouseMovements++;
        });

        setTimeout(function() {
            if (mouseMovements === 0) {
                // Aucun mouvement de souris = probablement un bot
                logAttempt('no-mouse-movement');
            }
        }, 5000);
    }

    function obfuscateContactInfo() {
        // Obfusquer emails
        const emails = document.querySelectorAll('[data-email]');
        emails.forEach(elem => {
            const encoded = elem.getAttribute('data-email');
            const decoded = atob(encoded); // Decode base64
            elem.textContent = decoded;
            elem.href = `mailto:${decoded}`;
        });

        // Obfusquer téléphones
        const phones = document.querySelectorAll('[data-phone]');
        phones.forEach(elem => {
            const encoded = elem.getAttribute('data-phone');
            const decoded = atob(encoded);
            elem.textContent = decoded;
            elem.href = `tel:${decoded}`;
        });
    }

    // ========================================
    // ANIMATIONS CSS
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // MESSAGE CONSOLE PERSONNALISÉ
    // ========================================
    console.clear();
    console.log('%c🛡️ RESQ+ Protection Active', 'color: #0D47A1; font-size: 24px; font-weight: bold;');
    console.log('%cCe site est protégé contre le scraping et la copie non autorisée.', 'font-size: 14px;');
    console.log('%c© 2024 RESQ+. Tous droits réservés.', 'font-size: 12px; color: #666;');
    console.log('%c\nVous cherchez à contribuer? Contactez-nous: dev@resqapps.com', 'font-size: 12px; color: #0D47A1;');

})();
