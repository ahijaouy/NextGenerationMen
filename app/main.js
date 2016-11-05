module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/login', function(req, res) {
		res.render('login', { message: req.flash('loginMessage'),
	 							title: 'Wowowow'});
	});
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/auth',
            failureRedirect : '/login',
            failureFlash : true
		}),
        function(req, res) {
            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 20; //20 minutes
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });


	app.get('/signup', function(req, res) {
		res.render('signup', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/auth',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	app.get('/auth', isLoggedIn, function(req, res) {
		res.render('auth', {
			user : req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	app.get('/dashboard', function (req, res) {
	  res.render('dashboard', { title: 'Hey',
	                        message: 'Hello there!'});
	});
	app.get('/students', function (req, res) {
	  res.render('students', { title: 'Hey',
	                        message: 'Hello there!'});
	});
	app.get('/schools', function (req, res) {
	  res.render('schools', { title: 'Hey',
	                        message: 'Hello there!'});
	});
	app.get('/myprofile', function (req, res) {
	  res.render('myprofile', { title: 'Hey',
	                        message: 'Hello there!'});
	});
	app.get('/staff', function (req, res) {
	  res.render('staff', { title: 'Hey',
	                        message: 'Hello there!'});
	});
	app.get('/survey', function (req, res) {
	  res.render('survey', { title: 'Hey',
	                        message: 'Hello there!'});
	});

	app.get('/dashboard', function (req, res) {
	  res.render('dashboard', { });
	});
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
    }
	res.redirect('/');
}
