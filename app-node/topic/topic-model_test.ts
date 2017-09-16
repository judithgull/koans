"use strict";

import * as mongoose from "mongoose";
import * as topicModel from "./topic-model";
import * as env from "../config/config";
import {expect} from "chai";

describe("TopicModel", () => {
  var conn;
  const testTopic: topicModel.ITopic = {
    title: "title",
    programmingLanguage: "typescript",
    authorId: "author",
    items: []
  };

  beforeEach(() => {
    if (!mongoose.connection) {
      conn = mongoose.connect(env.config.db);
    }
  });

  afterEach((done) => {
    topicModel.clear().then(() => {
      done();
    });
  });

  it("creates a new topic", (done) => {
    topicModel
      .create(testTopic)
      .then(
        (t) => {
          try {
            expect(t.title).to.equal("title");
            // tslint:disable-next-line:no-unused-expression
            expect(t._id).to.not.be.null;
            done();
          } catch (e) {
            done();
          }
        }
      );
  });

  describe("query", () => {
    const testId = mongoose.Types.ObjectId.createFromTime(0);

    beforeEach((done) => {
      testTopic["_id"] = testId;
      topicModel
        .create(testTopic)
        .onFulfill(() => done())
        .onReject((reason) => done(reason));
    });

    it("gets a topic by id", (done) => {
      topicModel
        .get(testId.toHexString())
        .onFulfill((found) => {
          try {
            expect(found.title).to.equal("title");
            expect(found._id.toHexString()).to.equal(testId.toHexString());
            done();
          } catch (e) {
            done();
          }
        })
        .onReject((reason) => done());
    });

    it("find one topic by search", (done) => {
      topicModel
        .find()
        .onFulfill((topics) => {
          try {
            expect(topics.length).to.equal(1);
            done();
          } catch (e) {
            done();
          }
        })
        .onReject((reason) => done());
    });

  });

});
