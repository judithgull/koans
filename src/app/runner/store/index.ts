import {
  ProgressEffects,
  SeriesProgressEntities,
  progressReducer
} from './progress';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export const effects: any[] = [ProgressEffects];

export const getRunnerState = createFeatureSelector<RunnerState>('runner');

export interface RunnerState {
  progress: SeriesProgressEntities;
}

export const reducers: ActionReducerMap<RunnerState> = {
  progress: progressReducer
};

export * from './progress';
