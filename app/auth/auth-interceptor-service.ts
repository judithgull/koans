///<reference path='../../typings/tsd.d.ts' />
module auth.interceptor {
  'use strict';

  export class AuthInterceptor implements ng.IHttpInterceptor{

    public static $inject = ['TokenStorage'];

    constructor(
      private tokenStorage:token.TokenStorage
    ) {
    }

    request = (config: ng.IRequestConfig):ng.IRequestConfig => {
      var token = this.tokenStorage.get();
      if (token && config.headers) {
        config.headers['authorization'] = 'Bearer ' + token;
      }
      return config;
    };

  }

  /**
  * @ngdoc service
  * @name auth.factory:AuthInterceptor
  *
  * @description
  *
  */
  angular
    .module('auth')
    .service('AuthInterceptor', AuthInterceptor)
    .config(($httpProvider:ng.IHttpProvider) => {
      $httpProvider.interceptors.push('AuthInterceptor');
  });

}
