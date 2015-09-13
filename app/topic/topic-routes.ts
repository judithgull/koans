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
        params: {
          exId: 1
        },
        templateUrl: 'topic/topic.tpl.html',
        controller: 'TopicCtrl',
        controllerAs: 'topic',
        resolve: {
          topicData: function (RestClient:RestClient.IRestClient, $stateParams) {
            return RestClient.getTopic($stateParams.topicId);
          }
        }
      }).state('topic.run', {
        url: '/run/:exId',
        templateUrl: 'run/run.tpl.html',
        controller: 'RunCtrl',
        controllerAs: 'run',
        resolve: {
          exData: function (RestClient:RestClient.IRestClient, $stateParams) {
            return RestClient.getExercise($stateParams.topicId, $stateParams.exId);
          }
        }
      });
  }
}
