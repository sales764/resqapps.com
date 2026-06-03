const fs = require('fs');

function insertNavHome() {
    let content = fs.readFileSync('website/translations-complete.js', 'utf8');

    // For French
    content = content.replace(/nav_features:\s*"Fonctionnalités",/g, 'nav_home: "Accueil",\n        nav_features: "Fonctionnalités",');
    
    // For Thai
    content = content.replace(/nav_features:\s*"คุณสมบัติ",/g, 'nav_home: "หน้าแรก",\n        nav_features: "คุณสมบัติ",');

    // Just in case Spanish etc exist
    content = content.replace(/nav_features:\s*"Características",/g, 'nav_home: "Inicio",\n        nav_features: "Características",');
    content = content.replace(/nav_features:\s*"Caratteristiche",/g, 'nav_home: "Home",\n        nav_features: "Caratteristiche",');
    content = content.replace(/nav_features:\s*"Mga Tampok",/g, 'nav_home: "Home",\n        nav_features: "Mga Tampok",');

    fs.writeFileSync('website/translations-complete.js', content, 'utf8');
    console.log('Added nav_home translations');
}

insertNavHome();
