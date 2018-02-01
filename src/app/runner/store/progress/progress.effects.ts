import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ExerciseProgress } from '../../../common/model';
import { LOAD_SERIES_SUCCESS, LoadSeriesSuccess } from '../../../store';
import {
  LOAD_EXERCISE_USER_STATE,
  LoadSeriesProgressSuccess
} from './progress.action';

@Injectable()
export class ProgressEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  loadSuccess$ = this.actions$.ofType(LOAD_EXERCISE_USER_STATE).pipe(
    map((a: LoadSeriesSuccess) => {
      const initialUserProgress: ExerciseProgress[] = a.payload.items.map(e => {
        return {
          id: e.sortOrder,
          userSolution: e.exercise,
          solved: false,
          solutionRequested: false,
          solutionVisible: false
        };
      });
      return new LoadSeriesProgressSuccess({
        seriesId: a.payload._id,
        userProgress: initialUserProgress
      });
    })
  );
}
