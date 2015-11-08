///<reference path='../../typings/tsd.d.ts' />
module auth {
  'use strict';

  export const USERS_URL = '/users/';

  export interface IAuthService {
    submitUser(user:app.IUser):ng.IPromise<string>;
    setToken(token:string):void;
    getToken():string;
  }

  class AuthService implements IAuthService {
    private authTokenKey = 'authToken';
    public static $inject = [
      '$http',
      '$q'
    ];

    constructor(private $http:ng.IHttpService, private $q:ng.IQService) {
    }

    submitUser = (user:app.IUser):ng.IPromise<string> => {
      return this.$q.when(this.$http.post(USERS_URL, user).then(
        (response) => response.data['token']));
    };

    setToken = (token:string) => localStorage.setItem(this.authTokenKey, token);

    getToken = () => localStorage.getItem(this.authTokenKey);
  }

  /**
   * @ngdoc service
   * @name auth.service:Auth
   *
   * @description
   *
   */
  angular
    .module('auth')
    .service('AuthService', AuthService);
}
