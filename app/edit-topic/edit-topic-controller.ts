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
      if (!this.topic._id) {
        this.RestClient.createTopic(this.topic);
      } else {
        this.RestClient.updateTopic(this.topic).then(
          ()=> {
            this.$state.go("main.home");
          },
          (error)=> {
            this.errorMessage = error.data.message;
          }
        );
      }
    };

    addExercise = () => {
      this.topic.items.push(new Exercise());
    };

    removeExercise = (index:number) => {
      this.topic.items.splice(index,1);
    };

    onExerciseError = (element:ng.INgModelController) => (errors:Array<Data.IError>) => {
      if(errors.length > 0) {
        this.setValidity(element, 'exerciseCompileAndRun', true);
      }else{
        this.setValidity(element, 'exerciseCompileAndRun', false);
      }
    };

    onExerciseSuccess = (element:ng.INgModelController) => () => {
      this.setValidity(element, 'exerciseCompileAndRun', false);
    };

    onSolutionError = (element:ng.INgModelController) => (errors:Array<Data.IError>) => {
      if(errors.length > 0) {
        this.setValidity(element, 'solutionCompileAndRun', false);
      }else{
        this.setValidity(element, 'solutionCompileAndRun', true);
      }
    };

    onSolutionSuccess = (element:ng.INgModelController) => () => {
      this.setValidity(element, 'solutionCompileAndRun', true);
    };

    private setValidity(element:ng.INgModelController, validationErrorKey: string, isValid: boolean) {
      element.$setValidity(validationErrorKey, isValid);
      this.$scope.$digest();
    }

    public static $inject = ['RestClient', '$state', '$scope', 'libs', 'topic'];

    // dependencies are injected via AngularJS $injector
    constructor(private RestClient:RestClient.IRestClient,
                private $state:angular.ui.IStateService,
                private $scope:ng.IScope,
                private libs: Array<Data.ILibrary>,
                public topic:Data.ITopic
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
