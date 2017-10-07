'use strict'
var express = require('express');
var router = express.Router();
// let index = require('../views/index');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
