///<reference path='../../typings/tsd.d.ts' />
///<reference path='../data/topic.ts' />
///<reference path='../run/rest-client-service.ts' />
module TopicCtrl {
  'use strict';

  class TopicCtrl {

    exerciseId: number = 1;
    data:Data.ITopic;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['RestClient'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(private restClient:RestClient.IRestClient) {
      this.data = restClient.getTopic();
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
