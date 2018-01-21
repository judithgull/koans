import { createSelector } from '@ngrx/store';

import * as r from '../reducers';
import * as sr from '../reducers/series.reducer';

export const getSeries = createSelector(r.getSeriesState, sr.getSeriesData);
export const getSeriesLoading = createSelector(
  r.getSeriesState,
  sr.getSeriesLoading
);
export const getSeriesLoaded = createSelector(
  r.getSeriesState,
  sr.getSeriesLoaded
);

export const getSelectedExercise = createSelector(
  getSeries,
  r.getRouterState,
  (series, router) => {
    if (series && router.state) {
      const exId = router.state.params.exId;
      return series.items[exId - 1];
    }
    return null;
  }
);
