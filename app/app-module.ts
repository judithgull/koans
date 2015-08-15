///<reference path='../typings/tsd.d.ts' />
module koans {
  'use strict';

  /* @ngdoc object
   * @name koans
   * @description
   *
   */
  angular
    .module('koans', [
      'ui.router',
      'ui.ace',
      'home',
      'run'
    ]);
}
