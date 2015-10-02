///<reference path='../../typings/tsd.d.ts' />
module CodeEditorCtrl {
  'use strict';

  class CodeEditorCtrl {
    success = false;
    errors:Array<Data.IError> = [];
    language = "typescript";

    public static $inject = ['$scope', '$attrs', 'AceTsService'];

    constructor(
      private $scope:CodeEditor.ICodeEditorScope,
      private $attrs:CodeEditor.ICodeEditorAttributes,
      private AceTsService:AceTsService.IAceTsService
      ) {
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
       // this.initAce(editor);
        editor.setValue(this.$attrs.initValue);
      /*  editor.clearSelection();
        editor.focus();
        selectQuestionMark(editor);
        var allEvents = this.AceTsService.start(editor);
        processResults(allEvents);
        */
      };
    }
  }


  /**
  * @ngdoc object
  * @name exercise.controller:CodeEditorCtrl
  *
  * @description
  *
  */
  angular
    .module('exercise')
    .controller('CodeEditorCtrl', CodeEditorCtrl);
}
