'use strict';

import { topicRouter } from './topic/topic-routes';

var express = require('express');
export var appRouter = express.Router();

appRouter.use('/topics', topicRouter);

module.exports = appRouter;
