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
      }).state('topic.exercise', {
        abstract: true,
        url: '/exercise/:exId',
        templateUrl: '../exercise/exercise.tpl.html',
        controller: 'ExerciseCtrl',
        controllerAs: 'exercise',
        resolve: {
          exData: function (RestClient:RestClient.IRestClient, $stateParams) {
            return RestClient.getExercise($stateParams.topicId, $stateParams.exId);
          },
          initAce: function(AceTsService: AceTsService.IAceTsService){
            return AceTsService.getAceInitializer(["typescripts/lib.d.ts"]);
          }
        }
      }).state('topic.exercise.solution', {
        url: '/solution',
        templateUrl: '../exercise/solution/solution.tpl.html',
        controller: 'SolutionCtrl',
        controllerAs: 'solution'
      }).state('topic.exercise.details', {
        url: '',
        templateUrl: '../exercise/details/details.tpl.html',
        controller: 'DetailsCtrl',
        controllerAs: 'details'
      });
  }
}
