'use strict';

var Users       = require('../models/users.js');
var Polls       = require('../models/polls.js');
var randomColor = require("randomcolor");
var encrypt   = require("../utilities/encrypt.js");

var addPoll = function (req, res, next) {
	var question = req.body.question,
		options  = req.body.options;
	
	// removing trailing whitespaces in options
	options = options.split(",");
	options = options.map(function(option) {
		return option.replace(/^\s+|\s+$/g, "");
	});
	
	req.secret                 = encrypt(new Date().getTime());
	
	var poll                   = new Polls();
	poll.question              = question;
	poll.options               = options;
	poll.createdAt             = new Date().toDateString().slice(4);
	poll.views                 = 0;
	poll.votes                 = options.map(function(elem) {return 0;});
	poll.colors                = randomColor({luminosity: 'light',count: options.length});
    poll.authorId              = req.user._id;
    poll.author                = req.user.name;
    poll.secret                = req.secret;
    poll.viewedIp              = [];
    poll.votedIp               = [];
	poll.save(function (err) {
		if (err) {
			console.error('Some error happened while Adding poll to polls collection');
			res.status(500).send({ 'error': 'Some error happened while Adding poll to polls collection' });
		}
		
		Users
			.findByIdAndUpdate(req.user._id, {$inc : {pollsCount : 1}})
			.exec(function (err, user) {
					if (err) { 
						console.error('Some error happened while Adding question to user\'s account');
						res.status(500).send({ 'error': 'Some error happened while Adding question to user\'s account' });
					} 
					else {
						console.log('Poll count increased and poll successfully added to polls collection!');
						next();
					}
			});
		
	});
};

module.exports = function (app, isLoggedIn) {

    app.route('/create-poll')
		.get(isLoggedIn, function (req, res) {
			res.render("./pages/createPoll", {
				pageTitle : "Create new poll",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || ""
			});
		})
		.post(isLoggedIn, addPoll, function(req, res) {
			res.redirect("/polls/" + req.secret);
			delete req.redirect;
		});
};