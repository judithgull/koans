module HomeCtrl {
  'use strict';

  export interface IHomeCtrl{
    topics: Array<Data.ITopic>;
  }

  class HomeCtrl implements IHomeCtrl{

    topics: Array<Data.ITopic> = [];

    public static $inject = [
      'RestClient'
    ];

    constructor(RestClient:RestClient.IRestClient) {
      RestClient.getTopics().then(topics => {
        this.topics = topics;
      });
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
