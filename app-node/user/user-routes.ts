import express = require('express');

module server {
  var router = express.Router();
  var userCtrl = require('./user-controller.js');

  router.post("/", userCtrl.postUser);

  module.exports = router;
}
