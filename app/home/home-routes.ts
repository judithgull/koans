///<reference path='../../typings/tsd.d.ts' />
module home {
  'use strict';

  angular
    .module('home')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/home.tpl.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      });
  }
}
