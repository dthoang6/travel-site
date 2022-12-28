import throttle from "lodash/throttle";

class RevealOnScroll {
  constructor() {
    this.itemsToReveal = document.querySelectorAll(".feature-item");
    this.hideInitially();
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  events() {
    /* listening for scroll events and add the visible class to the hidden
    elements at precisely the right moment when they're scrolled to */
    window.addEventListener("scroll", () => {
      /* as we are scrolling, we want to check to see if any of our four feature
      item to reveal elements have been scrolled to yet */
      this.itemsToReveal.forEach(el => {
        /* run a calculation once for each of those items
        in a separate method and call that method here
        */
        this.calculateIfScrolledTo(el);
      });
    });
  }

  calculateIfScrolledTo(el) {
    let scrollPercent = (el.getBoundingClientRect().top / window.innerHeight) * 100;
    if (scrollPercent < 75) {
      el.classList.add("reveal-item--is-visible");
    }
  }

  hideInitially() {
    this.itemsToReveal.forEach(el => el.classList.add("reveal-item"));
  }
}

export default RevealOnScroll;
