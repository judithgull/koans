import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../auth/model/user';
import { LoginInfo } from '../model/login-info';
import { LoginTokenInfo } from '../model/login-token-info';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';
export const LOGIN_URL = 'http://localhost:3000/login/';
export const USERS_URL = 'http://localhost:3000/users/';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<any> {
    return this.http.post(USERS_URL, user)
      .map(data => this.saveLoginData(data as LoginTokenInfo))
      .catch(this.handleError);
  }

  login(loginInfo: LoginInfo): Observable<any> {
    return this.http
      .post(LOGIN_URL, loginInfo)
      .map(data => this.saveLoginData(data as LoginTokenInfo))
      .catch(this.handleError);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  private saveLoginData(data: LoginTokenInfo): void {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }

  private handleError(err: any) {
    console.log(err);
    if (err.status === 401) {
      return Observable.throw('Unauthorized');
    }
    return Observable.throw(err);
  }

}
