module codeEditor {
  'use strict';

  export interface  ICodeEditorModel {
    editor:AceAjax.Editor;
    handleChange:Function;
    load:Function;
  }

  class CodeEditorCtrl implements ICodeEditorModel {

    editor:AceAjax.Editor;
    private selectionProcessed = false;
    private hasAnnotations = true;

    public static $inject = ['$scope', 'AceTsService', 'EditMarker'];

    constructor(private $scope:ICodeEditorScope,
                private AceTsService:ts.IAceTsService,
                private editMarker:EditMarker) {

    }

    handleChange = () => {
      this.$scope.handleEditorChange(this.editor);
      if (!this.selectionProcessed) {
        this.selectEditMark();
      }

    };

    selectEditMark = () => {
      var range = this.editor.find(this.editMarker.mark, {
        backwards: false,
        wrap: true,
        caseSensitive: false,
        wholeWord: false,
        regExp: false
      });
      if (range && range.start.column > 0 && range.start.row > 0) {
        this.editor.selection.addRange(range);
        this.editor.moveCursorTo(range.end.row, range.end.column);
        this.editor.focus();
      }
      this.selectionProcessed = true;
    };

    private initProperties = () => {
      this.editor.$blockScrolling = Infinity;
      this.editor.setOptions({
        maxLines: Infinity
      });

      this.editor.commands.addCommands([{
        name: "blur",
        bindKey: "Escape",
        exec: () => {
          this.editor.blur();
        }
      }]);
    };

    private processResults = (allEvents:Rx.Observable<Data.IStatus>) => {
      var successEvents = allEvents.filter(s => s.success);
      var errorEvents = allEvents.filter(s => !s.success);

      if (this.isSuccessDefined()) {
        successEvents.forEach(() => {
          this.$scope.onSuccess()();
        });
      }

      errorEvents.forEach(s => {
        this.$scope.onError()(s.errors);
      });
    };

    private isSuccessDefined = () => this.$scope.onSuccess && this.$scope.onSuccess();

    private isRun = () => this.isSuccessDefined() || (this.$scope.onError && this.$scope.onError());

    load = (editor:AceAjax.Editor) => {
      this.editor = editor;
      this.initProperties();
      var libs = this.$scope.libsLoader();
      this.AceTsService.addLibs(editor, libs());
      if (this.isRun()) {
        this.processResults(this.start());
      }
    };

    start = ():Rx.Observable<Data.IStatus> => {
      var subject = new Rx.Subject<Data.IStatus>();
      subject.onNext(new Data.PendingStatus(Data.taskType.compile));
      this.editor.getSession().on("changeAnnotation", () => this.emitAnnotationError(subject));
      this.editor.getSession().on("compiled", (e) => this.startRun(subject, e.data));
      return subject;
    };


    emitAnnotationError = (subject:Rx.Subject<Data.IStatus>) => {
      var annotations = this.editor.getSession().getAnnotations();
        if (annotations.length > 0) {
          this.hasAnnotations = true;

          var errors = annotations.map((a) => {
            return {
              message: a.text,
              line: a.row + 1
            }
          });
          subject.onNext(new Data.ErrorStatus(Data.taskType.compile, errors));
        } else {
          this.hasAnnotations = false;
        }

    };

    private startRun = (subject:Rx.Subject<Data.IStatus>, script:string) => {
      if (!this.hasAnnotations) {
        var preparedScript = "chai.should();var expect = chai.expect;var assert = chai.assert;\n" + script;
        var taskType = Data.taskType.run;
        try {
          eval(preparedScript);
          subject.onNext(new Data.SuccessStatus(taskType));
        } catch (e) {
          var err = {message: e.message, line: -1};
          subject.onNext(new Data.ErrorStatus(taskType, [err]));
        }
      }
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
