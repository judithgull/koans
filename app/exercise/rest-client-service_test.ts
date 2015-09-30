///<reference path='../../typings/tsd.d.ts' />
/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('RestClient', function () {
  var restClient:RestClient.IRestClient;
  var $httpBackend, requestHandler;
  var tsLibName = "typescripts/lib.d.ts";

  beforeEach(module("exercise"));

  beforeEach(inject(function ($injector, RestClient) {
    restClient = RestClient;
    $httpBackend = $injector.get("$httpBackend");
    $httpBackend.when("GET", tsLibName).respond("lib");

    requestHandler = $httpBackend.when("GET", "/data/sampleData.json").respond(
      [{
        "id": 1,
        "title": "Addition",
        "language": "typescript",
        "items": [
          {
            "id": 1,
            "title": "Type Declaration",
            "description": "Typescript is strongly typed: A variable is assigned a type, that cannot be changed.",
            "exercise": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = 0;\n});",
            "solution": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = false;\n});"
          },
          {
            "id": 2,
            "title": "Type Declaration1",
            "description": "Typescript is strongly typed: A variable is assigned a type, that cannot be changed.",
            "exercise": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = 0;\n});",
            "solution": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = false;\n});"
          },
          {
            "id": 3,
            "title": "Type Declaration2",
            "description": "Typescript is strongly typed: A variable is assigned a type, that cannot be changed.",
            "exercise": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = 0;\n});",
            "solution": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = false;\n});"
          }
        ]
      }]
    );

  }));


  it('should return a topic with the correct attributes', function () {
    $httpBackend.expectGET("/data/sampleData.json");
    var topicPromise = restClient.getTopic(0);
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
