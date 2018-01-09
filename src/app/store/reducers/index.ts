import * as sr from './series.reducer';
import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

export interface RunnerState {
  series: sr.SeriesState;
}

export const reducers: ActionReducerMap<RunnerState> = {
  series: sr.reducer
};

export const getRunnerState = createFeatureSelector<RunnerState>('runner');

// series state
export const getSeriesState = createSelector(
  getRunnerState,
  (state: RunnerState) => state.series
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
