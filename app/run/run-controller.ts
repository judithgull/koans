///<reference path='../../typings/tsd.d.ts' />
///<reference path='rest-client-service.ts' />
module RunCtrl {
  'use strict';

  class RunCtrl {

    ctrlName: string;
    language: string;
    title: string;
    description: string;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['$log', '$http', 'RestClient'];


    // dependencies are injected via AngularJS $injector
    constructor(private $log: ng.ILogService, private $http:ng.IHttpService, private restClient: RestClient.IRestClient) {
      this.ctrlName = 'RunCtrl';
      restClient.getKoan(
        (koanData) => {
          this.language = koanData.language;
          this.title = koanData.title;
          this.description = koanData.description;
        }
      );
    }

    public createExerciseDataLoader(){
      return (_editor:any) => {
        this.restClient.getKoan(
          (koanData:any) => {
            _editor.setValue(koanData.exercise);
            _editor.getSession().setMode("ace/mode/typescript");
          }
        );
      };
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
