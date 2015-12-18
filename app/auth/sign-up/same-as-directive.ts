module auth.signUp {
  "use strict";

  /**
   * @ngdoc directive
   * @name auth.signUp.directive:sameAs
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
   <example module="auth.signUp">
   <file name="index.html">
   <form name="form">
   <input name="password" ng-model="model.password" type="password">
   <input name="passwordRepeated" ng-model="model.passwordRepeated" type="password" same-as="model.password">
   </form>
   </file>
   </example>
   *
   */
  angular
    .module("auth.signUp")
    .directive("sameAs", ():ng.IDirective => {
      return {
        restrict: "A",
        require: "ngModel",
        link: (scope:ng.IScope, elm:JQuery, attrs:ng.IAttributes, ngModel:ng.INgModelController) => {
          const otherModel = attrs["sameAs"];
          ngModel.$validators["same-as"] = (value) => scope.$eval(otherModel) === value;

          //trigger validation when other model value specified in attrs.sameAs is changed
          scope.$watch(otherModel, ngModel.$validate);

        }
      }
    })
}
