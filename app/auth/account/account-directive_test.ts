import {} from "jasmine";
import * as angular from "angular";
import "angular-mocks";

module auth.account {
  "use strict";

  /**
   * Account logic is tested in controller. Only verify setup here.
   * */
  describe("account", () => {
    let scope:ng.IRootScopeService,
      element;

    beforeEach(angular.mock.module("auth.account"));

    beforeEach(inject(($compile, $rootScope) => {
      scope = $rootScope.$new();
      element = $compile(angular.element("<account></account>"))(scope);
    }));

    it("should exist", ()  => {
      scope.$digest();
      expect(element).toBeDefined();
    });

  });

}
