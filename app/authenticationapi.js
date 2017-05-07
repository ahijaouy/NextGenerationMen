module.exports = function(requestMethod, requestUrl) {
  var returnvar;
    var request = require('request');
  //Auth0 API Access Code
  var options = { method: requestMethod,
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

      var options2 = { method: requestMethod,
        url: requestUrl,
        headers: 
         { authorization: 'Bearer ' + body.access_token,
           'content-type': 'application/json' } };

      request(options2, function (error2, response2, body2) {
        if (error2) throw new Error(error2);
          returnvar = body;
          console.log("inside");
      });
    });
  return returnvar;
  
};