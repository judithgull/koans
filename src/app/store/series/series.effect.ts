import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ISeries, SearchParams, ProgrammingLanguage, ExerciseKey, Exercise } from '../../model';
import { Home } from '../router';
import { SeriesService } from '../../common/series.service';
import { ToastrService } from 'ngx-toastr';
import {
  LoadSeries,
  LOAD_SERIES,
  LoadSeriesSuccess,
  SeriesError,
  QUERY_SERIES,
  QuerySeries,
  QuerySeriesSuccess,
  CREATE_SERIES,
  CreateSeries,
  CreateSeriesSuccess,
  UpdateSeriesSuccess,
  UpdateSeries,
  UPDATE_SERIES,
  DELETE_SERIES,
  DeleteSeries,
  CREATE_SERIES_SUCCESS,
  DeleteSeriesSuccess,
  UPDATE_SERIES_SUCCESS,
  SERIES_ERROR,
  LOAD_SERIES_SUCCESS,
  SeriesAction,
  QUERY_SERIES_SUCCESS
} from './series.action';
import { ModelValueChange } from '../editor-model/editor-model.action';

@Injectable()
export class SeriesEffects {
  constructor(
    private actions$: Actions,
    private seriesService: SeriesService,
    private toastr: ToastrService
  ) { }

  toModelValueChanges = (series: ISeries) => {
    return series.items.map(e => this.toModelValueChange(series, e));
  };

  toModelValueChange = (series: ISeries, e: Exercise) => {
    const key = new ExerciseKey(series._id, e.sortOrder);
    const action = new ModelValueChange({
      id: key.exercisePath,
      versionId: 1,
      progLang: ProgrammingLanguage.typescript,
      value: e.exercise
    });
    return action;
  }

  @Effect()
  loadSeries$ = this.actions$.ofType(LOAD_SERIES).pipe(
    switchMap((a: LoadSeries) => {
      return this.seriesService
        .get(a.id)
        .pipe(
          map(series => new LoadSeriesSuccess(series)),
          catchError(error => of(new SeriesError(error)))
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
    .ofType(CREATE_SERIES)
    .pipe(map((a: CreateSeries) => a.payload))
    .pipe(
      switchMap((series: ISeries) => {
        return this.seriesService
          .create(series)
          .pipe(
            map(series => new CreateSeriesSuccess(series)),
            catchError(error => of(new SeriesError(error)))
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
            catchError(error => of(new SeriesError(error)))
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
            catchError(error => of(new SeriesError(error)))
          );
      })
    );

  @Effect()
  homeOnSuccess$ = this.actions$
    .ofType(CREATE_SERIES_SUCCESS, UPDATE_SERIES_SUCCESS)
    .pipe(map((a: CreateSeriesSuccess) => new Home()));

  @Effect({ dispatch: false })
  seriesErrors$ = this.actions$.ofType(SERIES_ERROR).pipe(
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

  @Effect()
  initModel$ = this.actions$.ofType(LOAD_SERIES_SUCCESS).pipe(
    map((a: LoadSeriesSuccess) => a.payload),
    filter((series: ISeries) => series && series.items && series.items.length > 0),
    switchMap(this.toModelValueChanges)
  );


  @Effect()
  initModelQuery$ = this.actions$.ofType(QUERY_SERIES_SUCCESS).pipe(
    map((a: QuerySeriesSuccess) => a.payload),
    switchMap((s: ISeries[]) => s),
    switchMap(this.toModelValueChanges)
  );

}



