const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});