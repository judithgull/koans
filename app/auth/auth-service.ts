///<reference path='../../typings/tsd.d.ts' />
module auth {
  'use strict';

  export const USERS_URL = '/users/';

  export interface IAuthService {
    submitUser(user:app.IUser):ng.IPromise<string>;
  }

  class AuthService implements IAuthService {

    public static $inject = [
      '$http',
      '$q'
    ];

    constructor(private $http:ng.IHttpService, private $q:ng.IQService) {
    }

    submitUser = (user:app.IUser):ng.IPromise<string> => {
      return this.$q.when(this.$http.post(USERS_URL, user).then(
        (response) => response.data['token']));
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
