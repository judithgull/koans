///<reference path='../../typings/tsd.d.ts' />
module auth {
  'use strict';

  angular
    .module('auth')
    .config(config)

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('auth', {
        url: '/auth',
        templateUrl: 'auth/auth.tpl.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      });
  }
}
