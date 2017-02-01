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

// TESTING branch

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
	 
	connection.query("SELECT * FROM Student", function(err, rows){
        console.log(rows);
        //rows.dob = new Date(rows.dob).toDateString();
        res.render('index');
    });

	
});

app.post('/students', function(req, res) {
  res.send('POST request recieved');
  res.end();
  //console.log(req.body);
});
app.get('/students/:id/profile', function(req, res) {
  //console.log(req);
  console.log(req.params);
  var query = "SELECT * FROM Student WHERE id=" + req.params.id;
  //console.log(que);
  connection.query(query, function(err, rows){
    console.log(rows[0]);
    rows[0].dob = rows[0].dob.toDateString(); //properly set date.
    //rows[0].startdate = rows[0].startdate.toDateString();
    res.render('profile', { student: rows[0]});
  });
  //res.send('working..');
  //res.render('profile', {student : req.query});

});

app.get('/index', function(req, res) {
	res.render('index');
});

app.get('/schools', function(req, res) {
	connection.query("SELECT * FROM School", function(err, rows){
        res.render('schools', { schools: rows});
    });
});

app.get('/students', function(req, res) {
	connection.query("SELECT * FROM Student", function(err, rows){
        res.render('students', { students: rows});
    });
});

app.get('/partners', function(req, res) {
	res.render('partners');
});

app.get('/addStudent', function(req, res) {
	res.render('addStudent');
});

app.post('/addStudent', function(req, res) {
	//res.render('addStudent');
  res.send('POST request recieved');
  //console.log(req.body);
  stmt = 'INSERT INTO Student(first_name, last_name,dob,startdate,phonenum,email,parentone_name,parentone_num,parentone_email,parenttwo_name,parenttwo_num,parenttwo_email, cohort, school) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
  
  connection.query(stmt,['first_name', 'last_name',new Date(req.body.dob), new Date(req.body.dob),'phonenum','email','parentone_name','parentone_num','parentone_email','parenttwo_name','parenttwo_num','parenttwo_email', 'cohort', 'school'], function(err, rows){ 
    console.log(err);
  });
  
  console.log('yes!');
  
});

app.get('/addSchool', function(req, res) {
	res.render('addSchool');
});

app.get('/addPartner', function(req, res) {
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
