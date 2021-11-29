const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.resolve(__dirname, '../client')));

// ------------------------ CREATING THE SERVERS
// -------------------------------------------------------------

// regular express http server
const myServer = app.listen(9876);

// the websocket server
const wsServer = new WebSocket.Server({
  noServer: true,
});

// ------------------------ upgrading from HTTP to websocket
const upgrade = (request, socket, head) => {
  // is connection going to be accepted?
  if (Math.random() > 0.5) {
    return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii');
  }
  // if yes, ...
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit('connection', ws, request);
  });
};

// ----------------------------------- handle event
myServer.on('upgrade', upgrade);


// what the server will do on message event
const messageHandler = (msg) => {
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg.toString());
    }
  });
};

// what should a websocket do on connection?
wsServer.on('connection', (ws) => {
  ws.on('message', messageHandler);
});
