import { Action } from '@ngrx/store';

import { ErrorMarker, ModelState, FeedbackDetails } from '../../model';

export interface ModelResultAction extends Action {
  modelState: ModelState;
  key: string;
}

export const MODEL_VALUE_CHANGE = 'MODEL VALUE CHANGE';
export class ModelValueChange implements Action {
  readonly type = MODEL_VALUE_CHANGE;
  constructor(public modelState: ModelState) { }
}

export const MODEL_ERROR = 'MODEL_ERROR';
export class ModelError implements ModelResultAction {
  readonly type = MODEL_ERROR;
  constructor(
    public key: string,
    public modelState: ModelState,
    public errors: ErrorMarker[]
  ) { }
}

export const MODEL_SUCCESS = 'MODEL_SUCCESS';
export class ModelSuccess implements ModelResultAction {
  readonly type = MODEL_SUCCESS;
  constructor(
    public key: string,
    public modelState: ModelState) { }
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

export type EditorModelAction =
  | ModelValueChange
  | ModelError
  | ModelSuccess;
