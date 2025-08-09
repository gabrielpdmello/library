const library = document.querySelector(".library");
const addBookToggle = document.querySelector(".add-book-toggle");
const addBookWindow = document.querySelector(".add-book-window");
const bookTitleInput = document.querySelector(".book-title-input");
const bookAuthorInput = document.querySelector(".book-author-input");
const bookPagesInput = document.querySelector(".book-pages-input");
const bookIsReadInput = document.querySelector(".book-read-input");
const bookSubmit = document.querySelector(".add-book-submit");
const noBooks = document.querySelector(".no-books");

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
  const title = bookTitleInput.value;
  const author = bookAuthorInput.value;
  const pages = bookPagesInput.value;
  const isRead = bookIsReadInput.checked;
  const book = new Book(title, author, pages, isRead);
  if (!myLibrary.length) {
    noBooks.classList.add("hide");
  }
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

  checkboxInput.addEventListener("click", () => {
    let index = myLibrary.findIndex(myLibrary => myLibrary.title === title);
    if (myLibrary[index].isRead === true) {
      myLibrary[index].isRead = false;
    } else {
      myLibrary[index].isRead = true;
    }
  })

  bookRemove.addEventListener("click", () => {
    let index = myLibrary.findIndex(myLibrary => myLibrary.title === title);
    console.log(`${title} removed`)
    library.removeChild(book);
    myLibrary.splice(index, 1);
    if (!myLibrary.length) {
      noBooks.classList.remove("hide");
    }
  })
}

function bookCard() {
  myLibrary.forEach((item, index, array)=> {
    addBookCard(array[index].title, array[index].author, array[index].pages, array[index].isRead);
  })
}

bookCard();

// toggle window
document.addEventListener("click", e => {
  if (addBookToggle.contains(e.target) && addBookWindow.classList.contains("hide")) {
    addBookWindow.classList.remove("hide");
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookPagesInput.value = "";
    bookIsReadInput.checked = false;
  } else if (!addBookWindow.contains(e.target) && !addBookWindow.classList.contains("hide")) {
    addBookWindow.classList.add("hide");
  }
});

bookSubmit.addEventListener("click", () => {
  if (bookTitleInput.value !== "" && bookAuthorInput.value !== "" && bookPagesInput.value !== "" ) {
    addBookToLibrary();
    addBookWindow.classList.add("hide");
  }
});

["input", "invalid"].forEach((e) => {
    bookTitleInput.addEventListener(e, () => {
    if (bookTitleInput.validity.valueMissing) {
      bookTitleInput.setCustomValidity("Book title required");
    } else {
      bookTitleInput.setCustomValidity("");
    }
  })

  bookAuthorInput.addEventListener(e, () => {
    if (bookAuthorInput.validity.valueMissing) {
      bookAuthorInput.setCustomValidity("Book author required");
    } else {
      bookAuthorInput.setCustomValidity("");
    }
  })

  bookPagesInput.addEventListener(e, () => {
    if (bookPagesInput.validity.valueMissing) {
      bookPagesInput.setCustomValidity("Book pages required");
    } else if (bookPagesInput.validity.badInput) {
      bookPagesInput.setCustomValidity("Must be a number!");
    } else {
      bookPagesInput.setCustomValidity("");
    }
  })
})
