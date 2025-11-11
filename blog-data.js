// ========================================
// BLOG DATA
// Sample blog posts for RESQ+
// Replace with CMS or API in production
// ========================================

window.blogPosts = [
    {
        id: 1,
        title: "10 Essential Emergency Safety Tips Everyone Should Know",
        excerpt: "Learn the critical safety measures that could save your life in an emergency situation. From natural disasters to medical emergencies, these tips are essential knowledge.",
        content: "Full article content here...",
        category: "safety-tips",
        date: "2024-11-01",
        author: "Dr. Sarah Chen",
        authorAvatar: "images/blog/avatar-sarah.jpg",
        image: "images/blog/safety-tips.jpg",
        url: "blog/10-essential-emergency-safety-tips"
    },
    {
        id: 2,
        title: "Complete Guide to Earthquake Preparedness in Thailand",
        excerpt: "Thailand experiences seismic activity. This comprehensive guide covers everything you need to know about preparing for and responding to earthquakes.",
        content: "Full article content here...",
        category: "emergency-guides",
        date: "2024-10-28",
        author: "Emergency Response Team",
        authorAvatar: "images/blog/avatar-team.jpg",
        image: "images/blog/earthquake-guide.jpg",
        url: "blog/earthquake-preparedness-thailand"
    },
    {
        id: 3,
        title: "RESQ+ Launches AI-Powered Emergency Response System",
        excerpt: "We're excited to announce our new AI Emergency Nurse feature that provides instant medical guidance during emergencies.",
        content: "Full article content here...",
        category: "news",
        date: "2024-10-25",
        author: "RESQ+ Team",
        authorAvatar: "images/blog/avatar-resq.jpg",
        image: "images/blog/ai-launch.jpg",
        url: "blog/ai-emergency-response-launch"
    },
    {
        id: 4,
        title: "How RESQ+ Helped Save Lives During Bangkok Flooding",
        excerpt: "A detailed case study of how our emergency response system coordinated rescue efforts during the recent flooding in Bangkok.",
        content: "Full article content here...",
        category: "case-studies",
        date: "2024-10-20",
        author: "Operations Team",
        authorAvatar: "images/blog/avatar-ops.jpg",
        image: "images/blog/bangkok-flooding.jpg",
        url: "blog/bangkok-flooding-case-study"
    },
    {
        id: 5,
        title: "Understanding the Technology Behind Emergency Alerts",
        excerpt: "Dive deep into how modern emergency alert systems work, from geolocation to push notifications.",
        content: "Full article content here...",
        category: "technology",
        date: "2024-10-15",
        author: "Tech Team",
        authorAvatar: "images/blog/avatar-tech.jpg",
        image: "images/blog/alert-technology.jpg",
        url: "blog/emergency-alert-technology"
    },
    {
        id: 6,
        title: "First Aid Basics: What to Do Before Help Arrives",
        excerpt: "Critical first aid procedures that everyone should know. These skills can make the difference between life and death.",
        content: "Full article content here...",
        category: "safety-tips",
        date: "2024-10-10",
        author: "Dr. Michael Wong",
        authorAvatar: "images/blog/avatar-michael.jpg",
        image: "images/blog/first-aid.jpg",
        url: "blog/first-aid-basics"
    },
    {
        id: 7,
        title: "Fire Safety: Prevention and Emergency Response",
        excerpt: "Comprehensive guide to fire safety in homes and workplaces. Learn how to prevent fires and respond effectively if one occurs.",
        content: "Full article content here...",
        category: "emergency-guides",
        date: "2024-10-05",
        author: "Fire Safety Expert",
        authorAvatar: "images/blog/avatar-fire.jpg",
        image: "images/blog/fire-safety.jpg",
        url: "blog/fire-safety-guide"
    },
    {
        id: 8,
        title: "RESQ+ Partners with Thai Red Cross for Emergency Training",
        excerpt: "Announcing our new partnership to provide emergency response training to communities across Thailand.",
        content: "Full article content here...",
        category: "news",
        date: "2024-10-01",
        author: "RESQ+ Team",
        authorAvatar: "images/blog/avatar-resq.jpg",
        image: "images/blog/red-cross-partnership.jpg",
        url: "blog/red-cross-partnership"
    }
];

// CMS Integration Example (uncomment to use)
/*
async function loadBlogPosts() {
    try {
        const response = await fetch('/api/blog/posts');
        const posts = await response.json();
        window.blogPosts = posts;
        
        // Trigger refresh
        if (window.Blog) {
            window.Blog.refresh();
        }
    } catch (error) {
        console.error('Failed to load blog posts:', error);
    }
}

// Load posts from CMS
loadBlogPosts();
*/
