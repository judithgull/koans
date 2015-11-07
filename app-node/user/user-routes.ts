module server {
  var express = require('express');
  var router = express.Router();

  var topic = require('./user-controller.js');

  router.post("/", topic.postUser);

  module.exports = router;
}
