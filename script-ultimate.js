// ========================================
// RESQ+ ULTIMATE MASTERPIECE JAVASCRIPT
// Advanced Interactions & Animations
// ========================================

(function() {
    'use strict';

    // ========================================
    // 1. GLOBAL STATE & CONFIG
    // ========================================
    
    const config = {
        scrollThreshold: 100,
        animationDuration: 800,
        carouselAutoplayDelay: 5000,
        socialProofDelay: 3000,
        socialProofInterval: 10000
    };

    let state = {
        isScrolling: false,
        lastScrollTop: 0,
        currentSlide: 0,
        isDarkMode: false,
        customCursorEnabled: true
    };

    // ========================================
    // 2. UTILITY FUNCTIONS
    // ========================================

    const utils = {
        // Debounce function for performance
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function for scroll events
        throttle: (func, limit) => {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Check if element is in viewport
        isInViewport: (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Smooth scroll to element
        scrollToElement: (element, offset = 0) => {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        },

        // Random number generator
        random: (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        // Easing functions
        easing: {
            easeOutQuad: t => t * (2 - t),
            easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeOutCubic: t => (--t) * t * t + 1
        }
    };

    // ========================================
    // 3. CUSTOM CURSOR
    // ========================================

    const initCustomCursor = () => {
        if (window.innerWidth < 768) return; // Skip on mobile

        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        document.body.appendChild(cursor);
        document.body.classList.add('custom-cursor');

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor follow
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor hover effects
        const hoverables = document.querySelectorAll('a, button, .btn-magnetic');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    };

    // ========================================
    // 4. MAGNETIC BUTTONS
    // ========================================

    const initMagneticButtons = () => {
        const buttons = document.querySelectorAll('.btn-magnetic');

        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });

            // Ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    };

    // ========================================
    // 5. DARK MODE TOGGLE
    // ========================================

    const initDarkMode = () => {
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;

        // Check saved preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        state.isDarkMode = savedTheme === 'dark';

        toggle.addEventListener('click', () => {
            state.isDarkMode = !state.isDarkMode;
            const newTheme = state.isDarkMode ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    };

    // ========================================
    // 6. ANIMATED STATS COUNTER
    // ========================================

    const initStatsCounter = () => {
        const stats = document.querySelectorAll('[data-target]');
        if (stats.length === 0) return;

        const animateValue = (element, start, end, duration) => {
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const value = Math.floor(utils.easing.easeOutCubic(progress) * (end - start) + start);
                element.textContent = value.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateValue(entry.target, 0, target, 2000);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    };

    // ========================================
    // 7. SCROLL ANIMATIONS
    // ========================================

    const initScrollAnimations = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    };

    // ========================================
    // 8. NAVBAR SCROLL BEHAVIOR
    // ========================================

    const initNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScroll = 0;

        const handleScroll = utils.throttle(() => {
            const currentScroll = window.pageYOffset;

            // Add scrolled class for styling
            if (currentScroll > config.scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 500) {
                navbar.classList.add('hide');
            } else {
                navbar.classList.remove('hide');
            }

            lastScroll = currentScroll;
        }, 100);

        window.addEventListener('scroll', handleScroll);
    };

    // ========================================
    // 9. SMOOTH ANCHOR SCROLLING
    // ========================================

    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navbar = document.querySelector('.navbar');
                    const offset = navbar ? navbar.offsetHeight : 0;
                    utils.scrollToElement(target, offset);
                }
            });
        });
    };

    // ========================================
    // 10. CAROUSEL/SLIDER
    // ========================================

    const initCarousel = () => {
        const track = document.querySelector('.carousel-track');
        if (!track) return;

        const slides = track.querySelectorAll('.carousel-slide');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');

        let currentIndex = 0;

        const updateCarousel = () => {
            const slideWidth = slides[0].offsetWidth + 24; // width + gap
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
            });
        }

        // Auto-play
        let autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }, config.carouselAutoplayDelay);

        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        track.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            }, config.carouselAutoplayDelay);
        });
    };

    // ========================================
    // 11. FAQ ACCORDION
    // ========================================

    const initFAQ = () => {
        const items = document.querySelectorAll('.faq-item-ultimate');

        items.forEach(item => {
            const question = item.querySelector('.faq-question-ultimate');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all items
                items.forEach(i => i.classList.remove('active'));

                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    };

    // ========================================
    // 12. PARALLAX EFFECT
    // ========================================

    const initParallax = () => {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        const handleParallax = utils.throttle(() => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(el => {
                const speed = el.getAttribute('data-parallax') || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }, 10);

        window.addEventListener('scroll', handleParallax);
    };

    // ========================================
    // 13. PARTICLES.JS INTEGRATION
    // ========================================

    const initParticles = () => {
        if (typeof particlesJS === 'undefined') return;

        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    };

    // ========================================
    // 14. SOCIAL PROOF POPUP
    // ========================================

    const initSocialProof = () => {
        const proofData = [
            { name: 'Sarah M.', location: 'Bangkok', action: 'downloaded RESQ+', time: '2 min ago' },
            { name: 'Marc D.', location: 'Chiang Mai', action: 'joined a team', time: '5 min ago' },
            { name: 'Alex T.', location: 'Phuket', action: 'completed rescue training', time: '8 min ago' },
            { name: 'Sophie B.', location: 'Paris', action: 'downloaded RESQ+', time: '12 min ago' },
            { name: 'John K.', location: 'New York', action: 'used AI Nurse', time: '15 min ago' }
        ];

        let currentProof = 0;

        const showProof = () => {
            const proof = proofData[currentProof];
            
            const popup = document.createElement('div');
            popup.className = 'social-proof-popup';
            popup.innerHTML = `
                <div class="proof-avatar">${proof.name.charAt(0)}</div>
                <div class="proof-content">
                    <div class="proof-name">${proof.name} from ${proof.location}</div>
                    <div class="proof-action">${proof.action}</div>
                    <div class="proof-time">${proof.time}</div>
                </div>
            `;

            document.body.appendChild(popup);

            setTimeout(() => popup.remove(), 5000);

            currentProof = (currentProof + 1) % proofData.length;
        };

        // Show first popup after delay
        setTimeout(showProof, config.socialProofDelay);

        // Show subsequent popups at intervals
        setInterval(showProof, config.socialProofInterval);
    };

    // ========================================
    // 15. NEWSLETTER FORM
    // ========================================

    const initNewsletter = () => {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const input = form.querySelector('.newsletter-input');
            const email = input.value;

            // Basic validation
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }

            // Show success message (replace with actual API call)
            alert('Thank you for subscribing! 🎉');
            input.value = '';

            // TODO: Integrate with email service (Mailchimp, SendGrid, etc.)
        });
    };

    // ========================================
    // 16. LAZY LOADING IMAGES
    // ========================================

    const initLazyLoading = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src; // Trigger load
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    };

    // ========================================
    // 17. MOBILE MENU
    // ========================================

    const initMobileMenu = () => {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (!menuBtn) return;

        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    };

    // ========================================
    // 18. PERFORMANCE MONITORING
    // ========================================

    const initPerformanceMonitoring = () => {
        if ('PerformanceObserver' in window) {
            // Monitor page load metrics
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log('Performance:', entry.name, entry.duration);
                }
            });

            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    };

    // ========================================
    // 19. ACCESSIBILITY ENHANCEMENTS
    // ========================================

    const initAccessibility = () => {
        // Skip to main content
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary-blue);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        document.body.prepend(skipLink);

        // Focus visible for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    };

    // ========================================
    // 20. INITIALIZE ALL FEATURES
    // ========================================

    const init = () => {
        console.log('🚀 RESQ+ Ultimate Website Loading...');

        // Core features
        initDarkMode();
        initCustomCursor();
        initMagneticButtons();
        initNavbarScroll();
        initSmoothScroll();
        initMobileMenu();

        // Content features
        initScrollAnimations();
        initStatsCounter();
        initCarousel();
        initFAQ();
        initParallax();
        initParticles();

        // Enhancement features
        initSocialProof();
        initNewsletter();
        initLazyLoading();
        initAccessibility();
        initPerformanceMonitoring();

        console.log('✨ RESQ+ Ultimate Website Ready!');
    };

    // ========================================
    // 21. LOAD EVENT
    // ========================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Page Visibility API for performance
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when tab is not visible
            console.log('Tab hidden - pausing animations');
        } else {
            // Resume animations
            console.log('Tab visible - resuming animations');
        }
    });

})();
