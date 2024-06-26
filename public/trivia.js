const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const correctScoreElement = document.querySelector(".correct-score");
const totalQuestionsElement = document.querySelector(".total-questions");

let currentQuestionIndex = 0;
let correct = 0;
let totalQuestions = 5;
let choseLength = false;

var correctAudio = new Audio('correct.mp3');
var wrong = new Audio('wrong.mp3');

function toggleMusic() {
    var music = document.getElementById('bgMusic');
    var musicToggle = document.getElementById('musicToggle');
    
    if (music.paused) {
        music.play();
        musicToggle.innerHTML = '<i class="material-icons">pause_circle_filled</i>';
    } else {
        music.pause();
        musicToggle.innerHTML = '<i class="material-icons">play_circle_filled</i>';
    }
}
// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    loadQuestion();
    correctScoreElement.textContent = correct;
    totalQuestionsElement.textContent = totalQuestions;
});


function shortQuiz(){
    totalQuestions = 5;
    removeButtons();
}

function mediumQuiz(){
    totalQuestions = 15; 
    removeButtons();
}

function longQuiz(){
    totalQuestions = 30; 
    removeButtons();
}

function removeButtons(){
    const shortButton = document.querySelector(".short");
    const mediumButton = document.querySelector(".medium");
    const longButton = document.querySelector(".long");
    shortButton.parentNode.removeChild(shortButton);
    mediumButton.parentNode.removeChild(mediumButton);
    longButton.parentNode.removeChild(longButton);

    totalQuestionsElement.textContent = totalQuestions;

    const userQuestion = document.querySelector(".userQuestion");
    userQuestion.parentNode.removeChild(userQuestion);

    userQuestion.classList.remove("hidden");
    choseLength = true;
    loadQuestion();
}

async function loadQuestion() {
    if(choseLength==true){
        const apiurl = "https://opentdb.com/api.php?amount=30&category=18";
        const result = await fetch(apiurl);
        const quizData = await result.json();
        
        showQuestion(quizData.results[currentQuestionIndex]);
    }
    
}

function showQuestion(quizData) {
    let questionNumber = currentQuestionIndex+1;
    questionElement.innerHTML = "#"+questionNumber+ ". " + decodeHtmlEntities(quizData.question);

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
    // if (selectedOption.textContent === correctAnswer) {
    //     selectedOption.style.background = "#00FF00";
    //     correct++;
    //     correctScoreElement.textContent = correct;

    // } else {
    //     selectedOption.style.background = "#FF0000";

    //     alert("Incorrect. The correct answer is: " + correctAnswer);
    // }
        correctAnswer=decodeHtmlEntities(correctAnswer);
   
        optionsElement.querySelectorAll("button").forEach(option => {
            if (option.textContent === correctAnswer) {
                option.style.background = "#00FF00";
                
            } else {
                option.style.background = "#FF0000";
            }
            // option.disabled = true;
        });
        if(selectedOption.textContent == correctAnswer){
            correct++;
            correctAudio.play();

        }
        else{
            wrong.play();
        }
        correctScoreElement.textContent = correct; 


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

function decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}