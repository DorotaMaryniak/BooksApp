const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const list = document.querySelector('.books-list');
const form = document.querySelector('.filters');
const filters = [];


function render(){

  for (let book in dataSource.books){
    let ratingBgc = determineRatingBgc(dataSource.books[book].rating);
    let ratingWidth = dataSource.books[book].rating *10;
    //console.log('ratingwidth', ratingWidth);

    const allData= dataSource.books[book];
    allData.ratingBgc = ratingBgc;
    allData.ratingWidth = ratingWidth;

    let generatedHTML= template(allData);

    //console.log('generatedHTML', generatedHTML);
    let bookElement = utils.createDOMFromHTML(generatedHTML);
    list.appendChild(bookElement);
    // console.log('bookelement', bookElement);

  }

}
const favoriteBooks =[];
function initActions(){
  // console.log('lista', list);

  list.addEventListener('dblclick', function(event){
    event.preventDefault();
    const clickedBook = event.target.offsetParent;
    // console.log('clickedbook', clickedBook);
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
  // console.log('form', form);
  // console.log('event.target', event.target);

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
    filterBooks();


  });
}
function filterBooks () {


  for (let book of dataSource.books){
    let shouldBeHidden = false;
    for (let filter of filters){
      if (! book.details[filter]){
        shouldBeHidden = true;
      }
    }
    console.log('sould be hidden',shouldBeHidden);
    const bookElement = document.querySelector('.book__image[data-id="' + book.id +'"]');
    if (shouldBeHidden) {
      bookElement.classList.add('hidden');
    }
    else{
      bookElement.classList.remove('hidden');
    }
  }


}

function determineRatingBgc(rating){
  if (rating <6)
    return  'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
  else if (rating >6 && rating<=8)
    return  ' linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  else if (rating >8 && rating<=9)
    return  '  linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  else
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
}



render();
initActions();

