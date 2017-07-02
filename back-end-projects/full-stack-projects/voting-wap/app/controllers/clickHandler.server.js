'use strict';

var Users       = require('../models/users.js');
var Polls       = require('../models/polls.js');


function ClickHandler () {

	// this.getClicks = function (req, res) {
	// 	Users
	// 		.findOne({ 'github.id': req.user.github.id }, { '_id': false })
	// 		.exec(function (err, result) {
	// 			if (err) { throw err; }

	// 			res.json(result.nbrClicks);
	// 		});
	// };

	// this.addClick = function (req, res) {
	// 	Users
	// 		.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
	// 		.exec(function (err, result) {
	// 				if (err) { throw err; }

	// 				res.json(result.nbrClicks);
	// 			}
	// 		);
	// };

	// this.resetClicks = function (req, res) {
	// 	Users
	// 		.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
	// 		.exec(function (err, result) {
	// 				if (err) { throw err; }

	// 				res.json(result.nbrClicks);
	// 			}
	// 		);
	// };
	
	// this.getAllPolls = function (req, res, next) {
	// 	Users
	// 		.find({}, function(err, users) {
	// 			  if (err) {
	// 			  	console.error('Some Error happened while accessing all the polls!', err);
	// 			  	res.status(500).send({ 'error': 'Some Error happened while accessing all the polls!' });
	// 			  } else {
	// 			  	users.forEach(function(user) {
	// 			  		req.allPolls.push(user.polls)	
	// 			  	});
	// 				console.log(users);
	// 			  }
	// 			});
	// };
	
	
}

module.exports = ClickHandler;
