module ExerciseCtrl {
  'use strict';

  class ExerciseCtrl {

    title:string;
    description:string;
    content:string;

    errors:Array<Data.IError> = [];
    successMessage:string = "Great job!!!";
    success = false;

    libsLoader = () => this.libs;

    onError = (errors:Array<Data.IError>) => {
      this.success = false;
      this.errors = errors;
      this.$timeout(() => {this.$scope.$digest();});
    };
    onSuccess = () => {
      this.success = true;
      this.exData.solved = true;
      this.getCurrentExercise().solved = true;
      this.$timeout(() => {this.$scope.$apply();});
    };

    public static $inject = ['topicData','exData', '$state', '$scope', 'libs', '$timeout'];

    constructor(private topicData:Data.ITopic,
                private exData:Data.IExercise,
                private $state:angular.ui.IStateService,
                private $scope:ng.IScope,
                private libs,
                private $timeout:ng.ITimeoutService
    ) {
      this.content = exData.exercise;
      this.title = exData.title;
      this.description = exData.description;
      if(!this.topicData.items[this.exData.sortOrder -1].userSolution){
        this.topicData.items[this.exData.sortOrder -1].userSolution = exData.exercise;
      }
    }

    public giveUp() {
      this.exData.solutionRequested = true;
      this.getCurrentExercise().solutionRequested = true;
      this.$state.go("main.topic.exercise.solution");
    }

    private getCurrentExercise = () => this.topicData.items[this.exData.sortOrder -1];

    public isSolution() {
      return this.$state.is("main.topic.exercise.solution");
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
