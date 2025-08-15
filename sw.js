const CACHE_NAME = 'recycling-assistant-v1.3';
const STATIC_CACHE_NAME = 'recycling-static-v1.3';
const DYNAMIC_CACHE_NAME = 'recycling-dynamic-v1.3';

// Files to cache for offline functionality
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json'
];

// Core recycling data for offline access
const OFFLINE_DATA = {
    recyclingTips: [
        "Always rinse containers before recycling",
        "Remove caps from bottles only if required locally",
        "Batteries and electronics need special disposal",
        "When in doubt, check with local recycling facility",
        "Plastic bags don't go in curbside recycling"
    ],
    commonItems: [
        { name: "plastic bottle", category: "Recyclable - Dry Waste" },
        { name: "aluminum can", category: "Recyclable - Dry Waste" },
        { name: "cardboard", category: "Recyclable - Dry Waste" },
        { name: "glass jar", category: "Recyclable - Dry Waste" },
        { name: "battery", category: "Hazardous Waste" },
        { name: "electronics", category: "Hazardous Waste" }
    ]
};

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static assets
            caches.open(STATIC_CACHE_NAME)
                .then(cache => {
                    console.log('Service Worker: Caching static assets');
                    return cache.addAll(STATIC_ASSETS).catch(error => {
                        console.warn('Service Worker: Some static assets failed to cache:', error);
                        // Continue with partial caching
                        return Promise.resolve();
                    });
                }),
            
            // Cache offline data
            caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.put('/offline-data', 
                        new Response(JSON.stringify(OFFLINE_DATA), {
                            headers: { 'Content-Type': 'application/json' }
                        })
                    );
                })
        ])
        .then(() => {
            console.log('Service Worker: Installation complete');
            return self.skipWaiting(); // Force activation
        })
        .catch(error => {
            console.error('Service Worker: Installation failed:', error);
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE_NAME && 
                        cacheName !== DYNAMIC_CACHE_NAME && 
                        cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activation complete');
            return self.clients.claim(); // Take control immediately
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests and chrome-extension URLs
    if (request.method !== 'GET' || 
        url.protocol === 'chrome-extension:' ||
        url.protocol === 'moz-extension:') {
        return;
    }

    // Handle different types of requests
    if (request.destination === 'document') {
        // HTML pages - cache first, then network
        event.respondWith(handlePageRequest(request));
    } else if (request.destination === 'image') {
        // Images - cache first
        event.respondWith(handleImageRequest(request));
    } else if (url.origin === location.origin) {
        // Same-origin requests - cache first
        event.respondWith(handleStaticRequest(request));
    } else {
        // External resources - network first with fallback
        event.respondWith(handleExternalRequest(request));
    }
});

// Handle page requests (HTML)
async function handlePageRequest(request) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            // If cached, try to update in background
            fetchAndCache(request).catch(() => {}); // Silent fail
            return cachedResponse;
        }

        // If not cached, try network
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            // Cache successful response
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone()).catch(() => {}); // Silent fail
        }
        return networkResponse;

    } catch (error) {
        console.log('Service Worker: Page request failed, serving offline page');
        return createOfflinePage();
    }
}

