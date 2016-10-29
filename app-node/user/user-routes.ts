module server {
  "use strict";

  var express = require("express");
  var bcrypt = require("bcrypt-nodejs");
  var router = express.Router();
  var userCtrlModule = require("./user-controller");
  var userCtrl = new userCtrlModule.UserController(bcrypt);

  router.post("/", userCtrl.postUser);

  module.exports = router;
}
