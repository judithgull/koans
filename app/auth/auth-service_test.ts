import {User} from '../core/user';
import {describe,beforeEach,afterEach,it,inject,expect} from "jasmine";
import * as angular from "angular-mocks";
import {IAuthService} from "./auth-service";

module auth {
  "use strict";

  describe("AuthService", () => {
    var service:IAuthService;
    var $httpBackend:any;
    var testToken = "testToken";
    var user = new User("testName", "testEmail", "testPwd");
    var testUserResponse = {
      _id: "id",
      name: user.name,
      email: user.email
    };

    var respondTokenWhenPost = (url:string) => {
      $httpBackend.expectPOST(url);
      $httpBackend.whenPOST(url).respond({
        token: testToken,
        user: testUserResponse
      });
    };

    beforeEach(angular.mock.module("auth"));

    beforeEach(inject((AuthService, $injector) => {
      service = AuthService;
      $httpBackend = $injector.get("$httpBackend");
    }));

    afterEach(() => {
      service.logout();
    });

    it("successful signup should login", () => {
      respondTokenWhenPost("/users/");
      var res = service.signUp(user);
      $httpBackend.flush();
      expect(res).toBeDefined();
      expect(service.isLoggedIn()).toBe(true);
      expect(service.getLoggedInUser()).toEqual(testUserResponse);
    });

    it("successful login should login", () => {
      respondTokenWhenPost("/login/");
      var res = service.login(user.email, user.password);
      $httpBackend.flush();
      expect(res).toBeDefined();
      expect(service.isLoggedIn()).toBe(true);
    });

    it("should logout", () => {
      respondTokenWhenPost("/login/");
      service.login(user.email, user.password);
      $httpBackend.flush();
      service.logout();
      expect(service.isLoggedIn()).toBe(false);
    });

  });
}
