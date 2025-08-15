// Enhanced Recycling Database with detailed instructions
const recyclingDatabase = [
    {
        name: "plastic bottle",
        category: "Recyclable - Dry Waste",
        icon: "fas fa-bottle-water",
        color: "#3498db",
        instructions: [
            "Empty all contents completely",
            "Rinse with water to remove residue",
            "Leave the cap on (caps are recyclable too)",
            "Remove any labels if they peel off easily",
            "Place in your recycling bin"
        ],
        tips: "Plastic bottles can be recycled 7-9 times before the material degrades.",
        doNots: ["Don't crush vertically", "Don't remove caps", "Don't mix with other plastics"]
    },
    {
        name: "water bottle",
        category: "Recyclable - Dry Waste",
        icon: "fas fa-bottle-water",
        color: "#3498db",
        instructions: [
            "Empty completely and rinse",
            "Keep the cap attached",
            "Check for recycling number (usually #1)",
            "Place in plastic recycling bin"
        ],
        tips: "Single-use plastic bottles take 450+ years to decompose naturally.",
        doNots: ["Don't reuse single-use bottles multiple times", "Don't put in microwave"]
    },
    {
        name: "battery",
        category: "Hazardous Waste",
        icon: "fas fa-battery-full",
        color: "#e74c3c",
        instructions: [
            "Never put in regular trash or recycling",
            "Take to a designated battery collection point",
            "Many electronics stores accept batteries",
            "Keep terminals covered with tape",
            "Store in a cool, dry place until disposal"
        ],
        tips: "Batteries contain toxic materials that can harm the environment if not disposed of properly.",
        doNots: ["Never throw in regular trash", "Don't mix different battery types", "Don't store damaged batteries"]
    },
    {
        name: "cardboard box",
        category: "Recyclable - Dry Waste",
        icon: "fas fa-box",
        color: "#8e44ad",
        instructions: [
            "Remove all contents",
            "Remove tape, labels, and staples",
            "Flatten the box to save space",
            "Keep dry - wet cardboard can't be recycled",
            "Place with other paper recyclables"
        ],
        tips: "Cardboard can be recycled 5-7 times before fibers become too short.",
        doNots: ["Don't recycle if greasy or food-stained", "Don't include wax-coated cardboard", "Don't leave tape attached"]
    },
    {
        name: "cardboard",
        category: "Recyclable - Dry Waste",
        icon: "fas fa-box",
        color: "#8e44ad",
        instructions: [
            "Remove all tape and staples",
            "Flatten to save space",
            "Keep clean and dry",
            "Separate from other materials"
        ],
        tips: "Corrugated cardboard is one of the most recycled materials in the world.",
        doNots: ["Don't recycle pizza boxes with grease stains", "Don't include waxed cardboard"]
    },
    {
        name: "glass jar",
        category: "Recyclable - Dry Waste",
        icon: "fas fa-jar",
        color: "#27ae60",
        instructions: [
            "Rinse to remove food residue",
            "Remove metal lids (recycle separately)",
            "Remove paper labels if possible",
            "Don't worry about small amounts of residue",
            "Place in glass recycling bin"
        ],
        tips: "Glass can be recycled infinitely without losing quality!",
        doNots: ["Don't include drinking glasses", "Don't include light bulbs", "Don't include mirrors"]
    },
    {
        name: "glass bottle",
        category: "Recyclable - Dry Waste",
        icon: "fas fa-wine-bottle",
        color: "#27ae60",
        instructions: [
            "Empty completely",
            "Rinse out any residue",
            "Remove caps and corks",
            "Labels can stay on",
            "Sort by color if required locally"
        ],
        tips: "Recycling one glass bottle saves enough energy to power a light bulb for 4 hours.",
        doNots: ["Don't include window glass", "Don't include ceramic items", "Don't break before recycling"]
    },
    {
        name: "electronics",
        category: "Hazardous Waste (E-waste)",
        icon: "fas fa-mobile-alt",
        color: "#f39c12",
        instructions: [
            "Remove all personal data",
            "Remove batteries if possible",
            "Take to certified e-waste recycler",
            "Many retailers offer take-back programs",
            "Check for manufacturer recycling programs"
        ],
        tips: "E-waste contains valuable metals like gold, silver, and copper that can be recovered.",
        doNots: ["Never throw in regular trash", "Don't break apart devices", "Don't forget to wipe personal data"]
    },
    {
        name: "phone",
        category: "Hazardous Waste (E-waste)",
        icon: "fas fa-mobile",
        color: "#f39c12",
        instructions: [
            "Backup and wipe all personal data",
            "Remove SIM and memory cards",
            "Take to phone retailer or e-waste center",
            "Consider donation if still functional"
        ],
        tips: "Old phones contain rare earth metals that are valuable for recycling.",
        doNots: ["Don't throw in regular trash", "Don't forget to remove personal data", "Don't break the screen intentionally"]
    },
    {
        name: "aluminum can",
        category: "Recyclable - Dry Waste",
        icon: "fas fa-can-food",
        color: "#95a5a6",
        instructions: [
            "Empty completely",
            "Rinse briefly",
            "Crushing is optional but saves space",
            "Place in metal recycling bin"
        ],
        tips: "Aluminum cans can be recycled and back on store shelves within 60 days.",
        doNots: ["Don't mix with steel cans", "Don't leave liquid inside"]
    },
    {
        name: "tin can",
        category: "Recyclable - Dry Waste",
        icon: "fas fa-can-food",
        color: "#7f8c8d",
        instructions: [
            "Remove all food contents",
            "Rinse thoroughly",
            "Remove paper labels",
            "Leave sharp edges - don't worry about them"
        ],
        tips: "Steel cans (tin cans) are 100% recyclable and can become new cans, cars, or appliances.",
        doNots: ["Don't leave food residue", "Don't crush completely flat"]
    },
    {
        name: "newspaper",
        category: "Recyclable - Dry Waste",
        icon: "fas fa-newspaper",
        color: "#34495e",
        instructions: [
            "Keep clean and dry",
            "Remove any plastic bags or wrapping",
            "Bundle or place loose in paper recycling"
        ],
        tips: "Newspaper can be recycled up to 7 times before fibers become too short.",
        doNots: ["Don't include if wet or moldy", "Don't mix with magazines (different paper types)"]
    },
    {
        name: "magazine",
        category: "Recyclable - Dry Waste",
        icon: "fas fa-book-open",
        color: "#9b59b6",
        instructions: [
            "Remove plastic wrapping",
            "Keep pages together",
            "Glossy pages are recyclable",
            "Place with mixed paper recycling"
        ],
        tips: "Magazine paper has a higher quality than newspaper and can be recycled into new magazines.",
        doNots: ["Don't remove staples (recycling facilities can handle them)", "Don't separate pages"]
    },
    {
        name: "styrofoam",
        category: "General Waste",
        icon: "fas fa-cube",
        color: "#95a5a6",
        instructions: [
            "Check if your area has special styrofoam recycling",
            "Some shipping stores accept clean styrofoam",
            "Otherwise, dispose in regular trash",
            "Consider reusing for storage or shipping"
        ],
        tips: "Styrofoam takes 500+ years to decompose. Look for biodegradable alternatives.",
        doNots: ["Don't put in regular recycling", "Don't break into small pieces", "Don't burn"]
    },
    {
        name: "light bulb",
        category: "Hazardous Waste",
        icon: "fas fa-lightbulb",
        color: "#f1c40f",
        instructions: [
            "Different types require different disposal methods",
            "LED and incandescent: some retailers accept",
            "CFL and fluorescent: hazardous waste facility",
            "Never break bulbs during disposal"
        ],
        tips: "CFLs contain small amounts of mercury and must be handled as hazardous waste.",
        doNots: ["Don't throw any bulbs in regular trash", "Don't break bulbs", "Don't mix different bulb types"]
    },
    {
        name: "pizza box",
        category: "Compostable (if greasy)",
        icon: "fas fa-pizza-slice",
        color: "#e67e22",
        instructions: [
            "Remove any leftover food",
            "If top is clean, tear off and recycle",
            "Greasy bottom should be composted",
            "Or dispose greasy parts in regular trash"
        ],
        tips: "The clean parts of pizza boxes are recyclable, but grease contamination makes parts non-recyclable.",
        doNots: ["Don't recycle the entire box if greasy", "Don't leave food attached"]
    },
    {
        name: "plastic bag",
        category: "Recyclable - Dry Waste (check local)",
        icon: "fas fa-shopping-bag",
        color: "#16a085",
        instructions: [
            "Don't put in curbside recycling bins",
            "Take to grocery store collection bins",
            "Make sure bags are clean and dry",
            "Include other flexible plastics like bread bags"
        ],
        tips: "Plastic bags clog sorting machinery at recycling facilities.",
        doNots: ["Never put in curbside recycling", "Don't include food-contaminated bags", "Don't mix with other recyclables"]
    }
];

