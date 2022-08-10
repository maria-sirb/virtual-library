function Book(title, author, pages, status)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    
}
Book.prototype.getInfo = function(){

    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;
};
function addBookToLibrary(book)
{
    const container = document.querySelector('.container');

   myLibrary.push(book);
  
   //create the card element
   let newCard = document.createElement('div');

   //create the close button 
   let closeBtn = document.createElement('button');
   closeBtn.classList.add('close-button-card');
   let closeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
   closeIcon.setAttribute('viewBox', '0 0 24 24');
   let closePath = document.createElementNS('http://www.w3.org/2000/svg','path');
  closePath.setAttribute('d', "M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z");
  
  //add remove card functionality to the closing button
  closeBtn.addEventListener('click', () => {

    const bookCard = closeBtn.parentElement;
    bookCard.remove();
   });

  closeIcon.appendChild(closePath);
  closeBtn.appendChild(closeIcon);

  //add text content to the card
   let bookTitle = document.createElement('p');
   bookTitle.innerHTML = `<span style ='color: #4e581d'>Title:  </span> <em> ${book.title}</em>`;
   let bookAuthor = document.createElement('p');
   bookAuthor.innerHTML = `<span style ='color: #4e581d'>Author:  </span> <em> ${book.author}</em>`;
   let bookPages = document.createElement('p');
   bookPages.innerHTML =`<span style ='color: #4e581d'>Pages:  </span> <em>${book.pages}</em>`;
   let bookStatus = document.createElement('button');
   bookStatus.textContent = book.status;
   if(book.status == "read")
   {
    bookStatus.classList.add('status-button-read');
   }
   else
   {
    bookStatus.classList.add('status-button-not-read');
   }
   
   //add changing status functionality
   bookStatus.addEventListener('click', () =>{

       if(bookStatus.classList.contains('status-button-read'))
       {
         bookStatus.classList.replace('status-button-read', 'status-button-not-read');
         book.status = 'not read';
        
       }
       else if(bookStatus.classList.contains('status-button-not-read')){
        bookStatus.classList.replace('status-button-not-read','status-button-read');
         book.status = 'read';
       }
       bookStatus.textContent = book.status;
      
   });
   

   newCard.appendChild(closeBtn);
   newCard.appendChild(bookTitle);
   newCard.appendChild(bookAuthor);
   newCard.appendChild(bookPages);
   newCard.appendChild(bookStatus);

   newCard.classList.add('card');

   container.appendChild(newCard);
   console.log(newCard);
   console.log(closeIcon);
   return myLibrary;
}
let myLibrary = [];

/*let myBook = new Book("Fahrenheit 451", "Ray Bradbury", "300", "read");
console.log(myBook.getInfo());
for(let i = 0; i <= 5; i++)
   addBookToLibrary(myBook);
console.log(myLibrary);*/
const main = document.querySelector('main');

//add functionality to the add button: display form
const addBtn = document.querySelector('.add-btn');
addBtn.addEventListener('click', () => {

    const hiddenContent = document.getElementById('hidden-content');

    console.log(hiddenContent);
    hiddenContent.classList.replace('hidden', 'showing');
    hiddenContent.classList.replace('hidden-animation', 'showing');

    const closeForm = document.querySelector('.close-button-form');
    closeForm.addEventListener('click', () =>{

        hiddenContent.classList.replace('showing', 'hidden-animation');
        console.log(hiddenContent);
       
    });

    //make form empty again after adding a new book
    fields.forEach(item =>{
        item.value = "";
        item.textContent = "";
        item.style.borderColor = 'var(--accent-color)';
    });
    

});

//add colors to input borders based on validity
const fields = document.querySelectorAll('.field input');

fields.forEach(item => {

    item.addEventListener('input', () => {
         
        if(item.validity.valid)
        {
            item.style.borderColor = 'var(--second-accent-color)';
        }
        if(item.value == "")
        {
            item.style.borderColor = 'var(--accent-color)';
        }
    });
});

//on submit, check if there are empty fields
//if there are, highlight the input borders and prevent submission
//if not, submit and add the new book to the library
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', (event) => {
   
    let allInputs = [];
    let emptyFields = 0;
    const inputTitle = document.getElementById('title');
    const inputAuthor = document.getElementById('author');
    const inputPages = document.getElementById('pages');
    const inputStatus = document.querySelector('input[type = "radio"]:checked');

     console.log(inputTitle + " " + inputAuthor + " " + inputPages);

     allInputs.push(inputTitle, inputAuthor, inputPages);
     allInputs.forEach(item => {

        if(item.value == ""){
             
            emptyFields++;
            item.style.borderColor = 'var(--secondary-color)';

        }
     });

    if(emptyFields > 0)
    {
        event.preventDefault();
    }
    else
    {
        myBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputStatus.value);
        addBookToLibrary(myBook);
        hiddenContent = document.getElementById('hidden-content');
        hiddenContent.classList.replace('showing', 'hidden-animation');
        console.log(hiddenContent);
    }
    
    
});

//prevent page from refreshing when form is subbmited
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {

    event.preventDefault();
});




