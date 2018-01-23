import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as sa from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SeriesService } from '../../common/series.service';
import { of } from 'rxjs/observable/of';
import { HttpParams } from '@angular/common/http';
import { SearchParams } from '../../common/model/search.params';
import { ISeries } from '../../common/model';

@Injectable()
export class SeriesEffects {
  constructor(
    private actions$: Actions,
    private seriesService: SeriesService
  ) {}

  @Effect()
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
}
