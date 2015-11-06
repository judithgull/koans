module auth {
  'use strict';

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
        // overwrite the default Angular email validator
        if (ctrl && ctrl.$validators['email']) {
          ctrl.$validators['email'] =
          (modelValue) => ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        }
      }
    };
  };
}
