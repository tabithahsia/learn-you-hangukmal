const http = require('http');

const phrases = require('./data/phrases');

const PORT = 1337;
const IP = '127.0.0.1'

const server = http.createServer(function(request, response){
  console.log(`SERVING: ${request.method} to ${request.url}`);

  if (request.url === '/phrases') {
    // return JSON of all the phrases
    response.setHeader('Content-Type', 'application/json;charset=utf-8');
    response.writeHead(200);
    response.end(JSON.stringify(phrases));
  }
  console.log('the server heard a request');
  response.end('here is the response');
});

console.log('firing up the server...');
server.listen(PORT, IP);
