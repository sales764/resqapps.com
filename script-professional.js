// ============================================
// RESQ+ PROFESSIONAL WEBSITE JAVASCRIPT
// Interactive Features & Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initFeatureTabs();
    initScrollAnimations();
    initStatsCounter();
    initSmoothScroll();
    initMobileMenu();
});

// Navigation Scroll Effect
function initNavigation() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Feature Tabs Switching
function initFeatureTabs() {
    const tabs = document.querySelectorAll('.feature-tab');
    const contents = document.querySelectorAll('.feature-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const feature = this.dataset.feature;
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content
            contents.forEach(c => c.classList.remove('active'));
            
            // Show selected content
            const targetContent = document.getElementById(`feature-${feature}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Scroll Animations (Fade In on Scroll)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in effect
    const animatedElements = document.querySelectorAll('.comparison-card, .stat-card, .cta-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Animated Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let countersStarted = false;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                animateCounters();
            }
        });
    }, observerOptions);
    
    if (statNumbers.length > 0) {
        observer.observe(statNumbers[0].parentElement.parentElement);
    }
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty anchors
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// Download Button Tracking (Optional: Connect to Google Analytics)
function trackDownload(source) {
    console.log(`Download initiated from: ${source}`);
    // Add Google Analytics tracking here if needed
    // gtag('event', 'download_click', { 'source': source });
}

// Add tracking to download buttons
document.querySelectorAll('a[href*="play.google.com"]').forEach(btn => {
    btn.addEventListener('click', function() {
        trackDownload(this.closest('section')?.className || 'unknown');
    });
});
