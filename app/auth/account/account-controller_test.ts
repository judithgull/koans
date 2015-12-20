module auth.account {
  /* global describe, beforeEach, it, expect, inject, module */
  "use strict";

  describe("AccountCtrl", () => {
    var $ctrl;

    beforeEach(()=> angular.mock.module("auth.account"));

    beforeEach(inject(($rootScope, $controller) => {
      $ctrl = $controller;
    }));

    describe("login", () => {

      let getCtrl = (mockAuthService):AccountCtrl => {
        return $ctrl("AccountCtrl", {AuthService: mockAuthService});
      };

      it("should inititially not be logged in", () => {
        var authService = {
          isLoggedIn: () => false
        };
        var ctrl = getCtrl(authService);
        expect(ctrl.isLoggedIn).toBe(false);
      });

      it("should be logged in, if user is logged in", () => {
        var authService = {
          isLoggedIn: () => true,
          getLoggedInUser: () => {
            return {name: "testname"};
          }
        };
        var ctrl = getCtrl(authService);
        expect(ctrl.isLoggedIn).toBe(true);
      });

    });

    describe("logout", () => {

      it("should be logged out, if user is logged out", () => {
        var logoutSpy = sinon.spy();
        var stateSpy = sinon.spy();
        var authService = {
          isLoggedIn: () => true,
          logout: logoutSpy,
          getLoggedInUser: () => {
            return {name: "testname"};
          }
        };

        var ctrl = $ctrl("AccountCtrl", {
          AuthService: authService,
          $state: {
            go: stateSpy
          }
        });
        ctrl.logout();
        expect(ctrl.isLoggedIn).toBe(false);
        sinon.assert.calledOnce(logoutSpy);
        sinon.assert.calledOnce(stateSpy);
      });

    });

  });
}
