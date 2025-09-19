/* This file contains the basic error handling for the portal */

// Handle all fetch errors gracefully
const handleFetchError = (error, elementId) => {
    console.error('Fetch error:', error);
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Sorry, we couldn't connect to the server. Please try again later.</p>
                <button class="retry-btn">Retry</button>
            </div>
        `;
        
        const retryBtn = element.querySelector('.retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                location.reload();
            });
        }
    }
};

// Add accessibility features for screen readers
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA attributes to improve screen reader experience
    const qrLinks = document.querySelectorAll('.qr-link');
    qrLinks.forEach(link => {
        const title = link.closest('.service-card').querySelector('h3').textContent;
        link.setAttribute('aria-label', `Access QR code for ${title}`);
    });

    // Implement keyboard shortcuts for common actions
    document.addEventListener('keydown', function(e) {
        // Alt + 1: Focus on Account Issues QR
        if (e.altKey && e.key === '1') {
            e.preventDefault();
            document.querySelector('.service-card:nth-child(1) .qr-link')?.focus();
        }
        
        // Alt + 2: Focus on Wi-Fi Issues QR
        if (e.altKey && e.key === '2') {
            e.preventDefault();
            document.querySelector('.service-card:nth-child(2) .qr-link')?.focus();
        }
        
        // Alt + H: Go to top of page
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // Add skip to content link for keyboard users
    const container = document.querySelector('.container');
    if (container) {
        const skipLink = document.createElement('a');
        skipLink.href = '#services';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        
        document.body.insertBefore(skipLink, container);
    }
});

// Monitor and report on performance metrics
const reportWebVitals = () => {
    if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfEntries = performance.getEntriesByType('navigation');
                if (perfEntries.length > 0) {
                    const metrics = {
                        pageLoadTime: perfEntries[0].loadEventEnd,
                        domContentLoaded: perfEntries[0].domContentLoadedEventEnd,
                        timeToFirstByte: perfEntries[0].responseStart,
                        resourceLoadTime: perfEntries[0].loadEventEnd - perfEntries[0].fetchStart
                    };
                    
                    // Log metrics (in production, send to analytics)
                    console.log('Performance metrics:', metrics);
                }
            }, 0);
        });
    }
};

reportWebVitals();

// Export functions for possible modular use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleFetchError,
        reportWebVitals
    };
}