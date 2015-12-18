///<reference path='../../../typings/tsd.d.ts' />
module login {
  'use strict';

  angular
    .module('auth.login')
    .config(config);

  function config($stateProvider:ng.ui.IStateProvider) {
    $stateProvider
      .state('main.login', {
        url: '/login',
        templateUrl: 'auth/login/login.tpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      });
  }
}
