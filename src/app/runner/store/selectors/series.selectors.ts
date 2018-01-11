import { createSelector } from '@ngrx/store';

import * as root from '../../../store';
import * as r from '../reducers';
import * as sr from '../reducers/series.reducer';

export const getSeriesState = createSelector(
  r.getRunnerState,
  (state: r.RunnerState) => state.series
);

export const getSeries = createSelector(getSeriesState, sr.getSeriesData);
export const getSeriesLoading = createSelector(
  getSeriesState,
  sr.getSeriesLoading
);
export const getSeriesLoaded = createSelector(
  getSeriesState,
  sr.getSeriesLoaded
);

export const getSelectedExercise = createSelector(
  getSeries,
  root.getRouterState,
  (series, router) => {
    if (series && router.state) {
      const exId = router.state.params.exId;
      return series.items[exId - 1];
    }
    return null;
  }
);
