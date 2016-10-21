"use strict";

import * as topic from "./topic-controller";

var express = require("express");
export const topicRouter = express.Router();

topicRouter.get("/", topic.getTopics);
topicRouter.get("/:id", topic.getTopic);
topicRouter.post("/", topic.postTopic);
topicRouter.delete("/:id", topic.deleteTopic);
topicRouter.put("/:id", topic.updateTopic);

