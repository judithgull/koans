module editTopic {
  "use strict";

  describe("EditTopicCtrl", () => {
    var ctrl:IEditTopicModel;
    var testTopic:core.ITopic;
    var topic:core.ITopic;

    beforeEach(angular.mock.module("editTopic"));

    beforeEach(inject(($rootScope, $controller) => {
      const rc = {
        createTopic: (topic:core.ITopic) => {
          testTopic = topic;
        }
      };
      const libs = [];
      ctrl = $controller("EditTopicCtrl",
        {
          "RestClient": rc,
          "libs": libs,
          topic: new core.Topic(),
          "$scope": $rootScope
        });
      topic = ctrl.topic;

    }));

    it("should have typescript as initial language", () =>  {
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

  });
}
