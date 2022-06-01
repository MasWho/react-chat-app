const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 8000;

io.on('connection', () => {
  console.log('New Connection!');
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});