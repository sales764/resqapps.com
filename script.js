// ========================================
// RESQ+ Website JavaScript
// Mobile Menu, Smooth Scrolling, Animations
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            this.setAttribute('aria-expanded', isExpanded);
            this.setAttribute('aria-label', isExpanded ? 'Close navigation menu' : 'Open navigation menu');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks) navLinks.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            
            // Reset ARIA attributes when menu closes
            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
            }
        });
    });
    
    // ========================================
    // 2. Navbar Scroll Effect
    // ========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // 3. Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // 4. Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .screenshot-card, .step, .download-card'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // ========================================
    // 5. Download Button Click Tracking
    // ========================================
    const downloadButtons = document.querySelectorAll('.btn-primary, .store-button');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add analytics tracking here if needed
            console.log('Download button clicked');
            
            // Optional: Show thank you message
            // You can customize this behavior
        });
    });
    
    // ========================================
    // 6. Feature Cards Hover Effect
    // ========================================
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ========================================
    // 7. Stats Counter Animation
    // ========================================
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Initialize stats counter with scroll detection
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let statsAnimated = false;
    
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateValue(stat, 0, target, 2000);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statNumbers[0].closest('.stats-section'));
    }
    
    // ========================================
    // 8. Copy Privacy Policy URL
    // ========================================
    const privacyLinks = document.querySelectorAll('a[href="privacy.html"]');
    
    privacyLinks.forEach(link => {
        link.addEventListener('contextmenu', function(e) {
            // Right-click functionality (optional)
            // You can add custom context menu here
        });
    });
    
    // ========================================
    // 9. Form Validation (if you add contact form)
    // ========================================
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        // Skip forms that handle their own submission
        if (form.classList.contains('stellar-notify-form') || 
            form.classList.contains('stellar-story-form') ||
            form.id === 'newsletterForm') {
            return;
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form submission logic here
            console.log('Form submitted');
            
            // Example: Show success message
            alert('Thank you for your message! We will get back to you soon.');
        });
    });
    
    // ========================================
    // 10. Lazy Loading for Images
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========================================
    // 11. Cookie Consent (Optional)
    // ========================================
    function showCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');
        
        if (!consent) {
            // Create and show cookie banner
            // You can customize this as needed
            console.log('Cookie consent not given');
        }
    }
    
    // showCookieConsent();
    
    // ========================================
    // 12. Performance: Preload Important Resources
    // ========================================
    function preloadResources() {
        // Preload critical resources for better performance
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        // Add your critical images here
        // link.href = 'path-to-important-image.jpg';
        // document.head.appendChild(link);
    }
    
    preloadResources();
    
    // ========================================
    // 13. Dark Mode Toggle (Optional)
    // ========================================
    function initDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        
        if (darkModeToggle) {
            const currentTheme = localStorage.getItem('theme');
            
            if (currentTheme === 'dark') {
                document.body.classList.add('dark-mode');
            }
            
            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                
                const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
                localStorage.setItem('theme', theme);
            });
        }
    }
    
    // initDarkMode();
    
    // ========================================
    // 14. Back to Top Button
    // ========================================
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1565C0 0%, #0D47A1 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'scale(1)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'scale(0.8)';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // ========================================
    // 15. Newsletter Form Handling
    // ========================================
    const newsletterForm = document.querySelector('.coming-soon-content form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email || !emailRegex.test(email)) {
                alert('⚠️ Please enter a valid email address');
                emailInput.focus();
                return;
            }
            
            // Store email in localStorage
            const subscribers = JSON.parse(localStorage.getItem('resq_subscribers') || '[]');
            
            if (subscribers.includes(email)) {
                alert('✅ You\'re already subscribed! We\'ll notify you at launch.');
                emailInput.value = '';
                return;
            }
            
            subscribers.push(email);
            localStorage.setItem('resq_subscribers', JSON.stringify(subscribers));
            
            // Success feedback
            submitBtn.textContent = '✅ Subscribed!';
            submitBtn.style.background = '#00C853';
            emailInput.value = '';
            
            setTimeout(() => {
                submitBtn.textContent = 'Notify Me';
                submitBtn.style.background = 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)';
            }, 3000);
            
            // Track event
            trackEvent('Newsletter', 'Subscribe', email);
            
            // Show success message
            alert('🎉 Thank you! We\'ll notify you when RESQ+ launches on Google Play!');
        });
    }
    
    // ========================================
    // 16. Share Story Modal & Form
    // ========================================
    const shareStoryBtn = document.getElementById('shareStoryBtn');
    const storyModal = document.getElementById('storyModal');
    const closeModal = document.getElementById('closeModal');
    const storyForm = document.getElementById('storyForm');
    const uploadArea = document.getElementById('uploadArea');
    const mediaInput = document.getElementById('mediaInput');
    const fileName = document.getElementById('fileName');
    const charCount = document.getElementById('charCount');
    const storyTextarea = document.querySelector('textarea[name="story"]');
    
    // Open modal
    if (shareStoryBtn) {
        shareStoryBtn.addEventListener('click', function() {
            storyModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            storyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === storyModal) {
            storyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Upload area click
    if (uploadArea) {
        uploadArea.addEventListener('click', function() {
            mediaInput.click();
        });
    }
    
    // File selection
    if (mediaInput) {
        mediaInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Check file size (10MB max)
                if (file.size > 10 * 1024 * 1024) {
                    alert('⚠️ File too large! Maximum size is 10MB');
                    mediaInput.value = '';
                    return;
                }
                
                const fileType = file.type.startsWith('image/') ? '📷' : '🎬';
                fileName.textContent = `${fileType} ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`;
            }
        });
    }
    
    // Character counter
    if (storyTextarea) {
        storyTextarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }
    
    // Form submission
    if (storyForm) {
        storyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Store in localStorage for now (in production, send to server)
            const story = {
                name: formData.get('name'),
                type: formData.get('storyType'),
                story: formData.get('story'),
                socialLink: formData.get('socialLink'),
                email: formData.get('email'),
                timestamp: new Date().toISOString(),
                status: 'pending'
            };
            
            // Get existing stories
            const stories = JSON.parse(localStorage.getItem('resq_stories') || '[]');
            stories.push(story);
            localStorage.setItem('resq_stories', JSON.stringify(stories));
            
            // Success message
            alert('🎉 Thank you for sharing your story!\n\nYour submission has been received and will be reviewed by our team.\n\nIf featured, we\'ll notify you by email and include your social media link for maximum visibility!\n\n✓ Email confirmation sent\n✓ Story under review\n✓ You\'ll gain visibility when published');
            
            // Track event
            trackEvent('Story', 'Submit', story.type);
            
            // Reset form and close modal
            storyForm.reset();
            fileName.textContent = '';
            charCount.textContent = '0';
            storyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // In production, send to server via API
            // sendStoryToServer(formData);
        });
    }
    
    // ========================================
    // 17. Scroll Reveal Animations - DISABLED
    // ========================================
    // Temporarily disabled - causing visibility issues
    // Will be re-enabled after fixing
    
    /* COMMENTED OUT
    const scrollRevealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, scrollRevealOptions);
    
    // Observe all scroll reveal elements
    const revealElements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-up, .scroll-reveal-left, ' +
        '.scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-stagger'
    );
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Add scroll reveal classes to sections
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('scroll-reveal-up');
    });
    
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.classList.add('scroll-reveal-stagger');
    });
    
    document.querySelectorAll('.use-case-card').forEach(card => {
        card.classList.add('scroll-reveal-scale');
    });
    
    document.querySelectorAll('.story-card').forEach(card => {
        card.classList.add('scroll-reveal-up');
    });
    */
    
    // ========================================
    // 18. Scroll Progress Bar
    // ========================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // ========================================
    // 19. Enhanced Button Ripple Effect
    // ========================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // ========================================
    // 20. Smooth Image Loading
    // ========================================
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in-up');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // 21. Enhanced Mobile UX
    // ========================================
    
    // Touch swipe for screenshots
    let touchStartX = 0;
    let touchEndX = 0;
    
    const screenshotsSlider = document.querySelector('.screenshots-slider');
    if (screenshotsSlider) {
        screenshotsSlider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        screenshotsSlider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left
                screenshotsSlider.scrollBy({ left: 300, behavior: 'smooth' });
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right
                screenshotsSlider.scrollBy({ left: -300, behavior: 'smooth' });
            }
        }
    }
    
    // Prevent body scroll when modal is open
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'style') {
                    if (modal.style.display === 'block') {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = 'auto';
                    }
                }
            });
        });
        
        observer.observe(modal, { attributes: true });
    });
    
    // ========================================
    // 22. Performance Optimizations
    // ========================================
    
    // Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll events
    const optimizedScroll = debounce(function() {
        // Any scroll-based updates
    }, 10);
    
    window.addEventListener('scroll', optimizedScroll);
    
    // Lazy load background images
    const bgElements = document.querySelectorAll('[data-bg]');
    const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.backgroundImage = `url(${el.dataset.bg})`;
                bgObserver.unobserve(el);
            }
        });
    });
    
    bgElements.forEach(el => bgObserver.observe(el));
    
    // ========================================
    // 23. Enhanced Form UX
    // ========================================
    
    // Auto-resize textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
    
    // Add floating label effect
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="url"], textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // ========================================
    // 24. Initialize All Functions
    // ========================================
    console.log('🏥 RESQ+ Website Loaded Successfully!');
    console.log('✨ All UI/UX enhancements active!');
});

// ========================================
// 16. Service Worker Registration (PWA)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ========================================
// 17. Analytics Integration (Optional)
// ========================================
function trackEvent(category, action, label) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Example usage:
// trackEvent('Button', 'Click', 'Download Button');

// ========================================
// 18. Scroll Progress Bar
// ========================================
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});
