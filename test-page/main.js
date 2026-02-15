
// list of random paragraphs for generation
const paragraphs = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. Practice makes perfect when it comes to typing speed and accuracy. Keep your fingers on the home row and maintain good posture.",

    "Technology has revolutionized the way we communicate and work. From smartphones to artificial intelligence, innovation continues to shape our future. Staying adaptable and learning new skills is essential in this digital age.",

    "Reading books opens up new worlds of imagination and knowledge. Whether fiction or non-fiction, each page turns into an adventure. Libraries and digital platforms have made literature more accessible than ever before.",

    "Healthy eating habits contribute to overall well-being and energy levels. Fresh fruits, vegetables, and whole grains provide essential nutrients. Regular exercise combined with balanced nutrition leads to a better quality of life.",

    "The art of programming requires logical thinking and problem-solving skills. Learning to code opens doors to countless career opportunities. From web development to machine learning, the possibilities are endless in the tech world.",

    "Music has the power to evoke emotions and bring people together. Different genres offer unique experiences and cultural insights. Playing an instrument or simply listening can be therapeutic and enriching.",

    "Travel broadens perspectives and creates lasting memories. Exploring new cultures and cuisines enhances personal growth. Whether near or far, every journey teaches valuable life lessons and appreciation for diversity.",

    "Climate change poses significant challenges for future generations. Sustainable practices and renewable energy sources are crucial for environmental protection. Individual actions, when combined, can make a meaningful difference in preserving our planet.",

    "Effective communication is key to building strong relationships. Active listening and clear expression help avoid misunderstandings. Both verbal and non-verbal cues play important roles in conveying messages accurately.",

    "Time management skills are essential for productivity and success. Prioritizing tasks and avoiding procrastination lead to better outcomes. Setting realistic goals and maintaining focus help achieve both personal and professional objectives."
        ];

// same as above
const wordList = "the be to of and a in that have it for not on with as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us".split(" ");

let testMode = 'time';   // variable to track current mode (time or words)
let testDuration = 30; // seconds for time mode
let wordCount = 25; // words for word mode
let timeLeft = 0;
let timerInterval = null;
let testStarted = false;
let testActive = false;
let currentText = "";
let typedText = "";
let currentCharIndex = 0;
let correctChars = 0;
let incorrectChars = 0;
let startTime = 0;

        // Initialize on page load
window.onload = function() {
    generateText();
    setupEventListeners();
};

        // Set mode (time or words)
function setMode(mode) {
    testMode = mode;
            
    // Update mode buttons
    document.getElementById('modeTime').classList.toggle('bg-purple-600/50', mode === 'time');
    document.getElementById('modeTime').classList.toggle('text-white', mode === 'time');
    document.getElementById('modeTime').classList.toggle('text-gray-400', mode !== 'time');
            
    document.getElementById('modeWords').classList.toggle('bg-purple-600/50', mode === 'words');
    document.getElementById('modeWords').classList.toggle('text-white', mode === 'words');
    document.getElementById('modeWords').classList.toggle('text-gray-400', mode !== 'words');
            
            // Show/hide options
    document.getElementById('timeOptions').classList.toggle('hidden', mode !== 'time');
    document.getElementById('timeOptions').classList.toggle('flex', mode === 'time');
    document.getElementById('wordOptions').classList.toggle('hidden', mode !== 'words');
    document.getElementById('wordOptions').classList.toggle('flex', mode === 'words');
            
    resetTest();
}

// Select duration for time mode
function selectDuration(seconds) {
    testDuration = seconds;
    updateOptionButtons('timeOptions', seconds);
    resetTest();
}

// Select word count for word mode
function selectWords(count) {
    wordCount = count;
    updateOptionButtons('wordOptions', count);
    resetTest();
}

// Update active state of option buttons
function updateOptionButtons(containerId, value) {
    const container = document.getElementById(containerId);
    const buttons = container.querySelectorAll('button');


    buttons.forEach(btn => {
    const btnValue = parseInt(btn.textContent);
    if (btnValue === value) {
        btn.classList.add('bg-purple-600/50', 'text-white');
        btn.classList.remove('text-gray-400');
        } 
        

        else {
            btn.classList.remove('bg-purple-600/50', 'text-white');
            btn.classList.add('text-gray-400');
            }

    });
}





        // Generate text based on mode
