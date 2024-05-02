exports.handler = function(context, event, callback) {


let url;
const page_url = event.request.headers['x-pageurl']
pagination_accounts(page_url);

async function pagination_accounts(response) {

  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = require("twilio")(
    accountSid,
    authToken,
  );

  if (response === "0") {
    url =
      "https://api.twilio.com/2010-04-01/Accounts.json?Status=active&PageSize=1000&Page=0";
  }
else{
  url = "https://api.twilio.com/" + page_url
}
    response = await client.request({
      method: "GET",
      uri: url,
    });
  


  var array = [];
  next_Page = response.body.next_page_uri;
  //I need to have an if statement in the client side to check if the nextPageUrl is null or undefined before sending nextPageURL to the server side.

  data = response.body.accounts;
  for (let i = 0; i < data.length; i++) {
    array.push(data[i]);
  }


  return callback(null, [array, next_Page]);
}
}
