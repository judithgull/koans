module core {
  'use strict';

  /* @ngdoc object
  * @name core
  * @description
  *
  */
  angular
    .module('core',
      ['ui.router']
    ).config(($urlMatcherFactoryProvider) => {
      $urlMatcherFactoryProvider.caseInsensitive(true);
      $urlMatcherFactoryProvider.strictMode(false);
    });
}
