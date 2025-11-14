/**
 * STORIES DISPLAY SYSTEM
 * Charge et affiche les histoires approuvées sur le site
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        containerId: 'approved-stories-grid',
        emptyMessageId: 'stories-empty',
        loadingId: 'stories-loading',
        storiesPerPage: 6,
        currentPage: 1
    };

    /**
     * Charge les histoires approuvées
     */
    function loadApprovedStories() {
        const container = document.getElementById(config.containerId);
        const emptyMessage = document.getElementById(config.emptyMessageId);
        const loading = document.getElementById(config.loadingId);

        if (!container) {
            console.warn('[Stories Display] Container not found');
            return;
        }

        // Hide loading
        if (loading) loading.style.display = 'none';

        // Get stories from stories-data.js
        const stories = window.storiesData || [];

        // Filter only approved stories
        const approvedStories = stories.filter(story => story.approved === true);

        if (approvedStories.length === 0) {
            if (emptyMessage) emptyMessage.style.display = 'block';
            container.innerHTML = '';
            return;
        }

        if (emptyMessage) emptyMessage.style.display = 'none';

        // Display stories
        displayStories(approvedStories, container);
    }

    /**
     * Affiche les histoires dans la grille
     */
    function displayStories(stories, container) {
        container.innerHTML = '';

        stories.forEach((story, index) => {
            const storyCard = createStoryCard(story);
            container.appendChild(storyCard);

            // Animate in
            setTimeout(() => {
                storyCard.classList.add('show');
            }, index * 100);
        });
    }

    /**
     * Détecte le type de lien social
     */
    function detectSocialPlatform(url) {
        if (!url || url === 'N/A') return null;
        
        if (url.includes('instagram.com')) return 'instagram';
        if (url.includes('tiktok.com')) return 'tiktok';
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
        if (url.includes('facebook.com')) return 'facebook';
        
        return null;
    }

    /**
     * Génère un embed URL pour les réseaux sociaux
     */
    function getEmbedUrl(url, platform) {
        if (platform === 'instagram') {
            // Instagram oEmbed: https://api.instagram.com/oembed?url=...
            return `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}`;
        }
        if (platform === 'tiktok') {
            // TikTok oEmbed: https://www.tiktok.com/oembed?url=...
            return `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
        }
        if (platform === 'youtube') {
            // Extraire l'ID de la vidéo YouTube
            const videoId = extractYouTubeId(url);
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }
        return null;
    }

    /**
     * Extrait l'ID d'une vidéo YouTube
     */
    function extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    /**
     * Crée une carte d'histoire
     */
    function createStoryCard(story) {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.setAttribute('data-story-id', story.id);

        // Story type emoji
        const typeEmojis = {
            hiking: '🏔️',
            accident: '🚗',
            medical: '🏥',
            beach: '🏖️',
            elderly: '👴',
            training: '🎮',
            other: '✨'
        };

        const typeEmoji = typeEmojis[story.storyType] || '✨';
        const typeLabels = {
            hiking: 'Hiking/Outdoor',
            accident: 'Car Accident',
            medical: 'Medical Emergency',
            beach: 'Beach/Water',
            elderly: 'Elderly Care',
            training: 'Training/Learning',
            other: 'Other'
        };

        const typeLabel = typeLabels[story.storyType] || 'Other';

        // Format date
        const date = story.date ? new Date(story.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : '';

        // Détecter si c'est une histoire avec lien social embeddable
        const socialPlatform = story.socialLink ? detectSocialPlatform(story.socialLink) : null;
        const isSocialStory = socialPlatform && !story.mediaUrl; // Si pas de mediaUrl mais un lien social

        // Platform info (défini en dehors pour être accessible partout)
        const platformIcons = {
            instagram: '📷',
            tiktok: '🎵',
            youtube: '▶️',
            facebook: '👥'
        };
        
        const platformNames = {
            instagram: 'Instagram',
            tiktok: 'TikTok',
            youtube: 'YouTube',
            facebook: 'Facebook'
        };

        // Media section
        let mediaHTML = '';
        
        if (isSocialStory) {
            // Histoire partagée via lien social (Instagram, TikTok, YouTube)
            const icon = platformIcons[socialPlatform] || '🔗';
            const platformName = platformNames[socialPlatform] || 'Social Media';

            if (socialPlatform === 'youtube') {
                // YouTube embed direct
                const videoId = extractYouTubeId(story.socialLink);
                if (videoId) {
                    mediaHTML = `
                        <div class="story-media story-media-embed">
                            <iframe 
                                src="https://www.youtube.com/embed/${videoId}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen
                                style="width: 100%; height: 100%; min-height: 200px;">
                            </iframe>
                            <div class="story-badge">${typeEmoji} ${typeLabel}</div>
                        </div>
                    `;
                } else {
                    mediaHTML = `
                        <div class="story-media story-media-social" style="background: linear-gradient(135deg, rgba(255, 0, 0, 0.2) 0%, rgba(255, 0, 128, 0.2) 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px;">
                            <div style="font-size: 64px; margin-bottom: 16px;">${icon}</div>
                            <div style="color: rgba(255,255,255,0.9); font-weight: 600; margin-bottom: 8px;">${platformName}</div>
                            <div class="story-badge">${typeEmoji} ${typeLabel}</div>
                        </div>
                    `;
                }
            } else {
                // Instagram, TikTok, Facebook - Afficher preview avec bouton
                mediaHTML = `
                    <div class="story-media story-media-social" style="background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(255, 0, 128, 0.1) 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; position: relative;">
                        <div style="font-size: 64px; margin-bottom: 16px;">${icon}</div>
                        <div style="color: rgba(255,255,255,0.9); font-weight: 600; margin-bottom: 8px;">${platformName}</div>
                        <p style="color: rgba(255,255,255,0.7); font-size: 14px; text-align: center; margin: 0;">Story shared on ${platformName}</p>
                        <div class="story-badge">${typeEmoji} ${typeLabel}</div>
                    </div>
                `;
            }
        } else if (story.mediaUrl) {
            // Histoire avec média local (photo/vidéo uploadée)
            if (story.mediaUrl.match(/\.(mp4|webm|ogg)$/i)) {
                mediaHTML = `
                    <div class="story-media">
                        <video src="${story.mediaUrl}" controls style="width: 100%; height: 100%; object-fit: cover;"></video>
                        <div class="story-badge">${typeEmoji} ${typeLabel}</div>
                    </div>
                `;
            } else {
                mediaHTML = `
                    <div class="story-media">
                        <img src="${story.mediaUrl}" alt="Story image" loading="lazy" onerror="this.parentElement.innerHTML='<div style=\\'padding: 60px; text-align: center; background: rgba(255,255,255,0.05);\\'>📸</div>'">
                        <div class="story-badge">${typeEmoji} ${typeLabel}</div>
                    </div>
                `;
            }
        } else {
            // Pas de média
            mediaHTML = `
                <div class="story-media" style="background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(255, 0, 128, 0.1) 100%); display: flex; align-items: center; justify-content: center;">
                    <div style="font-size: 64px;">${typeEmoji}</div>
                    <div class="story-badge">${typeLabel}</div>
                </div>
            `;
        }

        // Social link button
        let socialHTML = '';
        if (story.socialLink && story.socialLink !== 'N/A') {
            if (isSocialStory) {
                // Bouton pour ouvrir le lien original
                socialHTML = `
                    <a href="${story.socialLink}" target="_blank" rel="noopener noreferrer" class="story-social-link story-social-link-primary">
                        🔗 View Original on ${platformNames[socialPlatform] || 'Social Media'}
                    </a>
                `;
            } else {
                // Lien social simple (profil)
                socialHTML = `
                    <a href="${story.socialLink}" target="_blank" rel="noopener noreferrer" class="story-social-link">
                        🔗 Follow
                    </a>
                `;
            }
        }

        card.innerHTML = `
            ${mediaHTML}
            <div class="story-content">
                <p class="story-text">"${story.story}"</p>
                <div class="story-author">
                    <div>
                        <strong class="story-name">${story.name}</strong>
                        ${date ? `<span class="story-date">${date}</span>` : ''}
                    </div>
                    ${socialHTML}
                </div>
            </div>
        `;

        return card;
    }

    /**
     * Initialize
     */
    function init() {
        // Wait for stories-data.js to load
        if (typeof window.storiesData === 'undefined') {
            setTimeout(init, 100);
            return;
        }

        console.log('[Stories Display] Loading approved stories...');
        loadApprovedStories();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

