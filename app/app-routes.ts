module koans {
  "use strict";

  angular
    .module("app")
    .config(($urlRouterProvider:ng.ui.IUrlRouterProvider, $stateProvider:ng.ui.IStateProvider) => {
      $urlRouterProvider.otherwise("topic-list");
      $stateProvider
        .state("main", {
          url: "",
          abstract: true,
          templateUrl: "header/header.tpl.html"
        });
      $stateProvider
        .state("main.home", {
          url: "",
          abstract: true,
          templateUrl: "header/header-home.tpl.html"
        });
    });
}
