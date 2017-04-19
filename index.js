const express = require('express');
const bodyParser = require('body-parser');

// const phrases = require('./data/phrases'); //i dont need this anymore
const logger = require('./middleware/logger');
const Phrases = require('./middleware/phraseHandler');

const PORT = 1337;
const IP = '127.0.01';
const app = express();

//use logger middleware
app.use(logger);

app.use(bodyParser.json());

//serve static assets
app.use('/client', express.static(__dirname + '/client'));


app.route('/phrases')
  .get(Phrases.getAll)
  .post(Phrases.addOne);

// app.get('/phrases', Phrases.getAll);
// app.post('/phrases', Phrases.addOne);

app.get('/phrases/:id', Phrases.getOneByID);

app.get('/', (req, res, next) => { //similar to request.method === get
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(PORT, () => {
  console.log(`learn-you-hangukmal express edition is listening on port ${PORT}`);
});
