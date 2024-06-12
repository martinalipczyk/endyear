const express = require("express");
// const socket = require("socket.io");
const http = require("http");
const axios = require("axios");
const db = require('./db/db_connection.js');
const app = express();
const port = 3000 || process.env.PORT;
const server = http.createServer(app);

app.use(express.static(__dirname + "/public"));

app.use(express.static("views"));
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

// const io = socket(server);

server.listen(port, () => console.log(`App server listening on ${port}. (Go to http://localhost:${port})`));

// let players = [];
// let index = 0;
// let questions = [];
// let scores = {};

// const getQuestions = async (amount) => {
//     try {
//         const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
//         questions = response.data.results;
//     } catch (error) {
//         console.error("error fetching questions: ", error);
//     }
// };

// io.on("connection", (socket) => {
//     console.log("Made socket connection", socket.id);
//     players.push(socket.id);
//     scores[socket.id] = { correct: 0, wrong: 0 };

//     socket.emit('serverToClient', 'test: hello client');

//     socket.on('clientToServer', (data) => {
//         console.log(data);
//     });

//     socket.on("selectQuestions", async (amount) => {
//         await getQuestions(amount);
//         if (players.length === 2) {
//             startGame();
//         }
//     });

//     socket.on("disconnect", () => {
//         players = players.filter(player => player !== socket.id);
//         delete scores[socket.id];
//         console.log("Player disconnected", socket.id);
//     });

//     socket.on("submitAnswer", (answer) => {
//         if (questions[index].correct_answer === answer) {
//             scores[socket.id].correct++;
//             io.emit("updateScores", scores);
//             io.emit("correctAnswer", scores[socket.id]);
//         } else {
//             scores[socket.id].wrong++;
//             io.emit("updateScores", scores);
//             io.emit("wrongAnswer", scores[socket.id]);
//         }
//         nextQuestion();
//     });
// });

// const startGame = () => {
//     index = 0;
//     io.emit("startGame", questions[index]);
// };

// const nextQuestion = () => {
//     index++;
//     if (index < questions.length) {
//         io.emit("newQuestion", questions[index]);
//     } else {
//         io.emit("gameOver");
//     }
// };

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/databases", (req, res) => {
    res.render("databases");
})

app.get("/gc", (req, res) => {
    res.render("gc");
})

app.get("/index", (req, res) => {
    res.render("index");
})

app.get("/linkhub", (req, res) => {
    res.render("linkhub");
})

app.get("/multitrivia", (req, res) => {
    res.render("multitrivia");
})

app.get("/pomodoro", (req, res) => {
    res.render("pomodoro");
})

app.get("/solo_trivia", (req, res) => {
    res.render("solo_trivia");
})

app.get("/summarize", (req, res) => {
    res.render("summarize");
})

app.get("/test", (req, res) => {
    res.render("test");
})

app.get("/todo", (req, res) => {
    res.render("todo");
})

app.get("/triviaselect", (req, res) => {
    res.render("triviaselect");
})

app.get("/uploadnotes", (req, res) => {
    res.render("uploadnotes");
})