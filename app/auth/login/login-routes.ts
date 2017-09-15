import * as angular from "angular";

declare const require:any;

 export const loginRoutes = ($stateProvider) => {
      $stateProvider
        .state("main.login", {
          url: "/login",
          template: require("./login.tpl"),
          controller: "LoginCtrl",
          controllerAs: "login"
        });
    };
