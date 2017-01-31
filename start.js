const winston = require('winston');
const cluster = require('cluster');
const config = require('./utils/config');
const stopSignals = [
  'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
  'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
];
const production = config.env === 'production';

let stopping = false;

cluster.on('disconnect', function (worker) {
  if (production) {
    if (!stopping) {
      cluster.fork();
    }
  } else {
    process.exit(1);
  }
});

if (cluster.isMaster) {
  const workerCount = config.workerCount;
  winston.log(`Starting ${workerCount} workers...`);
  for (let i = 0; i < workerCount; i = +1) {
    cluster.fork();
  }
  if (production) {
    stopSignals.forEach(function (signal) {
      process.on(signal, function () {
        winston.log(`Got ${signal}, stopping workers...`);
        stopping = true;
        cluster.disconnect(function () {
          winston.log('All workers stopped, exiting.');
          process.exit(0);
        });
      });
    });
  }
} else {
  require('./app.js');
}
