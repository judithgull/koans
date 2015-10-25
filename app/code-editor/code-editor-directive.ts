module codeEditor {
  'use strict';

  export interface ICodeEditorScope extends ng.IScope{
    language:string;
    libsLoader:Function;
    onError:Function;
    onSuccess:Function;
    codeEditor:ICodeEditorModel;
    handleEditorChange:Function;
  }

  function codeEditor(): ng.IDirective {
    return {
      restrict: 'E',
      scope: {
        language: '=',
        libsLoader: '&libsLoader',
        onError: '&onError',
        onSuccess: '&onSuccess'
      },
      require: 'ngModel',
      templateUrl: 'code-editor/code-editor.tpl.html',
      controllerAs: 'codeEditor',
      controller: 'CodeEditorCtrl',
     link: function(scope: ICodeEditorScope, el, attrs, ngModelCtrl: ng.INgModelController) {
       ngModelCtrl.$render = () => {
          var editor:AceAjax.Editor = scope.codeEditor.editor;
          editor.setValue(ngModelCtrl.$viewValue || '');
        };

        scope.handleEditorChange = (editor:AceAjax.Editor) => {
          ngModelCtrl.$setViewValue(editor.getValue());
        };
     }
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
