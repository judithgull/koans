///<reference path="../../typings/tsd.d.ts" />
module editTopic {
  /* global describe, beforeEach, it, expect, inject, module */
  "use strict";

  describe("EditTopicCtrl", function () {
    var ctrl:IEditTopicModel;
    var testTopic:Data.ITopic;
    var topic:Data.ITopic;

    beforeEach(angular.mock.module("editTopic"));

    beforeEach(inject(function ($rootScope, $controller, $state:angular.ui.IStateService) {
      const rc = {
        createTopic: (topic:Data.ITopic) => {
          testTopic = topic
        }
      };
      const libs = [];
      ctrl = $controller("EditTopicCtrl",
        {
          "RestClient": rc,
          "libs": libs,
          topic: new Topic(),
          "$scope": $rootScope
        });
      topic = ctrl.topic;

    }));

    it("should have typescript as initial language", function () {
      expect(topic.programmingLanguage).toEqual("typescript");
    });

    it("should have 1 item initially", () => {
      expect(topic.items.length).toBe(1);
    });

    it("should add a new exercise on addExercise", ()=> {
      ctrl.addExercise();
      expect(topic.items.length).toBe(2);
    });

    it("should remove an exercise on removeExercise", ()=> {
      ctrl.removeExercise(0);
      expect(topic.items.length).toBe(0);
    });

    it("should only remove one exercise", ()=> {
      ctrl.addExercise();
      ctrl.removeExercise(0);
      expect(topic.items.length).toBe(1);
    });

    //
    //it("should call createTopic with the correct arguments", () => {
    //  const testTitle = "testTitle";
    //  const testLanguage = "javascript";
    //  const testExercise = "testExercise";
    //
    //  topic.title = testTitle;
    //  topic.language = testLanguage;
    //  topic.items[0].exercise = testExercise;
    //
    //  ctrl.submit();
    //
    //  expect(testTopic.language).toEqual(testLanguage);
    //  expect(testTopic.title).toEqual(testTitle);
    //  expect(testTopic.items[0].exercise).toEqual(testExercise);
    //});
    //
    //it("should have different sort order", ()=> {
    //  ctrl.addExercise();
    //  ctrl.addExercise();
    //
    //  ctrl.submit();
    //
    //  expect(topic.items[0].sortOrder).toBe(1);
    //  expect(topic.items[1].sortOrder).toBe(2);
    //  expect(topic.items[2].sortOrder).toBe(3);
    //
    //});

  });
}
