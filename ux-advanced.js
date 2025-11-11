/* ============================================
   RESQ+ ADVANCED UX/UI JAVASCRIPT
   World-class interactions
   ============================================ */

// ========================================
// 1. TOAST NOTIFICATION SYSTEM
// ========================================
class ToastNotification {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
        
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <div class="toast-content">
                <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">×</button>
            <div class="toast-progress"></div>
        `;

        this.container.appendChild(toast);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.remove(toast);
        });

        // Auto remove
        setTimeout(() => {
            this.remove(toast);
        }, duration);

        return toast;
    }

    remove(toast) {
        toast.classList.add('removing');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

const toast = new ToastNotification();

// ========================================
// 2. SCROLL TO TOP BUTTON (DISABLED)
// ========================================
function initScrollToTop() {
    // DISABLED - User requested no scroll-to-top button
    return;
}

// ========================================
// 3. SECTION NAVIGATION DOTS
// ========================================
function initSectionNav() {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const nav = document.createElement('div');
    nav.className = 'section-nav';

    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'section-nav-dot';
        dot.dataset.section = section.id.charAt(0).toUpperCase() + section.id.slice(1);
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        nav.appendChild(dot);
    });

    document.body.appendChild(nav);

    // Update active dot on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                document.querySelectorAll('.section-nav-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
}

// ========================================
// 4. MAGNETIC BUTTONS
// ========================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .stellar-btn');
    
    buttons.forEach(button => {
        button.classList.add('magnetic-btn');
        
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// ========================================
// 5. ADVANCED RIPPLE EFFECT
// ========================================
function initRippleEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .stellar-btn');
    
    buttons.forEach(button => {
        button.classList.add('ripple-effect');
        
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
            
            this.classList.remove('rippling');
            setTimeout(() => {
                this.classList.add('rippling');
            }, 0);
            
            setTimeout(() => {
                this.classList.remove('rippling');
            }, 600);
        });
    });
}

// ========================================
// 6. FORM VALIDATION
// ========================================
function initFormValidation() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        const formGroup = input.closest('.form-group') || createFormGroup(input);
        
        input.addEventListener('blur', () => {
            validateEmail(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateEmail(input);
            }
        });
    });
}

function createFormGroup(input) {
    const wrapper = document.createElement('div');
    wrapper.className = 'form-group';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = 'Please enter a valid email address';
    wrapper.appendChild(error);
    
    const success = document.createElement('div');
    success.className = 'form-success';
    success.textContent = '✓ Valid email';
    wrapper.appendChild(success);
    
    return wrapper;
}

function validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        input.classList.remove('valid', 'invalid');
        return false;
    }
    
    if (emailRegex.test(email)) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        return true;
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        return false;
    }
}

// ========================================
// 7. LOADING BUTTON STATES
// ========================================
function showButtonLoading(button) {
    button.dataset.originalText = button.textContent;
    button.classList.add('btn-loading');
    button.disabled = true;
}

function hideButtonLoading(button) {
    button.classList.remove('btn-loading');
    button.disabled = false;
    if (button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
    }
}

// ========================================
// 8. EXIT INTENT POPUP
// ========================================
function initExitIntent() {
    // Only show once per session
    if (sessionStorage.getItem('exit-intent-shown')) return;
    
    let mouseY = 0;
    let isShown = false;
    
    document.addEventListener('mouseleave', (e) => {
        mouseY = e.clientY;
        
        if (mouseY < 10 && !isShown && !sessionStorage.getItem('exit-intent-shown')) {
            showExitIntent();
            isShown = true;
        }
    });
}

function showExitIntent() {
    // Get translations for current language
    const lang = i18n && i18n.t[i18n.currentLang] ? i18n.t[i18n.currentLang] : i18n.t['en'];
    
    const popup = document.createElement('div');
    popup.className = 'exit-intent-popup';
    popup.innerHTML = `
        <div class="exit-intent-content">
            <button class="exit-intent-close">×</button>
            <div style="font-size: 48px; margin-bottom: 16px;">⏰</div>
            <h2 style="font-size: 28px; margin-bottom: 12px;" data-i18n-exit="title">${lang.exit_title}</h2>
            <p style="margin-bottom: 24px; font-size: 16px; opacity: 0.95;" data-i18n-exit="desc">
                ${lang.exit_desc}
            </p>
            <input type="email" placeholder="${lang.exit_placeholder}" class="form-input" style="margin-bottom: 16px; text-align: center;" data-i18n-exit-placeholder="placeholder">
            <button class="stellar-btn" style="width: 100%; justify-content: center;" data-i18n-exit="button">
                ${lang.exit_button}
            </button>
            <p style="font-size: 12px; margin-top: 16px; opacity: 0.8;" data-i18n-exit="footer">
                ${lang.exit_footer}
            </p>
        </div>
    `;
    
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('active'), 10);
    
    popup.querySelector('.exit-intent-close').addEventListener('click', closeExitIntent);
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closeExitIntent();
    });
    
    const submitBtn = popup.querySelector('.stellar-btn');
    submitBtn.addEventListener('click', () => {
        const email = popup.querySelector('input[type="email"]').value;
        if (email && validateEmail(popup.querySelector('input[type="email"]'))) {
            showButtonLoading(submitBtn);
            setTimeout(() => {
                hideButtonLoading(submitBtn);
                toast.success('🎉 You\'re on the list! We\'ll notify you at launch.', 4000);
                closeExitIntent();
            }, 1500);
        } else {
            toast.error('Please enter a valid email address', 3000);
        }
    });
    
    sessionStorage.setItem('exit-intent-shown', 'true');
}

function closeExitIntent() {
    const popup = document.querySelector('.exit-intent-popup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => popup.remove(), 300);
    }
}

// ========================================
// 9. KEYBOARD SHORTCUTS (MINIMAL)
// ========================================
function initKeyboardShortcuts() {
    // Only keep essential keyboard shortcuts, no visible hints
    document.addEventListener('keydown', (e) => {
        // Escape key - close modals
        if (e.key === 'Escape') {
            closeExitIntent();
            const modal = document.getElementById('storyModal');
            if (modal && modal.style.display !== 'none') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// ========================================
// 10. SMOOTH SCROLL INDICATOR (Hero)
// ========================================
function initScrollIndicator() {
    const hero = document.querySelector('.hero, .stellar-hero');
    if (!hero) return;
    
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.setAttribute('aria-label', 'Scroll down');
    hero.style.position = 'relative';
    hero.appendChild(indicator);
    
    indicator.addEventListener('click', () => {
        const nextSection = hero.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            indicator.style.opacity = '0';
        } else {
            indicator.style.opacity = '1';
        }
    });
}

// ========================================
// 11. ENHANCED NEWSLETTER FORM
// ========================================
function enhanceNewsletterForm() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Skip Stellar forms - they handle their own submission to Formspree
        if (form.classList.contains('stellar-notify-form') || 
            form.classList.contains('stellar-story-form')) {
            return;
        }
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const emailInput = form.querySelector('input[type="email"]');
            
            if (!validateEmail(emailInput)) {
                toast.error('Please enter a valid email address', 3000);
                return;
            }
            
            showButtonLoading(submitBtn);
            
            // Simulate API call
            setTimeout(() => {
                hideButtonLoading(submitBtn);
                toast.success('🎉 Success! You\'re on our launch list!', 4000);
                emailInput.value = '';
                emailInput.classList.remove('valid');
            }, 1500);
        });
    });
}

// ========================================
// 12. PERFORMANCE: LAZY LOAD IMAGES
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ========================================
// 13. SECTION REVEAL ANIMATIONS
// ========================================
function initSectionReveals() {
    const sections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(section);
    });
}

// ========================================
// 14. CURSOR EFFECT (Optional - Desktop only)
// ========================================
function initCursorEffect() {
    if (window.innerWidth < 768) return; // Mobile skip
    
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(79, 172, 254, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'rgba(255, 59, 59, 0.8)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'rgba(79, 172, 254, 0.6)';
        });
    });
}

// ========================================
// INITIALIZE ALL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 RESQ+ Advanced UX initialized');
    
    // Core UX
    initScrollToTop();
    initSectionNav();
    initMagneticButtons();
    initRippleEffects();
    initFormValidation();
    initKeyboardShortcuts();
    initScrollIndicator();
    
    // Enhanced features
    enhanceNewsletterForm();
    initLazyLoading();
    initSectionReveals();
    
    // Delayed features
    // setTimeout(() => {
    //     initExitIntent();
    // }, 5000); // DISABLED - Using newsletter-popup.js instead to avoid duplicate popups
    
    // Optional: cursor effect (can be disabled)
    // initCursorEffect();
    
    // No welcome message - keep it professional
});

// Export for external use
window.RESQ = {
    toast,
    showButtonLoading,
    hideButtonLoading,
    validateEmail
};
