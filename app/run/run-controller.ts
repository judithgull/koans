///<reference path='../../typings/tsd.d.ts' />
///<reference path='rest-client-service.ts' />
///<reference path='../data/task.ts' />
///<reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>
module RunCtrl {
  'use strict';

  interface IRunRouteParams extends ng.ui.IStateParamsService {
    id: number;
  }

  class RunCtrl {
    taskItem = 0;
    exData:Data.ITask;

    language:string;
    title:string;
    description:string;

    editorContent:string;
    errorMessage:string = "";
    successMessage:string = "You are great!!!";
    success = false;
    solutionEditor:AceAjax.Editor;
    exerciseEditor:AceAjax.Editor;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['$stateParams', 'RestClient'];


    // dependencies are injected via AngularJS $injector
    constructor(private $stateParams:IRunRouteParams, private restClient:RestClient.IRestClient) {
      console.log($stateParams.id);
      this.exData = restClient.getExercise($stateParams.id);
      this.updateKoanData();
    }


    private updateKoanData() {
      console.log(this.taskItem + "Task Item");
      this.language = this.exData.language;
      this.title = this.exData.title;
      this.description = this.exData.description;
    }

    private updateEditorMode(editor:AceAjax.Editor){
      editor.getSession().setMode("ace/mode/" + this.exData.language);
    }

    public createExerciseDataLoader() {
      return (exerciseEditor:AceAjax.Editor) => {
        exerciseEditor.setValue(this.exData.exercise);
        this.updateEditorMode(exerciseEditor);
        this.exerciseEditor = exerciseEditor;
      };
    }

    public createSolutionDataLoader() {
      return (solutionEditor:AceAjax.Editor) => {
        this.updateEditorMode(solutionEditor);
        this.solutionEditor = solutionEditor;
      };
    }

    public loadExercise() {
      this.exerciseEditor.setValue(this.exData.exercise);
    }

    public loadSolution() {
      this.solutionEditor.setValue(this.exData.solution);
    }

    public onChange() {
      return (e:any) => {
        this.editorContent = e[1].getValue();
      };
    }


    public runExercise() {
      console.log("compiling " + this.editorContent);
      try {
        eval(this.editorContent);
        this.errorMessage = "";
        this.success = true;
      } catch (err) {
        this.errorMessage = err.toString();
        this.success = false;
      }
    }

  }

  /**
   * @ngdoc object
   * @name run.controller:RunCtrl
   *
   * @description
   *
   */
  angular
    .module('run')
    .controller('RunCtrl', RunCtrl);
}
