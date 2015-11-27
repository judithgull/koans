module SolutionCtrl {
  'use strict';

  class SolutionCtrl {

    content:string;

    public static $inject = ['exData'];

    constructor(exData:Data.IExercise) {
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
    .module('exercise.solution')
    .controller('SolutionCtrl', SolutionCtrl);
}
