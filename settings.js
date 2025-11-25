
const nameInput = document.querySelector("#name-input");
const goalInput = document.querySelector("#goal-input");
const booksReadInput = document.querySelector("#read-input");
const quote = document.querySelector("#motivationa-quote");

const form = document.querySelector("form");

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    let name = nameInput.value.trim();
    let newGoal = goalInput.value.trim();
    let booksRead = booksReadInput.value.trim();

    window.location.href = 'index.html';
});