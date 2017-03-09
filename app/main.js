module.exports = function(app, passport) {

  var mysql          = require('mysql'),
      dbconfig       = require('../config/database'),
      connection     = mysql.createConnection(dbconfig.connection),
      ensureLog      = require('connect-ensure-login').ensureLoggedIn(),
      env            = require('node-env-file'),
      dialog         = require('dialog');

  env('./.env');;
  
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
    connection.query("SELECT * FROM student", function(err, students){
      connection.query("SELECT * FROM school", function(err, schools){
        res.render('index', {
            students: students,
            schools: schools,
            
        });
      });
    });
  });
  
  //Student routes
  app.get('/students',ensureLog, function(req, res) {
    connection.query("SELECT student.student_id, student.student_first_name, student.student_phone, student.student_last_name, school.school_name, cohort.cohort_year, student.guardian_one_name, student.guardian_one_phone FROM student INNER JOIN cohort ON student.cohort_id=cohort.cohort_id INNER JOIN school ON cohort.school_id=school.school_id;", function(err, rows){
      res.render('students', { students: rows});
    });
  });


  app.get('/students/:id/profile',ensureLog, function(req, res) {
    var query = "SELECT * FROM student WHERE student_id=" + req.params.id;
    connection.query(query, function(err, rows){
      rows[0].student_dob = rows[0].student_dob.toDateString(); //properly set date.
      res.render('profile', { student: rows[0]});
    });
  });


  app.get('/addStudent',ensureLog, function(req, res) {
    connection.query("SELECT cohort.cohort_id, cohort.cohort_year, school.school_name FROM cohort INNER JOIN school ON cohort.school_id=school.school_id;", function(err, rows) {
      res.render('addStudent', {cohorts: rows});
    });
  });

  app.post('/addStudent',ensureLog, function(req, res) {
    res.redirect('/students');
    console.log(req.body);
    stmt = 'INSERT INTO student(student_gender, cohort_id,student_first_name,student_last_name,student_phone,student_dob,student_start_date,student_email,guardian_one_name,guardian_one_phone,guardian_one_email,guardian_two_name,guardian_two_phone,guardian_two_email,middleschool_absences,highschool_absences,highschool_suspensions) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    connection.query(stmt,[req.body.gender,req.body.cohort,req.body.student_first_name,req.body.student_last_name,req.body.student_phone,new Date(req.body.student_dob),Date.now(),req.body.student_email,req.body.parentone_name,req.body.parentone_num,req.body.parentone_email,req.body.parenttwo_name,req.body.parenttwo_num,req.body.parenttwo_email,req.body.mssuspensions,req.body.hssuspensions,req.body.hsabsences], function(err, rows){ 
    if (err) { dialog.err('Sorry, the system was unable to add the student. Please make sure you fill out all required fields.', 'Error Adding Student!'); }
    });
  });
  
  //School routes
  app.get('/schools',ensureLog, function(req, res) {
  connection.query("SELECT * FROM school", function(err, rows){
        res.render('schools', { schools: rows});
    });
  });

  app.get('/addSchool',ensureLog, function(req, res) {
    res.render('addSchool');
});

app.post('/addSchool', function(req, res) {
    res.redirect('/schools');
    console.log(req.body);
    stmt = 'INSERT INTO school(school_name,school_address,school_phone,principal_name,principal_phone,principal_email,assistant_principal_name,assistant_principal_phone,assistant_principal_email,cohort_coach_name,cohort_coach_phone,cohort_coach_email,ngm_fellow_name,ngm_fellow_phone,ngm_fellow_email,counselor_name,counselor_phone,counselor_email,social_worker_name,social_worker_phone,social_worker_email,data_liason_name,data_liason_phone,data_liason_email,cis_coordinator_name,cis_coordinator_phone,cis_coordinator_email,college_coach_name,college_coach_phone,college_coach_email) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    connection.query(stmt,[req.body.school_name,req.body.school_address,req.body.school_phone,req.body.principal_name,req.body.principal_phone,req.body.principal_email,req.body.assistant_principal_name,req.body.assistant_principal_phone,req.body.assistant_principal_email,req.body.cohort_coach_name,req.body.cohort_coach_phone,req.body.cohort_coach_email,req.body.ngm_fellow_name,req.body.ngm_fellow_phone,req.body.ngm_fellow_email,req.body.counselor_name,req.body.counselor_phone,req.body.counselor_email,req.body.social_worker_name,req.body.social_worker_phone,req.body.social_worker_email,req.body.data_liason_name,req.body.data_liason_phone,req.body.data_liason_email,req.body.cis_coordinator_name,req.body.cis_coordinator_phone,req.body.cis_coordinator_email,req.body.college_coach_name,req.body.college_coach_phone,req.body.college_coach_email], function(err, rows) {
      console.log(err);
    });
});

app.get('/schools/:id/delete', function(req, res) {
  console.log(req.params);
  res.redirect('/schools');
  connection.query("DELETE FROM school WHERE school_id=" + req.params.id, function(err, rows) {
    console.log(err);
  });
});

app.get('/schools/:id/profile', function(req, res) {
  console.log(req.params);
  var query = "SELECT * FROM school WHERE school_id=" + req.params.id;
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
  