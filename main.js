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

    if (Array.isArray(this.availableBooks)) {
      this.availableBooks.push(addedBook);
      clear();
      this.saveToLocalStorage(this.availableBooks);
      displayItem();
    } else {
      console.log('arr variable does not store an array');
    }
  };

  static deleteBook = (index) => {
    const BookList = this.availableBooks.filter((book) => book !== this.availableBooks[index]);
    this.saveToLocalStorage(BookList);
    displayItem();
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
}

const clear = () => {
  title.value = '';
  author.value = '';
};

/* display items */
const displayItem = () => {
  classAddBooks.getFromLocalStorage();
  displaySection.innerHTML = '';
  classAddBooks.availableBooks.forEach((availableBook, index) => {
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
      classAddBooks.deleteBook(index);
    });
  });
};

/* add button */
addBtn.addEventListener('click', classAddBooks.addBook);
document.addEventListener('DOMContentLoaded', () => {
  displayItem();
});
