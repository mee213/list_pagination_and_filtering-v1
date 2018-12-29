'use strict';
/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

function initApp() {

   console.log('initApp ran');

   appendSearchBox()
      .then(createStudentList)
      .then(showPage)
      .then(appendPageLinks)
      .catch(function(e) {
         console.log(e);
      });
}

const appendSearchBox = () => {
   
   console.log('appendSearchBox ran');

   return new Promise(function(resolve, reject) {

      // create HTML for the search box
      const searchBoxHTML = `
         <div class="student-search">
            <input placeholder="Search for students...">
            <button>Search</button>
         </div>
      `;

      // insert search box HTML into the DOM
      $('h2').after(searchBoxHTML);

      // get your page header (for event delegation)
      const $pageHeader = $('.page-header');

      let query = "";

      // listen for the button to be clicked or for typing to happen
      $pageHeader.on("click", "button", function(event) {
         event.preventDefault();
         console.log('button was clicked');
         query = $('input').val();
         console.log('The search term is: ' + query);
      });
      
      $pageHeader.on("keyup", "input", function(event) {
         event.preventDefault();
         console.log('keyup happened');
         query = $('input').val();
         console.log('The search term is: ' + query);
      });

      resolve();
      
   });
}

const createStudentList = () => {

   //return new Promise(function(resolve, reject) {

      console.log('createStudentList ran');

      const $list_ = $('.student-list li');
      return $list_;
   //});
}

const showPage = (list, page) => {
   
   console.log('showPage ran');

   // if page was passed in, use it, otherwise, use 1
   // ie, nothing is passed in on first run, so show first page
   // future runs will receive page argument from event listener
   let thisPage = page ? page : 1;
   console.log(thisPage);
   
   const lastItemIndex = thisPage * 10 - 1;
   const firstItemIndex = thisPage * 10 - 10;

   console.log(firstItemIndex);
   console.log(lastItemIndex);
   
   list.each(function(index) {
      if (firstItemIndex <= index && index <= lastItemIndex) {
         console.log(index);
         console.log($(this));
         $(this).show();
      } else {
         console.log(index);
         $(this).hide();
      }
   });

   return list;
}

const appendPageLinks = (list) => {
   console.log('createPageLinks ran');
   //console.log(list);
   const $pageDiv = $('div.page');
   
   // calculate number of pages (round up for partial pages)
   const numberOfPages = Math.ceil(list.length / 10);
   console.log(numberOfPages);

   // create and append container for pagination links
   $pageDiv.append('<div class="pagination"><ul></ul></div>');

   const createPaginationLI = (k) => {
      console.log('k is: ' + k);
      let paginationLI = "";
      // create HTML for each LI, add class="active" only to 1st one
      if (k === 1) {
         console.log(k);
         paginationLI = `<li><a class="active" href="#">${k}</a></li>`;
      } else {
         console.log(k);
         paginationLI = `<li><a href="#">${k}</a></li>`;
      }
      console.log(paginationLI);
      return paginationLI;
   }

   let paginationAccumulator = "";

   // create a long string of pagination links
   for (let i = 0; i < numberOfPages; ) {
      console.log('i before increment is: ' + i);
      i += 1;
      console.log('i after increment is: ' + i);
      console.log('paginationAccumulator before increment is');
      console.log(paginationAccumulator);
      const thisPageLink = createPaginationLI(i);
      console.log('thisPageLink is ' + thisPageLink);
      paginationAccumulator += thisPageLink;
      console.log('paginationAccumulator after increment is');
      console.log(paginationAccumulator);
   }

   console.log('appendPageLinks ran');
   const $paginationUL = $('.pagination ul');
   console.log($paginationUL);
   
   // add the HTML to the DOM
   $paginationUL.append(paginationAccumulator);
   
   // event listener for pagination links
   $paginationUL.on("click", "a", function(event) {
      event.preventDefault();
      const pageNumber = $(event.target).text();

      // show the appropriate 10 students
      showPage(list, pageNumber);

      const $pageLinks = $('.pagination a');

      // remove "active" class from every pagination link
      $pageLinks.each(function() {
         $(this).removeClass("active");
      });

      // add "active" class to link that was just clicked
      $(event.target).addClass("active");
   });

}

$( window ).on( "load", function() {
   initApp();
});





// // event handler for clicks on pagination links

   
   /*** 
      Create the `appendPageLinks function` to generate, append, and add 
      functionality to the pagination buttons.
   ***/