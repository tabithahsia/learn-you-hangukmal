const http = require('http');

const phrases = require('./data/phrases');

const PORT = 1337;
const IP = '127.0.0.1'

const server = http.createServer(function(request, response){
  console.log(`SERVING: ${request.method} to ${request.url}`);

  if (request.url === '/phrases') {
    // GET /phrases - return JSON of all the phrases
    if (request.method === 'GET'){
      response.setHeader('Content-Type', 'application/json;charset=utf-8');
      response.writeHead(200);
      response.end(JSON.stringify(phrases));
    }

    // POST /phrases - add a new phrase to the list
    if (request.method === 'POST') {
      // listen for all the data
      let data = '';
      request.on('data', function(chunk){
        data += chunk;
      });
      // concatenate all the chunks of data together
      request.on('end', function(){
        let newPhrase = JSON.parse(data);
        newPhrase.id = phrases.length;
        phrases.push(newPhrase);

        response.writeHead(201);
        response.end(`Added ${newPhrase.korean} to the list`);
      })
      // add an id to the phrase (using the length of phrases)
      // push phrase into the collection of phrases
    }
  }
  console.log('the server heard a request');
  response.end('here is the response');
});

console.log('firing up the server...');
server.listen(PORT, IP);
