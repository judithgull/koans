"use strict";

import * as request from "supertest";
import {expect} from "chai";
import * as serverModule from "../app";
import * as topicModel from "./topic-model";

describe("Topic Api", () => {
  let testId = null;

  /**
   * insert test data
   * */
  beforeEach((done)=> {
    const testTopic: topicModel.ITopic = {
      title: "title",
      programmingLanguage: "typescript",
      authorId: "author",
      items: []
    };
    topicModel
      .create(testTopic)
      .then((item) => {
        testId = item._id.toHexString();
        done();
      });
  });

  afterEach((done) => {
    topicModel.clear().then(() => {
      done();
    });
  });


  it("should get a test topic", (done) => {
    request(serverModule.serverApp)
      .get("/topics/" + testId)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(res.text);
          return done(err);
        }
        done();
      });
  });

  it("should return an error, when not authorized", (done) => {
    request(serverModule.serverApp)
      .post("/topics")
      .set("Accept", "application/json")
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).not.to.be.undefined;
        done();
      });
  });

});

