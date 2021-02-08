const adder = document.querySelector('#adder')
const topContainer = document.querySelector('#topContainer')
const mainContainer = document.querySelector('#mainContainer')
const form = document.querySelector('#formy')
const titleInput = form.querySelector('#title')
const authorInput = form.querySelector('#author')
const pagesInput = form.querySelector('#pages')
const readBtn = form.querySelector('#readBtn')
const submit = form.querySelector('#submit')
const sun = document.querySelector('#sun');

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
  if(validateForm()){
      console.log(readBtn.checked)
      newBook = createBook(titleInput.value, authorInput.value,
      Number(pagesInput.value), readBtn.checked);
      reset();
      library.push(newBook);
      console.table(library);
      togFormDrawer();
  }
}

function reset(){
  titleInput.value = '';
  authorInput.value = ''
  pagesInput.value = ''
  if(readBtn.checked){
    change_state(readBtn);
    readBtn.checked = false;
  }

}
// FORM VALIDATION
function validateForm(e){
      const title = titleInput.value;
      const author = authorInput.value;
      const pages = pagesInput.value;
      if(!(title === '')&&!(author === '')&& !(pages==='')){
        pagesInput.style.backgroundColor = '#202124'
        titleInput.style.backgroundColor = '#202124'
        authorInput.style.backgroundColor = '#202124'
        console.log('DONE')
        return true;

      }
      if(title === ''){
        titleInput.style.backgroundColor = 'red'
      }else{
        titleInput.style.backgroundColor = '#202124'
      }
      if(author === ''){
        authorInput.style.backgroundColor = 'red'
      }else{
        authorInput.style.backgroundColor = '#202124'
      }
      if(pages === ''){
        pagesInput.style.backgroundColor = 'red'
      }else{
        pagesInput.style.backgroundColor = '#202124'
      }
    return false;
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
// <div class="item">
  // <div id = 'xHolder'>
  //   <i class="fas fa-times fa-lg"></i>
  // </div>
// </div>
function createBoxes(){
    const newDiv = document.createElement("div");
    newDiv.classList.add('item')
    newDiv.innerHTML = "<div id = 'xHolder'><i class='fas fa-times fa-lg'></i></div>";
    currentDiv = document.querySelector('.item');

    mainContainer.insertBefore(newDiv, currentDiv);

}
// EVENT LISTENERS
sun.addEventListener('click', createBoxes);
adder.addEventListener('click', togFormDrawer)
submit.addEventListener('click', handleSubmit)
