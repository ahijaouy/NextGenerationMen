module.exports = function(app, passport, env) {

  var mysql       = require('mysql'),
      ensureLog   = require('connect-ensure-login').ensureLoggedIn(),
      students    = require('./student_routes'),
      schools     = require('./school_routes'),
      request     = require('request');


  var dbconfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  }  

  var connection = mysql.createConnection(dbconfig);

  //Use the subroutes defined in different files
  app.use('/students', students);
  app.use('/schools', schools);
  
  connection.query('USE ' + process.env.DATABASE);


  //Callback route for Auth0
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
  

  //Login Route
  app.get('/login', function(req, res){
    res.render('login', { 
    domain: process.env.AUTH0_DOMAIN,
    client: process.env.AUTH0_CLIENT,
    callback: process.env.AUTH0_CALLBACK });
  });

  //Default Route to login
  app.get('/', function(req, res) {
      res.render('login', { 
    domain: process.env.AUTH0_DOMAIN,
    client: process.env.AUTH0_CLIENT,
    callback: process.env.AUTH0_CALLBACK });
  });

  //Logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  
  //index route
  app.get('/index',ensureLog, function(req, res) {
    var firstQuery = "SELECT student_id, student_first_name, student_last_name, school_name, cohort_year FROM student INNER JOIN cohort on student.cohort_id=cohort.cohort_id INNER JOIN school on cohort.school_id=school.school_id order by student.date_modified LIMIT 5;";
    connection.query(firstQuery, function(err1, students){
      if (err1) {console.log(err1)}
      connection.query("SELECT * FROM school;", function(err2, schools){
        if (err2) {console.log(err2)}
        connection.query("SELECT * FROM cohort;", function(err3, cohorts) {
          if (err3) {console.log(err3)}
          var innerJoinQuery = "SELECT * FROM student ";
          innerJoinQuery += "INNER JOIN cohort on student.cohort_id=cohort.cohort_id ";
          innerJoinQuery += "INNER JOIN school on cohort.school_id=school.school_id ";
          connection.query(innerJoinQuery + ";", function(err4, studentCohortSchoolJoin) {
            if (err4) {console.log(err4)}
            innerJoinQuery += "INNER JOIN semester_record on semester_record.student_id=student.student_id ";
            connection.query(innerJoinQuery + ";", function(err7, semesterRecordJoin) { 
              var newQuery = "SELECT * FROM student ";
              newQuery += "INNER JOIN semester_record ON semester_record.student_id=student.student_id ";
              newQuery += "INNER JOIN survey_response ON survey_response.semester_record_id=semester_record.semester_record_id";
              innerJoinQuery += "INNER JOIN survey_response ON survey_response.semester_record_id=semester_record.semester_record_id";
              connection.query(innerJoinQuery + ";", function(err8, surveyResponseJoin) {
                connection.query("SELECT COUNT(student_gender) as count from student where student_gender=\"Male\"",function(err, maleCounter) {
                  connection.query("SELECT COUNT(student_gender) as count from student where student_gender=\"Female\"", function(err, femaleCounter) {
                    connection.query("SELECT * from survey_response;", function(err5, survey_responses) {
                      connection.query("SELECT COUNT(student_id) as count FROM student;", function(err6, count) {
                        if (err5) {console.log(err5);}
                        res.render('index', {
                          user: req.user._json.user_metadata,
                          students: students,
                          count: count[0].count,
                          schools: schools,
                          cohorts: cohorts,
                          studentCohortSchoolJoin: studentCohortSchoolJoin,
                          semesterRecordJoin: semesterRecordJoin,
                          surveyResponseJoin: surveyResponseJoin,
                          survey_response: survey_responses,
                          studentCounter: maleCounter[0].count + femaleCounter[0].count,
                          maleCounter: maleCounter[0].count,
                          femaleCounter: femaleCounter[0].count
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });



//Routes to add new entries
  app.get('/addStudent',ensureLog, function(req, res) {
    connection.query("SELECT cohort.cohort_id, cohort.cohort_year, school.school_name FROM cohort INNER JOIN school ON cohort.school_id=school.school_id;", function(err, rows) {
      console.log(err);
      res.render('addStudent', {cohorts: rows, user: req.user._json.user_metadata});
    });
  });

  app.post('/addStudent',ensureLog, function(req, res) {
    res.redirect('/students');
    if (req.body.student_start_date === undefined) {req.body.student_start_date = new Date(Date.now());}
    stmt = 'INSERT INTO student(student_gender, cohort_id,student_first_name,student_last_name,student_phone,student_dob,student_start_date,student_email,guardian_one_name,guardian_one_phone,guardian_one_email,guardian_two_name,guardian_two_phone,guardian_two_email,middleschool_suspensions,highschool_absences,highschool_suspensions, date_modified, user_modified) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    connection.query(stmt,[req.body.gender,req.body.cohort,req.body.student_first_name,req.body.student_last_name,req.body.student_phone,req.body.student_dob,req.body.student_start_date,req.body.student_email,req.body.parentone_name,req.body.parentone_num,req.body.parentone_email,req.body.parenttwo_name,req.body.parenttwo_num,req.body.parenttwo_email,req.body.mssuspensions,req.body.hssuspensions,req.body.hsabsences, new Date(Date.now()), "Username"], function(err, rows){ 
      console.log(err);
    });
  });

app.get('/addSchool',ensureLog, function(req, res) {
  res.render('addSchool', {user: req.user._json.user_metadata});
});

app.post('/addSchool',ensureLog, function(req, res) {
    res.redirect('/schools');
    stmt = 'INSERT INTO school(school_name,school_address,school_phone,principal_name,principal_phone,principal_email,assistant_principal_name,assistant_principal_phone,assistant_principal_email,cohort_coach_name,cohort_coach_phone,cohort_coach_email,ngm_fellow_name,ngm_fellow_phone,ngm_fellow_email,counselor_name,counselor_phone,counselor_email,social_worker_name,social_worker_phone,social_worker_email,data_liason_name,data_liason_phone,data_liason_email,cis_coordinator_name,cis_coordinator_phone,cis_coordinator_email,college_coach_name,college_coach_phone,college_coach_email, date_modified, user_modified) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    connection.query(stmt,[req.body.school_name,req.body.school_address,req.body.school_phone,req.body.principal_name,req.body.principal_phone,req.body.principal_email,req.body.assistant_principal_name,req.body.assistant_principal_phone,req.body.assistant_principal_email,req.body.cohort_coach_name,req.body.cohort_coach_phone,req.body.cohort_coach_email,req.body.ngm_fellow_name,req.body.ngm_fellow_phone,req.body.ngm_fellow_email,req.body.counselor_name,req.body.counselor_phone,req.body.counselor_email,req.body.social_worker_name,req.body.social_worker_phone,req.body.social_worker_email,req.body.data_liason_name,req.body.data_liason_phone,req.body.data_liason_email,req.body.cis_coordinator_name,req.body.cis_coordinator_phone,req.body.cis_coordinator_email,req.body.college_coach_name,req.body.college_coach_phone,req.body.college_coach_email, new Date(Date.now()), "Username"], function(err, rows) {
      console.log(err);
    });
});

app.get('/addCohort',ensureLog, function(req, res) {
  connection.query("SELECT school_id, school_name from school", function(err, rows) {
    console.log(err);
    res.render('addCohort', {schools: rows, user: req.user._json.user_metadata});
  });
});

app.post('/addCohort',ensureLog, function(req, res) {
  var query = "INSERT INTO cohort(school_id, cohort_year, date_modified, user_modified) VALUES (?,?,?,?);";
  connection.query(query, [req.body.school_id, req.body.cohort_year, new Date(Date.now()), "Username"], function(err, rows) {
    console.log(err);
    res.redirect('/schools/' + req.body.school_id + '/profile');
  });
});



//Cohort Routes?

app.get('/cohorts/:id/edit', ensureLog, function(req, res) {

});

app.get('/cohorts/:id/delete', ensureLog, function(req, res) {
  connection.query("DELETE FROM cohort WHERE cohort_id=" + req.params.id, function(err, rows) {
    console.log(err);
    if (err) { dialog.err('Sorry, an error occured. Make sure the cohort you are trying to delete has no students associted with it.', 'Failed to Delete Cohort'); }

    res.redirect('/schools');
  });
});

// app.get('/alumni',ensureLog, function(req, res) {
//   connection.query("SELECT student.student_id, student.student_first_name, student.student_phone, student.student_last_name, school.school_name, cohort.cohort_year, student.guardian_one_name, student.guardian_one_phone FROM student INNER JOIN cohort ON student.cohort_id=cohort.cohort_id INNER JOIN school ON cohort.school_id=school.school_id;", function(err, rows){
//     console.log(err);
//     res.render('alumni', { students: rows});
//   });
// });

app.get('/editProfile', ensureLog, function(req, res) {
  
  res.render('editUserProfile', {user: req.user._json});
  
});

app.post('/editProfile', ensureLog, function(req, res) {
  var body = {"email":req.body.email, "user_metadata": {"name": req.body.name }};

  callAuth0("PATCH", "users/auth0|58c60dde6c180767800c2fa8",body, function(response) {
    res.redirect('index');
  });
});

app.get('/resetPassword', ensureLog, function(req, res) {
  var options = { method: 'POST',
    url: 'https://ngmatl.auth0.com/dbconnections/change_password',
    headers: { 'content-type': 'application/json' },
    body: 
     { client_id: 'T4zfzFLTpefPOzcusSDe5pNckdtqs33D',
       email: req.user._json.email,
       connection: 'Username-Password-Authentication' },
    json: true 
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

  });
  res.redirect('/index');
});

  
  // //Partner routes
  // app.get('/partners',ensureLog, function(req, res) {
  //   res.render('partners');
  // });
  // app.get('/addPartner',ensureLog, function(req, res) {
  //   res.render('addPartner');
  // });


 // app.get('/admin', ensureLog, function(req, res) {
 //    console.log(req.user._json.user_metadata.name);
 //    callAuth0("get", "logs", function(response) {
 //      console.log(response);
 //    });
   
 //    res.render('admin');
 //  });
var generateToken = function(callback) {
    //Auth0 API Access Code
    var options = { method: 'Post',
      url: 'https://ngmatl.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: 
       { grant_type: 'client_credentials',
         client_id: 'T4zfzFLTpefPOzcusSDe5pNckdtqs33D',
         client_secret: 'Tvdhw9Icvz-fEyMYq7z2yKOU3SmFDnv1W1YKUDwUomrj3vhCOL6xLaiGHbBhGQGt',
         audience: 'https://ngmatl.auth0.com/api/v2/' },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      callback(body.access_token);
    });
  };
  var callAuth0 = function(requestMethod, requestUrl, requestBody, callback) {
    var url = "https://ngmatl.auth0.com/api/v2/";
    
    generateToken(function(token) {
      var options = { 
        method: requestMethod,
        url: url + requestUrl,
        headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json' },
        body: requestBody,
        json: true
          
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body);
      });
    });
  };
  
};
  