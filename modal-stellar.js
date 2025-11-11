/* ============================================
   SHARE STORY MODAL - FUNCTIONALITY
   ============================================ */

// Modal elements
const storyModal = document.getElementById('storyModal');
const closeModal = document.getElementById('closeModal');
const storyForm = document.getElementById('storyForm');
const uploadArea = document.getElementById('uploadArea');
const mediaInput = document.getElementById('mediaInput');
const fileName = document.getElementById('fileName');
const storyTextarea = document.querySelector('textarea[name="story"]');
const charCount = document.getElementById('charCount');

// Open modal function (can be called from anywhere)
window.openStoryModal = function() {
    storyModal.classList.add('active');
    storyModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

// Close modal function
window.closeStoryModal = function() {
    storyModal.classList.remove('active');
    setTimeout(() => {
        storyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
};

// Close button click
if (closeModal) {
    closeModal.addEventListener('click', closeStoryModal);
}

// Close on outside click
if (storyModal) {
    storyModal.addEventListener('click', (e) => {
        if (e.target === storyModal) {
            closeStoryModal();
        }
    });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && storyModal && storyModal.classList.contains('active')) {
        closeStoryModal();
    }
});

// Character counter
if (storyTextarea && charCount) {
    storyTextarea.addEventListener('input', () => {
        charCount.textContent = storyTextarea.value.length;
    });
}

// File upload handling
if (uploadArea && mediaInput) {
    // Click to upload
    uploadArea.addEventListener('click', () => {
        mediaInput.click();
    });

    // File selected
    mediaInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
        mediaInput.files = e.dataTransfer.files;
    });
}

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (file.size > maxSize) {
            if (window.toast) {
                toast.error('File size must be less than 10MB', 3000);
            } else {
                alert('File size must be less than 10MB');
            }
            mediaInput.value = '';
            fileName.textContent = '';
            return;
        }

        // Show file name
        fileName.textContent = `✓ ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`;

        // Show preview if image
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadArea.innerHTML = `
                    <img src="${e.target.result}" style="max-width: 100%; max-height: 200px; border-radius: 8px; margin-bottom: 12px;">
                    <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 8px;">✓ Image ready to upload</p>
                    <p style="font-size: 12px; color: rgba(255, 255, 255, 0.5);">Click to change</p>
                `;
            };
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
            uploadArea.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 12px;">🎥</div>
                <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 8px;">✓ Video ready to upload</p>
                <p style="font-size: 12px; color: rgba(255, 255, 255, 0.5);">Click to change</p>
            `;
        }
    }
}

// Form submission - REAL Formspree Integration
if (storyForm) {
    storyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = storyForm.querySelector('button[type="submit"]');
        const formData = new FormData(storyForm);

        // Show loading state
        if (window.RESQ && window.RESQ.showButtonLoading) {
            window.RESQ.showButtonLoading(submitBtn);
        } else {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        }

        try {
            // Submit to Formspree
            const response = await fetch('https://formspree.io/f/mvlkypvo', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                if (window.toast) {
                    toast.success('🎉 Your story has been submitted! We\'ll review it and notify you if featured.', 5000);
                } else {
                    alert('Success! Your story has been submitted for review.');
                }

                // Track with GA4
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'story_submission', {
                        'event_category': 'Engagement',
                        'event_label': 'Share Story',
                        'story_type': formData.get('storyType')
                    });
                }

                // Reset form
                storyForm.reset();
                if (fileName) fileName.textContent = '';
                if (charCount) charCount.textContent = '0';
                if (uploadArea) {
                    uploadArea.innerHTML = `
                        <div style="font-size: 48px; margin-bottom: 12px;">📁</div>
                        <p style="color: #6B7280; margin-bottom: 8px;">Click to upload or drag & drop</p>
                        <p style="font-size: 12px; color: #9CA3AF;">Image or Video (Max 10MB)</p>
                    `;
                }

                // Close modal after success
                setTimeout(() => {
                    closeStoryModal();
                }, 2000);

            } else {
                // Formspree error
                throw new Error('Formspree submission failed');
            }

        } catch (error) {
            // Error handling
            console.error('Story submission error:', error);
            if (window.toast) {
                toast.error('Failed to submit story. Please try again or contact us directly.', 4000);
            } else {
                alert('Failed to submit story. Please try again.');
            }
        } finally {
            // Hide loading state
            if (window.RESQ && window.RESQ.hideButtonLoading) {
                window.RESQ.hideButtonLoading(submitBtn);
            } else {
                submitBtn.disabled = false;
                submitBtn.textContent = '🚀 Submit My Story';
            }
        }
    });
}

// Share Story section DISABLED - was causing white background issues
// Modal functionality still available if needed

console.log('📸 Share Story Modal initialized (section disabled)');
