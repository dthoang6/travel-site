exports.handler = function (event, context, callback) {
  /* this function is our private, trustworthy environment to run code
  before call callback */
  /* you would actually do something before calling the callback
  -talk to database
  -tell a third party to send an email
  -write an if statement to evaluate the incoming string of text
  that a visitor sent with their requests.

  once you're done, you can call callback, this is our way of saying
  our functions has done its job.

  -within this function, we are safe to perform server side actions.
  */
  /* we do not have to have the server send back html, we could send back
  raw data or JSON data and then have the front end or the web browser
  parse that JSON data to create its own html */
  const secretContent = `
    <h3>Welcome to the secret area</h3>
    <p>The sky is blue.</p>
  `
  
  /* the event parameter contains information about the incoming request
  so we can use this parameter to extract the data the the user send along */
  let body;

  /* make sure that the incoming request has any body data 
  -if  event.body even exists, then I would want to pass that data as JSON dada
  - event.body is going to be the literal text characters that the visitor send along
  - so the actual curly brackets, and the quotations, we do not want that.
  - we want to get the actual value by using method parse() so it will convert 
  the literal text characters to the actual value password as an object.
  */
  if (event.body) {
    body = JSON.parse(event.body); /* convert text character, string to a js object */
  } else {
    body = {}; /* empty object */
  }

  /* now pay attention to the password value */
  if (body.password == "javascript") {
    /* public only see this line below */
    callback(null, {
      statusCode: 200, /* 404 for error, 200 for success */
      body: secretContent
    });
  } else {
    /* public only see this line below */
    callback(null, {
      statusCode: 401 /* 401 unauthorize, 200 for success */
    });
  }
}