// Fuzzy search setup - Only initialize if Fuse is available
let fuse;
if (typeof Fuse !== 'undefined') {
    const fuseOptions = {
        keys: ['name', 'category'],
        threshold: 0.4,
        includeScore: true,
        includeMatches: true
    };
    fuse = new Fuse(recyclingDatabase, fuseOptions);
}

// User data management - Use in-memory storage instead of localStorage for safety
let userData = {
    points: 0,
    itemsRecycled: 0,
    streak: 0,
    level: 1,
    lastRecycleDate: null
};

// Try to load from localStorage if available
try {
    if (typeof Storage !== 'undefined') {
        userData.points = parseInt(localStorage.getItem('recyclingPoints') || '0');
        userData.itemsRecycled = parseInt(localStorage.getItem('itemsRecycled') || '0');
        userData.streak = parseInt(localStorage.getItem('streakDays') || '0');
        userData.level = Math.floor(userData.points / 100) + 1;
        userData.lastRecycleDate = localStorage.getItem('lastRecycleDate') || null;
    }
} catch (e) {
    console.warn('localStorage not available, using in-memory storage');
}

// PWA and offline functionality
let deferredPrompt;
let isOnline = navigator.onLine;
let videoStream;
let map, userMarker;
let recyclingCenters = [];

