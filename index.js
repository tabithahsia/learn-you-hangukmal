const express = require('express');

const phrases = require('./data/phrases');

const PORT = 1337;
const IP = '127.0.01';
const app = express();

app.get('/', (req, res) => { //similar to request.method === get
  res.sendFile(__dirname + '/client/index.html');

});

app.listen(PORT, () => {
  console.log(`learn-you-hangukmal express edition is listening on port ${PORT}`);
});
