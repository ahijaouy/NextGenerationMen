var express       = require('express'),
    authenticate  = require('connect-ensure-login').ensureLoggedIn(),
    router        = express.Router(),
    mysql         = require('mysql'),
    dbconfig      = {host: process.env.DATABASE_HOST, user: process.env.DATABASE_USER, password: process.env.DATABASE_PASSWORD, database: process.env.DATABASE},
    connection    = mysql.createConnection(dbconfig);  

connection.query('USE ' + process.env.DATABASE);


//Default Route to students page
router.route('/')
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res, next) {
    connection.query("SELECT student.student_id, student.student_first_name, student.student_phone, student.student_last_name, school.school_name, cohort.cohort_year, student.guardian_one_name, student.guardian_one_phone FROM student INNER JOIN cohort ON student.cohort_id=cohort.cohort_id INNER JOIN school ON cohort.school_id=school.school_id;", function(err, rows){
      console.log(err);
      res.render('students', { students: rows});
    });
  });

//Get Student Profile & Post Semester Record
router.route('/:id/profile')
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res, next) {
    var query = "SELECT * FROM student INNER JOIN cohort on student.cohort_id=cohort.cohort_id INNER JOIN school on cohort.school_id=school.school_id WHERE student_id=" + req.params.id + ";";
    connection.query(query, function(err, rows) {
      if (err) {console.log(err)}
      rows[0].student_dob = rows[0].student_dob.toDateString(); //properly set date.
      
      var academicRecord = "SELECT * FROM semester_record WHERE student_id=" + req.params.id + ";";
      connection.query(academicRecord, function(err, recordRows) {
        if (recordRows === undefined) {
          res.render('profile', {student: rows[0], record: []});
        } else {
          res.render('profile', { student: rows[0], record: recordRows});
        }
      });
    });
  })
  .post(function (req, res, next) {
    res.redirect('/students/' + req.params.id +'/profile');
    var stmt = 'INSERT INTO semester_record(student_id, number_as, number_bs, number_cs, number_ds, semester_number, grade, semester_gpa, semester_credits) VALUES (?,?,?,?,?,?,?,?,?);';
    var gpa = ((parseInt(req.body.number_as) * 4) + (parseInt(req.body.number_bs) * 3) + (parseInt(req.body.number_cs) * 2)) / (parseInt(req.body.number_as) + parseInt(req.body.number_bs) + parseInt(req.body.number_cs) + parseInt(req.body.number_ds));
    console.log(req.body);
    connection.query(stmt, [req.params.id, req.body.number_as, req.body.number_bs, req.body.number_cs, req.body.number_ds, req.body.semester_number, req.body.grade, gpa, req.body.semester_credits], function(err, rows) {
      if (err) {console.log(err)}
    });
  });

//Delete Student Records
router.route('/:id/delete')
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res, next) {
    connection.query("DELETE FROM semester_record WHERE student_id=" + req.params.id, function(err, rows) {
      if (err) {console.log(err)}
    connection.query("DELETE FROM student WHERE student_id=" + req.params.id, function(err2, rows) {
      if (err2) {console.log(err2)}
      res.redirect('/students');
    });
  });
});

//Get and Post Edit Students
router.route('/:id/edit')
  .all(authenticate, function (req, res, next) {next();})
  .get(function(req, res, next) {
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
  })
  .post(function(req, res, next) {
    var query = "UPDATE student SET   student_first_name = ?, student_last_name = ?, student_dob = ?, student_gender = ?, student_phone = ?, student_email = ?, guardian_one_name = ?, guardian_one_email = ?, guardian_one_phone = ?, guardian_two_name = ?, guardian_two_email = ?, guardian_two_phone = ?, middleschool_suspensions = ?, highschool_absences = ?, highschool_suspensions = ?, cumulative_gpa = ?, total_credits_earned = ?, date_modified = ?, user_modified = ? WHERE student_id = ?;"
    connection.query(query, [req.body.student_first_name,req.body.student_last_name,req.body.student_dob,req.body.gender,req.body.student_phone,req.body.student_email,req.body.guardian_one_name,req.body.guardian_one_email,req.body.guardian_one_phone,req.body.guardian_two_name,req.body.guardian_two_email,req.body.guardian_two_phone,req.body.middleschool_suspensions,req.body.highschool_absence,req.body.highschool_suspensions,req.body.cumulative_gpa,req.body.total_credits_earned,Date.now(),req.body.user_modified, req.params.id], function(err, rows) {
      if (err) {console.log(err);}
      res.redirect('/students/' + req.params.id + '/profile'); 
    });
  });


module.exports = router;