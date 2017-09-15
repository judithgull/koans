import * as angular from "angular";

declare const require:any;

export  function account(){
    return {
      restrict: "E",
      scope: {},
      template: require("./account.tpl"),
      controllerAs: "account",
      controller: "AccountCtrl"
    };
  }
