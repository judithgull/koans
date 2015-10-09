///<reference path='../../typings/tsd.d.ts' />
module editTopic {
  'use strict';

  angular
    .module('editTopic')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('editTopic', {
        url: '/edit-topic',
        templateUrl: 'edit-topic/edit-topic.tpl.html',
        controller: 'EditTopicCtrl',
        controllerAs: 'editTopic'
      });
  }
}
