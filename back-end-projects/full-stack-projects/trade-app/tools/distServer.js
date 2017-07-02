/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('../server/authRoutes');
const logoutRoute = require('../server/logoutRoute');

const api = require('../server/api');
const environment = process.env.NODE_ENV;
const app = express();
const server = http.createServer(app);

require('dotenv').load({path: path.resolve(process.cwd() ,".env")});


if (environment === "productiion") {
  require('dotenv').load({path: path.resolve(process.cwd() ,".env")});
}

require('../config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const options = {
  server: {
    socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
  },
  replset: {
    socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
  }
};

mongoose.connect(process.env.MONGO_URI, options, err => {
  if (err) {
    console.error(`Some error happened while connecting to db - ${err}`);
  } else {
    console.log(`db connected successfully!`);
  }
});

mongoose.Promise = require('bluebird');
const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', () => {
  // passport auth routes
  authRoutes(app, passport);
  logoutRoute(app);
  api(app);
  app.use(express.static('dist'));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
  });

});

server.listen(process.env.PORT);
/* eslint-disable no-console */
console.log('Express server is listening on port: ' + server.address().port);
