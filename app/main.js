module.exports = function(app, passport, env) {

  var mysql          = require('mysql'),
      ensureLog      = require('connect-ensure-login').ensureLoggedIn();


  var dbconfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  }

  var connection = mysql.createConnection(dbconfig);

  connection.query('USE ' + process.env.DATABASE);



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
    res.render('login', {
    domain: process.env.AUTH0_DOMAIN,
    client: process.env.AUTH0_CLIENT,
    callback: process.env.AUTH0_CALLBACK });
  });


  app.get('/', function(req, res) {
      res.render('login', {
    domain: process.env.AUTH0_DOMAIN,
    client: process.env.AUTH0_CLIENT,
    callback: process.env.AUTH0_CALLBACK });
  });

  //login, logout, and sign up routes
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  //index route
  app.get('/index',ensureLog, function(req, res) {
    connection.query("SELECT * FROM student order by date_modified", function(err, students){
      connection.query("SELECT * FROM school", function(err, schools){
        var innerJoinQuery = "SELECT * FROM student INNER JOIN cohort ";
        innerJoinQuery += "on student.cohort_id=cohort.cohort_id";
        connection.query(innerJoinQuery, function(err, joins) {
          res.render('index', {
              students: students,
              schools: schools,
              joins: joins
          });
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
    var query = "SELECT * FROM student INNER JOIN cohort on student.cohort_id=cohort.cohort_id INNER JOIN school on cohort.school_id=school.school_id WHERE student_id=" + req.params.id + ";";
    var surveyQueryString = "Select response from survey_response inner join survey_question on survey_question.survey_question_id=survey_response.survey_question_id where student_id=" + req.params.id;
    var surveyQueries = [];
    for (var i = 1; i <= 7; i++) {
        surveyQueries.push(surveyQueryString + " and survey_category_id=" +  i + ";");
    }
    connection.query(query, function(err, rows){
    connection.query(surveyQueries[0], function(err, grit) {
    connection.query(surveyQueries[1], function(err, problemSolving) {
    connection.query(surveyQueries[2], function(err, academicSelfEfficacy) {
    connection.query(surveyQueries[3], function(err, teamwork) {
    connection.query(surveyQueries[4], function(err, socialCompetence) {
    connection.query(surveyQueries[5], function(err, growthMindset) {
    connection.query(surveyQueries[6], function(err, academicBehaviors) {
      surveyQueries = [];
      surveyQueries.push(grit);
      surveyQueries.push(problemSolving);
      surveyQueries.push(academicSelfEfficacy);
      surveyQueries.push(teamwork);
      surveyQueries.push(socialCompetence);
      surveyQueries.push(growthMindset);
      surveyQueries.push(academicBehaviors);
      var data = [];
      for (var i = 0; i < surveyQueries.length; i++) {
          var num = 0;
          for (var j = 0; j < surveyQueries[i].length; j++) {
              num += surveyQueries[i][j];
          }
          num = num / surveyQueries[i].length;
          num = num / 5 * 100;
          data.push[num];
      }
      console.log(data);
      res.render('profile', {
          student: rows[0],
          surveyData: data
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


  app.get('/addStudent',ensureLog, function(req, res) {
    connection.query("SELECT cohort.cohort_id, cohort.cohort_year, school.school_name FROM cohort INNER JOIN school ON cohort.school_id=school.school_id;", function(err, rows) {
      res.render('addStudent', {cohorts: rows});
    });
  });

  app.post('/addStudent',ensureLog, function(req, res) {
    res.redirect('/students');
    console.log(req.body);
    stmt = 'INSERT INTO student(student_gender, cohort_id,student_first_name,student_last_name,student_phone,student_dob,student_start_date,student_email,guardian_one_name,guardian_one_phone,guardian_one_email,guardian_two_name,guardian_two_phone,guardian_two_email,middleschool_suspensions,highschool_absences,highschool_suspensions) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    connection.query(stmt,[req.body.gender,req.body.cohort,req.body.student_first_name,req.body.student_last_name,req.body.student_phone,new Date(req.body.student_dob),Date.now(),req.body.student_email,req.body.parentone_name,req.body.parentone_num,req.body.parentone_email,req.body.parenttwo_name,req.body.parenttwo_num,req.body.parenttwo_email,req.body.mssuspensions,req.body.hssuspensions,req.body.hsabsences], function(err, rows){
      if (err) { dialog.err('Sorry, an error occured while trying to add the student. Please make sure you fill out all required fields indicated by the *.', 'Failed to Add Student'); }
      console.log(err);
    });
  });

app.get('/students/:id/delete',ensureLog, function(req, res) {
  console.log(req.params);
  res.redirect('/students');
  connection.query("DELETE FROM student WHERE student_id=" + req.params.id, function(err, rows) {
    console.log(err);
  });
});

app.get('/students/:id/edit', ensureLog, function(req, res) {
  var query = "SELECT * FROM student WHERE student_id=" + req.params.id;
  connection.query(query, function(err, rows) {
    res.render('editStudent', {student: rows[0]});
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

app.post('/addSchool',ensureLog, function(req, res) {
    res.redirect('/schools');
    stmt = 'INSERT INTO school(school_name,school_address,school_phone,principal_name,principal_phone,principal_email,assistant_principal_name,assistant_principal_phone,assistant_principal_email,cohort_coach_name,cohort_coach_phone,cohort_coach_email,ngm_fellow_name,ngm_fellow_phone,ngm_fellow_email,counselor_name,counselor_phone,counselor_email,social_worker_name,social_worker_phone,social_worker_email,data_liason_name,data_liason_phone,data_liason_email,cis_coordinator_name,cis_coordinator_phone,cis_coordinator_email,college_coach_name,college_coach_phone,college_coach_email) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    connection.query(stmt,[req.body.school_name,req.body.school_address,req.body.school_phone,req.body.principal_name,req.body.principal_phone,req.body.principal_email,req.body.assistant_principal_name,req.body.assistant_principal_phone,req.body.assistant_principal_email,req.body.cohort_coach_name,req.body.cohort_coach_phone,req.body.cohort_coach_email,req.body.ngm_fellow_name,req.body.ngm_fellow_phone,req.body.ngm_fellow_email,req.body.counselor_name,req.body.counselor_phone,req.body.counselor_email,req.body.social_worker_name,req.body.social_worker_phone,req.body.social_worker_email,req.body.data_liason_name,req.body.data_liason_phone,req.body.data_liason_email,req.body.cis_coordinator_name,req.body.cis_coordinator_phone,req.body.cis_coordinator_email,req.body.college_coach_name,req.body.college_coach_phone,req.body.college_coach_email], function(err, rows) {
      if (err) { dialog.err('Sorry, an error occured while trying to add the school. Please make sure you fill out all required fields indicated by the *.', 'Failed to Add School'); }
      console.log(err);
    });
});

app.get('/schools/:id/delete',ensureLog, function(req, res) {
  connection.query("DELETE FROM school WHERE school_id=" + req.params.id, function(err, rows) {
    res.redirect('/schools');
    console.log(err);
  });
});

app.get('/schools/:id/profile',ensureLog, function(req, res) {
  var query = "SELECT * FROM school WHERE school_id=" + req.params.id;
  connection.query(query, function(err, rows) {
    res.render('schoolDetail', {school: rows[0]});
  });
});

app.get('/schools/:id/edit',ensureLog, function(req, res) {
  var query = "SELECT * FROM school WHERE school_id=" + req.params.id;
  connection.query(query, function(err, rows) {
    res.render('editSchool', {school: rows[0]});
  })
});

app.post('/schools/:id/edit',ensureLog, function(req, res) {
  var query = "UPDATE school SET school_name = ?, school_address = ?, school_phone = ?, principal_name = ?, principal_phone = ?, principal_email = ?, assistant_principal_name = ?, assistant_principal_phone = ?, assistant_principal_email = ?, cohort_coach_name = ?, cohort_coach_phone = ?, cohort_coach_email = ?, ngm_fellow_name = ?, ngm_fellow_phone = ?, ngm_fellow_email = ?, counselor_name = ?, counselor_phone = ?, counselor_email = ?, social_worker_name = ?, social_worker_phone = ?, social_worker_email = ?, data_liason_name = ?, data_liason_phone = ?, data_liason_email = ?, cis_coordinator_name = ?, cis_coordinator_phone = ?, cis_coordinator_email = ?, college_coach_name = ?, college_coach_phone = ?, college_coach_email = ? WHERE school_id = " + req.params.id;
  connection.query(query, [req.body.school_name,req.body.school_address,req.body.school_phone,req.body.principal_name,req.body.principal_phone,req.body.principal_email,req.body.assistant_principal_name,req.body.assistant_principal_phone,req.body.assistant_principal_email,req.body.cohort_coach_name,req.body.cohort_coach_phone,req.body.cohort_coach_email,req.body.ngm_fellow_name,req.body.ngm_fellow_phone,req.body.ngm_fellow_email,req.body.counselor_name,req.body.counselor_phone,req.body.counselor_email,req.body.social_worker_name,req.body.social_worker_phone,req.body.social_worker_email,req.body.data_liason_name,req.body.data_liason_phone,req.body.data_liason_email,req.body.cis_coordinator_name,req.body.cis_coordinator_phone,req.body.cis_coordinator_email,req.body.college_coach_name,req.body.college_coach_phone,req.body.college_coach_email], function(err, rows) {
    console.log(err);
    res.redirect('/schools/' + req.params.id + '/profile');
  });
});

app.get('/addCohort',ensureLog, function(req, res) {
  connection.query("SELECT school_id, school_name from school", function(err, rows) {
    res.render('addCohort', {schools: rows});
  });
});

app.post('/addCohort',ensureLog, function(req, res) {
  var query = "INSERT INTO cohort(school_id, cohort_year) VALUES (?,?);";
  connection.query(query, [req.body.school_id, req.body.cohort_year], function(err, rows) {
    res.redirect('/schools/' + req.body.school_id + '/profile');
  });
});

app.post('/students/:id/edit', ensureLog, function(req, res) {
    console.log(req.body);
  var query = "UPDATE student SET   student_first_name = ?, student_last_name = ?, student_dob = ?, student_gender = ?, student_phone = ?, student_email = ?, guardian_one_name = ?, guardian_one_email = ?, guardian_one_phone = ?, guardian_two_name = ?, guardian_two_email = ?, guardian_two_phone = ?, middleschool_suspensions = ?, highschool_absences = ?, highschool_suspensions = ?, cumulative_gpa = ?, total_credits_earned = ?, date_modified = ?, user_modified = ? WHERE student_id = ?;"
  connection.query(query, [req.body.student_first_name,req.body.student_last_name,req.body.student_dob,req.body.gender,req.body.student_phone,req.body.student_email,req.body.guardian_one_name,req.body.guardian_one_email,req.body.guardian_one_phone,req.body.guardian_two_name,req.body.guardian_two_email,req.body.guardian_two_phone,req.body.middleschool_suspensions,req.body.highschool_absence,req.body.highschool_suspensions,req.body.cumulative_gpa,req.body.total_credits_earned,req.body.date_modified,req.body.user_modified, req.params.id], function(err, rows) {
    console.log(err);
    res.redirect('/students/' + req.params.id + '/profile');
  });
});

  // //Partner routes
  // app.get('/partners',ensureLog, function(req, res) {
  //   res.render('partners');
  // });
  // app.get('/addPartner',ensureLog, function(req, res) {
  //   res.render('addPartner');
  // });


};
