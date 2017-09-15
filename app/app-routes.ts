import * as angular from "angular";
import {IUrlRouterProvider, IStateProvider} from "angular-ui-router";

declare const require:any;

 export const appRoutes = ($urlRouterProvider, $stateProvider) => {
      $urlRouterProvider.otherwise("topic-list");
      $stateProvider
        .state("main", {
          url: "",
          abstract: true,
          template: require("./header/header.tpl")
        });
      $stateProvider
        .state("main.home", {
          url: "",
          abstract: true,
          template: require("./header/header-home.tpl")
        });
    };

