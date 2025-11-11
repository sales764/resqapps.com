// ========================================
// SEARCH FUNCTIONALITY
// Item 74/78: Search bar for content-heavy pages
// ========================================

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        minChars: 2,
        debounceDelay: 300,
        maxResults: 10,
        highlightMatches: true,
        storageKey: 'recent_searches'
    };

    let searchIndex = [];
    let recentSearches = [];
    let debounceTimer = null;

    /**
     * Initialize search
     */
    function init() {
        buildSearchIndex();
        loadRecentSearches();
        createSearchUI();
        setupEventListeners();
        console.log('[Search] Initialized with', searchIndex.length, 'items');
    }

    /**
     * Build search index
     */
    function buildSearchIndex() {
        const elements = document.querySelectorAll('main, article, .faq-item, section');
        
        elements.forEach((element, index) => {
            const text = element.textContent.replace(/\s+/g, ' ').trim();
            if (text.length > 0) {
                const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
                const title = heading ? heading.textContent.trim() : 'Content';
                const section = element.closest('[id]')?.id || '';
                const url = section ? `#${section}` : window.location.pathname;
                
                searchIndex.push({
                    id: `item-${index}`,
                    text: text,
                    element: element,
                    title: title,
                    url: url,
                    section: section
                });
            }
        });
    }

    /**
     * Create search UI
     */
    function createSearchUI() {
        if (document.querySelector('.search-container')) return;
        
        const container = document.createElement('div');
        container.className = 'search-container';
        container.innerHTML = `
            <div class="search-wrapper">
                <div class="search-input-wrapper">
                    <span class="search-icon">🔍</span>
                    <input type="search" class="search-input" placeholder="Search..." aria-label="Search">
                    <button class="search-clear" aria-label="Clear">×</button>
                </div>
                <div class="search-results">
                    <div class="search-results-header">
                        <span class="results-count">0 results</span>
                        <button class="results-close">×</button>
                    </div>
                    <div class="search-results-list"></div>
                </div>
            </div>
        `;
        
        const header = document.querySelector('header');
        if (header) {
            header.after(container);
        } else {
            document.body.insertBefore(container, document.body.firstChild);
        }
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        const input = document.querySelector('.search-input');
        const clear = document.querySelector('.search-clear');
        const close = document.querySelector('.results-close');
        
        if (input) {
            input.addEventListener('input', (e) => handleInput(e.target.value));
            input.addEventListener('focus', () => showResults());
        }
        
        if (clear) {
            clear.addEventListener('click', () => {
                input.value = '';
                hideResults();
            });
        }
        
        if (close) {
            close.addEventListener('click', () => hideResults());
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') hideResults();
        });
    }

    /**
     * Handle input
     */
    function handleInput(query) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => performSearch(query), CONFIG.debounceDelay);
    }

    /**
     * Perform search
     */
    function performSearch(query) {
        query = query.trim();
        
        if (query.length < CONFIG.minChars) {
            showRecentSearches();
            return;
        }
        
        const results = searchInIndex(query);
        displayResults(results, query);
        addRecentSearch(query);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'search', {
                'search_term': query,
                'results_count': results.length
            });
        }
    }

    /**
     * Search in index
     */
    function searchInIndex(query) {
        const queryLower = query.toLowerCase();
        const results = [];
        
        searchIndex.forEach(item => {
            const textLower = item.text.toLowerCase();
            const titleLower = item.title.toLowerCase();
            
            let score = 0;
            if (titleLower.includes(queryLower)) score += 100;
            if (textLower.includes(queryLower)) score += 50;
            
            if (score > 0) {
                results.push({
                    ...item,
                    score: score,
                    excerpt: getExcerpt(item.text, queryLower)
                });
            }
        });
        
        results.sort((a, b) => b.score - a.score);
        return results.slice(0, CONFIG.maxResults);
    }

    /**
     * Get excerpt
     */
    function getExcerpt(text, query) {
        const position = text.toLowerCase().indexOf(query);
        if (position === -1) return text.substring(0, 150) + '...';
        
        const start = Math.max(0, position - 50);
        const end = Math.min(text.length, position + query.length + 50);
        let excerpt = text.substring(start, end);
        
        if (start > 0) excerpt = '...' + excerpt;
        if (end < text.length) excerpt += '...';
        
        return excerpt;
    }

    /**
     * Display results
     */
    function displayResults(results, query) {
        const list = document.querySelector('.search-results-list');
        const count = document.querySelector('.results-count');
        
        if (!list) return;
        
        if (count) {
            count.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;
        }
        
        list.innerHTML = '';
        
        if (results.length === 0) {
            list.innerHTML = `
                <div class="no-results">
                    <p>No results for "${query}"</p>
                </div>
            `;
        } else {
            results.forEach(result => {
                const item = createResultItem(result, query);
                list.appendChild(item);
            });
        }
        
        showResults();
    }

    /**
     * Create result item
     */
    function createResultItem(result, query) {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        
        const title = CONFIG.highlightMatches ? highlightText(result.title, query) : result.title;
        const excerpt = CONFIG.highlightMatches ? highlightText(result.excerpt, query) : result.excerpt;
        
        item.innerHTML = `
            <div class="result-title">${title}</div>
            <div class="result-excerpt">${excerpt}</div>
        `;
        
        item.addEventListener('click', () => {
            navigateToResult(result);
            hideResults();
        });
        
        return item;
    }

    /**
     * Highlight text
     */
    function highlightText(text, query) {
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    /**
     * Navigate to result
     */
    function navigateToResult(result) {
        if (result.url.startsWith('#')) {
            const element = document.querySelector(result.url);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                element.classList.add('search-highlight');
                setTimeout(() => element.classList.remove('search-highlight'), 2000);
            }
        } else {
            window.location.href = result.url;
        }
    }

    /**
     * Show results
     */
    function showResults() {
        const results = document.querySelector('.search-results');
        if (results) results.classList.add('show');
    }

    /**
     * Hide results
     */
    function hideResults() {
        const results = document.querySelector('.search-results');
        if (results) results.classList.remove('show');
    }

    /**
     * Show recent searches
     */
    function showRecentSearches() {
        if (recentSearches.length === 0) {
            hideResults();
            return;
        }
        
        const list = document.querySelector('.search-results-list');
        const count = document.querySelector('.results-count');
        
        if (!list) return;
        
        if (count) count.textContent = 'Recent searches';
        
        list.innerHTML = '';
        recentSearches.forEach(query => {
            const item = document.createElement('div');
            item.className = 'search-recent-item';
            item.innerHTML = `<span>🕐</span> ${query}`;
            item.addEventListener('click', () => {
                document.querySelector('.search-input').value = query;
                performSearch(query);
            });
            list.appendChild(item);
        });
        
        showResults();
    }

    /**
     * Add recent search
     */
    function addRecentSearch(query) {
        recentSearches = recentSearches.filter(q => q !== query);
        recentSearches.unshift(query);
        recentSearches = recentSearches.slice(0, 5);
        
        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(recentSearches));
        } catch (e) {}
    }

    /**
     * Load recent searches
     */
    function loadRecentSearches() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            if (saved) recentSearches = JSON.parse(saved);
        } catch (e) {}
    }

    // Public API
    window.Search = {
        focus: () => document.querySelector('.search-input')?.focus(),
        clear: () => {
            const input = document.querySelector('.search-input');
            if (input) input.value = '';
            hideResults();
        },
        rebuild: () => buildSearchIndex()
    };

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
