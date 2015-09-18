///<reference path='../../typings/tsd.d.ts' />
///<reference path='rest-client-service.ts' />
///<reference path='../data/topic.ts' />
///<reference path='../topic/topic-controller.ts' />

module ExerciseCtrl {
  'use strict';

  class ExerciseCtrl {
    exData:Data.IExercise;

    language:string;
    title:string;
    description:string;

    editorContent:string;
    errorMessage:string = "";
    successMessage:string = "You are great!!!";
    success = false;
    exerciseEditor:AceAjax.Editor;
    exerciseId:number;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['exData', 'topicData', '$state'];


    // dependencies are injected via AngularJS $injector
    constructor(exData:Data.IExercise, topicData:Data.ITopic, private $state:angular.ui.IStateService) {
      this.exData = exData;
      this.language = topicData.language;
      this.title = this.exData.title;
      this.description = this.exData.description;
      this.exerciseId = parseInt((<TopicCtrl.ITopicParams>$state.params).exId);
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

    public loadExercise() {
      this.exerciseEditor.setValue(this.exData.exercise);
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
