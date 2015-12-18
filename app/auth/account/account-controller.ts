///<reference path='../../../typings/tsd.d.ts' />
module auth.AccountCtrl {
  'use strict';

  class AccountCtrl {

    private isLoggedIn:boolean;
    private loginName:string;

    public static $inject = ['AuthService', '$state'];

    constructor(private authService:IAuthService,
                private $state:angular.ui.IStateService) {
      this.isLoggedIn = authService.isLoggedIn();
      if (this.isLoggedIn) {
        this.loginName = authService.getLoggedInUser().name;
      }
    }

    logout = () => {
      this.authService.logout();
      this.isLoggedIn = false;
      this.$state.go('main.home.topicList', {}, {reload: true});
    }
  }


  /**
   * @ngdoc object
   * @name auth.account.controller:AccountCtrl
   *
   * @description
   *
   */
  angular
    .module('auth.account')
    .controller('AccountCtrl', AccountCtrl);
}
