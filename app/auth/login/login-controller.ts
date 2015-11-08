///<reference path='../../../typings/tsd.d.ts' />
module auth.login {
  'use strict';

  export class LoginCtrl {

    email: string = null;
    password: string = null;

    public static $inject = [
      'AuthService'
    ];

    constructor(private authService: IAuthService) {
    }

    submit = () => {
      this.authService.login(this.email, this.password);
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
