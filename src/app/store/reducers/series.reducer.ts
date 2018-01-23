import { ISeries } from '../../common/model/series';
import * as sa from '../actions/series.action';

export interface SeriesEntities {
  entities: { [id: string]: ISeries };
  loaded: boolean;
  loading: boolean;
}

export const initialState: SeriesEntities = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: sa.SeriesAction
): SeriesEntities {
  switch (action.type) {
    case sa.LOAD_SERIES: {
      return {
        ...state,
        loading: true
      };
    }
    case sa.LOAD_SERIES_SUCCESS: {
      const entity = action.payload;
      const id = entity._id;

      return {
        loading: false,
        loaded: true,
        entities: {
          ...state.entities,
          [id]: entity
        }
      };
    }
    case sa.LOAD_SERIES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getSeriesLoading = (state: SeriesEntities) => state.loading;
export const getSeriesLoaded = (state: SeriesEntities) => state.loaded;
export const getSeriesEntities = (state: SeriesEntities) => state.entities;
