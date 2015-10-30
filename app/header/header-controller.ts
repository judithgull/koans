module HeaderCtrl {
  'use strict';

  class HeaderCtrl {

    public static $inject = [
    ];

    // dependencies are injected via AngularJS $injector
    constructor() {
    }
  }


  /**
  * @ngdoc object
  * @name header.controller:HeaderCtrl
  *
  * @description
  *
  */
  angular
    .module('header')
    .controller('HeaderCtrl', HeaderCtrl);
}
