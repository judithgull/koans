import { Action } from '@ngrx/store';

import { ErrorMarker, ModelState } from '../../../model';

export interface ModelResultAction extends Action {
  modelState: ModelState;
  key: string;
}

export const CHANGE_MODEL_VALUE_ACTION = 'CHANGE MODEL VALUE ACTION';
export class ChangeModelValueAction implements Action {
  readonly type = CHANGE_MODEL_VALUE_ACTION;
  constructor(public modelState: ModelState) {}
}

export const MODEL_RESULT_ERROR = 'MODEL_RESULT_ERROR';
export class ResultErrorAction implements ModelResultAction {
  readonly type = MODEL_RESULT_ERROR;
  constructor(
    public key: string,
    public modelState: ModelState,
    public errors: ErrorMarker[]
  ) {}
}

export const MODEL_RESULT_SUCCESS = 'MODEL_RESULT_SUCCESS';
export class ResultSuccessAction implements ModelResultAction {
  readonly type = MODEL_RESULT_SUCCESS;
  constructor(public key: string, public modelState: ModelState) {}
}

// all validations successful
export const MODEL_ALL_SUCCESS = 'MODEL_RESULT_ALL_SUCCESS';
export class AllSuccessAction implements Action {
  readonly type = MODEL_ALL_SUCCESS;
  constructor(public modelState: ModelState) {}
}

export function createResultAction(
  owner: string,
  modelState: ModelState,
  errors: ErrorMarker[]
): ResultSuccessAction | ResultErrorAction {
  if (errors.length) {
    return new ResultErrorAction(owner, modelState, errors);
  } else {
    return new ResultSuccessAction(owner, modelState);
  }
}

export type EditorModelAction =
  | ChangeModelValueAction
  | ResultErrorAction
  | ResultSuccessAction;
