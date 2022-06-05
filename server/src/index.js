const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const {generateMessage} = require('./utils/messages');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users');

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
  // socket.emit('message', generateMessage('Welcome!'));

  // Tell all other clients the current client joined
  // socket.broadcast.emit('message', generateMessage('A new user joined!'));

  socket.on('join', ({username, room}, callback) => {
    const {error, user} = addUser({ socketId: socket.id, username, room });

    // Acknowledging user joining a room
    if(error) {
      callback(error);
      return;
    }

    // Once a socket joins a room, then we can emit events to that room only
    // io.to(room).emit     or     socket.broadcast.to(room).emit
    socket.join(user.room);

    socket.emit('message', generateMessage('Admin', `Welcome ${user.username}!`));
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`));
    // Event for communicating changes in connections for the room
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });
  
  // Forward message to all connected clients
  // NOTE: implement event acknoledgement with callback in callback
  socket.on('sendMessage', (message, callback) => {
    try {
      const user = getUser(socket.id);
      if(!user) {
        throw 'User not found!';
      }

      io.to(user.room).emit('message', generateMessage(user.username, message));
      callback();
    } catch (error) {
      callback(error.message);
    }
  });

  // This is built-in socket.io event, all other clients should get message that current client disconnected
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`));
      // Event for communicating changes in connections for the room
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});