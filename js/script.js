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

let pageNumber = 1;
/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = ($list, pageNumber) => {
   
   console.log($list);

   const lastItemNumber = pageNumber * 10;
   const firstItemNumber = lastItemNumber - 9;
   const lastItemIndex = lastItemNumber - 1;
   const firstItemIndex = firstItemNumber - 1;
   
   /*
   Loop over items in the list parameter
   -- If the index of a list item is >= the index of the first
   item that should be shown on the page
   -- && the list item index is <= the index of the last item
   that should be shown on the page, show it
   */
  
   $list.each(function(index) {
      if (firstItemIndex <= index && index <= lastItemIndex) {
         $(this).show();
      } else {
         $(this).hide();
      }
   });
};

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/


const appendPageLinks = (list) => {

};


// Remember to delete the comments that came with this file, and replace them with your own code comments.

$(showPage($('.student-list li'), pageNumber));