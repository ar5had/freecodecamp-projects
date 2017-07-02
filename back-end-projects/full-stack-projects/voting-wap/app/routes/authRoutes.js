module.exports = function(app, passport) {

    app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			failureRedirect: '/login'
		}),
        function(req, res) {
        	res.redirect(req.session.returnTo || "/");
        	delete req.session.returnTo;
          req.session.save();
        });

	// route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect : '/login'
        }),
        function(req, res) {
        	res.redirect(req.session.returnTo || "/");
        	delete req.session.returnTo;
          req.session.save();
        });

    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            failureRedirect : '/login'
        }),
        function(req, res) {
        	res.redirect(req.session.returnTo || "/");
        	delete req.session.returnTo;
          req.session.save();
        });

	// route for google authentication and login
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    failureRedirect : '/login'
            }),
            function(req, res) {
            	res.redirect(req.session.returnTo || "/");
            	delete req.session.returnTo;
              req.session.save();
            });

};
