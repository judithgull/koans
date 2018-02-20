import { ValidateExerciseAction } from './validate-exercise.action';

export interface RunningState {
  running: boolean;
  seq: number;
}

export interface ValidationState {
  editorId: number;
  running: boolean;
  seq: number;
}

export interface ValidateExerciseEntities {
  entities: { [id: number]: ValidationState };
}

export const initialState: ValidateExerciseEntities = {
  entities: {}
};

export function validateExerciseReducer(
  state = initialState,
  action: ValidateExerciseAction
): ValidateExerciseEntities {
  switch (action.type) {
  }
  return state;
}
