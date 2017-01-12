// var express     = require('express');
// var app         = express();
// var passport	= require('passport');
// var bodyParser  = require('body-parser');
// var helmet      = require('helmet');
// var flash       = require('connect-flash');
// var morgan      = require('morgan');
// var session     = require('express-session');
// var port        = process.env.PORT || 80;
//var favicon     = require('express-favicon')
var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	path 		= require('path'),
	mysql		= require('mysql'),
	dbconfig	= require('./config/database'),
	exphbs 	= require('express-handlebars');

var connection = mysql.createConnection(dbconfig.connection)
connection.query('USE ' + dbconfig.database);

var app = express();



//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set View Engine
app.engine('hbs', exphbs({defaultLayout: false, extname:'.hbs',}));
app.set('view engine', 'hbs');

//Set static path
app.use("/vendors",express.static(__dirname + "/vendors"));
app.use("/build",express.static(__dirname + "/build"));
app.use("/images",express.static(__dirname + "/images"));

//routes
app.get('/', function(req, res) {
	res.render('index');
	 
	connection.query("SELECT * FROM Student", function(err, rows){
        console.log(rows);
        //rows.dob = new Date(rows.dob).toDateString();
        res.render('index');
    });

	
});

app.get('/index.html', function(req, res) {
	res.render('index');
});

app.get('/schools.html', function(req, res) {
	connection.query("SELECT * FROM School", function(err, rows){
        res.render('schools', { schools: rows});
    });
});

app.get('/students.html', function(req, res) {
	connection.query("SELECT * FROM Student", function(err, rows){
        res.render('students', { students: rows});
    });
});

app.get('/partners.html', function(req, res) {
	res.render('partners');
});

app.get('/addStudent.html', function(req, res) {
	res.render('addStudent');
});

app.get('/addSchool.html', function(req, res) {
	res.render('addSchool');
});

app.get('/addPartner.html', function(req, res) {
	res.render('addPartner');
});



//Launch server?
app.listen(80, function() {
	console.log('we are live on 80');
});

// app.set('view engine', 'pug');
// //app.use(favicon(__dirname + '/utilities/logo.ico')); //Make sure this exists
// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(helmet());
// app.use(flash());
// app.use(session({ secret: 'keyboardingkat',
//                   resave: true,
//                   saveUninitialized: true}));
// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport')(passport);
// require('./app/main.js')(app, passport);

// app.listen(port, function() {
//     console.log("We're live on " + port);
// });

// module.exports = app;
