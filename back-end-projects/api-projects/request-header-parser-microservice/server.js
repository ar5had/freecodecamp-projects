var express = require('express')
    , app = express()
    , path = require("path")
    , UAParser = require('ua-parser-js')
    , parser = new UAParser();

app.set('port', (process.env.PORT || 8080));

app.use(express.static(path.join(__dirname, "public")));

app.get('/whoami', function (req, res) {

  var language = req.headers["accept-language"].split(",")[0];

  // Conventional wisdom says, this is how you would get the IP address from a request:
  // var ip = req.connection.remoteAddress;
  // But there is a problem. If you are running your app behind Nginx or any proxy, every single IP addresses will be 127.0.0.1 😀
  // Probably you can see the problem now. So what is the solution?
  // Look for the originating IP address in the X-Forwarded-For HTTP header. You will find it in req.header('x-forwarded-for'). Considering that fact, here is the best way to get the IP address of a user:
  // var ip = req.headers('x-forwarded-for') || req.connection.remoteAddress;
  // Now you can be sure the variable ip will catch the IP address of the client, not your proxy's.
  var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  var os =  parser.setUA(req.headers["user-agent"]).getOS();

      os = os.name + " " + os.version;

  var data = JSON.stringify({"ipaddress": ip, "language": language, "software": os});

  var styles = "<style>body{background: #fefefe; word-wrap: break-word;}" +
  "p {font-size: 20px;color: #dac82e;font-family: monospace;text-align: center;" +
  "margin-top: 40vh;font-weight: 500;word-spacing: 2px;}</style>";

  var elem = "<p>"+data+"</p>";

  res.end(styles+elem);

});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname,"public","index.html"));
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
