
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

app.post('/students/:id/edit', ensureLog, function(req, res) {
  var query = "UPDATE student SET   student_first_name = ?, student_last_name = ?, student_dob = ?, student_gender = ?, student_phone = ?, student_email = ?, guardian_one_name = ?, guardian_one_email = ?, guardian_one_phone = ?, guardian_two_name = ?, guardian_two_email = ?, guardian_two_phone = ?, middleschool_suspensions = ?, highschool_absences = ?, highschool_suspensions = ?, cumulative_gpa = ?, total_credits_earned = ?, date_modified = ?, user_modified = ? WHERE student_id = ?;"
  connection.query(query, [req.body.student_first_name,req.body.student_last_name,req.body.student_dob,req.body.gender,req.body.student_phone,req.body.student_email,req.body.guardian_one_name,req.body.guardian_one_email,req.body.guardian_one_phone,req.body.guardian_two_name,req.body.guardian_two_email,req.body.guardian_two_phone,req.body.middleschool_suspensions,req.body.highschool_absence,req.body.highschool_suspensions,req.body.cumulative_gpa,req.body.total_credits_earned,req.body.date_modified,req.body.user_modified, req.params.id], function(err, rows) {
    console.log(err);
    res.redirect('/students/' + req.params.id + '/profile'); 
  });
});

// app.get('/cohorts/:id/edit', ensureLog, function(req, res) {

app.get('/cohorts/:id/edit', ensureLog, function(req, res) {

app.get('/cohorts/:id/delete', ensureLog, function(req, res) {
  connection.query("DELETE FROM cohort WHERE cohort_id=" + req.params.id, function(err, rows) {
    console.log(err);
    if (err) { dialog.err('Sorry, an error occured. Make sure the cohort you are trying to delete has no students associted with it.', 'Failed to Delete Cohort'); }

    res.redirect('/schools');
  });
});

//Alumni Routes
// app.get('/alumni', ensureLog, function(req, res) {
//   res.render('alumni');
// });

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

    stmt = 'INSERT INTO student(student_gender,cohort_id,student_first_name,student_last_name,student_phone,student_dob,student_start_date,student_email,guardian_one_name,guardian_one_phone,guardian_one_email,guardian_two_name,guardian_two_phone,guardian_two_email,middleschool_suspensions,highschool_absences,highschool_suspensions) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    connection.query(stmt,[req.body.gender,req.body.cohort,req.body.student_first_name,req.body.student_last_name,req.body.student_phone,new Date(req.body.student_dob),Date.now(),req.body.student_email,req.body.parentone_name,req.body.parentone_num,req.body.parentone_email,req.body.parenttwo_name,req.body.parenttwo_num,req.body.parenttwo_email,req.body.mssuspensions,req.body.hssuspensions,req.body.hsabsences], function(err, rows){ 
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

app.post('/students/:id/edit', ensureLog, function(req, res) {
  var query = "UPDATE student SET   student_first_name = ?, student_last_name = ?, student_dob = ?, student_gender = ?, student_phone = ?, student_email = ?, guardian_one_name = ?, guardian_one_email = ?, guardian_one_phone = ?, guardian_two_name = ?, guardian_two_email = ?, guardian_two_phone = ?, middleschool_suspensions = ?, highschool_absences = ?, highschool_suspensions = ?, cumulative_gpa = ?, total_credits_earned = ?, date_modified = ?, user_modified = ? WHERE student_id = ?;"
  connection.query(query, [req.body.student_first_name,req.body.student_last_name,req.body.student_dob,req.body.gender,req.body.student_phone,req.body.student_email,req.body.guardian_one_name,req.body.guardian_one_email,req.body.guardian_one_phone,req.body.guardian_two_name,req.body.guardian_two_email,req.body.guardian_two_phone,req.body.middleschool_suspensions,req.body.highschool_absence,req.body.highschool_suspensions,req.body.cumulative_gpa,req.body.total_credits_earned,req.body.date_modified,req.body.user_modified, req.params.id], function(err, rows) {
    console.log(err);
    res.redirect('/students/' + req.params.id + '/profile'); 
  });
});

// app.get('/cohorts/:id/edit', ensureLog, function(req, res) {

app.get('/cohorts/:id/edit', ensureLog, function(req, res) {
// });

app.get('/cohorts/:id/delete', ensureLog, function(req, res) {
  connection.query("DELETE FROM cohort WHERE cohort_id=" + req.params.id, function(err, rows) {
    console.log(err);
    if (err) { dialog.err('Sorry, an error occured. Make sure the cohort you are trying to delete has no students associted with it.', 'Failed to Delete Cohort'); }

    res.redirect('/schools');
  });
});

//Alumni Routes
// app.get('/alumni', ensureLog, function(req, res) {
//   res.render('alumni');
// });

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
