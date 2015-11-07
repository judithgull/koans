///<reference path='../../../typings/tsd.d.ts' />
module signUp.SignUpCtrl {
  'use strict';

  export class SignUpCtrl {

    public static $inject = ['AuthService'];

    constructor(private authService:auth.IAuthService, public user:app.IUser) {
      this.user = new app.User();
    }

    submit = () => {
      this.authService.submitUser(this.user);
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
