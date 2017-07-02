module.exports = function(app) {
    app.route('/login')
		.get(function (req, res) {
			res.render("./pages/login", {
				pageTitle : "Login",
				userLoggedIn: req.isAuthenticated(),
				name: (req.user && ("- " + req.user.name.toString())) || ""
			});
		});
};