module SolutionCtrl {
  "use strict";

  class SolutionCtrl {

    content:string;

    public static $inject = ["exData"];

    constructor(exData:core.IExercise) {
      this.content = exData.solution;
    }

  }


  /**
   * @ngdoc object
   * @name topic.exercise.solution.controller:SolutionCtrl
   *
   * @description Controller for showing solution
   *
   */
  angular
    .module("topic.exercise")
    .controller("SolutionCtrl", SolutionCtrl);
}
