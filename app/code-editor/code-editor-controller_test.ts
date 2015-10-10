module codeEditor {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('Code Editor Controller', function () {
    var ctrl:ICodeEditorModel;
    var scope:ICodeEditorScope;
    var testEditor: AceAjax.Editor;

    beforeEach(angular.mock.module('codeEditor'));

    beforeEach(inject(function ($rootScope, $controller, $compile) {
      scope = $rootScope.$new();
      scope.libsLoader = () => () => [];
      ctrl = $controller('CodeEditorCtrl', {$scope: scope});
      createTestEditor();
    }));

    var createTestEditor = () => {
      var doc = angular.element(document);
      doc.find('body').append('<div id="testId"></div>');
      var element = doc.find("#testId");
      testEditor =  ace.edit(element.html());
    };


    it('should be defined', function () {
      expect(ctrl).toBeDefined();
    });

    it('should change the initValue', () => {
      const testValue = "test";
      const loader = ctrl.createExerciseDataLoader();
      loader(testEditor);
      testEditor.setValue(testValue);
      ctrl.handleChange({});
      expect(scope.ngModel).toBe(testValue);
    });

  });

}
