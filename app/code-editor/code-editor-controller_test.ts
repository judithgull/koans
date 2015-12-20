module codeEditor.editMark {
  /* global describe, beforeEach, it, expect, inject, module */
  "use strict";

  describe("Code Editor Controller", function () {
    var ctrl:ICodeEditorModel;
    var scope:ICodeEditorScope;
    var testEditor:AceAjax.Editor;

    var createTestEditor = () => {
      var doc = angular.element(document);
      doc.find("body").append("<div  id='#test'></div>");
      var element = doc.find("#test");
      testEditor = ace.edit(element.get(0));
    };

    beforeEach(angular.mock.module("codeEditor"));

    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      scope.libsLoader = () => () => [];
      ctrl = $controller("CodeEditorCtrl", {$scope: scope});
      createTestEditor();
    }));

    it("should be defined", function () {
      expect(ctrl).toBeDefined();
    });

    /*    it("should change the initValue", () => {
     const testValue = "test";
     const loader = ctrl.createExerciseDataLoader();
     loader(testEditor);
     testEditor.setValue(testValue);
     //ctrl.handleChange({});
     //expect(scope.ngModel).toBe(testValue);
     });
     */
  });


}
