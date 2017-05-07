var express       = require('express'),
    authenticate  = require('connect-ensure-login').ensureLoggedIn(),
    router        = express.Router(),
    mysql         = require('mysql'),
    dbconfig      = {host: process.env.DATABASE_HOST, user: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD, database: process.env.DATABASE},
    connection    = mysql.createConnection(dbconfig);  

connection.query('USE ' + process.env.DATABASE);

//Deafult route to schools page
router.route('/')
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res, next) {
    connection.query("SELECT * FROM school", function(err, rows){
      if (err) {console.log(err)}
      res.render('schools', { schools: rows, user: req.user._json.user_metadata});
    });
  });

//Delete school route
router.route('/:id/delete')
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res, next) {
    connection.query("DELETE FROM school WHERE school_id=" + req.params.id, function(err, rows) {
    if (err) {console.log(err)}
    res.redirect('/schools');
    });
  });


//Get school profile route
router.route('/:id/profile')
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res, next) {
    var query1 = "SELECT * FROM school WHERE school_id=" + req.params.id;
    var query2 = "SELECT * FROM cohort WHERE cohort.school_id=" + req.params.id;
    var query3 = "SELECT * FROM student INNER JOIN cohort ON student.cohort_id=cohort.cohort_id WHERE cohort.school_id=" + req.params.id;
    connection.query(query1, function(err, rows1) {
      if (err) {console.log(err)}
      connection.query(query2, function(err2, rows2) {
        if (err2) {console.log(err2)}
        connection.query(query3, function(err3, rows3) {
          if (err3) {console.log(err3)}
          res.render('schoolDetail', {
            school: rows1[0],
            cohorts: rows2,
            students: rows3,
            user: req.user._json.user_metadata
          });
        });
      });
    });
  });


//Edit School Profile Route
router.route('/:id/edit')
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res, next) {
    var query = "SELECT * FROM school WHERE school_id=" + req.params.id;
    connection.query(query, function(err, rows) {
      if (err) {console.log(err)}
      res.render('editSchool', {school: rows[0], user: req.user._json.user_metadata});
    })
  })
  .post(function(req, res, next) {
    var query = "UPDATE school SET school_name = ?, school_address = ?, school_phone = ?, principal_name = ?, principal_phone = ?, principal_email = ?, assistant_principal_name = ?, assistant_principal_phone = ?, assistant_principal_email = ?, cohort_coach_name = ?, cohort_coach_phone = ?, cohort_coach_email = ?, ngm_fellow_name = ?, ngm_fellow_phone = ?, ngm_fellow_email = ?, counselor_name = ?, counselor_phone = ?, counselor_email = ?, social_worker_name = ?, social_worker_phone = ?, social_worker_email = ?, data_liason_name = ?, data_liason_phone = ?, data_liason_email = ?, cis_coordinator_name = ?, cis_coordinator_phone = ?, cis_coordinator_email = ?, college_coach_name = ?, college_coach_phone = ?, college_coach_email = ? WHERE school_id = " + req.params.id;
    connection.query(query, [req.body.school_name,req.body.school_address,req.body.school_phone,req.body.principal_name,req.body.principal_phone,req.body.principal_email,req.body.assistant_principal_name,req.body.assistant_principal_phone,req.body.assistant_principal_email,req.body.cohort_coach_name,req.body.cohort_coach_phone,req.body.cohort_coach_email,req.body.ngm_fellow_name,req.body.ngm_fellow_phone,req.body.ngm_fellow_email,req.body.counselor_name,req.body.counselor_phone,req.body.counselor_email,req.body.social_worker_name,req.body.social_worker_phone,req.body.social_worker_email,req.body.data_liason_name,req.body.data_liason_phone,req.body.data_liason_email,req.body.cis_coordinator_name,req.body.cis_coordinator_phone,req.body.cis_coordinator_email,req.body.college_coach_name,req.body.college_coach_phone,req.body.college_coach_email], function(err, rows) {
      if (err) {console.log(err)}
      res.redirect('/schools/' + req.params.id + '/profile');
    });
  })




module.exports = router;