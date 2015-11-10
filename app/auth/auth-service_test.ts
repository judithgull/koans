///<reference path='../../typings/tsd.d.ts' />

module auth {
  /* global describe, beforeEach, it, expect, inject, module */
  'use strict';

  describe('AuthService', () => {
    var service:AuthService;
    var $httpBackend:ng.IHttpBackendService;
    var testToken = 'testToken';
    var user = new app.User('testName', 'testEmail', 'testPwd');

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
      expect(service.isLoggedIn()).toBe(false);
    });


    describe("successful signUp and login", () => {

      var respondTokenWhenPost = (url:string) =>{
        $httpBackend.expectPOST(url);
        $httpBackend.whenPOST(url).respond({token: testToken});
      };

      var expectLoggedIn = () => {
        var savedToken = service.getToken();
        expect(savedToken).toEqual(testToken);
        expect(service.isLoggedIn()).toBe(true);
      };

      it('should store a user and receive a token', () => {
        respondTokenWhenPost(auth.USERS_URL);
        var res = service.signUp(user);
        $httpBackend.flush();
        expect(res).toBeDefined();
        expectLoggedIn();
      });

      it('successful login should receive and store a token', () => {
        respondTokenWhenPost(auth.LOGIN_URL);
        var res = service.login(user.email, user.password);
        $httpBackend.flush();
        expect(res).toBeDefined();
        expectLoggedIn();
      });


    });


  });
}
