const promptAddBook = document.querySelectorAll(".new");

const favDialog = document.querySelector("#favDialog");
const cancelBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");
const libraryDisplay = document.querySelector(".library-books");

const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const readInput = document.querySelector("#readInput");
const pagesRInput = document.querySelector("#pagesRInput");
const meter = document.querySelector("header .goal-meter");
const meterText = document.querySelector(".goal h2");

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
        delBtn.textContent = "Delete";
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

        buttonDiv.appendChild(delBtn);

        if(!myLibrary[i].read)
        {
            let finishBtn = document.createElement("button");

            finishBtn.classList.add("finish");
            finishBtn.textContent = "Finish";
            buttonDiv.appendChild(finishBtn);

             let editBtn = document.createElement("button");
             editBtn.classList.add("edit");
             editBtn.style["background-image"] = 'url("img/editPage.svg")';

             finishBtn.addEventListener("click", ()=>{
                read.textContent = `Read: Yes`;
                myLibrary[i].read = true;
                buttonDiv.removeChild(finishBtn);
                buttonDiv.removeChild(editBtn);
                changeMeter();
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
                    changeMeter();
                }
                displayBook();
            }
            })

            buttonDiv.appendChild(editBtn);
        }


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

submitBtn.addEventListener("click", (event)=> {
    favDialog.close();
    event.preventDefault();

    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = readInput.checked;
    let pagesR = pagesRInput.value;

    if(read)
    {
        changeMeter();
    }

    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
    pagesRInput.value = "";

    addBookToLibrary(title,author,pages, pagesR,read);

});

