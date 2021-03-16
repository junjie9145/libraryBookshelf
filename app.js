const newBook = document.querySelector('.submit');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById("author");
const page = document.getElementById('page');
const container = document.querySelector('.container');
const readStatus = document.getElementById("status");

//constructor
class Bookshelf {
    constructor() {
        this.books = [];
        }

    add(book) {
        this.books.push(book);
    }

    get(index) {
        return this.books[index];
    }

    numberOfBooks () {
        return this.books.length;
    }

    removeBook (bookTitle) {
        this.books = this.books.filter(book => book.title !== bookTitle);
    }

    // findTitle(bookTitle) {
    //     if(this.books.some((book) => book.title !== bookTitle)) return true;
    // }
}

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    toggleStatus() {
        if (this.status === 'Read') {
            return  this.status = 'Unread';
        } else {
            return this.status = 'Read';
        }
    }
}


const myLibrary = new Bookshelf();

restoreFromLocal();

function addBook () {
    if (bookTitle.value === "" || bookAuthor.value ==="" || page.value === "" ) {
        alert("Fill out form");
        return;
    }
    myLibrary.add(new Book(bookTitle.value, bookAuthor.value, page.value, readStatus.value))
    saveToLocal();
    console.log(localStorage);
    let bookIndex = myLibrary.get(myLibrary.numberOfBooks() - 1 );
    makeCard(bookIndex);
    bookTitle.value = '';
    bookAuthor.value = '';
    page.value= '';
    }


newBook.addEventListener("click", addBook);

//create book card
function makeCard (obj) {
    const newCard = document.createElement('div')
    const titleH2 = document.createElement('h2');
    const authorH3 = document.createElement('h3');
    const pageP = document.createElement('p');
    const readStat = document.createElement('p');
    titleH2.textContent = obj.title;
    authorH3.textContent = "By: " + obj.author;
    pageP.textContent = "Number of pages: " + obj.pages;
    readStat.textContent = obj.status;
    newCard.classList.add('new-book');
    container.appendChild(newCard);
    newCard.appendChild(titleH2);
    newCard.appendChild(authorH3);
    newCard.appendChild(pageP);
    newCard.appendChild(readStat);

    const checkMark = document.createElement('i');
    checkMark.classList.add("fa", "fa-check", "have-read");
    newCard.appendChild(checkMark);
    checkMark.addEventListener('click', function(){
        obj.toggleStatus();
        readStat.textContent = obj.status;
    })

    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add("fa", "fa-trash", "deletebtn");
    newCard.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', deleteBook);
}

//show hide form 

const formBtn = document.querySelector('.addbook');
const closeBtn = document.querySelector('#close-x');
const form = document.querySelector('.form');

formBtn.addEventListener('click', ()=> {
    if (form.style.display = "none") form.style.display = "block";
})

closeBtn.addEventListener('click', () => {
    if (form.style.display = 'block') {
        form.style.display = "none"
    }
})

//delete book 
function deleteBook(e) {
    const item = e.target;
    const cardTitle = item.parentNode.firstChild.textContent
    const bookParent = item.parentElement;
    myLibrary.removeBook(cardTitle);
    console.table(myLibrary)
    bookParent.remove();
    saveToLocal();
    }


// save local

function saveToLocal () {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary.books));
}

function restoreFromLocal () {
    let restoredBooks = JSON.parse(localStorage.getItem("myLibrary"));
    if (restoredBooks === null) return;
    restoredBooks.forEach(book =>  {
        myLibrary.books.push(book);
        makeCard(book)});
}