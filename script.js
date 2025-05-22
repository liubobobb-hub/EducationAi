document.addEventListener('DOMContentLoaded', () => {
    const englishButton = document.getElementById('englishButton');
    const mathButton = document.getElementById('mathButton');
    const bennyMascot = document.getElementById('bennyMascot');
    const speechBubble = document.getElementById('speechBubble');

    // --- Sound Effects (Make sure you have these sound files) ---
    let clickSound;
    let welcomeSound;

    try {
        clickSound = new Audio('sounds/click.mp3'); // Generic click for buttons
        welcomeSound = new Audio('sounds/welcome_benny.mp3'); // Benny's welcome voice
    } catch (e) {
        console.warn("Could not load audio files. Make sure they are in the 'sounds' folder.", e);
        // Create dummy audio objects to prevent errors if files are missing
        clickSound = { play: () => {} };
        welcomeSound = { play: () => {} };
    }

    // --- Authentication Functions ---
    function isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    function getUsername() {
        return localStorage.getItem('username') || 'Friend';
    }

    function requireLogin(targetUrl) {
        if (!isLoggedIn()) {
            // Redirect to login page with return URL
            window.location.href = `login.html?returnUrl=${encodeURIComponent(targetUrl)}`;
            return false;
        }
        return true;
    }

    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    }

    // --- Update UI based on login state ---
    function updateUIForAuthState() {
        // Update speech bubble with personalized greeting if logged in
        if (speechBubble) {
            if (isLoggedIn()) {
                speechBubble.textContent = `Hi ${getUsername()}! Ready to continue learning?`;
            }
        }

        // Add login/logout link to header if not already present
        const header = document.querySelector('header');
        if (header) {
            // Check if auth link already exists
            let authLink = document.getElementById('authLink');
            
            if (!authLink) {
                authLink = document.createElement('a');
                authLink.id = 'authLink';
                authLink.style.marginLeft = '10px';
                authLink.className = 'parents-link';
                header.appendChild(authLink);
            }
            
            if (isLoggedIn()) {
                authLink.textContent = 'Logout';
                authLink.href = '#';
                authLink.onclick = (e) => {
                    e.preventDefault();
                    logout();
                };
            } else {
                authLink.textContent = 'Login';
                authLink.href = 'login.html';
                authLink.onclick = null;
            }
        }
    }

    // Call this function on page load
    updateUIForAuthState();

    // --- Event Listeners for Buttons ---
    if (englishButton) {
        englishButton.addEventListener('click', (event) => {
            // event.preventDefault(); // Prevent immediate navigation if you want to do something else first
            playSound(clickSound);
            console.log("English button clicked!");
            // Actual navigation will happen via the href in HTML.
            // If this were a single-page app, you'd load content here.
        });
    }

    if (mathButton) {
        mathButton.addEventListener('click', (event) => {
            // event.preventDefault();
            playSound(clickSound);
            console.log("Math button clicked!");
            // Actual navigation will happen via the href in HTML.
        });
    }

    // --- Activity Protection ---
    // Get all activity links and add click handlers to check login status
    const activityLinks = document.querySelectorAll('.activity-card');
    activityLinks.forEach(link => {
        const originalHref = link.getAttribute('href');
        if (originalHref) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                if (requireLogin(originalHref)) {
                    window.location.href = originalHref;
                }
            });
        }
    });

    // --- Mascot Interaction ---
    // Play welcome sound when mascot is visible (or after a short delay)
    // You might want a more sophisticated trigger, e.g., after images load
    setTimeout(() => {
        playSound(welcomeSound);
    }, 500); // Play after 0.5 seconds

    // Example: Change speech bubble text on mascot hover (optional)
    if (bennyMascot && speechBubble) {
        bennyMascot.addEventListener('mouseenter', () => {
            // speechBubble.textContent = "Let's pick a fun subject!";
        });
        bennyMascot.addEventListener('mouseleave', () => {
            // speechBubble.textContent = "Hi! I'm Benny the Bunny! Ready to learn?";
        });
    }

    // --- Helper function to play sound ---
    function playSound(sound) {
        if (sound && typeof sound.play === 'function') {
            sound.currentTime = 0; // Rewind to start if already playing
            sound.play().catch(error => console.error("Error playing sound:", error));
        }
    }
});