'use strict';

import * as url from 'url';
import * as TopicModel from './topic-model';
import * as jwt from 'jwt-simple';
import * as userCtrl from '../user/user-controller';

var decodeToken = req => {
  if (!req.headers || !req.headers.authorization) {
    return null;
  }
  var token = req.headers.authorization.split(' ')[1];
  return jwt.decode(token, userCtrl.getSecret());
};

var isAuthorOfOwnTopic = (topic, req): boolean => {
  var payload = decodeToken(req);
  return payload ? topic.authorId.toString() === payload.sub : false;
};

var hasValidTocken = req => {
  return !!decodeToken(req);
};

var getUserId = (req): String => {
  var payload = decodeToken(req);
  return payload.sub;
};

export const getTopics = function(req, res) {
  res.format({
    'application/json': function(req, res) {
      const query = url.parse(req.url, true).query;

      TopicModel.find(query.authorId, query.search).then(topics =>
        res.send(topics)
      );
    }
  });
};

export const getTopic = function(req, res) {
  res.format({
    'application/json': (req, res) => {
      TopicModel.get(req.params.id)
        .onFulfill(topic => {
          if (!topic) {
            res.status(404).send({ message: 'Not found' });
          } else {
            res.send(topic);
          }
        })
        .onReject(reason => res.status(500).send(reason));
    }
  });
};

export const deleteTopic = function(req, res) {
  res.format({
    'application/json': function(req, res) {
      TopicModel.get(req.params.id).then(
        topic => {
          if (!topic) {
            res.status(404).send({ message: 'Not found' });
          } else if (!isAuthorOfOwnTopic(topic, req)) {
            res.status(401).send({ message: 'Not authorized' });
          } else {
            TopicModel.remove(req.params.id)
              .onFulfill(() => res.status(200).send({ message: 'ok' }))
              .onReject(() =>
                res
                  .status(401)
                  .send({ message: 'Error removing item' + req.params.id })
              );
          }
        },
        error => {
          res.status(500).send({ message: error });
        }
      );
    }
  });
};

export const updateTopic = function(req, res) {
  res.format({
    'application/json': function(req, res) {
      TopicModel.get(req.params.id).then(
        topic => {
          if (!topic) {
            res.status(404).send({ message: 'Not found' });
          } else if (!isAuthorOfOwnTopic(topic, req)) {
            res.status(401).send({ message: 'Not authorized' });
          } else {
            var body = req.body;
            TopicModel.Topic.findOneAndUpdate(
              { _id: req.params.id },
              {
                $set: {
                  title: body.title,
                  programmingLanguage: body.programmingLanguage,
                  items: body.items
                }
              }
            ).then(
              t => {
                res.send(t);
              },
              e => {
                res.status(401).send(e);
              }
            );
          }
        },
        error => {
          res.status(500).send({ message: error });
        }
      );
    }
  });
};

export const postTopic = function(req, res) {
  res.format({
    'application/json': function(req, res) {
      if (!hasValidTocken(req)) {
        res.status(401).send({ message: 'Login Required!' });
      } else {
        const body = req.body;
        const newTopic: TopicModel.ITopic = {
          title: body.title,
          programmingLanguage: body.programmingLanguage,
          authorId: getUserId(req),
          items: body.items
        };

        TopicModel.create(newTopic)
          .onFulfill(t => res.send(t))
          .onReject(reason => res.send(reason));
      }
    }
  });
};
