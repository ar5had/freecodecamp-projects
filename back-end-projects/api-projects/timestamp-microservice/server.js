var express = require("express");
var path = require("path");
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname,"public")));

app.get('/:date', function(req, res){
  console.log(req.params.date);
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var date = isNaN(req.params.date) ? new Date((req.params.date)): new Date(Number(req.params.date));
  var json = date.getTime() ? { 'unix': date.getTime(), 'natural': date.toLocaleDateString("en-US", options) } : { 'unix': null, 'natural': null } ;
  res.send('<style>body{background: #fefefe;} p{font-weight: 500; text-align: center; font-family: monospace; word-wrap: break-word; color: #625e98; font-size: 25px; margin-top: 40vh;}</style><p>' + JSON.stringify(json) + '</p>');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});