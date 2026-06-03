/**
 * APPROVED STORIES DATA
 * 
 * Ce fichier contient les histoires approuvées qui seront affichées sur le site.
 * 
 * WORKFLOW D'APPROBATION :
 * 1. Un utilisateur soumet une histoire via le formulaire
 * 2. Vous recevez un email d'approbation à sales@sornsawan.com
 * 3. Vous examinez l'histoire et décidez de l'approuver ou non
 * 4. Si approuvée, ajoutez l'histoire dans ce fichier (storiesData array)
 * 5. L'histoire apparaîtra automatiquement sur le site
 * 
 * POUR AJOUTER UNE HISTOIRE :
 * 1. Ouvrez ce fichier (stories-data.js)
 * 2. Ajoutez un nouvel objet dans le array storiesData
 * 3. Sauvegardez le fichier
 * 4. Rechargez le site pour voir l'histoire
 */

const storiesData = [
    // Exemple d'histoire avec média local (photo/vidéo uploadée)
    {
        id: 1,
        name: "Marie Dubois",
        storyType: "medical",
        story: "My grandfather had a sudden medical emergency at home. Using RESQ+, the AI Nurse guided me through immediate first aid while I waited for the ambulance. The Emergency Profile feature allowed the paramedics to instantly know his medical history and allergies. I truly believe this app made a huge difference!",
        mediaUrl: "images/screenshot-3.webp", 
        socialLink: "https://instagram.com/resqplus",
        date: "2024-11-20",
        approved: true
    },
    
    // Exemple d'histoire partagée via lien social (Instagram, TikTok, YouTube)
    // {
    //     id: 2,
    //     name: "Sarah Chen",
    //     storyType: "medical",
    //     story: "RESQ+ saved my grandmother's life during a heart attack!",
    //     mediaUrl: null, // Pas de média local - l'histoire est sur le réseau social
    //     socialLink: "https://www.instagram.com/p/ABC123xyz/", // Lien vers le post Instagram/TikTok/YouTube
    //     date: "2024-11-16",
    //     approved: true
    // },
    
    // Exemple avec YouTube
    // {
    //     id: 3,
    //     name: "Mike Johnson",
    //     storyType: "accident",
    //     story: "Car accident on the highway. RESQ+ coordinated the emergency response perfectly!",
    //     mediaUrl: null,
    //     socialLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Lien YouTube - sera embed automatiquement
    //     date: "2024-11-17",
    //     approved: true
    // }
];

// Export pour utilisation dans stories-display.js
if (typeof window !== 'undefined') {
    window.storiesData = storiesData;
}

