import {IAuthService} from "../auth-service";

module auth.login {
  "use strict";

  export class LoginCtrl {

    email:string = null;
    password:string = null;
    error:string = null;

    public static $inject = [
      "AuthService",
      "$state"
    ];

    constructor(private authService:IAuthService,
                private $state:angular.ui.IStateService) {
    }

    submit = () => {
      this.authService.login(this.email, this.password).then(
        ()=> this.$state.go("main.home.topicList", {}, {reload: true}),
        (error) => {
          this.error = error;
        }
      );
    }
  }


  /**
   * @ngdoc object
   * @name auth.login.controller:LoginCtrl
   *
   * @description Controller for login
   *
   */
  angular
    .module("auth.login")
    .controller("LoginCtrl", LoginCtrl);
}
