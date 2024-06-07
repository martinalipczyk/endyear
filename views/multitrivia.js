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
    
    questionElement.innerText = question.question;
    optionsElement.innerHTML = "";

    const options = [...question.incorrect_answers, question.correct_answer];
    options.sort(() => Math.random() - 0.5);

    options.forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.innerText = option;
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