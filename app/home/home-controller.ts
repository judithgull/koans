module HomeCtrl {
  'use strict';

  export interface IHomeCtrl{
    topics: Array<Data.ITopic>;
    deleteTopic: Function;
    equalsUser: Function;
  }

  class HomeCtrl implements IHomeCtrl{

    topics: Array<Data.ITopic> = [];

    public static $inject = [
      'RestClient',
      'AuthService'
    ];

    constructor(private RestClient:RestClient.IRestClient, private authService:auth.IAuthService) {
      this.RestClient.getTopics().then(topics => {
        this.topics = topics;
      });
    }

    deleteTopic = (id:number, index:number) => {
      this.topics.splice(index,1);
      this.RestClient.deleteTopic(id);
    };

    equalsUser = (authorId: string) => {
      var user = this.authService.getLoggedInUser();

      if(user) {
        return authorId === user._id;
      } else {
        return false;
      }

    }
  }


  /**
  * @ngdoc object
  * @name home.controller:HomeCtrl
  *
  * @description
  *
  */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);
}
