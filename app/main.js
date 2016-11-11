module.exports = function(app, passport) {

    app.get('/', function (req, res) {
      res.render('index', { });
    });

    app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage')});
});
app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard',
        failureRedirect : '/login',
        failureFlash : true
    }),
    function(req, res) {
        if (req.body.remember) {
          req.session.cookie.maxAge = 1000 * 60 * 20; //20 minutes
        } else {
          req.session.cookie.expires = false;
        }
    //res.redirect('/');
});


app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
});

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/dashboard',
    failureRedirect : '/signup',
    failureFlash : true
}));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


    app.get('/students', isLoggedIn, function (req, res) {
      res.render('students', { user : req.user.username,
                                title: 'Hey',
                                message: 'Hello there!'});
    });
    app.get('/schools', isLoggedIn, function (req, res) {
      res.render('schools', { user : req.user.username,
                                title: 'Hey',
                                message: 'Hello there!'});
    });
    app.get('/myprofile', isLoggedIn, function (req, res) {
      res.render('myprofile', { user : req.user.username,
                                title: 'Hey',
                                message: 'Hello there!'});
    });
    app.get('/staff', isLoggedIn, function (req, res) {
      res.render('staff', { user : req.user.username,
                                title: 'Hey',
                                message: 'Hello there!'});
    });
    app.get('/survey', isLoggedIn, function (req, res) {
      res.render('survey', { user : req.user.username,
                                title: 'Hey',
                                message: 'Hello there!'});
    });

    app.get('/StudentInfo', isLoggedIn, function (req, res) {
      res.render('StudentInfo', { user : req.user.username,
                                title: 'Hey',
                                message: 'Hello there!'});
    });
    app.get('/dashboard', isLoggedIn, function (req, res) {
      res.render('dashboard', { user : req.user.username,
                                title: 'Hey',
                                message: 'Hello there!'});
    });
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
    } else {
	       res.redirect('/login');
     }
}
