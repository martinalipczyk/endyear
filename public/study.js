const sName = document.getElementById("sName");
const sString = document.getElementById("sString");

console.log(sString);

let map = new Map();

const notePairs = sString.split(';');

for (let i = 0; i < notePairs.length; i++) {
const pair = notePairs[i].split(':');
    if (pair.length === 2) {
        map.set(pair[0].trim(), pair[1].trim());
    }
}

const keys = map.keys;

const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

console.log(map);


counter = 0;
leftButton.addEventListener("click", () => {
    counter --;
    if(counter<keys.length){
        counter = keys.length-1;
    }
    nextCard();
})

rightButton.addEventListener("click", () => {
    counter ++;
    if (counter > keys.length) {
        counter = 0;
    }
    nextCard();
})

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
}

function nextCard() {
    return;
}
