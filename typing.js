// Sample sentences for the typing test
const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "The best way to predict the future is to invent it.",
    "Debugging is twice as hard as writing the code in the first place.",
    "Computers are good at following instructions, but not at reading your mind.",
    "The most disastrous thing that you can ever learn is your first programming language.",
    "The only way to learn a new programming language is by writing programs in it.",
    "Simplicity is the soul of efficiency.",
    "Before software can be reusable it first has to be usable.",
    "There are two ways to write error-free programs; only the third one works."
];
const sentenceDisplay = document.getElementById('sentenceDisplay');
const inputField = document.getElementById('inputField');
const timerElement = document.getElementById('timer');
const resetBtn = document.getElementById('resetBtn');
const resultContainer = document.getElementById('resultContainer');
const testContainer = document.querySelector('.test-container');
const progressBar = document.querySelector('.progress-bar');
const wpmStat = document.getElementById('wpmStat');
const accuracyStat = document.getElementById('accuracyStat');
const timeStat = document.getElementById('timeStat');
const charactersStat = document.getElementById('charactersStat');
const correctStat = document.getElementById('correctStat');
const incorrectStat = document.getElementById('incorrectStat');
const tryAgainBtn = document.getElementById('tryAgainBtn');
let currentSentence = '';
let startTime, endTime;
let timerInterval;
let errors = 0;
let correctChars = 0;
let totalTypedChars = 0;
let isTestRunning = false;
function initTest() {

    errors = 0;
    correctChars = 0;
    totalTypedChars = 0;
    isTestRunning = false;
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    displaySentence();
    inputField.value = '';
    inputField.disabled = false;
    inputField.focus();
    timerElement.textContent = '00:00';
    progressBar.style.width = '0%';
    resultContainer.style.display = 'none';
    testContainer.style.display = 'flex';
}
function displaySentence() {
    sentenceDisplay.innerHTML = '';
    let i = 0;
    const typewriter = setInterval(() => {
        if (i < currentSentence.length) {
            const span = document.createElement('span');
            span.textContent = currentSentence[i];
            span.className = 'char';
            sentenceDisplay.appendChild(span);
            i++;
        } else {
            clearInterval(typewriter);
        }
    }, 50);
}
function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
    isTestRunning = true;
}
function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
    const seconds = (elapsedTime % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;
}
function calculateWPM(timeInSeconds) {
    const words = currentSentence.split(' ').length;
    const minutes = timeInSeconds / 60;
    return Math.round(words / minutes);
}
function calculateAccuracy() {
    return Math.round((correctChars / totalTypedChars) * 100) || 0;
}
function highlightErrors(inputText) {
    const chars = sentenceDisplay.querySelectorAll('.char');
    let errorCount = 0;
    let correctCount = 0;
    
    chars.forEach((char, index) => {
        char.classList.remove('error', 'correct');
        
        if (index < inputText.length) {
            if (inputText[index] === currentSentence[index]) {
                char.classList.add('correct');
                correctCount++;
            } else {
                char.classList.add('error');
                errorCount++;
            }
        }
    });
    
    errors = errorCount;
    correctChars = correctCount;
    totalTypedChars = inputText.length;
    const progress = (inputText.length / currentSentence.length) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}
function endTest() {
    clearInterval(timerInterval);
    endTime = new Date();
    const timeInSeconds = Math.floor((endTime - startTime) / 1000);
    const wpm = calculateWPM(timeInSeconds);
    const accuracy = calculateAccuracy();
    wpmStat.textContent = wpm;
    accuracyStat.textContent = `${accuracy}%`;
    timeStat.textContent = timeInSeconds;
    charactersStat.textContent = totalTypedChars;
    correctStat.textContent = correctChars;
    incorrectStat.textContent = errors;
    testContainer.style.display = 'none';
    resultContainer.style.display = 'flex';
    inputField.disabled = true;
}
inputField.addEventListener('input', (e) => {
    if (!isTestRunning && e.target.value.length > 0) {
        startTimer();
    }
    
    highlightErrors(e.target.value);
    if (e.target.value.length === currentSentence.length) {
        endTest();
    }
});

resetBtn.addEventListener('click', initTest);
tryAgainBtn.addEventListener('click', initTest);
window.addEventListener('load', initTest);