// Handle static asset requests
async function handleStaticRequest(request) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Try network if not in cache
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone()).catch(() => {}); // Silent fail
        }
        return networkResponse;

    } catch (error) {
        console.log('Service Worker: Static request failed:', request.url);
        
        // Return fallback based on request type
        if (request.url.includes('.css')) {
            return createFallbackCSS();
        } else if (request.url.includes('.js')) {
            return createFallbackJS();
        }
        
        // Generic fallback
        return new Response('Offline - Resource unavailable', { 
            status: 503, 
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}

// Handle external requests (CDNs, APIs)
async function handleExternalRequest(request) {
    try {
        // Network first for external resources
        const networkResponse = await fetch(request, {
            mode: 'cors',
            credentials: 'omit'
        });
        
        if (networkResponse.ok) {
            // Cache successful responses
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone()).catch(() => {}); // Silent fail
        }
        return networkResponse;

    } catch (error) {
        // Fall back to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Return appropriate fallback
        if (request.url.includes('fonts.googleapis.com')) {
            return createFallbackFont();
        } else if (request.url.includes('font-awesome') || request.url.includes('fontawesome')) {
            return createFallbackIcons();
        } else if (request.url.includes('leaflet')) {
            return createFallbackLeaflet();
        } else if (request.url.includes('fuse.js')) {
            return createFallbackFuse();
        }

        return new Response('External resource unavailable', { 
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}

// Handle image requests
async function handleImageRequest(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone()).catch(() => {}); // Silent fail
        }
        return networkResponse;

    } catch (error) {
        // Return placeholder image
        return createPlaceholderImage();
    }
}

// Utility function to fetch and cache in background
async function fetchAndCache(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            await cache.put(request, response);
        }
    } catch (error) {
        console.log('Service Worker: Background fetch failed:', error);
    }
}

