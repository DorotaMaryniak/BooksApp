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
      image.classList.add('favorite');
      const imageId = document.getAttribute('data-id');
      favoriteBooks.push(imageId);
    });
  }
}
render();
initActions();

