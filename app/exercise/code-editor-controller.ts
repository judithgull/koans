///<reference path='../../typings/tsd.d.ts' />
module CodeEditorCtrl {
  'use strict';

  class CodeEditorCtrl {

    language: string;

    public static $inject = [
    ];

    constructor() {
      this.language = 'typescript';
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
    .module('exercise')
    .controller('CodeEditorCtrl', CodeEditorCtrl);
}
