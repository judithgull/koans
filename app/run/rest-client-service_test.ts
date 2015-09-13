///<reference path='../../typings/tsd.d.ts' />
///<reference path='rest-client-service.ts' />

/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('RestClient', function () {
  var restClient:RestClient.IRestClient;
  var $httpBackend, requestHandler;

  beforeEach(module("run"));

  beforeEach(inject(function ($injector, RestClient) {
    restClient = RestClient;
    $httpBackend = $injector.get("$httpBackend");

    requestHandler = $httpBackend.when("GET", "/data/newData.json").respond(
      [{
        "id": 1,
        "title": "Addition",
        "items": [
          {
            "id": 1,
            "language": "typescript",
            "title": "Type Declaration",
            "description": "Typescript is strongly typed: A variable is assigned a type, that cannot be changed.",
            "exercise": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = 0;\n});",
            "solution": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = false;\n});"
          },
          {
            "id": 2,
            "language": "typescript",
            "title": "Type Declaration1",
            "description": "Typescript is strongly typed: A variable is assigned a type, that cannot be changed.",
            "exercise": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = 0;\n});",
            "solution": "describe('Type Declaration', function () {\n\n  //Types are denoted by :\n  var name: string = \"Anna\";\n  var isEmpty:boolean = false;\n  var age: number = 16;\n\n  //TODO fix the assignment value to make the program compile:\n  isEmpty = false;\n});"
          },
          {
            "id": 3,
            "language": "typescript",
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
    $httpBackend.expectGET("/data/newData.json");
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
});
