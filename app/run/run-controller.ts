///<reference path='../../typings/tsd.d.ts' />
///<reference path='rest-client-service.ts' />
///<reference path='../data/topic.ts' />
module RunCtrl {
  'use strict';

  class RunCtrl {
    exData:Data.IExercise;

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
    public static $inject = ['exData', 'topicData'];


    // dependencies are injected via AngularJS $injector
    constructor(exData:Data.IExercise, topicData:Data.ITopic) {
      this.exData = exData;
      this.language = topicData.language;
      this.title = this.exData.title;
      this.description = this.exData.description;
    }


    private updateEditorMode(editor:AceAjax.Editor){
      editor.getSession().setMode("ace/mode/" + this.language);
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
