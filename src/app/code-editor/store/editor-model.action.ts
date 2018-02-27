import { Action } from '@ngrx/store';
import {
  FeedbackDetails,
  ErrorMarker,
  ProgrammingLanguage,
  ModelState
} from '../../common/model';

export const CHANGE_MODEL_VALUE_ACTION = 'CHANGE MODEL VALUE ACTION';
export class ChangeModelValueAction implements Action {
  readonly type = CHANGE_MODEL_VALUE_ACTION;
  constructor(
    public payload: {
      modelState: ModelState;
    }
  ) {}
}

export const MODEL_VALIDATION_RESULT = 'MODEL_VALIDATION_RESULT';
export class ValidationResultAction implements Action {
  readonly type = MODEL_VALIDATION_RESULT;
  constructor(
    public payload: {
      modelState: ModelState;
      validation: FeedbackDetails;
    }
  ) {}
}

export const MODEL_MONACO_ERROR = 'MODEL_MONACO_ERROR';
export class MonacoErrorAction implements Action {
  readonly type = MODEL_MONACO_ERROR;
  constructor(
    public payload: {
      modelState: ModelState;
      errors: ErrorMarker[];
    }
  ) {}
}

export const MODEL_MONACO_SUCCESS = 'MODEL_MONACO_SUCCESS';
export class MonacoSuccessAction implements Action {
  readonly type = MODEL_MONACO_SUCCESS;
  constructor(
    public payload: {
      modelState: ModelState;
    }
  ) {}
}

export const EXECUTOR_ERROR = 'EXECUTOR_ERROR';
export class ExecutorErrorAction implements Action {
  readonly type = EXECUTOR_ERROR;
  constructor(
    public payload: {
      modelState: ModelState;
      errors: ErrorMarker[];
    }
  ) {}
}

export const EXECUTOR_SUCCESS = 'MODEL_EXECUTOR_SUCCESS';
export class ExecutorSuccessAction implements Action {
  readonly type = EXECUTOR_SUCCESS;
  constructor(
    public payload: {
      modelState: ModelState;
    }
  ) {}
}

export type EditorModelAction =
  | ChangeModelValueAction
  | ValidationResultAction
  | MonacoErrorAction
  | MonacoSuccessAction;
