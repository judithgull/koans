import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as sr from './series.reducer';

export interface RunnerState {
  series: sr.SeriesState;
}

export const reducers: ActionReducerMap<RunnerState> = {
  series: sr.reducer
};

export const getRunnerState = createFeatureSelector<RunnerState>('runner');
