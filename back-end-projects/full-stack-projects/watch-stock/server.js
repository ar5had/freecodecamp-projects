const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Stock = require('./models/stock.js');
const routes = require('./app/routes.js');

// loads all custom environments variables
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// connect database
var options = {
  server: {
    socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
  },
  replset: {
    socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 }
  }
};
mongoose.connect(process.env.MONGO_URI, options, err => {
  if(err) {
    console.log(`Some error happened while connecting to db - ${err}`);
  } else {
    console.log(`db connected successfully!`);
  }
});

mongoose.Promise = global.Promise;
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  // Routes
  app.use('/', routes);

  // Socket Events
  io.on('connection', function(socket) {
    console.log('a user connected, id-' + socket.id);

    socket.on('disconnect', function() {
        console.log('a user disconnected, id-'  + socket.id);
    })

    socket.on('removeStock', (code) => {
      io.emit("removeStock",code);
    });

    socket.on('removeAllStock', () => {
      io.emit("removeAllStock");
    });

    socket.on('addStock', (data) => {
    // using broadcast because transfering data(which can be of quite big)
    // transfer data to all clients to all other clients except the one client
    // upon which this method is called.
      socket.broadcast.emit("addStock", data);
    });

    socket.on('notify', ({name, code}) => {
      switch (name) {
        case 'REMOVE_ALL':
          socket.broadcast.emit("notify", `All stocks have been removed by some user!`);
          break;
        case 'REMOVE':
          socket.broadcast.emit("notify", `${code} stock has been removed by some user!`);
          break;
        case 'ADD':
          socket.broadcast.emit("notify", `${code} stock has been added by some user!`);
          break;
        default:
          console.error("Wrong event name send to notify!");
          break;
      }
    });
  })
});

const port = process.env.PORT;
http.listen(port, () => {
  console.log(`Server running at ${port}!`); // eslint-disable-line no-console
});
