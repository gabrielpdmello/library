const libraryContainer = document.querySelector(".library");
const addBookToggle = document.querySelector(".add-book-toggle");
const addBook = document.querySelector(".add-book");
const body = document.body;
const addBookSubmit = document.querySelector(".add-book-submit");

const myLibrary = [
  {
    title: "How to Build a Car",
    author: "Adrian Newey",
    pages: 400,
    isRead: true
  },
  
  {
    title: "Haunting Adeline",
    author: "H D Carlton",
    pages: 606,
    isRead: false
  },
  
  {
    title: "Animal Farm",
    author: "George Orwell",
    pages: 160,
    isRead: true
  }
];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead; 
}

function addBookToLibrary() {
  
}

function bookCard() {
  myLibrary.forEach((item, index, array)=> {
    const book = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const isRead = document.createElement("label");
    const checkboxSpan = document.createElement("span");
    const checkboxInput = document.createElement("input");

    book.classList.add("book");
    title.textContent = array[index].title;
    title.classList.add("bookTitle");
    author.textContent = `by ${array[index].author}`;
    author.classList.add("bookAuthor");
    pages.textContent = `${array[index].pages} pages`;
    pages.classList.add("bookPages");
    isRead.classList.add("bookIsRead");
    checkboxSpan.textContent = "Book read";
    checkboxSpan.classList.add("checkbox__span")
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.classList.add("checkbox__input")

    if (array[index].isRead === true) {
      checkboxInput.setAttribute("checked", "");
    }

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    isRead.appendChild(checkboxSpan);
    isRead.appendChild(checkboxInput);
    book.appendChild(isRead);
    libraryContainer.appendChild(book);
  })
}

bookCard();

document.addEventListener("click", e => {
  if (addBookToggle.contains(e.target) && addBook.classList.contains("hide")) {
    addBook.classList.remove("hide");
  } else if (!addBook.contains(e.target) && !addBook.classList.contains("hide")) {
    addBook.classList.add("hide");
  }
});

addBookSubmit.addEventListener("click", addBookToLibrary);