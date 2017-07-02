'use strict';

var Polls       = require('../models/polls.js');
var getAllPolls = function(req, res, next) {
	Polls
		.find({}, 'author votes views createdAt question secret', function(err, polls) {
			if (err) {
			  console.error('Some Error happened while accessing all the polls!', err);
			  res.status(500).send({ 'error': 'Some Error happened while accessing all the polls!' });
			} else {
			  req.allPolls = [];
			  polls.forEach(function(poll) {
			  	req.allPolls.push(poll);
			  });
			  next();
			}
		});
	};

module.exports = function(app) {
    app.route('/')
		.get(getAllPolls, function (req, res) {
			res.render("./pages/index", {
				pageTitle : "Home",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || "",
				polls: req.allPolls
			});
			delete req.allPolls;
		});
};