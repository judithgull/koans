///<reference path='../../typings/tsd.d.ts' />
module auth {
  'use strict';

  export const USERS_URL = '/users/';

  export interface IAuthService {
    signUp(user:app.IUser):ng.IPromise<void>;
    getToken():string;
    logout():void;
    isLoggedIn():boolean;
    login(email:string, password:string):ng.IPromise<void>;
  }

  export class AuthService implements IAuthService {

    private authTokenKey = 'authToken';
    public static $inject = [
      '$http',
      '$q'
    ];

    constructor(private $http:ng.IHttpService, private $q:ng.IQService) {
    }

    signUp = (user:app.IUser):ng.IPromise<void> => {
      return this.$q.when(this.$http.post(USERS_URL, user).then(
          (response) => {
            var token = response.data['token'];
            if (token) {
              this.setToken(token);
            } else {
              console.log('no token received');
            }
          }
        )
      );

    };

    setToken = (token:string) => localStorage.setItem(this.authTokenKey, token);

    getToken = () => localStorage.getItem(this.authTokenKey);

    logout = () => localStorage.removeItem(this.authTokenKey);

    isLoggedIn = () => !!this.getToken();

    login = (email:string, password:string):angular.IPromise<void> => {
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
