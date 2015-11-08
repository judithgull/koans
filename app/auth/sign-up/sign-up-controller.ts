///<reference path='../../../typings/tsd.d.ts' />
module signUp.SignUpCtrl {
  'use strict';

  export class SignUpCtrl {
    public static $inject = ['AuthService', '$state' ];

    constructor(private authService:auth.IAuthService, private $state:angular.ui.IStateService, public user: app.IUser) {
      this.user = new app.User();
    }

    submit = () => {
      this.authService.signUp(this.user).then(
        ()=> this.$state.go('main.home', {}, { reload: true })
      );
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
