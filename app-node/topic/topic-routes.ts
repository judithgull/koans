module server {
  var express = require('express');
  var router = express.Router();

  var topic = require('./topic-controller.js');

  router.get("/", topic.getTopics);
  router.get("/:id", topic.getTopic);
  router.post("/", topic.postTopic);
  router.delete("/:id", topic.deleteTopic);

  module.exports = router;
}
