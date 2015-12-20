module auth {
  "use strict";

  describe("AuthService", () => {
    var service:AuthService;
    var $httpBackend:ng.IHttpBackendService;
    var testToken = "testToken";
    var user = new app.User("testName", "testEmail", "testPwd");
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
      respondTokenWhenPost(auth.USERS_URL);
      var res = service.signUp(user);
      $httpBackend.flush();
      expect(res).toBeDefined();
      expect(service.isLoggedIn()).toBe(true);
      expect(service.getLoggedInUser()).toEqual(testUserResponse);
    });

    it("successful login should login", () => {
      respondTokenWhenPost(auth.LOGIN_URL);
      var res = service.login(user.email, user.password);
      $httpBackend.flush();
      expect(res).toBeDefined();
      expect(service.isLoggedIn()).toBe(true);
    });

    it("should logout", () => {
      respondTokenWhenPost(auth.LOGIN_URL);
      service.login(user.email, user.password);
      $httpBackend.flush();
      service.logout();
      expect(service.isLoggedIn()).toBe(false);
    });

  });
}
