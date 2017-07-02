var querystring = require("querystring");

var checkIfUserLogged = function(req, res, next) {
  if (req.isAuthenticated() && req.user.userLocation) {
    res.redirect("/results?search="+ encodeURIComponent(req.user.userLocation));   
  } else {
    next();   
  }
};

module.exports = function(app) {
    app.get("/", checkIfUserLogged, function(req, res, next) {
        res.render('./pages/index', {
            title: "Home - foodiebay",
            user: req.user
        });
    });
};
