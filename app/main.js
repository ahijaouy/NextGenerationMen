module.exports = function(app, passport, env) {

  var mysql          = require('mysql'),
      ensureLog      = require('connect-ensure-login').ensureLoggedIn(),
      dialog         = require('dialog');;


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
    connection.query("SELECT * FROM student order by date_modified;", function(err, students){
      connection.query("SELECT * FROM school;", function(err, schools){
        connection.query("SELECT * FROM cohort;", function(err, cohorts) {
          var innerJoinQuery = "SELECT * FROM student ";
          innerJoinQuery += "INNER JOIN cohort on student.cohort_id=cohort.cohort_id ";
          innerJoinQuery += "INNER JOIN semester_record on semester_record.student_id=student.student_id; ";
          connection.query(innerJoinQuery, function(err, joins) {
            connection.query("SELECT COUNT(student_gender) as count from student where student_gender=\"Male\"",function(err, maleCounter) {
              connection.query("SELECT COUNT(student_gender) as count from student where student_gender=\"Female\"", function(err, femaleCounter) {
                connection.query("SELECT * from survey_response;", function(err, survey_responses) {
                  res.render('index', {
                    students: students,
                    schools: schools,
                    cohorts: cohorts,
                    joins: joins,
                    survey_response: survey_responses,
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

  
  //Student routes
  app.get('/students',ensureLog, function(req, res) {
    connection.query("SELECT student.student_id, student.student_first_name, student.student_phone, student.student_last_name, school.school_name, cohort.cohort_year, student.guardian_one_name, student.guardian_one_phone FROM student INNER JOIN cohort ON student.cohort_id=cohort.cohort_id INNER JOIN school ON cohort.school_id=school.school_id;", function(err, rows){
      console.log(err);
      res.render('students', { students: rows});
    });
  });


  app.get('/students/:id/profile',ensureLog, function(req, res) {
    var query = "SELECT * FROM student INNER JOIN cohort on student.cohort_id=cohort.cohort_id INNER JOIN school on cohort.school_id=school.school_id WHERE student_id=" + req.params.id + ";";
    connection.query(query, function(err, rows) {
      //rows[0].student_dob = rows[0].student_dob.toDateString(); //properly set date.
      
      var academicRecord = "SELECT * FROM semester_record WHERE student_id=" + req.params.id + ";";
      connection.query(academicRecord, function(err, recordRows) {
        if (recordRows === undefined) {
          res.render('profile', {student: rows[0], record: []});
        } else {
          res.render('profile', { student: rows[0], record: recordRows});
        }
      });
    });
  });

  app.post('/students/:id/profile', ensureLog, function(req, res) {
    res.redirect('/students/' + req.params.id +'/profile');
    var stmt = 'INSERT INTO semester_record(student_id, number_as, number_bs, number_cs, number_ds, semester_number, grade, semester_gpa, semester_credits) VALUES (?,?,?,?,?,?,?,?,?);';
    var gpa = ((parseInt(req.body.number_as) * 4) + (parseInt(req.body.number_bs) * 3) + (parseInt(req.body.number_cs) * 2)) / (parseInt(req.body.number_as) + parseInt(req.body.number_bs) + parseInt(req.body.number_cs) + parseInt(req.body.number_ds));
    console.log(req.body);
    connection.query(stmt, [req.params.id, req.body.number_as, req.body.number_bs, req.body.number_cs, req.body.number_ds, req.body.semester_number, req.body.grade, gpa, req.body.semester_credits], function(err, rows) {
     // if (err) {dialog.err('Sorry, an error occured while trying to add the semester record. Please make sure you fill out all the fields.', 'Failed to add semester record');}
      console.log(err)
    });
  });


  app.get('/addStudent',ensureLog, function(req, res) {
    connection.query("SELECT cohort.cohort_id, cohort.cohort_year, school.school_name FROM cohort INNER JOIN school ON cohort.school_id=school.school_id;", function(err, rows) {
      console.log(err);
      res.render('addStudent', {cohorts: rows});
    });
  });

  app.post('/addStudent',ensureLog, function(req, res) {
    res.redirect('/students');
    stmt = 'INSERT INTO student(student_gender, cohort_id,student_first_name,student_last_name,student_phone,student_dob,student_start_date,student_email,guardian_one_name,guardian_one_phone,guardian_one_email,guardian_two_name,guardian_two_phone,guardian_two_email,middleschool_suspensions,highschool_absences,highschool_suspensions) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    connection.query(stmt,[req.body.gender,req.body.cohort,req.body.student_first_name,req.body.student_last_name,req.body.student_phone,new Date(req.body.student_dob),Date.now(),req.body.student_email,req.body.parentone_name,req.body.parentone_num,req.body.parentone_email,req.body.parenttwo_name,req.body.parenttwo_num,req.body.parenttwo_email,req.body.mssuspensions,req.body.hssuspensions,req.body.hsabsences], function(err, rows){ 
      console.log(err);
      if (err) { dialog.err('Sorry, an error occured while trying to add the student. Please make sure you fill out all required fields indicated by the *.', 'Failed to Add Student'); }
    });
  });

app.get('/students/:id/delete',ensureLog, function(req, res) {
  connection.query("DELETE FROM semester_record WHERE student_id=" + req.params.id, function(err, rows) {
    connection.query("DELETE FROM student WHERE student_id=" + req.params.id, function(err, rows) {
      console.log(err);
      res.redirect('/students');
    });
  });
  
});

app.get('/students/:id/edit', ensureLog, function(req, res) {
  var query = "SELECT * FROM student WHERE student_id=" + req.params.id;
  var query2 = "SELECT cohort.cohort_id, cohort.cohort_year, school.school_name from cohort INNER JOIN school on school.school_id=cohort.school_id;"
  connection.query(query, function(err, rows) {
    if (err) {console.log(err);}
    connection.query(query2, function(err2, rows2) {
      if (err2) {console.log(err2);}
      res.render('editStudent', {
        student: rows[0],
        cohorts: rows2});
    });
    
  });
});

app.post('/students/:id/edit', ensureLog, function(req, res) {
  var query = "UPDATE student SET   student_first_name = ?, student_last_name = ?, student_dob = ?, student_gender = ?, student_phone = ?, student_email = ?, guardian_one_name = ?, guardian_one_email = ?, guardian_one_phone = ?, guardian_two_name = ?, guardian_two_email = ?, guardian_two_phone = ?, middleschool_suspensions = ?, highschool_absences = ?, highschool_suspensions = ?, cumulative_gpa = ?, total_credits_earned = ?, date_modified = ?, user_modified = ? WHERE student_id = ?;"
  connection.query(query, [req.body.student_first_name,req.body.student_last_name,req.body.student_dob,req.body.gender,req.body.student_phone,req.body.student_email,req.body.guardian_one_name,req.body.guardian_one_email,req.body.guardian_one_phone,req.body.guardian_two_name,req.body.guardian_two_email,req.body.guardian_two_phone,req.body.middleschool_suspensions,req.body.highschool_absence,req.body.highschool_suspensions,req.body.cumulative_gpa,req.body.total_credits_earned,Date.now(),req.body.user_modified, req.params.id], function(err, rows) {
    console.log(err);
    res.redirect('/students/' + req.params.id + '/profile'); 
  });
});

//School routes
app.get('/schools',ensureLog, function(req, res) {
  connection.query("SELECT * FROM school", function(err, rows){
    console.log(err);
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
      console.log(err);
      if (err) { dialog.err('Sorry, an error occured while trying to add the school. Please make sure you fill out all required fields indicated by the *.', 'Failed to Add School'); }
    });
});

app.get('/schools/:id/delete',ensureLog, function(req, res) {
  connection.query("DELETE FROM school WHERE school_id=" + req.params.id, function(err, rows) {
    console.log(err);
    if (err) { dialog.err('Sorry, an error occured. Make sure the school you are trying to delete has no cohorts associted with it.', 'Failed to Delete School'); }

    res.redirect('/schools');
  });
});

app.get('/schools/:id/profile',ensureLog, function(req, res) {
  var query1 = "SELECT * FROM school WHERE school_id=" + req.params.id;
  var query2 = "SELECT * FROM cohort WHERE cohort.school_id=" + req.params.id;
  var query3 = "SELECT * FROM student INNER JOIN cohort ON student.cohort_id=cohort.cohort_id WHERE cohort.school_id=" + req.params.id;
  connection.query(query1, function(err, rows1) {
    console.log(err);
    connection.query(query2, function(err, rows2) {
      console.log(err);
      connection.query(query3, function(err, rows3) {
        console.log(err);
        res.render('schoolDetail', {
          school: rows1[0],
          cohorts: rows2,
          students: rows3
        });
      });
    });
  });
    
});

app.get('/schools/:id/edit',ensureLog, function(req, res) {
  var query = "SELECT * FROM school WHERE school_id=" + req.params.id;
  connection.query(query, function(err, rows) {
    console.log(err);
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
    console.log(err);
    res.render('addCohort', {schools: rows});
  });
});

app.post('/addCohort',ensureLog, function(req, res) {
  var query = "INSERT INTO cohort(school_id, cohort_year) VALUES (?,?);";
  connection.query(query, [req.body.school_id, req.body.cohort_year], function(err, rows) {
    console.log(err);
    res.redirect('/schools/' + req.body.school_id + '/profile');
  });
});




app.get('/cohorts/:id/edit', ensureLog, function(req, res) {

});

app.get('/cohorts/:id/delete', ensureLog, function(req, res) {
  connection.query("DELETE FROM cohort WHERE cohort_id=" + req.params.id, function(err, rows) {
    console.log(err);
    if (err) { dialog.err('Sorry, an error occured. Make sure the cohort you are trying to delete has no students associted with it.', 'Failed to Delete Cohort'); }

    res.redirect('/schools');
  });
});

app.get('/alumni',ensureLog, function(req, res) {
    connection.query("SELECT student.student_id, student.student_first_name, student.student_phone, student.student_last_name, school.school_name, cohort.cohort_year, student.guardian_one_name, student.guardian_one_phone FROM student INNER JOIN cohort ON student.cohort_id=cohort.cohort_id INNER JOIN school ON cohort.school_id=school.school_id;", function(err, rows){
      console.log(err);
      res.render('alumni', { students: rows});
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
  