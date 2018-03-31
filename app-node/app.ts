import { config } from './config/config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as compression from 'compression';
import * as routes from './app-routes';

export var serverApp = express();

serverApp.use(compression());

serverApp.use(
  bodyParser.urlencoded({
    extended: true
  })
);
serverApp.use(bodyParser.json());

serverApp.use(
  methodOverride(function(req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// CORS middleware
if (config.allowAllOrigs) {
  console.log('DEV MODE -- ALLOW ALL ACCESS');
  const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Security-Policy', 'default-src "*" ');
    res.header('X-Content-Type-Options', '');
    next();
  };

  serverApp.use(allowCrossDomain);
}

serverApp.use(
  express.static(
    path.join(__dirname, '../build/app'),
    config.staticCacheOptions
  )
);

/**
 * DB
 */
console.log('Connecting to ' + config.db);
mongoose.connect(config.db);

/**
 * Routes
 */
serverApp.use('/', routes);

/**
 * Start Server
 */
serverApp.listen(config.serverPort);
