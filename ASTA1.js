// Navigation script for ASTA Research Website
document.addEventListener('DOMContentLoaded', function() {
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop();
    
    // Update active navigation link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add page transition effects
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('http') || this.getAttribute('href').includes('#')) {
                return; // Don't apply transition for external links or anchor links
            }
            
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Add fade-out effect
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
    
    // Fade in effect when page loads
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to focus on navigation
        if (e.key === 'Escape') {
            const firstNavLink = document.querySelector('nav a');
            if (firstNavLink) {
                firstNavLink.focus();
            }
        }
        
        // Tab key navigation enhancement
        if (e.key === 'Tab') {
            // Add focus styles to improve accessibility
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.tagName === 'A') {
                focusedElement.style.outline = '2px solid #667eea';
                focusedElement.style.outlineOffset = '2px';
            }
        }
    });
    
    // Remove focus outline when mouse is used
    document.addEventListener('mousedown', function() {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.tagName === 'A') {
            focusedElement.style.outline = 'none';
        }
    });
    
    // Add loading indicator for better user experience
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        // Show loading indicator if needed
        console.log('Fetch request initiated:', args[0]);
        return originalFetch.apply(this, args);
    };
    
    // Error handling for page resources
    window.addEventListener('error', function(e) {
        console.error('Page error:', e.error);
    });
    
    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
});
