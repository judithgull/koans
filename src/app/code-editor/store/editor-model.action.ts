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

export const MODEL_VALIDATION_RESULT = 'MODEL_VALIDATION_RESULT';
export class ValidationResultAction implements Action {
  readonly type = MODEL_VALIDATION_RESULT;
  constructor(
    public payload: {
      id: string;
      versionId: number;
      value: string;
      validation: FeedbackDetails;
    }
  ) {}
}

export type EditorModelAction = ChangeModelValueAction | ValidationResultAction;
