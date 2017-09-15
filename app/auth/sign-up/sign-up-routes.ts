import * as angular from "angular";
import {IUrlRouterProvider, IStateProvider} from "angular-ui-router";

declare const require:any;

  export const signUpRoutes = ($stateProvider) => {
      $stateProvider
        .state("main.signUp", {
          url: "/sign-up",
          template: require("./sign-up.tpl"),
          controller: "SignUpCtrl",
          controllerAs: "signUp"
        })};