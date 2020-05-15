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

function createPages() {
   numberOfPages = 0;
   let studentDisplayCount = studentDisplayList.length;
   let pagesNeeded = Math.ceil( studentDisplayCount/resultsPerPage );
   let pageNumber = 0;

   paginationButtons.innerHTML = "";

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


function hideAllStudents() {
   let students = document.querySelectorAll(".student-item");
   students.forEach(student => {
      student.style.display = "none";
   });   
}


const pageResults = function(){
   let pageSelected = document.querySelector(".active");
   let lastPageStudentCount = studentDisplayList.length % resultsPerPage;
   let lastPageIsActive = pageSelected.textContent == numberOfPages;
   let firstStudentIndex = (pageSelected.textContent * resultsPerPage) - resultsPerPage;
   let lastStudentIndex = firstStudentIndex + 9;

   hideAllStudents()    
   
   if (lastPageIsActive) {
      lastStudentIndex = (firstStudentIndex + lastPageStudentCount) - 1;
   }
   
   // displays corresponding page results
   for (let i = firstStudentIndex; i <= lastStudentIndex; i++) {
      let studentToDisplayIndex = studentDisplayList[i].index;
      let studentCardsContainer = document.querySelectorAll(".student-item");
      studentCardsContainer[studentToDisplayIndex].style.display = "block";
   }  
}

function filterResults() {
   let search = document.querySelector(".searchbar").value.toLowerCase();
   const noResultsMessage = document.querySelector(".js-no-results-message");
   hideAllStudents()

   studentDisplayList = studentList.filter(student => student.name.includes(search));
   if (studentDisplayList == 0) {
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

