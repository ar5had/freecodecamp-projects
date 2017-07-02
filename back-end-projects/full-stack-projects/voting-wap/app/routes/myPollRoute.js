'use strict';

var Polls      = require('../models/polls.js');
var getMyPolls = function(req, res, next) {
	Polls
		.find({'authorId': req.user._id}, 'author votes views createdAt question secret', function(err, polls) {
			if (err) {
			  console.error('Some Error happened while accessing all the polls!', err);
			  res.status(500).send({ 'error': 'Some Error happened while accessing all the polls!' });
			} else {
			  req.myPolls = [];
			  polls.forEach(function(poll) {
			  	req.myPolls.push(poll);
			  });
			  next();
			}
		});
	};

module.exports = function(app, isLoggedIn, clickHandler) {
    app.route('/my-polls')
		.get(isLoggedIn, getMyPolls, function (req, res) {
			res.render("./pages/myPolls", {
				pageTitle : "My Polls",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || "",
				polls: req.myPolls
			});
			delete req.myPolls;
		});
};