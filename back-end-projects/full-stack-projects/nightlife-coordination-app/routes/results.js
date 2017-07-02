var users = require("../models/users.js");
var restaurants = require("../models/restaurants.js");
var request = require("request");
var querystring = require("querystring");

var isUserLogged = function(req, res, next) {
  if(req.query.type !== "xhr")
    req.session.returnTo = req.originalUrl;
  // dont save location that have no results
  if (req.isAuthenticated() && req.ids) {
    users.findOneAndUpdate({_id: req.user._id}, {$set: {userLocation: req.location}})
      .exec(function(err) {
        if (err) 
          return next(err);
        else {
          next();
        }
        
      });
  } else {
    next();
  }
};


var getRestaurantData = function(req, res, next) {
  console.log("getRestaurantData - ids are", req.ids);
  if(req.ids) {
    restaurants.find({})
      .exec(function(err, data) {
        if (err) {
          next(err);
        } else {
          console.log("restaurant data is ", data);
          req.session.restaurants = data;
          next();
        }
      });
  } else {
    next();
  }
};


var getResults = function (req, res, next) {
  
  var credentials = {
    'v': '20140806',
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
  };
  
  var urlString = "https://api.foursquare.com/v2/venues/search?";
  
  var params;
  
  if(req.query.loc === "true") {
    var ll, ip = req.header('x-forwarded-for') || req.connection.remoteAddress; 
    console.log("ip is", ip);
    var url = 'http://freegeoip.net/json/' + ip;
    
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log("ip loc body is", body);
          var resp = JSON.parse(body);
          ll = resp.latitude + "," + resp.longitude;
          
          req.location = (resp.city && (resp.city + ", ")) + (resp.region_name && (resp.region_name + ", ")) + resp.country_name;
          params = {
            'll' : ll.toString(),
            'query': "restaurant",
            'limit': 50
          };
          urlString += querystring.stringify(params) + '&' + querystring.stringify(credentials);
      
          request(urlString, function (error, response, results) {
            if (!error && response.statusCode == 200) {
              req.ids = JSON.parse(results).response.venues.map(function(result) { return "/venues/" + result.id });
              req.results = [];
              next();
            } else {
              next(error);
            }
          });
          
      } else {
        next(error);
      }
    });
    
  } else {
    var location;
    location = req.query.search;
    req.location = location;
    params = {
        'near': location,
        'query': "restaurant",
        'limit': 50
    };
    
    urlString += querystring.stringify(params) + '&' + querystring.stringify(credentials);
    
    request(urlString, function (error, response, results) {
      if (!error && response.statusCode == 200) {
        req.ids = JSON.parse(results).response.venues.map(function(result) { return "/venues/" + result.id });
        req.results = [];
        next();
      } else {
        next(error);
      }
    });
  }
  
};

