///<reference path='../../typings/tsd.d.ts' />

module auth {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('AuthService', () => {
    var service:AuthService;
    var $httpBackend:ng.IHttpBackendService;
    var testToken = 'testToken';

    beforeEach(angular.mock.module('auth'));

    beforeEach(inject((AuthService, $injector) => {
      service = AuthService;
      $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(() => {
      service.logout();
    });

    it('should logout', () => {
      service.setToken(testToken);
      service.logout();
      var token = service.getToken();
      expect(token).toBeNull();
    });

    describe("createUser", () => {

      var user = new app.User('testName', 'testEmail', 'testPwd');

      it('should store a user', () => {
        $httpBackend.expectPOST(auth.USERS_URL);
        $httpBackend.whenPOST(auth.USERS_URL).respond({token: 'testToken'});
        service.signUp(user);

        $httpBackend.flush();
        var savedToken = service.getToken();
        expect(savedToken).toEqual(testToken);

      });
    });


  });
}
