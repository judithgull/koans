/* global describe, beforeEach, it, expect, inject, module */
"use strict";

import request = require("supertest");
import chai = require("chai");
import serverModule = require("../app");

var expect = chai.expect;

describe("Topic Api", () => {

  it("should return an error, when not authorized", (done) => {
    request(serverModule.serverApp)
      .post("/topics").send().end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body.message).not.to.be.undefined;
      done();
    });
  });

});

