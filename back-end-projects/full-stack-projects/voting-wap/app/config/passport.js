'use strict';

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
    
    // Github login
    
	passport.use(new GitHubStrategy({
		clientID     : configAuth.githubAuth.clientID,
		clientSecret : configAuth.githubAuth.clientSecret,
		callbackURL  : configAuth.githubAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'github.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, user);
				} else {
					var newUser                = new User();
					newUser.github.id          = profile.id;
					newUser.github.username    = profile.username;
					newUser.name               = profile.displayName;
					newUser.github.publicRepos = profile._json.public_repos;
					newUser.dp                 = profile._json.avatar_url || "/public/img/user.png";
                    newUser.pollsCount         = 0;
                    newUser.pollsVotedCount    = 0;
					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));
	
	// Twitter login
	
	passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.clientID,
        consumerSecret  : configAuth.twitterAuth.clientSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL

    },
    function(token, tokenSecret, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);
                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();
                    // set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = token;
                    newUser.twitter.username    = profile.username;
                    newUser.name                = profile.displayName;
                    newUser.dp                  = profile.photos[0].value || "/public/img/user.png";
                    newUser.pollsCount          = 0;
                    newUser.pollsVotedCount     = 0;
                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });

    });

    }));
    
    // Facebook login
    
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);
                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser              = new User();
                    // set all of the facebook information in our user model
                    newUser.facebook.id      = profile.id; // set the users facebook id                   
                    newUser.facebook.token   = token; // we will save the token that facebook provides to the user                    
                    newUser.name             = profile.displayName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email   = (profile.emails && profile.emails[0].value) || "Email not added"; // facebook can return multiple emails so we'll take the first
                    newUser.dp               = profile.image || "/public/img/user.png";
                    newUser.pollsCount       = 0;
                    newUser.pollsVotedCount  = 0;
                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
    
    // Google login
    
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            
            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id       = profile.id;
                    newUser.google.token    = token;
                    newUser.name            = profile.displayName;
                    newUser.google.email    = profile.emails[0].value; // pull the first email
                    newUser.dp              = profile.photos[0].value || "/public/img/user.png";
                    newUser.pollsCount      = 0;
                    newUser.pollsVotedCount = 0;
                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));

};
