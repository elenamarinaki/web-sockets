const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.resolve(__dirname, '../client')));

// regular express http server
const myServer = app.listen(9876);

// the websocket server
const wsServer = new WebSocket.Server({
  noServer: true,
});

// what the server will do on message event
const messageHandler = (msg) => {
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg.toString());
    }
  });
};
