import {IAuthService} from "../auth-service"

module auth.account {
  "use strict";

  export class AccountCtrl {

    isLoggedIn:boolean;
    loginName:string;

    static $inject = ["AuthService", "$state"];

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
      this.$state.go("main.home.topicList", {}, {reload: true});
    }
  }


  /**
   * @ngdoc object
   * @name auth.account.controller:AccountCtrl
   *
   * @description Controller for account overview (sign-up, login, logout)
   *
   */
  angular
    .module("auth.account")
    .controller("AccountCtrl", AccountCtrl);
}
