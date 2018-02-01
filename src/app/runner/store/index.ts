import { SeriesUserStates, reducer } from './progress/exercise.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { UserStateEffects } from './progress';

export const effects: any[] = [UserStateEffects];

export const getRunnerState = createFeatureSelector<RunnerState>('runner');

export interface RunnerState {
  progress: SeriesUserStates;
}

export const reducers: ActionReducerMap<RunnerState> = {
  progress: reducer
};

export * from './progress';
