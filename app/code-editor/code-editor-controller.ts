import {SuccessStatus, taskType,  ErrorStatus,   PendingStatus,    IStatus} from "../core/topic";
import {JsWorkerExt, TsWorkerExt,  IWorkerExtension} from "./worker-extension";
import {ICodeEditorScope} from "./code-editor-directive";
import {EditMark} from "./editMark/edit-mark-service";
import * as Rx from "rx";
import * as angular from "angular";

export interface  ICodeEditorModel {
    editor:any;
    handleChange;
    load;
  }

export  class CodeEditorCtrl implements ICodeEditorModel {

    editor:any;
    private selectionProcessed = false;

    public static $inject = ["$scope", "EditMark"];

    constructor(private $scope:ICodeEditorScope,
                private editMark:EditMark) {

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
      const range:any = this.editor.find(this.editMark.mark, {
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

    private processResults = (allEvents:Rx.Observable<IStatus>) => {
      const successEvents = allEvents.filter((s) => s.success);
      const errorEvents = allEvents.filter((s) => !s.success);

      if (this.isSuccessDefined()) {
        successEvents.forEach(() => {
          this.$scope.onSuccess()();
        });
      }

      errorEvents.forEach((s) => {
        this.$scope.onError()(s.errors);
      });
    };

    private isSuccessDefined = () => this.$scope.onSuccess && this.$scope.onSuccess();

    private isRun = () => this.isSuccessDefined() || (this.$scope.onError && this.$scope.onError());

    load = (editor:any) => {
      this.editor = editor;
      this.initProperties();
      const libs = this.$scope.libsLoader();
      const worker = this.getWorkerExt(this.$scope.language);
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

    start = (worker:IWorkerExtension):Rx.Observable<IStatus> => {
      const subject = new Rx.Subject<IStatus>();
      subject.onNext(new PendingStatus(taskType.compile));
      this.editor.getSession().on("changeAnnotation", () => this.emitAnnotationError(subject));
      worker.addRunEventListener(this.editor.getSession(), (v) => this.startRun(subject, v));
      return subject;
    };


    emitAnnotationError = (subject:Rx.Subject<IStatus>) => {
      if (this.hasAnnotations()) {
        const errors = this.editor.getSession().getAnnotations().map((a) => {
          return {
            message: a.text,
            line: a.row + 1
          };
        });
        subject.onNext(new ErrorStatus(taskType.compile, errors));
      }
    };

    private hasAnnotations = ():boolean => {
      return this.editor.getSession().getAnnotations().length > 0;
    };

    private startRun = (subject:Rx.Subject<IStatus>, script:string):void => {
      if (!this.hasAnnotations()) {
        var preparedScript = "chai.should();var expect = chai.expect;var assert = chai.assert;\n" + script;

        if (this.$scope.hiddenText) {
          preparedScript = preparedScript + "\n" + this.$scope.hiddenText;
        }
        try {
          eval(preparedScript);
          subject.onNext(new SuccessStatus(taskType.run));
        } catch (e) {
          const message = "Runtime Error: Incorrect implementation";
          const err = {message: message, line: -1};
          this.editor.getSession().setAnnotations([{
            row: 0,
            column: 0,
            text: message,
            type: "error"
          }]);
          subject.onNext(new ErrorStatus(taskType.run, [err]));
        }
      }
    }

  }

