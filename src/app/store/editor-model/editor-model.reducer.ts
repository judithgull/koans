import { Feedback, FeedbackDetails, SourceType } from '../../model';
import {
  MODEL_VALUE_CHANGE,
  ModelAction,
  MODEL_ERROR,
  MODEL_SUCCESS,
} from './editor-model.action';

export interface EditorModelEntities {
  entities: {
    [id: string]: Feedback;
  };
}

export const emInitialState: EditorModelEntities = {
  entities: {}
};

export function editorModelReducer(
  state = emInitialState,
  action: ModelAction
): EditorModelEntities {
  const existingModelState = action.modelState
    ? state.entities[action.modelState.id]
    : undefined;

  // ignore old values
  if (
    existingModelState &&
    existingModelState.versionId > action.modelState.versionId
  ) {
    return state;
  }
  switch (action.type) {
    case MODEL_VALUE_CHANGE:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.modelState.id]: { ...action.modelState, valid: false }
        }
      };
    case MODEL_ERROR: {
      const result = {
        success: false,
        errors: action.errors
      };
      return addResult(
        action.key,
        result,
        existingModelState,
        action.modelState,
        state
      );
    }
    case MODEL_SUCCESS: {
      const result = {
        success: true,
        errors: []
      };
      return addResult(
        action.key,
        result,
        existingModelState,
        action.modelState,
        state
      );
    }
  }
  return state;
}

function isValid(resultKey: string, result: FeedbackDetails, existingModelState: Feedback): boolean {
  const existingValidationValid = existingModelState.validation && existingModelState.validation.success;
  const existingExecutionValid = existingModelState.execution && existingModelState.execution.success;
  const existingMonacoValid = !existingModelState.monaco || existingModelState.monaco.success;

  if (!result.success) {
    return false;
  } else if (resultKey === SourceType.execution && existingValidationValid && existingMonacoValid) {
    return true;
  } else if (resultKey === SourceType.monaco && existingValidationValid && existingExecutionValid) {
    return true;
  } else if (resultKey === SourceType.validation && existingExecutionValid && existingMonacoValid) {
    return true;
  }
  return false;
}

function addResult(
  resultKey: string,
  result: FeedbackDetails,
  existingModelState: Feedback,
  newModelState: Feedback,
  state: EditorModelEntities
): EditorModelEntities {
  const isEqualVersion =
    existingModelState.versionId === newModelState.versionId;

  if (isEqualVersion) {
    return {
      ...state,
      entities: {
        ...state.entities,
        [newModelState.id]: {
          ...existingModelState,
          [resultKey]: result,
          valid: isValid(resultKey, result, existingModelState)
        }
      }
    };
  } else {
    return {
      ...state,
      entities: {
        ...state.entities,
        [newModelState.id]: {
          value: newModelState.value,
          progLang: newModelState.progLang,
          id: newModelState.id,
          versionId: newModelState.versionId,
          [resultKey]: result,
          valid: existingModelState.valid
        }
      }
    };
  }
}
