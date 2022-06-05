const generateMessage = (user, text) => {
  return {
    text,
    user,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage,
};