module server {
  "use strict";

  var express = require("express");
  var bcrypt = require("bcrypt-nodejs");
  var router = express.Router();
  var loginCtrlModule = require("./login-controller");
  var loginCtrl = new loginCtrlModule.LoginController(bcrypt);

  router.post("/", loginCtrl.postLogin);

  module.exports = router;
}
