import { Action } from '@ngrx/store';
import { ISeries, ExerciseProgress } from '../../../common/model';

export const INIT_SERIES_PROGRESS = 'INIT SERIES PROGRESS';
export const EXERCISE_SOLVED = 'EXERCISE SOLVED';
export const TOGGLE_SOLUTION_VISIBLE = 'TOGGLE_SOLUTION_VISIBLE';

export class InitSeriesProgress implements Action {
  readonly type = INIT_SERIES_PROGRESS;
  constructor(public payload: ISeries) {}
}

export class ExerciseSolved implements Action {
  readonly type = EXERCISE_SOLVED;
  constructor(
    public payload: {
      seriesId: number;
      id: number;
      userSolution: string;
    }
  ) {}
}

export class ToggleSolutionVisible implements Action {
  readonly type = TOGGLE_SOLUTION_VISIBLE;
  constructor(
    public payload: {
      seriesId: number;
      id: number;
    }
  ) {}
}

export type SeriesProgressAction =
  | InitSeriesProgress
  | ExerciseSolved
  | ToggleSolutionVisible;
