import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as er from './exercise.reducer';

export interface RunnerState {
  userState: er.SeriesUserStates;
}

export const reducers: ActionReducerMap<RunnerState> = {
  userState: er.reducer
};

export const getRunnerState = createFeatureSelector<RunnerState>('runner');
