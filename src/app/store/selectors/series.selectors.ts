import { createSelector } from '@ngrx/store';

import * as r from '../reducers';
import * as sr from '../reducers/series.reducer';
import { Selector } from '@ngrx/store/src/models';

export const getSeriesEntities = createSelector(
  r.getSeries,
  sr.getSeriesEntities
);

export const getSelectedSeries = createSelector(
  getSeriesEntities,
  r.getRouterState,
  (entities, router) => {
    if (entities && router.state) {
      const seriesId = router.state.params.id;
      return entities[seriesId];
    }
    return null;
  }
);

export const getSelectedExercise = createSelector(
  getSelectedSeries,
  r.getRouterState,
  (series, router) => {
    if (series && router.state) {
      const exId = router.state.params.exId;
      return series.items[exId - 1];
    }
    return null;
  }
);

export const getAllSeries = createSelector(getSeriesEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export function getOwnSeries(authorId: string) {
  return createSelector(getAllSeries, series =>
    series.filter(s => s.authorId === authorId)
  );
}
