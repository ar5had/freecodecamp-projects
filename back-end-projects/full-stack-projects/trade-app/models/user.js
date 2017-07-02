'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  dp: String,
  items: Array,
  phoneNo: String,
  email: String,
  address: {
    country: String,
    city: String,
    state: String,
    landmark: String,
    localAddress: String,
    pinCode: String
  },
  trades: Array,
  notificationsCount: Number,
  google: {
    id: String,
    token: String,
    email: String
  },
  twitter: {
    id: String,
    token: String,
    username: String
  },
  facebook: {
    id: String,
    token: String,
    email: String
  }
});

module.exports = mongoose.model('User', User);
