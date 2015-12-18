///<reference path="../../typings/tsd.d.ts" />
module editTopic {
  "use strict";

  export interface IEditTopicModel {
    submit: Function;
    addExercise:Function;
    removeExercise:Function;
    topic: core.ITopic;
  }

  class EditTopicCtrl implements IEditTopicModel {

    public static $inject = ["RestClient", "$state", "$scope", "libs", "SearchParamsService", "topic", "$timeout"];

    // dependencies are injected via AngularJS $injector
    constructor(private RestClient:RestClient.IRestClient,
                private $state:angular.ui.IStateService,
                private $scope:ng.IScope,
                private libs:Array<core.ILibrary>,
                private searchParamsService:core.SearchParamsService,
                public topic:core.ITopic,
                private $timeout:ng.ITimeoutService) {
    }

    errorMessage:string = null;
    solutionErrors:core.IError[][] = [];

    libsLoader = () => this.libs;

    private updateSortOrder = () => {
      this.topic.items.forEach((item, index) => {
        item.sortOrder = index + 1;
      });
    };

    submit = () => {
      this.updateSortOrder();

      var isNew = !this.topic._id;
      var submitFunction = (isNew) ? (t)=>this.RestClient.createTopic(t) : (t)=>this.RestClient.updateTopic(t);
      submitFunction(this.topic).then(
        ()=> {
          if (isNew) {
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
      this.topic.items.splice(index, 1);
    };

    onExerciseError = (element:ng.INgModelController) => (errors:Array<core.IError>) => {
      this.setValidity(element, "exerciseCompileAndRun", true);
    };

    onExerciseSuccess = (element:ng.INgModelController) => () => {
      this.setValidity(element, "exerciseCompileAndRun", false);
    };

    onSolutionError = (index:number, element:ng.INgModelController) => (errors:Array<core.IError>) => {
      this.solutionErrors[index] = errors;
      this.setValidity(element, "solutionCompileAndRun", false);
    };

    onSolutionSuccess = (index:number, element:ng.INgModelController) => () => {
      this.solutionErrors[index] = null;
      this.setValidity(element, "solutionCompileAndRun", true);
    };

    getSolutionError = (index:number) => {
      return this.solutionErrors[index];
    };

    private setValidity(element:ng.INgModelController, validationErrorKey:string, isValid:boolean) {
      if (element) {
        element.$setValidity(validationErrorKey, isValid);
        this.$timeout(() => this.$scope.$digest());
      }
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
    .module("editTopic")
    .controller("EditTopicCtrl", EditTopicCtrl);
}
