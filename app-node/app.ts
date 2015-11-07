module server {

  var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    path = require('path');

  var app = express();

  app.use(express.static(path.join(__dirname, '../build/app')));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use(methodOverride(function (req) {
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

  app.use("/topics", require('./topic/topic-routes.js'));

  /**
   * Start Server
   */

  http.createServer(app).listen(3000);
}
