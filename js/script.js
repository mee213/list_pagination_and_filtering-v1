'use strict';

// this function is called when document ready, it all starts here
const initApp = () => {

   // get complete student list
   const $studentList = $('.student-list li');

   // create and append container for pagination links
   $('div.page').append('<div class="pagination"><ul></ul></div>');

   // create and append container for a message in case of no search results
   $('.student-list').prepend('<div class="message"></div>');

   // this shows full list, prior to any searches
   appendSearchBox($studentList)
      .then(showPage)
      .then(appendPageLinks)
      .catch(function(e) {
         console.log(e);
      });
}

// adds search box and event listeners for search box
// as well as search functionality itself
// also returns a promise to start the chain of 
// initial page load prior to first search
const appendSearchBox = ($fullList) => {
   
   return new Promise(function(resolve, reject) {

      // get your page header (for event delegation)
      const $pageHeader = $('.page-header');

      // declare query outside of event listener and doSearch function
      let query = "";

      // create HTML for the search box
      const searchBoxHTML = `
         <div class="student-search">
            <input placeholder="Search for students...">
            <button>Search</button>
         </div>
      `;

      // insert search box HTML into the DOM
      $('h2').after(searchBoxHTML);

      // perform search using query captured from search box
      // this returns a promise to start a new chain of page updates
      // based on search results
      const doSearch = (query) => {

         // remove previous event listeners from pagination links
         // (to be re-generated per search results)
         $('.pagination ul').off("click");

         // this creates a new jQuery selector similar to the
         // :contains selector except it is case-insensitive, from:
         // https://stackoverflow.com/questions/8746882/jquery-contains-selector-uppercase-and-lower-case-issue
         jQuery.expr[':'].icontains = function(a, i, m) {
            return jQuery(a).text().toUpperCase()
               .indexOf(m[3].toUpperCase()) >= 0;
         };

         return new Promise(function(resolve, reject) {
           
            // create filtered list by searching for query string in name OR email text
            const $searchList = $('.student-list li').filter(function() {
               // this callback returns a boolean if either the name (h3) or email contain the query string
               // the boolean tells .filter() whether it should include this li in the results or not
               return $( this ).has(`h3:icontains(${query})`).length > 0 || $( this ).has(`.email:icontains(${query})`).length > 0;
            });

            // hide elements from the complete list based on search results
            // since they were initially displayed
            $fullList.each(function(index) {
               if ($(this).has(`h3:icontains(${query})`).length > 0 || $(this).has(`.email:icontains(${query})`).length > 0) {
                  $(this).show();
               } else {
                  $(this).hide();
               }
            });
            
            // display a message to the user if there aren't any search results
            if ($searchList.length === 0) {
               $('.message').html('<p>The search has no results.</p>');
            } else {
               $('.message').empty();
            }
            
            // only send search results to the next .then() in the chain, not full list
            resolve($searchList);
         });
      }

      // listen for the button to be clicked for search
      $pageHeader.on("click", "button", function(event) {
         event.preventDefault();
         
         // get search term from search box
         query = $('input').val();
         
         // start the search and refresh the page accordingly
         doSearch(query)
            .then(showPage)
            .then(appendPageLinks)
            .catch(function(e) {
               console.log(e);
            });
      });
      
      // listen for typing to happen for search
      $pageHeader.on("keyup", "input", function(event) {
         event.preventDefault();

         // get search term from search box
         query = $('input').val();
         
         // start the search and refresh the page accordingly
         doSearch(query)
            .then(showPage)
            .then(appendPageLinks)
            .catch(function(e) {
               console.log(e);
            });
      });

      // send the complete student list to the next .then()
      // (in case of first load, ie, no search yet)
      resolve($fullList);
      
   });
}

// take a list (complete, or filtered) and an optional page number
// and display 10 results accordingly
// if no page number, show first page
const showPage = (list, page) => {
   
   // if page was passed in, use it, otherwise, use 1
   // ie, nothing is passed in on first run (or a search),
   // so show first page, otherwise if pagination links are
   // clicked it will receive page argument from event listener
   let thisPage = page ? page : 1;

   // will use these to show 10 items according to page number
   const lastItemIndex = thisPage * 10 - 1;
   const firstItemIndex = thisPage * 10 - 10;
   
   // only show the appropriate 10 items, hide the rest
   list.each(function(index) {
      if (firstItemIndex <= index && index <= lastItemIndex) {
         $(this).show();
      } else {
         $(this).hide();
      }
   });

   // send the list to the next .then() in the promise chain
   return list;
}

// generate and append page links and add click event listeners to them
// according to number of items in the list
const appendPageLinks = (list) => {
   
   // calculate number of pages (round up for partial pages)
   const numberOfPages = Math.ceil(list.length / 10);

   // create HTML for each LI, add class="active" only to 1st one
   const createPaginationLI = (k) => {
      let paginationLI = "";
      
      if (k === 1) {
         paginationLI = `<li><a class="active" href="#">${k}</a></li>`;
      } else {
         paginationLI = `<li><a href="#">${k}</a></li>`;
      }
      return paginationLI;
   }

   // initialize this to be added to later
   let paginationAccumulator = "";

   // create a long string of pagination links
   for (let i = 1; i <= numberOfPages; i++) {
      const thisPageLink = createPaginationLI(i);
      paginationAccumulator += thisPageLink;
   }

   // select the pagination UL to append the pagination links
   // and to use for its event listeners to bind to
   const $paginationUL = $('.pagination ul');
   
   // add the HTML to the DOM
   $paginationUL.html(paginationAccumulator);
   
   // event listener for pagination links
   $paginationUL.on("click", "a", function(event) {
      event.preventDefault();

      // get the page number from the text of the pagination link
      const pageNumber = $(event.target).text();
      
      // show the appropriate 10 students
      showPage(list, pageNumber);

      // remove "active" class from every pagination link
      const $pageLinks = $('.pagination a');
      $pageLinks.each(function() {
         $(this).removeClass("active");
      });

      // add "active" class to link that was just clicked
      $(event.target).addClass("active");
   });
}

// document ready
$(initApp);