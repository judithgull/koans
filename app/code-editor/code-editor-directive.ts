module codeEditor {
  'use strict';

  export interface ICodeEditorScope extends ng.IScope{
    language:string;
    initValue:string;
    libsLoader:Function;
    onError:Function;
    onSuccess:Function;
    ngModel:ng.INgModelController;
  }

  export interface ICodeEditorAttributes extends ng.IAttributes{
    language:string;
    initValue:string;
  }

  function codeEditor(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        language: '=',
        initValue: '=',
        libsLoader: '&libsLoader',
        onError: '&onError',
        onSuccess: '&onSuccess',
        ngModel: '='
      },
      require: 'ngModel',
      templateUrl: 'code-editor/code-editor.tpl.html',
      controllerAs: 'codeEditor',
      controller: 'CodeEditorCtrl'
    };
  }


  /**
   * @ngdoc directive
   * @name exercise.directive:codeEditor
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
   <example module="codeEditor">
   <file name="index.html">
   <code-editor></code-editor>
   </file>
   </example>
   *
   */
  angular
    .module('codeEditor')
    .directive('codeEditor', codeEditor);
}
