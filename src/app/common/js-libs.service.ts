import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

export const JS_LIB_URL = `${environment.apiUrl}/jsLibs/`;

@Injectable()
export class JsLibsService {
  constructor(private http: HttpClient) {}

  get(libPath: string): Observable<string> {
    return this.http.get(`${JS_LIB_URL}${libPath}`, {
      responseType: 'text'
    }) as Observable<string>;
  }
}
