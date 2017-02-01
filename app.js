const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const routes = require('./src/routes');
const chatbot = require('./src/chatbot');
const config = require('./utils/config');
const logger = require('./utils/logger');
const morgan = require('morgan');
const path = require('path');

let app = express();

logger.debug('Overriding Express logger');

app.set('port', config.port, config.ip);

app.use(morgan('combined', { stream: logger.stream }));
logger.debug(path.join(__dirname, 'static'));

app.use(express.static(path.join(__dirname, 'static')))

app.use('/', routes);
app.use('/chatbot', chatbot);

app.use((err, req, res, next) => {
  res.status(404);
  res.writeHead(404);
  logger.error(err);
  res.end('Not found');
});

app.listen(app.get('port'), () => {
  logger.debug(`Application worker ${process.pid} started...`);
});