// Create offline fallback page
function createOfflinePage() {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Offline - Smart Recycling Assistant</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    margin: 0;
                    padding: 20px;
                    color: #2c3e50;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .offline-container {
                    max-width: 600px;
                    text-align: center;
                    background: rgba(255, 255, 255, 0.95);
                    padding: 40px 30px;
                    border-radius: 20px;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                    backdrop-filter: blur(10px);
                }
                .offline-icon {
                    font-size: 4rem;
                    margin-bottom: 20px;
                    display: block;
                }
                h1 {
                    color: #2ecc71;
                    margin-bottom: 15px;
                    font-size: 2.2rem;
                }
                p {
                    color: #7f8c8d;
                    margin-bottom: 30px;
                    font-size: 1.1rem;
                    line-height: 1.6;
                }
                .tips {
                    background: linear-gradient(135deg, #e8f8f5, #d1f2eb);
                    padding: 25px;
                    border-radius: 15px;
                    margin: 30px 0;
                    text-align: left;
                }
                .tips h3 {
                    color: #27ae60;
                    margin-top: 0;
                    margin-bottom: 15px;
                    font-size: 1.3rem;
                }
                .tips ul {
                    margin: 15px 0;
                    padding-left: 25px;
                }
                .tips li {
                    margin: 8px 0;
                    color: #2c3e50;
                }
                button {
                    background: linear-gradient(135deg, #2ecc71, #27ae60);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                    margin: 10px;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
                }
                button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(46, 204, 113, 0.4);
                }
                .offline-search {
                    margin: 25px 0;
                    padding: 15px 20px;
                    border: 2px solid #e9ecef;
                    border-radius: 25px;
                    width: 100%;
                    max-width: 400px;
                    font-size: 16px;
                    background: white;
                    transition: border-color 0.3s ease;
                }
                .offline-search:focus {
                    outline: none;
                    border-color: #3498db;
                }
                .item-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 15px;
                    margin: 25px 0;
                }
                .item-card {
                    background: white;
                    padding: 20px;
                    border-radius: 15px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
                    border-left: 4px solid #3498db;
                    transition: transform 0.3s ease;
                }
                .item-card:hover {
                    transform: translateY(-3px);
                }
                .item-card h4 {
                    margin: 0 0 8px 0;
                    color: #2c3e50;
                    font-size: 1.1rem;
                }
                .item-card p {
                    margin: 0;
                    color: #7f8c8d;
                    font-size: 0.9rem;
                }
                @media (max-width: 768px) {
                    .offline-container { padding: 30px 20px; }
                    h1 { font-size: 1.8rem; }
                    .item-grid { grid-template-columns: 1fr; }
                    button { width: 100%; margin: 10px 0; }
                }
            </style>
        </head>
        <body>
            <div class="offline-container">
                <div class="offline-icon">🌱</div>
                <h1>You're Offline</h1>
                <p>Don't worry! You can still access basic recycling information and tips.</p>
                
                <input type="text" class="offline-search" placeholder="Search recycling items..." 
                       id="offlineSearch" onkeyup="filterItems(this.value)">
                
                <div class="tips">
                    <h3>♻️ Quick Recycling Tips</h3>
                    <ul id="offlineTips">
                        <li>Always rinse containers before recycling</li>
                        <li>Remove caps from bottles only if required locally</li>
                        <li>Batteries and electronics need special disposal</li>
                        <li>When in doubt, check with local recycling facility</li>
                        <li>Plastic bags don't go in curbside recycling</li>
                    </ul>
                </div>

                <h3 style="color: #2c3e50; margin-bottom: 20px;">Common Recyclable Items</h3>
                <div class="item-grid" id="itemGrid">
                    <div class="item-card">
                        <h4>Plastic Bottle</h4>
                        <p>Recyclable - Dry Waste</p>
                    </div>
                    <div class="item-card">
                        <h4>Aluminum Can</h4>
                        <p>Recyclable - Dry Waste</p>
                    </div>
                    <div class="item-card">
                        <h4>Cardboard</h4>
                        <p>Recyclable - Dry Waste</p>
                    </div>
                    <div class="item-card">
                        <h4>Glass Jar</h4>
                        <p>Recyclable - Dry Waste</p>
                    </div>
                    <div class="item-card">
                        <h4>Battery</h4>
                        <p>Hazardous Waste</p>
                    </div>
                    <div class="item-card">
                        <h4>Electronics</h4>
                        <p>Hazardous Waste</p>
                    </div>
                </div>

                <button onclick="window.location.reload()">🔄 Try Again</button>
                <button onclick="goOffline()" style="background: linear-gradient(135deg, #3498db, #2980b9);">📱 Browse Offline Mode</button>
            </div>

            <script>
                function filterItems(searchTerm) {
                    const items = document.querySelectorAll('.item-card');
                    const term = searchTerm.toLowerCase();
                    
                    items.forEach(item => {
                        const title = item.querySelector('h4').textContent.toLowerCase();
                        const category = item.querySelector('p').textContent.toLowerCase();
                        
                        if (title.includes(term) || category.includes(term)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = term === '' ? 'block' : 'none';
                        }
                    });
                }

                function goOffline() {
                    try {
                        localStorage.setItem('offlineMode', 'true');
                    } catch(e) {}
                    window.location.href = '/';
                }

                // Load cached data if available
                if ('caches' in window) {
                    caches.match('/offline-data')
                        .then(response => response ? response.json() : null)
                        .then(data => {
                            if (data && data.recyclingTips && data.commonItems) {
                                const tipsList = document.getElementById('offlineTips');
                                tipsList.innerHTML = data.recyclingTips.map(tip => 
                                    '<li>' + tip + '</li>'
                                ).join('');

                                const itemGrid = document.getElementById('itemGrid');
                                itemGrid.innerHTML = data.commonItems.map(item =>
                                    '<div class="item-card"><h4>' + item.name + '</h4><p>' + item.category + '</p></div>'
                                ).join('');
                            }
                        })
                        .catch(err => console.log('Could not load cached data:', err));
                }
            </script>
        </body>
        </html>
    `;

    return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
    });
}

// Create fallback CSS
function createFallbackCSS() {
    const css = `
        /* Minimal fallback CSS for offline mode */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #2c3e50;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        h1 { color: #2ecc71; text-align: center; margin-bottom: 20px; }
        h2 { color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin: 20px 0; }
        button {
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            margin: 5px;
            transition: transform 0.3s ease;
        }
        button:hover { transform: translateY(-2px); }
        input[type="text"] {
            width: 100%;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 16px;
            margin-bottom: 15px;
        }
        .section {
            margin: 30px 0;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #e9ecef;
            background: #f8f9fa;
        }
        .offline-indicator {
            background: #f39c12;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        @media (max-width: 768px) {
            body { padding: 10px; }
            .container { padding: 20px; }
            h1 { font-size: 1.8rem; }
        }
    `;

    return new Response(css, {
        headers: { 'Content-Type': 'text/css' }
    });
}

// Create fallback JavaScript
function createFallbackJS() {
    const js = `
        console.log('Recycling Assistant: Running in offline mode with fallback functionality');
        
        // Basic offline functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Show offline indicator
            const offlineDiv = document.createElement('div');
            offlineDiv.className = 'offline-indicator';
            offlineDiv.innerHTML = '🌱 Offline Mode - Limited functionality';
            offlineDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #f39c12; color: white; padding: 10px 15px; border-radius: 5px; z-index: 1000;';
            document.body.appendChild(offlineDiv);
            
            // Basic search functionality
            window.searchItem = function() {
                const input = document.getElementById('itemInput');
                const resultDiv = document.getElementById('result');
                if (input && resultDiv) {
                    const value = input.value.toLowerCase();
                    resultDiv.innerHTML = '<div style="padding: 20px; background: #fff3cd; border-radius: 10px; border-left: 4px solid #f39c12;"><h3>Offline Mode</h3><p>Limited search available. Please connect to internet for detailed recycling instructions.</p><p><strong>Searched for:</strong> ' + value + '</p></div>';
                }
            };
            
            // Disable camera in offline mode
            window.startCamera = function() {
                alert('Camera feature requires internet connection. Please go online and try again.');
            };
            
            window.captureImage = function() {
                alert('Image analysis requires internet connection.');
            };
            
            window.analyzeUploadedImage = function() {
                alert('Image analysis requires internet connection.');
            };
            
            // Basic voice search fallback
            window.startVoiceSearch = function() {
                alert('Voice search requires internet connection.');
            };
            
            // Map fallback
            if (document.getElementById('map')) {
                document.getElementById('map').innerHTML = '<div style="padding: 40px; text-align: center; background: #ecf0f1; border-radius: 10px;"><h3>Map Unavailable</h3><p>Map functionality requires internet connection.</p></div>';
            }
            
            // Basic filter function
            window.filterCenters = function(type) {
                console.log('Filter centers offline:', type);
            };
            
            // Modal functions
            window.showAddCenterForm = function() {
                alert('Adding recycling centers requires internet connection.');
            };
            
            window.closeAddCenterForm = function() {};
            window.addRecyclingCenter = function() {};
            window.installApp = function() {};
            window.dismissInstallPrompt = function() {};
            
            // Search suggestions
            window.searchSuggestion = function(term) {
                const input = document.getElementById('itemInput');
                if (input) {
                    input.value = term;
                    window.searchItem();
                }
            };
            
            console.log('Offline fallback functions loaded');
        });
    `;

    return new Response(js, {
        headers: { 'Content-Type': 'application/javascript' }
    });
}

// Create fallback font response
function createFallbackFont() {
    return new Response('/* Font unavailable offline */', {
        headers: { 'Content-Type': 'text/css' }
    });
}

// Create fallback icons
function createFallbackIcons() {
    const css = `
        /* Fallback for Font Awesome icons using Unicode symbols and CSS */
        .fa, .fas, .far, .fab { 
            font-family: Arial, sans-serif; 
            font-style: normal;
            font-variant: normal;
            text-rendering: auto;
            line-height: 1;
        }
        .fa-recycle:before, .fas.fa-recycle:before { content: "♻️"; }
        .fa-camera:before, .fas.fa-camera:before { content: "📷"; }
        .fa-video:before, .fas.fa-video:before { content: "📹"; }
        .fa-stop:before, .fas.fa-stop:before { content: "⏹️"; }
        .fa-upload:before, .fas.fa-upload:before { content: "📤"; }
        .fa-map-marked-alt:before, .fas.fa-map-marked-alt:before { content: "🗺️"; }
        .fa-map-marker-alt:before, .fas.fa-map-marker-alt:before { content: "📍"; }
        .fa-search:before, .fas.fa-search:before { content: "🔍"; }
        .fa-microphone:before, .fas.fa-microphone:before { content: "🎤"; }
        .fa-microphone-slash:before, .fas.fa-microphone-slash:before { content: "🎤"; }
        .fa-star:before, .fas.fa-star:before { content: "⭐"; }
        .fa-leaf:before, .fas.fa-leaf:before { content: "🍃"; }
        .fa-user:before, .fas.fa-user:before { content: "👤"; }
        .fa-exclamation-triangle:before, .fas.fa-exclamation-triangle:before { content: "⚠️"; }
        .fa-lightbulb:before, .fas.fa-lightbulb:before { content: "💡"; }
        .fa-check:before, .fas.fa-check:before { content: "✅"; }
        .fa-times:before, .fas.fa-times:before { content: "❌"; }
        .fa-info-circle:before, .fas.fa-info-circle:before { content: "ℹ️"; }
        .fa-map-pin:before, .fas.fa-map-pin:before { content: "📌"; }
        .fa-wifi-slash:before, .fas.fa-wifi-slash:before { content: "📶"; }
        .fa-mobile-alt:before, .fas.fa-mobile-alt:before { content: "📱"; }
        .fa-globe:before, .fas.fa-globe:before { content: "🌍"; }
        .fa-laptop:before, .fas.fa-laptop:before { content: "💻"; }
        .fa-plus:before, .fas.fa-plus:before { content: "➕"; }
        .fa-tint:before, .fas.fa-tint:before { content: "💧"; }
        .fa-sort:before, .fas.fa-sort:before { content: "🔀"; }
        .fa-battery-three-quarters:before, .fas.fa-battery-three-quarters:before { content: "🔋"; }
        .fa-battery-full:before, .fas.fa-battery-full:before { content: "🔋"; }
        .fa-bottle-water:before, .fas.fa-bottle-water:before { content: "🍼"; }
        .fa-box:before, .fas.fa-box:before { content: "📦"; }
        .fa-jar:before, .fas.fa-jar:before { content: "🍯"; }
        .fa-wine-bottle:before, .fas.fa-wine-bottle:before { content: "🍾"; }
        .fa-mobile:before, .fas.fa-mobile:before { content: "📱"; }
        .fa-can-food:before, .fas.fa-can-food:before { content: "🥫"; }
        .fa-newspaper:before, .fas.fa-newspaper:before { content: "📰"; }
        .fa-book-open:before, .fas.fa-book-open:before { content: "📖"; }
        .fa-cube:before, .fas.fa-cube:before { content: "📦"; }
        .fa-pizza-slice:before, .fas.fa-pizza-slice:before { content: "🍕"; }
        .fa-shopping-bag:before, .fas.fa-shopping-bag:before { content: "🛍️"; }
        .fa-question:before, .fas.fa-question:before { content: "❓"; }
        .fa-list-ul:before, .fas.fa-list-ul:before { content: "📋"; }
        .fa-robot:before, .fas.fa-robot:before { content: "🤖"; }
        .fa-spinner:before, .fas.fa-spinner:before { content: "⏳"; }
        .fa-clock:before, .fas.fa-clock:before { content: "🕐"; }
        .fa-phone:before, .fas.fa-phone:before { content: "📞"; }
        
        /* Animation for spinner */
        .fa-spinner, .fas.fa-spinner {
            animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    return new Response(css, {
        headers: { 'Content-Type': 'text/css' }
    });
}

