"use strict";

import * as request from "supertest";
import {expect} from "chai";
import * as serverModule from "../app";

describe("Topic Api", () => {


  afterEach(()=>{
    serverModule.dbConnection.disconnect();
  });

  //http://localhost:7000/topics/565f15fef731ea98413ce54e

  it("should return an error, when not authorized", (done) => {
    request(serverModule.serverApp).post("/topics")
      .send().end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body.message).not.to.be.undefined;
      done();
    });
  });

});

