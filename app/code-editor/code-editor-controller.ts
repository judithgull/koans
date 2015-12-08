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
    private markerValid = false;
    private compileValid = false;

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

      if (this.$scope.origModel) {
        console.log('handle change...');
        this.editor.getSession().on('change', (event) => {
          this.checkMarkAvailable(subject, this.editor.getSession().getValue());
        });
      } else {
        console.log('no origModel');
        this.markerValid = true;
      }
      this.editor.getSession().on("compileErrors", (e) => this.emitCompileError(subject, e));
      this.editor.getSession().on("compiled", (e) => this.startRun(subject, e.data));
      return subject;
    };

    checkMarkAvailable = (subject:Rx.Subject<Data.IStatus>, text) => {
      if (this.editMarker.containsMark(text)) {
        this.markerValid = false;
        var err = {
          message: 'Please replace ' + this.editMarker.mark + ' with the correct answer!',
          line: -1
        };
        subject.onNext(new Data.ErrorStatus(Data.taskType.validate, [err]));
      } else if (!this.editMarker.hasOnlyMarkChanged(this.$scope.origModel, text)) {
        this.markerValid = false;
        var err = {
          message: 'Do not change anything other than ' + this.editMarker.mark + '!',
          line: -1
        };
        subject.onNext(new Data.ErrorStatus(Data.taskType.validate, [err]));
      } else {
        console.log(this.$scope.origModel);
        this.markerValid = true;
      }
    };

    emitCompileError = (subject:Rx.Subject<Data.IStatus>, e) => {
      if (this.markerValid) {
        if (e.data.length > 0) {
          this.compileValid = false;
          var errors = e.data.map((e) => {
            return {
              message: e.text,
              line: parseInt(e.row) + 1
            }
          });
          subject.onNext(new Data.ErrorStatus(Data.taskType.compile, errors));
        } else {
          this.compileValid = true;
        }
      }
    };

    private startRun = (subject:Rx.Subject<Data.IStatus>, script:string) => {
      if (this.markerValid && this.compileValid) {
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
