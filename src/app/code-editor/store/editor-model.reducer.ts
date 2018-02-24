import {
  EditorModelAction,
  CHANGE_MODEL_VALUE_ACTION,
  MODEL_VALIDATION_RESULT
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
  switch (action.type) {
    case CHANGE_MODEL_VALUE_ACTION:
    case MODEL_VALIDATION_RESULT:
      if (existingEntity && existingEntity.versionId > payload.versionId) {
        return state;
      }
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.id]: payload
        }
      };
  }
  return state;
}
