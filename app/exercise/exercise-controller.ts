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
    exerciseCount:number;
    solutionClicked:boolean;

    libsLoader = () => this.libs;

    onError = (errors:Array<Data.IError>) => {
      this.success = false;
      this.errors = errors;
      this.$timeout(() => {this.$scope.$digest();});
    };
    onSuccess = () => {
      if (!this.getCurrentExercise().solved) {
        this.getCurrentExercise().solved = true;
        this.nextExercise();
        this.success = true;
        this.$timeout(() => {this.$scope.$apply();});
      }

    };

    getExerciseId = () => this.id +1;

    nextExercise() {
      if (this.hasNextExercise()) {
        this.goToExercise(this.getExerciseId() + 1);
      }
    }

    previousExercise() {
      if (this.hasPreviousExercise()) {
        this.goToExercise(this.getExerciseId() - 1);
      }
    }

    hasNextExercise = ():boolean => this.getExerciseId()  < this.exerciseCount;

    hasPreviousExercise = ():boolean => this.getExerciseId() > 1;

    private goToExercise(id:number) {
      this.$state.go("main.topic.exercise.details", {exerciseId: id});
    }

    public static $inject = ['topicData', '$state', '$scope', 'libs', '$timeout'];

    constructor(private topicData:Data.ITopic,
                private $state:angular.ui.IStateService,
                private $scope:ng.IScope,
                private libs,
                private $timeout:ng.ITimeoutService
    ) {
      this.id = this.$state.params['exerciseId'] - 1;
      this.currentExercise = this.getCurrentExercise();
      this.exerciseCount = topicData.items.length;
      this.content = this.currentExercise.exercise;
      if(!this.currentExercise.userSolution){
        this.currentExercise.userSolution = this.currentExercise.exercise;
      }
    }

    giveUp() {
      this.solutionClicked = !this.solutionClicked;
      if(this.solutionClicked) {
        this.getCurrentExercise().solutionRequested = true;
        this.$state.go("main.topic.exercise.solution");
      } else {
        this.$state.go("main.topic.exercise.details");
      }
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
