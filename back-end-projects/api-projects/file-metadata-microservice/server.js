var express = require("express")
    , path = require("path")
    , multer = require("multer")
    , favicon = require("serve-favicon")
    , port = process.env.PORT || 8080;

var upload = multer();
var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, "public")));

app.set("view-engine", "ejs");

app.get('/getmetadata', function(req, res) {
    res.render('pages/getmd.ejs');
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html")); 
});

app.post("/", upload.single("uploadedFile"), function(req,res) {
   var data = JSON.stringify({"size": req.file.size});
   res.render("pages/metadata.ejs", {data: data}); 
});

app.listen(port, function(){
    console.log("App running on port", port);
})