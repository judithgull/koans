///<reference path='../../typings/tsd.d.ts' />
///<reference path='../data/topic.ts' />
module TopicCtrl {
  'use strict';

  interface ITopicParams extends angular.ui.IStateParamsService {
    exId:string;
  }

  class TopicCtrl {
    data:Data.ITopic;
    exerciseId:number;
    exerciseCount:number;
    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['topicData', '$stateParams', '$state'];

    // dependencies are injected via AngularJS $injector
    constructor(topicData:Data.ITopic, $stateParams:ITopicParams, private $state:angular.ui.IStateService) {
      this.data = topicData;
      this.exerciseCount = this.data.items.length;
      this.exerciseId = parseInt($stateParams.exId);
    }

    public nextExercise() {
      if (this.hasNextExercise()) {
        this.goToExercise(this.exerciseId + 1);
      }
    }

    public previousExercise() {
      if (this.hasPreviousExercise()) {
        this.goToExercise(this.exerciseId - 1);
      }
    }

    private goToExercise(id:number) {
      this.$state.go("topic.exercise.details", {exId: id});
    }

    public hasNextExercise():boolean {
      return this.exerciseId < this.exerciseCount;
    }

    public hasPreviousExercise():boolean {
      return this.exerciseId > 1;
    }

  }


  /**
  * @ngdoc object
  * @name topic.controller:TopicCtrl
  *
  * @description
  *
  */
  angular
    .module('topic')
    .controller('TopicCtrl', TopicCtrl);
}
