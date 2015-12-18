module auth.signUp {
  /* global describe, beforeEach, it, expect, inject, module */
  "use strict";

  describe("sameAs", () => {
    var scope:ng.IScope, form;
    const TEST_VAL_1 = "pw1";
    const TEST_VAL_2 = "pw2";

    beforeEach(angular.mock.module("auth.signUp"));

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope;
      var element = angular.element(
        "<form name='form'>" +
        "<input name='password' ng-model='model.password' type='password'>" +
        "<input name='passwordRepeated' ng-model='model.passwordRepeated' type='password' same-as='model.password'>" +
        "</form>"
      );
      scope["model"] = {
        password: null,
        passwordRepeated: null
      };
      $compile(element)(scope);
      form = scope["form"];
    }));

    it("should be invalid for two different inputs", ()  => {
      form.password.$setViewValue(TEST_VAL_1);
      form.passwordRepeated.$setViewValue(TEST_VAL_2);
      scope.$digest();
      expect(form.passwordRepeated.$valid).toBe(false);
    });

    it("should be valid for the same inputs", ()  => {
      form.password.$setViewValue(TEST_VAL_1);
      form.passwordRepeated.$setViewValue(TEST_VAL_1);
      scope.$digest();
      expect(form.passwordRepeated.$valid).toBe(true);
    });

    it("should be invalid when changing first field to a non-matching value", ()  => {
      form.password.$setViewValue(TEST_VAL_1);
      form.passwordRepeated.$setViewValue(TEST_VAL_1);
      scope.$digest();
      form.password.$setViewValue(TEST_VAL_2);
      scope.$digest();
      expect(form.passwordRepeated.$valid).toBe(false);
    });

    it("should be valid when changing first field to a matching value", ()  => {
      form.password.$setViewValue(TEST_VAL_2);
      form.passwordRepeated.$setViewValue(TEST_VAL_1);
      scope.$digest();
      form.password.$setViewValue(TEST_VAL_1);
      scope.$digest();
      expect(form.passwordRepeated.$valid).toBe(true);
    });

  });
}
