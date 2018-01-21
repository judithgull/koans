import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ExerciseUserProgress } from '../../../common/model/exercise';

import * as sa from '../../../store/actions';
import * as ua from '../actions';

@Injectable()
export class UserStateEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  loadSuccess$ = this.actions$.ofType(sa.LOAD_SERIES_SUCCESS).pipe(
    map((a: sa.LoadSeriesSuccess) => {
      const initialUserProgress: ExerciseUserProgress[] = a.payload.items.map(
        e => {
          return {
            id: e.sortOrder,
            userSolution: e.exercise,
            solved: false,
            solutionRequested: false,
            solutionVisible: false
          };
        }
      );
      return new ua.LoadExerciseUserStateSuccess({
        seriesId: a.payload._id,
        userProgress: initialUserProgress
      });
    })
  );
}
