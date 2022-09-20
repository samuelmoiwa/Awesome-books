const displaySection = document.querySelector('.book_list');
const authorText = document.getElementById('author');
const titleText = document.getElementById('title');
const addBtn = document.getElementById('add_btn');

let availableBooks = [];

const addBook = (element) => {
  element.preventDefault();
  const added_Book = {
    title: title.value,
    author: author.value,
  };

  availableBooks.push(added_Book);
  clear();
  saveToLocalStorage(availableBooks);
  displayItem();

};

const clear = () => {
  title.value = '';
  author.value = '';
};

/* add button */
addBtn.addEventListener('click', addBook);
document.addEventListener('DOMContentLoaded', () => {
  displayItem();
});



/* display items*/
const displayItem = () => {
  getFromLocalStorage();
  displaySection.innerHTML = '';

  availableBooks.forEach((availableBook, index) => {

    displaySection.innerHTML += `
    <div class="availableBook">
      <p>${availableBook.title}</p>
      <p>${availableBook.author}</p>
    </div> `;

    /*  Delete btn created*/
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove');
    displaySection.appendChild(removeBtn);
    displaySection.innerHTML += `
    <hr>
    `
    /*  Delete btn remove function*/
    const deleteBtn = document.querySelector('.remove');
    deleteBtn.addEventListener('click', () => {
      deleteBook(index);
    });
  });
};

const deleteBook = (index) => {
  const BookList = availableBooks.filter((book) => 
  book !== availableBooks[index]);
  saveToLocalStorage(BookList);
  displayItem();
};
