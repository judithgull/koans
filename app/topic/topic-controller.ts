module TopicCtrl {
  'use strict';

  export interface ITopicCtrl{
    language:string;
    title:string;
    nextExercise():void;
    previousExercise():void;
    hasNextExercise():boolean;
    hasPreviousExercise():boolean;
  }

  export interface ITopicStateService extends angular.ui.IStateService{
    params: ITopicParams;
  }

  export interface ITopicParams extends angular.ui.IStateParamsService {
    exerciseId:number;
  }

  class TopicCtrl implements ITopicCtrl{
    language:string;
    title:string;
    private exerciseCount:number;

    public static $inject = ['topicData', '$state'];

    constructor(topicData:Data.ITopic, private $state:ITopicStateService) {
      this.title = topicData.title;
      this.language = topicData.language;
      this.exerciseCount = topicData.items.length;
    }

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

    private goToExercise(id:number) {
      this.$state.go("main.topic.exercise.details", {exerciseId: id});
    }

    hasNextExercise = ():boolean => this.getExerciseId()  < this.exerciseCount;

    hasPreviousExercise = ():boolean => this.getExerciseId() > 1;

    getExerciseId = () => this.$state.params.exerciseId;

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
