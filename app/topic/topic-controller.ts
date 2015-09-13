///<reference path='../../typings/tsd.d.ts' />
///<reference path='../data/topic.ts' />
module TopicCtrl {
  'use strict';

  class TopicCtrl {
    data:Data.ITopic;

    exerciseId: number = 1;
    exerciseCount:number;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['topicData'];

    // dependencies are injected via AngularJS $injector
    constructor(topicData:Data.ITopic) {
      this.data = topicData;
      this.exerciseCount = this.data.items.length;
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
