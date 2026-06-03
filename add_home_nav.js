const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.filter(f => f.endsWith('.html')).map(f => path.join(dir, f));
}

function updateHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const navRegex = /(<div class="nav-links" id="nav-links">\s*)(<a[^>]*data-i18n="nav_features")/g;
    
    if (navRegex.test(content)) {
        content = content.replace(navRegex, `$1<a href="index.html" data-i18n="nav_home">Home</a>\n                      $2`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    } else {
        console.log('Skipped or no match: ' + filePath);
    }
}

const htmlFiles = getHtmlFiles('./website');
htmlFiles.forEach(updateHtmlFile);
