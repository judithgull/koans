import {IAuthService, AuthService} from "../auth-service";
import * as angular from "angular";
import {IStateService, IStateProvider} from 'angular-ui-router';

  export class AccountCtrl {

    isLoggedIn:boolean;
    loginName:string;

    static $inject = ["AuthService", "$state"];

    constructor(private authService:IAuthService,
                private $state:IStateService) {
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