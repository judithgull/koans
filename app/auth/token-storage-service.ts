import * as angular from "angular";

  export class TokenStorage {
    private authTokenKey = "authToken";

    set = (token:string) => localStorage.setItem(this.authTokenKey, token);

    get = () => localStorage.getItem(this.authTokenKey);

    clear = () => localStorage.removeItem(this.authTokenKey);
  }
