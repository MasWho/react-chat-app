const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const port = process.env.PORT || 8000;

io.on('connection', (socket) => {
  console.log('New Connection!');

  socket.emit('message', 'Welcome');
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});