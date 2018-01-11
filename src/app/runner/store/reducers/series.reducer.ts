import { ISeries } from '../../../common/model/series';
import * as sa from '../actions/series.action';

export interface SeriesState {
  data: ISeries;
  loaded: boolean;
  loading: boolean;
}

export const initialState: SeriesState = {
  data: null,
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: sa.SeriesAction
): SeriesState {
  switch (action.type) {
    case sa.LOAD_SERIES: {
      return {
        ...state,
        loading: true
      };
    }
    case sa.LOAD_SERIES_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data
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

export const getSeriesLoading = (state: SeriesState) => state.loading;
export const getSeriesLoaded = (state: SeriesState) => state.loaded;
export const getSeriesData = (state: SeriesState) => state.data;
