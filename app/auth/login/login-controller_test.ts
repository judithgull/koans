///<reference path='../../../typings/tsd.d.ts' />

module auth.login {

  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('LoginCtrl', function () {
    var ctrl:LoginCtrl;
    var loginSpy;
    var deferred;

    beforeEach(angular.mock.module('auth.login'));

    beforeEach(inject(($controller, $q:ng.IQService) => {

      loginSpy = sinon.spy();
      deferred = $q.defer();

      var mockAuthService:auth.IAuthService = {
        signUp: ():ng.IPromise<void> => { return null;},
        logout: () => {},
        isLoggedIn: () => false,
        login: loginSpy
      };

      ctrl = $controller('LoginCtrl',
        {AuthService: mockAuthService
      });

    }));

    it('should have an empty email and empty password initially', ()  => {
      expect(ctrl.email).toBe(null);
      expect(ctrl.password).toBe(null);
    });

    describe('submit', () => {

      it('should call login once', ()  => {
        ctrl.email = 'testEmail';
        ctrl.password = 'testPwd';
        ctrl.submit();
        sinon.assert.calledOnce(loginSpy);
        sinon.assert.calledWith(loginSpy, 'testEmail', 'testPwd');
      });

    });

  });
}