function generateText() {
    if (testMode === 'time') {
        currentText = getRandomText();
    } 
            
    else {
        currentText = generateWordText(wordCount);
        }
        displayText();
}



// Select random paragraph
function getRandomText() {

    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    return paragraphs[randomIndex];
}


        // Generate random words for word mode
function generateWordText(count) {
    let words = [];
    for (let i = 0; i < count; i++) {
        words.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    return words.join(' ');
}

        // Display text with spans for each character
function displayText() {
    const textDisplay = document.getElementById('textDisplay');
    textDisplay.innerHTML = '';
            
    currentText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('char');
        span.id = `char-${index}`;
        textDisplay.appendChild(span);
        });
}

        // Setup event listeners
function setupEventListeners() {
    const textDisplay = document.getElementById('textDisplay');
    const input = document.getElementById('typingInput');

            // Focus input when clicking on text display
    textDisplay.addEventListener('click', () => {
        input.focus();
    });

            // Handle keyboard input
    document.addEventListener('keydown', (e) => {
        if (!testActive) {
            input.focus();
        }
        });


    
    input.addEventListener('input', handleTyping);
        input.addEventListener('focus', () => {
        if (!testActive && !testStarted) {
            startTest();
            }

        });
}



// Start test
function startTest() {
    if (testStarted) return;
            
    testStarted = true;
    testActive = true;
    startTime = Date.now();
    
    
            // Hide options bar and show timer
    document.getElementById('optionsBar').classList.add('hidden');
    document.getElementById('timerDisplay').classList.remove('hidden');
            
    if (testMode === 'time') {
        timeLeft = testDuration;
        updateTimerDisplay();
        startTimer();
        }
}

        // Handle typing input
function handleTyping(e) {
    if (!testActive) return;

    typedText = e.target.value;
    currentCharIndex = typedText.length;

            // Update character colors
    updateCharacterDisplay();
            
            // Update timer for word mode (show elapsed time)
    if (testMode === 'words') {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

            // Check if test is complete
    if (testMode === 'words' && currentCharIndex >= currentText.length) {
        endTest();
        }
}



// Update character display with colors
function updateCharacterDisplay() {
    correctChars = 0;
    incorrectChars = 0;

    for (let i = 0; i < currentText.length; i++) {
        const charElement = document.getElementById(`char-${i}`);
                
        if (i < typedText.length) {
            if (typedText[i] === currentText[i]) {
                charElement.className = 'char correct';
                correctChars++;
            } 
            
            else {
                charElement.className = 'char incorrect';
                incorrectChars++;
                }
        } 
        
        else if (i === typedText.length) {
            charElement.className = 'char current';
            } 
            
        else {
            charElement.className = 'char';
            }

            
    }
}



// Start countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
                
    if (timeLeft <= 0) {
        endTest();
        }
    }, 1000);
}



// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// End test and show results
function endTest() {
    testActive = false;
    clearInterval(timerInterval);
    document.getElementById('typingInput').blur();



    // Calculate final stats
    const timeElapsed = (Date.now() - startTime) / 1000 / 60;
    const wordsTyped = typedText.trim().split(/\s+/).length;
    const finalWPM = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    const totalChars = typedText.length;
    const finalAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;



    // Update results screen
    document.getElementById('finalWPM').textContent = finalWPM;
    document.getElementById('finalAccuracy').textContent = `${finalAccuracy}%`;
    document.getElementById('finalErrors').textContent = incorrectChars;


            // Show results screen
    document.getElementById('testScreen').classList.add('hidden');
    document.getElementById('resultsScreen').classList.remove('hidden');
}



// Reset test
function resetTest() {
    clearInterval(timerInterval);
    testStarted = false;
    testActive = false;
    typedText = "";
    currentCharIndex = 0;
    correctChars = 0;
    incorrectChars = 0;
            


    document.getElementById('typingInput').value = "";
    document.getElementById('timerDisplay').classList.add('hidden');
    document.getElementById('optionsBar').classList.remove('hidden');
    document.getElementById('resultsScreen').classList.add('hidden');
    document.getElementById('testScreen').classList.remove('hidden');
            
    generateText();


}



// Restart test (from results screen)
function restartTest() {
    resetTest();
}