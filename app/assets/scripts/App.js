import "../styles/styles.css";
import "lazysizes";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";

let stickyHeader = new StickyHeader();
let mobileMenu = new MobileMenu();
let modal;

new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);

/* handle load the Modal.js file if user click and open the modal. */
document.querySelectorAll(".open-modal").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();

    if (typeof modal == "undefined") {
      /* load the file if user just click first time */
      /* this will return a promise and we do not know how long does it take? 
      but once it does finish loading the modal file, we want to use it to create
      a new instance of the class.
      we will provide a function in both then and catch
      then: if things go as planned, we call what ever function we provide in the then parenthesis
      catch: if there is a problem in loading file, we call what ever function we provide in the catch parenthesis
    */
      import(/* webpackChunkName: "modal" */ "./modules/Modal")
        .then(x => {
          /* x presents the Modal file we just load, we want to use it to create a new
        instance of the Modal Class */
          modal = new x.default();
          /* give the browser a few milliseconds to create a modal object before we try to open it */
          setTimeout(() => modal.openTheModal(), 20);
        })
        .catch(() => console.log("There was a problem."));
    } else {
      /* Do not need to load the file, just open it from browser memory */
      modal.openTheModal();
    }
  });
});

if (module.hot) {
  module.hot.accept();
}
