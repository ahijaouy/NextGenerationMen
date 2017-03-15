
  //function getToken() {
  var request = require("request");

  var options = { method: 'POST',
    url: 'https://myoberon.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: 
     { grant_type: 'client_credentials',
       client_id: 'DjPTBi5vxOsT5t7XIvslmZxxNBbOVaS3',
       client_secret: 'xIFG8WL42fk_k-A-rd4sgu-7mR9pBon0gvj_McA1vD1EOvala5jdh2tVEQDK90Rp',
       audience: 'https://myoberon.auth0.com/api/v2/' },
    json: true };


    request(options)
  
   var token;
      request(options, function (error, response, body) {
      if (error) throw new Error(error);
      token = response.body;
      console.log('inside');
      console.log(token);
      //token.access_token = body.access_token;
      //return response;
    });
  console.log(token);
   
//}
//module.exports = getToken;