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

      var mockAuthService:auth.IAuthService = {
        signUp: (user:core.IUser):ng.IPromise<void> => {
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
        sinon.assert.calledWith(submitUserSpy, new core.User());
      });

      it("should call submit user once with correct values", ()  => {
        const testUser = new core.User();
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
