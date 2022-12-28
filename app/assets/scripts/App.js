import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";

let mobileMenu = new MobileMenu();

/* create one new instance of the reveal on scroll class
- and in these parentheses, let's give it a DOM selector
- selector that selects these feature items
- and then we can create another new instance of the same class and
- give it a selector that selects these testimonial items
- then we just need to go into the class and make it flexible */

new RevealOnScroll(document.querySelectorAll(".feature-item"));
new RevealOnScroll(document.querySelectorAll(".testimonial"));

if (module.hot) {
  module.hot.accept();
}
