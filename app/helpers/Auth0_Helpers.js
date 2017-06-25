var request     = require('request');

var generateToken = function(callback) {
    //Auth0 API Access Code
    var options = { method: 'Post',
      url: 'https://ngmatl.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: 
       { grant_type: 'client_credentials',
         client_id: 'T4zfzFLTpefPOzcusSDe5pNckdtqs33D',
         client_secret: 'Tvdhw9Icvz-fEyMYq7z2yKOU3SmFDnv1W1YKUDwUomrj3vhCOL6xLaiGHbBhGQGt',
         audience: 'https://ngmatl.auth0.com/api/v2/' },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      callback(body.access_token);
    });
  };
  var call = function(requestMethod, requestUrl, requestBody, callback) {
    var url = "https://ngmatl.auth0.com/api/v2/";
    
    generateToken(function(token) {
      var options = { 
        method: requestMethod,
        url: url + requestUrl,
        headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json' },
        body: requestBody,
        json: true
          
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body);
      });
    });
  };
  
var resetPassword = function(clientId, email) {
  var options = { method: 'POST',
      url: 'https://ngmatl.auth0.com/dbconnections/change_password',
      headers: { 'content-type': 'application/json' },
      body: 
       { client_id: clientId,
         email: email,
         connection: 'Username-Password-Authentication' },
      json: true 
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(error, response, body);
    });
}

module.exports = {
  call : call,
  resetPassword : resetPassword
}