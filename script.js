const promptAddBook = document.querySelectorAll(".new");

const favDialog = document.querySelector("#favDialog");
const cancelBtn = document.querySelector("#cancel");
const libraryDisplay = document.querySelector(".library-books");

const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const readInput = document.querySelector("#readInput");
const pagesRInput = document.querySelector("#pagesRInput");
const meter = document.querySelector("header .goal-meter");
const meterText = document.querySelector(".goal h2");
const form = document.querySelector("#bookForm");

const myLibrary = [];
let currentBooks = 5;
let goalBooks = 10;

function Book(title,author,pages,pagesR,read,id)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesR = pagesR;
    this.read = read;
    this.id = id;
    this.goal = false;
}

let starterBook = new Book("Harry Potter", "J.K Rowling", 4100, 3400, false, "1");

myLibrary[0] = starterBook;

displayBook();

function addBookToLibrary(title,author,pages,pagesR, read)
{
    let newBook = new Book(title,author,pages,pagesR,read,crypto.randomUUID());
    myLibrary.push(newBook);
    displayBook();
}

function clearLibrary()
{
    libraryDisplay.innerHTML = "";
}

function changeMeter()
{
    currentBooks++;
    meterText.textContent = `${currentBooks}/${goalBooks} Books`;
    let newPercentage = currentBooks / goalBooks * 100;
    meter.style.setProperty("--fill-width",`${newPercentage}%`);
}

function displayBook()
{
    clearLibrary();
    for(let i = 0; i < myLibrary.length; i++)
    {
         let card = document.createElement("div");
        card.classList.add("book", "card", "flex", "flex-col");
        card.dataset.bookId = myLibrary[i].id;

        let cardInfo = document.createElement("div");

        let completed = document.createElement("p");
        completed.classList.add("completion");
        completed.textContent = `${Math.floor(myLibrary[i].pagesR/myLibrary[i].pages*100)}% Done`

        let title = document.createElement("h2");
        title.textContent = myLibrary[i].title;

        let author = document.createElement("h3");
        author.textContent = `Author: ${myLibrary[i].author}`;

        let pages = document.createElement("h3");
        pages.textContent = `Pages: ${myLibrary[i].pagesR}/${myLibrary[i].pages}`;

        let read = document.createElement("h3");
        read.textContent = `Read: ${myLibrary[i].read ? "Yes" : "No"}`;

        cardInfo.appendChild(completed);
        cardInfo.appendChild(title);
        cardInfo.appendChild(author);
        cardInfo.appendChild(pages);
        cardInfo.appendChild(read);

        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("flex","flex-gap");

        let delBtn = document.createElement("button");
        delBtn.classList.add("delete", "bookBtn");
        buttonDiv.appendChild(delBtn);
        delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;

        let finishBtn = document.createElement("button");
        finishBtn.classList.add("finish", "bookBtn");
        buttonDiv.appendChild(finishBtn);
        finishBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" /></svg>`;

        let editBtn = document.createElement("button");
        editBtn.classList.add("edit", "bookBtn");
        buttonDiv.appendChild(editBtn);
        editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.13 12L19.39 10.74C19.83 10.3 20.39 10.06 21 10V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H11V19.13L11.13 19H5V5H12V12H18.13M14 4.5L19.5 10H14V4.5M19.13 13.83L21.17 15.87L15.04 22H13V19.96L19.13 13.83M22.85 14.19L21.87 15.17L19.83 13.13L20.81 12.15C21 11.95 21.33 11.95 21.53 12.15L22.85 13.47C23.05 13.67 23.05 14 22.85 14.19Z" /></svg>`

         delBtn.addEventListener("click", ()=>{
            for(let j = 0; j < myLibrary.length; j++)
            {
                if(card.dataset.bookId === myLibrary[j].id)
                {
                   myLibrary.splice(j,1);
                   break;
                }
            }
            libraryDisplay.removeChild(card);
            displayBook();
        });

        finishBtn.addEventListener("click", ()=>{
            if(myLibrary[i].read == false && myLibrary[i].goal == false)
            {
                changeMeter();
                myLibrary[i].read = true;
                myLibrary[i].goal = true;
            }
            else {
                myLibrary[i].read = !myLibrary[i].read;
            }

            myLibrary[i].read ? read.textContent = "Read: Yes" : read.textContent = "Read: No";
            finishBtn.classList.toggle("active");
        });

        editBtn.addEventListener("click",()=>{
            let newPages = prompt("What page are you on now?");
            if(newPages != null && newPages != "" && newPages <= myLibrary[i].pages && newPages > 0)
            {
                myLibrary[i].pagesR = newPages;
                if(newPages == myLibrary[i].pages)
                {
                    const clickEvent = new Event("click");
                    finishBtn.dispatchEvent(clickEvent);
                }
                displayBook();
            }
        })

        card.appendChild(cardInfo);
        card.appendChild(buttonDiv);
        libraryDisplay.appendChild(card);
    }
}


promptAddBook.forEach(element => {
    element.addEventListener("click", () => {
        favDialog.showModal();
    });
});

cancelBtn.addEventListener("click", (e)=>{
    favDialog.close();
    form.reset();
});

form.addEventListener("submit", (e)=>{
     e.preventDefault();

    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = readInput.checked;
    let pagesR = pagesRInput.value;

    if(read)
    {
        changeMeter();
    }

    addBookToLibrary(title,author,pages, pagesR,read);
    form.reset();
    favDialog.close();
})

