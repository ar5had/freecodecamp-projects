'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: String,
    dp: String,
    userLocation: String,
    twitter: {
        id: String,
        token: String,
        username: String
    }
});

module.exports = mongoose.model('User', User);