// Try to load recycling centers from localStorage
try {
    if (typeof Storage !== 'undefined') {
        recyclingCenters = JSON.parse(localStorage.getItem('recyclingCenters') || '[]');
    }
} catch (e) {
    console.warn('Could not load recycling centers from storage');
}

// Voice recognition
let recognition;
let isListening = false;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    updateUserProfile();
    initMap();
    setupPWA();
    setupOfflineDetection();
    setupVoiceSearch();
    setupEventListeners();
    
    // Register service worker if available
    if ('serviceWorker' in navigator) {
        registerServiceWorker();
    }
});

// Event listeners
function setupEventListeners() {
    // Enter key for search
    const itemInput = document.getElementById('itemInput');
    if (itemInput) {
        itemInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchItem();
            }
        });
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// User profile and gamification functions
function updateUserProfile() {
    const pointsEl = document.getElementById('userPoints');
    const itemsEl = document.getElementById('itemsRecycled');
    const streakEl = document.getElementById('streakDays');
    const levelEl = document.getElementById('userLevel');

    if (pointsEl) pointsEl.textContent = userData.points;
    if (itemsEl) itemsEl.textContent = userData.itemsRecycled;
    if (streakEl) streakEl.textContent = userData.streak;
    if (levelEl) levelEl.textContent = userData.level;
}

