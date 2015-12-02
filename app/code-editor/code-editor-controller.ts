module codeEditor {
  'use strict';

  export interface  ICodeEditorModel {
    editor:AceAjax.Editor;
    handleChange:Function;
    createExerciseDataLoader:Function;
  }

  class CodeEditorCtrl implements ICodeEditorModel {

    editor:AceAjax.Editor;

    public static $inject = ['$scope', 'AceTsService', 'EditMarker'];

    constructor(private $scope:ICodeEditorScope,
                private AceTsService:ts.IAceTsService,
                private editMarker:EditMarker) {

    }

    handleChange = () => {
      this.$scope.handleEditorChange(this.editor);
      this.selectEditMark(this.editor);
    };

    selectEditMark = (editor:AceAjax.Editor) => {
      var range = editor.find(this.editMarker.mark, {
        backwards: false,
        wrap: true,
        caseSensitive: false,
        wholeWord: false,
        regExp: false
      });
      if (range && range.start.column > 0 && range.start.row > 0) {
        editor.selection.addRange(range);
        editor.moveCursorTo(range.end.row, range.end.column);
        editor.focus();
      }
    };

    createExerciseDataLoader() {
      var processResults = (allEvents:Rx.Observable<Data.IStatus>) => {
        var successEvents = allEvents.filter(s => s.success);
        var errorEvents = allEvents.filter(s => !s.success);

        if (isSuccessDefined()) {
          successEvents.forEach(s => {
            this.$scope.onSuccess()();
          });
        }

        errorEvents.forEach(s => {
          this.$scope.onError()(s.errors);
        });
      };

      var isSuccessDefined = () => {
        return this.$scope.onSuccess && this.$scope.onSuccess();
      };

      var isRun = () => {
        return (isSuccessDefined()) ||
          (this.$scope.onError && this.$scope.onError());
      };

      return (editor:AceAjax.Editor) => {
        this.editor = editor;
        editor.$blockScrolling = Infinity;

        editor.setOptions({
          maxLines: Infinity,
        });

        var libs = <Function>this.$scope.libsLoader();
        this.AceTsService.addLibs(editor, libs());
        if (isRun()) {
          var allEvents = this.AceTsService.start(editor, this.$scope.origModel);
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
