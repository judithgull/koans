module HomeCtrl {
  'use strict';

  class HomeCtrl {

    topics: Array<Data.ITopic>;

    public static $inject = [
      'RestClient',
      '$scope'
    ];

    // dependencies are injected via AngularJS $injector
    constructor(RestClient:RestClient.IRestClient, private $scope:ng.IScope) {
      RestClient.getTopic(0).then(topic => {
        this.topics = [topic];
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
