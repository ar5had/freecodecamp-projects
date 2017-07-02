'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
  itemName: String,
  itemPic: String,
  itemPrice: String,
  itemCurrency: String,
  itemDescription: String,
  itemTags: String,
  itemOwner: String,
  itemOwnerId: String,
  itemAdditionDate: String,
  itemRequests: Array,
  key: Number
});

module.exports = mongoose.model('Item', Item);
