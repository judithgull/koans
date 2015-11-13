module server {
  var express = require('express');
  var bcrypt = require("bcrypt-nodejs");
  var router = express.Router();
  var loginCtrlModule = require('./login-controller.js');
  var loginCtrl = new loginCtrlModule.LoginController(bcrypt);

  router.post("/", loginCtrl.postLogin);

  module.exports = router;
}
