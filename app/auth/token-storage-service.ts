module auth {
  "use strict";

  export class TokenStorage {
    private authTokenKey = "authToken";

    set = (token:string) => localStorage.setItem(this.authTokenKey, token);

    get = () => localStorage.getItem(this.authTokenKey);

    clear = () => localStorage.removeItem(this.authTokenKey);
  }

  /**
   * @ngdoc service
   * @name auth.service:TokenStorage
   *
   * @description Service for storing the token.
   *
   **/
  angular
    .module("auth")
    .service("TokenStorage", TokenStorage);
}
