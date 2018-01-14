import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as sa from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SeriesService } from '../../../common/series.service';
import { of } from 'rxjs/observable/of';
import { ExerciseUserProgress } from '../../../common/model/exercise';

@Injectable()
export class SeriesEffects {
  constructor(
    private actions$: Actions,
    private seriesServies: SeriesService
  ) {}

  @Effect()
  loadSeries$ = this.actions$.ofType(sa.LOAD_SERIES).pipe(
    switchMap((a: sa.LoadSeries) => {
      return this.seriesServies
        .get(a.id)
        .pipe(
          map(series => new sa.LoadSeriesSuccess(series)),
          catchError(error => of(new sa.LoadSeriesFail(error)))
        );
    })
  );

  @Effect()
  loadSuccess$ = this.actions$.ofType(sa.LOAD_SERIES_SUCCESS).pipe(
    map((a: sa.LoadSeriesSuccess) => {
      const initialUserState: ExerciseUserProgress[] = a.payload.items.map(
        e => {
          return {
            id: e.sortOrder,
            userSolution: e.exercise,
            solved: false,
            solutionRequested: false
          };
        }
      );
      return new sa.LoadExerciseUserStateSuccess(initialUserState);
    })
  );
}
