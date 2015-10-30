module koans {
  'use strict';

  angular
    .module('koans')
    .config(config);


  function config($urlRouterProvider: ng.ui.IUrlRouterProvider, $stateProvider: ng.ui.IStateProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('main', {
        url: '',
        abstract: true,
        templateUrl: 'header/header.tpl.html',
        controller: 'HeaderCtrl',
        controllerAs: 'header'
      });
  }
}
