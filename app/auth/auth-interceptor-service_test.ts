import {describe,beforeEach,it,inject,expect} from "jasmine";
import * as angular from "angular-mocks";
import {TokenStorage} from "./token-storage-service";
import {AuthInterceptor} from "./auth-interceptor-service";

module auth {
  "use strict";

  describe("AuthInterceptor", () => {
    var interceptor:AuthInterceptor;
    var tokenStorage:TokenStorage;

    const testHeaders:ng.IHttpRequestConfigHeaders = {};
    const testConfig:ng.IRequestConfig = {
      method: "GET",
      url: "testUrl",
      headers: testHeaders
    };

    beforeEach(angular.mock.module("auth"));

    beforeEach(inject((AuthInterceptor, TokenStorage) => {
      interceptor = AuthInterceptor;
      tokenStorage = TokenStorage;
    }));

    it("should intercept the request", () => {
      expect(interceptor.request).toBeDefined();
    });

    it("should not change the config, if no token is available", () => {
      const intercepted = interceptor.request(testConfig);
      expect(intercepted).toEqual(testConfig);
      expect(intercepted.headers["authorization"]).not.toBeDefined();
    });

    it("should add a header, if a token is available", () => {
      tokenStorage.set("testToken");
      const intercepted = interceptor.request(testConfig);
      expect(intercepted).toEqual(testConfig);
      expect(intercepted.headers["authorization"]).toEqual("Bearer testToken");
    });

  });
}
