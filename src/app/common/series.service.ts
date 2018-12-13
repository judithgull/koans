import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Exercise } from '../model/exercise';
import { ISeries } from '../model/series';
import { catchError } from 'rxjs/operators';


export const URL_SERIES = `${environment.apiUrl}topics/`;

@Injectable()
export class SeriesService {
  constructor(private http: HttpClient) { }

  getSeries(params?: HttpParams): Observable<ISeries[]> {
    return this.http
      .get(URL_SERIES, {
        responseType: 'json',
        params: params
      })
      .pipe(catchError(this.handleError)) as Observable<ISeries[]>;
  }

  get(id: string): Observable<ISeries> {
    if (!id) {
      return throwError('invalid id');
    }
    return this.http
      .get(`${URL_SERIES}${id}`)
      .pipe(catchError(this.handleError)) as Observable<ISeries>;
  }

  private getItem(series: ISeries, exSortOrder: number): Exercise {
    const items = series.items.filter(item => item.sortOrder === exSortOrder);
    if (items.length === 1) {
      return items[0];
    }
    return null;
  }

  create(series: ISeries): Observable<ISeries> {
    return this.http
      .post(URL_SERIES, series)
      .pipe(catchError(this.handleError)) as Observable<ISeries>;
  }

  update(series: ISeries): Observable<ISeries> {
    return this.http
      .put(`${URL_SERIES}${series._id}`, series)
      .pipe(catchError(this.handleError)) as Observable<ISeries> ;
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete(`${URL_SERIES}${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    console.log(err);
    if (err.status === 401) {
      return throwError('Unauthorized');
    }
    return throwError(err);
  }
}
