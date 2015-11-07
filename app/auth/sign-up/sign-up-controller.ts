///<reference path='../../../typings/tsd.d.ts' />
module signUp.SignUpCtrl {
  'use strict';

  export class SignUpCtrl {

    public static $inject = [
    ];

    // dependencies are injected via AngularJS $injector
    constructor(public user:app.IUser) {
      this.user = new app.User();
    }
  }


  /**
  * @ngdoc object
  * @name auth.signUp.controller:SignUpCtrl
  *
  * @description
  *
  */
  angular
    .module('auth.signUp')
    .controller('SignUpCtrl', SignUpCtrl);
}
