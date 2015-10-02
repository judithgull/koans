module ExerciseCtrl {
  'use strict';

  class ExerciseCtrl {
    exData:Data.IExercise;

    language:string;
    title:string;
    description:string;
    content:string;

    errors:Array<Data.IError> = [];

    successMessage:string = "You are great!!!";
    success = false;
    libsLoader = () => this.libs;

    public static $inject = ['exData', 'topicData', '$state', '$scope', 'AceTsService', 'libs'];

    constructor(exData:Data.IExercise, topicData:Data.ITopic, private $state:angular.ui.IStateService, private $scope:ng.IScope, private AceTsService:AceTsService.IAceTsService, private libs) {
      this.exData = exData;
      this.content = exData.exercise;
      this.language = topicData.language;
      this.title = this.exData.title;
      this.description = this.exData.description;
    }


    public giveUp() {
      this.$state.go("topic.exercise.solution");
    }

    public isSolution() {
      return this.$state.is("topic.exercise.solution");
    }
  }

  /**
   * @ngdoc object
   * @name exercise.controller:ExerciseCtrl
   *
   * @description
   *
   */
  angular
    .module('exercise')
    .controller('ExerciseCtrl', ExerciseCtrl);
}
