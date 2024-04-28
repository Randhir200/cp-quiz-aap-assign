// Define variables for DOM elements
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('options');
const timerElement = document.getElementById('time-left');
const scoreElement = document.getElementById('current-score');
const nextButton = document.getElementById('next-button');

// Define quiz data
const quizData = [
    {
        question: 'What is the capital of France?',
        answers: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: ['Earth', 'Mars', 'Venus', 'Jupiter'],
        correctAnswer: 'Mars',
    },
    {
        question: 'What is 1+1?',
        answers: ['2', '1', '3', '4'],
        correctAnswer: '2',
    }    
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let quizCompleted = false;

// Function to start the quiz
function startQuiz() {
    showQuestion();
    startTimer();
}

// Function to display a question and its answer options
function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Clear previous answer options
    answersElement.innerHTML = '';

    // Display answer options
    currentQuestion.answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer;
        answerButton.classList.add('option-button');
        answerButton.addEventListener('click', () => {
            if (!quizCompleted && timeLeft > 0) {
                handleAnswer(answer);
            }
        });
        answersElement.appendChild(answerButton);
    });
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            moveToNextQuestion();
        }
    }, 1000);
}

// Function to handle user's answer
function handleAnswer(selectedAnswer) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        scoreElement.textContent = score;
    }
    moveToNextQuestion();
}

// Function to move to the next question
function moveToNextQuestion() {
    clearInterval(timerInterval);
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        timeLeft = 60;
        startTimer();
        showQuestion();
    } else {
        quizCompleted = true;
        showFinalResult();
    }
}

// Function to display final result
function showFinalResult() {
    questionElement.textContent = 'Quiz completed!';
    answersElement.innerHTML = '';
    timerElement.style.display = 'none';
    nextButton.style.display = 'none';
    scoreElement.textContent = score;
}

// Event listener for the "Next" button
nextButton.addEventListener('click', moveToNextQuestion);

// Start the quiz
startQuiz();
