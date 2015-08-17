///<reference path='../../typings/tsd.d.ts' />
module run {
  'use strict';

  angular
    .module('run')
    .config(config);

  function config($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
      .state('run', {
        url: '/run',
        templateUrl: 'run/run.tpl.html',
        controller: 'RunCtrl',
        controllerAs: 'run'
      });
  }
}
