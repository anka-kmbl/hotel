'use strict'
const express = require('express');
let router = express.Router();
let roomsStorage = require('../rooms');

router.get('/', (req, res) => {
  res.send(JSON.stringify({resp: true}));
  // res.send('ok');
})
module.exports = router;