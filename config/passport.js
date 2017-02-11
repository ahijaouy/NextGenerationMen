var LocalStrategy   = require('passport-local').Strategy;
var mysql           = require('mysql'); //MATCH this with package.json
var bcrypt          = require('bcrypt-nodejs');
var dbconfig        = require('./database');

//connect based on config and connect to right db
var connection = mysql.createConnection(dbconfig.connection)
connection.query('USE ' + dbconfig.database);
//set this up to have persistence
module.exports = function(passport) {
    // session work
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM USERS WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });
    //sign up will be hidden for most people
    passport.use(
           'local-signup',
           new LocalStrategy({
               usernameField : 'username',
               passwordField : 'password',
               passReqToCallback : true // allows us to pass back the entire request to the callback
           },
           function(req, username, password, done) {
                console.log('made it to sign up ');
                console.log(req.body);
               connection.query("SELECT * FROM USERS WHERE username = ?",[username], function(err, rows) {
                   if (err) {
                       return done(err);
                   }
                   if (req.body.password != req.body.Cpassword) {
                       return done(null, false, req.flash('signupMessage', 'Passwords do not match'));
                   }
                   if (rows.length) {
                       return done(null, false, req.flash('signupMessage', 'Username is already taken.'));
                   } else {
                       var newUserMysql = {
                           username: username,
                           password: bcrypt.hashSync(password, null, null)
                       };

                       var insertQuery = "INSERT INTO USERS ( username, password ) values (?,?)";

                       connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                           newUserMysql.id = rows.insertId;

                           return done(null, newUserMysql);
                       });
                   }
               });
           })
       );

       //system login
       passport.use(
           'local-login',
           new LocalStrategy({
               usernameField : 'username',
               passwordField : 'password',
               passReqToCallback : true
           },
           function(req, username, password, done) {
             console.log('get to login');
               connection.query("SELECT * FROM USERS WHERE username = ?",[username], function(err, rows){
                   if (err) {
                       return done(err);
                   }
                   if (!rows.length) {
                       return done(null, false, req.flash('loginMessage', 'No user found.'));
                   }
                   if (!bcrypt.compareSync(password, rows[0].password)) {
                       return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
                   }
                   return done(null, rows[0]);
               });
           })
       );
   };
