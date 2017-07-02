var Polls = require("../models/polls.js");
var Users = require("../models/users.js");

var getPoll = function(req, res, next) {
	Polls.
		findOne({'secret': req.params.id})
		.exec(function(err, poll) {
			if (err) {
				console.error('Some Error happened while finding the poll that is clicked!', err);
				res.status(500).send({ 'error': 'Some Error happened while finding the poll that is clicked!' });
			}
			else {
				console.log("vwd ips", poll.viewedIp, "this ip", req.ip);
				var ipAddr = req.headers["x-forwarded-for"];
				if (ipAddr){
					var list = ipAddr.split(",");
					ipAddr = list[list.length-1];
				} else {
					ipAddr = req.connection.remoteAddress;
				}

				if (poll.viewedIp.indexOf(ipAddr) === -1 ) {
					poll.views += 1;
					poll.viewedIp.push(ipAddr);
					poll.markModified('views');
					poll.markModified('viewedIp');
					console.log("new view");
				} else {
					console.log("old View");
				}
				console.log("polls.votedIp", poll.votedIp);
				if (poll.votedIp.indexOf(ipAddr) === -1) {
					req.userVoted = false;
					console.log("vote block will show");
				} else {
					req.userVoted = true;
					console.log("votes block will not show");
				}

				poll.save(function(err) {
					if (err) {
						console.error('Some Error happened while updating views of poll!', err);
						res.status(500).send({ 'error': 'Some Error happened while updating views of poll!' });
					} else {
						req.pollRequested = poll;
						next();
					}

				});
			}
		});
};

var addVote = function(req, res, next) {
	console.log("ADD vote called");
	Polls.
		findOne({'secret': req.params.id}, function(err, poll) {
			if (err) {
				console.error('Some Error happened while finding the poll that is clicked!', err);
				res.status(500).send({ 'error': 'Some Error happened while finding the poll that is clicked!' });
			}
			else {
				var votedOption = req.body.pollQuestionMenu;
				poll.votes[parseInt(votedOption, 10)] += 1;
				poll.markModified('votes');
				req.pollRequested = poll;
				var ipAddr = req.headers["x-forwarded-for"];
				if (ipAddr){
					var list = ipAddr.split(",");
					ipAddr = list[list.length-1];
				} else {
					ipAddr = req.connection.remoteAddress;
				}
				poll.votedIp.push(ipAddr);
				// If logged IN, increase poll voted count of user
				if (req.user) {
					Users.
						findByIdAndUpdate(req.user._id, {$inc: {pollsVotedCount: 1}})
						.exec(function(err) {
							if (err) {
					    	console.error('Some Error happened while increasing polls voted count!', err);
							res.status(500).send({ 'error': 'Some Error happened while increasing polls voted count!' });
							} else {
								console.log("Successfully increased user's pollsVoted Count");
							}
						});
				}
				// we are setting req.userVoted true after voting so that voting block doesnt displays again
				req.userVoted = true;
				console.log("vote block will not show");
				poll.markModified('votedIp');
				poll.save(function(err) {
				    if (err) {
				    	console.error('Some Error happened while Adding vote to the poll submitted by user!', err);
						res.status(500).send({ 'error': 'Some Error happened while Adding vote to the poll submitted by user!' });
				    } else {
				    	next();
				    }
				});
			}
		});
};

var deletePoll = function(req, res) {
	Polls
		 .findOneAndRemove({ 'secret': req.params.id }, function(err, doc) {
		 	if (err) {
		 		console.error('Error occured while removing poll', err);
    			res.status(500).send({ error: "Error occured while removing poll"});
		 	} else {
		 		Users
					.findByIdAndUpdate(req.user._id, {$inc : {pollsCount : -1}})
					.exec(function (err, user) {
							if (err) {
								console.error('Some error happened while decreasing poll count from user\'s account');
								res.status(500).send({ 'error': 'Some error happened while decreasing poll count from user\'s account' });
							}
							else {
								console.log('Poll count decreased and poll successfully removed from polls collection!');
								res.status(200).send();
							}
					});
		 	}
		 });
};

var renderData = function (req, res) {
					res.render("./pages/poll", {
						pageTitle    : req.pollRequested.question,
						userLoggedIn : req.isAuthenticated(),
						name         : (req.user && ("- " + req.user.name.toString())) || "",
						poll         : req.pollRequested,
						pollMaker    : ( (req.user && req.user._id.toString()) === req.pollRequested.authorId.toString() ),
						page         : "pollPage",
						userVoted    : req.userVoted
					});
					delete req.userVoted;
					delete req.pollRequested;
				};

module.exports = function(app, isLoggedIn) {
    app.route('/polls/:id')
		.get(getPoll, renderData)
		.post(addVote, renderData)
		.delete(deletePoll);
};
