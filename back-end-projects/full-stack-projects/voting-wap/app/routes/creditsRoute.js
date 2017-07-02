module.exports = function(app) {
    app.route('/credits')
		.get(function (req, res) {
			res.render("./pages/credits", {
				pageTitle : "Credits",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || ""
			});
		});
};