const promptAddBook = document.querySelectorAll(".new");

const favDialog = document.querySelector("#favDialog");
const cancelBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");
const libraryDisplay = document.querySelector(".library-books");

const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const readInput = document.querySelector("#readInput");

const myLibrary = [];

function Book(title,author,pages,read,id)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

let starterBook = new Book("Harry Potter", "J.K Rowling", 4100, false, 1);

myLibrary[0] = starterBook;

displayBook();

function addBookToLibrary(title,author,pages,read)
{
    let newBook = new Book(title,author,pages,read,crypto.randomUUID());
    myLibrary.push(newBook);
    displayBook();
}

function clearLibrary()
{
    libraryDisplay.innerHTML = "";
}

function displayBook()
{
    clearLibrary();
    for(let i = 0; i < myLibrary.length; i++)
    {
         let card = document.createElement("div");

        card.classList.add("book", "card");
        card.dataset.bookId = myLibrary[i].id;

        let title = document.createElement("h2");

        title.textContent = myLibrary[i].title;

        let author = document.createElement("h3");

        author.textContent = `Author: ${myLibrary[i].author}`;

        let pages = document.createElement("h3");

        pages.textContent = `Pages: ${myLibrary[i].pages}`;

        let read = document.createElement("h3");

        read.textContent = `Read: ${myLibrary[i].read ? "Yes" : "No"}`;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);

        libraryDisplay.appendChild(card);
    }
}

promptAddBook.forEach(element => {
    element.addEventListener("click", () => {
        favDialog.showModal();
    });
});

submitBtn.addEventListener("click", (event)=> {
    event.preventDefault();
    favDialog.close();
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = readInput.value;

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;


    addBookToLibrary(title,author,pages,read);
});
