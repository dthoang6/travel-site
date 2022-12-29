import throttle from "lodash/throttle";

class StickyHeader {
  constructor() {
    /* create a property that points toward the site header DOM element */
    this.siteHeader = document.querySelector(".site-header");
    this.events();
  }

  /* using throttle to run a function for every 200ms as we watch scroll event */
  events() {
    window.addEventListener(
      "scroll",
      throttle(() => this.runOnScroll(), 200)
    );
  }

  /* once we have scrolled down 60px, let target the site header and give it
  a modified class that makes it darker. Otherwise, remove modified class. */
  runOnScroll() {
    if (window.scrollY > 60) {
      this.siteHeader.classList.add("site-header--dark");
    } else {
      this.siteHeader.classList.remove("site-header--dark");
    }
  }
}

export default StickyHeader;
