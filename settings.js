
const nameInput = document.querySelector("#name-input");
const goalInput = document.querySelector("#goal-input");
const booksReadInput = document.querySelector("#read-input");
const quote = document.querySelector("#motivationa-quote");
let save = false;

const data = JSON.parse(localStorage.getItem("libraryData")) || {};

nameInput.value = data.userLibraryName || "";
goalInput.value = data.goal || "";
booksReadInput.value = data.read || "";

const form = document.querySelector("form");

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    libraryName = nameInput.value.trim();
    newGoal = goalInput.value.trim();
    booksRead = booksReadInput.value.trim();

    const saved = localStorage.getItem("libraryData") || {};

    const newData = {
        userLibraryName: libraryName || saved.libraryName,
        goal: newGoal || saved.goal,
        read: booksRead || saved.read
    };

    localStorage.setItem("libraryData", JSON.stringify(newData));
    save = true;
    window.location.href = 'index.html';
});

window.addEventListener("beforeunload",(e)=>{
    if(!save)
    {
        e.preventDefault();
    }
});
