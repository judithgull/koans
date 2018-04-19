import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ExerciseProgress, SeriesProgress } from '../../model';
import { SeriesProgressEntities } from './progress.reducer';
import { getRouterState } from '../router';

export const getProgress = createFeatureSelector<SeriesProgressEntities>('progress');

export const getEntities = (state: SeriesProgressEntities) => state.entities;

export const getSeriesUserStateEntities = createSelector(
  getProgress,
  getEntities
);

export const getSelectedSeriesState = createSelector(
  getSeriesUserStateEntities,
  getRouterState,
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
  getRouterState,
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
