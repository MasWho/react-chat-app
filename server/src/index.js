const express = require('express');
const http = require('http');
const socketio = require('socket.io');


const {generateMessage} = require('./utils/messages');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users');
const {redisClient} = require('./redisClient');

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

  // Listen on a 'join' event, which we will allocate the socket to a room on server
  socket.on('join', async ({username, room}, callback) => {
    const {error, user} = addUser({ socketId: socket.id, username, room });

    // Acknowledging user joining a room
    if(error) {
      callback(error);
      return;
    }

    // Once a socket joins a room, then we can emit events to that room only
    // io.to(room).emit or socket.broadcast.to(room).emit
    socket.join(user.room);
    const roomMessages = await redisClient.lRange(user.room, 0, -1);
    const messagesToSend = roomMessages.map(message => JSON.parse(message));
    socket.emit('message-load', messagesToSend);
    socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`));
    socket.emit('message', generateMessage('Admin', `Welcome ${user.username}!`));
    
    // Event for communicating changes in connections for the room
    io.to(user.room).emit('roomData', {
      users: getUsersInRoom(user.room)
    });

    callback();
  });
  

  // Forward message to all connected clients
  // implement event acknoledgement with client callback
  socket.on('sendMessage', async (message, callback) => {
    try {
      const user = getUser(socket.id);
      if(!user) {
        throw 'User not found!';
      }
      const generatedMessage = generateMessage(user.username, message)
      await redisClient.lPush(user.room, JSON.stringify(generatedMessage));
      io.to(user.room).emit('message', generatedMessage);
      callback();
    } catch (error) {
      callback(error.message);
    }
  });


  // This is built-in socket.io event, all other clients should get message that current client disconnected
  socket.on('disconnect', async () => {
    const user = removeUser(socket.id);

    if(user) {
      const userLeft = generateMessage('Admin', `${user.username} has left!`);
      io.to(user.room).emit('message', userLeft);
      io.to(user.room).emit('roomData', {
        users: getUsersInRoom(user.room)
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});