///<reference path='../typings/tsd.d.ts' />
var http = require('http'),
  express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require("method-override"),
  mongoose = require('mongoose'),
  path = require('path');

export var serverApp = express();

serverApp.use(express.static(path.join(__dirname, '../app')));
serverApp.use(bodyParser.urlencoded({
  extended: true
}));
serverApp.use(bodyParser.json());

serverApp.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


/**
 * DB
 */
mongoose.connect('mongodb://localhost:27017/koans');

/**
 * Routes
 */

serverApp.use("/topics", require('./topic/topic-routes.js'));
serverApp.use("/users", require('./user/user-routes.js'));

/**
 * Start Server
 */

http.createServer(serverApp).listen(3000);
