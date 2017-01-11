var express     = require('express');
var app         = express();
var passport	= require('passport');
var bodyParser  = require('body-parser');
var helmet      = require('helmet');
var flash       = require('connect-flash');
var morgan      = require('morgan');
var session     = require('express-session');
var port        = process.env.PORT || 80;
//var favicon     = require('express-favicon')

//app.set('view engine', 'pug');
//app.use(favicon(__dirname + '/utilities/logo.ico')); //Make sure this exists
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(flash());
app.use(session({ secret: 'keyboardingkat',
                  resave: true,
                  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
require('./app/main.js')(app, passport);

app.listen(port, function() {
    console.log("We're live on " + port);
});

module.exports = app;
