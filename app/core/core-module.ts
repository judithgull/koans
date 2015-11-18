module core {
  'use strict';

  /* @ngdoc object
  * @name core
  * @description
  *
  */
  angular
    .module('core', [])
    .config(($urlMatcherFactoryProvider:angular.ui.IUrlMatcherFactory) => {
      $urlMatcherFactoryProvider.caseInsensitive(true);
      $urlMatcherFactoryProvider.strictMode(false);
    });
}
