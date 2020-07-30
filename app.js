// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI COnstructor
function UI() {}

// Add book to list
UI.prototype.addBooktoList = function(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;

    list.appendChild(row);

    console.log(row);
}

// Delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear Fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// SHow Alert
UI.prototype.showAlert = function(message, className) {
    // Create div and add class
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    // Append text to div
    div.appendChild(document.createTextNode(message));
    // Get parent elements
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert div
    container.insertBefore(div, form);
    // Disappear after 3seconds
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', 
function(e) {
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    
    //Instantiate book
    const book = new Book(title, author, isbn);

    //Instantiate UI object
    const ui = new UI();

    // Validate
    if(title === "" || author === "" || isbn === "") {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // UI add book to list
        ui.addBooktoList(book);

        // Show Success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for delete book
document.getElementById('book-list').addEventListener('click', 
function(e) {
    const ui = new UI();

    ui.deleteBook(e.target);

    ui.showAlert('Book removed', 'success');

    e.preventDefault();
});
