const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Let's find the nav section
let match = indexHtml.match(/<nav class="navbar"[\s\S]*?<\/nav>/);
if(match) {
    console.log("Found nav in index.html");
    console.log(match[0]);
}
