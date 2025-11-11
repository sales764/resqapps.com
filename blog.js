// ========================================
// BLOG FUNCTIONALITY
// Item 75/78: Blog section for content marketing
// ========================================

(function() {
    'use strict';

    let currentCategory = 'all';
    let allPosts = [];

    /**
     * Initialize blog
     */
    function init() {
        console.log('[Blog] Initializing...');
        
        // Load posts
        loadPosts();
        
        // Setup category filters
        setupCategoryFilters();
        
        // Setup newsletter form
        setupNewsletterForm();
    }

    /**
     * Load blog posts
     */
    function loadPosts() {
        // Check if blog data exists
        if (typeof window.blogPosts === 'undefined') {
            console.error('[Blog] Blog data not found');
            showEmpty();
            return;
        }
        
        allPosts = window.blogPosts;
        console.log('[Blog] Loaded', allPosts.length, 'posts');
        
        // Display posts
        displayPosts(allPosts);
    }

    /**
     * Display posts
     */
    function displayPosts(posts) {
        const grid = document.getElementById('blog-grid');
        const loading = document.getElementById('blog-loading');
        const empty = document.getElementById('blog-empty');
        
        if (!grid) return;
        
        // Hide loading
        if (loading) loading.style.display = 'none';
        
        // Clear grid
        grid.innerHTML = '';
        
        if (posts.length === 0) {
            if (empty) empty.style.display = 'block';
            return;
        }
        
        if (empty) empty.style.display = 'none';
        
        // Create post cards
        posts.forEach(post => {
            const card = createPostCard(post);
            grid.appendChild(card);
        });
        
        // Animate in
        setTimeout(() => {
            grid.querySelectorAll('.blog-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 100);
            });
        }, 50);
    }

    /**
     * Create post card
     */
    function createPostCard(post) {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.setAttribute('data-category', post.category);
        
        // Format date
        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Reading time
        const readingTime = calculateReadingTime(post.content || post.excerpt);
        
        card.innerHTML = `
            ${post.image ? `
                <div class="blog-card-image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                    <span class="blog-card-category">${getCategoryEmoji(post.category)} ${getCategoryName(post.category)}</span>
                </div>
            ` : ''}
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span class="blog-card-date">📅 ${formattedDate}</span>
                    <span class="blog-card-reading-time">⏱️ ${readingTime} min read</span>
                </div>
                <h2 class="blog-card-title">${post.title}</h2>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-footer">
                    ${post.author ? `
                        <div class="blog-card-author">
                            ${post.authorAvatar ? `<img src="${post.authorAvatar}" alt="${post.author}">` : ''}
                            <span>${post.author}</span>
                        </div>
                    ` : ''}
                    <a href="${post.url}" class="blog-card-link">
                        Read More →
                    </a>
                </div>
            </div>
        `;
        
        // Click to navigate
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.blog-card-link')) {
                window.location.href = post.url;
            }
        });
        
        return card;
    }

    /**
     * Calculate reading time
     */
    function calculateReadingTime(text) {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    }

    /**
     * Get category emoji
     */
    function getCategoryEmoji(category) {
        const emojis = {
            'safety-tips': '🛡️',
            'emergency-guides': '🚨',
            'news': '📢',
            'case-studies': '📋',
            'technology': '💻',
            'all': '📰'
        };
        return emojis[category] || '📄';
    }

    /**
     * Get category name
     */
    function getCategoryName(category) {
        const names = {
            'safety-tips': 'Safety Tips',
            'emergency-guides': 'Emergency Guides',
            'news': 'News',
            'case-studies': 'Case Studies',
            'technology': 'Technology'
        };
        return names[category] || category;
    }

    /**
     * Setup category filters
     */
    function setupCategoryFilters() {
        const pills = document.querySelectorAll('.category-pill');
        
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                const category = pill.getAttribute('data-category');
                filterByCategory(category);
                
                // Update active state
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
        });
    }

    /**
     * Filter by category
     */
    function filterByCategory(category) {
        currentCategory = category;
        
        let filteredPosts = allPosts;
        
        if (category !== 'all') {
            filteredPosts = allPosts.filter(post => post.category === category);
        }
        
        displayPosts(filteredPosts);
        
        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'blog_category_filter', {
                'event_category': 'Blog',
                'event_label': category
            });
        }
    }

    /**
     * Setup newsletter form
     */
    function setupNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            
            // Here you would typically send to your backend
            console.log('[Blog] Newsletter signup:', email);
            
            // Show success message
            showNewsletterSuccess(form);
            
            // Track in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    'event_category': 'Blog',
                    'event_label': 'Blog Page'
                });
            }
        });
    }

    /**
     * Show newsletter success
     */
    function showNewsletterSuccess(form) {
        const originalHTML = form.innerHTML;
        
        form.innerHTML = `
            <div class="newsletter-success">
                <span class="success-icon">✅</span>
                <span>Thanks for subscribing!</span>
            </div>
        `;
        
        setTimeout(() => {
            form.innerHTML = originalHTML;
            setupNewsletterForm();
        }, 3000);
    }

    /**
     * Show empty state
     */
    function showEmpty() {
        const loading = document.getElementById('blog-loading');
        const empty = document.getElementById('blog-empty');
        
        if (loading) loading.style.display = 'none';
        if (empty) empty.style.display = 'block';
    }

    // Public API
    window.Blog = {
        filter: filterByCategory,
        refresh: loadPosts
    };

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
