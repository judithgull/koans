module topic {
  'use strict';

  angular
    .module('topic')
    .config(config);

  function config($stateProvider:ng.ui.IStateProvider) {
    $stateProvider
      .state('main.topic', {
        abstract: true,
        url: '/topic/{topicId}',
        templateUrl: 'topic/topic.tpl.html',
        controller: 'TopicCtrl',
        controllerAs: 'topic',
        resolve: {
          topicData: function (RestClient:RestClient.IRestClient, $stateParams) {
            return RestClient.getTopic($stateParams.topicId);
          },
          libs: function (RestClient:RestClient.IRestClient) {
            return RestClient.getDefaultLibs();
          }
        }
      }).state('main.topic.exercise', {
        abstract: true,
        url:'/exercise/{exerciseId:int}',
        params: {
          exerciseId: 1
        },
        templateUrl: '../exercise/exercise.tpl.html',
        controller: 'ExerciseCtrl',
        controllerAs: 'exercise',
        resolve: {
          exData: function (RestClient:RestClient.IRestClient, $stateParams) {
            return RestClient.getExercise($stateParams.topicId, $stateParams.exerciseId);
          }
        }
      }).state('main.topic.exercise.solution', {
        url: '/solution',
        templateUrl: '../exercise/solution/solution.tpl.html',
        controller: 'SolutionCtrl',
        controllerAs: 'solution'
      }).state('main.topic.exercise.details', {
        url: '',
        templateUrl: '../exercise/details/details.tpl.html'
      });

  }
}
