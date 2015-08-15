///<reference path='../../typings/tsd.d.ts' />
module RunCtrl {
  'use strict';

  class RunCtrl {

    private $http:ng.IHttpService;

    ctrlName: string;
    language: string;
    title: string;
    description: string;
    exercise: string;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = ['$log', '$http'];

    load(){
      this.$http.get('/data/data.json').then((res:any) => {
        this.$log.debug("data received");
        this.language = res.data.language;
        this.title = res.data.title;
        this.description = res.data.description;
        this.exercise = res.data.exercise;
      })
    }

    // dependencies are injected via AngularJS $injector
    constructor(private $log: ng.ILogService, $http:ng.IHttpService) {
      var vm = this;
      vm.ctrlName = 'RunCtrl';
      this.$http = $http;
      this.$log = $log;
      this.load();
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
