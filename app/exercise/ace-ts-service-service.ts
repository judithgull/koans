module AceTsService {
  'use strict';

  export interface IAceTsService{
    /**
     * Initialize ace with necessary libraries
     * */
    getAceInitializer(libNames:string[]): ng.IPromise<Function>;

    start(editor:AceAjax.Editor):Rx.Observable<Data.IStatus>;
  }

  class AceTsService implements IAceTsService{

    public static $inject = ['RestClient'];

    constructor(
      private restClient:RestClient.IRestClient
    ) {}

    getAceInitializer(libNames:string[]): ng.IPromise<Function>{
      return this.restClient
        .getLibs(libNames)
        .then(libs => this.init(libs))
    }

    private init(libs:Array<Data.ILibrary>):Function{
      return (editor: AceAjax.Editor) => {
        this.addLib(editor, libs);
      };
    }

    private addLib(editor:AceAjax.Editor, libs: Array<Data.ILibrary>){
      libs.forEach(
          lib => (<any>editor.getSession()).$worker.emit("addLibrary", { data: lib})
      );
    }

    start(editor:AceAjax.Editor):Rx.Observable<Data.IStatus> {
      var subject = new Rx.Subject<Data.IStatus>();
      subject.onNext(new Data.PendingStatus(Data.taskType.compile));
      editor.getSession().on("compileErrors",(e) => this.emitCompileError(subject,e));
      editor.getSession().on("compiled",(e) => this.startRun(subject,e.data));
      return subject;
    }

    private emitCompileError(subject:Rx.Subject<Data.IStatus>,e) {
      if (e.data.length > 0) {
        var errors = e.data.map((e) => {
          return {
            message: e.text,
            line: parseInt(e.row) + 1
          }
        });
        subject.onNext(new Data.ErrorStatus(Data.taskType.compile, errors));
      }
    }

    private startRun(subject:Rx.Subject<Data.IStatus>,script:string) {
      var preparedScript = "chai.should();var expect = chai.expect;var assert = chai.assert;\n" + script;
      var taskType = Data.taskType.run;
      try {
        subject.onNext(new Data.PendingStatus(taskType));
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
   * @name koans.service:AceTsServiceTs
   *
   * @description
   *
   */
  angular
    .module('exercise')
    .service('AceTsService', AceTsService);
}
