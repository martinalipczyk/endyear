const express = require("express");
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

server.listen(port, () => console.log(`App server listening on ${port}. (Go to http://localhost:${port})`));

app.get("/", (req, res) => {
    res.render("index", {user_id: userid, username: userna});
});

app.get("/databases", (req, res) => {
    res.render("databases", {user_id: userid, username: userna});
})

app.get("/gc", (req, res) => {
    res.render("gc", {user_id: userid, username: userna});
})

app.get("/index", (req, res) => {
    res.render("index", {user_id: userid, username: userna});
})

app.get("/linkhub", (req, res) => {
    res.render("linkhub", {user_id: userid, username: userna});
})

app.get("/multitrivia", (req, res) => {
    res.render("multitrivia", {user_id: userid, username: userna});
})

app.get("/pomodoro", (req, res) => {
    res.render("pomodoro", {user_id: userid, username: userna});
})

app.get("/solo_trivia", (req, res) => {
    res.render("solo_trivia", {user_id: userid, username: userna});
})

app.get("/summarize", (req, res) => {
    res.render("summarize", {user_id: userid, username: userna});
})

app.get("/test", (req, res) => {
    res.render("test", {user_id: userid, username: userna});
})

app.get("/todo", (req, res) => {
    res.render("todo", {user_id: userid, username: userna});
})

app.get("/triviaselect", (req, res) => {
    res.render("triviaselect", {user_id: userid, username: userna});
})

app.get("/uploadnotes", (req, res) => {
    res.render("uploadnotes", {user_id: userid, username: userna});
})




