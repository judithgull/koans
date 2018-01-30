import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as sa from '../actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { SeriesService } from '../../common/series.service';
import { of } from 'rxjs/observable/of';
import { HttpParams } from '@angular/common/http';
import { SearchParams } from '../../common/model/search.params';
import { ISeries } from '../../common/model';
import { Home } from '../router';

@Injectable()
export class SeriesEffects {
  constructor(
    private actions$: Actions,
    private seriesService: SeriesService
  ) {}

  loadSeries$ = this.actions$.ofType(sa.LOAD_SERIES).pipe(
    switchMap((a: sa.LoadSeries) => {
      return this.seriesService
        .get(a.id)
        .pipe(
          map(series => new sa.LoadSeriesSuccess(series)),
          catchError(error => of(new sa.LoadSeriesFail(error)))
        );
    })
  );

  @Effect()
  querySeries$ = this.actions$.ofType(sa.QUERY_SERIES).pipe(
    switchMap((a: sa.QuerySeries) => {
      return this.seriesService
        .getSeries(this.getHttpParams(a.searchParams))
        .pipe(
          map(seriesList => new sa.QuerySeriesSuccess(seriesList)),
          catchError(error => of(new sa.QuerySeriesFail(error)))
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
    .ofType(sa.CREATE_SERIES)
    .pipe(map((a: sa.CreateSeries) => a.payload))
    .pipe(
      switchMap((series: ISeries) => {
        return this.seriesService
          .create(series)
          .pipe(
            map(series => new sa.CreateSeriesSuccess(series)),
            catchError(error => of(new sa.QuerySeriesFail(error)))
          );
      })
    );

  @Effect()
  updateSeries$ = this.actions$
    .ofType(sa.UPDATE_SERIES)
    .pipe(map((a: sa.UpdateSeries) => a.payload))
    .pipe(
      switchMap((series: ISeries) => {
        return this.seriesService
          .update(series)
          .pipe(
            map(series => new sa.UpdateSeriesSuccess(series)),
            catchError(error => of(new sa.UpdateSeriesFail(error)))
          );
      })
    );

  @Effect()
  deleteSeries$ = this.actions$
    .ofType(sa.DELETE_SERIES)
    .pipe(map((a: sa.DeleteSeries) => a.payload))
    .pipe(
      switchMap((id: string) => {
        return this.seriesService
          .delete(id)
          .pipe(
            map(() => new sa.DeleteSeriesSuccess(id)),
            catchError(error => of(new sa.DeleteSeriesFail(error)))
          );
      })
    );

  @Effect()
  homeOnSuccess$ = this.actions$
    .ofType(sa.CREATE_SERIES_SUCCESS, sa.UPDATE_SERIES_SUCCESS)
    .pipe(map((a: sa.CreateSeriesSuccess) => new Home()));
}
