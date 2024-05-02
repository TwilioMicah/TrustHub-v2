exports.handler = function(context, event, callback) {
let url;
const page_url = event.request.headers['x-pageurl']
const subaccountSID = event.request.headers['x-accountsid']


pagination_numbers(page_url,subaccountSID)

async function pagination_numbers(response, subaccountSID) {

    
    var array = [];
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = require("twilio")(
      accountSid,
      authToken,
    );

    if (response === "0") {
   
      url =
        `https://api.twilio.com/2010-04-01/Accounts/${subaccountSID}/IncomingPhoneNumbers.json?PageSize=20&Page=0`;
    }
  else{
    url = "https://api.twilio.com/" + page_url
  
  }
      response = await client.request({
        method: "GET",
        uri: url,
      });


 
const next_Page = response.body.next_page_uri


      
      data = response.body.incoming_phone_numbers;

      for (let i = 0; i < data.length; i++) {
        array.push(data[i]);
      }

  return callback(null, [array, next_Page]);
}
}
