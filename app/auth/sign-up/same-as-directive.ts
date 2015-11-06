module auth.signUp {
  'use strict';

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
   <same-as></same-as>
   </file>
   </example>
   *
   */
  angular
    .module('auth.signUp')
    .directive('sameAs', sameAs);

    function sameAs():ng.IDirective {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: (scope, elm, attrs, ngModel:ng.INgModelController) => {
          const otherModel = attrs.sameAs;
          ngModel.$validators['same-as'] = (value) => scope.$eval(otherModel) == value;

          //trigger validation when other model value specified in attrs.sameAs is changed
          scope.$watch(otherModel, ngModel.$validate);

        }
      }
    }
}
