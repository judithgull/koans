///<reference path='../../typings/tsd.d.ts' />
module auth {
  'use strict';

  export const USERS_URL = '/users/';

  export interface IAuthService {
    submitUser(user:app.IUser):ng.IPromise<string>;
  }

  class AuthService implements IAuthService {

    public static $inject = [
      '$http'
    ];

    constructor(private $http:ng.IHttpService) {
    }

    submitUser = (user:app.IUser):ng.IPromise<string> => {
      return this.$http.post(USERS_URL, user)
        .error(e => console.log(e));
    }

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
