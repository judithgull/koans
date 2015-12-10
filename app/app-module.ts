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
    'ngAria',
    'ui.ace',
    'codeEditor',
    'topicList',
    'topic',
    'editTopic',
    'auth',
    'header',
    'auth.signUp',
    'auth.login',
    'auth.account',
  ]);

  app.run(['$rootScope', '$log', function ($rootScope, $log) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        $log.error('statechange error: ' + error);
        $log.error(error);
        $log.error(toState);
        $log.error(toParams);
        if(error.status && error.status === 404) {
          (<Toastr>toastr).error(error.statusText);
          setTimeout(function(){
            window.location.reload();
          }, 1000);
        }
      }
    );
  }]);

}
