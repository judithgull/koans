module auth.account {
  'use strict';

  /**
  * @ngdoc directive
  * @name auth.directive:account
  * @restrict EA
  * @element
  *
  * @description
  *
  * @example
    <example module="auth">
      <file name="index.html">
        <account></account>
      </file>
    </example>
  *
  */
  angular
    .module('auth')
    .directive('account', account);

  function account(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'auth/account/account.tpl.html',
      controllerAs: 'account',
      controller: 'AccountCtrl'
    };
  }
}
