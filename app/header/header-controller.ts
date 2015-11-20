module HeaderCtrl {
  import IAuthService = auth.IAuthService;
  'use strict';

  class HeaderCtrl {

    private isLoggedIn:boolean;
    private loginName:string;
    private user:app.IUser;

    public static $inject = ['AuthService', '$state'];

    constructor(private authService: IAuthService,
                private $state:ng.ui.IStateService
    ) {
      this.isLoggedIn = authService.isLoggedIn();
      if(this.isLoggedIn){
        this.user = authService.getLoggedInUser();
        this.loginName = this.user.name;
      }
    }

    loadOwnTopics = () => {
      this.$state.go('main.topicList',{authorId: this.user._id}, {reload:true});
    };

    logout = () => {
      this.authService.logout();
      this.isLoggedIn = false;
    }
  }


  /**
  * @ngdoc object
  * @name header.controller:HeaderCtrl
  *
  * @description
  *
  */
  angular
    .module('header')
    .controller('HeaderCtrl', HeaderCtrl);
}
