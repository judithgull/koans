module topicList {
  'use strict';

  angular
    .module('topicList')
    .config(config);

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('main.topicList', {
        url: '/topic-list',
        templateUrl: 'topic-list/topic-list.tpl.html',
        controller: 'TopicListCtrl',
        controllerAs: 'topicList'
      });
  }
}
