///<reference path="../typings/tsd.d.ts" />
module app {
  "use strict";

  /** @ngdoc object
   * @name app
   * @description main entry point
   *
   */
  var app = angular.module("app", [
    "ui.router",
    "ngAria",
    "ui.ace",
    "codeEditor",
    "topicList",
    "topic",
    "topic.exercise",
    "editTopic",
    "auth",
    "header",
    "auth.signUp",
    "auth.login",
    "auth.account",
    "ngAnimate"
  ]);

  app.run(["$rootScope", "$log", function ($rootScope, $log) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        $log.error("statechange error: " + error);
        $log.error(error);
        $log.error(toState);
        $log.error(toParams);
        if (error.status && error.status === 404) {
          (<Toastr>toastr).error(error.statusText);
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      }
    );
  }]);

}
