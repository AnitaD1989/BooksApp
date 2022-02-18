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

    getElements(){
      const thisBooksList = this;
      thisBooksList.bookContainer = document.querySelector(select.containerOf.bookList);
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
        //Odnajdź funkcję render i w pętli, która przechodzi po każdym produkcie, przygotuj stałą ratingBgc, która będzie równa temu, co zwróci determineRatingBgc dla rating danej książki.
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        console.log('ratingBgc', ratingBgc);
        book.ratingBgc = ratingBgc;

        const generatedHTML = templates.books(book);
        const bookElem = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.bookContainer.appendChild(bookElem);
      }
      
      /* make a new constant widthRating which determine width rating */

      const ratingWidth = thisBooksList.book.rating * 10; //jesli rating = 5 to width = 50 wiec mnozymy 10
      thisBooksList.book.ratingWidth = ratingWidth; 

     
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

    initActions() {
      const thisBooksList = this;
  
      const bookImages = thisBooksList.bookContainer.querySelectorAll(select.containerOf.bookImage);
      console.log(bookImages);
      for(const elem of bookImages) {
        elem.addEventListener('dblclick', function(event){

          event.preventDefault();
          const bookElem = event.target.offsetParent;
          const id = elem.getAttribute('data-id');
    
          if (!thisBooksList.favoriteBooks.includes(id)){
            thisBooksList.favoriteBooks.push(id);
            bookElem.classList.add('favorite');
          }
          else{
            const index = thisBooksList.favoriteBooks.indexOf(id);
            thisBooksList.favoriteBooks.splice(index, 1);
            bookElem.classList.remove('favorite');
          }
    
        });
      }
  
      
      const bookFilter = document.querySelector(select.containerOf.bookFilters);
  
      bookFilter.addEventListener('click', function(e){
        const clickedElm = e.target;
        //sprawdzamy czy jest input jest zaznaczony "checked"
        if (clickedElm.tagName == 'INPUT' && clickedElm.type == 'checkbox' && clickedElm.name =='filter'){
          if (clickedElm.checked == true){
            //dodajemy value do tablicy filters
            thisBooksList.filters.push(clickedElm.value);
      
            //Jeśli input jest za to odznaczony, to musimy go z takiej tablicy usunąć.
          } else {
            const index = thisBooksList.filters.indexOf(clickedElm.value);
            thisBooksList.filters.splice(index, 1);    
          }

          thisBooksList.filterBooks();
        }
      });
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
  new BooksList();
}
