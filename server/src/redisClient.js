const {createClient} = require('redis'); 
const redisClient = createClient({url: 'redis://redis:6379'});
redisClient.connect();

module.exports = {redisClient};