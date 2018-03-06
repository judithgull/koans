import { Feedback } from '../../model';
import {
  CHANGE_MODEL_VALUE_ACTION,
  EditorModelAction,
  MODEL_RESULT_ERROR,
  MODEL_RESULT_SUCCESS
} from './editor-model.action';

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
    case CHANGE_MODEL_VALUE_ACTION:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.modelState.id]: { ...action.modelState }
        }
      };
    case MODEL_RESULT_ERROR: {
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
    case MODEL_RESULT_SUCCESS: {
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

function addResult(
  resultKey: string,
  result: any,
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
          [resultKey]: result
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
          [resultKey]: result
        }
      }
    };
  }
}
