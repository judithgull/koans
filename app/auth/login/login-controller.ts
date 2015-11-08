///<reference path='../../../typings/tsd.d.ts' />
module auth.login {
  'use strict';

  export class LoginCtrl {

    email: string = null;
    password: string = null;

    public static $inject = [
    ];

    constructor() {
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
