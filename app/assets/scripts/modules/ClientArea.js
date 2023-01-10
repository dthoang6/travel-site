import Axios from "axios";

class ClientArea {
  constructor() {
    this.injectHTML();
    this.form = document.querySelector(".client-area__form");
    this.field = document.querySelector(".client-area__input");
    this.contentArea = document.querySelector(".client-area__content-area");
    this.events();
  }
  /* events method to listen for form element to be submited by user
  - first argument is type of event we are listening
  - second argument is a function that we want to run in response to this event
  */
  events() {
    this.form.addEventListener("submit", e => {
      e.preventDefault(); /* prevent the browser performs a full page reload or refresh and add a ? at the end of url */
      this.sendRequest();
    })
  }

  /* How front end communicate with back end:
  this is where we communicate with our backend, cloud function with sendRequest method.
  method 1: use the web browser fetch functionality (Fetch API) to send off an asynchronous request
  method 2: use the third party package Axios because the syntax is alot cleaner and easier to work with

  */
  sendRequest() {
    /* we want to send a post request to a url
    - the axios post method will result in a promise with two arguments:
    how to send data along with our request to url function?
    a: is the url that you want to send a request to, which is cloud function end point.
    b: an object with one property password to send along the value user submit.

    - then function: if the password is correct the then function will run.
    we will actually delete the form from the page, and then also insert the secret content into that content area.
    - catch function: if the password does not match our cloud function will send back
    a status code of 401 unauthorized so wee will provide an arrow function to add a text
    */
    Axios.post('https://app.netlify.com/sites/quiet-sunshine-9e5e6c/functions/secret-area', {password: this.field.value} ).then(response => {
      this.form.remove();
      this.contentArea.innerHTML = response.data; /*this will be the value that cloud function: secret-area.js responds with. */
    }).catch(() => {
      this.contentArea.innerHTML = `<p class="client-area__error">That secret phrase is not correct. Try again.</p>`;
      this.field.value = '';
      this.field.focus();
    });
  }

  injectHTML() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="client-area">
        <div class="wrapper wrapper--medium">
          <h2 class="section-title section-title--blue">Secret Client Area</h2>
          <form class="client-area__form" action="">
            <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
            <button class="btn btn--orange">Submit</button>
          </form>
          <div class="client-area__content-area"></div>
        </div>
      </div>
    `
    );
  }
}

export default ClientArea;

/* we're not going to test this functionality locally on our computer due to web browser CORS, so this network request will not go through 
- the reason is because we would be on localhost and request send to netlify domain
- we need to modify our cloud function so that it would be accessible from our local dev enrironment.
- or with the perfect solution to use netlify dev tool which makes previewing all of your code locally
*/
