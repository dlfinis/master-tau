const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const routes = require('./src/routes');
const chatbot = require('./src/chatbot');
const config = require('./utils/config');
const winston = require('winston');

let app = express();

app.set('port', config.port, config.ip);

app.use('/', routes);
app.use('/chatbot', chatbot);

app.use((err, req, res, next) => {
  res.status(404);
  res.writeHead(404);
  res.end('Not found');
});


app.listen(app.get('port'), () => {
  winston.log(`Application worker ${process.pid} started...`);
});
