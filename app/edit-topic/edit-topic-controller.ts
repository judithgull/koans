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

    onExerciseError = (element:ng.INgModelController) => (errors:Array<Data.IError>) => {
      if(errors.length > 0) {
        element.$setValidity('exerciseCompileAndRun', true);
      }else{
        element.$setValidity('exerciseCompileAndRun', false);
      }
      this.$scope.$digest();
    };

    onExerciseSuccess = (element:ng.INgModelController) => () => {
      element.$setValidity('exerciseCompileAndRun', false);
      this.$scope.$digest();
    };

    onSolutionError = (element:ng.INgModelController) => (errors:Array<Data.IError>) => {
      if(errors.length > 0) {
        element.$setValidity('solutionCompileAndRun', false);
      }else{
        element.$setValidity('solutionCompileAndRun', true);
      }
      this.$scope.$digest();
    };

    onSolutionSuccess = (element:ng.INgModelController) => () => {
      element.$setValidity('solutionCompileAndRun', true);
      this.$scope.$digest();
    };

    public static $inject = ['RestClient', '$state', '$scope', 'libs'];

    // dependencies are injected via AngularJS $injector
    constructor(private RestClient:RestClient.IRestClient,
                private $state:angular.ui.IStateService,
                private $scope:ng.IScope,
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
