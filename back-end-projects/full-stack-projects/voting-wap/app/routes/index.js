'use strict';

var path               = process.cwd();
var ClickHandler       = require(path + '/app/controllers/clickHandler.server.js');

var authRoutes         = require("./authRoutes.js");
var profileRoute       = require("./profileRoute.js");
var homepageRoute      = require("./homepageRoute.js");
var logoutRoute        = require("./logoutRoute.js");
var errorRoute         = require("./errorRoute.js");
var createPollRoute    = require("./createPollRoute.js");
var loginRoute         = require("./loginRoute.js");
var creditsRoute       = require("./creditsRoute.js");
var myPollRoute        = require("./myPollRoute.js");
var allPollRoutes      = require("./allPollRoutes.js");
var addNewOptionsRoute = require("./addNewOptionsRoute.js");

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			req.session.returnTo = req.path;
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.set("view engine", "ejs");

	homepageRoute(app);
	
	profileRoute(app, isLoggedIn, clickHandler);
	
	loginRoute(app);
		
	myPollRoute(app, isLoggedIn, clickHandler);
	
	allPollRoutes(app, isLoggedIn, clickHandler);	
	
	creditsRoute(app);
	
	createPollRoute(app, isLoggedIn);
	
	addNewOptionsRoute(app, isLoggedIn);
	
	logoutRoute(app);

	authRoutes(app, passport);
		
	errorRoute(app);
	
};
