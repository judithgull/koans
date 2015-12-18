module codeEditor {
  /* global describe, beforeEach, it, expect, inject, module */
  "use strict";

  describe("codeEditor", function () {
    var scope
      , element;

    beforeEach(angular.mock.module("codeEditor"));

    beforeEach(inject(function ($compile, $rootScope, $httpBackend) {
      scope = $rootScope.$new();
      $httpBackend.whenGET("code-editor/code-editor.tpl.html").respond("");
      element = $compile(angular.element("<code-editor></code-editor>"))(scope);
    }));

    /*  it("should have correct text", function () {
     scope.$apply();
     expect(element.scope().handleEditorChange).toBeDefined();
     });
     */

  });
}
