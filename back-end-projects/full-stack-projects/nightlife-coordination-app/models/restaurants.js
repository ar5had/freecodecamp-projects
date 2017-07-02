'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema({
    venueId : String,
    usersGoing : Array,
    usersName  : Array
});

module.exports = mongoose.model('Restaurant', Restaurant);
