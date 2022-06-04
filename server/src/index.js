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
  // Tell the specific client welcome
  socket.emit('message', 'Welcome');

  // Tell all other clients the current client joined
  socket.broadcast.emit('message', 'A new user joined!');
  
  // Forward message to all connected clients
  // NOTE: implement event acknoledgement with callback in callback
  socket.on('sendMessage', (message, callback) => {
    try {
      io.emit('message', message);
      callback();
    } catch (error) {
      callback(error.message);
    }
  });

  // This is built-in socket.io event, all other clients should get message that current client disconnected
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});