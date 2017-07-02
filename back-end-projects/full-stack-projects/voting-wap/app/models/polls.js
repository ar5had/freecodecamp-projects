'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PollSchema = new Schema({
	question   : String,
	options    : Array,
	createdAt  : String,
	views      : Number,
	votes      : Array, 
	colors     : Array,
	author     : String,
	authorId   : mongoose.Schema.Types.ObjectId,
	secret     : String,
	viewedIp   : Array,
	votedIp    : Array
});

module.exports = mongoose.model('Poll', PollSchema);
