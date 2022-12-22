class MobileMenu {
  constructor() {
    /* avoid messy spaghetti code like this: using 3 different tools to perform 3 different actions
        -selecting elements from the DOM
        -event handling
        -define functionality
    
     document.querySelector(".site-header__menu-icon").addEventListener("click", function () {
      console.log("the top right icon was clicked.");
    });
    */
    /* we can structure our code so each actions fit into their own little organized compartments. */

    /* 1.selecting elements from the DOM */
    this.menuIcon = document.querySelector(".site-header__menu-icon");
    this.menuContent = document.querySelector(".site-header__menu-content");
    this.siteHeader = document.querySelector(".site-header");
    this.events();
  }
  /* 2.event handling: method named events to list any and all events that we want to watch for */
  events() {
    this.menuIcon.addEventListener("click", () => this.toggleTheMenu());
    /* when the icon is clicked, we want to respond by calling or running the toggleTheMenu method
        - when add event listener run, the function will modify the value of the this keyword.
        - the this keyword point towards the current object that this blueprint is creating while 
        - add event listener wants to modify the this keyword to point towards the DOM element that was just clicked on.

        to get around this, instead of just listing a simple reference directly to our method, we
        provide an arrow function.
    */
  }

  /* 3. define functionality */
  toggleTheMenu() {
    /* add a new css class to the menuContent element */
    this.menuContent.classList.toggle("site-header__menu-content--is-visible");
    this.siteHeader.classList.toggle("site-header--is-expanded");
  }
}

export default MobileMenu;
