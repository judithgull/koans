///<reference path='../../../typings/tsd.d.ts' />
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
      link: function (scope, elm, attrs, ctrl:ng.INgModelController) {
        ctrl.$parsers.unshift(function (viewValue) {
          var noMatch = viewValue != scope.signUpForm.password.$viewValue;
          ctrl.$setValidity('same-as', !noMatch)
        });
      }
    }
  };
}
