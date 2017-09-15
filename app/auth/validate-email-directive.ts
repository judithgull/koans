
  /**
   * @ngdoc directive
   * @name auth.directive:validateEmail
   * @restrict A
   *
   * @description validate if e-mail is valid. Overwrite the default Angular email validator.
   *
   * @example
   <example module="auth">
   <input validate-email>
   </example>
   *
   **/
  angular
    .module("auth")
    .directive("validateEmail", ():ng.IDirective => {
      const EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

      return {
        require: "ngModel",
        restrict: "A",
        link: (scope, elm, attrs, ctrl:ng.INgModelController) => {
          if (ctrl && ctrl.$validators["email"]) {
            ctrl.$validators["email"] =
              (modelValue) => ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
          }
        }
      };
    });

