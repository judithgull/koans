///<reference path='../../../typings/tsd.d.ts' />
///<reference path='../../data/topic.ts' />
///<reference path='../../topic/topic-controller.ts' />

module SolutionCtrl {
  'use strict';

  class SolutionCtrl {

    exData:Data.IExercise;
    solutionEditor:AceAjax.Editor;
    language:string;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['exData', 'topicData', '$state'];


    // dependencies are injected via AngularJS $injector
    constructor(exData:Data.IExercise, topicData:Data.ITopic, private $state:angular.ui.IStateService) {
      this.exData = exData;
      this.language = topicData.language;
    }

    public createSolutionDataLoader() {
      return (solutionEditor:AceAjax.Editor) => {
        this.updateEditorMode(solutionEditor);
        this.solutionEditor = solutionEditor;
        this.solutionEditor.setValue(this.exData.solution);
      };
    }

    private updateEditorMode(editor:AceAjax.Editor){
      editor.getSession().setMode("ace/mode/" + this.language);
    }

    private showDetails(){
      this.$state.go("topic.exercise.details");
    }
  }


  /**
  * @ngdoc object
  * @name exercise.solution.controller:SolutionCtrl
  *
  * @description
  *
  */
  angular
    .module('exercise.solution')
    .controller('SolutionCtrl', SolutionCtrl);
}
