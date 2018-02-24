import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as root from '../../../store';
import { SeriesProgress, ExerciseProgress } from '../../../common/model';
import { RunnerState, getRunnerState } from '../index';
import { SeriesProgressEntities } from './progress.reducer';

// TODO rename
export const getEntities = (state: SeriesProgressEntities) => state.entities;

export const getRunner = createFeatureSelector<RunnerState>('runner');

export const getSeriesProgresses = createSelector(
  getRunner,
  (state: RunnerState) => state.progress
);

export const getSeriesUserStateEntities = createSelector(
  getSeriesProgresses,
  getEntities
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

export const getAllExerciseProgresses = createSelector(
  getSelectedSeriesState,
  entities => {
    if (entities) {
      return Object.keys(entities).map(id => entities[id]);
    }
    return [];
  }
);

export const getUnsolvedExerciseIds = createSelector(
  getAllExerciseProgresses,
  (exProgresses: ExerciseProgress[]) => {
    return exProgresses.filter(e => !e.solved && !e.solutionRequested);
  }
);
