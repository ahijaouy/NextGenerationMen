//var LocalStrategy   = require('passport-local').Strategy;
var mysql           = require('mysql'); //MATCH this with package.json
var bcrypt          = require('bcrypt-nodejs');
var dbconfig        = require('./database');


var Auth0Strategy = require('passport-auth0');


module.exports = function(passport) {
  
  var strategy = new Auth0Strategy({
                 domain:       'myoberon.auth0.com',
                 clientID:     'xu6aCuEjSdJN0b1lCQh0sk3JSWaQoFft',
                 clientSecret: 'Zutwqxd1QOQ9152PjtbtYaHJy2fKDCA8zR5vHSm_cQJ98CYruoOHzlPCZOQug3PM',
                 callbackURL:  'http://localhost/callback'
                },
                function(accessToken, refreshToken, extraParams, profile, done) {
                  // accessToken is the token to call Auth0 API (not needed in the most cases)
                  // extraParams.id_token has the JSON Web Token
                  // profile has all the information from the user
                  return done(null, profile);
                }
              );

  passport.use('test',strategy);
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};

   
