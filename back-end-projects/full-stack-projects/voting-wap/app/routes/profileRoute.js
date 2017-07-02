'use strict';
var Users       = require('../models/users.js');
var Polls       = require('../models/polls.js');

var removeProfile = function (req, res) {
		console.log(req.userID);
		Users
			 .findOneAndRemove({ '_id': req.userID }, function(err, doc) {
			 	if (err) {
			 		console.error('Error occured while removing profile', err);
        			res.status(500).send({ error: "Error occured while removing profile"});
			 	} else {
					console.log("Deleting profile:", doc);
					Polls.remove({ 'authorId': req.userID }, function(err, polls) {
						if (err) {
					  		console.error('Error occured while removing all the polls of user', err);
        					res.status(500).send({ error: "Error occured while removing all the polls or user"});
						} else {
							res.status(200).send();
							delete req.userID;
						}
					});
				}
		 	 });
	};

module.exports = function (app, isLoggedIn, clickHandler) {
 
    app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/profile", {
				pageTitle : "Profile",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || "",
				pollsCreated: req.user.pollsCount, 
				pollsVoted: req.user.pollsVotedCount,
				img: req.user.dp,
				page: "profilePage"
			});
		})
		.delete(isLoggedIn, function (req, res, next) {
			req.userID = req.user._id;
			req.logout();
			next();
		}, removeProfile);
};