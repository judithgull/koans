import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ExerciseUserProgress } from '../../../common/model/exercise';

import * as ua from '../actions';
import { LOAD_SERIES_SUCCESS, LoadSeriesSuccess } from '../../../store';
import { LOAD_EXERCISE_USER_STATE } from '../actions/exercise.action';

@Injectable()
export class UserStateEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  loadSuccess$ = this.actions$.ofType(LOAD_EXERCISE_USER_STATE).pipe(
    map((a: LoadSeriesSuccess) => {
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
