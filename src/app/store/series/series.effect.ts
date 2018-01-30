import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { SeriesService } from '../../common/series.service';
import { of } from 'rxjs/observable/of';
import { HttpParams } from '@angular/common/http';
import { SearchParams } from '../../common/model/search.params';
import { ISeries } from '../../common/model';
import { Home } from '../router';
import {
  LoadSeries,
  LOAD_SERIES,
  LoadSeriesSuccess,
  LoadSeriesFail,
  QUERY_SERIES,
  QuerySeries,
  QuerySeriesSuccess,
  QuerySeriesFail,
  CREATE_SERIES,
  CreateSeries,
  CreateSeriesSuccess,
  UpdateSeriesSuccess,
  UpdateSeriesFail,
  UpdateSeries,
  UPDATE_SERIES,
  DELETE_SERIES,
  DeleteSeries,
  CREATE_SERIES_SUCCESS,
  DeleteSeriesSuccess,
  DeleteSeriesFail,
  UPDATE_SERIES_SUCCESS
} from './series.action';

@Injectable()
export class SeriesEffects {
  constructor(
    private actions$: Actions,
    private seriesService: SeriesService
  ) {}

  @Effect()
  loadSeries$ = this.actions$.ofType(LOAD_SERIES).pipe(
    switchMap((a: LoadSeries) => {
      return this.seriesService
        .get(a.id)
        .pipe(
          map(series => new LoadSeriesSuccess(series)),
          catchError(error => of(new LoadSeriesFail(error)))
        );
    })
  );

  @Effect()
  querySeries$ = this.actions$.ofType(QUERY_SERIES).pipe(
    switchMap((a: QuerySeries) => {
      return this.seriesService
        .getSeries(this.getHttpParams(a.searchParams))
        .pipe(
          map(seriesList => new QuerySeriesSuccess(seriesList)),
          catchError(error => of(new QuerySeriesFail(error)))
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
    .ofType(CREATE_SERIES)
    .pipe(map((a: CreateSeries) => a.payload))
    .pipe(
      switchMap((series: ISeries) => {
        return this.seriesService
          .create(series)
          .pipe(
            map(series => new CreateSeriesSuccess(series)),
            catchError(error => of(new QuerySeriesFail(error)))
          );
      })
    );

  @Effect()
  updateSeries$ = this.actions$
    .ofType(UPDATE_SERIES)
    .pipe(map((a: UpdateSeries) => a.payload))
    .pipe(
      switchMap((series: ISeries) => {
        return this.seriesService
          .update(series)
          .pipe(
            map(series => new UpdateSeriesSuccess(series)),
            catchError(error => of(new UpdateSeriesFail(error)))
          );
      })
    );

  @Effect()
  deleteSeries$ = this.actions$
    .ofType(DELETE_SERIES)
    .pipe(map((a: DeleteSeries) => a.payload))
    .pipe(
      switchMap((id: string) => {
        return this.seriesService
          .delete(id)
          .pipe(
            map(() => new DeleteSeriesSuccess(id)),
            catchError(error => of(new DeleteSeriesFail(error)))
          );
      })
    );

  @Effect()
  homeOnSuccess$ = this.actions$
    .ofType(CREATE_SERIES_SUCCESS, UPDATE_SERIES_SUCCESS)
    .pipe(map((a: CreateSeriesSuccess) => new Home()));
}
