///<reference path='../../typings/tsd.d.ts' />
module auth {
  'use strict';

  interface IValidators extends ng.IModelValidators {
    email: (modelValue:any, viewValue:any) => boolean;
  }

  /**
   * @ngdoc directive
   * @name auth.directive:validateEmail
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
   <example module="auth">
   input(validate-email='')
   </example>
   *
   */
  angular
    .module('auth')
    .directive('validateEmail', validateEmail);

  function validateEmail():ng.IDirective {
    var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, elm, attrs, ctrl:ng.INgModelController) {
        // only apply the validator if ngModel is present and Angular has added the email validator
        if (ctrl && (<IValidators>ctrl.$validators).email) {
          // overwrite the default Angular email validator
          (<IValidators>ctrl.$validators).email = function (modelValue) {
            return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
          };
        }
      }
    };
  };
}
