///<reference path='../../typings/tsd.d.ts' />
module header {
  'use strict';

  angular
    .module('header')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('header', {
        url: '/header',
        templateUrl: 'header/header.tpl.html',
        controller: 'HeaderCtrl',
        controllerAs: 'header'
      });
  }
}
