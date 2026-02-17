const lessonText = "ll ss ssll slsl lsssl slls lsll ssl llss ssll slsl llsslsll ssl ssll slsl lsll";

let currentIndex = 0;
let correctChars = 0;
let totalChars = 0;
let startTime = null;
let errors = 0;

const textContent = document.getElementById('textContent');
const progressFill = document.getElementById('progressFill');
const modalOverlay = document.getElementById('modalOverlay');

// Finger mapping with color classes
const fingerMap = {
    's': { id: 'leftRing', colorClass: 'active-ring' },
    'l': { id: 'rightRing', colorClass: 'active-ring' },
    ' ': { id: 'thumb', colorClass: 'active' }
};

// Initialize the lesson
function initLesson() {
    textContent.innerHTML = '';
    lessonText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'char';
        if (index === 0) span.classList.add('current');
        textContent.appendChild(span);
    });
    updateFingerHighlight();
}

// Update finger highlight based on current character
function updateFingerHighlight() {
    // Remove all active classes from fingers and thumbs
    document.querySelectorAll('.finger').forEach(f => {
        f.classList.remove('active', 'active-pinky', 'active-ring', 'active-middle', 'active-index');
    });
    document.querySelectorAll('.thumb').forEach(t => {
        t.classList.remove('active');
    });
    
    if (currentIndex < lessonText.length) {
        const currentChar = lessonText[currentIndex].toLowerCase();
        const fingerInfo = fingerMap[currentChar];
        
        if (fingerInfo) {
            if (fingerInfo.id === 'thumb') {
                // Highlight both thumbs for space
                document.getElementById('leftThumb').classList.add(fingerInfo.colorClass);
                document.getElementById('rightThumb').classList.add(fingerInfo.colorClass);
            } else {
                // Highlight specific finger
                const finger = document.getElementById(fingerInfo.id);
                if (finger) {
                    finger.classList.add('active', fingerInfo.colorClass);
                }
            }
        }
    }
}

// Update progress bar
function updateProgress() {
    const progress = (currentIndex / lessonText.length) * 100;
    progressFill.style.width = progress + '%';
}

// Handle keypress
document.addEventListener('keydown', (e) => {
    // Prevent space from scrolling
    if (e.key === ' ') {
        e.preventDefault();
    }

    if (currentIndex >= lessonText.length) return;
    
    // Start timer on first keypress
    if (startTime === null) {
        startTime = Date.now();
    }

    const expectedChar = lessonText[currentIndex];
    const chars = textContent.querySelectorAll('.char');
    
    // Check if the pressed key matches (handle space separately)
    const pressedKey = e.key;
    const matches = (expectedChar === ' ' && pressedKey === ' ') || 
                  (expectedChar !== ' ' && pressedKey.toLowerCase() === expectedChar.toLowerCase());
    
    if (matches) {
        chars[currentIndex].classList.remove('current');
        chars[currentIndex].classList.add('typed');
        correctChars++;
        currentIndex++;
    } else {
        chars[currentIndex].classList.add('incorrect');
        setTimeout(() => {
            chars[currentIndex].classList.remove('incorrect');
        }, 300);
        errors++;
    }
    
    totalChars++;

    // Move to next character
    if (currentIndex < lessonText.length) {
        chars[currentIndex].classList.add('current');
        updateFingerHighlight();
    }

    updateProgress();

    // Check if lesson is complete
    if (currentIndex >= lessonText.length) {
        completeLesson();
    }
});

// Complete the lesson
function completeLesson() {
    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 60000;
    const wordsTyped = lessonText.length / 5;
    const wpm = Math.round(wordsTyped / timeInMinutes);
    const accuracy = Math.round((correctChars / totalChars) * 100);

    document.getElementById('wpmValue').textContent = wpm;
    document.getElementById('accuracyValue').textContent = accuracy;

    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 500);
}

// Restart lesson
function restartLesson() {
    currentIndex = 0;
    correctChars = 0;
    totalChars = 0;
    errors = 0;
    startTime = null;
    modalOverlay.classList.remove('active');
    progressFill.style.width = '0%';
    initLesson();
}

// Next lesson (placeholder)
function nextLesson() {
    const nextLevelPath = "";

    if (!nextLevelPath || nextLevelPath.trim() === "") {
        alert("🚀 Coming Soon! More levels are on the way.");
        return;
    }

    // Redirect to next level
    window.location.href = nextLevelPath;
}


// Initialize on load
initLesson();
