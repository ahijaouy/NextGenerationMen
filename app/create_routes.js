module.exports = function(express, connection) {
  var router = express.Router();



//-> New Students
  router.route('/student')
    .get(function(req, res) {
      connection.query("SELECT cohort.cohort_id, cohort.cohort_year, school.school_name FROM cohort INNER JOIN school ON cohort.school_id=school.school_id;", function(err, rows) {
        if(err) {console.log(err);}
        res.render('addStudent', {cohorts: rows, user: req.user._json.user_metadata});
      });
    })
    .post(function(req, res) {
      if (req.body.student_start_date === undefined) {req.body.student_start_date = new Date(Date.now());}
      var stmt = 'INSERT INTO student(student_gender, cohort_id,student_first_name,student_last_name,student_phone,student_dob,student_start_date,student_email,guardian_one_name,guardian_one_phone,guardian_one_email,guardian_two_name,guardian_two_phone,guardian_two_email, date_modified, user_modified) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
      connection.query(stmt,[req.body.gender,req.body.cohort,req.body.student_first_name,req.body.student_last_name,req.body.student_phone,req.body.student_dob,req.body.student_start_date,req.body.student_email,req.body.parentone_name,req.body.parentone_num,req.body.parentone_email,req.body.parenttwo_name,req.body.parenttwo_num,req.body.parenttwo_email, new Date(Date.now()), req.user._json.user_metadata.name], function(err, rows){ 
        if(err) {console.log(err);}
        res.redirect('/students');
      });
    })

//-> New Schools
  router.route('/school')
    .get(function(req, res) {
      res.render('addSchool', {user: req.user._json.user_metadata});
    })
    .post(function(req, res) {
      var stmt = 'INSERT INTO school(school_name,school_address,school_phone,principal_name,principal_phone,principal_email,assistant_principal_name,assistant_principal_phone,assistant_principal_email,cohort_coach_name,cohort_coach_phone,cohort_coach_email,ngm_fellow_name,ngm_fellow_phone,ngm_fellow_email,counselor_name,counselor_phone,counselor_email,social_worker_name,social_worker_phone,social_worker_email,data_liason_name,data_liason_phone,data_liason_email,cis_coordinator_name,cis_coordinator_phone,cis_coordinator_email,college_coach_name,college_coach_phone,college_coach_email, date_modified, user_modified) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
      connection.query(stmt,[req.body.school_name,req.body.school_address,req.body.school_phone,req.body.principal_name,req.body.principal_phone,req.body.principal_email,req.body.assistant_principal_name,req.body.assistant_principal_phone,req.body.assistant_principal_email,req.body.cohort_coach_name,req.body.cohort_coach_phone,req.body.cohort_coach_email,req.body.ngm_fellow_name,req.body.ngm_fellow_phone,req.body.ngm_fellow_email,req.body.counselor_name,req.body.counselor_phone,req.body.counselor_email,req.body.social_worker_name,req.body.social_worker_phone,req.body.social_worker_email,req.body.data_liason_name,req.body.data_liason_phone,req.body.data_liason_email,req.body.cis_coordinator_name,req.body.cis_coordinator_phone,req.body.cis_coordinator_email,req.body.college_coach_name,req.body.college_coach_phone,req.body.college_coach_email, new Date(Date.now()), req.user._json.user_metadata.name], function(err, rows) {
        if(err) {console.log(err);}
        res.redirect('/schools');
      });
    })

//-> New Cohorts
  router.route('/cohort')
    .get(function(req, res) {
      connection.query("SELECT school_id, school_name from school", function(err, rows) {
        if(err) {console.log(err);}
        res.render('addCohort', {schools: rows, user: req.user._json.user_metadata});
      });
    })
    .post(function(req, res) {
      var query = "INSERT INTO cohort(school_id, cohort_year, date_modified, user_modified) VALUES (?,?,?,?);";
      connection.query(query, [req.body.school_id, req.body.cohort_year, new Date(Date.now()), req.user._json.user_metadata.name], function(err, rows) {
        if(err) {console.log(err);}
        res.redirect('/schools/' + req.body.school_id + '/profile');
      });
    })


  return router;
};