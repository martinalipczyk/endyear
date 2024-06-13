const container = document.querySelector(".container");
const addTermCard = document.getElementById("add-term-card");
const cardButton = document.getElementById("save-btn");
const term = document.getElementById("term");
const defin = document.getElementById("defin");
const errorMessage = document.getElementById("error");
const addTerm = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
const saveSetBtn = document.getElementById("saveset");
const setName = document.getElementById("setName");

let editBool = false;

let flashcardMap = new Map(); // Initialize a Map to store the flashcards

// Add term when user clicks 'Add Flashcard' button
addTerm.addEventListener("click", () => {
  container.classList.add("hide");
  term.value = "";
  defin.value = "";
  addTermCard.classList.remove("hide");
});

// Hide Add Term Card
closeBtn.addEventListener("click", hideTerm);

function hideTerm() {
  container.classList.remove("hide");
  addTermCard.classList.add("hide");
  if (editBool) {
    editBool = false;
    submitTerm();
  }
}

const addNotesButton = document.getElementById("add-notes");

addNotesButton.addEventListener("click", () => {
  const userInput = prompt("Enter your notes in the format of 'Term1 : Definition1 ; Term2 : Definition2; etc.");
  const notePairs = userInput.split(';');

  let map = new Map();

  for (let i = 0; i < notePairs.length; i++) {
    const pair = notePairs[i].split(':');
    if (pair.length === 2) {
      map.set(pair[0].trim(), pair[1].trim());
    }
  }

  map.forEach((value, key) => {
    const cardContainer = document.querySelector(".card-list-container");
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
      <div class="card-content">
        <p class="term-div">${key}</p>
        <p class="defin-div hide">${value}</p>
        <a href="#" class="show-hide-btn">Show/Hide</a>
      </div>
      <div class="buttons-con">
        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;

    const contentDiv = cardDiv.querySelector('.card-content');
    const showHideBtn = cardDiv.querySelector('.show-hide-btn');
    const definDiv = cardDiv.querySelector('.defin-div');
    const deleteButton = cardDiv.querySelector('.delete');

    showHideBtn.addEventListener('click', () => {
      definDiv.classList.toggle('hide');
    });

    contentDiv.addEventListener('click', (event) => {
      if (event.target !== showHideBtn) {
        definDiv.classList.toggle('hide');
      }
    });

    deleteButton.addEventListener('click', () => {
      cardDiv.remove();
      flashcardMap.delete(key); // Remove the flashcard from the map
      logFlashcards(); // Log all flashcards after deletion
    });

    cardContainer.appendChild(cardDiv);
    flashcardMap.set(key, value); // Add the flashcard to the map
    logFlashcards(); // Log all flashcards
  });
});

// Submit Term
cardButton.addEventListener("click", submitTerm);

function submitTerm() {
  editBool = false;
  const tempTerm = term.value.trim();
  const tempDefin = defin.value.trim();
  if (!tempTerm || !tempDefin) {
    errorMessage.classList.remove("hide");
  } else {
    container.classList.remove("hide");
    errorMessage.classList.add("hide");
    generateCard(tempTerm, tempDefin);
    term.value = "";
    defin.value = "";
    hideTerm(); // Explicitly hide the form after saving the flashcard
  }
}

// Generate Card
function generateCard(termValue, definValue) {
  const cardListContainer = document.getElementsByClassName("card-list-container")[0];
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  // Term
  const termDiv = document.createElement("p");
  termDiv.classList.add("term-div");
  termDiv.innerText = termValue;
  cardDiv.appendChild(termDiv);

  // Definition
  const definDiv = document.createElement("p");
  definDiv.classList.add("defin-div", "hide");
  definDiv.innerText = definValue;
  cardDiv.appendChild(definDiv);

  // Show/Hide Button
  const link = document.createElement("a");
  link.setAttribute("href", "#");
  link.setAttribute("class", "show-hide-btn");
  link.innerHTML = "Show/Hide";
  link.addEventListener("click", () => {
    definDiv.classList.toggle("hide");
  });
  cardDiv.appendChild(link);

  // Buttons Container
  const buttonsCon = document.createElement("div");
  buttonsCon.classList.add("buttons-con");

  // Edit Button
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editBool = true;
    modifyElement(editButton, true);
    addTermCard.classList.remove("hide");
  });
  buttonsCon.appendChild(editButton);

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  buttonsCon.appendChild(deleteButton);

  cardDiv.appendChild(buttonsCon);
  cardListContainer.appendChild(cardDiv);
  flashcardMap.set(termValue, definValue); // Add the flashcard to the map
  logFlashcards(); // Log all flashcards
  hideTerm();
}

// Modify Elements
const modifyElement = (element, edit = false) => {
  const parentDiv = element.parentElement.parentElement;
  const parentTerm = parentDiv.querySelector(".term-div").innerText;
  if (edit) {
    const parentDefin = parentDiv.querySelector(".defin-div").innerText;
    defin.value = parentDefin;
    term.value = parentTerm;
    disableButtons(true);
  }
  parentDiv.remove();
  flashcardMap.delete(parentTerm); // Remove the flashcard from the map
  logFlashcards(); // Log all flashcards after removal
};

// Disable edit and delete buttons
const disableButtons = (value) => {
  const editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};

// Log all flashcards in the map
function logFlashcards() {
  console.log("Current Flashcards:");
  flashcardMap.forEach((value, key) => {
    console.log(`Term: ${key}, Definition: ${value}`);
  });
}

saveSetBtn.addEventListener("click", saveSet); 

function saveSet() {
  let str = "";
  flashcardMap.forEach((value, key) => {
    str += key + ": " + value + "; ";
  });

  let name = setName.value;

  fetch('/insertSet', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ setname: name, setstring: str }), 
  })

  flashcardMap = new Map();
}

