import { Action } from '@ngrx/store';

export const GO_TO_EXERCISE = 'GO TO EXERCISE';

export class GoToExercise implements Action {
  readonly type = GO_TO_EXERCISE;
  constructor(public id: number) {}
}
