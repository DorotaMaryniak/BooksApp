const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const list = document.querySelector('.books-list');

function render(){

  for (let book in dataSource.books){
    let generatedHTML= template(dataSource.books[book]);
    let bookElement = utils.createDOMFromHTML(generatedHTML);
    list.appendChild(bookElement);
  }

}
const favoriteBooks =[];
function initActions(){
  const images = document.querySelectorAll('.book__image');
  console.log('images', images);
  for (let image of images){
    //console.log('image', image)
    image.addEventListener('dblclick', function(event){
      event.preventDefault();
      const imageId = image.getAttribute('data-id');
      if (!favoriteBooks.includes(imageId)){

        image.classList.add('favorite');

        favoriteBooks.push(imageId);}
      else
      { image.classList.remove('favorite');
        favoriteBooks.splice(favoriteBooks.indexOf(imageId),1);}

    });
}

}
render();
initActions();

