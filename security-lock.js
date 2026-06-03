/**
 * RESQ+ SECURITY LOCK
 * Advanced Client-Side Data Loss Prevention (DLP)
 */
(function() {
    'use strict';

    // ==========================================
    // DEVELOPER MODE TOGGLE
    // Set to 'true' to disable all protections while editing the site.
    // MUST BE 'false' in production!
    // ==========================================
    const IS_DEV_MODE = true;

    if (IS_DEV_MODE) {
        console.warn('🛡️ RESQ+ Security Lock is currently DISABLED (Developer Mode Active).');
        return;
    }

    // ==========================================
    // 1. FOCUS TRAP (Anti-Snipping Tool / Screen Record)
    // ==========================================
    const createFocusTrap = () => {
        const overlay = document.createElement('div');
        overlay.id = 'resq-security-trap';
        
                overlay.style.cssText = `
            position: fixed !important;
            top: 0 !important; 
            left: 0 !important; 
            width: 100vw !important; 
            height: 100vh !important;
            background: #000000 !important;
            z-index: 2147483647 !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            opacity: 0;
            pointer-events: none !important;
            transition: opacity 0.01s ease-out !important;
        `;

        
        const lockIcon = document.createElement('div');
        lockIcon.innerHTML = `
            <div style="text-align: center; color: rgba(255,255,255,0.5);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 16px;">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <p style="font-family: sans-serif; margin: 0; letter-spacing: 1px;">CONTENT PROTECTED</p>
            </div>
        `;
        overlay.appendChild(lockIcon);
        
        // Append to HTML instead of body to ensure it covers absolutely everything
        document.documentElement.appendChild(overlay);

        // Smart Blur Logic
        window.addEventListener('blur', () => {
            // Check if the user is interacting with an input, dropdown, or iframe
            const active = document.activeElement;
            const isInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT' || active.tagName === 'IFRAME');
            
            // If they are just filling a form, don't blur
            if (isInput) return;

            // Otherwise, massive blur (Screen clipping tool activated)
            overlay.style.pointerEvents = 'all';
            overlay.style.opacity = '1';
        });

        window.addEventListener('focus', () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.pointerEvents = 'none';
            }, 150); // Wait for transition
        });
    };

    // ==========================================
    // 2. PRINTSCREEN INTERCEPTION
    // ==========================================
    const initPrintScreenBlocker = () => {
        window.addEventListener('keyup', async (e) => {
            if (e.key === 'PrintScreen') {
                try {
                    // Attempt to overwrite clipboard immediately
                    await navigator.clipboard.writeText('Content protected by RESQ+ Security.');
                    showSecurityToast('Screenshots are disabled.');
                } catch (err) {
                    // Fallback if clipboard API is blocked
                    showSecurityToast('Screenshots are disabled.');
                }
            }
        });
    };

    // ==========================================
    // 3. DEVTOOLS & SHORTCUTS BLOCKER
    // ==========================================
    const initDevToolsBlocker = () => {
        window.addEventListener('keydown', (e) => {
            // F12
            if (e.key === 'F12') {
                e.preventDefault();
                showSecurityToast('Developer tools are disabled.');
                return false;
            }

            // Ctrl/Cmd + Shift + I / J / C (DevTools)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) {
                e.preventDefault();
                showSecurityToast('Inspection is disabled.');
                return false;
            }

            // Ctrl/Cmd + U (Source)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
                e.preventDefault();
                showSecurityToast('View source is disabled.');
                return false;
            }

            // Ctrl/Cmd + P (Print fallback block)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'P' || e.key === 'p')) {
                e.preventDefault();
                showSecurityToast('Printing is disabled.');
                return false;
            }
        }, { capture: true }); // Use capture phase to intercept early
    };

    // ==========================================
    // 4. PRINT SECURITY (CSS)
    // ==========================================
    const injectPrintSecurity = () => {
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                html, body {
                    display: none !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                }
                * {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // ==========================================
    // HELPER: SECURE TOAST NOTIFICATION
    // ==========================================
    const showSecurityToast = (msg) => {
        const toast = document.createElement('div');
        toast.innerHTML = `<span>🛡️</span> ${msg}`;
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #1e293b;
            border: 1px solid #334155;
            color: #f8fafc;
            padding: 12px 24px;
            border-radius: 8px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 14px;
            font-weight: 600;
            z-index: 2147483647;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            gap: 10px;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.documentElement.appendChild(toast);

        // Animate In
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
            toast.style.opacity = '1';
        }, 10);

        // Animate Out & Remove
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Initialize all protections
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createFocusTrap();
            initPrintScreenBlocker();
            initDevToolsBlocker();
            injectPrintSecurity();
        });
    } else {
        createFocusTrap();
        initPrintScreenBlocker();
        initDevToolsBlocker();
        injectPrintSecurity();
    }

})();
