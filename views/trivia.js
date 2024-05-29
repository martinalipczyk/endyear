const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const correctScoreElement = document.querySelector(".correct-score");
const totalQuestionsElement = document.querySelector(".total-questions");

let currentQuestionIndex = 0;
let correct = 0;
let totalQuestions = 10;

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    loadQuestion();
    correctScoreElement.textContent = correct;
    totalQuestionsElement.textContent = totalQuestions;
});

async function loadQuestion() {
    const apiurl = "https://opentdb.com/api.php?amount=20";
    const result = await fetch(apiurl);
    const quizData = await result.json();
    showQuestion(quizData.results[currentQuestionIndex]);
}

function showQuestion(quizData) {
    questionElement.textContent = quizData.question;

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
        option.textContent = optionsList[i];
        // Add an event listener
        option.addEventListener("click", () => {
            checkAnswer(option.textContent, correctAnswer);
        });
        optionsElement.appendChild(option);
    }
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        correct++;
        correctScoreElement.textContent = correct;
        alert("Correct!");
    } else {
        alert("Incorrect. The correct answer is: " + correctAnswer);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        setTimeout(function() {
            loadQuestion();
        }, 300);
    } else {
        questionElement.textContent = `Quiz Complete! You scored ${correct} out of ${totalQuestions}.`;
        optionsElement.innerHTML = "";
    }
}
