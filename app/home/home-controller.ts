module HomeCtrl {
  'use strict';

  export interface IHomeCtrl{
    topics: Array<Data.ITopic>;
    deleteTopic: Function;
  }

  class HomeCtrl implements IHomeCtrl{

    topics: Array<Data.ITopic> = [];

    public static $inject = [
      'RestClient'
    ];

    constructor(private RestClient:RestClient.IRestClient) {
      this.RestClient.getTopics().then(topics => {
        this.topics = topics;
      });
    }

    deleteTopic = (id:number, index:number) => {
      this.topics.splice(index,1);
      this.RestClient.deleteTopic(id);
    };

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
