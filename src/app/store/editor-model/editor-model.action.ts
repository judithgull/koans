import { Action } from '@ngrx/store';

import { ErrorMarker, ModelState, ExerciseKey } from '../../model';

export enum EditorModelActionTypes {
  INIT = '[Editor Model] INIT',
  VALUE_CHANGE = '[Editor Model] VALUE CHANGE',
  ERROR = '[Editor Model] ERROR',
  SUCCESS = '[Editor Model] SUCCESS',
  TOGGLE_SOLUTION = '[Editor Model] TOGGLE SOLUTION',
  VALIDATE_SELECTED = '[Editor Model] VALIDATE SELECTED',
  VALIDATE = '[Editor Model] VALIDATE'
}

export interface ModelResultAction extends Action {
  modelState: ModelState;
  key: string;
}

export class ModelInitAction implements Action {
  readonly type = EditorModelActionTypes.INIT;
  constructor(public modelStates: ModelState[]) { }
}

export class ModelValueChange implements Action {
  readonly type = EditorModelActionTypes.VALUE_CHANGE;
  constructor(public modelState: ModelState) { }
}

export class ModelValidateSelected implements Action {
  readonly type = EditorModelActionTypes.VALIDATE_SELECTED;
}

export class ModelValidateAction implements Action {
  readonly type = EditorModelActionTypes.VALIDATE;
  constructor(public modelState: ModelState) { }
}

export class ModelError implements ModelResultAction {
  readonly type = EditorModelActionTypes.ERROR;
  constructor(
    public key: string,
    public modelState: ModelState,
    public errors: ErrorMarker[]
  ) { }
}

export class ModelSuccess implements ModelResultAction {
  readonly type = EditorModelActionTypes.SUCCESS;
  constructor(
    public key: string,
    public modelState: ModelState) { }
}

export class ModelToggleSolutionAction implements Action {
  readonly type = EditorModelActionTypes.TOGGLE_SOLUTION;
  constructor(
    public key: ExerciseKey
  ) { }
}

export function createResultAction(
  owner: string,
  modelState: ModelState,
  errors: ErrorMarker[]
): ModelSuccess | ModelError {
  if (errors.length) {
    return new ModelError(owner, modelState, errors);
  } else {
    return new ModelSuccess(owner, modelState);
  }
}

export type ModelAction =
  | ModelValueChange
  | ModelError
  | ModelSuccess
  | ModelToggleSolutionAction
  | ModelInitAction;
