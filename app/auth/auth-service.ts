///<reference path='../../typings/tsd.d.ts' />
module auth {
  'use strict';

  export const USERS_URL = '/users/';
  export const LOGIN_URL = '/login/';

  export interface IAuthService {
    signUp(user:app.IUser):ng.IPromise<void>;
    logout():void;
    isLoggedIn():boolean;
    login(email:string, password:string):ng.IPromise<void>;
  }

  export class AuthService implements IAuthService {

    public static $inject = [
      '$http',
      '$q',
      'TokenStorage'
    ];

    constructor(
      private $http:ng.IHttpService,
      private $q:ng.IQService,
      private tokenStorage:token.TokenStorage) {
    }

    signUp = (user:app.IUser):ng.IPromise<void> => {
      return this.$q.when(this.$http.post(USERS_URL, user)
        .then(this.saveToken)
      );

    };

    logout = () => this.tokenStorage.clear();

    isLoggedIn = () => !!this.tokenStorage.get();

    login = (email:string, password:string):angular.IPromise<void> => {
      return this.$q.when(this.$http.post(LOGIN_URL,
        {email: email, password: password})
        .then(this.saveToken)
      );
    };

    private saveToken = (response) => {
      var token = response.data['token'];
      if (token) {
        this.tokenStorage.set(token);
      } else {
        console.log('no token received');
      }
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
