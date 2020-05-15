const page = document.querySelector(".page");
const studentCards = document.querySelectorAll(".student-item");
const resultsPerPage = 10;
const pageHeader = document.querySelector(".page-header");
let studentList = [];
let numberOfPages = 0;



// creates array of objects, each object stores student name and their index value in the dom.
// Index value will be used to locate a student card in the DOM.
let studentIndex = 0;
studentCards.forEach(student => {
   let studentName = student.querySelector('H3').innerText;
   let studentObject = {name: studentName, index: studentIndex};
   studentList.push(studentObject);
   studentIndex ++;
});
// initially all students will display in DOM.
let studentDisplayList = studentList;


//================================
//  ELEMENTS ADDED TO DOM
//================================
// searchbar
pageHeader.innerHTML += `<div class="student-search">
                           <input class="searchbar" onkeyup="filterResults()" type="text" placeholder="Enter student name...">
                           <button class="searchbar-btn" onclick="filterResults()" type="button">Search</button>
                        </div>`

//no search results message
page.innerHTML += "<h3 class='js-no-results-message' style='font-size: 2em; text-align: center; display: none; color: #b3b3b3; margin-top: 1em;'>🐜Sorry no results</h3>";

// page nav buttons container
page.innerHTML += '<div class="pagination"><ul class="pagination-list"></ul></div>';
const paginationButtons = document.querySelector(".pagination-list");

//================================
//  EVENT LISTENERS
//================================


paginationButtons.addEventListener('click', e => {
   const currentActiveButton = paginationButtons.querySelector(".active");
   const buttonPressed = e.target;

   currentActiveButton.classList = "";
   buttonPressed.classList = "active";

   pageResults()
});
   

//================================
//  FUNCTIONS
//================================

// creates pagination buttons
function createPages() {
   numberOfPages = 0; // keeps track of number of pages that need to be created
   let studentDisplayCount = studentDisplayList.length; //number of students that will display in results
   let pagesNeeded = Math.ceil( studentDisplayCount/resultsPerPage ); //
   let pageNumber = 0; //used to create each pagination button li 

   paginationButtons.innerHTML = ""; // clears li elements from parent ul container

   // creates pagination buttons
   for (let i = 0; i < pagesNeeded; i++) {
      pageNumber = i + 1;
      numberOfPages += 1;
      paginationButtons.innerHTML += `<li><a href="#">${pageNumber}</a></li>`
   }

   // adds an "active" class to to the first page button
   let firstPageButton = paginationButtons.childNodes[0].firstChild;
   firstPageButton.classList += "active";
}

// applies a display "none" style to all students in the DOM
function hideAllStudents() {
   let students = document.querySelectorAll(".student-item");
   students.forEach(student => {
      student.style.display = "none";
   });   
}

// display page results based on current page selected
const pageResults = function(){
   let pageSelected = document.querySelector(".active");
   let lastPageStudentCount = studentDisplayList.length % resultsPerPage; //number of students displayed in last page
   let lastPageIsActive = pageSelected.textContent == numberOfPages; //checks if user has selected last page
   let firstStudentIndex = (pageSelected.textContent * resultsPerPage) - resultsPerPage; 
   let lastStudentIndex = firstStudentIndex + 9;

   hideAllStudents()    
   
   // update last student index value on last page. To prevent console errors
   if (lastPageIsActive) { 
      lastStudentIndex = (firstStudentIndex + lastPageStudentCount) - 1;
   }
   
   // displays corresponding page results
   for (let i = firstStudentIndex; i <= lastStudentIndex; i++) {
      let studentToDisplayIndex = studentDisplayList[i].index; //index value of student to be displayed
      let studentCardsContainer = document.querySelectorAll(".student-item"); //selects all student cards in the DOM
      studentCardsContainer[studentToDisplayIndex].style.display = "block"; // display student card based on their index value
   }  
}

// first when user uses search feature
function filterResults() {
   let userSearchInput = document.querySelector(".searchbar").value.toLowerCase(); 
   const noResultsMessage = document.querySelector(".js-no-results-message");
   hideAllStudents()

   //creates a list of students that will be displayed if the meet filter requirements
   studentDisplayList = studentList.filter(student => student.name.includes(userSearchInput));
   if (studentDisplayList == 0) { //no result message will appear if there are no students to display
      noResultsMessage.style.display = "block";
      paginationButtons.innerHTML = "";
   } else {
      createPages();
      pageResults();
      noResultsMessage.style.display = "none";
   }
}

//================================
//  RUN FUNCTIONS AT START
//================================
createPages();
hideAllStudents() 
pageResults()

