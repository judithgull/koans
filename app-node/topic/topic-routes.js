var express = require('express');
var router = express.Router();

var topic = require('./topic-controller.js');

router.get("/", topic.getTopics);

module.exports = router;
