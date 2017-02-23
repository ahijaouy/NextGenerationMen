var express 	  = require('express'),
	bodyParser 	  = require('body-parser'),
	path 		  = require('path'),
    exphbs 	      = require('express-handlebars'),
    passport      = require('passport'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    session       = require('express-session'),
    MySQLStore    = require('express-mysql-session')(session),
    dotenv        = require ('dotenv'),
    Auth0Strategy = require('passport-auth0'),
    helmet        = require('helmet'),
    flash         = require('connect-flash'),
    app           = express(),
    dbconfig      = require('./config/database.js');
//for MySQLStore
var options = {
    host: dbconfig.connection.host,
    user: dbconfig.connection.user,
    password: dbconfig.connection.password,
    database: dbconfig.database,
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
var sessionStore = new MySQLStore(options);


//Set View Engine
app.engine('hbs', exphbs({defaultLayout: false, extname:'.hbs',}));
app.set('view engine', 'hbs');

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
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));
//app.use(session({ secret: 'keyboardingkat',
//                  resave: true,
//                  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//passport.js contains login/signup 
require('./config/passport')(passport);

//main.js contains routes
require('./app/main.js')(app, passport);

//Launch server?
app.listen(80, function() {
	console.log('we are live on 80');
});


 module.exports = app;
