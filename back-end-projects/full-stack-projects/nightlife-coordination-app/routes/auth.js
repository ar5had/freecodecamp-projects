module.exports = function(app, passport) {
   
    // route for twitter authentication and login    
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            failureRedirect : '/'
        }), 
        function(req, res) {
        	res.redirect( /*(req.session.returnTo + "&redirect=logIn")*/ req.session.returnTo || "/");
        	delete req.session.returnTo;
        	req.session.save();
        });

};