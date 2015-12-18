//global describe, beforeEach, it, expect, inject, module*/
module ExerciseCtrl {
  "use strict";

  describe("ExerciseCtrl", function () {
    var ctrl;
    var topic = test.MockData.getTopic();

    beforeEach(angular.mock.module("exercise"));

    beforeEach(inject(function ($rootScope:ng.IRootScopeService, $controller) {
      var scope = $rootScope.$new();
      ctrl = $controller("ExerciseCtrl", {
        topicData: topic,
        $state: {
          params: {
            exerciseId: 1
          }
        },
        $scope: scope,
        libs: {}
      });
    }));

    it("should initially not have a previous exercise", () => {
      expect(ctrl.hasPreviousExercise()).toBe(false);
    });

    it("should initially have a next exercise", () => {
      expect(ctrl.hasNextExercise()).toBe(true);
    });

  });
}

