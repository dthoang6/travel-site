import throttle from "lodash/throttle";
import debounce from "lodash/debounce";
class StickyHeader {
  constructor() {
    /* create a property that points toward the site header DOM element */
    this.siteHeader = document.querySelector(".site-header");
    /* create a new property that is a collection of all of our actual
    page section elements */
    this.pageSections = document.querySelectorAll(".page-section");

    this.browserHeight = window.innerHeight;
    this.previousScrollY = window.scrollY;

    this.events();
  }

  /* using throttle to run a function for every 200ms as we watch scroll event */
  events() {
    window.addEventListener(
      "scroll",
      throttle(() => this.runOnScroll(), 200)
    );

    window.addEventListener(
      "resize",
      debounce(() => {
        this.browserHeight = window.innerHeight;
      })
    );
  }

  /* once we have scrolled down 60px, let target the site header and give it
  a modified class that makes it darker. Otherwise, remove modified class. */
  runOnScroll() {
    /* scroll directions up or down */
    this.determineScrollDirection();

    if (window.scrollY > 60) {
      this.siteHeader.classList.add("site-header--dark");
    } else {
      this.siteHeader.classList.remove("site-header--dark");
    }

    /* highlight current page section for each section that is scrolled to an end view up or down */
    this.pageSections.forEach(el => this.calcSection(el));
  }

  determineScrollDirection() {
    /* compare the current ScrollY value with previous ScrollY value */
    if (window.scrollY > this.previousScrollY) {
      this.scrollDirection = "down";
    } else {
      this.scrollDirection = "up";
    }
    /* update previous Scroll Y */
    this.previousScrollY = window.scrollY;
  }

  calcSection(el) {
    /* two conditions to make sure the element is on the screen.
        condition 1: if you scroll down far enough so you can at least see the very top edge of the section */
    /* condition 2:  if you scroll down far enough so it is still less than the bottom edge of the current section*/
    if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
      let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
      /* use the scrollPercent value to determine if you scroll down far enough that a section should be considered the current highlighted yellow */
      /* use the scrollDirection property to determine if it is scroll up or down */
      if ((scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == "down") || (scrollPercent < 33 && this.scrollDirection == "up")) {
        let matchingLink = el.getAttribute("data-matching-link");
        document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"));
        document.querySelector(matchingLink).classList.add("is-current-link");
      }
    }
  }
}

export default StickyHeader;
