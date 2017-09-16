import {MockData} from "../../core/test-util/test-util";
import {ExerciseCtrl} from "./exercise-controller";
import {} from "jasmine";
import * as angular from "angular";
import "angular-mocks";

module topic.exercise {
  "use strict";

  describe("ExerciseCtrl", function() {
    var ctrl:ExerciseCtrl;
    const topic = MockData.getTopic();

    beforeEach(angular.mock.module("topic.exercise"));

    beforeEach(inject(function($rootScope:ng.IRootScopeService, $controller) {
      const scope = $rootScope.$new();
      ctrl = $controller("ExerciseCtrl", {
        topicData: topic,
        $state: {
          params: {
            exerciseId: 1
          }
        },
        $scope: scope,
        libs: {}
      }) as ExerciseCtrl;
    }));

    it("should initially not have a previous exercise", () => {
      expect(ctrl.hasPreviousExercise()).toBe(false);
    });

    it("should initially have a next exercise", () => {
      expect(ctrl.hasNextExercise()).toBe(true);
    });

  });
}

