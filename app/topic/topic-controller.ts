///<reference path='../../typings/tsd.d.ts' />
///<reference path='../data/topic.ts' />
module TopicCtrl {
  'use strict';

  export interface ITopicParams extends angular.ui.IStateParamsService {
    exId:string;
  }

  class TopicCtrl {
    data:Data.ITopic;
    exerciseId:number;
    exerciseCount:number;
    language:string;

    public static $inject = ['topicData', '$state'];

    constructor(topicData:Data.ITopic, private $state:angular.ui.IStateService) {
      this.data = topicData;
      this.language = topicData.language;
      this.exerciseCount = this.data.items.length;
      this.exerciseId = parseInt((<ITopicParams>$state.params).exId);
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
