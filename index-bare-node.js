const http = require('http');
const fs = require('fs');

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
        // add an id to the phrase (using the length of phrases)
        newPhrase.id = phrases.length;
        // push phrase into the collection of phrases
        phrases.push(newPhrase);

        // close out the response cycle
        response.writeHead(201);
        response.end(`Added ${newPhrase.korean} to the list`);
      });
    }
  } else if (request.url === '/' && request.method === 'GET') {
    // GET / - serve up index.html
    fs.readFile(__dirname + '/client/index.html', function(err, data){
      if (err) { console.error(err); }

      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.writeHead(200);
      response.end(data);
    });
  } else if (request.url === '/client/app.js' && request.method === 'GET') {
    fs.readFile(__dirname + '/client/app.js', function(err, data){
      if (err) { console.error(err); }

      response.setHeader('Content-Type', 'application/javascript;charset=utf-8');
      response.writeHead(200);
      response.end(data);
    });
  } else {
    console.log('the server heard a request');
    response.end('here is the response');
  }

});

console.log('firing up the server...');
server.listen(PORT, IP);
