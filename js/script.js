'use strict';
/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const $list_ = $('.student-list li');
let pageNumber_ = 1;

const showPage = ($list, pageNumber) => {

   const lastItemNumber = pageNumber * 10;
   const lastItemIndex = lastItemNumber - 1;
   
   const firstItemNumber = lastItemNumber - 9;
   const firstItemIndex = firstItemNumber - 1;
  
   $list.each(function(index) {
      if (firstItemIndex <= index && index <= lastItemIndex) {
         $(this).show();
      } else {
         $(this).hide();
      }
   });

   appendPageLinks($list);
};

const appendPageLinks = ($list) => {

   const $page = $('div.page');
   
   // calculate number of pages (round up for partial pages)
   const numberOfPages = Math.ceil($list.length / 10);

   // create and append container for pagination links
   $page.append('<div class="pagination"><ul></ul></div>');

   const $paginationUL = $('.pagination ul');

   // create and append pagination links
   for (let i = 1; i <= numberOfPages; i++) {
      
      // create HTML for each LI, add class="active" only to 1st one
      if (i = 1) {
         const paginationLI = `<li><a class="active" href="#">${i}</a></li>`;
      } else {
         const paginationLI = `<li><a href="#">${i}</a></li>`;
      }
      
      // append each pagination link
      $paginationUL.append(paginationLI);
   }
   
   /*** 
      Create the `appendPageLinks function` to generate, append, and add 
      functionality to the pagination buttons.
   ***/

};

$(showPage($list_, pageNumber_));