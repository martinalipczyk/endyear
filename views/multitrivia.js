const socket = io.connect("http://localhost:3000");

document.getElementById("startGameButton").onclick = () => {
    const questionAmount = document.getElementById("questionAmount").value;
    socket.emit("selectQuestions", questionAmount);
};

socket.on("startGame", (question) => {
    displayQuestion(question);
});

socket.on("newQuestion", (question) => {
    displayQuestion(question);
    enableOptions();
});

socket.on("correctAnswer", (score) => {
    updateScores(score);
});

socket.on("wrongAnswer", (score) => {
    updateScores(score);
});

socket.on("gameOver", () => {
    gameOver();
});

socket.on("updateScores", (scores) => {
    updateScores(scores);
});

const displayQuestion = (question) => {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    
    const decodedQuestion = decodeHtmlEntities(question.question);
    questionElement.innerText = decodedQuestion;
    optionsElement.innerHTML = "";

    const options = [...question.incorrect_answers, question.correct_answer];
    options.sort(() => Math.random() - 0.5);

    options.forEach(option => {
        const decodedOption = decodeHtmlEntities(option);

        const optionButton = document.createElement("button");
        optionButton.innerText = decodedOption;
        optionButton.onclick = () => {
            socket.emit("submitAnswer", option);
            disableOptions();
        };
        optionsElement.appendChild(optionButton);
    });
};


const enableOptions = () => {
    const optionButtons = document.querySelectorAll("#options button");
    optionButtons.forEach(button => {
        button.disabled = false;
    });
};

const disableOptions = () => {
    const optionButtons = document.querySelectorAll("#options button");
    optionButtons.forEach(button => {
        button.disabled = true;
    });
};

const updateScores = (scores) => {
    alert("update scores called")
};

const gameOver = () => {
    alert(" game over called")
}

function decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

