module HomeCtrl {
  'use strict';

  class HomeCtrl {

    topics: Array<Data.ITopic>;

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
