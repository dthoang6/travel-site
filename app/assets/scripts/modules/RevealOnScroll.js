import throttle from "lodash/throttle"; /* run our function every 200ms continuously as we are scrolling */
import debounce from "lodash/debounce"; /* do something once after we finally stopped resizing */

class RevealOnScroll {
  constructor(els, thresholdPercent) {
    this.thresholdPercent = thresholdPercent;
    this.itemsToReveal = els;
    this.browserHeight = window.innerHeight;
    this.hideInitially();
    /* the web browser is calling our function for every single pixel we scroll
    which is inefficient, we will throttle it to call for every 200ms as we scroll it.
    */
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    this.events();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle);
    window.addEventListener(
      "resize",
      debounce(() => {
        console.log("Resize just ran");
        this.browserHeight = window.innerHeight;
      })
    );
  }

  calcCaller() {
    this.itemsToReveal.forEach(el => {
      if (el.isRevealed == false) {
        this.calculateIfScrolledTo(el);
      }
    });
  }

  calculateIfScrolledTo(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      /* if the top of page of an item needs to be revealed has not even
      crossed the bottom edge of the browsers viewport yet, do not calculate. */
      console.log("Element was calculated.");
      let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;
      if (scrollPercent < this.thresholdPercent) {
        el.classList.add("reveal-item--is-visible");
        /* set property to true to use if an element is revealed to stop running calculation*/
        el.isRevealed = true;
        /* set up an if statement so that  once the final item that needs to
        revealed, let's completely remove the scroll event listener.*/
        if (el.isLastItem) {
          window.removeEventListener("scroll", this.scrollThrottles);
        }
      }
    }
  }

  hideInitially() {
    this.itemsToReveal.forEach(el => {
      el.classList.add("reveal-item");
      /* add a new property "isRevealed" to each feature item and
      by default set it to false, then once we actually calculate that it should be visible,
      we can set it to true.*/
      el.isRevealed = false;
    });
    /* add a new property "isLastItem" to setup if statement to check to remove the
    scroll event listener*/
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}

export default RevealOnScroll;
