//credentials
const foursquareKeys = {
  clientID: '12LDWHHQQQZX02J5MYQ4ZAX4OGWL3JLSW3ESV3IXZUHIKGT3',
  clientSecret: 'OLDL0UPCJ3O0UGIQWY53INYHYIURRAJYBLSARVG0X02UA1KZ',
  v: "20181008"
};

//create a basic url for fetch requests
const apiURL = `https://api.foursquare.com/v2`;

const auth = `client_id=${ foursquareKeys.clientID }&client_secret=${ foursquareKeys.clientSecret }&v=${ foursquareKeys.v }`;

const headers = {
  'Accept': 'application/json'
}

//convert parameters in to a string that will be added to fetch url
function makeURL(params) {
  if (!params) {
    return "";
  }
  else return Object.keys(params).map(key => `${key}=${params[key]}`).join("&");  
} 

//executions for different endpoint requests
export const search = (params) =>
  fetch(`${apiURL}/venues/search/?${auth}&${makeURL(params)}`, {
    method: "GET",
    headers
  })
    .then(res => res.json());

export const venueDetails = (venueID) =>
  fetch(`${apiURL}/venues/${venueID}/?${auth}`, {
    method: "GET"
  })
    .then(res => res.json());



