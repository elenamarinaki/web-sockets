// websocket variables
const url = 'ws://localhost:9876/myWebsocket';
const wsServer = new WebSocket(url);

// DOM elements
const messages = document.querySelector('#messages');
const message = document.querySelector('#message');
const sendButton = document.querySelector('#send');

// can send message when connection is open
wsServer.onopen = () => {
  sendButton.disabled = false;
};

// creating DOM element to show messages on browser
const generateMessage = (msg, from) => {
  const newMessage = document.createElement('h5');
  newMessage.innerText = `${from} says: ${msg}`;
  messages.appendChild(newMessage);
};

// handling the message event
wsServer.onmessage = (e) => {
  const { data } = e;
  generateMessage(data, 'Server');
};

// sending message from client
const sendMessage = () => {
  const text = message.value;
  generateMessage(text, 'Client');
  wsServer.send(text);
};

sendButton.disabled = true;
sendButton.addEventListener('click', sendMessage, false);
