import {User, IUser} from "../../core/user";
import {} from "jasmine";
import * as sinon from "sinon";
import * as angular from "angular";
import "angular-mocks";
import {SignUpCtrl} from "./sign-up-controller";
import {IAuthService} from "../auth-service";

module auth.signUp {
  "use strict";

  describe("SignUpCtrl", () => {
    var ctrl:SignUpCtrl;
    var submitUserSpy;
    var deferred:ng.IDeferred<any>;

    beforeEach(angular.mock.module("auth.signUp"));

    beforeEach(inject(($rootScope, $controller, $q:ng.IQService) => {
      submitUserSpy = sinon.spy();
      deferred = $q.defer();

      const mockAuthService:IAuthService = {
        signUp: (user:IUser):ng.IPromise<void> => {
          submitUserSpy(user);
          return deferred.promise;
        },
        logout: () => undefined,
        isLoggedIn: () => false,
        getLoggedInUser: ()=>null,
        login: (email, password) => null
      };

      ctrl = $controller("SignUpCtrl",
        {
          AuthService: mockAuthService
        });
    }));

    it("should have an empty user initially", ()  => {
      expect(ctrl.user).toBeDefined();
      expect(ctrl.user.email).toBe(null);
      expect(ctrl.user.name).toBe(null);
      expect(ctrl.user.password).toBe(null);
    });

    describe("submit", () => {

      it("should call submit user once", ()  => {
        ctrl.submit();
        sinon.assert.calledOnce(submitUserSpy);
        sinon.assert.calledWith(submitUserSpy, new User());
      });

      it("should call submit user once with correct values", ()  => {
        const testUser = new User();
        testUser.name = "testName";
        testUser.email = "testEmail";
        testUser.password = "testPwd";
        ctrl.user = testUser;

        ctrl.submit();
        sinon.assert.calledOnce(submitUserSpy);
        sinon.assert.calledWith(submitUserSpy, testUser);
      });

    });

  });
}
