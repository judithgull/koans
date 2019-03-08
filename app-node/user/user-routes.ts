module server {
  const express = require('express');
  const router = express.Router();
  const userCtrlModule = require('./user-controller');
  const userCtrl = new userCtrlModule.UserController();

  router.post('/', userCtrl.postUser);

  module.exports = router;
}
