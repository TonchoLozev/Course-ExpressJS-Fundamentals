const express = require('express');
const router = express.Router();

router.get('/welcome', (req, res)=>{
   res.send('Home page')
});

router.get('/welcome/:welcomeId', (req, res)=>{
   res.send(`Home with welcomeId ${req.params.welcomeId}`);
});

module.exports = router;