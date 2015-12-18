///<reference path='../../typings/tsd.d.ts' />
module editTopic {
  'use strict';

  /* @ngdoc object
   * @name edit-topic
   * @description
   *
   */
  angular
    .module('editTopic', [
      'ui.router',
      'ngMessages',
      'core',
      'codeEditor'
    ]);
}
