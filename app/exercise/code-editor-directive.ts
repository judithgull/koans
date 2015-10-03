///<reference path='../../typings/tsd.d.ts' />
module CodeEditor {
  'use strict';

  export interface ICodeEditorScope extends ng.IScope{
    language:string;
    initValue:string;
    libsLoader:Function;
    onError:Function;
  }

  export interface ICodeEditorAttributes extends ng.IAttributes{
    language:string;
    initValue:string;
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
    <example module="exercise">
      <file name="index.html">
        <code-editor></code-editor>
      </file>
    </example>
  *
  */
  angular
    .module('exercise')
    .directive('codeEditor', codeEditor);

  function codeEditor(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        language: "=",
        initValue: "=",
        libsLoader: '&libsLoader',
        onError: '&onError'
      },
      templateUrl: 'exercise/code-editor.html',
      controllerAs: 'codeEditor',
      controller: 'CodeEditorCtrl'
    };
  }
}
