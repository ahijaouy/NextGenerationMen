//dependencies for app
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var passport	= require('passport');
var port        = process.env.PORT || 80;
var router      = express.Router();
var asyncx      = require('async');
var morgan      = require('morgan');
var session     = require('express-session');
var path        = require('path');
var cookieParser= require('cookie-parser');
var sqlProtect  = require('sql-injection');
var helmet      = require('helmet');
var favicon     = require('express-favicon');
var flash       = require('connect-flash');
//var cassStore   = require('cassandra-store'); //UPDATE THIS

//database plugins; needs passport object
require('./config/passport')(passport);

//setup for safely accepting and seeing user input
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(favicon(__dirname + '/utilities/logo.ico')); //Make sure this exists

//some express additions
app.set('view engine', 'pug')
app.use(morgan('dev'));
app.use(cookieParser());
//app.use(session({ cookie: { maxAge: 60000 },
//                  secret: 'keyboardingkat',
//                  resave: false,
//                  saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/main.js')(app, passport);

app.listen(port);
console.log("We're live on port: " + port);
