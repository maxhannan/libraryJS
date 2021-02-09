const body = document.querySelector('body')
const adder = document.querySelector('#adder')
const topContainer = document.querySelector('#topContainer')
const logoText = topContainer.querySelector('#logoText')
const btnContainer = topContainer.querySelector('#btnContainer');
const mainContainer = document.querySelector('#mainContainer')
const form = document.querySelector('#formy')
const titleInput = form.querySelector('#title')
const authorInput = form.querySelector('#author')
const pagesInput = form.querySelector('#pages')
const readBtn = form.querySelector('#readBtn')
const submit = form.querySelector('#submit')
const sun = document.querySelector('#sun');

let lightmode = false;

// FORM AND HEADER 
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
      localStorage.setItem('library', JSON.stringify(library));
      let ix = library.indexOf(newBook);
      createBox(newBook,ix)
      togFormDrawer();
  }
}

// RESETS FORM
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

//Book Object
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
// CREATES AND INITIALIZES NEW BOOK
function createBook(title, author, pages, readStatus){
  let newBook = Object.create(Book);
  newBook.init(title, author, pages, readStatus);
  console.log(newBook.info());
  return newBook;
}
// CREATES BOX DIVS FOR DOM
function createBox(book,ix){
    const newDiv = document.createElement("div");
    newDiv.classList.add('item')
    // ADDS GREEN READ CLASS IF READ
    if(book.readStatus){
      newDiv.classList.add('green')
    }
    // DATA ATT CORRESPONDS TO INDEX IN LIBRARY
    newDiv.setAttribute("data-ix", ix)
    newDiv.innerHTML = `
    <div id = 'xHolder'>
      <i class='fas fa-times fa-sm'></i>
    </div>
    <div class = 'bookInfo'>
      <p id = 'boxContent'><span class = 'titleBook'>${book.title}</span><br>
      ${book.author}<br>
      <span class = 'pages'> ${book.numOfPages} pages</span><br>
      <span class = 'readStatus'>${book.readStatus ? 'read' : 'not read'}</span></p>
    </div>`;
    currentDiv = document.querySelector('.item');
    mainContainer.insertBefore(newDiv, currentDiv);
    containerChange();
    exes = document.querySelectorAll('.fa-times');
    exes.forEach(x => x.addEventListener('click', handleDeletes));
    readBtns = document.querySelectorAll('.readStatus');
    readBtns.forEach(btn => btn.addEventListener('click', handleReadChanges));
  }

// HANDLES DELETE OF DOM OBJECTS
function handleDeletes(e){
  let trashDiv = e.target.parentNode.parentNode;
  trashDiv.classList.add('horizTranslate');
  library.splice(trashDiv.dataset.ix, 1);
  localStorage.setItem('library', JSON.stringify(library));
  trashDiv.remove();
  regenerateList(library);
}

// HANDLES CHANGES TO READ STATUS OF BOOKS
function handleReadChanges(e){
  let target = e.target.parentNode.parentNode.parentNode;
  if(e.target.innerHTML==='read'){
    e.target.innerHTML = 'not read';
    library[target.dataset.ix]["readStatus"] = false;
  }else{
    e.target.innerHTML = 'read';
    library[target.dataset.ix]["readStatus"] = true;
  }
  console.log(library[target.dataset.ix])
  localStorage.setItem('library', JSON.stringify(library));
  target.classList.toggle('green');
}

// FULLY REGENERATES LIBRARY TO DOM
function regenerateList(list){
  mainContainer.innerHTML = '';
  list.forEach(book =>{
    let ix = library.indexOf(book);
    console.log(ix);
    console.log(book);
    createBox(book,ix);
  })
}
// DARK MODE AND LIGHT MODE
function containerChange(){
  let divContent = document.querySelectorAll('.bookInfo');
  let divs = document.querySelectorAll('.item');
  if(lightmode){
    divContent.forEach(div => div.style.backgroundColor='white');
    divs.forEach(div => div.style.border='1px solid black');
    divContent.forEach(div => div.style.color='#202124');
  }else{
    divContent.forEach(div => div.style.backgroundColor='#202124');
    divs.forEach(div => div.style.border='1px solid gray');
    divContent.forEach(div => div.style.color='white');
  }
}

function bodyChange(){
  if(lightmode){
    topContainer.style.backgroundColor='white'
    logoText.style.color='#202124'
    btnContainer.style.filter='invert(1)'
  }else{
    topContainer.style.backgroundColor='#202124'
    logoText.style.color='white'
    btnContainer.style.filter='invert(0)'
  }
}
function modeChange(){
  body.classList.toggle('light');
  lightmode = !lightmode
  containerChange();
  bodyChange();
}

// EVENT LISTENERS
let exes = document.querySelectorAll('.fa-times');
exes.forEach(x => x.addEventListener('click', handleDeletes));
let readBtns = document.querySelectorAll('.readStatus');
readBtns.forEach(btn => btn.addEventListener('click', handleReadChanges));
sun.addEventListener('click', modeChange);
adder.addEventListener('click', togFormDrawer);
submit.addEventListener('click', handleSubmit);



// LIBRARY ARRAY
let library = JSON.parse(localStorage.getItem('library')) || [];
regenerateList(library);
