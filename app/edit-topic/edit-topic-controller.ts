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

    errorMessage:string = null;

    libsLoader = () => this.libs;

    private updateSortOrder = () => {
      this.topic.items.forEach((item, index) => {
        item.sortOrder = index + 1;
      });
    };

    submit = () => {
      this.updateSortOrder();

      var isNew = !this.topic._id;
      var submitFunction = (isNew)?(t)=>this.RestClient.createTopic(t):(t)=>this.RestClient.updateTopic(t);
      submitFunction(this.topic).then(
        ()=> {
          if(isNew) {
            this.searchParamsService.removeSearchText();
          }
          this.$state.go("main.home.topicList");
        },
        (error)=> {
          this.errorMessage = error.data.message;
        }
      );
    };

    cancel = () => {
      this.RestClient.clearCachedTopic();
      this.$state.go("main.home.topicList");
    };

    addExercise = () => {
      this.topic.items.push(new Exercise());
    };

    removeExercise = (index:number) => {
      this.topic.items.splice(index,1);
    };

    onExerciseError = (element:ng.INgModelController) => (errors:Array<Data.IError>) => {
      this.setValidity(element, 'exerciseCompileAndRun', true);
    };

    onExerciseSuccess = (element:ng.INgModelController) => () => {
      this.setValidity(element, 'exerciseCompileAndRun', false);
    };

    onSolutionError = (element:ng.INgModelController) => (errors:Array<Data.IError>) => {
      this.setValidity(element, 'solutionCompileAndRun', false);
    };

    onSolutionSuccess = (element:ng.INgModelController) => () => {
      this.setValidity(element, 'solutionCompileAndRun', true);
    };

    private setValidity(element:ng.INgModelController, validationErrorKey: string, isValid: boolean) {
      element.$setValidity(validationErrorKey, isValid);
      this.$timeout(() => this.$scope.$digest());
    }

    public static $inject = ['RestClient', '$state', '$scope', 'libs', 'SearchParamsService', 'topic', '$timeout'];

    // dependencies are injected via AngularJS $injector
    constructor(private RestClient:RestClient.IRestClient,
                private $state:angular.ui.IStateService,
                private $scope:ng.IScope,
                private libs: Array<Data.ILibrary>,
                private searchParamsService:core.SearchParamsService,
                public topic:Data.ITopic,
                private $timeout:ng.ITimeoutService
    ) {
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
