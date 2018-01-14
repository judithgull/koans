import { createSelector } from '@ngrx/store';

import * as root from '../../../store';
import * as r from '../reducers';
import * as er from '../reducers/exercise.reducer';

export const getExerciseUserState = createSelector(
  r.getRunnerState,
  (state: r.RunnerState) => state.exerciseUserState
);

export const getExerciseUserProgress = createSelector(
  getExerciseUserState,
  er.getUserStateEntities
);

export const getExerciseUserStateLoading = createSelector(
  getExerciseUserState,
  er.getUserStateLoading
);
export const getExerciseUserStateLoaded = createSelector(
  getExerciseUserState,
  er.getUserStateLoading
);

export const getSelectedUserState = createSelector(
  getExerciseUserProgress,
  root.getRouterState,
  (entities, router) => {
    if (entities && router.state) {
      const exId = router.state.params.exId;
      return entities[exId];
    }
    return null;
  }
);
