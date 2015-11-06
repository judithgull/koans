///<reference path='../typings/tsd.d.ts' />
module koans {
  'use strict';

  /* @ngdoc object
   * @name koans
   * @description
   *
   */

  var app = angular.module('koans', [
    'ui.router',
    'ui.ace',
    'codeEditor',
    'home',
    'topic',
    'editTopic',
    'auth',
    'header',
    'auth.signUp'
  ]);

  app.run(['$rootScope', '$log',function($rootScope, $log) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        $log.error("statechange error: " + error);
        $log.error(toState);
        $log.error(toParams);
      }
  )}]);

}
