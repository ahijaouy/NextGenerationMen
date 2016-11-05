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
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
    }
	res.redirect('/');
}
