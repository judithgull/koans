module SolutionCtrl {
  'use strict';

  class SolutionCtrl {

    content:string;

    public static $inject = ['exData', '$state'];


    constructor(exData:Data.IExercise, private $state:angular.ui.IStateService) {
      this.content = exData.solution;
    }

    private showDetails(){
      this.$state.go("topic.exercise.details");
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
