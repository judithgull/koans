///<reference path='../../../typings/tsd.d.ts' />
module auth.login {
  'use strict';

  export class LoginCtrl {

    email: string = null;
    password: string = null;
    error: string = null;

    public static $inject = [
      'AuthService',
      '$state',
      '$scope'
    ];

    constructor(private authService: IAuthService,
                private $state:angular.ui.IStateService,
                private $scope:ng.IScope
    ) {
    }

    submit = () => {
      this.authService.login(this.email, this.password).then(
        ()=> this.$state.go('main.home', {}, { reload: true }),
        (error) => {this.error=error}
      );
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
