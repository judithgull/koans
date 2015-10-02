module ExerciseCtrl {
  'use strict';

  class ExerciseCtrl {
    exData:Data.IExercise;

    language:string;
    title:string;
    description:string;
    content:string;

    errors:Array<Data.IError> = [];

    successMessage:string = "You are great!!!";
    success = false;

    public static $inject = ['exData', 'topicData', '$state', '$scope', 'initAce', 'AceTsService'];

    constructor(exData:Data.IExercise, topicData:Data.ITopic, private $state:angular.ui.IStateService, private $scope:ng.IScope, private initAce:Function, private AceTsService:AceTsService.IAceTsService) {
      this.exData = exData;
      this.content = exData.exercise;
      this.language = topicData.language;
      this.title = this.exData.title;
      this.description = this.exData.description;
    }

    createExerciseDataLoader() {

      var selectQuestionMark = (editor:AceAjax.Editor) => {
        var range = editor.find("?");
        if(range && range.start.column > 0 && range.start.row > 0){
          editor.selection.addRange(range);
          editor.moveCursorTo(range.end.row, range.end.column);
        }
      };

      var processResults = (allEvents:Rx.Observable<Data.IStatus>) => {
        var successEvents = allEvents.filter(s => s.success);
        var errorEvents = allEvents.filter(s => !s.success);

        successEvents.forEach(s => {
          this.success = true;
          this.$scope.$digest();
        });

        errorEvents.forEach(s => {
          this.success = false;
          this.errors = s.errors;
          this.$scope.$digest();
        });
      };


      return (editor:AceAjax.Editor) => {
        this.initAce(editor);
        editor.setValue(this.exData.exercise);
        editor.clearSelection();
        editor.focus();
        selectQuestionMark(editor);
        var allEvents = this.AceTsService.start(editor);
        processResults(allEvents);
      };
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
