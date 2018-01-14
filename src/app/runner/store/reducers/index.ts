import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as sr from './series.reducer';
import * as er from './exercise.reducer';

export interface RunnerState {
  series: sr.SeriesState;
  exerciseUserState: er.ExerciseUserState;
}

export const reducers: ActionReducerMap<RunnerState> = {
  series: sr.reducer,
  exerciseUserState: er.reducer
};

export const getRunnerState = createFeatureSelector<RunnerState>('runner');
