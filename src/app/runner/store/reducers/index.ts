import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as sr from './series.reducer';
import * as er from './exercise.reducer';

export interface RunnerState {
  series: sr.SeriesState;
  userState: er.SeriesUserStates;
}

export const reducers: ActionReducerMap<RunnerState> = {
  series: sr.reducer,
  userState: er.reducer
};

export const getRunnerState = createFeatureSelector<RunnerState>('runner');
