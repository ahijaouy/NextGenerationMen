module.exports = function(app, passport) {

  var mysql      = require('mysql'),
      dbconfig   = require('../config/database'),
      connection = mysql.createConnection(dbconfig.connection);
  
  connection.query('USE ' + dbconfig.database);



  //routes
  app.get('/', function(req, res) {
	    res.render('login', { message: req.flash('loginMessage')});
  });


  //login, logout, and sign up routes
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage')});
  });
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/index',
    failureRedirect : '/login',
    failureFlash : true
  }), function(req, res) {
            if (req.body.remember) {
          req.session.cookie.maxAge = 1000 * 60 * 20; //20 minutes
      } else {
          req.session.cookie.expires = false;
      }
          });
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/index',
    failureRedirect : '/login',
    failureFlash : true
  }));
  
  //index route
  app.get('/index',isLoggedIn, function(req, res) {
	res.render('index');
  });
  
  //Student routes
  app.get('/students',isLoggedIn, function(req, res) {
	connection.query("SELECT * FROM Student", function(err, rows){
        res.render('students', { students: rows});
    });
});
  app.post('/students',isLoggedIn, function(req, res) {
  res.send('POST request recieved');
  res.end();
  //console.log(req.body);
});
  app.get('/students/:id/profile',isLoggedIn, function(req, res) {
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
  app.get('/addStudent',isLoggedIn, function(req, res) {
	res.render('addStudent');
});
  app.post('/addStudent',isLoggedIn, function(req, res) {
	res.redirect('/students');
     console.log(req.body);
     stmt = 'INSERT INTO Student(first_name,last_name,dob,startdate,email,parentone_name,parentone_num,parentone_email,parenttwo_name,parenttwo_num,parenttwo_email) VALUES (?,?,?,?,?,?,?,?,?,?,?);';
     connection.query(stmt,[req.body.first_name,req.body.last_name,new Date(req.body.dob),Date.now(),req.body.email,req.body.parentone_name,req.body.parentone_num,req.body.parentone_email,req.body.parenttwo_name,req.body.parenttwo_num,req.body.parenttwo_email], function(err, rows){ 
      console.log(err);
    });
  
});
  
  //School routes
  app.get('/schools',isLoggedIn, function(req, res) {
	connection.query("SELECT * FROM School", function(err, rows){
        res.render('schools', { schools: rows});
    });
});
  app.get('/addSchool',isLoggedIn, function(req, res) {
    res.render('addSchool');
  });
  
  
  //Partner routes
  app.get('/partners',isLoggedIn, function(req, res) {
	res.render('partners');
});
  app.get('/addPartner',isLoggedIn, function(req, res) {
	res.render('addPartner');
});

  
};
  
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
     res.redirect('/login');
 }
}
