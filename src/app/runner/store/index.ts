import {
  SeriesProgressEntities,
  progressReducer,
  ProgressEffects
} from './progress';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface RunnerState {
  progress: SeriesProgressEntities;
}

export const getRunnerState = createFeatureSelector<RunnerState>('runner');

export const reducers: ActionReducerMap<RunnerState> = {
  progress: progressReducer
};

export * from './progress';

export const effects: any[] = [ProgressEffects];
