import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  EXERCISE_SOLVED,
  ExerciseSolved,
  SeriesCompleted
} from './progress.action';
import { getAllExerciseProgresses } from './progress.selectors';
import { map, switchMap, take, tap, last, takeLast } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RunnerState } from '../index';
import { Go, GoToExercise } from '../../../store';

@Injectable()
export class ProgressEffects {
  constructor(private actions$: Actions, private store: Store<RunnerState>) {}

  @Effect()
  navigateNextUnsolved$ = this.actions$.ofType(EXERCISE_SOLVED).pipe(
    switchMap((a: ExerciseSolved) => {
      return this.store.select(getAllExerciseProgresses).pipe(
        take(1),
        map(l => l.filter(p => !p.solved && !p.solutionRequested)),
        map(l => l.filter(p => p.id !== a.payload.id)),
        map(l => {
          if (l.length > 0) {
            const exId = l[0].id;
            return new GoToExercise(exId);
          }
          return new SeriesCompleted(a.payload.seriesId);
        })
      );
    })
  );
}
