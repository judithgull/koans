import {AuthInterceptor} from './auth-interceptor-service';
import {TokenStorage} from './token-storage-service';
import {AuthService} from './auth-service';
import * as angular from "angular";

export default "auth";

  /**
   * @ngdoc object
   * @name auth
   * @description authentication module
   *
   **/
  angular
    .module("auth", [])
    .service("AuthService", AuthService)
    .service("TokenStorage", TokenStorage)
    .service("AuthInterceptor", AuthInterceptor)
    .config(($httpProvider:ng.IHttpProvider) => {
       $httpProvider.interceptors.push("AuthInterceptor");
    });

