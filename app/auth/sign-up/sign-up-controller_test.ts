///<reference path='../../../typings/tsd.d.ts' />
module signUp.SignUpCtrl {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('SignUpCtrl', () => {
    var ctrl:SignUpCtrl;
    var submitUserSpy;
    var goSpy;
    var deferred:ng.IDeferred<any>;

    beforeEach(angular.mock.module('auth.signUp'));

    beforeEach(inject( ($rootScope, $controller, $q:ng.IQService) =>  {
      submitUserSpy = sinon.spy();
      deferred = $q.defer();

      var mockAuthService:auth.IAuthService = {
        signUp: (user:app.IUser):ng.IPromise<void> => {
          submitUserSpy(user);
          return deferred.promise;
        },
        logout: () => {},
        isLoggedIn: () => false,
        login: (email, password) => {return null;}
      };

      goSpy = sinon.spy();
      var mockStateService = {
        go: goSpy
      };

      ctrl = $controller('SignUpCtrl',
        {AuthService: mockAuthService,
          $state: mockStateService
        });
    }));

    it('should have an empty user initially', ()  => {
      expect(ctrl.user).toBeDefined();
      expect(ctrl.user.email).toBe(null);
      expect(ctrl.user.name).toBe(null);
      expect(ctrl.user.password).toBe(null);
    });

    describe('submit', () => {

      it('should call submit user once', ()  => {
        ctrl.submit();
        sinon.assert.calledOnce(submitUserSpy);
        sinon.assert.calledWith(submitUserSpy, new app.User());
      });

      it('should call submit user once with correct values', ()  => {
        const testUser = new app.User();
        testUser.name = 'testName';
        testUser.email = 'testEmail';
        testUser.password = 'testPwd';
        ctrl.user = testUser;

        ctrl.submit();
        sinon.assert.calledOnce(submitUserSpy);
        sinon.assert.calledWith(submitUserSpy, testUser);
      });

/*      it('should return to home, after successful signup', () => {
        const testUser = new app.User();
        testUser.name = 'testName';
        testUser.email = 'testEmail';
        testUser.password = 'testPwd';
        ctrl.user = testUser;

        ctrl.submit();
        deferred.resolve();
        sinon.assert.calledOnce(goSpy);
        sinon.assert.calledWith(goSpy, 'main.home');
      });
*/
    });

  });
}
