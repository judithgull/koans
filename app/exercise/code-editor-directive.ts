///<reference path='../../typings/tsd.d.ts' />
module CodeEditor {
  'use strict';

  interface ICodeEditorScope extends ng.IScope{
    language:string;
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
      restrict: 'EA',
      scope: {},
      templateUrl: 'exercise/code-editor.html',
      replace: false,
      controllerAs: 'codeEditor',
      controller: 'CodeEditorCtrl',
      link: function (scope: ICodeEditorScope, element: JQuery, attrs: any) {

        console.log(attrs);
        scope.language = attrs.language;
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    };
  }
}
