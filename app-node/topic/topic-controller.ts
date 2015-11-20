var url = require("url");
var Topic = require("./topic-model.js");
var jwt = require("jwt-simple");
var secret = 'veryBigSecret...';

module.exports.getTopics = function (req, res) {
  res.format({
    "application/json": function (req, res) {
      Topic
        .find({}, function (err, topics) {
          if (err) {
            console.log(err);
          } else {
            res.send(topics);
          }
        }).sort({_id: -1});

    }
  });
};

module.exports.getTopic = function (req, res) {
  res.format({
    "application/json": function (req, res) {
      Topic
        .findOne({_id: req.params.id}, function (err, topic) {
          if (err) {
            console.log(err);
          } else {
            res.send(topic);
          }
        });

    }
  });
};


module.exports.deleteTopic = function (req, res) {
  res.format({
    "application/json": function (req, res) {
      checkAuthorOfOwnTopic(req,
        (err) => {
          res.status(401).send({message: err});
        },
        () => {
          Topic
            .remove({_id: req.params.id}, function (err) {
              if (err) {
                res.status(401).send({message: 'Error removing item' + req.params.id});
              } else {
                res.status(200).send({message: 'ok'});
              }
            });
        });
    }
  });
};

module.exports.updateTopic = function (req, res) {
  res.format({
    "application/json": function (req, res) {
      checkAuthorOfOwnTopic(req,
        (err) => {
          res.status(401).send({message: err});
        },
        () => {
          var body = req.body;

          Topic
            .update(
            {_id: req.params.id},
            {$set: {'title': body.title, 'language': body.language, 'items': body.items}},
            function (err) {
              if (err) {
                res.status(401).send({message: 'Error updating Topic ' + req.params.id});
              } else {
                res.status(200).send({message: 'ok'});
              }
            });
        });
    }
  });
};


var checkAuthorOfOwnTopic = (req, error:Function, success:Function) => {
  var payload = decodeToken(req);
  if(!payload){
    error('You are not authorized');
  }else {
    var userId = payload.sub;

    Topic
      .findOne({_id: req.params.id}, function (err, topic) {
        if (err) {
          error(err);
        } else if (topic.authorId === userId) {
          success();
        } else {
          error('You are only allowed to modify your own topic!');
        }
      });
  }
};

var hasValidTocken = (req) => {
  return !!decodeToken(req);
};

var getUserId = (req):string => {
  var payload = decodeToken(req);
  return payload.sub;
};

var decodeToken = (req) => {
  if (!req.headers || !req.headers.authorization) {
    return null;
  }
  var token = req.headers.authorization.split(' ')[1];
  return jwt.decode(token, secret);
};

module.exports.postTopic = function (req, res) {
  res.format({
    "application/json": function (req, res) {
      if (!hasValidTocken(req)) {
        res.status(401).send({message: 'Login Required!'});
      } else {
        var body = req.body;
        var topic = new Topic();
        topic.title = body.title;
        topic.language = body.language;
        topic.items = body.items;
        topic.authorId = getUserId(req);

        topic.save(function (err) {
          if (err)
            res.send(topic);
        });
      }
    }
  });
};
