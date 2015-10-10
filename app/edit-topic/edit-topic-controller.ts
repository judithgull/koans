///<reference path='../../typings/tsd.d.ts' />
module editTopic {
  'use strict';

  export interface IEditTopicModel{
    submit: Function;
    addExercise:Function;
    removeExercise:Function;
    topic: Data.ITopic;
  }

  class EditTopicCtrl implements IEditTopicModel{
    topic: Data.ITopic;
    libsLoader = () => [];

    submit = () => {
      this.RestClient.createTopic(this.topic);
    };

    addExercise = () => {
      this.topic.items.push(new Exercise());
    };

    removeExercise = (index:number) => {
      this.topic.items.splice(index,1);
    };

    public static $inject = ['RestClient'];

    // dependencies are injected via AngularJS $injector
    constructor(private RestClient:RestClient.IRestClient) {
      this.topic = new Topic();
    }
  }


  /**
  * @ngdoc object
  * @name editTopic.controller:EditTopicCtrl
  *
  * @description
  *
  */
  angular
    .module('editTopic')
    .controller('EditTopicCtrl', EditTopicCtrl);
}
