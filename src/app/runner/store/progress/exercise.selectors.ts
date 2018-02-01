import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as root from '../../../store';
import { SeriesProgress } from '../../../common/model';
import { RunnerState, getRunnerState } from '../index';
import { SeriesUserStates } from './exercise.reducer';

export const getUserStateEntities = (state: SeriesUserStates) => state.entities;

export const getRunner = createFeatureSelector<RunnerState>('runner');

export const getSeriesUserStates = createSelector(
  getRunner,
  (state: RunnerState) => state.progress
);

export const getSeriesUserStateEntities = createSelector(
  getSeriesUserStates,
  getUserStateEntities
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
  (seriesUserState: SeriesProgress, router) => {
    if (seriesUserState && router.state) {
      const exId = router.state.params.exId;
      return seriesUserState[exId];
    }
    return null;
  }
);
