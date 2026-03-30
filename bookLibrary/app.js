// Book Class : Represent a Book 
 class Book {
     constructor(title,author,isbn){
         this.title = title;
         this.author = author;
         this.isbn = isbn;
     }
 }

// UI Class : Handle UI Task 
 class UI {
     static displayBooks(){
         // hardcoded array of books pretend as local storage 
         const StoredBooks = [
        {
            title : 'Book One',
            author: 'John Doe',
            isbn  : '343434'
         },
         {
            title : 'Book Two',
            author: 'Jane Doe',
            isbn  : '4545'
         }
         ];
         const books = StoredBooks;  // just for storage 

         books.forEach((book) => UI.addBookToList(book)); // stored data in book ==>and make addbookToList method 
     }
     static addBookToList(book){
         const list = document.querySelector('#book-list'); // select a id or document.getElementById

         const row = document.createElement('tr')
         row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href ="#" class ="btn btn-danger btn-sm delete">X</a></td>
         `;
         list.appendChild(row);
     }
 }

// Store Class : Handle Storage

// Event : Display Books
 document.addEventListener('DOMContentLoaded',UI.displayBooks);
// Event: Add a Book 
document.querySelector('#book-form').addEventListener('submit',(e) =>{
debugger
    // Prevent Defualt 
    e.preventDefault();
    // Get Form Value

    const title = document.querySelector("#title.value")
    const author = document.querySelector("#author.value")
    const isbn = document.querySelector("#isbn.value")

    // Instatite book

    const book = new Book(title,author,isbn)
    console.log(book)

    // add Book to UI
    UI.addBookToList(book);
});
// Remove a Book