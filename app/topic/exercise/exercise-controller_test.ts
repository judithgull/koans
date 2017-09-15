import {MockData} from "../../core/test-util/test-util";
import {ExerciseCtrl} from "./exercise-controller";
import {describe,beforeEach,afterEach,it,inject,expect} from "jasmine";
import * as angular from "angular-mocks";

module topic.exercise {
  "use strict";

  describe("ExerciseCtrl", function () {
    var ctrl:ExerciseCtrl;
    var topic = MockData.getTopic();

    beforeEach(angular.mock.module("topic.exercise"));

    beforeEach(inject(function ($rootScope:ng.IRootScopeService, $controller) {
      var scope = $rootScope.$new();
      ctrl = <ExerciseCtrl>$controller("ExerciseCtrl", {
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

