
// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {
const type = event.request.headers['x-type']
const subaccountSID = event.request.headers['x-accountsid']
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const number = event.request.headers['x-number']
const bundle = event.request.headers['x-bundle']
const did = event.request.headers['x-did']
const passwordcheck = event.request.headers['x-password']


if((passwordcheck !== context.password) && type =="password"){

   return callback(null, { no_results: { message: 'incorrect password' } });
}

if(passwordcheck == context.password && type =="password"){

   return callback(null, { no_results: null });
}

if(type === "account"){
  account(subaccountSID,accountSid,authToken)
}

if(type === "sidtonumber"){
  sidtonumber(number,accountSid,authToken,subaccountSID)
}

if(type === "pn_sids"){
  pn_sids(number,accountSid,authToken,subaccountSID)
}

if(type=== "trustassign"){
trustassign(bundle,number,did,subaccountSID,accountSid,authToken)
}
if(type == "businessassign"){
businessassign(bundle,number,did,subaccountSID,accountSid,authToken)
}
if(type == "trustdelete"){
trustdelete(bundle,number,did,subaccountSID,accountSid,authToken)
}
if(type == "businessdelete"){
businessdelete(bundle,number,did,subaccountSID,accountSid,authToken)
}


async function businessdelete(bundle,number,did,subaccountSID,accountSid,authToken){
  const tempArray = []

  const clienttemp = require("twilio")(
  accountSid,
  authToken)

 const token =  await clienttemp.api.v2010.accounts(subaccountSID)
  .fetch()
  .then(account => account.authToken);
  
  const client = require("twilio")(
    subaccountSID,
    token);


  try {


await client.trusthub.v1.customerProfiles(bundle)
  .customerProfilesChannelEndpointAssignment(number).remove();
  
  tempArray.push([did,bundle,'success'])

   
    return callback(null, tempArray); // Return the result for further processing if needed
  } catch (error) {
    //const commastring = JSON.stringify(error)
    const errorMessage = error.message
    tempArray.push([did,bundle,errorMessage.replace(/,/g, ':')])
    
    return callback(null, tempArray);
  }
}


async function trustdelete(bundle,number,did,subaccountSID,accountSid,authToken){
  const tempArray = []

  const clienttemp = require("twilio")(
  accountSid,
  authToken)

 const token =  await clienttemp.api.v2010.accounts(subaccountSID)
  .fetch()
  .then(account => account.authToken);
  
  const client = require("twilio")(
    subaccountSID,
    token);


  try {


await client.trusthub.v1.trustProducts(bundle)
  .trustProductsChannelEndpointAssignment(number)
  .remove();
  
  tempArray.push([did,bundle,'success'])

    return callback(null, tempArray); // Return the result for further processing if needed
  } catch (error) {
    //const commastring = JSON.stringify(error)
    const errorMessage = error.message
    tempArray.push([did,bundle,errorMessage.replace(/,/g, ':')])
    
    return callback(null, tempArray);
  }
}

async function businessassign(bundle,number,did,subaccountSID,accountSid,authToken){
  const tempArray = []

  const clienttemp = require("twilio")(
  accountSid,
  authToken)

 const token =  await clienttemp.api.v2010.accounts(subaccountSID)
  .fetch()
  .then(account => account.authToken);
  
  const client = require("twilio")(
    subaccountSID,
    token);

  try{
await client.trusthub.v1.customerProfiles(bundle)
  .customerProfilesChannelEndpointAssignment
  .create({
     channelEndpointType: 'phone-number',
     channelEndpointSid: number
   })

  tempArray.push([did,bundle,'success']);
  return callback(null, tempArray);

    } catch (error) {
    console.error('Failed to assign number to trust:', error);
    const commastring = JSON.stringify(error.message)
    tempArray.push([did,bundle,commastring.replace(/,/g, ':')])
    return callback(null, tempArray);
  }
}


async function trustassign(bundle,number,did,subaccountSID,accountSid,authToken){
  const tempArray = []

  const clienttemp = require("twilio")(
  accountSid,
  authToken)

 const token =  await clienttemp.api.v2010.accounts(subaccountSID)
  .fetch()
  .then(account => account.authToken);
  
  const client = require("twilio")(
    subaccountSID,
    token);


  try{
await client.trusthub.v1.trustProducts(bundle)
  .trustProductsChannelEndpointAssignment
  .create({
     channelEndpointType: 'phone-number',
     channelEndpointSid: number
   })

  tempArray.push([did,bundle,'success']);
  return callback(null, tempArray);
  
    } catch (error) {
    console.error('Failed to assign number to trust:', error);
    const commastring = JSON.stringify(error.message)
    tempArray.push([did,bundle,commastring.replace(/,/g, ':')])
    return callback(null, tempArray);
  }
}


async function account(subaccountSID,accountSid,authToken){
try{
const client = require("twilio")(
  accountSid,
  authToken)
if (subaccountSID.length< 1){
return callback(null, null);

}
else{
    const account = await client.api.v2010.accounts(subaccountSID).fetch();

    const sid = account.sid;
    return callback(null, {sid});
}

}
catch(error){

return callback(null, null);
}
}

async function sidtonumber(number,accountSid,authToken,subaccountSID){

  
  const clienttemp = require("twilio")(
  accountSid,
  authToken)

 const token =  await clienttemp.api.v2010.accounts(subaccountSID)
  .fetch()
  .then(account => account.authToken);
  
  const client = require("twilio")(
    subaccountSID,
    token);


    const incoming_phone_number = await client.incomingPhoneNumbers(number).fetch();


  return callback(null, incoming_phone_number);
}

async function pn_sids(number,accountSid,authToken,subaccountSID){

  let incomingPhoneNumbers;
  const clienttemp = require("twilio")(
  accountSid,
  authToken)

 const token =  await clienttemp.api.v2010.accounts(subaccountSID)
  .fetch()
  .then(account => account.authToken);
  
  const client = require("twilio")(
    subaccountSID,
    token);
/*
try{

 incomingPhoneNumbers = await client.incomingPhoneNumbers.list({ phoneNumber: number, limit: 1 });
 if incomingPhoneNumbers
 return callback(null, incomingPhoneNumbers.sid);
}

catch(error){
   incomingPhoneNumbers = { error: error.message, number: number }
   return callback(null, incomingPhoneNumbers);
}
*/

   try {


      // Make an asynchronous call to retrieve incoming phone numbers

   
      
      incomingPhoneNumbers = await client.incomingPhoneNumbers.list({ phoneNumber: number, limit: 1 });


      // Process each incoming phone number and push its sid to the sids array
      if (incomingPhoneNumbers.length > 0 && number.length>9 ) {

        const orderedPair = { sid: incomingPhoneNumbers[0].sid, number: number };
        
        return callback(null, orderedPair);
      }
      else{
        const orderedPair = { error: 'invalid number',number: number};
        return callback(null, orderedPair);
        
      }
    } catch (error) {
      const orderedPair = { error: error.message,number: number};
      return callback(null, orderedPair);
      // Optionally, handle the error (e.g., by continuing to the next iteration, logging the error, or modifying the return value)
    }
  }



};
