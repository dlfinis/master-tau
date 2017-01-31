const express = require('express'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      router = express.Router();


router.use((req,res,next) =>{
  console.log('Time: ', Date.now());
  next();
});

router.get('/',(req,res)=>{
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.setHeader('Content-Type', contentTypes['html']);
  res.sendFile('./static/index.html');
});

router.get('/health',(req,res)=>{
  res.writeHead(200);
  res.end();
});

router.get('/info/gen',(req,res)=>{
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.end(JSON.stringify(sysInfo.gen()));
});

router.get('/info/poll',(req,res)=>{
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.end(JSON.stringify(sysInfo.poll()));
});


module.exports = router;
