///<reference path='../../typings/tsd.d.ts' />
module auth {
  'use strict';

  export const USERS_URL = '/users/';
  export const LOGIN_URL = '/login/';

  export interface IAuthService {
    signUp(user:app.IUser):ng.IPromise<void>;
    logout():void;
    isLoggedIn():boolean;
    getLoggedInUser():app.IUser;
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

    private userKey = 'user';

    logout = () => {
      this.tokenStorage.clear();
      localStorage.removeItem(this.userKey);
    };

    isLoggedIn = () => !!this.tokenStorage.get();

    getLoggedInUser = () => JSON.parse(localStorage.getItem(this.userKey));

    login = (email:string, password:string):angular.IPromise<void> => {
      return this.handleTokenRequest(
        this.$http.post(LOGIN_URL,{email: email, password: password})
      );
    };

    signUp = (user:app.IUser):ng.IPromise<void> => {
      return this.handleTokenRequest(
        this.$http.post(USERS_URL, user)
      );
    };

    private handleTokenRequest = (request) => {
      var deferred:ng.IDeferred<void> = <ng.IDeferred<any>>this.$q.defer();
      this.$q.when(
        request
          .then((response) => {
            this.saveLoginData(response);
            deferred.resolve();
          }, (response) => {
            deferred.reject(response.data.message);
          })
      );
      return deferred.promise;
    };


    private saveLoginData = (response) => {
      var token = response.data['token'];
      var user = response.data['user'];
      if (token && user) {
        this.tokenStorage.set(token);
        localStorage.setItem(this.userKey, JSON.stringify(user));
      } else {
        console.log('incomplete login information received');
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
