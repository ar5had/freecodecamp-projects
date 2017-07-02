module.exports = function(app) {
    app.route('/logout')
    		.post(function (req, res) {
    			req.logout();
    			res.redirect('/');
    		});
};