import {} from "jasmine";
import * as angular from "angular";
import "angular-mocks";

module auth {
  "use strict";

  describe("validateEmail", () => {
    var scope, form;

    beforeEach(angular.mock.module("auth"));

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope;
      const element = angular.element(
        "<form name='form'>" +
        "<input name='text' ng-model='model.text' type='email' validate-email>" +
        "</form>"
      );
      scope.model = {text: null};
      $compile(element)(scope);
      form = scope.form;
    }));

    describe("invalid e-mails", () => {
      it("should be invalid for invalid e-mail", () => {
        form.text.$setViewValue("invalid e-mail");
        scope.$digest();
        expect(form.text.$valid).toBe(false);
      });

      it("should be invalid for test@gmx", () => {
        form.text.$setViewValue("test@gmx");
        scope.$digest();
        expect(form.text.$valid).toBe(false);
      });
    });

    it("should be valid for empty string", () => {
      form.text.$setViewValue("");
      scope.$digest();
      expect(form.text.$valid).toBe(true);
    });

    it("should be valid for test@gmx.ch", () => {
      form.text.$setViewValue("test@gmx.ch");
      scope.$digest();
      expect(form.text.$valid).toBe(true);
    });

  });
}
