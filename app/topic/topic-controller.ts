module TopicCtrl {
  'use strict';

  export interface ITopicCtrl{
    language:string;
    title:string;
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

    constructor(public topicData:Data.ITopic, private $state:ITopicStateService) {
      this.title = topicData.title;
      this.language = topicData.programmingLanguage;
      this.exerciseCount = topicData.items.length;
    }

    getExerciseId = () => this.$state.params.exerciseId;

    allExercisesSolved = () => this.topicData.items.every((exercise) => exercise.solved === true && exercise.solutionRequested != true
    );
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
