import { Action } from '@ngrx/store';
import { FeedbackDetails } from '../../common/model';

export const CHANGE_MODEL_VALUE_ACTION = 'CHANGE MODEL VALUE ACTION';
export class ChangeModelValueAction implements Action {
  readonly type = CHANGE_MODEL_VALUE_ACTION;
  constructor(
    public payload: {
      id: string;
      versionId: number;
      value: string;
    }
  ) {}
}

export const MODEL_VALIDATION_FAILED = 'MODEL VALIDATION FAILED';
export class ValidationFailedAction implements Action {
  readonly type = MODEL_VALIDATION_FAILED;
  constructor(
    public payload: {
      id: string;
      versionId: number;
      value: string;
      validation: FeedbackDetails;
    }
  ) {}
}

export const MODEL_VALIDATION_SUCCESS = 'MODEL VALIDATION SUCCESS';
export class ValidationSuccessAction implements Action {
  readonly type = MODEL_VALIDATION_SUCCESS;
  constructor(
    public payload: {
      id: string;
      versionId: number;
      value: string;
      validation: FeedbackDetails;
    }
  ) {}
}

export type EditorModelAction =
  | ChangeModelValueAction
  | ValidationFailedAction
  | ValidationSuccessAction;
