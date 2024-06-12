const socket = io.connect("http://localhost:3000");
let localIp;

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
    alert("update scores called");
};

const gameOver = () => {
    alert("game over called");
};

// WebRTC setup for peer-to-peer connection
const connectToPeers = () => {
    const peerConnection = new RTCPeerConnection();
    const dataChannel = peerConnection.createDataChannel("gameDataChannel");

    dataChannel.onopen = () => {
        console.log("Data channel is open");
    };

    dataChannel.onmessage = (event) => {
        console.log("Message from peer: ", event.data);
        // Handle game data exchange between peers
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit("iceCandidate", event.candidate);
        }
    };

    socket.on("iceCandidate", (candidate) => {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("offer", async (offer) => {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answer", answer);
    });

    socket.on("answer", (answer) => {
        peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    // Create and send offer if the local IP matches
    if (localIp) {
        peerConnection.createOffer().then(offer => {
            peerConnection.setLocalDescription(offer);
            socket.emit("offer", offer);
        });
    }
};

// Receive local IP address from the server
socket.on("localIp", (ip) => {
    localIp = ip;
    console.log("Local IP Address: ", localIp);
    // Connect to other players on the same WiFi
    connectToPeers();
});