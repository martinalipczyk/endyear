// server.js

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Game state variables
let currentQuestion = null;
let scores = {}; // Store scores for each player

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("selectQuestions", (questionAmount) => {
    // Logic to select questions from database or API
    // For now, let's assume we have a function getQuestionsFromAPI(questionAmount)
    currentQuestion = getQuestionsFromAPI(questionAmount);
    io.emit("startGame", currentQuestion);
  });

  socket.on("submitAnswer", (selectedOption) => {
    // Logic to check the submitted answer
    const isCorrect = checkAnswer(selectedOption);
    const playerId = socket.id; // Assuming each socket connection represents a player
    if (isCorrect) {
      scores[playerId] = (scores[playerId] || 0) + 1;
      io.emit("correctAnswer", scores);
    } else {
      io.emit("wrongAnswer", scores);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    delete scores[socket.id];
    io.emit("updateScores", scores);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
