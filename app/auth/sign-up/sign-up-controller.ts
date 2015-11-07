///<reference path='../../../typings/tsd.d.ts' />
module signUp.SignUpCtrl {
  'use strict';

  export class SignUpCtrl {

    public static $inject = ['AuthService'];

    constructor(authService:auth.IAuthService, public user:app.IUser) {
      this.user = new app.User();
    }

    submit = () => {
      console.log(this.user);
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
