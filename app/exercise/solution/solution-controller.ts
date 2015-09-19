///<reference path='../../../typings/tsd.d.ts' />
///<reference path='../../data/topic.ts' />
///<reference path='../../topic/topic-controller.ts' />

module SolutionCtrl {
  'use strict';

  class SolutionCtrl {

    solutionData:string;
    solutionEditor:AceAjax.Editor;

    public static $inject = ['exData', '$state'];


    constructor(exData:Data.IExercise, private $state:angular.ui.IStateService) {
      this.solutionData = exData.solution;
    }

    public createSolutionDataLoader() {
      return (solutionEditor:AceAjax.Editor) => {
        this.solutionEditor = solutionEditor;
        this.solutionEditor.setValue(this.solutionData);
      };
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
