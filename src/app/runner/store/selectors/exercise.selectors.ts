import { createSelector } from '@ngrx/store';

import * as root from '../../../store';
import * as r from '../reducers';
import * as er from '../reducers/exercise.reducer';

export const getSeriesUserStates = createSelector(
  r.getRunnerState,
  (state: r.RunnerState) => state.userState
);

export const getSeriesUserStateEntities = createSelector(
  getSeriesUserStates,
  er.getUserStateEntities
);

export const getSelectedSeriesState = createSelector(
  getSeriesUserStateEntities,
  root.getRouterState,
  (entities, router) => {
    if (entities && router && router.state) {
      const seriesId = router.state.params.id;
      return entities[seriesId];
    }
    return null;
  }
);

export const getSelectedUserState = createSelector(
  getSelectedSeriesState,
  root.getRouterState,
  (seriesUserState: er.SeriesUserState, router) => {
    if (seriesUserState && router.state) {
      const exId = router.state.params.exId;
      return seriesUserState[exId];
    }
    return null;
  }
);
