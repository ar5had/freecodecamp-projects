var express = require("express");
var router = express.Router();
var crypto = require("./crypto");


var styles = "<style>@import url('https://fonts.googleapis.com/css?family=Cormorant+Garamond');" +
            "body{background: #fefefe; word-wrap: break-word;}" +
            "p {font-size: 30px;color: #b33c66;font-family: 'Cormorant Garamond', monospace;text-align: center;" +
            "margin-top: 40vh;font-weight: 500;word-spacing: 2px;}</style>";
            
function verifyUrl(req, res, next) {
    console.log("verifyurl called");
    req.params.url +=  req.params[0];
    if (validateUrl(req.params.url)) {
        req.db.collection("counter")
        .find({_id: "counter"})
        .toArray(function (err, docs) {
            if (err) console.error("Error occurred while getting COUNTER document:", err);
            
            req.encodedId = crypto.encode(docs[0].count);
            
            next();
        });
    }
    else {
        var elem = "<p>Please enter correct and formatted url!</p>";
        res.send(styles + elem);
    }
}


function incrementCounter(req, res, next) {
    console.log("inc called");
    // increasing counter
    req.db.collection("counter")
        .update(
            { 
                _id: "counter"
            },
            {
                $inc : {
                    count : 1
                }
            }
        );
        
    next();
}

function insertUrlDocument(req, res, next) {
    console.log("insert caled");
    //inserting new url document
    var obj = {original_url: req.params.url, _id: (req.encodedId || "3z"), entry_time: new Date().toUTCString()};
    req.db.collection("urls")
        .insert(obj, function(err, data) {
            if(err) console.error("Error happened while adding new document:", err);
        });
    next();
}

function sendResponse(req, res) {
    var elem = "<p>" + JSON.stringify({'original_url': req.params.url, 'short_url': 'https://shorten-that.herokuapp.com/' + req.encodedId}) + "</p>";
    res.send(styles + elem);
}

function validateUrl(url) {
  var format = /(http:\/\/|https:\/\/)[a-z0-9\-]+[.]\w+/;
  return (format.test(url));
}

router.get("/:code", function(req, res) {
    console.log("/:code middleware called with url", req.params.code);
    var code = req.params.code.toString();
    // searching short-url-id
    req.db.collection("urls")
        .find({_id: code})
        .toArray(function(err, docs) {
            if(err) console.error("Error occurred while searching urls:", err);
            console.log(docs);
            if(docs.length > 0)
                console.log(docs[0]["original_url"]),res.redirect(docs[0]["original_url"]);
            else {
                var elem = "<p>"+JSON.stringify({error:'Oops, wrong url requested!'})+"</p>";
                res.send(styles + elem);
            }
        });
});

// better solution needed 
router.get("/shorten/:url*", [verifyUrl, incrementCounter, insertUrlDocument, sendResponse]);

module.exports = router;