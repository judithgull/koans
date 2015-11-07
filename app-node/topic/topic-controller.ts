var url = require("url");
var Topic = require("./topic-model.js");

module.exports.getTopics = function (req, res) {
  res.format({
    "application/json": function (req, res) {
      Topic
        .find({}, function(err, topics) {
        if (err) {
          console.log(err);
        } else {
          res.send(topics);
        }
      }).sort( { _id: -1 } );

    }
  });
};

module.exports.getTopic = function (req, res) {
  res.format({
    "application/json": function (req, res) {
      Topic
        .findOne({_id: req.params.id}, function(err, topic) {
          if (err) {
            console.log(err);
          } else {
            res.send(topic);
          }
        });

    }
  });
};

module.exports.postTopic = function (req, res) {
  res.format({
    "application/json": function (req, res) {

      var body = req.body;
      var topic = new Topic();
      topic.title = body.title;
      topic.language = body.language;
      topic.items = body.items;

      topic.save(function(err){
        if (err)
          res.send(topic);
      });

    }
  });
};