var filterData = function(req, res, next) {
  if (req.ids) {
    
    var credentials = {
      'v': '20140806',
      'client_id': process.env.CLIENT_ID,
      'client_secret': process.env.CLIENT_SECRET
    };
    
    var count = 1;
    
    if (req.query.page) {
      count = req.query.page;
    }
    
    var i = (count - 1) * 10; // 0 for 1, 10 for 2...
    var j = count * 10; // 10 for 1, 20 for 2 ...
    
    var urlString = "https://api.foursquare.com/v2/multi?requests=" + req.ids.slice(i, j).join(',') + '&' + querystring.stringify(credentials);
    
    request(urlString, function (error, response, results) {
        
        if (!error && response.statusCode == 200) {
          JSON.parse(results).response.responses.forEach(function(result){
              var venue = result.response.venue;
              var obj = {};
              obj.id = venue.id;
              obj.reqLocation = req.location;
              obj.name = venue.name;
              obj.rating = venue.rating && venue.rating;
              obj.ratingColor = ("#" + venue.ratingColor);
              obj.category = venue.categories && (venue.categories.map(function(c) {return c.shortName})).join(", ");
              obj.phoneNo = venue.contact.formattedPhone;
              obj.address = venue.location.address;
              obj.city = venue.location.city;
              obj.status = venue.hereNow && venue.hereNow.summary;
              obj.tier = venue.price && venue.price.tier;
              obj.currency = venue.price && venue.price.currency;
              obj.imgUrl = venue.photos.groups[0] && (venue.photos.groups[0].items[0].prefix + '300x300' + venue.photos.groups[0].items[0].suffix);
              obj.imgUrl = obj.imgUrl ? obj.imgUrl: (venue.bestPhoto && venue.bestPhoto.prefix + '300x300' + venue.bestPhoto.suffix);
              obj.comment =  venue.tips.groups[0].items[0] && venue.tips.groups[0].items[0].text;
              obj.commentator = { 'name': venue.tips.groups[0].items[0] && ( (venue.tips.groups[0].items[0].user && venue.tips.groups[0].items[0].user.firstName) + " " + (venue.tips.groups[0].items[0].user.lastName? venue.tips.groups[0].items[0].user.lastName: "")),
                'imgUrl': obj.commentator = venue.tips.groups[0].items[0] && ( (venue.tips.groups[0].items[0].user && (venue.tips.groups[0].items[0].user.photo.prefix + '70x70' + venue.tips.groups[0].items[0].user.photo.suffix) ) )
              };
              obj.likesCount = venue.likes && venue.likes.count;
              obj.url = venue.shortUrl;
              
              var str = obj.name.split(" ").map(function(elem) {return elem[0]}).join("");
              // setting falsy values to undefined
              obj.name = obj.name ? obj.name : undefined;
              obj.rating = obj.rating ? obj.rating : undefined;
              obj.ratingColor = obj.ratingColor ? obj.ratingColor : undefined;
              obj.category = obj.category ? obj.category : undefined;
              obj.phoneNo = obj.phoneNo || undefined;
              obj.address = obj.address || undefined;
              obj.city = obj.city || undefined;
              obj.status = obj.status || undefined;
              obj.tier = obj.tier || undefined;
              obj.currency = obj.currency || undefined;
              obj.imgUrl = obj.imgUrl || "https://placehold.it/100?text="+ str;
              obj.comment =  obj.comment || undefined;
              obj.commentator = obj.commentator || undefined;
              obj.likesCount = obj.likesCount || undefined;
              obj.url = obj.url || undefined;
              
              req.results.push(obj);
          });
          
          next();
        } else {
          next(error);
        }
    
    });
  } else {
    next();
  }
};


var showResults = function(req, res) {
  var obj;
  var formattedData = {};
  
  if(req.ids && (req.ids.length <= (req.query.page * 10)) ) {
    var last = true;
  }
  
  if (req.ids) {
    formattedData.ids = req.session.restaurants.map(function(elem) {return elem.venueId});
    formattedData.usersGoing = req.session.restaurants.map(function(elem) {return elem.usersGoing});

    obj =  {
      title: "Results for " + req.location + " - foodiebay",
      user: req.user,
      results: req.results,
      last: last,
      restaurants: formattedData,
      userLoggedIn: req.isAuthenticated(),
      userId: req.user && req.user._id
    };
  } else {
    obj = {
      title: "No results found - foodiebay",
      user: req.user,
      results: null,
      location: req.location || "your search!"
    };
  }
  
  if (req.query.type === "xhr") {
    res.render('./components/results', {results: req.results, last: last, restaurants: formattedData, userLoggedIn: req.isAuthenticated(), userId: req.user && req.user._id });
  } else {
    res.render('./pages/resultsPage', obj);
  }
  
  delete req.results;
  delete req.ids;
  delete req.location;
  delete req.session.restaurants;
  req.session.save();
};

module.exports = function(app) {
    app.route('/results')
    		.get(getResults, getRestaurantData, isUserLogged, filterData, showResults);
};