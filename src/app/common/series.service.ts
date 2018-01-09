import { Exercise, ExerciseInfo } from './model/exercise';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ISeries, Series } from './model/series';

export const URL_SERIES = 'http://localhost:3000/topics/';

@Injectable()
export class SeriesService {

  constructor(private http: HttpClient) { }

  getSeries(params?: HttpParams): Observable<ISeries[]> {
    return this.http
      .get(URL_SERIES,
      {
        responseType: 'json',
        params: params
      })
      .catch(this.handleError);
  }

  get(id: string): Observable<ISeries> {
    if (!id) {
      return Observable.throw('invalid id');
    }
    return this.http
      .get(`${URL_SERIES}${id}`)
      .catch(this.handleError);
  }

  getExercise(seriesId: string, exSortOrder: number): Observable<ExerciseInfo> {
    return this
      .get(seriesId)
      .map(s => {
        const res = {} as ExerciseInfo;
        const item = this.getItem(s, exSortOrder);
        if (item) {
          return new ExerciseInfo(item,
            s.programmingLanguage,
            item.sortOrder > 1,
            item.sortOrder < s.items.length
          );
        }
        return null;
      });
  }

  private getItem(series: ISeries, exSortOrder: number): Exercise {
    const items = series
      .items
      .filter(item => item.sortOrder === exSortOrder);
    if (items.length === 1) {
      return items[0];
    }
    return null;
  }

  create(series: ISeries): Observable<any> {
    return this.http.post(URL_SERIES, series)
      .catch(this.handleError);
  }

  update(series: ISeries): Observable<any> {
    return this.http.put(`${URL_SERIES}${series._id}`, series)
      .catch(this.handleError);
  }

  delete(id: number): Observable<ISeries> {
    return this.http.delete(`${URL_SERIES}${id}`)
      .catch(this.handleError);
  }

  private handleError(err: any) {
    console.log(err);
    if (err.status === 401) {
      return Observable.throw('Unauthorized');
    }
    return Observable.throw(err);
  }

}
