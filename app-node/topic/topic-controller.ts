var url = require("url");
var Topic = require("./topic-model.js");
var jwt = require("jwt-simple");
var secret = 'veryBigSecret...';
import mongoose = require('mongoose');

module.exports.getTopics = function (req, res) {
  res.format({
    "application/json": function (req, res) {
      var authorId = url.parse(req.url, true).query.authorId;
      var searchText = url.parse(req.url, true).query.search;
      var query:any = {};
      if(authorId){
        query.authorId =authorId;
      }
      if(searchText){
        query.$text = { $search: searchText};
      }

      Topic
        .find(query, function (err, topics) {
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
      findById(req)
        .then(
          (topic) => {
            if (!topic) {
              res.status(404).send({message: 'Not found'});
            } else {
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
          },
          (error) => {
            res.status(500).send({message: error});
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


var findById = function (req):mongoose.Promise<any> {
  return Topic.findOne({_id: req.params.id}).exec();
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
        } else if (topic.authorId.toString() === userId) {
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
          else{
            res.status(200).send({message: 'ok'});
          }
        });
      }
    }
  });
};
