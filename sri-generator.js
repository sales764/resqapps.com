// ========================================
// SUBRESOURCE INTEGRITY (SRI) GENERATOR
// Item 65/78: Generate SRI hashes for CDN resources
// ========================================

(function() {
    'use strict';

    /**
     * Generate SRI hash from a URL
     * @param {string} url - URL of the resource
     * @param {string} algorithm - Hash algorithm (sha256, sha384, sha512)
     * @returns {Promise<string>} SRI hash
     */
    async function generateSRIFromURL(url, algorithm = 'sha384') {
        try {
            const response = await fetch(url);
            const content = await response.arrayBuffer();
            return await generateSRIFromBuffer(content, algorithm);
        } catch (error) {
            console.error('Failed to fetch resource:', error);
            throw error;
        }
    }

    /**
     * Generate SRI hash from buffer
     * @param {ArrayBuffer} buffer - File content
     * @param {string} algorithm - Hash algorithm
     * @returns {Promise<string>} SRI hash
     */
    async function generateSRIFromBuffer(buffer, algorithm = 'sha384') {
        const hashAlgorithm = algorithm.toUpperCase().replace('SHA', 'SHA-');
        const hashBuffer = await crypto.subtle.digest(hashAlgorithm, buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
        return `${algorithm}-${hashBase64}`;
    }

    /**
     * Generate SRI hash from string content
     * @param {string} content - File content as string
     * @param {string} algorithm - Hash algorithm
     * @returns {Promise<string>} SRI hash
     */
    async function generateSRIFromString(content, algorithm = 'sha384') {
        const encoder = new TextEncoder();
        const buffer = encoder.encode(content);
        return await generateSRIFromBuffer(buffer, algorithm);
    }

    /**
     * Generate SRI hash from file input
     * @param {File} file - File object from input[type=file]
     * @param {string} algorithm - Hash algorithm
     * @returns {Promise<string>} SRI hash
     */
    async function generateSRIFromFile(file, algorithm = 'sha384') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const hash = await generateSRIFromBuffer(e.target.result, algorithm);
                    resolve(hash);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * Scan page for scripts and stylesheets without SRI
     * @returns {Object} Resources without SRI
     */
    function scanPageForSRI() {
        const results = {
            scriptsWithoutSRI: [],
            stylesWithoutSRI: [],
            scriptsWithSRI: [],
            stylesWithSRI: []
        };

        // Check scripts
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            const src = script.getAttribute('src');
            const integrity = script.getAttribute('integrity');
            const crossorigin = script.getAttribute('crossorigin');
            
            // Only check external resources (CDN)
            if (src && (src.startsWith('http://') || src.startsWith('https://'))) {
                const item = {
                    type: 'script',
                    url: src,
                    integrity: integrity || null,
                    crossorigin: crossorigin || null,
                    element: script
                };
                
                if (integrity) {
                    results.scriptsWithSRI.push(item);
                } else {
                    results.scriptsWithoutSRI.push(item);
                }
            }
        });

        // Check stylesheets
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            const integrity = link.getAttribute('integrity');
            const crossorigin = link.getAttribute('crossorigin');
            
            // Only check external resources (CDN)
            if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                const item = {
                    type: 'stylesheet',
                    url: href,
                    integrity: integrity || null,
                    crossorigin: crossorigin || null,
                    element: link
                };
                
                if (integrity) {
                    results.stylesWithSRI.push(item);
                } else {
                    results.stylesWithoutSRI.push(item);
                }
            }
        });

        return results;
    }

    /**
     * Generate SRI for all resources on page
     * @param {string} algorithm - Hash algorithm
     * @returns {Promise<Array>} Array of resources with SRI
     */
    async function generateSRIForPage(algorithm = 'sha384') {
        const scan = scanPageForSRI();
        const results = [];

        // Generate SRI for scripts
        for (const item of scan.scriptsWithoutSRI) {
            try {
                const hash = await generateSRIFromURL(item.url, algorithm);
                results.push({
                    type: 'script',
                    url: item.url,
                    integrity: hash,
                    crossorigin: 'anonymous',
                    html: `<script src="${item.url}" integrity="${hash}" crossorigin="anonymous"></script>`
                });
            } catch (error) {
                results.push({
                    type: 'script',
                    url: item.url,
                    error: error.message
                });
            }
        }

        // Generate SRI for stylesheets
        for (const item of scan.stylesWithoutSRI) {
            try {
                const hash = await generateSRIFromURL(item.url, algorithm);
                results.push({
                    type: 'stylesheet',
                    url: item.url,
                    integrity: hash,
                    crossorigin: 'anonymous',
                    html: `<link rel="stylesheet" href="${item.url}" integrity="${hash}" crossorigin="anonymous">`
                });
            } catch (error) {
                results.push({
                    type: 'stylesheet',
                    url: item.url,
                    error: error.message
                });
            }
        }

        return results;
    }

    /**
     * Format SRI results for display
     * @param {Array} results - SRI generation results
     * @returns {string} Formatted text
     */
    function formatSRIResults(results) {
        let output = '\n=== SRI GENERATION RESULTS ===\n\n';
        
        results.forEach((item, index) => {
            output += `${index + 1}. ${item.type.toUpperCase()}\n`;
            output += `   URL: ${item.url}\n`;
            
            if (item.error) {
                output += `   ❌ ERROR: ${item.error}\n`;
            } else {
                output += `   ✅ Integrity: ${item.integrity}\n`;
                output += `   Crossorigin: ${item.crossorigin}\n`;
                output += `   \n   HTML:\n   ${item.html}\n`;
            }
            output += '\n';
        });
        
        return output;
    }

    /**
     * Check if a resource's SRI is valid
     * @param {string} url - Resource URL
     * @param {string} expectedHash - Expected SRI hash
     * @returns {Promise<boolean>} True if valid
     */
    async function verifySRI(url, expectedHash) {
        try {
            const algorithm = expectedHash.split('-')[0];
            const actualHash = await generateSRIFromURL(url, algorithm);
            return actualHash === expectedHash;
        } catch (error) {
            console.error('SRI verification failed:', error);
            return false;
        }
    }

    // Public API
    window.SRIGenerator = {
        /**
         * Generate SRI from URL
         */
        fromURL: generateSRIFromURL,
        
        /**
         * Generate SRI from string
         */
        fromString: generateSRIFromString,
        
        /**
         * Generate SRI from file
         */
        fromFile: generateSRIFromFile,
        
        /**
         * Scan current page for SRI status
         */
        scan: function() {
            const results = scanPageForSRI();
            console.group('🔒 SRI Status Report');
            console.log(`✅ Scripts with SRI: ${results.scriptsWithSRI.length}`);
            console.log(`⚠️  Scripts without SRI: ${results.scriptsWithoutSRI.length}`);
            console.log(`✅ Stylesheets with SRI: ${results.stylesWithSRI.length}`);
            console.log(`⚠️  Stylesheets without SRI: ${results.stylesWithoutSRI.length}`);
            
            if (results.scriptsWithoutSRI.length > 0) {
                console.group('Scripts without SRI:');
                results.scriptsWithoutSRI.forEach(item => console.log(item.url));
                console.groupEnd();
            }
            
            if (results.stylesWithoutSRI.length > 0) {
                console.group('Stylesheets without SRI:');
                results.stylesWithoutSRI.forEach(item => console.log(item.url));
                console.groupEnd();
            }
            
            console.groupEnd();
            return results;
        },
        
        /**
         * Generate SRI for all resources
         */
        generateForPage: async function(algorithm = 'sha384') {
            console.log('🔄 Generating SRI hashes for all resources...');
            const results = await generateSRIForPage(algorithm);
            console.log(formatSRIResults(results));
            return results;
        },
        
        /**
         * Verify SRI hash
         */
        verify: verifySRI,
        
        /**
         * Available algorithms
         */
        algorithms: ['sha256', 'sha384', 'sha512']
    };

})();

/*
USAGE:

// Scan page for SRI status
SRIGenerator.scan();

// Generate SRI for specific URL
const hash = await SRIGenerator.fromURL('https://cdn.example.com/script.js', 'sha384');
console.log(hash); // sha384-...

// Generate SRI for all CDN resources on page
const results = await SRIGenerator.generateForPage('sha384');

// Generate SRI from string
const hash = await SRIGenerator.fromString('console.log("Hello");', 'sha384');

// Verify SRI
const isValid = await SRIGenerator.verify(
    'https://cdn.example.com/script.js',
    'sha384-...'
);

// Available algorithms
console.log(SRIGenerator.algorithms); // ['sha256', 'sha384', 'sha512']
*/
