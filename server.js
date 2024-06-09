const express = require("express");
const socket = require("socket.io");
const http = require("http");
const axios = require("axios");

const app = express();
const port = 3000 || process.env.PORT;
const server = http.createServer(app);

app.use(express.static("views"));

const io = socket(server);

server.listen(port, () => console.log(`App server listening on ${port}. (Go to http://localhost:${port})`));

let players = [];
let questionIndex = 0;
let questions = [];
let scores = {};

const getQuestions = async (amount) => {
    try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
        questions = response.data.results;
    } catch (error) {
        console.error("Error fetching questions: ", error);
    }
};

io.on("connection", (socket) => {
    console.log("Made socket connection", socket.id);
    players.push(socket.id);
    scores[socket.id] = { correct: 0, wrong: 0 };

    socket.emit('serverToClient', 'Hello client');

    socket.on('clientToServer', (data) => {
        console.log(data);
    });

    socket.on("selectQuestions", async (amount) => {
        await getQuestions(amount);
        if (players.length === 2) {
            startGame();
        }
    });

    socket.on("disconnect", () => {
        players = players.filter(player => player !== socket.id);
        delete scores[socket.id];
        console.log("Player disconnected", socket.id);
    });

    socket.on("submitAnswer", (answer) => {
        if (questions[questionIndex].correct_answer === answer) {
            scores[socket.id].correct++;
            io.emit("updateScores", scores);
            io.emit("correctAnswer", scores[socket.id]);
        } else {
            scores[socket.id].wrong++;
            io.emit("updateScores", scores);
            io.emit("wrongAnswer", scores[socket.id]);
        }
        nextQuestion();
    });
});

const startGame = () => {
    questionIndex = 0;
    io.emit("startGame", questions[questionIndex]);
};

const nextQuestion = () => {
    questionIndex++;
    if (questionIndex < questions.length) {
        io.emit("newQuestion", questions[questionIndex]);
    } else {
        io.emit("gameOver");
    }
};

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/multitrivia.html");
});