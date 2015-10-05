/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('RestClient', function () {
  var restClient:RestClient.IRestClient;
  var $httpBackend, requestHandler;
  var tsLibName = "typescripts/lib.d.ts";
  var topics = test.MockData.getTopics;

  beforeEach(module("core"));

  beforeEach(inject(function ($injector, RestClient) {
    restClient = RestClient;
    $httpBackend = $injector.get("$httpBackend");
    $httpBackend.when("GET", tsLibName).respond("lib");
    requestHandler = $httpBackend.when("GET", "/topics").respond(topics);
  }));


  it('should return a topic with the correct attributes', function () {
    $httpBackend.expectGET("/topics");
    var topicPromise = restClient.getTopic(1);
    topicPromise.then(
      (data) => {
        expect(data.id).toBe(1);
        expect(data.title).toBe("Addition");
        expect(data.items[0].title).toBe("Type Declaration");
      }
    );
    $httpBackend.flush();
  });

  it('should return the typescript default library ', function () {
    $httpBackend.expectGET(tsLibName);
    var libPromise = restClient.getLib(tsLibName);

    libPromise.then(
      (lib) => {
        expect(lib.content).toBe("lib");
        expect(lib.name).toBe(tsLibName);
      }
    );
    $httpBackend.flush();
  });

  it('should return an Array with the typescript default library ', () => {
    $httpBackend.expectGET(tsLibName);
    var libsPromise = restClient.getLibs([tsLibName]);

    libsPromise.then(
      (libs) => {
        expect(libs.length).toBe(1);
        expect(libs[0].content).toBe("lib");
        expect(libs[0].name).toBe(tsLibName);
      }
    );
    $httpBackend.flush();
  });

});
