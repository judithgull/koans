///<reference path="../typings/index.d.ts" />

import {config} from "./config/config";


var http = require("http"),
  express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  path = require("path"),
  compression = require("compression"),
  routes = require("./app-routes");

export var serverApp = express();

serverApp.use(compression());

serverApp.use(express.static(path.join(__dirname, "../app"), config.staticCacheOptions));

serverApp.use(bodyParser.urlencoded({
  extended: true
}));
serverApp.use(bodyParser.json());

serverApp.use(methodOverride(function (req) {
  if (req.body && typeof req.body === "object" && "_method" in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


/**
 * DB
 */
console.log("Connecting to " + config.db);
mongoose.connect(config.db);

/**
 * Routes
 */
serverApp.use("/", routes);

/**
 * Start Server
 */
http.createServer(serverApp).listen(config.serverPort);
