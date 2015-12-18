module koans {
  "use strict";

  angular
    .module("koans")
    .config(config);


  function config($urlRouterProvider:ng.ui.IUrlRouterProvider, $stateProvider:ng.ui.IStateProvider) {
    $urlRouterProvider.otherwise("topic-list");
    $stateProvider
      .state("main", {
        url: "",
        abstract: true,
        templateUrl: "header/header.tpl.html",
        controller: "HeaderCtrl",
        controllerAs: "header"
      });
    $stateProvider
      .state("main.home", {
        url: "",
        abstract: true,
        templateUrl: "header/header-home.tpl.html",
        controller: "HeaderCtrl",
        controllerAs: "header"
      });
  }
}
