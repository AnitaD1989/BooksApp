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
      bookImage: '.book__image',
      form: '.filters',
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };
    
  class BooksList{
    constructor(){
      const thisBooksList = this;
      thisBooksList.getElements();
      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.initActions();
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
            
      const thisBookList = this;
      for (let book of thisBookList.data){
        const ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingBgc = ratingBgc;

        const ratingWidth = book.rating * 10;
        book.ratingWidth = ratingWidth;
        const generatedHTML = templates.books(book);
        thisBooksList.bookElem = utils.createDOMFromHTML(generatedHTML);
        const bookListContainer = document.querySelector(select.containerOf.bookList);
        bookListContainer.appendChild(thisBooksList.bookElem);
      }
      
      /* make a new constant widthRating which determine width rating */
      const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      bookData.ratingBgc = ratingBgc;
      const ratingWidth =book.rating * 10; 
      book.ratingWidth = ratingWidth; 

     
    }

    getElements(){
      const thisBooksList = this;
      thisBooksList.dom = {};
      thisBooksList.dom.container = document.querySelector(select.containerOf.bookList);
      thisBooksList.dom.form = document.querySelector(select.containerOf.form);
    }

    
    initActions() {
      const thisBooksList = this;

      thisBooksList.dom.container.addEventListener('dbclick', function(event){
      
        event.preventDefault();
        
        /* check if clicked element is a image */
        const clickedElm = event.target.offsetParent;

        if (clickedElm.classList.contains('book_image')){

          /* get book id by a clicked image */
          const idBook = clickedElm.getAttribute('data-id');

          /* Check if clicked image is already in favoriteBooks array*/
          if (thisBooksList.favoriteBooks.includes(idBook)){

            /* If is, remove class favorite from the clicked image */
            clickedElm.classList.remove('favorite');

            /* Find an IndexOf idBook which need to be removed in favoriteBooks array */
            const indexOfRemovedBook = thisBooksList.favoriteBooks.indexOf(idBook);

            /* Remove a idBook from a favoriteBooks array */
            thisBooksList.favoriteBooks.splice(indexOfRemovedBook, 1);
          
          /* If isn't, add class favorite to the clicked image */
          } else {
            clickedElm.classList.add('favorite');
            thisBooksList.favoriteBooks.push('idBook');
          }
        }
      });

      /* add event listener  to the form */

      thisBooksList.dom.form.addEventListener('click', function(event){

        /* check if clicked element is a checkbox */

        const clickedElement = event.target;

        if(clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter'){

          /* check if clicked element is checked */

          const value = clickedElement.value;
          if(clickedElement.checked){
            thisBooksList.filters.push(value);
  
        
          } else {
            /* else add value to the filters array */

            const indexOfRemoveValue = thisBooksList.filters.indexOf(value);
            thisBooksList.filters.splice(indexOfRemoveValue, 1);
          }
        }
        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;
            
      //Wewnątrz niej przejdź po każdym elemencie z dataSource.books
      for (let book of dataSource.books){
        let shouldBeHidden = false;

        for(const filter of thisBooksList.filters) {
          if(book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if(shouldBeHidden) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      }
     
    }

          

    determineRatingBgc(rating){
      if(rating < 6){
        return  'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      console.log(rating);
    }
    
  }
  const app= new BooksList();
}
