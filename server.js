var express       = require('express'),
    bodyParser    = require('body-parser'),
    path          = require('path'),
    exphbs        = require('express-handlebars'),
    passport      = require('passport'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    session       = require('express-session'),
    MySQLStore    = require('express-mysql-session')(session),
    env           = require('node-env-file'),
    helmet        = require('helmet'),
    app           = express();


env('.env');
var port = process.env.PORT || 80;

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
app.use(session({
    key: 'NGM Session',
    secret: 'p4uuprn7HwEugArJlVMmbxXMuQYGslPos',
    store: new MySQLStore({
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
    }),
    resave: true,
    saveUninitialized: true,
}));



//Configure Passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//main.js contains routes
var main = require('./app/main.js');
app.use('/', main(express,passport));

app.listen(port, function () {
    console.log('Secure Server listening on port ' + port);
});

module.exports = app;
