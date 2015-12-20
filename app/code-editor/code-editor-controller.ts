module codeEditor {
  "use strict";

  export interface  ICodeEditorModel {
    editor:AceAjax.Editor;
    handleChange:Function;
    load:Function;
  }

  class CodeEditorCtrl implements ICodeEditorModel {

    editor:AceAjax.Editor;
    private selectionProcessed = false;

    public static $inject = ["$scope", "EditMark"];

    constructor(private $scope:ICodeEditorScope,
                private editMark:editMark.EditMark) {

    }

    handleChange = () => {
      this.$scope.handleEditorChange(this.editor);
//      TODO: Does not work on safari mobile yet
//      if (!this.selectionProcessed) {
//      this.selectEditMark();
//      }
    };

    /**
     *
     * */
    selectEditMark = () => {
      var range = this.editor.find(this.editMark.mark, {
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

    private processResults = (allEvents:Rx.Observable<core.IStatus>) => {
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
      if (progLang === "typescript") {
        return new TsWorkerExt();
      } else if (progLang === "javascript") {
        return new JsWorkerExt();
      }
    };

    start = (worker:IWorkerExtension):Rx.Observable<core.IStatus> => {
      var subject = new Rx.Subject<core.IStatus>();
      subject.onNext(new core.PendingStatus(core.taskType.compile));
      this.editor.getSession().on("changeAnnotation", () => this.emitAnnotationError(subject));
      worker.addRunEventListener(this.editor.getSession(), (v) => this.startRun(subject, v));
      return subject;
    };


    emitAnnotationError = (subject:Rx.Subject<core.IStatus>) => {
      if (this.hasAnnotations()) {
        var errors = this.editor.getSession().getAnnotations().map((a) => {
          return {
            message: a.text,
            line: a.row + 1
          };
        });
        subject.onNext(new core.ErrorStatus(core.taskType.compile, errors));
      }
    };

    private hasAnnotations = ():boolean => {
      return this.editor.getSession().getAnnotations().length > 0;
    };

    private startRun = (subject:Rx.Subject<core.IStatus>, script:string):void => {
      if (!this.hasAnnotations()) {
        var preparedScript = "chai.should();var expect = chai.expect;var assert = chai.assert;\n" + script;

        if (this.$scope.hiddenText) {
          preparedScript = preparedScript + "\n" + this.$scope.hiddenText;
        }
        var taskType = core.taskType.run;
        try {
          eval(preparedScript);
          subject.onNext(new core.SuccessStatus(taskType));
        } catch (e) {
          let message = "Runtime Error: Incorrect implementation";
          var err = {message: message, line: -1};
          this.editor.getSession().setAnnotations([{
            row: 0,
            column: 0,
            text: message,
            type: "error"
          }]);
          subject.onNext(new core.ErrorStatus(taskType, [err]));
        }
      }
    }

  }


  /**
   * @ngdoc object
   * @name codeEditor.controller:CodeEditorCtrl
   *
   * @description Handles code editor setup
   *
   */
  angular
    .module("codeEditor")
    .controller("CodeEditorCtrl", CodeEditorCtrl);
}
