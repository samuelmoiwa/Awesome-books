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



/* add button */
addBtn.addEventListener('click', addBook);
document.addEventListener('DOMContentLoaded', () => {
  displayItem();
});
