exports.handler = function (event, context, callback) {
  /* you would actually do something before calling the callback
  -talk to database
  -tell a third party to send an email
  -write an if statement to evaluate the incoming string of text
  that a visitor sent with their requests.
  */
  callback(null, {
    statusCode: 200,
    body: "Welcome to the super secret area."
  })
}