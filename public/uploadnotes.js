const userInput = prompt("Enter your notes in the format of 'Term1 : Definition1 ; Term2 : Definition2; etc.");
const x = userInput.split(';');

let map = new Map();

for (let i = 0; i < x.length; i ++) {
    var newArr = x[i].split(':');
    map.set(newArr[0],newArr[1]);
}

//E
const fs = require('fs');

// Read the existing JSON file
const existingData = fs.readFileSync('existing_cards.json', 'utf8');

// Parse the existing JSON data
const existingJson = JSON.parse(existingData);

// Define the JavaScript map with new card data
const newCardMap = {
    LION: "LEÓN",
    ELEPHANT: "ELEFANTE",
    ZEBRA: "CEBRA",
    MONKEY: "MONO",
    PENGUIN: "PINGÜINO",
    GIRAFFE: "JIRAFA"
};

// Convert the map to an array of card objects
const newCardList = Object.entries(map).map(([cardfront, cardback]) => ({
    cardfront,
    cardback
}));

// Append or merge the new card objects with the existing ones
existingJson.questionlist.push(...newCardList);

// Convert the updated JSON object to a string
const updatedJson = JSON.stringify(existingJson, null, 2);

// Save the updated JSON string to the file
fs.writeFileSync('existing_cards.json', updatedJson, 'utf8');
console.log('JSON file has been updated with new card data.');