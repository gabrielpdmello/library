const library = document.querySelector(".library");
const addBookToggle = document.querySelector(".add-book-toggle");
const addBook = document.querySelector(".add-book");
const body = document.body;
const addBookTitleInput = document.querySelector(".book-title-input");
const addBookAuthorInput = document.querySelector(".book-author-input");
const addBookPagesInput = document.querySelector(".book-pages-input");
const addBookIsReadInput = document.querySelector(".book-read-input");
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
  const title = addBookTitleInput.value;
  const author = addBookAuthorInput.value;
  const pages = addBookPagesInput.value;
  const isRead = addBookIsReadInput.checked;
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  addBookCard(title, author, pages, isRead);
  
}

function addBookCard(title, author, pages, isRead) {
  const book = document.createElement("div");
  const bookTitle = document.createElement("h2");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookIsRead = document.createElement("label");
  const checkboxSpan = document.createElement("span");
  const checkboxInput = document.createElement("input");
  const bookRemove = document.createElement("div");
  const bookRemoveText = document.createElement("span");
  const bookRemoveIcon = document.createElement("img");

  book.classList.add("book");
  bookTitle.textContent = title;
  bookTitle.classList.add("bookTitle");
  bookAuthor.textContent = `by ${author}`;
  bookAuthor.classList.add("bookAuthor");
  bookPages.textContent = `${pages} pages`;
  bookPages.classList.add("bookPages");
  bookIsRead.classList.add("bookIsRead");
  checkboxSpan.textContent = "Book read";
  checkboxSpan.classList.add("checkbox__span")
  checkboxInput.setAttribute("type", "checkbox");
  checkboxInput.classList.add("checkbox__input")
  bookRemove.classList.add("book-remove");
  bookRemoveText.textContent = "Remove book";
  bookRemoveText.classList.add("book-remove-text");
  bookRemoveIcon.classList.add("book-remove-icon");
  bookRemoveIcon.setAttribute("src", "icons/close_remove_delete_cross_icon.png");

  if (isRead === true) {
    checkboxInput.setAttribute("checked", "");
  }

  book.appendChild(bookTitle);
  book.appendChild(bookAuthor);
  book.appendChild(bookPages);
  bookIsRead.appendChild(checkboxSpan);
  bookIsRead.appendChild(checkboxInput);
  book.appendChild(bookIsRead);
  bookRemove.appendChild(bookRemoveText);
  bookRemove.appendChild(bookRemoveIcon);
  book.appendChild(bookRemove);
  library.appendChild(book);

  bookRemove.addEventListener("click", ()=> {
    console.log(title);
    console.log(myLibrary.findIndex(myLibrary => myLibrary.title === title))
    library.removeChild(book);
    myLibrary.splice(myLibrary.findIndex(myLibrary => myLibrary.title === title), 1);
  })
}

function bookCard() {
  myLibrary.forEach((item, index, array)=> {
    addBookCard(array[index].title, array[index].author, array[index].pages, array[index].isRead);
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

addBookSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  if (addBookTitleInput.value !== "" && addBookAuthorInput.value !== "" && addBookPagesInput.value !== "" ) {
    addBookToLibrary();
    addBook.classList.add("hide");

    addBookTitleInput.value = "";
    addBookAuthorInput.value = "";
    addBookPagesInput.value = "";
    addBookIsReadInput.checked = false;
  }
});