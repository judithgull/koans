module auth.signUp {
  "use strict";

  angular
    .module("auth.signUp")
    .config(($stateProvider:ng.ui.IStateProvider) => {
      $stateProvider
        .state("main.signUp", {
          url: "/sign-up",
          templateUrl: "auth/sign-up/sign-up.tpl.html",
          controller: "SignUpCtrl",
          controllerAs: "signUp"
        });
    });
}
