///<reference path='../typings/tsd.d.ts' />
module koans {
  'use strict';

  /* @ngdoc object
   * @name koans
   * @description
   *
   */

  var app = angular.module('koans', [
    'ui.router',
    'ui.ace',
    'home',
    'exercise',
    'topic',
    'exercise.solution'
  ]);

}
