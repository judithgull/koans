module koans {
  'use strict';

  angular
    .module('koans')
    .config(config);

  function config($urlRouterProvider: ng.ui.IUrlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}
