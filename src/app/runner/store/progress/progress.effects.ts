import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ExerciseProgress, Exercise } from '../../../common/model';
import { LOAD_SERIES_SUCCESS, LoadSeriesSuccess } from '../../../store';
import {
  INIT_SERIES_PROGRESS,
  LoadSeriesProgressSuccess
} from './progress.action';
import { toInitialProgress } from './progress.util';

@Injectable()
export class ProgressEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  loadSuccess$ = this.actions$.ofType(INIT_SERIES_PROGRESS).pipe(
    map((a: LoadSeriesSuccess) => {
      const initialUserProgress: ExerciseProgress[] = a.payload.items.map(
        toInitialProgress
      );
      return new LoadSeriesProgressSuccess({
        seriesId: a.payload._id,
        userProgress: initialUserProgress
      });
    })
  );
}
