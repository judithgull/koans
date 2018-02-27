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
  const existingEntity = payload ? state.entities[payload.id] : payload;
  if (existingEntity && existingEntity.versionId > payload.versionId) {
    return state;
  }
  switch (action.type) {
    case CHANGE_MODEL_VALUE_ACTION:
    case MODEL_VALIDATION_RESULT:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.id]: payload
        }
      };
    case MODEL_MONACO_ERROR: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.id]: {
            ...existingEntity,
            versionId: action.payload.versionId,
            value: action.payload.value,
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
          [payload.id]: {
            ...existingEntity,
            versionId: action.payload.versionId,
            value: action.payload.value,
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
