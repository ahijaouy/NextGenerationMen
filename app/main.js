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
     stmt = 'INSERT INTO Student(first_name,last_name,dob,startdate,email,parentone_name,parentone_num,parentone_email,parenttwo_name,parenttwo_num,parenttwo_email) VALUES (?,?,?,?,?,?,?,?,?,?,?);';
     connection.query(stmt,[req.body.first_name,req.body.last_name,new Date(req.body.dob),Date.now(),req.body.email,req.body.parentone_name,req.body.parentone_num,req.body.parentone_email,req.body.parenttwo_name,req.body.parenttwo_num,req.body.parenttwo_email], function(err, rows){ 
      console.log(err);
    });
  
});
  
  //School routes
app.get('/schools', function(req, res) {
  connection.query("SELECT * FROM School", function(err, rows){
        res.render('schools', { schools: rows});
    });
});

app.delete('/schools', function(req, res) {
  console.log("Deleted");
});

app.get('/addSchool', function(req, res) {
    res.render('addSchool');
});

app.post('/addSchool', function(req, res) {
    res.redirect('/schools');
    console.log(req.body);
    stmt = 'INSERT INTO School(school_name,principle,principle_phone,school_address,school_phone) VALUES (?,?,?,?,?);';
    connection.query(stmt,[req.body.schoolName,req.body.principleName,req.body.principlePhone,req.body.schoolAddress,req.body.schoolNumber], function(err, rows) {
      console.log(err);
    });
});

app.get('/schools/:id/delete', function(req, res) {
  console.log(req.params);
  res.redirect('/schools');
  connection.query("DELETE FROM School WHERE school_id=" + req.params.id, function(err, rows) {
    console.log(err);
  });
});

app.get('/schools/:id/profile', function(req, res) {
  console.log(req.params);
  var query = "SELECT * FROM School WHERE school_id=" + req.params.id;
  connection.query(query, function(err, rows) {
    console.log(rows[0]);
    res.render('schoolDetail', {school: rows[0]});
  });
});

app.get('/schools/:id/edit', function(req, res) {
  console.log(req.params);
});
  
  //Partner routes
  app.get('/partners',ensureLog, function(req, res) {
	res.render('partners');
});
  app.get('/addPartner',ensureLog, function(req, res) {
	res.render('addPartner');
});

  
};
  

