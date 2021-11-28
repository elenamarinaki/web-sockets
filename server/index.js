const WebSocket = require('ws');
const express = require('express');
const path = require('path');

const app = express();

const wsServer = new WebSocket.Server({
  noServer: true,
});