// Create fallback for Leaflet
function createFallbackLeaflet() {
    const js = `
        // Minimal Leaflet fallback
        console.warn('Leaflet not available offline');
        window.L = {
            map: function() { 
                return {
                    setView: function() { return this; },
                    addTo: function() { return this; },
                    eachLayer: function() { return this; },
                    removeLayer: function() { return this; }
                };
            },
            tileLayer: function() {
                return { addTo: function() { return this; } };
            },
            marker: function() {
                return { 
                    addTo: function() { return this; },
                    bindPopup: function() { return this; }
                };
            },
            divIcon: function() { return {}; }
        };
    `;

    return new Response(js, {
        headers: { 'Content-Type': 'application/javascript' }
    });
}

// Create fallback for Fuse.js
function createFallbackFuse() {
    const js = `
        // Minimal Fuse.js fallback
        console.warn('Fuse.js not available offline - using simple search');
        window.Fuse = function(data, options) {
            this.search = function(query) {
                return data.filter(item => 
                    item.name.toLowerCase().includes(query.toLowerCase())
                ).map(item => ({ item }));
            };
        };
    `;

    return new Response(js, {
        headers: { 'Content-Type': 'application/javascript' }
    });
}

// Create placeholder image
function createPlaceholderImage() {
    const svg = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
            <defs>
                <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
                    <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" style="stroke:#e9ecef; stroke-width:1"/>
                </pattern>
            </defs>
            <rect width="300" height="200" fill="url(#diagonalHatch)" stroke="#dee2e6" stroke-width="2"/>
            <circle cx="150" cy="70" r="20" fill="#6c757d"/>
            <rect x="120" y="100" width="60" height="40" rx="5" fill="#6c757d"/>
            <text x="150" y="160" text-anchor="middle" fill="#6c757d" font-family="Arial, sans-serif" font-size="14">
                Image unavailable offline
            </text>
            <text x="150" y="180" text-anchor="middle" fill="#6c757d" font-family="Arial, sans-serif" font-size="24">
                📷
            </text>
        </svg>
    `;

    return new Response(svg, {
        headers: { 'Content-Type': 'image/svg+xml' }
    });
}

// Background sync for when connection returns
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    console.log('Service Worker: Performing background sync');
    try {
        // Sync any pending data or updates
        const pendingActions = await getPendingActions();
        for (const action of pendingActions) {
            await processPendingAction(action);
        }
        await clearPendingActions();
    } catch (error) {
        console.error('Service Worker: Background sync failed:', error);
    }
}

// Helper functions for background sync
async function getPendingActions() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const response = await cache.match('/pending-actions');
        return response ? await response.json() : [];
    } catch {
        return [];
    }
}

async function processPendingAction(action) {
    switch (action.type) {
        case 'add-recycling-center':
            console.log('Processing pending recycling center addition');
            break;
        case 'search-analytics':
            console.log('Processing pending analytics data');
            break;
        default:
            console.log('Unknown pending action type:', action.type);
    }
}

async function clearPendingActions() {
    const cache = await caches.open(CACHE_NAME);
    await cache.delete('/pending-actions');
}

// Message handling for communication with main app
self.addEventListener('message', event => {
    if (!event.data || typeof event.data !== 'object') return;
    
    const { type, payload } = event.data;
    
    switch (type) {
        case 'CACHE_RECYCLING_DATA':
            cacheRecyclingData(payload);
            break;
        case 'GET_OFFLINE_STATUS':
            if (event.ports && event.ports[0]) {
                event.ports[0].postMessage({ offline: !navigator.onLine });
            }
            break;
        case 'FORCE_UPDATE':
            forceUpdate();
            break;
        default:
            console.log('Service Worker: Unknown message type:', type);
    }
});

async function cacheRecyclingData(data) {
    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.put('/recycling-data', 
            new Response(JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            })
        );
        console.log('Service Worker: Recycling data cached successfully');
    } catch (error) {
        console.error('Service Worker: Failed to cache recycling data:', error);
    }
}

async function forceUpdate() {
    try {
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames.map(name => {
                if (name !== STATIC_CACHE_NAME && 
                    name !== DYNAMIC_CACHE_NAME && 
                    name !== CACHE_NAME) {
                    return caches.delete(name);
                }
            })
        );
        
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({ type: 'FORCE_RELOAD' });
        });
        
        console.log('Service Worker: Force update completed');
    } catch (error) {
        console.error('Service Worker: Force update failed:', error);
    }
}

// Error handling
self.addEventListener('error', event => {
    console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('Service Worker unhandled rejection:', event.reason);
    event.preventDefault();
});

console.log('Service Worker: Script loaded successfully v1.3');