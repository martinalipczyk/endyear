
const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const correctScoreElement = document.querySelector(".correct-score");
const totalQuestionsElement = document.querySelector(".total-questions");

let currentQuestionIndex = 0;
let correct = 0;
let totalQuestions = 5;

document.addEventListener("DOMContentLoaded", function() {
    correctScoreElement.textContent = correct;
    totalQuestionsElement.textContent = totalQuestions;
});

function shortQuiz() {
    totalQuestions = 5;
    startQuiz();
}

function mediumQuiz() {
    totalQuestions = 15;
    startQuiz();
}

function longQuiz() {
    totalQuestions = 30;
    startQuiz();
}

function startQuiz() {
    hideQuizLengthButtons();
    showQuiz();
    loadQuestionBatch();
}

function hideQuizLengthButtons() {
    const buttons = document.querySelectorAll(".short, .medium, .long");
    buttons.forEach(button => {
        button.style.display = "none";
    });
}

function showQuiz() {
    const userQuestion = document.querySelector(".userQuestion");
    userQuestion.classList.add("hidden");
    const display = document.querySelector(".display");
    display.classList.remove("hidden");
}

async function loadQuestionBatch() {
    const apiurl = "https://opentdb.com/api.php?amount=" + totalQuestions;
    const result = await fetch(apiurl);
    const quizData = await result.json();
    showQuestion(quizData.results[currentQuestionIndex]);
}

function showQuestion(quizData) {
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = "#" + questionNumber + ". " + decodeHtmlEntities(quizData.question);

    optionsElement.innerHTML = "";

    let correctAnswer = quizData.correct_answer;
    let incorrectAnswers = quizData.incorrect_answers;
    let optionsList = incorrectAnswers;

    optionsList.splice(
        Math.floor(Math.random() * (incorrectAnswers.length + 1)),
        0,
        correctAnswer
    );
    for (let i = 0; i < optionsList.length; i++) {
        const option = document.createElement("button");
        option.innerHTML = decodeHtmlEntities(optionsList[i]);
        // Add an event listener
        option.addEventListener("click", () => {
            checkAnswer(option, correctAnswer);
        });
        optionsElement.appendChild(option);
    }
}

function checkAnswer(selectedOption, correctAnswer) {
    optionsElement.querySelectorAll("button").forEach(option => {
        option.disabled = true; 

        if (option.textContent === correctAnswer) {
            option.style.background = "#00FF00";
        } else {
            option.style.background = "#FF0000";
        }
    });

    if (selectedOption.textContent == correctAnswer) {
        correct++; 
    }

    correctScoreElement.textContent = correct; 
    currentQuestionIndex++; 

    if (currentQuestionIndex < totalQuestions) {
        loadQuestionBatch(); 
    } else {
        questionElement.textContent = `Quiz Complete! You scored ${correct} out of ${totalQuestions}.`;
        optionsElement.innerHTML = ""; 
    }
}


function decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}
