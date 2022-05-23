const cardList = document.querySelector('.container');
const cardTemplate = cardList.querySelector('.template')


function Book(name, author, pages) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = false;

    this.card = cardTemplate.cloneNode(true);
    this.card.querySelector('.name').innerText = name;
    this.card.querySelector('.author').innerText = author;
    this.card.querySelector('.pages').innerText = pages + " pages";
    this.card.classList.toggle('template');
    this.card.book = this;

    cardList.appendChild(this.card);
}

Book.prototype.readToggle = function(){
    this.read = !this.read;
    this.card.classList.toggle("read")}
Book.prototype.removeCard = function(){
    this.card.addEventListener('transitionend', (e)=>e.target.remove())
    this.card.classList.add('remove');
}


function Library(){
    this.books = [];
}

Library.prototype.addBook = function(name, author, pages){
    this.books.push(new Book(name, author, pages));
}
Library.prototype.deleteBook = function(book){
    book.removeCard();
    this.books = this.books.filter((entry)=> entry != book)
}

const myLib = new Library();
myLib.addBook('Lotr','JK',200,false);
myLib.addBook('Harry', 'Jojo', 120, true);
myLib.addBook('Lotr','JK',200,false);
console.dir(myLib);



const addBook = document.querySelector('.add-book');
