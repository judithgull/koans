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
    case sa.LOAD_SERIES:
    case sa.QUERY_SERIES: {
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
    case sa.QUERY_SERIES_SUCCESS: {
      const entities = createEntityObject(
        action.payload,
        s => s._id,
        state.entities
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
  }
  return state;
}

function createEntityObject<T>(
  a: T[],
  extractId: (T) => string,
  initialEntities: { [id: string]: T }
): { [id: string]: T } {
  return a.reduce(
    (entities: { [id: string]: T }, s: T) => {
      return {
        ...entities,
        [extractId(s)]: s
      };
    },
    {
      ...initialEntities
    }
  );
}

export const getSeriesLoading = (state: SeriesEntities) => state.loading;
export const getSeriesLoaded = (state: SeriesEntities) => state.loaded;
export const getSeriesEntities = (state: SeriesEntities) => state.entities;
