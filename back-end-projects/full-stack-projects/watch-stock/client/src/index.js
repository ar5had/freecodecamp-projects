import {SocketProvider} from 'socket.io-react';
import io from 'socket.io-client';

import App from './components/app/App.js';
import React from 'react';
import ReactDOM from 'react-dom';

// connect to socket
let url = "";
if(process.env.NODE_ENV !== "production") {
  url = `${window.location.hostname}:${process.env.REACT_APP_SOCKET_PORT}`;
}
const socket = io.connect(url);

ReactDOM.render(
  <SocketProvider socket={socket}>
    <App />
  </SocketProvider>,
  document.getElementById('root')
);
