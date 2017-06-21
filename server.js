var express       = require('express'),
    bodyParser    = require('body-parser'),
    path          = require('path'),
    exphbs        = require('express-handlebars'),
    passport      = require('passport'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    session       = require('express-session'),
    MySQLStore    = require('express-mysql-session')(session),
    env           = require ('node-env-file'),
    Auth0Strategy = require('passport-auth0'),
    helmet        = require('helmet'),
    flash         = require('connect-flash'),
    app           = express();


env('.env');
//for MySQLStore
var dbconfig = {
    host:     process.env.DATABASE_HOST,
    user:     process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
var sessionStore = new MySQLStore(dbconfig);


//Set View Engine
// app.engine('hbs', exphbs({defaultLayout: main, extname:'.hbs',}));
// app.set('view engine', 'hbs');
// 
// Handlabars setup
app.engine('.hbs', exphbs({
  helpers: {
        niceDate: function (uglyDate) { 
          return uglyDate.toDateString(); },
        setDate: function(uglyDate) {
          return uglyDate.toISOString().substr(0, 10);
        }
    },
  defaultLayout: 'main', 
  extname: '.hbs'}));
app.set('view engine', '.hbs');

//Set static path
app.use("/vendors",express.static(__dirname + "/vendors"));
app.use("/build",express.static(__dirname + "/build"));
app.use("/images",express.static(__dirname + "/images"));

//More Middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(flash());
app.use(session({
    key: 'NGM Session',
    secret: 'GETABETTERSECRET',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



//passport.js contains login/signup
require('./config/passport')(passport, env);

//main.js contains routes
require('./app/main.js')(app, passport, env);


app.listen(80, function () {
    console.log('Secure Server listening on port 80');
});

module.exports = app;
