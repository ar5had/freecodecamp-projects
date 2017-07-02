module.exports = function(app) {
    app.get("/*", function(req, res) {
    		res.render("./pages/error", { 
    			pageTitle: "404 - Page Not Found"
    		});	
    	});
};