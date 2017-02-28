module.exports = function(app, passport) {

  var mysql      = require('mysql'),
      dbconfig   = require('../config/database'),
      connection = mysql.createConnection(dbconfig.connection),
      ensureLog  = require('connect-ensure-login').ensureLoggedIn();;
  
  connection.query('USE ' + dbconfig.database);


  //New Code to try to implemnt Auth0
  
  var env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://admin.ngmatlanta.org/callback'
  };
  

app.get('/callback',
  passport.authenticate('test', { 
    failureRedirect: '/login',
    successRedirect: '/index',
  }),
 function(req, res) {
    console.log('function');
    if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 20; //20 minutes
    } else {
        req.session.cookie.expires = false;
    }
    res.redirect(req.session.returnTo || '/index');
  });
  
  app.get('/login', function(req, res){
    res.render('login', { env: env });
  });

  
  //End of New Code


  app.get('/', function(req, res) {
	    res.render('login');
  });

  //login, logout, and sign up routes
  app.get('/logout', function(req, res) {
    console.log(req.user);
    req.logout();
    console.log(req.user);
    res.redirect('/');
  });
  
  
  //index route
  app.get('/index',ensureLog, function(req, res) {
    console.log(req.user);
	res.render('index');
  });
  
  //Student routes
  app.get('/students',ensureLog, function(req, res) {
	connection.query("SELECT * FROM Student", function(err, rows){
        res.render('students', { students: rows});
    });
});
  app.post('/students',ensureLog, function(req, res) {
  res.send('POST request recieved');
  res.end();
  //console.log(req.body);
});
  app.get('/students/:id/profile',ensureLog, function(req, res) {
  //console.log(req);
  console.log(req.params);
  var query = "SELECT * FROM Student WHERE id=" + req.params.id;
  connection.query(query, function(err, rows){
    console.log(rows[0]);
    rows[0].dob = rows[0].dob.toDateString(); //properly set date.
    //rows[0].startdate = rows[0].startdate.toDateString();
    res.render('profile', { student: rows[0]});
  });

});
  app.get('/addStudent',ensureLog, function(req, res) {
	res.render('addStudent');
});
  app.post('/addStudent',ensureLog, function(req, res) {
	res.redirect('/students');
     console.log(req.body);
     stmt = 'INSERT INTO student(cohort_id,student_first_name,student_last_name,student_dob,student_start_date,student_email,guardian_one_name,guardian_one_phone,guardian_one_email,guardian_two_name,guardian_two_phone,guardian_two_email,middleschool_absences,highschool_absences,highschool_suspensions) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
     connection.query(stmt,["1",req.body.first_name,req.body.last_name,new Date(req.body.dob),Date.now(),req.body.email,req.body.parentone_name,req.body.parentone_num,req.body.parentone_email,req.body.parenttwo_name,req.body.parenttwo_num,req.body.parenttwo_email,req.body.mssuspensions,req.body.hssuspensions,req.body.hsabsences], function(err, rows){ 
      console.log(err);
    });

     //middle school absences or suspensions ??
  
});
  
  //School routes
  app.get('/schools',ensureLog, function(req, res) {
	connection.query("SELECT * FROM School", function(err, rows){
        res.render('schools', { schools: rows});
    });
});
  app.get('/addSchool',ensureLog, function(req, res) {
    res.render('addSchool');
  });
  
  
  //Partner routes
  app.get('/partners',ensureLog, function(req, res) {
	res.render('partners');
});
  app.get('/addPartner',ensureLog, function(req, res) {
	res.render('addPartner');
});

  
};
  

