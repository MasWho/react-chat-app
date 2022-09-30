const {createClient} = require('redis'); 
// const redisClient = createClient({url: 'redis://redis:6379'});
const redisClient = createClient();
redisClient.connect();

module.exports = {redisClient};