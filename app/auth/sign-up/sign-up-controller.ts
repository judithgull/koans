import {IAuthService} from "../auth-service";

module auth.signUp {
  "use strict";

  export class SignUpCtrl {
    duplicatedEmailError = null;

    static $inject = ["AuthService", "$state"];

    constructor(private authService:IAuthService,
                private $state:angular.ui.IStateService,
                public user:core.IUser) {
      this.user = new core.User();
    }

    submit = () => {
      this.authService.signUp(this.user).then(
        ()=> this.$state.go("main.home.topicList", {}, {reload: true}),
        (error) => {
          this.duplicatedEmailError = error;
        }
      );
    }
  }


  /**
   * @ngdoc object
   * @name auth.signUp.controller:SignUpCtrl
   *
   * @description sign-up controller
   *
   */
  angular
    .module("auth.signUp")
    .controller("SignUpCtrl", SignUpCtrl);
}
