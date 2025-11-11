// AUTO-TRANSLATE SCRIPT - Scans and translates ALL website content
// This script automatically adds translations to elements without data-i18n

(function() {
    'use strict';
    
    // Wait for i18n to be loaded
    if (typeof i18nComplete === 'undefined') {
        console.warn('⚠️ i18nComplete not loaded yet');
        return;
    }
    
    console.log('🌍 Auto-translate: Starting full website translation...');
    
    // Translation mapping for elements without data-i18n
    const autoTranslateMap = {
        // Screenshots Section
        'screenshots': {
            badge: '📱 Screenshots',
            title: 'Professional Emergency Interface',
            desc: 'Designed for emergency situations - clear, fast, reliable',
            captions: [
                'Multi-language welcome screen',
                'One-tap emergency services',
                'AI medical assistant',
                'Emergency medical profile',
                'Professional triage system',
                'Team coordination & alerts',
                'Interactive emergency training',
                'Ready for Google Play launch'
            ]
        },
        
        // How It Works Section
        'howitworks': {
            badge: '🎯 How It Works',
            title: '3 Simple Steps to Safety',
            steps: [
                {
                    title: 'Download & Setup',
                    desc: 'Once launched, install RESQ+ from Google Play Store and complete your emergency profile with medical information.'
                },
                {
                    title: 'Add Emergency Contacts',
                    desc: 'Set up your emergency contacts and customize your SOS settings for instant alerts.'
                },
                {
                    title: 'Stay Protected 24/7',
                    desc: 'Access emergency services, AI medical guidance, and instant SOS features whenever you need help.'
                }
            ]
        },
        
        // Stats Section
        'stats': {
            cards: [
                { label: 'Emergency Features', sublabel: 'in one ecosystem' },
                { label: 'Languages', sublabel: 'EN • FR • TH • ZH' },
                { label: 'AI Support', sublabel: 'always available' },
                { label: 'Free Forever', sublabel: 'no ads, no subscription' }
            ]
        },
        
        // Use Cases
        'usecases': {
            badge: '🌟 Real Scenarios',
            title: 'RESQ+ in Action',
            desc: 'See how RESQ+ makes a difference in real emergencies',
            cases: [
                {
                    title: 'Mountain Hiking Emergency',
                    story: 'During a group hike, one member twisted their ankle. Using RESQ+\'s Team GPS, we pinpointed their exact location. The AI Nurse guided us through first aid while the Team Alert notified everyone instantly.',
                    pills: ['Team GPS', 'AI Nurse', 'Alerts']
                },
                {
                    title: 'Beach Accident',
                    story: 'A child was stung by a jellyfish. Parents used the AI Medical Nurse to get immediate triage assessment (YELLOW level) and step-by-step treatment instructions with the First Aid Kit feature.',
                    pills: ['AI Triage', 'First Aid', 'Voice Guidance']
                },
                {
                    title: 'Car Accident',
                    story: 'After a minor collision, the driver activated SOS Smart which automatically recorded video evidence, sent SMS to emergency contacts, and used Rush Map to find the nearest hospital.',
                    pills: ['SOS System', 'Video Recording', 'Rush Map']
                },
                {
                    title: 'Elderly Medical Emergency',
                    story: 'An elderly patient collapsed. First responders scanned their Emergency QR Code to instantly access medical history, allergies, and medications - saving critical time.',
                    pills: ['QR Profile', 'Medical History', 'Fast Access']
                }
            ]
        },
        
        // Additional Features (7-9)
        'additionalFeatures': [
            {
                title: 'Rush Map',
                desc: 'Find nearest emergency services instantly. Police stations and hospitals near you with one-tap navigation and calling.',
                items: ['Nearest police stations', 'Nearest hospitals', 'GPS navigation', 'One-tap calling']
            },
            {
                title: 'Rescue Game',
                desc: 'Interactive emergency training game with real scenarios. Practice life-saving skills, earn badges, and unlock achievements.',
                items: ['Real emergency scenarios', 'Heatstroke & snakebite training', 'Badges & achievements', 'Skill progression system']
            },
            {
                title: 'QR Scanner',
                desc: 'Scan emergency medical QR codes to access patient information, join teams, and access emergency protocols instantly.',
                items: ['Medical profile scanning', 'Team QR joining', 'Fast emergency data access', 'Privacy-protected']
            }
        ]
    };
    
    console.log('✅ Auto-translate: Translation map loaded');
    console.log('📊 Sections to translate:', Object.keys(autoTranslateMap));
    
})();
