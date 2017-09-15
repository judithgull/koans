import {Exercise, ILibrary,  IError,   ITopic} from "../core/topic";
import {SearchParamsService} from "../core/search-param-service";
import {IRestClient} from "../core/rest-client-service";
import * as angular from "angular";

  export interface IEditTopicModel {
    submit: Function;
    addExercise:Function;
    removeExercise:Function;
    topic: ITopic;
  }

  class EditTopicCtrl implements IEditTopicModel {

    public static $inject = ["RestClient", "$state", "$scope", "libs", "SearchParamsService", "topic", "$timeout"];

    constructor(private RestClient:IRestClient,
                private $state:angular.ui.IStateService,
                private $scope:ng.IScope,
                private libs:Array<ILibrary>,
                private searchParamsService:SearchParamsService,
                public topic:ITopic,
                private $timeout:ng.ITimeoutService) {
    }

    errorMessage:string = null;
    solutionErrors:IError[][] = [];

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

    onExerciseError = (element:ng.INgModelController) => (errors:Array<IError>) => {
      this.setValidity(element, "exerciseCompileAndRun", true);
    };

    onExerciseSuccess = (element:ng.INgModelController) => () => {
      this.setValidity(element, "exerciseCompileAndRun", false);
    };

    onSolutionError = (index:number, element:ng.INgModelController) => (errors:Array<IError>) => {
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
   * @description Controller for editing existing and new topics
   *
   */
  angular
    .module("editTopic")
    .controller("EditTopicCtrl", EditTopicCtrl);

