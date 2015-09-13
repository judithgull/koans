///<reference path='../../typings/tsd.d.ts' />
///<reference path='rest-client-service.ts' />
///<reference path='../data/task.ts' />
///<reference path="../../typings/angular-ui-router/angular-ui-router.d.ts"/>
module RunCtrl {
  'use strict';

  interface IRunRouteParams extends ng.ui.IStateParamsService {
    id: string;
  }

  class RunCtrl {
    topicTitle:string;
    taskItem = 0;
    topicData:Data.ITopic;

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
      this.topicData = restClient.getTopic();
      this.topicTitle = this.topicData.title;
      this.updateKoanData();
    }


    private getKoanData() {
      return this.topicData.items[this.taskItem];
    }

    private updateKoanData() {
      console.log(this.taskItem + "Task Item");
      var koanData = this.getKoanData();
      this.language = koanData.language;
      this.title = koanData.title;
      this.description = koanData.description;
    }

    private updateEditorMode(editor:AceAjax.Editor){
      editor.getSession().setMode("ace/mode/" + this.getKoanData().language);
    }

    public createExerciseDataLoader() {
      return (exerciseEditor:AceAjax.Editor) => {
        var koanData = this.getKoanData();
        exerciseEditor.setValue(koanData.exercise);
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
      var koanData = this.getKoanData();
      this.exerciseEditor.setValue(koanData.exercise);
    }

    public loadSolution() {
      var koanData = this.getKoanData();
      this.solutionEditor.setValue(koanData.solution);
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

    public openNext() {
      this.taskItem ++;
      this.updateKoanData();
      this.loadExercise();
      this.loadSolution();
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
