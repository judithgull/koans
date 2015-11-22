module HeaderCtrl {
  import IAuthService = auth.IAuthService;
  'use strict';

  class HeaderCtrl {

    private user:app.IUser;
    private isShowAll = true;
    private isLoggedIn:boolean;

    public static $inject = ['AuthService', '$state'];

    constructor(private authService: IAuthService,
                private $state:ng.ui.IStateService
    ) {
      this.isLoggedIn = authService.isLoggedIn();
      if(this.isLoggedIn){
        this.user = authService.getLoggedInUser();
      }
    }

    loadAllTopics = () => {
      this.$state.go('main.home.topicList',{authorId:null});
      this.isShowAll = true;

    };

    loadOwnTopics = () => {
      this.$state.go('main.home.topicList',{authorId: this.user._id});
      this.isShowAll = false;
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
