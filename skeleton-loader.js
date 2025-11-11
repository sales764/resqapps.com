// ========================================
// SKELETON LOADER UTILITY
// Item 53/78: Content loading management
// ========================================

(function() {
    'use strict';

    /**
     * Shows skeleton loading state
     * @param {string|HTMLElement} container - Container selector or element
     * @param {string} [type='default'] - Skeleton type (card, list, hero, etc.)
     */
    function show(container, type = 'default') {
        const element = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        
        if (!element) return;

        // Add loading class
        element.classList.add('loading-container', 'is-loading');
        
        // Generate skeleton based on type
        const skeleton = generateSkeleton(type);
        element.insertAdjacentHTML('afterbegin', skeleton);
    }

    /**
     * Hides skeleton and shows real content
     * @param {string|HTMLElement} container - Container selector or element
     */
    function hide(container) {
        const element = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        
        if (!element) return;

        // Remove loading class
        element.classList.remove('is-loading');
        
        // Remove skeleton elements
        const skeletons = element.querySelectorAll('.skeleton, .skeleton-grid, .skeleton-hero, .skeleton-card, .skeleton-list');
        skeletons.forEach(skeleton => skeleton.remove());
        
        // Add loaded animation to real content
        setTimeout(() => {
            element.querySelectorAll(':scope > *').forEach(child => {
                child.classList.add('loaded');
            });
        }, 50);
    }

    /**
     * Generates skeleton HTML based on type
     * @param {string} type - Skeleton type
     * @returns {string} Skeleton HTML
     */
    function generateSkeleton(type) {
        const templates = {
            // Feature cards grid
            cards: `
                <div class="skeleton-grid">
                    ${Array(6).fill('').map(() => `
                        <div class="skeleton-card">
                            <div class="skeleton-icon"></div>
                            <div class="skeleton-heading"></div>
                            <div class="skeleton-text"></div>
                            <div class="skeleton-text skeleton-text-short"></div>
                        </div>
                    `).join('')}
                </div>
            `,
            
            // Use case cards
            usecases: `
                <div class="skeleton-grid">
                    ${Array(4).fill('').map(() => `
                        <div class="skeleton-use-case">
                            <div class="skeleton-use-case-icon skeleton"></div>
                            <div class="skeleton-heading"></div>
                            <div class="skeleton-text"></div>
                            <div class="skeleton-text"></div>
                            <div class="skeleton-text skeleton-text-medium"></div>
                        </div>
                    `).join('')}
                </div>
            `,
            
            // Testimonials
            testimonials: `
                <div class="skeleton-grid">
                    ${Array(3).fill('').map(() => `
                        <div class="skeleton-testimonial">
                            <div class="skeleton-testimonial-header">
                                <div class="skeleton-avatar skeleton"></div>
                                <div style="flex: 1;">
                                    <div class="skeleton-text skeleton-text-short"></div>
                                    <div class="skeleton-text skeleton-text-short"></div>
                                </div>
                            </div>
                            <div class="skeleton-text"></div>
                            <div class="skeleton-text"></div>
                            <div class="skeleton-text skeleton-text-medium"></div>
                        </div>
                    `).join('')}
                </div>
            `,
            
            // Hero section
            hero: `
                <div class="skeleton-hero">
                    <div class="skeleton-hero-content">
                        <div class="skeleton-badge"></div>
                        <div class="skeleton-heading-large skeleton"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text skeleton-text-medium"></div>
                        <div style="display: flex; gap: 16px; margin-top: 20px;">
                            <div class="skeleton-button skeleton"></div>
                            <div class="skeleton-button skeleton"></div>
                        </div>
                    </div>
                    <div class="skeleton-phone skeleton"></div>
                </div>
            `,
            
            // List items
            list: `
                <div class="skeleton-list">
                    ${Array(5).fill('').map(() => `
                        <div class="skeleton-list-item">
                            <div class="skeleton-avatar skeleton"></div>
                            <div style="flex: 1;">
                                <div class="skeleton-text skeleton-text-short"></div>
                                <div class="skeleton-text skeleton-text-medium"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `,
            
            // Stats section
            stats: `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 24px;">
                    ${Array(4).fill('').map(() => `
                        <div class="skeleton-stat">
                            <div class="skeleton-stat-number skeleton"></div>
                            <div class="skeleton-stat-label skeleton"></div>
                        </div>
                    `).join('')}
                </div>
            `,
            
            // Default simple skeleton
            default: `
                <div class="skeleton" style="height: 200px; width: 100%;"></div>
            `
        };

        return templates[type] || templates.default;
    }

    /**
     * Simulates loading with automatic hide after duration
     * @param {string|HTMLElement} container - Container selector or element
     * @param {Object} options - Loading options
     * @param {string} [options.type='default'] - Skeleton type
     * @param {number} [options.duration=2000] - Loading duration in ms
     * @param {Function} [options.onComplete] - Callback when loading completes
     */
    function simulate(container, options = {}) {
        const {
            type = 'default',
            duration = 2000,
            onComplete
        } = options;

        show(container, type);

        setTimeout(() => {
            hide(container);
            if (onComplete) onComplete();
        }, duration);
    }

    /**
     * Shows skeleton while async function executes
     * @param {string|HTMLElement} container - Container selector or element
     * @param {Function} asyncFn - Async function to execute
     * @param {string} [type='default'] - Skeleton type
     * @returns {Promise} Promise that resolves when async function completes
     */
    async function whileLoading(container, asyncFn, type = 'default') {
        show(container, type);
        
        try {
            const result = await asyncFn();
            hide(container);
            return result;
        } catch (error) {
            hide(container);
            throw error;
        }
    }

    // Public API
    window.SkeletonLoader = {
        show,
        hide,
        simulate,
        whileLoading,
        generateSkeleton
    };

})();

/* 
USAGE EXAMPLES:

// Show skeleton
SkeletonLoader.show('#features', 'cards');

// Hide skeleton
SkeletonLoader.hide('#features');

// Simulate loading
SkeletonLoader.simulate('#features', {
    type: 'cards',
    duration: 2000,
    onComplete: () => console.log('Loaded!')
});

// Show skeleton while fetching data
SkeletonLoader.whileLoading('#features', async () => {
    const data = await fetch('/api/features');
    return data.json();
}, 'cards').then(data => {
    // Render data
});

// Manual skeleton HTML
const html = SkeletonLoader.generateSkeleton('hero');
document.getElementById('hero').innerHTML = html;
*/
