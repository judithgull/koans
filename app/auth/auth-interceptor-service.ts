declare global {
  const angular: ng.IAngularStatic;
}
import {TokenStorage} from "./token-storage-service";

module auth {
  "use strict";

  export class AuthInterceptor implements ng.IHttpInterceptor {

    public static $inject = ["TokenStorage"];

    constructor(private tokenStorage:TokenStorage) {
    }

    request = (config:ng.IRequestConfig):ng.IRequestConfig => {
      var token = this.tokenStorage.get();
      if (token && config.headers) {
        config.headers["authorization"] = "Bearer " + token;
      }
      return config;
    };

  }

  /**
   * @ngdoc service
   * @name auth.service:AuthInterceptor
   *
   * @description interceptor for http request to send token
   *
   **/
  angular
    .module("auth")
    .service("AuthInterceptor", AuthInterceptor)
    .config(($httpProvider:ng.IHttpProvider) => {
      $httpProvider.interceptors.push("AuthInterceptor");
    });
}
