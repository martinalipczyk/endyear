const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const pasteNotes = document.getElementById("paste-notes");
const closeBtn = document.getElementById("close-btn");
const closePasteBtn = document.getElementById("close-paste-btn");
let editBool = false;

//Add question when user clicks 'Add Flashcard' button
addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.remove("hide");
});

pasteNotes.addEventListener("click", () => {
    const notes = prompt("Paste your notes here (separate questions and answers by a colon and each pair by a newline):");
    if (notes) {
      const pairs = notes.split('\n');
      pairs.forEach(pair => {
        const [q, a] = pair.split(':').map(str => str.trim());
        if (q && a) {
          question.value = q;
          answer.value = a;
          submitQuestion();
        }
      });
    }
  });

//Hide Create flashcard Card
closeBtn.addEventListener(
  "click",
  (hideQuestion = () => {
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
    if (editBool) {
      editBool = false;
      submitQuestion();
    }
  })
);

// Hide Paste Notes container
closePasteBtn.addEventListener("click", () => {
  container.classList.remove("hide");
  pasteNotesCard.classList.add("hide");
});

//Submit Question
cardButton.addEventListener(
  "click",
  (submitQuestion = () => {
    editBool = false;
    tempQuestion = question.value.trim();
    tempAnswer = answer.value.trim();
    if (!tempQuestion || !tempAnswer) {
      errorMessage.classList.remove("hide");
    } else {
      container.classList.remove("hide");
      errorMessage.classList.add("hide");
      viewlist();
      question.value = "";
      answer.value = "";
    }
  })
);

//Card Generate
function viewlist() {
  var listCard = document.getElementsByClassName("card-list-container");
  var div = document.createElement("div");
  div.classList.add("card");
  //Question
  div.innerHTML += `
  <p class="question-div">${question.value}</p>`;
  //Answer
  var displayAnswer = document.createElement("p");
  displayAnswer.classList.add("answer-div", "hide");
  displayAnswer.innerText = answer.value;

  //Link to show/hide answer
  var link = document.createElement("a");
  link.setAttribute("href", "#");
  link.setAttribute("class", "show-hide-btn");
  link.innerHTML = "Show/Hide";
  link.addEventListener("click", () => {
    displayAnswer.classList.toggle("hide");
  });

  div.appendChild(link);
  div.appendChild(displayAnswer);

  //Edit button
  let buttonsCon = document.createElement("div");
  buttonsCon.classList.add("buttons-con");
  var editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editBool = true;
    modifyElement(editButton, true);
    addQuestionCard.classList.remove("hide");
  });
  buttonsCon.appendChild(editButton);
  disableButtons(false);

  //Delete Button
  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  buttonsCon.appendChild(deleteButton);

  div.appendChild(buttonsCon);
  listCard[0].appendChild(div);
  hideQuestion();
}

//Modify Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement.parentElement;
  let parentQuestion = parentDiv.querySelector(".question-div").innerText;
  if (edit) {
    let parentAns = parentDiv.querySelector(".answer-div").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    disableButtons(true);
  }
  parentDiv.remove();
};

//Disable edit and delete buttons
const disableButtons = (value) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};

pasteNotes.addEventListener("click", () => {
    container.classList.add("hide");
    pasteNotesCard.classList.remove("hide");
  });
  
  // Hide Paste Notes container
  closePasteBtn.addEventListener("click", () => {
    container.classList.remove("hide");
    pasteNotesCard.classList.add("hide");
  });
  
  // Submit Notes
  submitNotesBtn.addEventListener("click", () => {
    const notes = notesTextarea.value.trim();
    if (notes) {
      const pairs = notes.split('\n');
      pairs.forEach(pair => {
        const [q, a] = pair.split(':').map(str => str.trim());
        if (q && a) {
          question.value = q;
          answer.value = a;
          submitQuestion();
        }
      });
      notesTextarea.value = "";
      container.classList.remove("hide");
      pasteNotesCard.classList.add("hide");
    }
  });