import { createSelector } from '@ngrx/store';

import * as root from '../../../store';
import * as r from '../reducers';
import * as er from '../reducers/exercise.reducer';

export const getExerciseUserState = createSelector(
  r.getRunnerState,
  (state: r.RunnerState) => state.exerciseUserState
);
