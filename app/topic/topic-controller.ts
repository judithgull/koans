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
    public static $inject = ['topicData', '$stateParams'];

    // dependencies are injected via AngularJS $injector
    constructor(topicData:Data.ITopic, $stateParams:ITopicParams) {
      this.data = topicData;
      this.exerciseCount = this.data.items.length;
      this.exerciseId = parseInt($stateParams.exId);
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
