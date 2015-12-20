module codeEditor.editMark {
  "use strict";

  describe("editMarkRequired", () => {
    let scope,
        form;

    beforeEach(angular.mock.module("codeEditor"));

    beforeEach(inject( ($compile, $rootScope) => {
      scope = $rootScope.$new();
      var element = angular.element(
        "<form name='form'>" +
        "<input name='text' ng-model='model.text' edit-mark-required>" +
        "</form>"
      );
      scope.model = {text: null};
      $compile(element)(scope);
      form = scope.form;
    }));

    it("should be invalid for a text without edit mark", () => {
      form.text.$setViewValue("bla");
      scope.$digest();
      expect(form.text.$valid).toBe(false);
    });


    it("should be valid for a text with edit mark", () => {
      form.text.$setViewValue("aaa ??? bla");
      scope.$digest();
      expect(form.text.$valid).toBe(true);
    });


  });
}
