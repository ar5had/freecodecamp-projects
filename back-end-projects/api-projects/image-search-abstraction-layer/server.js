var express = require("express")
    , path = require("path")
    , favicon = require("serve-favicon")
    , mongo = require("mongodb").MongoClient
    , routes = require("./routes")
    , dotenv = require("dotenv")
    , port = process.env.PORT || 8080
    , app = express();
    
dotenv.load();

var url = process.env.MONGOLAB_URI;

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

mongo.connect(url, function(err, db){
  if(err) console.error("Error occured while connecting to db", err);
  console.log("Successfully connected to DB");
   
  app.use(function(req, res, next) {
      req.collection = db.collection("data");
      next();
  });
   
  app.use(routes);
}); 

app.listen(port, function(){
    console.log("App running on", port);
});