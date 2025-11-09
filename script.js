const promptAddBook = document.querySelectorAll(".new");

const favDialog = document.querySelector("#favDialog");
const cancelBtn = document.querySelector("#cancel");

const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const readInput = document.querySelector("#readInput");

promptAddBook.forEach(element => {
    element.addEventListener("click", () => {
        favDialog.showModal();
    });
});
