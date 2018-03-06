import { Action } from '@ngrx/store';
import { ISeries, ExerciseProgress, ModelState } from '../../../common/model';

export const INIT_SERIES_PROGRESS = 'INIT SERIES PROGRESS';
export class InitSeriesProgress implements Action {
  readonly type = INIT_SERIES_PROGRESS;
  constructor(public payload: ISeries) {}
}

export const EXERCISE_SOLVED = 'EXERCISE SOLVED';
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

export const TOGGLE_SOLUTION_VISIBLE = 'TOGGLE_SOLUTION_VISIBLE';
export class ToggleSolutionVisible implements Action {
  readonly type = TOGGLE_SOLUTION_VISIBLE;
  constructor(
    public payload: {
      seriesId: number;
      id: number;
    }
  ) {}
}

export const REGISTER_MODEL = 'REGISTER_MODEL';
export class RegisterModel implements Action {
  readonly type = REGISTER_MODEL;
  constructor(
    public payload: {
      seriesId: number;
      id: number;
      modelState: ModelState;
    }
  ) {}
}

export const SERIES_COMPLETED = 'SERIES_COMPLETED';
export class SeriesCompleted implements Action {
  readonly type = SERIES_COMPLETED;
  constructor(public seriesId: number) {}
}

export type SeriesProgressAction =
  | InitSeriesProgress
  | ExerciseSolved
  | SeriesCompleted
  | ToggleSolutionVisible
  | RegisterModel;
