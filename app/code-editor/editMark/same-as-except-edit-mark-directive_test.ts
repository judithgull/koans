module codeEditor.editMark {
  /* global describe, beforeEach, it, expect, inject, module */
  "use strict";

  describe("sameAsExceptMark", () => {
    var scope:ng.IScope, form;
    // var testExercise = "var a = ???";

    beforeEach(angular.mock.module("codeEditor"));

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope;
      var element = angular.element(
        "<form name='form'>" +
        "<input name='exercise' ng-model='model.exercise'>" +
        "<input name='solution' ng-model='model.solution' same-as-except-edit-mark='model.exercise'>" +
        "</form>"
      );
      // var codeEditor = sinon.spy();
      scope["model"] = {
        exercise: "",
        solution: ""
      };
      $compile(element)(scope);
      form = scope["form"];
    }));

    /*
     it("should be valid, if only ??? has changed", ()  => {
     form.exercise.$setViewValue(testExercise);
     form.solution.$setViewValue("var a = 2;");
     scope.$digest();
     expect(form.solution.$valid).toBe(true);
     });

     it("should be invalid, if something else has changed as well.", ()  => {
     form.exercise.$setViewValue(testExercise);
     form.solution.$setViewValue("var aaa = 2;");
     scope.$digest();
     expect(form.solution.$valid).toBe(false);
     });
     */

  });
}
