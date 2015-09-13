///<reference path='../../typings/tsd.d.ts' />
///<reference path='../run/rest-client-service.ts' />

module topic {
  'use strict';

  angular
    .module('topic')
    .config(config);

  function config($stateProvider:ng.ui.IStateProvider) {
    $stateProvider
      .state('topic', {
        abstract: true,
        url: '/topic/:topicId',
        templateUrl: 'topic/topic.tpl.html',
        controller: 'TopicCtrl',
        controllerAs: 'topic',
        resolve: {
          simpleObj: function (RestClient:RestClient.IRestClient, $stateParams) {
            RestClient.loadTopic($stateParams.topicId);
          }
        }
      }).state('topic.run', {
        // url will become '/topic/run'
        url: '/run/:id',
        templateUrl: 'run/run.tpl.html',
        controller: 'RunCtrl',
        controllerAs: 'run'
      });
  }
}
