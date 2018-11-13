import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
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
  .ofType(SeriesActionTypes.LOAD_REQUEST)
  .pipe(
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
  querySeries$ = this.actions$.ofType(SeriesActionTypes.QUERY_REQUEST).pipe(
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
    .ofType(SeriesActionTypes.CREATE_REQUEST)
    .pipe(map((a: SeriesCreateRequest) => a.series))
    .pipe(
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
    .ofType(SeriesActionTypes.UPDATE_REQUEST)
    .pipe(map((a: SeriesUpdateRequest) => a.series))
    .pipe(
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
    .ofType(SeriesActionTypes.DELETE_REQUEST)
    .pipe(map((a: SeriesDeleteRequest) => a.seriesId))
    .pipe(
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
    .ofType(SeriesActionTypes.CREATE_SUCCESS, SeriesActionTypes.UPDATE_SUCCESS)
    .pipe(map((a: SeriesCreateSuccess) => new Home()));

  @Effect({ dispatch: false })
  seriesErrors$ = this.actions$.ofType(SeriesActionTypes.ERROR).pipe(
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



