module TopicCtrl {
  'use strict';

  export interface ITopicCtrl {
    programmingLanguage:string;
    title:string;
  }

  export interface ITopicStateService extends angular.ui.IStateService {
    params: ITopicParams;
  }

  export interface ITopicParams extends angular.ui.IStateParamsService {
    exerciseId:number;
  }

  class TopicCtrl implements ITopicCtrl {
    programmingLanguage:string;
    title:string;
    private exerciseCount:number;

    public static $inject = ['topicData', '$state'];

    constructor(public topicData:Data.ITopic, private $state:ITopicStateService) {
      this.title = topicData.title;
      this.programmingLanguage = topicData.programmingLanguage;
      this.exerciseCount = topicData.items.length;
    }

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
