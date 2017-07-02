'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
  caption: String,
  picture: String,
  likesCount: Number,
  ownerId: String,
  ownerUserId: String,
  ownerDp: String,
  ownerName: String,
  key: Number
});

module.exports = mongoose.model('Item', Item);
