import {IAuthService} from "../auth-service";
import * as angular from "angular";

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
