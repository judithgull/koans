///<reference path="../typings/index.d.ts" />
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

var env:string = process.env.NODE_ENV || "development";
var maxAge = 0;
if (env.toUpperCase() === "PRODUCTION") {
  maxAge = 86400000;
}

serverApp.use(express.static(path.join(__dirname, "../app"), {maxAge: maxAge}));


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
mongoose.connect(process.env.DB_URI || "mongodb://localhost:27017/koans");

/**
 * Routes
 */
serverApp.use("/", routes);

/**
 * Start Server
 */
http.createServer(serverApp).listen(process.env.PORT || 3000);
