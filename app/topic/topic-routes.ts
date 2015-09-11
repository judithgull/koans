///<reference path='../../typings/tsd.d.ts' />
///<reference path='../run/rest-client-service.ts' />

module topic {
  'use strict';

  angular
    .module('topic')
    .config(config);

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('topic', {
        abstract: true,
        url: '/topic',
        templateUrl: 'topic/topic.tpl.html'
      }).state('topic.run', {
        // url will become '/topic/run'
        url: '/run',
        templateUrl: 'run/run.tpl.html',
        controller: 'RunCtrl',
        controllerAs: 'run',
        resolve: {
          simpleObj: function(RestClient: RestClient.IRestClient){
            RestClient.loadTopic();
          }
        }
      });
  }
}
