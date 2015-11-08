///<reference path='../../typings/tsd.d.ts' />

module auth {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('AuthService', () => {
    var service:IAuthService;
    var $httpBackend:ng.IHttpBackendService;
    var testToken = 'testToken';

    beforeEach(angular.mock.module('auth'));

    beforeEach(inject((AuthService, $injector) => {
      service = AuthService;
      $httpBackend = $injector.get('$httpBackend');
    }));

    describe("createUser", () => {

      var user = new app.User('testName', 'testEmail', 'testPwd');

      it('should store a user', () => {
        $httpBackend.expectPOST(auth.USERS_URL);
        $httpBackend.whenPOST(auth.USERS_URL).respond({token: testToken});
        var result:ng.IPromise<string> = service.submitUser(user);
        result.then((token) => {
          expect(token).toEqual(testToken);
        });

        $httpBackend.flush();

      });
    });

    it('should set a token', () => {
      service.setToken(testToken);
      var savedToken = service.getToken();
      expect(savedToken).toEqual(testToken);
    });

  });
}
