import { createSelector } from '@ngrx/store';

import * as r from '../router';
import * as sr from '../reducers/series.reducer';
import * as series from '../reducers';

/**
 * Get series as entities object
 */
export const getSeriesEntities = createSelector(
  series.getSeries,
  sr.getSeriesEntities
);

/** Series given by router state params */
export const getSelectedSeries = createSelector(
  getSeriesEntities,
  r.getRouterState,
  (entities, router) => {
    return (
      entities && router && router.state && entities[router.state.params.id]
    );
  }
);

/** Exercise given by router state params */
export const getSelectedExercise = createSelector(
  getSelectedSeries,
  r.getRouterState,
  (series, router) => {
    return (
      series &&
      router &&
      router.state &&
      series.items[router.state.params.exId - 1]
    );
  }
);

/** All series as array*/
export const getAllSeries = createSelector(getSeriesEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

/** All series by author*/
export function getOwnSeries(authorId: string) {
  return createSelector(getAllSeries, series =>
    series.filter(s => s.authorId === authorId)
  );
}
