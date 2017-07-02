module.exports = function(app) {
    app.route('/logout')
    		.get(function (req, res) {
    			req.logout();
    			res.redirect(req.session.returnTo || '/');
    		});
};