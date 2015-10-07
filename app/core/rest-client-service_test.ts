/* global describe, beforeEach, it, expect, inject, module */
module RestClient {
  'use strict';

  describe('RestClient', function () {
    var restClient:RestClient.IRestClient;
    var $httpBackend;
    var tsLibName = "typescripts/lib.d.ts";


    beforeEach(module("core"));

    beforeEach(inject(function ($injector, RestClient) {
      restClient = RestClient;
      $httpBackend = $injector.get("$httpBackend");
      $httpBackend.when("GET", tsLibName).respond("lib");
    }));

    describe("getTopic(id)", () => {

      var topic = test.MockData.getTopic();

      it('should return a topic with the correct attributes', function () {
        var testID = topic._id;
        var expectedUrl = TOPICS_URL + testID;
        $httpBackend.when("GET", expectedUrl).respond(topic);
        $httpBackend.expectGET(expectedUrl);
        var topicPromise = restClient.getTopic(testID);
        topicPromise.then(
          (data) => {
            expect(data).toEqual(topic);
          }
        );
        $httpBackend.flush();
      });
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

}
