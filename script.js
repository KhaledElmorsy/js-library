
function Book(name, author, pages, read) {
    this.name = new String(name);
    this.author = new String(author);
    this.pages = new String(pages);
    this.read = read;
}

Book.prototype.readToggle = function(){this.read = !this.read;}

function Library(){
    this.books = [];
}

Library.prototype.addBook = function(name, author, pages ,read){
    this.books.push(new Book(name, author, pages ,read));
}

const books = document.querySelector('.container');
const cardTemplate = books.querySelector('.template')


const myLib = new Library();
myLib.addBook('Lotr','JK',200,false);
myLib.addBook('Harry', 'Jojo', 120, true)
console.dir(myLib)
cardTemplate


for(book of myLib.books){
    const card = cardTemplate.cloneNode(true);
    const cardName = card.querySelector('.name');
    const cardAuthor = card.querySelector('.author');
    const cardPages = card.querySelector('.pages');

    cardName.innerText = book.name;
    cardAuthor.innerText = book.author;
    cardPages.innerText = book.pages + ' pages';
    card.classList.toggle('template');

    books.appendChild(card);
}


function newBook() {

}

const addBook = document.querySelector('.add-book');
