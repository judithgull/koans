///<reference path='../../typings/tsd.d.ts' />
module auth {
  'use strict';

  export interface IAuthService{
    submitUser(user:app.IUser):ng.IPromise<string>;
  }

  class AuthService implements IAuthService {
    public static $inject = [
    ];

    constructor() {
    }

    get(): string {
      return 'Auth';
    }

    submitUser = (user:app.IUser):ng.IPromise<string> => {
      return null;
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
