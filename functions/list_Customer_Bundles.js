exports.handler = function(context, event, callback) {
let url;
const subaccountSID = event.request.headers['x-accountsid']
const page_url = event.request.headers['x-pageurl']
const type = event.request.headers['x-type']
const bundle = event.request.headers['x-bundle']


if(type === "bundles"){
pagination_customer_bundles(page_url, subaccountSID);
}

if(type === "assignments"){
pagination_customer_bundle_assignments(page_url, subaccountSID,bundle);
}




  
async function pagination_customer_bundles(response, subaccountSID) {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  
  const clienttemp = require("twilio")(
  accountSid,
  authToken)

 const token =  await clienttemp.api.v2010.accounts(subaccountSID)
  .fetch()
  .then(account => account.authToken);
  
  const client = require("twilio")(
    subaccountSID,
    token);

  if (response === "0") {
   url = "https://trusthub.twilio.com/v1/CustomerProfiles?PageSize=20&Page=0";
  }
  else{
    url = response
  }
    response = await client.request({
      method: "GET",
      uri: url,
    });
  
  // console.log(response);
  var array = [];
  next_Page = response.body.meta.next_page_url;
  //I need to have an if statement in the client side to check if the nextPageUrl is null or undefined before sending nextPageURL to the server side.

  data = response.body.results;
  
  for (let i = 0; i < data.length; i++) {
   

      array.push(data[i]);

  }
  
 
  return callback(null, [array, next_Page]);
}


async function pagination_customer_bundle_assignments(response, subaccountSID,bundle) {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  
  const clienttemp = require("twilio")(
  accountSid,
  authToken)

 const token =  await clienttemp.api.v2010.accounts(subaccountSID)
  .fetch()
  .then(account => account.authToken);
  
  const client = require("twilio")(
    subaccountSID,
    token);
  
 

  if (response === "0") {
    url = `https://trusthub.twilio.com/v1/CustomerProfiles/${bundle}/ChannelEndpointAssignments?PageSize=20&Page=0`;
  }
  else{
    url = response
  }
    response = await client.request({
      method: "GET",
      uri: url,
    });
  
  // console.log(response);
  var array = [];

  next_Page = response.body.meta.next_page_url;
  //I need to have an if statement in the client side to check if the nextPageUrl is null or undefined before sending nextPageURL to the server side.

  data = response.body.results;
  
  for (let i = 0; i < data.length; i++) {
   
   
      array.push(data[i]);

  }
  
 
  return callback(null, [array, next_Page]);


}
}
