var Polls = require("../models/polls.js");
var randomColor = require("randomcolor");

var addOptions = function(req, res, next) {
    Polls.
         findOne({"secret": req.params.id}, function(err, poll) {
            if (err) {
                console.error('Some Error happened while Adding new options to the poll!', err);
				res.status(500).send({ 'error': 'Some Error happened while Adding new options to the poll!' });
            } else {
                var options = req.body.options;
                
                // removing trailing whitespaces in options
            	options = options.split(",");
            	options = options.map(function(option) {
            		return option.replace(/^\s+|\s+$/g, "");
            	});
				
				poll.options = poll.options.concat(options);
				poll.votes   = poll.votes.concat(options.map(function(elem){ return 0; }));
				poll.colors =  randomColor({luminosity: 'light',count: poll.options.length});
				console.log("Options", options, "poll.options", poll.options);
				poll.markModified('options');
				poll.markModified('votes');
				poll.markModified('colors');
				poll.save(function(err) {
				    if (err) {
				    	console.error('Some Error happened while Adding vote to the poll submitted by user!', err);
						res.status(500).send({ 'error': 'Some Error happened while Adding vote to the poll submitted by user!' });
				    } else {
				    	console.log("Sucessfully new options added");
				    	res.redirect("/polls/"+poll.secret);
				    }
				});
            }
         });
};

module.exports = function(app, isLoggedIn) {
    app.route('/polls/add-options/:id')
		.post(addOptions);
};