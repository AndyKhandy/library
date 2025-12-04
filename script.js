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
const libraryTitle = document.querySelector("#title");
const settingsImg = document.querySelector("#menu");

const settingsData = JSON.parse(localStorage.getItem("libraryData"));
const libraryData = JSON.parse(localStorage.getItem("libraryBooks"));


let currentBooks = 0;
let goalBooks = 10;
let menu = false;

let myLibrary = [];

//PLACE CLASS HERE SO STARTER BOOKS CAN BE INITIALIZED
class Book
{
    goal = false;
    heart = false;
    
    constructor(title,author,pages,pagesR,read, id){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.pagesR = pagesR;
        this.read = read;
        this.id = id;
    }
}

if(settingsData != null)
{
    let libraryName = settingsData.userLibraryName || "My Library";
    currentBooks = settingsData.read || 0;
    goalBooks = settingsData.goal || 10;
    libraryTitle.textContent = libraryName;
    currentBooks--;
    changeMeter();
}

if(libraryData != null)
{
    myLibrary = libraryData || [];
}else{
    //STARTER BOOKS NOT INITIALIZED!
    let starterBook = new Book("Harry Potter Series", "J.K Rowling", 4100, 3400, false, "1");
    let starterBook2 = new Book("Scythe", "Neal Shusterman", 464, 464, false, "2");

    myLibrary[0] = starterBook;
    myLibrary[1] = starterBook2;
}

window.addEventListener("beforeunload",(e)=>{
    settingsData.read = currentBooks;
    localStorage.setItem("libraryData", JSON.stringify(settingsData));

    if(!menu)
    {
        e.preventDefault();
    }
});


displayBook();

function addBookToLibrary(title,author,pages,pagesR, read)
{
    let newBook = new Book(title,author,pages,pagesR,read,crypto.randomUUID());
    myLibrary.push(newBook);
    //update local storage each time when a book is added since beforeunload may not work on mobile applications
    localStorage.setItem("libraryBooks", JSON.stringify(myLibrary));
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
    newPercentage = currentBooks / goalBooks * 100;
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

        let heart = document.createElement("button");
        heart.classList.add("heart", "book-btn");
        heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" /></svg>`;

         if(myLibrary[i].heart == true) {
            heart.classList.add("active");
        }

        heart.addEventListener("click", (event)=>{
            event.stopPropagation();
            heart.classList.toggle("active");
            myLibrary[i].heart = !myLibrary[i].heart;
        });
        

        if(i == 0)
        {
            let currentlyReading = document.createElement("h2");
            currentlyReading.textContent = "CURRENTLY READING";
            currentlyReading.classList.add("current-book");
            cardInfo.appendChild(currentlyReading);
        }

        cardInfo.appendChild(completed);
        cardInfo.appendChild(title);
        cardInfo.appendChild(author);
        cardInfo.appendChild(pages);
        cardInfo.appendChild(read);
        cardInfo.appendChild(heart);

        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("flex","flex-gap");

        let delBtn = document.createElement("button");
        delBtn.classList.add("delete", "book-btn");
        buttonDiv.appendChild(delBtn);
        delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;

        let finishBtn = document.createElement("button");
        finishBtn.classList.add("finish", "book-btn");
        buttonDiv.appendChild(finishBtn);
        finishBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" /></svg>`;

        let editBtn = document.createElement("button");
        editBtn.classList.add("edit", "book-btn");
        buttonDiv.appendChild(editBtn);
        editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.13 12L19.39 10.74C19.83 10.3 20.39 10.06 21 10V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H11V19.13L11.13 19H5V5H12V12H18.13M14 4.5L19.5 10H14V4.5M19.13 13.83L21.17 15.87L15.04 22H13V19.96L19.13 13.83M22.85 14.19L21.87 15.17L19.83 13.13L20.81 12.15C21 11.95 21.33 11.95 21.53 12.15L22.85 13.47C23.05 13.67 23.05 14 22.85 14.19Z" /></svg>`

         delBtn.addEventListener("click", (event)=>{
            event.stopPropagation();
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

        finishBtn.addEventListener("click", (event)=>{
            event.stopPropagation();
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

        if (myLibrary[i].read){
            if(myLibrary[i].goal == false)
            {
                changeMeter();
                myLibrary[i].goal = true;
            }
            finishBtn.classList.add("active");
        }

        editBtn.addEventListener("click",(event)=>{
            event.stopPropagation();
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

        card.addEventListener("click", (event)=>{
            let temp = myLibrary[i];
            myLibrary.splice(i, 1);
            myLibrary.unshift(temp);
            displayBook();
        });

        libraryDisplay.appendChild(card);
    }
}

settingsImg.addEventListener("click", ()=>{
    menu = true;
    window.location.href = 'settings.html';
})

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

    addBookToLibrary(title,author,pages, pagesR,read);
    form.reset();
    favDialog.close();
})

