module.exports = function(app, passport) {
var mysql           = require('mysql'); //MATCH this with package.json
var dbconfig        = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection)
connection.query('USE ' + dbconfig.database);
app.get('/', function (req, res) {
  res.render('index.html', { });
});

// app.get('/login', function(req, res) {
//     res.render('login', { message: req.flash('loginMessage')});
// });
// app.post('/login', passport.authenticate('local-login', {
//     successRedirect : '/dashboard',
//     failureRedirect : '/login',
//     failureFlash : true
// }),
// function(req, res) {
//     if (req.body.remember) {
//           req.session.cookie.maxAge = 1000 * 60 * 20; //20 minutes
//       } else {
//           req.session.cookie.expires = false;
//       }
//     //res.redirect('/');
// });


// app.get('/signup', function(req, res) {
//     res.render('signup', { message: req.flash('signupMessage') });
// });

// app.post('/signup', passport.authenticate('local-signup', {
//     successRedirect : '/dashboard',
//     failureRedirect : '/signup',
//     failureFlash : true
// }));

// app.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

  
app.get('/index.html',  function (req, res) {
    // connection.query("SELECT COUNT(*) AS num FROM Student;", function(err, rows0){
    //     connection.query("SELECT COUNT(*) AS num FROM Staff;", function(err, rows1){
    //         connection.query("SELECT COUNT(*) AS num FROM School;", function(err, rows2){
    //             console.log(rows0 + rows1 + rows2)
    //             res.render('dashboard', { user : req.user.username,
    //               student: rows0,
    //               staff: rows1,
    //               school: rows2});
    //         });
    //     });
    // });
});
app.get('/students', isLoggedIn, function (req, res) {
    connection.query("SELECT * FROM Student", function(err, rows){
        console.log(rows);
        //rows.dob = new Date(rows.dob).toDateString();
        res.render('students', { user : req.user.username,
          data: rows });
    });
});
app.get('/schools', isLoggedIn, function (req, res) {
    connection.query("SELECT * FROM School", function(err, rows){
        console.log(rows);
        res.render('schools', { user : req.user.username,
          data: rows });
    });
});
app.get('/myprofile', isLoggedIn, function (req, res) {
  res.render('myprofile', { user : req.user.username,
    title: 'Hey',
    message: 'Hello there!'});
});
app.get('/staff', isLoggedIn, function (req, res) {
    connection.query("SELECT * FROM Staff", function(err, rows){
        console.log(rows);
        res.render('staff', { user : req.user.username,
          data: rows });
    });
});
app.get('/survey', isLoggedIn, function (req, res) {
  res.render('survey', { user : req.user.username,
    title: 'Hey',
    message: 'Hello there!'});
});

app.get('/StudentInfo', isLoggedIn, function (req, res) {
  res.render('StudentInfo', { user : req.user.username,
    title: 'test',
    message: 'Hello there!'});
});
app.post('/addstudent', isLoggedIn, function (req, res) {
    stmt = 'INSERT INTO Student(first_name, last_name,dob,startdate,phonenum,email,parentone_name,parentone_num,parentone_email,parenttwo_name,parenttwo_num,parenttwo_email) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);';
    connection.query(stmt,[req.body.fname, req.body.lname, new Date(req.body.dob), new Date(req.body.ngmdate), req.body.num , req.body.email, req.body.p1name, req.body.p1num, req.body.p1email,req.body.p2name, req.body.p2num, req.body.p2email], function(err, rows){
        console.log(err);


      res.redirect('/students');
    });
      //console.log(req);

  });

app.post('/addstaff', isLoggedIn, function (req, res) {
    stmt = 'INSERT INTO Staff(first_name, last_name,phone, email) VALUES (?,?,?,?);';
    connection.query(stmt,[req.body.fname, req.body.lname, req.body.num, req.body.email], function(err, rows){
        console.log(err);


      res.redirect('/staff');
    });
      //console.log(req);

  });


app.post('/addschool', isLoggedIn, function (req, res) {
    stmt = 'INSERT INTO School(school_name, school_address,school_phone) VALUES (?,?,?);';
    connection.query(stmt,[req.body.name, req.body.address, req.body.num], function(err, rows){
        console.log(err);


      res.redirect('/schools');
    });
      //console.log(req);

  });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
     res.redirect('/login');
 }
}
