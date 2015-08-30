///<reference path='../../typings/tsd.d.ts' />
///<reference path='rest-client-service.ts' />
module RunCtrl {
  'use strict';

  class RunCtrl {

    ctrlName:string;
    language:string;
    title:string;
    description:string;
    deferredData:ng.IPromise<any>;
    editorContent:string;
    errorMessage:string = "";
    successMessage:string = "You are great!!!";
    success = false;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['$log', 'RestClient'];


    // dependencies are injected via AngularJS $injector
    constructor(private $log:ng.ILogService, private restClient:RestClient.IRestClient) {
      this.ctrlName = 'RunCtrl';
      this.deferredData = restClient.getKoan();
      this.deferredData.then((koanData) => {
          this.language = koanData.language;
          this.title = koanData.title;
          this.description = koanData.description;
        }
      ).catch((reason) => this.$log.error(reason));
    }

    public createExerciseDataLoader() {
      return (_editor:AceAjax.Editor) => {
        this.deferredData.then(
          (data:any) => {
            _editor.setValue(data.exercise);
            _editor.getSession().setMode("ace/mode/" + data.language);
          }
        )
      };
    }

    public onChange() {
      return (e:any) => {
        this.editorContent = e[1].getValue();
      };
    }


    public runExercise(){
      console.log("compiling " + this.editorContent);
      try {
        eval(this.editorContent);
        this.errorMessage = "";
        this.success = true;
      }catch(err){
        this.errorMessage = err.toString();
        console.log(err);
      }
    }
  }

  /**
   * @ngdoc object
   * @name run.controller:RunCtrl
   *
   * @description
   *
   */
  angular
    .module('run')
    .controller('RunCtrl', RunCtrl);
}
