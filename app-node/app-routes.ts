module server {
  "use strict";

  var express = require("express");
  export var appRouter = express.Router();

  appRouter.use("/topics", require("./topic/topic-routes.js"));
  appRouter.use("/users", require("./user/user-routes.js"));
  appRouter.use("/login", require("./login/login-routes.js"));

  module.exports = appRouter;

}
