const userInput = prompt("Enter your notes in the format of 'Term1 : Definition1 ; Term2 : Definition2; etc.");
const x = userInput.split(';');

let map = new Map();

for (let i = 0; i < x.length; i ++) {
    var newArr = x[i].split(':');
    map.set(newArr[0],newArr[1]);
}

// going to display the definition
function displayDef(term) {
    return map1.get(term);
}