function addPoints(points) {
    userData.points += points;
    userData.itemsRecycled++;
    userData.level = Math.floor(userData.points / 100) + 1;
    
    // Update streak
    const today = new Date().toDateString();
    if (userData.lastRecycleDate !== today) {
        userData.streak++;
        userData.lastRecycleDate = today;
    }

    // Save to localStorage if available
    try {
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('recyclingPoints', userData.points.toString());
            localStorage.setItem('itemsRecycled', userData.itemsRecycled.toString());
            localStorage.setItem('streakDays', userData.streak.toString());
            localStorage.setItem('lastRecycleDate', userData.lastRecycleDate);
        }
    } catch (e) {
        console.warn('Could not save to localStorage');
    }

    updateUserProfile();
    showPointsAnimation(points);
}

function showPointsAnimation(points) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    popup.className = 'points-popup';
    popup.innerHTML = `<i class="fas fa-star"></i> +${points} points earned!`;
    
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
}

// Enhanced search function with fuzzy matching
function searchItem() {
    const input = document.getElementById('itemInput');
    const resultDiv = document.getElementById('result');
    
    if (!input || !resultDiv) return;
    
    const searchTerm = input.value.toLowerCase().trim();
    if (!searchTerm) return;

    let results = [];
    
    // Use Fuse.js if available, otherwise fall back to simple search
    if (fuse) {
        results = fuse.search(searchTerm);
    } else {
        // Simple fallback search
        results = recyclingDatabase
            .filter(item => 
                item.name.toLowerCase().includes(searchTerm) || 
                item.category.toLowerCase().includes(searchTerm)
            )
            .map(item => ({ item })); // Match Fuse.js structure
    }
    
    if (results.length > 0) {
        const item = results[0].item;
        displayItemResult(item);
        addPoints(10); // Award points for successful search
    } else {
        resultDiv.innerHTML = `
            <div class="result-card" style="border-left-color: #f39c12; background: #fff3cd;">
                <div class="result-header">
                    <div class="result-icon" style="background: #f39c12;">
                        <i class="fas fa-question"></i>
                    </div>
                    <div>
                        <h3 style="margin: 0; color: #f39c12;">Item not found</h3>
                        <p style="margin: 5px 0; color: #856404;">We couldn't find specific information for "${searchTerm}"</p>
                    </div>
                </div>
                <p>Try searching for these similar items:</p>
                <div class="search-suggestions">
                    ${getSearchSuggestions(searchTerm).map(suggestion => 
                        `<span class="suggestion-chip" onclick="searchSuggestion('${suggestion}')">${suggestion}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }
}

