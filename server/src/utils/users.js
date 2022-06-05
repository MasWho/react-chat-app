const users = [];

// addUser
const addUser = ({socketId, username, room}) => {
  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data
  if(!username || !room) {
    return {
      error: 'Username and room are required',
    };
  }

  // Check for existing user
  const existingUser = users.find((user) => user.room === room && user.username === username);
  if(existingUser) {
    return {
      error: 'Username is in use!'
    };
  }

  // Store user
  const user = {
    id: socketId,
    username,
    room
  };

  users.push(user);
  return { user };
}

// removeUser
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// getUser
const getUser = (id) => {
  const user = users.find((user) => user.id === id);
  return user;
};

// getUsersInRoom
const getUsersInRoom = (room) => {
  const usersInRoom = users.filter(user => user.room === room);
  return usersInRoom;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
};