///<reference path='../../typings/tsd.d.ts' />
///<reference path='rest-client-service.ts' />
///<reference path='../data/task.ts' />
module RunCtrl {
  'use strict';

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


    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['$log', 'RestClient'];


    // dependencies are injected via AngularJS $injector
    constructor(private $log:ng.ILogService, private restClient:RestClient.IRestClient) {
      this.topicData = restClient.getTopic();
      this.topicTitle = this.topicData.title;
      var koanData = this.getKoanData();
      this.language = koanData.language;
      this.title = koanData.title;
      this.description = koanData.description;
    }


    private getKoanData() {
      return this.topicData.items[this.taskItem];
    }

    public createExerciseDataLoader() {
      return (exerciseEditor:AceAjax.Editor) => {
        var koanData = this.getKoanData();
        exerciseEditor.setValue(koanData.exercise);
        exerciseEditor.getSession().setMode("ace/mode/" + koanData.language);
      };
    }

    public createSolutionDataLoader() {
      return (solutionEditor:AceAjax.Editor) => {
        var koanData = this.getKoanData();
        solutionEditor.getSession().setMode("ace/mode/" + koanData.language);
        this.solutionEditor = solutionEditor;
      };
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
