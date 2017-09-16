import {} from "jasmine";
import * as angular from "angular";
import "angular-mocks";
import * as sinon from "sinon";
import {AccountCtrl} from "./account-controller"
import account from "./account-module";

describe("AccountCtrl", () => {
    var $ctrl;

    beforeEach(()=> angular.mock.module(account));

    beforeEach(inject(($rootScope, $controller) => {
      $ctrl = $controller;
    }));

    describe("login", () => {

      const getCtrl = (mockAuthService):AccountCtrl => {
        return $ctrl("AccountCtrl", {AuthService: mockAuthService});
      };

      it("should inititially not be logged in", () => {
        const authService = {
          isLoggedIn: () => false
        };
        const ctrl = getCtrl(authService);
        expect(ctrl.isLoggedIn).toBe(false);
      });

      it("should be logged in, if user is logged in", () => {
        const authService = {
          isLoggedIn: () => true,
          getLoggedInUser: () => {
            return {name: "testname"};
          }
        };
        const ctrl = getCtrl(authService);
        expect(ctrl.isLoggedIn).toBe(true);
      });

    });

    describe("logout", () => {

      it("should be logged out, if user is logged out", () => {
        const logoutSpy = sinon.spy();
        const stateSpy = sinon.spy();
        const authService = {
          isLoggedIn: () => true,
          logout: logoutSpy,
          getLoggedInUser: () => {
            return {name: "testname"};
          }
        };

        const ctrl = $ctrl("AccountCtrl", {
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

