const name = document.getElementById("sName").textContent;
const string = document.getElementById("sString").textContent;

const front = document.getElementById("front");
const back = document.getElementById("back");

let map = new Map();

const notePairs = string.split(';');

for (let i = 0; i < notePairs.length; i++) {
    const pair = notePairs[i].split(':');
    if (pair.length === 2) {
        map.set(pair[0].trim(), pair[1].trim());
    }
}

const keys = Array.from(map.keys());
let count = 0;
let num = 0;

const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const flipButton = document.getElementById("flip");

// Initial display
updateCard();

leftButton.addEventListener("click", () => {
    count--;
    if (count < 0) {
        count = keys.length - 1;
    }
    updateCard();
});

rightButton.addEventListener("click", () => {
    count++;
    if (count >= keys.length) {
        count = 0;
    }
    updateCard();
});

flipButton.addEventListener("click", () => {
    num++;
    flipCard();
});

function updateCard() {
    front.textContent = keys[count];
    back.textContent = map.get(keys[count]);
    front.style.visibility = "visible";
    back.style.visibility = "hidden";
    num = 0; // Reset flip counter when changing cards
}

function flipCard() {
    if (num % 2 === 0) {
        front.style.visibility = "hidden";
        back.style.visibility = "visible";
    } else {
        front.style.visibility = "visible";
        back.style.visibility = "hidden";
    }
}