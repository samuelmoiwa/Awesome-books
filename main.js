/* eslint-disable no-unused-vars */
const displaySection = document.querySelector('.book_list');
const addBtn = document.querySelector('#add_btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

let availableBooks = [];

const clear = () => {
  title.value = '';
  author.value = '';
};

class ClassLocalStorage {
  /* save to localStorage */

  static saveToLocalStorage = (availableBooks) => localStorage
    .setItem('availableBooks', JSON.stringify(availableBooks));

  /* get from localStorage */

  static getFromLocalStorage = () => {
    if (JSON.parse(localStorage.getItem('availableBooks'))) {
      availableBooks = JSON.parse(localStorage.getItem('availableBooks'));
    }
  };

  static deleteBook = (index) => {
    const BookList = availableBooks.filter((book) => book !== availableBooks[index]);
    this.saveToLocalStorage(BookList);
    displayItem();
  };
}

/* display items */
const displayItem = () => {
  ClassLocalStorage.getFromLocalStorage();
  displaySection.innerHTML = '';

  availableBooks.forEach((availableBook, index) => {
    displaySection.innerHTML += `
    <div class="availableBook">
      <div class="books_lis_div"> 
        <p class="availableBook_title">${availableBook.title}</p>
        <p class="availableBook_author">${availableBook.author}</p>
      </div>
      <button class="remove">Remove</button>
    </div> `;

    const deleteBtn = document.querySelector('.remove');
    deleteBtn.addEventListener('click', () => {
      ClassLocalStorage.deleteBook([index]);
    });
  });
};

const addBook = (element) => {
  element.preventDefault();
  const addedBook = {
    title: title.value,
    author: author.value,
  };

  availableBooks.push(addedBook);
  clear();
  ClassLocalStorage.saveToLocalStorage(availableBooks);
  displayItem();
};

/* add button */
addBtn.addEventListener('click', addBook);
document.addEventListener('DOMContentLoaded', () => {
  displayItem();
});
