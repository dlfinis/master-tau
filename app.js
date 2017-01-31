const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      express      = require('express'),
      bodyParser   = require('body-parser'),
      request      = require('request'),
      routes      = require('./src/routes'),
      chatbot      = require('./src/chatbot'),
      env          = process.env;


let app = express();

console.log(env.NODE_PORT, env.NODE_IP);
app.set('port',env.NODE_PORT || 3000, env.NODE_IP || 'localhost');

app.use('/',routes);
app.use('/chatbot',chatbot);

app.use((err,req,res,next)=>{
  res.status(404);
  res.writeHead(404);
  res.end('Not found');
});


app.listen(app.get('port'),()=>{
  console.log(`Application worker ${process.pid} started...`);
});
