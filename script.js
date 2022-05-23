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

const modal = document.querySelector('.modal')
modal.onmousedown = (e)=> {
    let type = e.target.type;
    if (['text','submit','number'].indexOf(type) != -1) return;

    let styles = getComputedStyle(modal);
    startX = e.clientX - styles.left.replace('px', "");
    startY = e.clientY - styles.top.replace('px', "");
    
    modal.onmousemove = (e)=> {
        modal.style.top = (e.clientY - startY) + 'px';
        modal.style.left = (e.clientX - startX) + 'px';
    } 
}
modal.onmouseup = ()=> modal.onmousemove = null;
document.onmousedown = (e) => {
    if (!modal.classList.contains('scaled')){
       const clickOut = !e.path.slice(0,-2).reduce((flag,e)=> {
           return flag || !!e.classList.contains('modal');
        },false)

        if (clickOut) modal.classList.toggle('scaled');
    }

}

const form = document.querySelector('form')
const nameInput = form.querySelector('[name="name"]')
const authorInput = form.querySelector('[name="author"]')
const pagesInput = form.querySelector('[name="pages"]')
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let name = nameInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    myLib.addBook(name, author, pages);
    modal.classList.toggle('scaled');
})

const addBook = document.querySelector('.add-book');
addBook.addEventListener('mouseup', (e)=>{
    let timeout = 0;
    if (modal.classList.contains('scaled')) timeout = 300;
    setTimeout(()=>{
        modal.classList.toggle('scaled');
        nameInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        modal.style.top = '30vh';
        modal.style.left = '30vw';},timeout)
})

const myLib = new Library();
