const displaySection = document.querySelector('.book_list');
const addBtn = document.querySelector('#add_btn');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

let availableBooks = [];

const clear = () => {
  title.value = '';
  author.value = '';
};

/* save to localStorage */

const saveToLocalStorage = (availableBooks) => localStorage.setItem('availableBooks', JSON.stringify(availableBooks));

/* get from localStorage */

const getFromLocalStorage = () => {
  if (JSON.parse(localStorage.getItem('availableBooks'))) { availableBooks = JSON.parse(localStorage.getItem('availableBooks')); }
};

const deleteBook = (index) => {
  const BookList = availableBooks.filter((book) => book !== availableBooks[index]);
  saveToLocalStorage(BookList);
  displayItem();
};

/* display items */
const displayItem = () => {
  getFromLocalStorage();
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
      deleteBook(index);
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
  saveToLocalStorage(availableBooks);
  displayItem();
};

/* add button */
addBtn.addEventListener('click', addBook);
document.addEventListener('DOMContentLoaded', () => {
  displayItem();
});
