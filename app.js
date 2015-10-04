var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override");

var app = express();

app.use(express.static(__dirname + '/build/app'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

/**
 * Start Server
 */

http.createServer(app).listen(3000);
