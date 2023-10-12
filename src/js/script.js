const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const list = document.querySelector('.books-list');
const form = document.querySelector('.filters');


function render(){

  for (let book in dataSource.books){
    let generatedHTML= template(dataSource.books[book]);
    let bookElement = utils.createDOMFromHTML(generatedHTML);
    list.appendChild(bookElement);
  }

}
const favoriteBooks =[];
function initActions(){
  console.log('lista', list);

  list.addEventListener('dblclick', function(event){
    event.preventDefault();
    const clickedBook = event.target.offsetParent;
    console.log('clickedbook', clickedBook);
    if(clickedBook.classList.contains('book__image')){

      const bookId = clickedBook.getAttribute('data-id');

      if (!favoriteBooks.includes(bookId)){

        clickedBook.classList.add('favorite');

        favoriteBooks.push(bookId);}
      else
      { clickedBook.classList.remove('favorite');
        favoriteBooks.splice(favoriteBooks.indexOf(bookId),1);}
    }

  });

  form.addEventListener('click', function(event){
    console.log('form', form);
    event.preventDefault();
    console.log('event.target', event.target);

    if (event.target.tagName=='INPUT'&&
        event.target.type=='checkbox'&&
        event.target.name=='filter') {
      if (event.target.checked){
        filters.push(event.target.value);
        console.log('filters', filters);
      }
      else {
        filters.splice(filters.indexOf(event.target.value),1);
      }
    }


  });
}

const filters = [];


render();
initActions();

