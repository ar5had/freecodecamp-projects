'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stock = new Schema({
    code: String,
    id: String,
    description: String,
    hide: Boolean
});

// using old function so that `this` is bound
Stock.pre('save', function(next) {
  // get unique id
  var id = new Date().getTime().toString();
  this.id = id;
  next();
});

module.exports = mongoose.model('Stock', Stock);
