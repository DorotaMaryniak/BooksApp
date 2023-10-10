const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const list = document.querySelector('.books-list');

function render(){

  for (let book in dataSource.books){
    let generatedHTML= template(dataSource.books[book]);
    let bookElement = utils.createDOMFromHTML(generatedHTML);
    list.appendChild(bookElement);
  }

}

render();