function displayItemResult(item) {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;
    
    resultDiv.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <div class="result-icon" style="background: ${item.color};">
                    <i class="${item.icon}"></i>
                </div>
                <div>
                    <h3 style="margin: 0; color: ${item.color}; text-transform: uppercase;">${item.name}</h3>
                    <p style="margin: 5px 0; color: #7f8c8d; font-weight: 500;">${item.category}</p>
                </div>
            </div>
            
            <div style="margin: 20px 0;">
                <h4 style="color: #2c3e50; margin-bottom: 15px;"><i class="fas fa-list-ul"></i> Recycling Instructions:</h4>
                <ul class="instructions-list">
                    ${item.instructions.map(instruction => 
                        `<li><i class="fas fa-check" style="color: #27ae60;"></i> ${instruction}</li>`
                    ).join('')}
                </ul>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #17a2b8;">
                <h4 style="margin-top: 0; color: #17a2b8;"><i class="fas fa-lightbulb"></i> Environmental Tip</h4>
                <p style="margin-bottom: 0; color: #495057;">${item.tips}</p>
            </div>

            <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 20px; border-radius: 10px; border-left: 4px solid #dc3545;">
                <h4 style="margin-top: 0; color: #721c24;"><i class="fas fa-exclamation-triangle"></i> Important Don'ts</h4>
                <ul style="margin-bottom: 0; color: #721c24;">
                    ${item.doNots.map(dont => `<li style="margin: 5px 0;">${dont}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    // Highlight relevant recycling centers
    if (map) {
        highlightRelevantCenters(item.category);
    }
}

function getSearchSuggestions(input) {
    // Get items that partially match the input
    const suggestions = recyclingDatabase
        .filter(item => item.name.includes(input) || input.includes(item.name.split(' ')[0]))
        .map(item => item.name)
        .slice(0, 5);
    
    // If no partial matches, return popular items
    if (suggestions.length === 0) {
        return ['plastic bottle', 'cardboard', 'glass jar', 'battery', 'aluminum can'];
    }
    
    return suggestions;
}

function searchSuggestion(term) {
    const input = document.getElementById('itemInput');
    if (input) {
        input.value = term;
        searchItem();
    }
}

// Voice search implementation
function setupVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) voiceBtn.style.display = 'none';
        return;
    }

    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            isListening = true;
            const voiceBtn = document.getElementById('voiceBtn');
            if (voiceBtn) {
                voiceBtn.classList.add('listening');
                voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                voiceBtn.title = 'Listening... Click to stop';
            }
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            const input = document.getElementById('itemInput');
            if (input) {
                input.value = transcript;
                searchItem();
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopVoiceSearch();
            alert('Voice recognition failed. Please try again or type your query.');
        };

        recognition.onend = () => {
            stopVoiceSearch();
        };
    } catch (error) {
        console.warn('Speech recognition not available:', error);
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) voiceBtn.style.display = 'none';
    }
}

function startVoiceSearch() {
    if (!recognition) {
        alert('Voice search is not supported in your browser.');
        return;
    }

    if (isListening) {
        recognition.stop();
        return;
    }

    try {
        recognition.start();
    } catch (error) {
        console.error('Error starting voice recognition:', error);
        alert('Could not start voice recognition. Please try again.');
    }
}

function stopVoiceSearch() {
    isListening = false;
    const voiceBtn = document.getElementById('voiceBtn');
    if (voiceBtn) {
        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.title = 'Voice Search';
    }
}

// Camera and image recognition functions
function startCamera() {
    const video = document.getElementById('video');
    if (!video) return;
    
    video.style.display = 'block';
    
    // Prefer rear camera, fallback to any camera
    const constraints = {
        video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }
    };
    
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            videoStream = stream;
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            // Fallback: try without facingMode
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    videoStream = stream;
                    video.srcObject = stream;
                    video.play();
                })
                .catch(err2 => {
                    alert("Camera access failed. Please check permissions and try again.");
                    console.error("Error accessing camera: ", err2);
                });
        });
}

function stopCamera() {
    const video = document.getElementById('video');
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
    }
    if (video) {
        video.style.display = 'none';
        video.srcObject = null;
    }
}

async function captureImage() {
    const canvas = document.getElementById('canvas');
    const video = document.getElementById('video');
    
    if (!canvas || !video) return;
    
    const context = canvas.getContext('2d');
    
    if (video.videoWidth === 0) {
        alert('Please start the camera first.');
        return;
    }
    
    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Show the captured image
    canvas.style.display = 'block';
    
    // Run basic analysis (since we removed Teachable Machine)
    await analyzeImage(canvas);
}

async function analyzeUploadedImage() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    
    if (!file) return;
    
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        canvas.style.display = 'block';
        
        await analyzeImage(canvas);
    };
    
    img.src = URL.createObjectURL(file);
}

async function analyzeImage(canvas) {
    const imageResult = document.getElementById('imageResult');
    if (!imageResult) return;
    
    // Check if TensorFlow.js and COCO-SSD are loaded
    if (typeof tf === 'undefined' || typeof cocoSsd === 'undefined') {
        imageResult.innerHTML = `
            <div class="prediction-result error">
                <i class="fas fa-exclamation-triangle"></i>
                AI model not loaded. Please check your internet connection.
            </div>
        `;
        return;
    }
    
    try {
        // Load COCO-SSD model
        const model = await cocoSsd.load();
        
        // Convert canvas to tensor
        const tensor = tf.browser.fromPixels(canvas);
        
        // Detect objects
        const predictions = await model.detect(tensor);
        
        // Sort predictions by score
        predictions.sort((a, b) => b.score - a.score);
        
        // Find matching recycling item
        const topPrediction = predictions[0];
        const matchingItem = recyclingDatabase.find(item => 
            topPrediction.class.toLowerCase().includes(item.name.toLowerCase())
        );
        
        const confidence = Math.round(topPrediction.score * 100);
        
        imageResult.innerHTML = `
            <div class="prediction-result">
                <h4><i class="fas fa-robot"></i> AI Analysis Result</h4>
                <p><strong>Detected:</strong> ${topPrediction.class}</p>
                <p><strong>Confidence:</strong> ${confidence}%</p>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${confidence}%"></div>
                </div>
                ${matchingItem ? `
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.3);">
                        <p><strong>Recycling Category:</strong> ${matchingItem.category}</p>
                        <button onclick="searchSuggestion('${matchingItem.name}')" style="margin-top: 10px; background: white; color: #667eea;">
                            <i class="fas fa-info-circle"></i> View Recycling Instructions
                        </button>
                    </div>
                ` : `
                    <p style="margin-top: 15px; opacity: 0.9;">
                        <i class="fas fa-search"></i> Try searching manually for more specific instructions.
                    </p>
                `}
                <div style="margin-top: 15px; font-size: 0.8em; opacity: 0.7;">
                    <p>Top Predictions:</p>
                    ${predictions.slice(0, 3).map(pred => 
                        `<p>${pred.class}: ${Math.round(pred.score * 100)}%</p>`
                    ).join('')}
                </div>
            </div>
        `;
        
        // Clean up tensor to prevent memory leaks
        tensor.dispose();
        
        if (matchingItem) {
            addPoints(15); // Higher points for using AI
            
            // Highlight relevant recycling centers
            if (map) {
                highlightRelevantCenters(matchingItem.category);
            }
        }
    } catch (error) {
        console.error('Image analysis error:', error);
        imageResult.innerHTML = `
            <div class="prediction-result error">
                <i class="fas fa-exclamation-triangle"></i>
                Image analysis failed. Please try again.
            </div>
        `;
    }
}

// Map and location functions
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement || typeof L === 'undefined') {
        console.warn('Map not available - Leaflet not loaded');
        return;
    }

    const defaultCoords = [34.0837, -118.4233]; // Los Angeles as default
    map = L.map('map').setView(defaultCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    getUserLocation();
    loadRecyclingCenters();
}

function getUserLocation() {
    const locationDiv = document.getElementById('userLocation');
    if (!locationDiv) return;
    
    if (!navigator.geolocation) {
        locationDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i> 
            Geolocation not supported. Showing default location.
        `;
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userCoords = [position.coords.latitude, position.coords.longitude];
            if (map) {
                map.setView(userCoords, 14);
                
                if (userMarker) {
                    map.removeLayer(userMarker);
                }
                
                userMarker = L.marker(userCoords, {
                    icon: L.divIcon({
                        html: '<i class="fas fa-map-pin" style="color: #e74c3c; font-size: 20px;"></i>',
                        iconSize: [20, 20],
                        className: 'custom-div-icon'
                    })
                }).addTo(map);
                
                // Reverse geocoding to get address
                fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${userCoords[0]}&lon=${userCoords[1]}`)
                    .then(response => response.json())
                    .then(data => {
                        const address = data.display_name || 'Your Location';
                        userMarker.bindPopup(`<b>Your Location</b><br>${address}`);
                        locationDiv.innerHTML = `
                            <i class="fas fa-map-marker-alt"></i> 
                            Your Location: <span style="opacity: 0.9;">${address.split(',').slice(0, 3).join(', ')}</span>
                        `;
                    })
                    .catch(() => {
                        locationDiv.innerHTML = `
                            <i class="fas fa-map-marker-alt"></i> 
                            Location detected but address unavailable
                        `;
                    });
                
                // Add some sample recycling centers nearby
                addSampleRecyclingCenters(userCoords);
            }
        },
        () => {
            locationDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i> 
                Location access denied. Showing default area.
            `;
            addSampleRecyclingCenters([34.0837, -118.4233]);
        }
    );
}

function addSampleRecyclingCenters(centerCoords) {
    if (!map) return;
    
    const sampleCenters = [
        {
            name: "Green Earth Recycling Center",
            type: "general",
            coords: [centerCoords[0] + 0.01, centerCoords[1] + 0.01],
            address: "123 Eco Street",
            hours: "Mon-Sat 8AM-6PM",
            phone: "(555) 123-4567"
        },
        {
            name: "TechWaste Solutions",
            type: "ewaste",
            coords: [centerCoords[0] - 0.01, centerCoords[1] + 0.015],
            address: "456 Digital Ave",
            hours: "Tue-Fri 9AM-5PM",
            phone: "(555) 987-6543"
        },
        {
            name: "HazMat Disposal Facility",
            type: "hazardous",
            coords: [centerCoords[0] + 0.015, centerCoords[1] - 0.01],
            address: "789 Safety Blvd",
            hours: "Wed-Sat 10AM-4PM",
            phone: "(555) 456-7890"
        },
        {
            name: "Community Compost Hub",
            type: "organic",
            coords: [centerCoords[0] - 0.005, centerCoords[1] - 0.015],
            address: "321 Garden Way",
            hours: "Daily 7AM-7PM",
            phone: "(555) 246-8135"
        }
    ];

    sampleCenters.forEach(center => {
        addRecyclingCenterToMap(center);
    });
}

function addRecyclingCenterToMap(center) {
    if (!map || typeof L === 'undefined') return;
    
    const icons = {
        general: '<i class="fas fa-recycle" style="color: #2ecc71; font-size: 16px;"></i>',
        ewaste: '<i class="fas fa-laptop" style="color: #f39c12; font-size: 16px;"></i>',
        hazardous: '<i class="fas fa-exclamation-triangle" style="color: #e74c3c; font-size: 16px;"></i>',
        organic: '<i class="fas fa-leaf" style="color: #27ae60; font-size: 16px;"></i>'
    };

    const marker = L.marker(center.coords, {
        icon: L.divIcon({
            html: icons[center.type],
            iconSize: [30, 30],
            className: 'recycling-center-icon'
        })
    }).addTo(map);

    const popupContent = `
        <div style="min-width: 200px;">
            <h4 style="margin: 0 0 10px 0; color: #2c3e50;">${center.name}</h4>
            <p style="margin: 5px 0;"><i class="fas fa-map-marker-alt"></i> ${center.address}</p>
            <p style="margin: 5px 0;"><i class="fas fa-clock"></i> ${center.hours}</p>
            <p style="margin: 5px 0;"><i class="fas fa-phone"></i> ${center.phone}</p>
            <p style="margin: 10px 0 5px 0; font-weight: 600; color: #3498db;">
                Type: ${center.type.charAt(0).toUpperCase() + center.type.slice(1)} Recycling
            </p>
        </div>
    `;

    marker.bindPopup(popupContent);
    marker.centerData = center; // Store center data for filtering
}

function loadRecyclingCenters() {
    if (!map) return;
    
    recyclingCenters.forEach(center => {
        addRecyclingCenterToMap(center);
    });
}

function filterCenters(type) {
    if (!map) return;
    
    // Remove existing center markers (except user marker)
    map.eachLayer(layer => {
        if (layer.centerData) {
            if (type === 'all' || layer.centerData.type === type) {
                layer.setOpacity(1);
            } else {
                layer.setOpacity(0.3);
            }
        }
    });
}

function highlightRelevantCenters(itemCategory) {
    if (!map) return;
    
    // Mapping item categories to center types
    const categoryMapping = {
        'Recyclable - Dry Waste': 'general',
        'Hazardous Waste': 'hazardous',
        'Hazardous Waste (E-waste)': 'ewaste',
        'Compostable': 'organic',
        'General Waste': 'general'
    };

    const centerType = categoryMapping[itemCategory] || 'general';
    
    // Reset all markers first
    map.eachLayer(layer => {
        if (layer.centerData) {
            // Fully highlight matching centers, slightly dim others
            if (layer.centerData.type === centerType) {
                layer.setOpacity(1);
                // Add a special highlight style
                layer.getElement().classList.add('center-highlight');
            } else {
                layer.setOpacity(0.3);
                layer.getElement().classList.remove('center-highlight');
            }
        }
    });

    // Zoom to first matching center if exists
    const matchingCenters = recyclingCenters.filter(center => center.type === centerType);
    if (matchingCenters.length > 0) {
        const firstCenter = matchingCenters[0];
        map.setView(firstCenter.coords, 13);
    }
}

// Modal functions for adding new centers
function showAddCenterForm() {
    const modal = document.getElementById('addCenterModal');
    if (modal) modal.style.display = 'block';
}

function closeAddCenterForm() {
    const modal = document.getElementById('addCenterModal');
    const form = document.getElementById('addCenterForm');
    if (modal) modal.style.display = 'none';
    if (form) form.reset();
}

function addRecyclingCenter(event) {
    event.preventDefault();
    
    const name = document.getElementById('centerName')?.value;
    const address = document.getElementById('centerAddress')?.value;
    const type = document.getElementById('centerType')?.value;
    const notes = document.getElementById('centerNotes')?.value;

    if (!name || !address || !type) {
        alert('Please fill in all required fields.');
        return;
    }

    // Geocode the address
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                
                const newCenter = {
                    name,
                    type,
                    coords,
                    address,
                    hours: "Hours not specified",
                    phone: "Contact not provided",
                    notes,
                    userAdded: true
                };

                // Add to map
                addRecyclingCenterToMap(newCenter);
                
                // Save to localStorage if available
                recyclingCenters.push(newCenter);
                try {
                    if (typeof Storage !== 'undefined') {
                        localStorage.setItem('recyclingCenters', JSON.stringify(recyclingCenters));
                    }
                } catch (e) {
                    console.warn('Could not save to localStorage');
                }
                
                // Award points for community contribution
                addPoints(25);
                
                closeAddCenterForm();
                
                // Show success message
                alert('Thank you for contributing! The new recycling center has been added.');
            } else {
                alert('Address not found. Please try a different address.');
            }
        })
        .catch(error => {
            console.error('Geocoding error:', error);
            alert('Error adding center. Please try again.');
        });
}

