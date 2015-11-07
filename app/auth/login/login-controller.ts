///<reference path='../../../typings/tsd.d.ts' />
module LoginCtrl {
  'use strict';

  class LoginCtrl {

    ctrlName: string

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = [
    ];

    // dependencies are injected via AngularJS $injector
    constructor() {
      var vm = this;
      vm.ctrlName = 'LoginCtrl';
    }
  }


  /**
  * @ngdoc object
  * @name auth.login.controller:LoginCtrl
  *
  * @description
  *
  */
  angular
    .module('auth.login')
    .controller('LoginCtrl', LoginCtrl);
}
