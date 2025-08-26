// ASTA Research Website - JavaScript
const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const backButton = document.getElementById('backButton');
const forwardButton = document.getElementById('forwardButton');
const refreshButton = document.getElementById('refreshButton');
const webView = document.getElementById('webView');

// Navigation history
let history = [];
let currentIndex = -1;

// Initialize the browser
function initBrowser() {
    // Load homepage
    loadURL('https://www.google.com');
    
    // Add event listeners
    searchBar.addEventListener('keypress', handleSearch);
    searchButton.addEventListener('click', handleSearchClick);
    backButton.addEventListener('click', goBack);
    forwardButton.addEventListener('click', goForward);
    refreshButton.addEventListener('click', refreshPage);
    
    // Update navigation buttons state
    updateNavigationButtons();
}

// Handle search from search bar
function handleSearch(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
}

// Handle search button click
function handleSearchClick() {
    performSearch();
}

// Perform search operation
function performSearch() {
    const query = searchBar.value.trim();
    if (query) {
        if (isURL(query)) {
            loadURL(normalizeURL(query));
        } else {
            // Use Google search by default
            const searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            loadURL(searchURL);
        }
    }
}

// Check if input is a URL
function isURL(input) {
    try {
        new URL(input);
        return true;
    } catch {
        return false;
    }
}

// Normalize URL (add https:// if missing)
function normalizeURL(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
    }
    return url;
}

// Load URL into iframe
function loadURL(url) {
    try {
        webView.src = url;
        addToHistory(url);
        searchBar.value = url;
        updateNavigationButtons();
    } catch (error) {
        console.error('Error loading URL:', error);
        alert('Error loading the website. Please check the URL and try again.');
    }
}

// Add URL to history
function addToHistory(url) {
    // Remove any forward history
    history = history.slice(0, currentIndex + 1);
    history.push(url);
    currentIndex = history.length - 1;
}

// Go back in history
function goBack() {
    if (currentIndex > 0) {
        currentIndex--;
        webView.src = history[currentIndex];
        searchBar.value = history[currentIndex];
        updateNavigationButtons();
    }
}

// Go forward in history
function goForward() {
    if (currentIndex < history.length - 1) {
        currentIndex++;
        webView.src = history[currentIndex];
        searchBar.value = history[currentIndex];
        updateNavigationButtons();
    }
}

// Refresh current page
function refreshPage() {
    webView.src = webView.src;
}

// Update navigation buttons state
function updateNavigationButtons() {
    backButton.disabled = currentIndex <= 0;
    forwardButton.disabled = currentIndex >= history.length - 1;
    
    // Visual feedback for disabled buttons
    if (backButton.disabled) {
        backButton.style.opacity = '0.6';
        backButton.style.cursor = 'not-allowed';
    } else {
        backButton.style.opacity = '1';
        backButton.style.cursor = 'pointer';
    }
    
    if (forwardButton.disabled) {
        forwardButton.style.opacity = '0.6';
        forwardButton.style.cursor = 'not-allowed';
    } else {
        forwardButton.style.opacity = '1';
        forwardButton.style.cursor = 'pointer';
    }
}

// Handle iframe loading events
webView.addEventListener('load', function() {
    console.log('Page loaded:', webView.src);
    // Update address bar with current URL
    searchBar.value = webView.src;
});

webView.addEventListener('error', function() {
    console.error('Error loading page');
    alert('Failed to load the website. Please check your internet connection and try again.');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + R or F5 to refresh
    if ((e.ctrlKey && e.key === 'r') || e.key === 'F5') {
        e.preventDefault();
        refreshPage();
    }
    
    // Ctrl + L to focus search bar
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        searchBar.focus();
        searchBar.select();
    }
});

// Initialize the browser when page loads
window.addEventListener('load', initBrowser);

// Security features - Prevent some common attacks
webView.addEventListener('load', function() {
    try {
        // Try to access iframe content for security checks
        const iframeDoc = webView.contentDocument || webView.contentWindow.document;
        
        // Add basic security headers (this is just a simulation)
        console.log('Security check: Loading external content');
        
    } catch (error) {
        // Cross-origin restrictions - this is normal
        console.log('Security: Cross-origin restrictions in place');
    }
});

// Mobile-friendly touch events
if ('ontouchstart' in window) {
    // Add touch-specific enhancements
    searchBar.addEventListener('touchstart', function() {
        this.focus();
    });
}

// Performance monitoring
let loadStartTime;
webView.addEventListener('loadstart', function() {
    loadStartTime = Date.now();
});

webView.addEventListener('load', function() {
    const loadTime = Date.now() - loadStartTime;
    console.log(`Page loaded in ${loadTime}ms`);
});

// Error handling for iframe
webView.addEventListener('error', function(e) {
    console.error('Iframe error:', e);
    // You could show a custom error page here
    webView.srcdoc = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    padding: 50px; 
                    background: #f8f9fa; 
                }
                h1 { color: #dc3545; }
            </style>
        </head>
        <body>
            <h1>Unable to load page</h1>
            <p>The website could not be loaded. Please check:</p>
            <ul style="text-align: left; display: inline-block;">
                <li>Your internet connection</li>
                <li>That the URL is correct</li>
                <li>That the website is available</li>
            </ul>
        </body>
        </html>
    `;
});
