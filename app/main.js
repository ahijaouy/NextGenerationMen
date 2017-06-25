module.exports = function(express, passport) {

  var student_routes        = require('./student_routes'),
      school_routes         = require('./school_routes'),
      survey_routes         = require('./survey_routes'),
      create_routes         = require('./create_routes.js'),
      auth0_helpers         = require('./helpers/Auth0_Helpers.js'),
      connection            = require('../config/database.js').connection,
      router                = express.Router();

//Login Route
   router.get('/login', function(req, res){
    res.render('login', {
      layout: false,
      domain: process.env.AUTH0_DOMAIN,
      client: process.env.AUTH0_CLIENT,
      callback: process.env.AUTH0_CALLBACK });
  });

//Callback route for Auth0
  router.get('/callback',
    passport.authenticate('auth0', { 
      failureRedirect: '/login',
      successRedirect: '/index',
    }));

//-------------------LOGIN WALL------------------------------
  router.use(function(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  })

//Use the subroutes defined in different files
  router.use('/students', student_routes(express, connection));
  router.use('/schools', school_routes(express, connection));
  router.use('/surveys', survey_routes(express, connection));
  router.use('/new', create_routes(express, connection));
  
//Default Route to Index
  router.get('/', function(req, res) {
      res.redirect('/index');
  });

//Logout Route
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });
  
//Index route
  router.get('/index', function(req, res) {

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





//Cohort Routes?
  router.get('/cohorts/:id/delete',  function(req, res) {
    connection.query("DELETE FROM cohort WHERE cohort_id=" + req.params.id, function(err, rows) {
      if(err) {console.log(err);}
      if (err) { dialog.err('Sorry, an error occured. Make sure the cohort you are trying to delete has no students associted with it.', 'Failed to Delete Cohort'); }

      res.redirect('/schools');
    });
  });



//Edit User Profile Routes
  router.route('/editProfile')
    .get(function(req, res) {
      res.render('editUserProfile', {user: req.user._json.user_metadata});
    })
    .post(function(req, res) {
      var body = {"email":req.body.email, "user_metadata": {"name": req.body.name }};
      
      auth0_helpers.call("PATCH", "users/" + req.user.id, body, function(response) {
        res.redirect('logout');
      });
    })

  router.get('/resetPassword',  function(req, res) {
    auth0_helpers.resetPassword(process.env.AUTH0_CLIENT_ID, req.user._json.email);
    res.redirect('/index');
  });



  return router;
};
  