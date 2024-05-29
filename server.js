const express = require("express");
const socket = require("socket.io");
const http = require("http");

const app = express();
const port = 3000 || process.env.PORT;
const server = http.createServer(app);

// Set static folder
app.use(express.static("public"));

// Socket setup
const io = socket(server);

server.listen(port, () => console.log(`App server listening on ${port}. (Go to http://localhost:${port})`));

io.on("connection", (socket) => {
    console.log("Made socket connection", socket.id);
});

// SERVER IS FOR MULTITRIVIA ONLY
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/multitrivia.html" );
} );