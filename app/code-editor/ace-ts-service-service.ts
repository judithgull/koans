module codeEditor.ts {
  'use strict';

  export interface IAceTsService{
    /**
     * Add libraries to ace editor
     * */
    addLibs(editor:AceAjax.Editor, libs: Array<Data.ILibrary>)

    start(editor:AceAjax.Editor, origValue:string):Rx.Observable<Data.IStatus>;
  }

  class AceTsService implements IAceTsService{

    public static $inject = ['EditMarker'];
    private markerValid = false;
    private origValue:string = null;

    constructor(
      private editMarker:EditMarker
    ) {
    }

    addLibs(editor:AceAjax.Editor, libs: Array<Data.ILibrary>){
      libs.forEach(
          lib => {
            (<any>editor.getSession()).$worker.emit("addLibrary", { data: lib});
          }
      );
    }

    start(editor:AceAjax.Editor, origValue:string):Rx.Observable<Data.IStatus> {
      this.origValue = origValue;
      var subject = new Rx.Subject<Data.IStatus>();
      subject.onNext(new Data.PendingStatus(Data.taskType.compile));
      editor.getSession().on('change', (event) => {
        this.checkMarkAvailable(subject, editor.getSession().getValue());
      });
      editor.getSession().on("compileErrors",(e) => this.emitCompileError(subject,e));
      return subject;
    }

    checkMarkAvailable = (subject:Rx.Subject<Data.IStatus>, text) => {
      if(this.editMarker.containsMark(text)){
        this.markerValid = false;
        var err = {
          message: 'Please replace ' + this.editMarker.mark + ' with the correct answer!',
          line: -1
        };
        subject.onNext(new Data.ErrorStatus(Data.taskType.validate,[err]));
      }else if(!this.editMarker.hasOnlyMarkChanged(this.origValue, text)){
        this.markerValid = false;
        var err = {
          message: 'Do not change anything other than ' + this.editMarker.mark+ '!',
          line: -1
        };
        subject.onNext(new Data.ErrorStatus(Data.taskType.validate,[err]));
      }else{
        this.markerValid = true;
      }
    };

    private emitCompileError(subject:Rx.Subject<Data.IStatus>,e) {
      if(this.markerValid) {
        if (e.data.length > 0) {
          var errors = e.data.map((e) => {
            return {
              message: e.text,
              line: parseInt(e.row) + 1
            }
          });
          subject.onNext(new Data.ErrorStatus(Data.taskType.compile, errors));
        } else {
          this.startRun(subject, e.data);
        }
      }
    }

    private startRun(subject:Rx.Subject<Data.IStatus>,script:string) {
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

  /**
   * @ngdoc service
   * @name koans.service:AceTsService
   *
   * @description
   *
   */
  angular
    .module('codeEditor')
    .service('AceTsService', AceTsService);
}
