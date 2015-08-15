///<reference path='../../typings/tsd.d.ts' />
module RunCtrl {
  'use strict';

  class RunCtrl {

    ctrlName: string;
    language: string;
    title: string;
    description: string;
    exercise: string;
    solution: string;

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = [
    ];

    // dependencies are injected via AngularJS $injector
    constructor() {
      var vm = this;
      vm.ctrlName = 'RunCtrl';
      vm.language = 'language';
      vm.title = 'title';
      vm.description = 'desc';
      vm.exercise = 'exercise';
      vm.solution = 'solution';
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
