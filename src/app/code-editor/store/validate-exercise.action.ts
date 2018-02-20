import { Action } from '@ngrx/store';

export const START_VALIDATE_EXERCISE = 'START VALIDATE EXERCISE';
export class StartValidateExercise implements Action {
  readonly type = START_VALIDATE_EXERCISE;
  constructor(
    public payload: {
      editorId: number;
      seq: number;
      value: string;
    }
  ) {}
}

export type ValidateExerciseAction = StartValidateExercise;

// StartValidateExercise (id1)
// effect: validate 1
//    on failed: -
//    on success:  -

// StartValidateExercise (id1)
//
//
//
