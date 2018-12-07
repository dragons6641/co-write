var express = require('express');
var router = express.Router();
var db = require('../lib/db');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/select');
});

module.exports = router;
