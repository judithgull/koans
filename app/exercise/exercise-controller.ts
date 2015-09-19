///<reference path='../../typings/tsd.d.ts' />
///<reference path='rest-client-service.ts' />
///<reference path='../data/topic.ts' />
///<reference path='../topic/topic-controller.ts' />

module ExerciseCtrl {
  'use strict';

  interface IError{
    message:string;
    line:number;
  }

  class ExerciseCtrl {
    exData:Data.IExercise;

    language:string;
    title:string;
    description:string;

    editorContent:string;

    errors:Array<IError> = [];

    successMessage:string = "You are great!!!";
    success = false;
    exerciseEditor:AceAjax.Editor;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['exData', 'topicData', '$state', '$scope', 'tsLibData'];


    // dependencies are injected via AngularJS $injector
    constructor(exData:Data.IExercise, topicData:Data.ITopic, private $state:angular.ui.IStateService, private $scope:ng.IScope, private tsLibData) {
      this.exData = exData;
      this.language = topicData.language;
      this.title = this.exData.title;
      this.description = this.exData.description;
    }

    private updateEditorMode(editor:AceAjax.Editor){
      editor.getSession().setMode("ace/mode/" + this.language);
    }

    public createExerciseDataLoader() {
      var params = {
        data: {
          name:"typescripts/lib.d.ts",
          content:this.tsLibData
        }
      };
      return (exerciseEditor:AceAjax.Editor) => {
        this.updateEditorMode(exerciseEditor);
        if(this.language=== "typescript") {
          var session = exerciseEditor.getSession();
          (<any>session).$worker.emit("addLibrary", params);
        }

        exerciseEditor.setValue(this.exData.exercise);

        this.exerciseEditor = exerciseEditor;
        this.exerciseEditor.getSession().on("compileErrors",(e) => this.onCompileErrors(e));
      };
    }

    public loadExercise() {
      this.exerciseEditor.setValue(this.exData.exercise);
    }

    public onChange() {
      return (e:any) => {
        this.editorContent = e[1].getValue();
      };
    }

    private onCompileErrors(e){
      if(e.data.length>0) {
        var allErrors = e.data;
        this.errors = [];
        allErrors.forEach((e) =>
          this.errors.push({message:e.text, line:parseInt(e.row) + 1})
        );
        this.success = false;
      }else{
        this.success = true;
      }
      this.$scope.$digest();
    }

    public runExercise() {
      try {
        eval(this.editorContent);
        this.errors = [];
        this.success = true;
      } catch (err) {
        this.errors = [{message:err.toString(), line:-1}];
        this.success = false;
      }
    }

    public giveUp() {
      this.$state.go("topic.exercise.solution");
    }

    public isSolution() {
      return this.$state.is("topic.exercise.solution");
    }
  }

  /**
   * @ngdoc object
   * @name exercise.controller:ExerciseCtrl
   *
   * @description
   *
   */
  angular
    .module('exercise')
    .controller('ExerciseCtrl', ExerciseCtrl);
}
