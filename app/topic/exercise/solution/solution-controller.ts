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
   * @name exercise.solution.controller:SolutionCtrl
   *
   * @description
   *
   */
  angular
    .module("topic.exercise")
    .controller("SolutionCtrl", SolutionCtrl);
}
