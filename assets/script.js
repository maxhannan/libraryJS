const adder = document.querySelector('#adder')
const topContainer = document.querySelector('#topContainer')
const form = document.querySelector('#formy')
const titleInput = form.querySelector('#title')
const authorInput = form.querySelector('#author')
const pagesInput = form.querySelector('#pages')
const readBtn = form.querySelector('#readBtn')
const submit = form.querySelector('#submit')


// LIBRARY ARRAY
let library = [];
// OPENS AND CLOSES FORM DRAWER
function togFormDrawer(){
  topContainer.classList.toggle('active')
}
// TOGGLE BUTTON
function change_state(obj){
  obj.parentNode.classList.toggle("checked");
}
// SUBMIT BUTTON
function  handleSubmit(e){
  e.preventDefault();
  console.log(readBtn.checked)
  newBook = createBook(titleInput.value, authorInput.value,
  pagesInput.value, readBtn.checked);
  library.push(newBook);
  console.table(library);
  if(readBtn.checked){
    change_state(readBtn);
    readBtn.checked = false;
  }
  togFormDrawer();
}

//Book logic
const Book = {
    init: function(title, author, numOfPages, readStatus){
        this.title = title;
        this.numOfPages = numOfPages;
        this.author = author;
        this.readStatus = readStatus;
    },
    info: function(){
        let readStr;
        if(this.readStatus){
            readStr = "Read"
        }else{
            readStr = "Not read yet"
        }
        return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${readStr}.`;
    }
}

function createBook(title, author, pages, readStatus){
  let newBook = Object.create(Book);
  newBook.init(title, author, pages, readStatus);
  return newBook;
}

// EVENT LISTENERS
adder.addEventListener('click', togFormDrawer)
submit.addEventListener('click', handleSubmit)
