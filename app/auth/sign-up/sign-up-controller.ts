import {User, IUser} from '../../core/user';
import {IAuthService} from "../auth-service";
import * as angular from "angular";

  export class SignUpCtrl {
    duplicatedEmailError = null;

    static $inject = ["AuthService", "$state"];

    constructor(private authService:IAuthService,
                private $state:angular.ui.IStateService,
                public user:IUser) {
      this.user = new User();
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