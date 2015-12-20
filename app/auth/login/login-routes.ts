module auth.login {
  "use strict";

  angular
    .module("auth.login")
    .config(($stateProvider:ng.ui.IStateProvider) => {
      $stateProvider
        .state("main.login", {
          url: "/login",
          templateUrl: "auth/login/login.tpl.html",
          controller: "LoginCtrl",
          controllerAs: "login"
        });
    });
}
