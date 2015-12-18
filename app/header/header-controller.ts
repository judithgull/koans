module HeaderCtrl {
  import IAuthService = auth.IAuthService;
  'use strict';

  class HeaderCtrl {

    private isLoggedIn:boolean;

    public static $inject = ['AuthService'];

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
    .module('header')
    .controller('HeaderCtrl', HeaderCtrl);
}