// PWA functionality
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered successfully');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    }
}

function setupPWA() {
    // Install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const installPrompt = document.getElementById('installPrompt');
        if (installPrompt) installPrompt.style.display = 'flex';
    });
    
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        const installPrompt = document.getElementById('installPrompt');
        if (installPrompt) installPrompt.style.display = 'none';
    });
}

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
        });
    }
}

function dismissInstallPrompt() {
    const installPrompt = document.getElementById('installPrompt');
    if (installPrompt) installPrompt.style.display = 'none';
    deferredPrompt = null;
}

// Offline detection
function setupOfflineDetection() {
    function updateOnlineStatus() {
        const offlineIndicator = document.getElementById('offlineIndicator');
        if (!offlineIndicator) return;
        
        if (navigator.onLine) {
            offlineIndicator.style.display = 'none';
            isOnline = true;
        } else {
            offlineIndicator.style.display = 'block';
            isOnline = false;
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus(); // Initial check
}

// Export functions for global access
window.searchItem = searchItem;
window.searchSuggestion = searchSuggestion;
window.startVoiceSearch = startVoiceSearch;
window.startCamera = startCamera;
window.stopCamera = stopCamera;
window.captureImage = captureImage;
window.analyzeUploadedImage = analyzeUploadedImage;
window.filterCenters = filterCenters;
window.showAddCenterForm = showAddCenterForm;
window.closeAddCenterForm = closeAddCenterForm;
window.addRecyclingCenter = addRecyclingCenter;
window.installApp = installApp;
window.dismissInstallPrompt = dismissInstallPrompt;