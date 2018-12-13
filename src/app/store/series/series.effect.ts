import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ISeries, SearchParams} from '../../model';
import { Home } from '../router';
import { SeriesService } from '../../common/series.service';
import { ToastrService } from 'ngx-toastr';
import {
  SeriesLoadRequest,
  SeriesLoadSuccess,
  SeriesError,
  SeriesActionTypes,
  SeriesQueryRequest,
  SeriesQuerySuccess,
  SeriesCreateRequest,
  SeriesCreateSuccess,
  SeriesUpdateSuccess,
  SeriesUpdateRequest,
  SeriesDeleteRequest,
  SeriesDeleteSuccess
} from './series.action';

@Injectable()
export class SeriesEffects {
  constructor(
    private actions$: Actions,
    private seriesService: SeriesService,
    private toastr: ToastrService
  ) { }

  @Effect()
  loadSeries$ = this.actions$
  .pipe(
    ofType(SeriesActionTypes.LOAD_REQUEST),
    switchMap((a: SeriesLoadRequest) => {
      return this.seriesService
        .get(a.id)
        .pipe(
          map(series => new SeriesLoadSuccess(series)),
          catchError(error => of(new SeriesError(error)))
        );
    })
  );

  @Effect()
  querySeries$ = this.actions$
  .pipe(
    ofType(SeriesActionTypes.QUERY_REQUEST),
    switchMap((a: SeriesQueryRequest) => {
      return this.seriesService
        .getSeries(this.getHttpParams(a.searchParams))
        .pipe(
          map(seriesList => new SeriesQuerySuccess(seriesList)),
          catchError(error => of(new SeriesError(error)))
        );
    })
  );

  private getHttpParams(searchParams: SearchParams): HttpParams {
    let params = new HttpParams();

    if (searchParams.searchText) {
      params = params.append('search', searchParams.searchText);
    }
    if (searchParams.authorId) {
      params = params.append('authorId', searchParams.authorId);
    }
    return params;
  }

  @Effect()
  createSeries$ = this.actions$
    .pipe(
      ofType(SeriesActionTypes.CREATE_REQUEST),
      map((a: SeriesCreateRequest) => a.series),
      concatMap((series: ISeries) => {
        return this.seriesService
          .create(series)
          .pipe(
            map(series => new SeriesCreateSuccess(series)),
            catchError(error => of(new SeriesError(error)))
          );
      })
    );

  @Effect()
  updateSeries$ = this.actions$
    .pipe(
      ofType(SeriesActionTypes.UPDATE_REQUEST),
      map((a: SeriesUpdateRequest) => a.series),
      concatMap((series: ISeries) => {
        return this.seriesService
          .update(series)
          .pipe(
            map(series => new SeriesUpdateSuccess(series)),
            catchError(error => of(new SeriesError(error)))
          );
      })
    );

  @Effect()
  deleteSeries$ = this.actions$
    .pipe(
      ofType(SeriesActionTypes.DELETE_REQUEST),
      map((a: SeriesDeleteRequest) => a.seriesId),
      concatMap((id: string) => {
        return this.seriesService
          .delete(id)
          .pipe(
            map(() => new SeriesDeleteSuccess(id)),
            catchError(error => of(new SeriesError(error)))
          );
      })
    );

  @Effect()
  homeOnSuccess$ = this.actions$
    .pipe(
      ofType(SeriesActionTypes.CREATE_SUCCESS, SeriesActionTypes.UPDATE_SUCCESS),
      map((a: SeriesCreateSuccess) => new Home())
      );

  @Effect({ dispatch: false })
  seriesErrors$ = this.actions$
  .pipe(
    ofType(SeriesActionTypes.ERROR),
    map((a: SeriesError) => a.payload),
    tap(error => {
      if (typeof error === 'string') {
        this.toastr.error(error);
      } else if (error instanceof HttpErrorResponse) {
        this.toastr.error(error.message);
      } else {
        this.toastr.error('Unknown error');
      }
    })
  );

}



