/* global utils, dataSource */ // eslint-disable-line no-unused-vars


{    
  'use strict';
  // Przygotuj referencję do szablonu oraz listy .books-list
  const select = {
      
    templateOf: {
      books: '#template-book',
    },
     
    containerOf: {
      bookFilters: '.filters',
      bookList: '.books-list',
      bookImage: '.book-image',
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };
    
  class BooksList{
    constructor(){
      const thisBooksList = this;
      thisBooksList.getElement();
      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.initActions(element);
    }

    getElements(){
      const thisBooksList = this;
      thisBooksList.bookContainer = document.querySelector('.books-list');
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }    
    // Dodaj nową funkcję render.
    render(){
      const thisBooksList = this;
            
      //Wewnątrz niej przejdź po każdym elemencie z dataSource.books
      for (let book of dataSource.books){
        dataSource.books.id = book.id;
        dataSource.books.name = book.name;
        dataSource.books.price= book.price;
        dataSource.books.image= book.image;
        dataSource.books.rating= book.rating;
      }

      const generatedHTML = templates.books(thisBooksList.dataSource);
       
      thisBooksList.element = utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector(select.containerOf.bookList);

      bookContainer.appendChild(thisBooksList.elemenet);


    }
  }

  function initActions(element) {
    const thisBooksList = this;

    const bookImage = element.querySelector(select.containerOf.bookImage);

    bookImage.addEventListener('dbclick', function(event){
      event.preventDefault();
      const bookImage = event.target.offsetParent;
      const id = bookImage.getAttribute('data-id');


      if (!thisBooksList.favoriteBooks.includes(id)){
        thisBooksList.favoriteBooks.push(id);
        bookImage.classList.add('favorite');
      }
      
      else{
        bookImage.classList.remove('favorite');
      }

    });

    const bookFilter = element.document.querySelector(select.containerOf.bookFilters);

    bookFilter.addEventListener('click', function(callback){
      const clickedElm = callback.target;
      //sprawdzamy czy jest input jest zaznaczony "checked"
      if (clickedElm.tagName == 'INPUT' && clickedElm.type == 'checkbox' && clickedElm.name =='filter'){
        if (clickedElm.checked == true){
          //dodajemy value do tablicy filters
          bookFilter.push(clickedElm.value);
              
          //Jeśli input jest za to odznaczony, to musimy go z takiej tablicy usunąć.
        } else {
          bookFilter.remove('Input');
                 

        }
      }
    });
  }
  
  BooksList();
}
