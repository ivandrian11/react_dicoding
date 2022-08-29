document.addEventListener("DOMContentLoaded", function () {
  const books = [];
  const searchResults = [];
  let isSearching = false;
  const RENDER_EVENT = "render-book";

  function generateId() {
    return +new Date();
  }

  function generateBookObject(id, title, author, year, isCompleted) {
    return {
      id,
      title,
      author,
      year,
      isCompleted,
    };
  }

  function addBook() {
    const titleText = document.getElementById("inputBookTitle").value;
    const authorText = document.getElementById("inputBookAuthor").value;
    const yearText = document.getElementById("inputBookYear").value;
    const completedCheck = document.getElementById("inputBookIsComplete").checked;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, titleText, authorText, yearText, completedCheck);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function addBookToCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function findBook(bookId) {
    for (const book of books) {
      if (book.id === bookId) {
        return book;
      }
    }
    return null;
  }

  function removeBookFromList(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    location.reload();
    saveData();
  }

  function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }

  function findBookIndex(bookId) {
    for (const index in books) {
      if (books[index].id === bookId) {
        return index;
      }
    }

    return -1;
  }

  function makeBook(bookObject) {
    const titleText = document.createElement("h3");
    titleText.innerText = bookObject.title;

    const authorText = document.createElement("p");
    authorText.innerText = "Penulis: " + bookObject.author;

    const yearText = document.createElement("p");
    yearText.innerText = "Tahun: " + bookObject.year;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action");

    const checkButton = document.createElement("button");
    checkButton.classList.add("green");

    if (bookObject.isCompleted) {
      checkButton.innerText = "Belum selesai dibaca";
      checkButton.addEventListener("click", function () {
        undoBookFromCompleted(bookObject.id);
      });
    } else {
      checkButton.innerText = "Selesai dibaca";
      checkButton.addEventListener("click", function () {
        addBookToCompleted(bookObject.id);
      });
    }

    const trashButton = document.createElement("button");
    trashButton.classList.add("red");
    trashButton.innerText = "Hapus buku";

    trashButton.addEventListener("click", function () {
      removeBookFromList(bookObject.id);
    });

    buttonContainer.append(checkButton, trashButton);

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(titleText, authorText, yearText, buttonContainer);
    container.setAttribute("id", `book-${bookObject.id}`);

    return container;
  }

  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBookList = document.getElementById("incompleteBookshelfList");
    uncompletedBookList.innerHTML = "";

    const completedBookList = document.getElementById("completeBookshelfList");
    completedBookList.innerHTML = "";

    for (const bookItem of books) {
      const bookElement = makeBook(bookItem);
      if (!bookItem.isCompleted) uncompletedBookList.append(bookElement);
      else completedBookList.append(bookElement);
    }
  });

  // * Update Text Menyesuaikan CheckBox
  const checkBox = document.getElementById("inputBookIsComplete");
  checkBox.addEventListener("click", function (event) {
    const buttonText = document.getElementsByTagName("span")[0];
    if (checkBox.checked) buttonText.innerText = "selesai dibaca";
    else buttonText.innerText = "belum selesai dibaca";
  });

  const searchForm = document.getElementById("searchBook");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchResults.length = 0;

    const bookSearchText = document.getElementById("searchBookTitle").value;
    if (bookSearchText) {
      isSearching = true;
      for (const book of books) {
        if (book.title.toLowerCase().includes(bookSearchText.toLowerCase())) {
          searchResults.push(book);
        }
      }
      console.log(searchResults);
    } else {
      isSearching = false;
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
  });

  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBookList = document.getElementById("incompleteBookshelfList");
    uncompletedBookList.innerHTML = "";

    const completedBookList = document.getElementById("completeBookshelfList");
    completedBookList.innerHTML = "";

    if (isSearching) {
      for (const bookItem of searchResults) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isCompleted) uncompletedBookList.append(bookElement);
        else completedBookList.append(bookElement);
      }
    } else {
      for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isCompleted) uncompletedBookList.append(bookElement);
        else completedBookList.append(bookElement);
      }
    }
  });

  const SAVED_EVENT = "saved-book";
  const STORAGE_KEY = "BOOK_APPS";

  function isStorageExist() {
    if (typeof Storage === undefined) {
      alert("Browser kamu tidak mendukung local storage");
      return false;
    }
    return true;
  }

  function saveData() {
    if (isStorageExist()) {
      const parsed = JSON.stringify(books);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

  document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
  });

  function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
      for (const book of data) {
        books.push(book);
      }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
