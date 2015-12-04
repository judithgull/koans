module ExerciseCtrl {
  import IExercise = Data.IExercise;
  'use strict';

  class ExerciseCtrl {
    currentExercise:IExercise;
    content:string;

    errors:Array<Data.IError> = [];
    successMessage:string = "Great job!!!";
    success = false;
    id:number;

    libsLoader = () => this.libs;

    onError = (errors:Array<Data.IError>) => {
      this.success = false;
      this.errors = errors;
      this.$timeout(() => {this.$scope.$digest();});
    };
    onSuccess = () => {
      this.success = true;
      this.getCurrentExercise().solved = true;
      this.$timeout(() => {this.$scope.$apply();});
    };

    public static $inject = ['topicData', '$state', '$scope', 'libs', '$timeout'];

    constructor(private topicData:Data.ITopic,
                private $state:angular.ui.IStateService,
                private $scope:ng.IScope,
                private libs,
                private $timeout:ng.ITimeoutService
    ) {
      this.id = this.$state.params['exerciseId'] - 1;
      this.currentExercise = this.getCurrentExercise();
      this.content = this.currentExercise.exercise;
      if(!this.currentExercise.userSolution){
        this.currentExercise.userSolution = this.currentExercise.exercise;
      }
    }

    public giveUp() {
      this.getCurrentExercise().solutionRequested = true;
      this.$state.go("main.topic.exercise.solution");
    }

    private getCurrentExercise = () => this.topicData.items[this.id];

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
