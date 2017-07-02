module.exports = function (app) {
  app.post('/logout', function (req, res) {
    req.logout();
    res.sendStatus(200);
  });
};
