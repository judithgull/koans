import { Injectable } from '@angular/core';
import { IUser, INonSensitiveUser } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export const USERS_URL = `${environment.apiUrl}users/`;

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  save(user: IUser): Observable<INonSensitiveUser> {
    return this.http.post(USERS_URL, user).pipe(
      map(res => (res as any).user as INonSensitiveUser),
      catchError(this.handleError)
    );
  }

  private handleError(err: any) {
    if (err.status === 401) {
      return throwError('Unauthorized');
    }
    return throwError(err);
  }
}
