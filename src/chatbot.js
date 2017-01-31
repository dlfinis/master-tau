const express = require('express'),
      router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('Chatbot API');
  console.log('Time: ', Date.now());
  next()
});

router.get('/',(req,res)=>{
    res.send('Hello, I am a chat bot');
});

// for Facebook verification
router.get('/webhook/', function (req, res) {
  console.log('webhook');
    if (req.query['hub.verify_token'] === 'Aha_Moment_Labs') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token');
})


module.exports = router;
