/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const displaySection = document.querySelector('.book_list');
const addBtn = document.querySelector('#add_btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

class classAddBooks {
  static availableBooks = [];

  static addBook = (element) => {
    element.preventDefault();
    const addedBook = {
      title: title.value,
      author: author.value,
    };

    this.availableBooks.push(addedBook);
    clear();
    ClassLocalStorage.saveToLocalStorage(this.availableBooks);
    displayItem();
  };

  static deleteBook = (index) => {
    const BookList = this.availableBooks.filter((book) => book !== this.availableBooks[index]);
    ClassLocalStorage.saveToLocalStorage(BookList);
    displayItem();
  };
}

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
      classAddBooks.availableBooks = JSON.parse(localStorage.getItem('availableBooks'));
    }
  };
}

/* display items */
const displayItem = () => {
  ClassLocalStorage.getFromLocalStorage();
  displaySection.innerHTML = '';

  classAddBooks.availableBooks.forEach((availableBook, index) => {
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
      classAddBooks.deleteBook([index]);
    });
  });
};

/* add button */
addBtn.addEventListener('click', classAddBooks.addBook);
document.addEventListener('DOMContentLoaded', () => {
  displayItem();
});

/* Implementation of Single-Page Application */
function shufflePage(page) {
  document.querySelectorAll('div.main').forEach((page) => {
    page.style.display = 'none';
  });

  document.querySelector(`#${page}`).style.display = 'block';
}

document.querySelectorAll('.nav-list a').forEach((link) => {
  link.addEventListener('click', (e) => {
    shufflePage(e.target.dataset.page);
  });
});
