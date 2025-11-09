const promptAddBook = document.querySelectorAll(".new");
const favDialog = document.querySelector("#favDialog");
const cancelBtn = document.querySelector("#cancel");

promptAddBook.forEach(element => {
    element.addEventListener("click", () => {
        favDialog.showModal();
    });
});
