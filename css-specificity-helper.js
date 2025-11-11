// ========================================
// CSS SPECIFICITY HELPER
// Item 48/78: Remove !important, improve specificity
// ========================================

// Run this in browser console to find all !important rules

(function() {
    'use strict';

    /**
     * Finds all CSS rules using !important declaration
     * Scans all loaded stylesheets in the document
     * @returns {Array} Array of objects with selector, property, value, and file info
     * @example
     * findImportantRules()
     * // Returns: [{ selector: '.button', property: 'background', value: '#fff', file: 'styles.css' }]
     */
    function findImportantRules() {
        const results = [];
        
        // Get all stylesheets
        Array.from(document.styleSheets).forEach(sheet => {
            try {
                const rules = sheet.cssRules || sheet.rules;
                
                Array.from(rules).forEach(rule => {
                    if (rule.style) {
                        // Check each property
                        Array.from(rule.style).forEach(prop => {
                            const value = rule.style.getPropertyValue(prop);
                            const priority = rule.style.getPropertyPriority(prop);
                            
                            if (priority === 'important') {
                                results.push({
                                    selector: rule.selectorText,
                                    property: prop,
                                    value: value,
                                    file: sheet.href || 'inline'
                                });
                            }
                        });
                    }
                });
            } catch (e) {
                console.warn('Cannot access stylesheet:', sheet.href);
            }
        });
        
        return results;
    }

    /**
     * Calculates CSS specificity score for a selector
     * @param {string} selector - CSS selector to analyze
     * @returns {Object} Specificity breakdown (inline, ids, classes, elements, score)
     * @example
     * calculateSpecificity('#page .button')
     * // Returns: { inline: 0, ids: 1, classes: 1, elements: 0, score: 110 }
     */
    function calculateSpecificity(selector) {
        // Simple specificity calculator
        // [inline, ids, classes/attrs/pseudo, elements]
        
        let inline = 0;
        let ids = (selector.match(/#/g) || []).length;
        let classes = (selector.match(/\./g) || []).length;
        let attrs = (selector.match(/\[/g) || []).length;
        let pseudoClasses = (selector.match(/:/g) || []).length - (selector.match(/::/g) || []).length;
        let elements = selector.split(/[\s>+~]/).filter(s => s && !s.match(/^[#.\[:]/)
).length;
        
        return {
            inline,
            ids,
            classes: classes + attrs + pseudoClasses,
            elements,
            score: ids * 100 + (classes + attrs + pseudoClasses) * 10 + elements
        };
    }

    /**
     * Suggests how to fix !important usage with better specificity
     * @param {Object} rule - CSS rule object with selector
     * @returns {Array} Array of suggestion strings
     */
    function suggestFix(rule) {
        const spec = calculateSpecificity(rule.selector);
        const suggestions = [];

        // Suggest increasing specificity instead of !important
        if (spec.ids === 0) {
            suggestions.push(`Add an ID: #page ${rule.selector}`);
        }
        
        if (spec.classes < 2) {
            suggestions.push(`Add a class: .site ${rule.selector}`);
        }

        suggestions.push(`Use more specific selector`);
        suggestions.push(`Ensure CSS load order is correct`);
        
        return suggestions;
    }

    /**
     * Generates a console report of all !important declarations
     * Shows selector, property, file, specificity, and suggestions
     * @returns {Array} Array of all found !important rules
     */
    function generateReport() {
        const important = findImportantRules();
        
        console.group('🎨 CSS !important Report');
        console.log(`Found ${important.length} !important declarations`);
        console.log('');
        
        important.forEach((rule, i) => {
            console.group(`${i + 1}. ${rule.selector}`);
            console.log(`Property: ${rule.property}: ${rule.value} !important`);
            console.log(`File: ${rule.file}`);
            console.log(`Specificity:`, calculateSpecificity(rule.selector));
            console.log('Suggestions:', suggestFix(rule));
            console.groupEnd();
        });
        
        console.groupEnd();
        
        return important;
    }

    // Auto-run on load
    if (document.readyState === 'complete') {
        setTimeout(generateReport, 1000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(generateReport, 1000);
        });
    }

    // Public API
    window.CSSHelper = {
        findImportant: findImportantRules,
        calculateSpecificity,
        generateReport
    };

})();

/* 
USAGE IN CONSOLE:

// Find all !important
CSSHelper.findImportant();

// Generate full report
CSSHelper.generateReport();

// Calculate specificity
CSSHelper.calculateSpecificity('.button.primary');

*/
