import { Action } from '@ngrx/store';
import { ISeries, ExerciseProgress } from '../../../common/model';

export const LOAD_EXERCISE_USER_STATE = 'LOAD EXERCISE USER STATE';
export const LOAD_EXERCISE_USER_STATE_FAIL = 'LOAD EXERCISE USER STATE FAIL';
export const LOAD_EXERCISE_USER_STATE_SUCCESS =
  'LOAD EXERCISE USER STATE SUCCESS';
export const EXERCISE_SOLVED = 'EXERCISE SOLVED';
export const TOGGLE_SOLUTION_VISIBLE = 'TOGGLE_SOLUTION_VISIBLE';

export class LoadExerciseUserState implements Action {
  readonly type = LOAD_EXERCISE_USER_STATE;
  constructor(public payload: ISeries) {}
}

export class LoadExerciseUserStateFail implements Action {
  readonly type = LOAD_EXERCISE_USER_STATE_FAIL;
  constructor(public payload: any) {}
}

export class LoadExerciseUserStateSuccess implements Action {
  readonly type = LOAD_EXERCISE_USER_STATE_SUCCESS;
  constructor(
    public payload: {
      seriesId: number;
      userProgress: ExerciseProgress[];
    }
  ) {}
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

export type ExersiseUserStateAction =
  | LoadExerciseUserState
  | LoadExerciseUserStateFail
  | LoadExerciseUserStateSuccess
  | ExerciseSolved
  | ToggleSolutionVisible;
