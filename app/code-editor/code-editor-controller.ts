module codeEditor {
  'use strict';

  export interface  ICodeEditorModel{
    handleChange:Function;
    createExerciseDataLoader:Function;
  }

  class CodeEditorCtrl implements ICodeEditorModel{

    editor:AceAjax.Editor;

    public static $inject = ['$scope', 'AceTsService'];

    constructor(
      private $scope:ICodeEditorScope,
      private AceTsService:ts.IAceTsService
      ) {

    }

    handleChange = () => {
      this.$scope.ngModel =this.editor.getValue();
    };

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
            this.$scope.onSuccess()();
        });

        errorEvents.forEach(s => {
          this.$scope.onError()(s.errors);
        });
      };

      var isRun = () => {
        return (this.$scope.onSuccess && this.$scope.onSuccess()) ||
          (this.$scope.onError && this.$scope.onError());
      };

      return (editor:AceAjax.Editor) => {
        this.editor = editor;
        var libs = <Function>this.$scope.libsLoader();
        this.AceTsService.addLibs(editor, libs());

        if(this.$scope.ngModel) {
          editor.setValue(this.$scope.ngModel);
        }
        editor.clearSelection();
        editor.focus();
        selectQuestionMark(editor);
        if(isRun()) {
          var allEvents = this.AceTsService.start(editor);
          processResults(allEvents);
        }
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
    .module('codeEditor')
    .controller('CodeEditorCtrl', CodeEditorCtrl);
}
