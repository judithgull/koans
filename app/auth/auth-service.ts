///<reference path='../../typings/tsd.d.ts' />
module auth {
  'use strict';

  export interface IAuthService{

  }

  class AuthService implements IAuthService {
    public static $inject = [
    ];

    constructor() {
    }

    get(): string {
      return 'Auth';
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
