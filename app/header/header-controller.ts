module HeaderCtrl {
  "use strict";

  import IAuthService = auth.IAuthService;

  class HeaderCtrl {

    private isLoggedIn:boolean;

    public static $inject = ["AuthService"];

    constructor(private authService:IAuthService) {
      this.isLoggedIn = authService.isLoggedIn();
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
    .module("header")
    .controller("HeaderCtrl", HeaderCtrl);
}
