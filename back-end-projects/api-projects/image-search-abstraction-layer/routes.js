var express = require("express");
var router = express.Router();
var Flickr = require("flickrapi");
 

var styles = "<style>@import url('https://fonts.googleapis.com/css?family=Open+Sans');" +
            "body{background: #fefefe; word-wrap: break-word;}" +
            "p{font-size: 15px;color: rgba(244, 67, 54, 0.87);font-family: 'Quicksand', monospace;text-align: center;" +
            "margin-top: 10vh;font-weight: 500;word-spacing: 2px;}</style>";

router.get("/latest", function(req, res){
    req.collection.find({}, {term: 1, when: 1, _id: 0})
        .sort({$natural: -1}).limit(5)
        .toArray(function(err, data) {
           if(err) console.error("Error occurred while getting latest search results:", err);
           var elem = "<p>"+JSON.stringify(data)+"</p>";
           res.send(styles + elem);
        });
});

function insertQueryDoc(req, res, next) {
    var obj = {};
    obj.term = req.params.queries.toString();
    obj.when = new Date().toString();
    req.collection.insert(obj, function(err, data){
       if(err) console.log("Error occurrred while inserting data:", data);
       next();
    });
}

function showData(req, res) {
    var offset = req.query.offset || 1;
    var query = req.params.queries;
    
    var flickrOptions = {
      api_key: process.env.API_KEY.toString(),
      secret: process.env.API_SECRET.toString()
    };
    
    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
        flickr.photos.search({
          text: query,
          page: offset,
          per_page: 10
        }, function(err, result) {
            if(err) console.error("Error occurred while getting images data:", err);
            
            var usefulData = [];
            
            result.photos.photo.forEach((item)=>{
        		usefulData.push({
        			url: 'https://farm'+item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' +item.secret + '.jpg',
        			alt: item.title,
        			thumbnail: 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_t.jpg',
        			info: 'https://www.flickr.com/photos/'+ item.owner + '/' + item.id
        		});
        	});
            
            var elem = "<p>"+JSON.stringify(usefulData)+"</p>";
            res.send(styles+elem);
        });
    });
    
}

router.get("/:queries", function(req, res, next) {
    next();
}, insertQueryDoc, showData);

module.exports = router;