module HeaderCtrl {
  import IAuthService = auth.IAuthService;
  'use strict';

  class HeaderCtrl {

    private user:app.IUser;

    public static $inject = ['AuthService', '$state'];

    constructor(private authService: IAuthService,
                private $state:ng.ui.IStateService
    ) {
      var isLoggedIn = authService.isLoggedIn();
      if(isLoggedIn){
        this.user = authService.getLoggedInUser();
      }
    }

    loadOwnTopics = () => {
      this.$state.go('main.topicList',{authorId: this.user._id}, {reload:true});
    };


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
