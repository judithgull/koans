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

    public static $inject = ['$scope', 'EditMarker'];

    constructor(private $scope:ICodeEditorScope,
                private editMarker:EditMarker) {

    }

    handleChange = () => {
      this.$scope.handleEditorChange(this.editor);
/*      if (!this.selectionProcessed) {
        this.selectEditMark();
      }*/

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
        maxLines: Infinity,
        autoScrollEditorIntoView: true
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
      let worker = this.getWorkerExt(this.$scope.language);
      worker.addLibs(editor.getSession(), libs());
      if (this.isRun()) {
        this.processResults(this.start(worker));
      }
    };

    getWorkerExt = (progLang:string):IWorkerExtension => {
      if (progLang === 'typescript') {
        return new TsWorkerExt();
      } else if (progLang === 'javascript') {
        return new JsWorkerExt();
      }
    };

    start = (worker:IWorkerExtension):Rx.Observable<Data.IStatus> => {
      var subject = new Rx.Subject<Data.IStatus>();
      subject.onNext(new Data.PendingStatus(Data.taskType.compile));
      this.editor.getSession().on("changeAnnotation", () => this.emitAnnotationError(subject));
      worker.addRunEventListener(this.editor.getSession(), (v) => this.startRun(subject, v));
      return subject;
    };


    emitAnnotationError = (subject:Rx.Subject<Data.IStatus>) => {
      if (this.hasAnnotations()) {
        var errors = this.editor.getSession().getAnnotations().map((a) => {
          return {
            message: a.text,
            line: a.row + 1
          }
        });
        subject.onNext(new Data.ErrorStatus(Data.taskType.compile, errors));
      }
    };

    private hasAnnotations():boolean{
      return this.editor.getSession().getAnnotations().length > 0;
    }

    private startRun = (subject:Rx.Subject<Data.IStatus>, script:string):void => {
      if (!this.hasAnnotations()) {
        var preparedScript = "chai.should();var expect = chai.expect;var assert = chai.assert;\n" + script;
        var taskType = Data.taskType.run;
        try {
          eval(preparedScript);
          subject.onNext(new Data.SuccessStatus(taskType));
        } catch (e) {
          let message = 'Runtime Error: Incorrect implementation';
          var err = {message: message, line: -1};
          this.editor.getSession().setAnnotations([{
            row:0,
            column:0,
            text: message,
            type: 'error'
          }]);
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
