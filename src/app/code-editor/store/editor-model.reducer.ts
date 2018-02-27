import {
  EditorModelAction,
  CHANGE_MODEL_VALUE_ACTION,
  MODEL_VALIDATION_RESULT,
  MODEL_MONACO_ERROR,
  MODEL_MONACO_SUCCESS
} from './editor-model.action';
import { FeedbackDetails, Feedback } from '../../common/model';

export interface EditorModelEntities {
  entities: {
    [id: string]: Feedback;
  };
}

export const initialState: EditorModelEntities = {
  entities: {}
};

export function editorModelReducer(
  state = initialState,
  action: EditorModelAction
): EditorModelEntities {
  const payload = action.payload;

  const existingModelState =
    payload && payload.modelState
      ? state.entities[payload.modelState.id]
      : undefined;

  // ignore old values
  if (
    existingModelState &&
    existingModelState.versionId > payload.modelState.versionId
  ) {
    return state;
  }
  switch (action.type) {
    case CHANGE_MODEL_VALUE_ACTION:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.modelState.id]: { ...payload.modelState }
        }
      };
    case MODEL_VALIDATION_RESULT: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.modelState.id]: {
            ...payload.modelState,
            validation: action.payload.validation
          }
        }
      };
    }
    case MODEL_MONACO_ERROR: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.modelState.id]: {
            ...existingModelState,
            monaco: {
              success: false,
              errors: action.payload.errors
            }
          }
        }
      };
    }
    case MODEL_MONACO_SUCCESS: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.modelState.id]: {
            ...existingModelState,
            monaco: {
              success: true,
              errors: []
            }
          }
        }
      };
    }
  }
  return state;
}
