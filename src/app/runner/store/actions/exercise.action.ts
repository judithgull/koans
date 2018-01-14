import { Action } from '@ngrx/store';
import { ExerciseUserProgress } from '../../../common/model/exercise';

export const LOAD_EXERCISE_USER_STATE = 'LOAD EXERCISE USER STATE';
export const LOAD_EXERCISE_USER_STATE_FAIL = 'LOAD EXERCISE USER STATE FAIL';
export const LOAD_EXERCISE_USER_STATE_SUCCESS =
  'LOAD EXERCISE USER STATE SUCCESS';
export const EXERCISE_SOLVED = 'EXERCISE SOLVED';

export class LoadExerciseUserState implements Action {
  readonly type = LOAD_EXERCISE_USER_STATE;
  constructor(public count: number) {}
}

export class LoadExerciseUserStateFail implements Action {
  readonly type = LOAD_EXERCISE_USER_STATE_FAIL;
  constructor(public payload: any) {}
}

export class LoadExerciseUserStateSuccess implements Action {
  readonly type = LOAD_EXERCISE_USER_STATE_SUCCESS;
  constructor(public payload: ExerciseUserProgress[]) {}
}

export class ExerciseSolved implements Action {
  readonly type = EXERCISE_SOLVED;
  constructor(public payload: ExerciseUserProgress) {}
}

export type ExersiseUserStateAction =
  | LoadExerciseUserState
  | LoadExerciseUserStateFail
  | LoadExerciseUserStateSuccess
  | ExerciseSolved;
