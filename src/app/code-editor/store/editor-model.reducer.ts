import {
  EditorModelAction,
  CHANGE_MODEL_VALUE_ACTION,
  MODEL_VALIDATION_FAILED,
  MODEL_VALIDATION_SUCCESS
} from './editor-model.action';
import { Feedback } from '../../common/model';

export interface EditorModelState {
  id: string;
  versionId: number;
  value: string;
  result?: Feedback;
}

export interface EditorModelEntities {
  entities: {
    [id: string]: EditorModelState;
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
    case MODEL_VALIDATION_FAILED:
    case MODEL_VALIDATION_SUCCESS:
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
