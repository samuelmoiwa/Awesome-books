/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const displaySection = document.querySelector('.book_list');
const addBtn = document.querySelector('#add_btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

class classAddBooks {
  constructor() {
    this.availableBooks = [];
  }

  static addBook = (element) => {
    element.preventDefault();
    const addedBook = {
      title: title.value,
      author: author.value,
    };

    this.availableBooks.push(addedBook);
    clear();
    this.saveToLocalStorage(this.availableBooks);
    this.displayItem();
  };

  static deleteBook = (index) => {
    const BookList = this.availableBooks.filter((book) => book !== this.availableBooks[index]);
    this.saveToLocalStorage(BookList);
    this.displayItem();
  };

  /* save to localStorage */
  static saveToLocalStorage = (availableBooks) => localStorage
    .setItem('availableBooks', JSON.stringify(availableBooks));

  /* get from localStorage */
  static getFromLocalStorage = () => {
    if (JSON.parse(localStorage.getItem('availableBooks'))) {
      this.availableBooks = JSON.parse(localStorage.getItem('availableBooks'));
    }
  };

  /* display items */
  static displayItem = () => {
    this.getFromLocalStorage();
    displaySection.innerHTML = '';
    this.availableBooks.forEach((availableBook, index) => {
      displaySection.innerHTML += `
      <div class="availableBook">
        <div class="books_lis_div"> 
          <p class="availableBook_title">${availableBook.title}</p>
          <p class="availableBook_author">${availableBook.author}</p>
        </div>
        <button class="remove">Remove</button>
      </div> 
      `;

      const deleteBtn = document.querySelector('.remove');
      deleteBtn.addEventListener('click', () => {
        this.deleteBook(index);
      });
    });
  };
}

const clear = () => {
  title.value = '';
  author.value = '';
};

/* add button */
addBtn.addEventListener('click', classAddBooks.addBook);
document.addEventListener('DOMContentLoaded', () => {
  classAddBooks.displayItem();
});
