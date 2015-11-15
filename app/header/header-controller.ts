module HeaderCtrl {
  import IAuthService = auth.IAuthService;
  'use strict';

  class HeaderCtrl {

    private isLoggedIn:boolean;
    private loginName:string;

    public static $inject = ['AuthService'];

    constructor(private authService: IAuthService) {
      this.isLoggedIn = authService.isLoggedIn();
      if(this.isLoggedIn){
        this.loginName = authService.getLoggedInUser().name;
      }
    }

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
