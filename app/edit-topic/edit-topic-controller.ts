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
    libsLoader = () => this.libs;

    private updateSortOrder = () => {
      this.topic.items.forEach((item, index) => {
        item.sortOrder = index + 1;
      });
    };

    submit = () => {
      this.updateSortOrder();
      this.RestClient.createTopic(this.topic);
      this.$state.go("home");
    };

    addExercise = () => {
      this.topic.items.push(new Exercise());
    };

    removeExercise = (index:number) => {
      this.topic.items.splice(index,1);
    };

    public static $inject = ['RestClient', '$state', 'libs'];

    // dependencies are injected via AngularJS $injector
    constructor(private RestClient:RestClient.IRestClient,
                private $state:angular.ui.IStateService,
                private libs: Array<Data.ILibrary>) {
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
