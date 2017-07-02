// common server for both production and development
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { chalkSuccess } from './chalkConfig';
import config from '../webpack.config.dev';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import authRoutes from '../server/authRoutes';
import logoutRoute from '../server/logoutRoute';

const api = require('../server/api');
const environment = process.argv[2];
const app = express();
const server = http.createServer(app);

/* eslint-disable no-console */
console.log(chalkSuccess(`Starting Express server in ${environment} mode...`));

const runWebpack = () => {
  if (environment !== "production") {
    const bundler = webpack(config);

    app.use(express.static('src/*.html'));
    app.use(historyApiFallback());
    app.use(webpackHotMiddleware(bundler));
    app.use(webpackDevMiddleware(bundler, {
      // Dev middleware can't access config, so we provide publicPath
      publicPath: config.output.publicPath,

      // These settings suppress noisy webpack output so only errors are displayed to the console.
      noInfo: false,
      quiet: false,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }

      // for other settings see
      // http://webpack.github.io/docs/webpack-dev-middleware.html
    }));
  } else {
    app.use(express.static('dist'));
  }
};

if (environment !== "production") {
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
  runWebpack();
});

server.listen(process.env.PORT);
/* eslint-disable no-console */
console.log(chalkSuccess('Express server is listening on port: ' + server.address().port));
