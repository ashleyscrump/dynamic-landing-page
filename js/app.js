/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
// global variable created to grab the ul ID from html
const navigation = document.getElementById("navbar__list");
// global variable selecting all sections
const sections = document.querySelectorAll("section");

// build the nav by creating function called NavCreate() and used a for of loop to build the nav bar
function navCreate() {
  for (const pageSection of sections) {
    // create variable to create both list items and anchor for these items
    const getList = document.createElement("li");
    const getAnchor = document.createElement("a");
    //adds CSS class styles to the anchor element created
    getAnchor.className = "menu__link";
    //adds a href link to anchor element and attaches to section ID
    getAnchor.href = `#${pageSection.id}`;
    //appends anchor tag to section of nav bar and adds text content from html
    getAnchor.textContent = pageSection.dataset.nav;
    //add click events to anchor tag, clickevent function created (can be called 'event' too)
    getAnchor.addEventListener("click", function (clickevent) {
      clickevent.preventDefault();
      //atrributes behavior smooth
      pageSection.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    });
    //appends anchor element to list
    getList.appendChild(getAnchor);
    //appends List variable to the navigation
    navigation.appendChild(getList);
  }
}
//call function here
navCreate();


// Add class 'active' to section when near top of viewport
//function gets position and size of the element relative to the viewport using .getboundingclientrect() and returns the largest value thats < or equal to the number
const offset = (sections) => {
  return Math.floor(sections.getBoundingClientRect().top);
};

//function removes active class of the section when not in view
const removeActive = (sections) => {
  sections.classList.remove("your-active-class");
  sections.style.cssText =
    "background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%)";
};

//function adds active class to section in view if condition is true
const addActive = (conditional, sections) => {
  if (conditional) {
    sections.classList.add("your-active-class");
    sections.style.cssText = "background-color: #cc1;";
  }
};


//creates the active  function and loops through each section with forEach loop
const sectionActive = () => {
  sections.forEach((section) => {
    //stores value from offset function and creates new variable and gives section working on
    const sectionOff = offset(section);
    //test section's offset is in reference to number
    inviewport = () => sectionOff < 160 && sectionOff >= -160;
    //call function and section working on
    removeActive(section);
    addActive(inviewport(), section);
  });
};
// function implemented by event listener when scroll
window.addEventListener("scroll", sectionActive);

// Scroll to anchor ID using scrollTO event

const scrolling = () => {
  //selects all anchors
  const links = document.querySelectorAll(".navbar__menu a");
  links.forEach((link) => {
    link.addEventListener("clickevent", () => {
      //loops through each section and adds click event and scroll
      for (i = 0; i < sections; i++) {
        sections[i].addEventListener("clickevent", sectionsScroll(link));
      }
    });
  });
};

//calls function
scrolling();


/*
 * scroll to top button
 */

// create variable call button and grab button ID
let button = document.getElementById("scrollToTop");

// the user scrolls down from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};
//create scroll function
function scrollFunction() {
  if (
    document.body.scrollTop > window.innerHeight ||
    document.documentElement.scrollTop > window.innerHeight
  ) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

// the user clicks on the button, scroll to the top of the document
button.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
