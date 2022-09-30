const {createClient} = require('redis'); 
const redisClient = createClient();
redisClient.connect();

module.exports = {redisClient};