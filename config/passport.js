var Auth0Strategy = require('passport-auth0');

module.exports = function(passport) {
  var strategy = new Auth0Strategy({
                 domain:       process.env.AUTH0_DOMAIN,
                 clientID:     process.env.AUTH0_CLIENT_ID,
                 clientSecret: process.env.AUTH0_CLIENT_SECRET,
                 callbackURL:  process.env.AUTH0_CALLBACK
                },
                function(accessToken, refreshToken, extraParams, profile, done) {
                  // accessToken is the token to call Auth0 API (not needed in the most cases)
                  // extraParams.id_token has the JSON Web Token
                  // profile has all the information from the user
                  return done(null, profile);
                }
              );

  passport.use('auth0',strategy);
  

  //Would be cool to make a real serialize function that uses the ID
  //but the problem would be you would have to use Auth0 to 
  //deserialize it
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};

   
