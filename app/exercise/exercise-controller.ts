module ExerciseCtrl {
  'use strict';

  class ExerciseCtrl {

    title:string;
    description:string;
    content:string;

    errors:Array<Data.IError> = [];
    successMessage:string = "You are great!!!";
    success = false;

    libsLoader = () => this.libs;

    onError = (errors:Array<Data.IError>) => {
      this.success = false;
      this.errors = errors;
      this.$scope.$digest();
    };
    onSuccess = () => {
      this.success = true;
      this.$scope.$digest();
    };

    public static $inject = ['exData', 'topicData', '$state', '$scope', 'AceTsService', 'libs'];

    constructor(exData:Data.IExercise, topicData:Data.ITopic, private $state:angular.ui.IStateService, private $scope:ng.IScope, private AceTsService:AceTsService.IAceTsService, private libs) {
      this.content = exData.exercise;
      this.title = exData.title;
      this.description = exData.description;
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
